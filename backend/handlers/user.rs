use crate::models::user::{User, UserQuery};
use crate::models::{DbError, MyRedisError};
use chrono::NaiveDateTime;
use deadpool_postgres::Pool;
use serde_json::json;
use warp::{Rejection, Reply};

pub async fn get_user_handler(
    query: UserQuery, // Accept the query parameters
    pool: Pool,
) -> Result<impl warp::Reply, warp::Rejection> {
    let client = pool.get().await.map_err(|e| {
        eprintln!("Failed to get client from pool: {}", e);
        warp::reject::custom(crate::models::DbError)
    })?;

    // Prepare the query
    let (sql, params): (_, Vec<&(dyn tokio_postgres::types::ToSql + Sync)>) =
        if let Some(ref username) = query.username {
            (
                "
                SELECT 
                users.id, 
                users.username, 
                users.mobile, 
                users.email, 
                users.createdat, 
                profiles.firstname, 
                profiles.lastname, 
                profiles.image, 
                profiles.bio
                FROM users
                LEFT JOIN profiles ON users.id = profiles.user_id
                WHERE users.username = $1
                ",
                vec![username],
            )
        } else {
            ("SELECT id, username, email FROM users", vec![])
        };

    let rows = client.query(sql, &params).await.map_err(|e| {
        eprintln!("Failed to query users: {}", e);
        warp::reject::custom(crate::models::DbError)
    })?;

    let users: Vec<serde_json::Value> = rows
        .into_iter()
        .map(|r| {
            let created_at: NaiveDateTime = r.get("createdat");
            let created_at_str = created_at.format("%Y-%m-%d %H:%M:%S").to_string();
            json!({
                "username": r.get::<_, String>("username"),
                "email": r.get::<_, String>("email"),
                "createdat": created_at_str,
                "firstname": r.get::<_, String>("firstname"),
                "lastname": r.get::<_, String>("lastname"),
                "image": r.get::<_, String>("image"),
                "bio": r.get::<_, String>("bio"),
                "mobile": r.get::<_, String>("mobile")

            })
        })
        .collect();

    Ok(warp::reply::json(&users))
}
pub async fn create_user_handler(
    user: User,
    pool: Pool,
) -> Result<impl warp::Reply, warp::Rejection> {
    let client = pool.get().await.map_err(|e| {
        eprintln!("Failed to get client from pool: {}", e);
        warp::reject::custom(crate::models::DbError)
    })?;

    client
        .execute(
            "INSERT INTO users (name, email) VALUES ($1, $2)",
            &[&user.name, &user.email],
        )
        .await
        .map_err(|e| {
            eprintln!("Failed to insert user: {}", e);
            warp::reject::custom(crate::models::DbError)
        })?;

    Ok(warp::reply::json(&user))
}
