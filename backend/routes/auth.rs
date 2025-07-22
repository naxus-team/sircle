use warp::Filter;
use std::sync::Arc;
use deadpool_postgres::Pool;
use redis::Client;
use crate::handlers::auth::{login_handler, verify_session};

pub fn auth_routes(
    pool: Pool,
    redis_client: Arc<Client>,
) -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
    let login = warp::path!("login")
        .and(warp::post())
        .and(warp::body::json())
        .and(with_db(pool.clone()))
        .and(with_redis(redis_client.clone()))
        .and_then(login_handler);

    let verif = warp::path!("verif")
        .and(warp::get())
        .and(warp::header::optional("cookie"))
        .and(with_db(pool.clone()))
        .and(with_redis(redis_client.clone()))
        .and_then(verify_session);

    warp::path("v1")
        .and(login.or(verif))
        .with(
            warp::cors()
                .allow_any_origin()
                .allow_credentials(true)
                .allow_headers(vec!["Content-Type", "Authorization"])
                .allow_methods(vec!["POST", "GET", "OPTIONS"]),
        )
}

fn with_db(pool: Pool) -> impl Filter<Extract = (Pool,), Error = std::convert::Infallible> + Clone {
    warp::any().map(move || pool.clone())
}

fn with_redis(client: Arc<Client>) -> impl Filter<Extract = (Arc<Client>,), Error = std::convert::Infallible> + Clone {
    warp::any().map(move || Arc::clone(&client))
}