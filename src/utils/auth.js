export function getToken() {
  return localStorage.getItem("userToken") || sessionStorage.getItem("userToken") || null;
}

export function getRole() {
  return localStorage.getItem("userRole") || sessionStorage.getItem("userRole") || "customer";
}

export function setAuth({ token, role }, rememberMe) {
  if (rememberMe) {
    localStorage.setItem("userToken", token);
    localStorage.setItem("userRole", role);
  } else {
    sessionStorage.setItem("userToken", token);
    sessionStorage.setItem("userRole", role);
  }
}

export function clearAuth() {
  localStorage.removeItem("userToken");
  localStorage.removeItem("userRole");
  sessionStorage.removeItem("userToken");
  sessionStorage.removeItem("userRole");
}

export function computeRole(email) {
  const lower = (email || "").toLowerCase();
  if (lower.includes("admin")) return "admin";
  if (lower.includes("owner")) return "owner";
  return "customer";
}
