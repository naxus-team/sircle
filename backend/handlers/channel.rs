use crate::models::channel::channelQuery;
use crate::models::{DbError, MyRedisError};
use deadpool_postgres::Pool;
use serde_json::json;
use warp::{Rejection, Reply};

pub async fn get_channel_handler(
    query: channelQuery,
    pool: Pool,
) -> Result<impl warp::Reply, warp::Rejection> {
    let client = pool.get().await.map_err(|e| {
        eprintln!("Failed to get client from pool: {}", e);
        warp::reject::custom(crate::models::DbError)
    })?;

    // // Prepare the query
    // let (sql, params): (_, Vec<&(dyn tokio_postgres::types::ToSql + Sync)>) =
    // if let Some(ref class_code) = query.cl {
    //     (
    //         "SELECT c.class_code, c.class_name
    //          FROM classes c
    //          INNER JOIN class_joins m ON c.circle = m.class_code
    //          WHERE c.class_code = $1 AND m.user_id = $2",
    //         vec![class_code, 1],
    //     )
    // } else {
    //     (
    //         "SELECT c.class_code, c.class_name
    //          FROM classes c
    //          INNER JOIN class_members m ON c.class_code = m.class_code
    //          WHERE m.user_id = $1",
    //         vec![&user_id],
    //     )
    // };

    let (sql, params): (_, Vec<&(dyn tokio_postgres::types::ToSql + Sync)>) =
    if let Some(ref class_code) = query.cl {
        (
            "SELECT class_code, class_name FROM classes WHERE class_code = $1",
            vec![class_code],
        )
    } else {
        ("SELECT class_code, class_name FROM classes", vec![])
    };

    let rows = client.query(sql, &params).await.map_err(|e| {
        eprintln!("Failed to query classes: {}", e);
        warp::reject::custom(crate::models::DbError)
    })?;

    let classes: Vec<serde_json::Value> = rows
        .into_iter()
        .map(|row| {
            let class_code: String = row.get("class_code");
            let class_name: String = row.get("class_name");
            json!({
                "class_code": class_code,
                "class_name": class_name,
                "access": true,
            })
        })
        .collect();

    Ok(warp::reply::json(&classes))
}
