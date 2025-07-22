use redis::{AsyncCommands, RedisError};
use std::sync::Arc;
use uuid::Uuid;
use serde_json::json;

pub async fn create_session(
    client: &Arc<redis::Client>,
    user_id: i32,
) -> Result<String, redis::RedisError> {
    let mut redis_conn = client.get_async_connection().await?;
    let session_id = Uuid::new_v4().to_string();
    let user_data = json!({ "user_id": user_id }).to_string();

    redis_conn
        .set_ex::<_, _, ()>(&session_id, &user_data, 3600)
        .await?;
    Ok(session_id)
}