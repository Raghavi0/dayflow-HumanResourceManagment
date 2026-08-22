const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";


async function request(
  endpoint,
  options = {}
) {

  const token =
    localStorage.getItem(
      "dayflow_token"
    );

  const response =
    await fetch(
      `${API_BASE_URL}${endpoint}`,
      {
        ...options,

        headers: {
          "Content-Type":
            "application/json",

          ...(token
            ? {
                Authorization:
                  `Bearer ${token}`,
              }
            : {}),

          ...(options.headers || {}),
        },
      }
    );

  const data =
    await response
      .json()
      .catch(() => ({}));

  if (!response.ok) {

    throw new Error(
      data.message ||
      "API request failed"
    );
  }

  return data;
}


export const api = {

  login(data) {
    return request(
      "/auth/login",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
  },

  register(data) {
    return request(
      "/auth/register",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
  },

  me() {
    return request(
      "/auth/me"
    );
  },

};


export default api;
