use argon2::{
    Argon2, PasswordHasher, PasswordVerifier,
    password_hash::{PasswordHash, SaltString, rand_core::OsRng},
};
use argon2::password_hash::rand_core::RngCore;

pub fn hash_password(password: &str) -> String {
    // توليد Salt عشوائي
    let mut salt = [0u8; 16];
    OsRng.fill_bytes(&mut salt);
    let salt_string = SaltString::encode_b64(&salt).unwrap();

    // تهيئة Argon2
    let argon2 = Argon2::default();

    // تشفير كلمة المرور
    argon2
        .hash_password(password.as_bytes(), &salt_string)
        .unwrap()
        .to_string() // تحويل الناتج إلى String
}

pub fn verify_password(password: &str, hash: &str) -> bool {
    let argon2 = Argon2::default();

    // محاولة تحليل الـ hash بطريقة آمنة
    let parsed_hash = match PasswordHash::new(hash) {
        Ok(hash) => hash,
        Err(_) => return false, // إرجاع false عند حدوث خطأ
    };

    // التحقق من كلمة المرور وإرجاع true أو false
    argon2
        .verify_password(password.as_bytes(), &parsed_hash)
        .is_ok()
}

pub fn extract_session_id(cookie_header: &str) -> String {
    cookie_header
        .split("; ")
        .find(|c| c.starts_with("session_id="))
        .map(|c| c.trim_start_matches("session_id=").to_string())
        .unwrap_or_default()
}
