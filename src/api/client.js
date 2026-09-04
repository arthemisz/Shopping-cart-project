const BASE_URL = 'https://fakestoreapi.com';

/**
 * Fetch wrapper with error handling and AbortController signal support
 * @param {string} endpoint
 * @param {RequestInit} options
 * @returns {Promise<any>}
 */
export async function apiClient(endpoint, options = {}) {
  const url = endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(
      `Network request failed: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}
