use crate::handlers::tools::{search_handler};
use crate::models::channel::SearchQuery;
use deadpool_postgres::Pool;
use warp::Filter;

pub fn search_routes(
    pool: Pool,
) -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
    let get_search = warp::path!("search")
        .and(warp::get())
        .and(warp::query::<SearchQuery>())
        .and(with_db(pool.clone()))
        .and_then(search_handler);

    warp::path("v1").and(get_search).with(
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
