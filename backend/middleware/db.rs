use std::sync::Arc;
use warp::Filter;
use deadpool_postgres::Pool;
use redis::Client as RedisClient;

pub fn with_db(pool: Pool) -> impl Filter<Extract = (Pool,), Error = std::convert::Infallible> + Clone {
    warp::any().map(move || pool.clone())
}