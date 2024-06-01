import axios from "axios";

axios.defaults.withCredentials = true;

export async function onRegistration(registrationData) {
  return await axios.post(
    `${import.meta.env.VITE_API_URL}/api/register`,
    registrationData
  );
}

export async function onLogin(loginData) {
  return await axios.post(
    `${import.meta.env.VITE_API_URL}/api/login`,
    loginData
  );
}

export async function onLogout() {
  return await axios.get(`${import.meta.env.VITE_API_URL}/api/logout`);
}

export async function fetchProtectedInfo() {
  return await axios.get(`${import.meta.env.VITE_API_URL}/api/protected`);
}
