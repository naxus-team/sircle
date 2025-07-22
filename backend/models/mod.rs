use std::sync::Arc;

pub mod channel;
pub mod user;

#[derive(Debug)]
pub struct DbError;

impl warp::reject::Reject for DbError {}

#[derive(Debug)]
pub struct MyRedisError {
    pub err: Arc<redis::RedisError>,
}

impl warp::reject::Reject for MyRedisError {}
