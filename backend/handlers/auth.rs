use crate::models::user::User;
use crate::models::user::{Fields, LoginRequest};
use crate::models::{DbError, MyRedisError};
use crate::utils::auth::extract_session_id; // استيراد الدالة
// src/handlers/auth.rs
use crate::utils::{
    auth::{hash_password, verify_password},
    db::connect_db,
    redis::create_session,
};
use deadpool_postgres::Pool;
use redis::AsyncCommands;
use serde_json::json;
use std::sync::Arc;
use uuid::Uuid;
use warp::http::{Response, header};
use warp::hyper::Body;
use warp::{Rejection, Reply};
use chrono::NaiveDateTime; // تمت إضافته

pub async fn login_handler(
    body: LoginRequest,
    pool: Pool,
    client: Arc<redis::Client>,
) -> Result<impl Reply, Rejection> {
    let client_db = connect_db(&pool).await?;

    let row = client_db
        .query_opt(
            "SELECT id, email,password FROM users WHERE email = $1",
            &[&body.email],
        )
        .await
        .map_err(|e| {
            eprintln!("❌ خطأ في استعلام قاعدة البيانات: {}", e);
            warp::reject::custom(DbError)
        })?;

    let user = match row {
        Some(r) => Fields {
            id: r.get("id"),
            email: r.get("email"),
            password: r.get("password"),
        },
        None => return Err(warp::reject::custom(DbError)),
    };

    if verify_password(&body.password, &user.password) {
        let mut redis_conn = client.get_async_connection().await.map_err(|e| {
            eprintln!("❌ فشل الاتصال بـ Redis: {:?}", e);
            warp::reject::custom(MyRedisError { err: Arc::new(e) })
        })?;

        let session_id = Uuid::new_v4().to_string();
        let uuid = Uuid::new_v4().to_string();
        let user_data: String = json!({ "email": user.email, "uuid": uuid }).to_string();

        // تخزين الجلسة في Redis لمدة ساعة
        redis_conn
            .set_ex::<_, _, ()>(&session_id, &user_data, 2592000)
            .await
            .map_err(|e| {
                eprintln!("❌ فشل تخزين الجلسة في Redis: {:?}", e);
                warp::reject::custom(MyRedisError { err: Arc::new(e) })
            })?;

        // إنشاء Cookie للمستخدم
        let cookie = format!(
            "session_id={}; HttpOnly; Path=/; Secure; SameSite=Strict",
            session_id
        );

        // إنشاء استجابة JSON مع `Set-Cookie`
        let json_value = json!({ "message": "تم تسجيل الدخول بنجاح", "uuid": uuid });
        let json_string = serde_json::to_string(&json_value).unwrap(); // تحويل JSON إلى String

        let mut res = Response::new(Body::from(json_string)); // إنشاء Response من String
        res.headers_mut()
            .insert(header::SET_COOKIE, cookie.parse().unwrap());

        Ok(res)
    } else {
        let json_value = json!({ "message": "تم تسجيل الدخول بنجاح" });
        let json_string = serde_json::to_string(&json_value).unwrap();

        Ok(Response::new(Body::from(json_string))) // ✅ تحويل JSON إلى Body وإرجاع Response
    }
}

pub async fn verify_session(
    cookie_header: Option<String>,
    pool: Pool,
    client: Arc<redis::Client>,
) -> Result<impl warp::Reply, warp::Rejection> {
    let session_id = match cookie_header {
        Some(header) => extract_session_id(&header),
        None => {
            return Ok(warp::reply::json(&json!({ "error": "الرمز مفقود" })));
        }
    };

    let mut redis_conn = client.get_async_connection().await.map_err(|e| {
        eprintln!("❌ فشل الاتصال بـ Redis: {:?}", e);
        warp::reject::custom(MyRedisError { err: Arc::new(e) })
    })?;

    let session_data: Option<String> = redis_conn.get(&session_id).await.map_err(|e| {
        eprintln!("❌ خطأ أثناء استرجاع بيانات الجلسة: {:?}", e);
        warp::reject::custom(MyRedisError { err: Arc::new(e) })
    })?;

    let session_data = match session_data {
        Some(data) => data,
        None => {
            return Ok(warp::reply::json(
                &json!({ "error": "الجلسة غير صالحة أو منتهية" }),
            ));
        }
    };

    let user_data: serde_json::Value = serde_json::from_str(&session_data).unwrap();
    let user_email = user_data["email"].as_str().unwrap();
    let uuid = user_data["uuid"].as_str().unwrap();

    // ✅ استعلام قاعدة البيانات لاسترجاع معلومات المستخدم
    let client_db = connect_db(&pool).await?;
    let row = client_db
        .query_opt(
            "
            SELECT 
                users.id, 
                users.username, 
                users.email, 
                users.createdat, 
                profiles.firstname, 
                profiles.lastname, 
                profiles.image, 
                profiles.bio
            FROM users
            LEFT JOIN profiles ON users.id = profiles.user_id
            WHERE users.email = $1
            ",
            &[&user_email],
        )
        .await
        .map_err(|e| {
            eprintln!("❌ خطأ في استعلام قاعدة البيانات: {}", e);
            warp::reject::custom(DbError)
        })?;

    let user = match row {
        Some(r) => {
            let created_at: NaiveDateTime = r.get("createdat");
            let created_at_str = created_at.format("%Y-%m-%d %H:%M:%S").to_string();
            json!({
                "id": r.get::<_, i32>("id"),
                "username": r.get::<_, String>("username"),
                "email": r.get::<_, String>("email"),
                "createdat": created_at_str,
                "firstname": r.get::<_, String>("firstname"),
                "lastname": r.get::<_, String>("lastname"),
                "image": r.get::<_, String>("image"),
                "bio": r.get::<_, String>("bio")
            })
        }
        None => {
            return Ok(warp::reply::json(&json!({ "error": "المستخدم غير موجود" })));
        }
    };

    // ✅ إرجاع بيانات المستخدم
    Ok(warp::reply::json(&json!({
        "code": 0,
        "user": user
    })))
}
