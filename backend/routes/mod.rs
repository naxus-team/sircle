pub mod auth;
pub mod channel;
pub mod user;
pub mod tools;

use deadpool_postgres::Pool;
use redis::Client;
use std::sync::Arc;
use warp::Filter;

pub fn auth_routes(
    pool: Pool,
    redis_client: Arc<Client>,
) -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
    auth::auth_routes(pool, redis_client)
}

pub fn user_routes(
    pool: Pool,
) -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
    user::user_routes(pool)
}

pub fn channel_routes(
    pool: Pool,
) -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
    channel::channel_routes(pool)
}

pub fn search_routes(
    pool: Pool,
) -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
    tools::search_routes(pool)
}
