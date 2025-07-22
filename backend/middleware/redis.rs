use std::sync::Arc;
use warp::Filter;
use deadpool_postgres::Pool;
use redis::Client as RedisClient;


pub fn with_redis(client: Arc<RedisClient>) -> impl Filter<Extract = (Arc<RedisClient>,), Error = std::convert::Infallible> + Clone {
    warp::any().map(move || Arc::clone(&client))
}