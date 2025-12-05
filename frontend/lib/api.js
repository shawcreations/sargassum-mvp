/**
 * API helper functions for Sargassum MVP
 */

export function getApiBaseUrl() {
  return process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
}

async function fetchAPI(endpoint, options = {}) {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}${endpoint}`;
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };
  
  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'An error occurred' }));
    throw new Error(error.detail || `HTTP error! status: ${response.status}`);
  }
  
  // Handle 204 No Content
  if (response.status === 204) {
    return null;
  }
  
  return response.json();
}

// Beaches API
export async function fetchBeaches() {
  return fetchAPI('/api/beaches');
}

export async function fetchBeach(id) {
  return fetchAPI(`/api/beaches/${id}`);
}

export async function createBeach(data) {
  return fetchAPI('/api/beaches', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateBeach(id, data) {
  return fetchAPI(`/api/beaches/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteBeach(id) {
  return fetchAPI(`/api/beaches/${id}`, {
    method: 'DELETE',
  });
}

// Campaigns API
export async function fetchCampaigns() {
  return fetchAPI('/api/campaigns');
}

export async function fetchCampaign(id) {
  return fetchAPI(`/api/campaigns/${id}`);
}

export async function createCampaign(data) {
  return fetchAPI('/api/campaigns', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateCampaign(id, data) {
  return fetchAPI(`/api/campaigns/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteCampaign(id) {
  return fetchAPI(`/api/campaigns/${id}`, {
    method: 'DELETE',
  });
}

// Tasks API
export async function fetchTasks() {
  return fetchAPI('/api/tasks');
}

export async function fetchTask(id) {
  return fetchAPI(`/api/tasks/${id}`);
}

export async function createTask(data) {
  return fetchAPI('/api/tasks', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateTask(id, data) {
  return fetchAPI(`/api/tasks/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteTask(id) {
  return fetchAPI(`/api/tasks/${id}`, {
    method: 'DELETE',
  });
}

// AI API
export async function sendChatMessage(message) {
  return fetchAPI('/api/ai/chat', {
    method: 'POST',
    body: JSON.stringify({ message }),
  });
}

