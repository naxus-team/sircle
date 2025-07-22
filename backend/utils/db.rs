use deadpool_postgres::{Pool, Runtime};
use tokio_postgres::NoTls;
use crate::models::DbError;


pub async fn create_pool() -> Pool {
    let mut cfg = deadpool_postgres::Config::new();
    cfg.host = Some("localhost".to_string());
    cfg.user = Some("rust_user".to_string());
    cfg.password = Some("2423".to_string());
    cfg.dbname = Some("rust_api".to_string());

    cfg.create_pool(Some(Runtime::Tokio1), NoTls).unwrap()
}

pub async fn connect_db(pool: &Pool) -> Result<deadpool_postgres::Client, warp::Rejection> {
    pool.get().await.map_err(|e| {
        eprintln!("Database connection error: {}", e);
        warp::reject::custom(DbError)
    })
}