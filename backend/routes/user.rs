use crate::handlers::user::{create_user_handler, get_user_handler};
use crate::models::user::UserQuery;
use deadpool_postgres::Pool;
use warp::Filter;

pub fn user_routes(
    pool: Pool,
) -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
    let get_user = warp::path!("user")
        .and(warp::get())
        .and(warp::query::<UserQuery>())
        .and(with_db(pool.clone()))
        .and_then(get_user_handler);

    let create_user = warp::path!("users")
        .and(warp::post())
        .and(warp::body::json())
        .and(with_db(pool.clone()))
        .and_then(create_user_handler);

    warp::path("v1").and(get_user.or(create_user)).with(
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
