const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const getToken = () => localStorage.getItem("token");
export const getRole  = () => localStorage.getItem("role");

export const saveAuth = (token, role) => {
  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
};

export const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
};

// Gabungkan BASE_URL + path gambar dari BE
export const imageURL = (path) => {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `${BASE_URL}/${path.replace(/^\//, "")}`;
};

// Request dengan JSON (untuk endpoint yang pakai ShouldBindJSON)
async function request(path, options = {}) {
  const token = getToken();
  if (!token) { clearAuth(); window.location.href = "/login"; return; }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...options.headers,
  };
  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });
  if (res.status === 401) { clearAuth(); window.location.href = "/login"; return; }
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || data.error || `Error ${res.status}`);
  return data;
}

// Request multipart/form-data (untuk endpoint yang pakai ShouldBind + FormFile)
async function requestForm(path, formData, method = "POST") {
  const token = getToken();
  if (!token) { clearAuth(); window.location.href = "/login"; return; }

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: { Authorization: `Bearer ${token}` },
    body: formData, // FormData object, browser set Content-Type otomatis
  });
  if (res.status === 401) { clearAuth(); window.location.href = "/login"; return; }
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || data.error || `Error ${res.status}`);
  return data;
}

// Request tanpa auth (login, register)
async function publicRequest(path, options = {}) {
  const headers = { "Content-Type": "application/json", ...options.headers };
  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || data.error || `Error ${res.status}`);
  return data;
}

// ── Auth ──────────────────────────────────────────────
export const authAPI = {
  login: (email, password) =>
    publicRequest("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }),
  register: (payload) =>
    publicRequest("/auth/register", { method: "POST", body: JSON.stringify(payload) }),
};

// ── Merchant ──────────────────────────────────────────
export const merchantAPI = {
  getDashboard: () => request("/merchant/"),

  getProfile: () => request("/merchant/me"),

  // updateProfile pakai multipart/form-data karena BE pakai ShouldBind + FormFile("profile_image")
  updateProfile: (fields, imageFile = null) => {
    const fd = new FormData();
    Object.entries(fields).forEach(([k, v]) => { if (v !== undefined && v !== null) fd.append(k, v); });
    if (imageFile) fd.append("profile_image", imageFile);
    return requestForm("/merchant/me", fd, "PUT");
  },

  // createSurplusFood pakai multipart/form-data karena BE pakai ShouldBind + FormFile("image_url")
  createSurplusFood: (fields, imageFile = null) => {
    const fd = new FormData();
    Object.entries(fields).forEach(([k, v]) => { if (v !== undefined && v !== null) fd.append(k, String(v)); });
    if (imageFile) fd.append("image_url", imageFile);
    return requestForm("/merchant/surplus-food", fd, "POST");
  },

  // update pakai JSON biasa (UpdateSurplusFoodRequest pakai json tag)
  updateSurplusFood: (id, payload) =>
    request(`/merchant/surplus-food/${id}`, { method: "PUT", body: JSON.stringify(payload) }),

  getSurplusFoodDetail: (id) => request(`/merchant/surplus-food/${id}`),

  deleteSurplusFood: (id) => request(`/merchant/surplus-food/${id}`, { method: "DELETE" }),

  getExploreData: () => request("/explore"),
};
