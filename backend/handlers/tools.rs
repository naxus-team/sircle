use crate::models::channel::SearchQuery;
use crate::models::{DbError, MyRedisError};
use deadpool_postgres::Pool;
use serde::{Serialize, Deserialize};
use serde_json::json;
use warp::{Rejection, Reply};

// تعريف نوع لنتائج البحث
#[derive(Serialize, Deserialize)]
struct SearchResult {
    result_type: String, // "user" أو "class"
    id: i32,
    title: String,       // username أو class_name
    extra: Option<String>, // معلومات إضافية مثل class_code
}

pub async fn search_handler(
    query: SearchQuery,
    pool: Pool,
) -> Result<impl warp::Reply, warp::Rejection> {
    // الحصول على عميل من المجمع
    let client = pool.get().await.map_err(|e| {
        eprintln!("Failed to get client from pool: {}", e);
        warp::reject::custom(DbError)
    })?;

    // تحضير الاستعلام بناءً على وجود قيمة البحث
    let (sql, params): (&str, Vec<&(dyn tokio_postgres::types::ToSql + Sync)>) =
        if let Some(ref q) = query.cl {
            // البحث في users و classes مع دمج النتائج باستخدام UNION
            (
                r#"
                SELECT 'user' AS result_type, id, username AS title, NULL AS extra
                FROM users
                WHERE username ILIKE '%' || $1 || '%'
                UNION
                SELECT 'class' AS result_type, id, class_name AS title, class_code AS extra
                FROM classes
                WHERE class_name ILIKE '%' || $1 || '%'
                "#,
                vec![q],
            )
        } else {
            // إرجاع جميع السجلات إذا لم يكن هناك استعلام
            (
                r#"
                SELECT 'user' AS result_type, id, username AS title, NULL AS extra
                FROM users
                UNION
                SELECT 'class' AS result_type, id, class_name AS title, class_code AS extra
                FROM classes
                "#,
                vec![],
            )
        };

    // تنفيذ الاستعلام
    let rows = client.query(sql, &params).await.map_err(|e| {
        eprintln!("Failed to query search: {}", e);
        warp::reject::custom(DbError)
    })?;

    // تحويل النتائج إلى JSON
    let search_results: Vec<SearchResult> = rows
        .into_iter()
        .map(|row| SearchResult {
            result_type: row.get("result_type"),
            id: row.get("id"),
            title: row.get("title"),
            extra: row.get("extra"),
        })
        .collect();

    // إرجاع الرد كـ JSON
    Ok(warp::reply::json(&search_results))
}