mod handlers;
mod models;
mod routes;
mod utils;

use handlers::auth::{login_handler, verify_session};
use handlers::channel::get_channel_handler;
use handlers::tools::search_handler;
use handlers::user::{create_user_handler, get_user_handler};

use hyper::Body;
use hyper::server::conn::Http;
use routes::{auth_routes, channel_routes, user_routes, search_routes};
use rustls::{Certificate, PrivateKey, ServerConfig};
use rustls_pemfile::{certs, pkcs8_private_keys};
use std::fs::File;
use std::io::BufReader;
use std::net::SocketAddr;
use std::sync::Arc;
use tokio::net::TcpListener;
use tokio_rustls::TlsAcceptor;
use warp::Filter;
use warp::http::Response; // تمت إضافته

#[tokio::main]
async fn main() {
    // تحميل الشهادة والمفتاح الخاص
    let cert_file = &mut BufReader::new(File::open("192.168.1.100.pem").unwrap());
    let key_file = &mut BufReader::new(File::open("192.168.1.100-key.pem").unwrap());

    let certs = certs(cert_file).unwrap();
    let certs = certs.into_iter().map(Certificate).collect();

    let private_key = pkcs8_private_keys(key_file).unwrap();
    let private_key = PrivateKey(private_key[0].clone());

    // تكوين خادم TLS
    let config = ServerConfig::builder()
        .with_safe_defaults()
        .with_no_client_auth()
        .with_single_cert(certs, private_key)
        .unwrap();

    let acceptor = TlsAcceptor::from(Arc::new(config));

    // تكوين اتصال قاعدة البيانات
    let pool = utils::db::create_pool().await;

    // تكوين Redis
    let redis_client = Arc::new(redis::Client::open("redis://127.0.0.1:6379").unwrap());

    // تعريف المسارات
    let routes = auth_routes(pool.clone(), redis_client.clone())
        .or(channel_routes(pool.clone()).or(user_routes(pool.clone()).or(search_routes(pool.clone()))));

    // تحويل Warp filter إلى خدمة
    let service = warp::service(routes);

    // عنوان الخادم
    let addr: SocketAddr = "192.168.1.100:3030".parse().unwrap();

    // إنشاء TCP listener
    let listener = TcpListener::bind(&addr).await.unwrap();
    println!("Server running at https://{}", addr);

    // قبول الاتصالات الواردة
    while let Ok((stream, _)) = listener.accept().await {
        let acceptor = acceptor.clone();
        let service = service.clone();

        tokio::spawn(async move {
            match acceptor.accept(stream).await {
                Ok(stream) => {
                    if let Err(e) = Http::new().serve_connection(stream, service).await {
                        eprintln!("Error serving connection: {}", e);
                    }
                }
                Err(e) => eprintln!("TLS handshake failed: {}", e),
            }
        });
    }
}
