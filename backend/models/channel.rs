use serde::{Deserialize, Serialize};
use std::sync::Arc;
use redis::RedisError;

#[derive(Debug)]
pub struct DbError;

impl warp::reject::Reject for DbError {}

#[derive(Debug)]
pub struct MyRedisError {
    pub err: Arc<RedisError>,
}

impl warp::reject::Reject for MyRedisError {}

#[derive(Debug, Deserialize, Serialize)]
pub struct LoginRequest {
    pub email: String,
    pub password: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Fields {
    pub id: i32,
    pub email: String,
    pub password: String,
}

#[derive(Serialize, Deserialize)]
pub struct User {
    pub id: i32,
    pub name: String,
    pub email: String,
}

#[derive(Debug, Deserialize)]
pub struct channelQuery {
    pub cl: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct SearchQuery {
    pub cl: Option<String>,
}