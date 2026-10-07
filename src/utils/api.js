const API_BASE = 'http://localhost:5000';

export async function authFetch(path, options = {}) {
  const token = localStorage.getItem('token');

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: token ? `Bearer ${token}` : '',
    },
  });

  return response;
}

export { API_BASE };