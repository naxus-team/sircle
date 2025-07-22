const API_BASE_URL = "http://localhost:5000/api";

export const apiRequest = async (
  endpoint: string,
  method: string = "GET",
  body?: any,
  auth: boolean = false
) => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  // إضافة التوكن إذا كان المستخدم مسجلاً الدخول
  if (auth) {
    const token = localStorage.getItem("token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const options: RequestInit = {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "حدث خطأ ما");
    }

    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
