use crate::handlers::channel::{get_channel_handler};
use crate::models::channel::channelQuery;
use deadpool_postgres::Pool;
use warp::Filter;

pub fn channel_routes(
    pool: Pool,
) -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
    let get_channel = warp::path!("channel")
        .and(warp::get())
        .and(warp::query::<channelQuery>())
        .and(with_db(pool.clone()))
        .and_then(get_channel_handler);

    warp::path("v1").and(get_channel).with(
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
