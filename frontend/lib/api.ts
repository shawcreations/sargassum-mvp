const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

interface FetchOptions extends RequestInit {
  token?: string
}

async function fetchAPI<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { token, ...fetchOptions } = options
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'An error occurred' }))
    throw new Error(error.detail || 'An error occurred')
  }

  return response.json()
}

// Auth API
export const authAPI = {
  login: (email: string, password: string) =>
    fetchAPI<{ access_token: string; token_type: string }>('/auth/login', {
      method: 'POST',
      body: new URLSearchParams({ username: email, password }).toString(),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }),

  register: (email: string, password: string, fullName?: string) =>
    fetchAPI('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, full_name: fullName }),
    }),

  getMe: (token: string) =>
    fetchAPI('/auth/me', { token }),
}

// Beaches API
export const beachesAPI = {
  getAll: (token?: string) =>
    fetchAPI<any[]>('/beaches', { token }),

  getById: (id: number, token?: string) =>
    fetchAPI(`/beaches/${id}`, { token }),

  create: (data: any, token: string) =>
    fetchAPI('/beaches', {
      method: 'POST',
      body: JSON.stringify(data),
      token,
    }),

  update: (id: number, data: any, token: string) =>
    fetchAPI(`/beaches/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      token,
    }),

  delete: (id: number, token: string) =>
    fetchAPI(`/beaches/${id}`, {
      method: 'DELETE',
      token,
    }),
}

// Campaigns API
export const campaignsAPI = {
  getAll: (token?: string) =>
    fetchAPI<any[]>('/campaigns', { token }),

  getById: (id: number, token?: string) =>
    fetchAPI(`/campaigns/${id}`, { token }),

  create: (data: any, token: string) =>
    fetchAPI('/campaigns', {
      method: 'POST',
      body: JSON.stringify(data),
      token,
    }),

  update: (id: number, data: any, token: string) =>
    fetchAPI(`/campaigns/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      token,
    }),

  delete: (id: number, token: string) =>
    fetchAPI(`/campaigns/${id}`, {
      method: 'DELETE',
      token,
    }),
}

// Tasks API
export const tasksAPI = {
  getAll: (token?: string) =>
    fetchAPI<any[]>('/tasks', { token }),

  getById: (id: number, token?: string) =>
    fetchAPI(`/tasks/${id}`, { token }),

  create: (data: any, token: string) =>
    fetchAPI('/tasks', {
      method: 'POST',
      body: JSON.stringify(data),
      token,
    }),

  update: (id: number, data: any, token: string) =>
    fetchAPI(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      token,
    }),

  delete: (id: number, token: string) =>
    fetchAPI(`/tasks/${id}`, {
      method: 'DELETE',
      token,
    }),
}

// AI API
export const aiAPI = {
  chat: (message: string, conversationId?: string) =>
    fetchAPI<{ response: string; conversation_id: string }>('/ai/chat', {
      method: 'POST',
      body: JSON.stringify({ message, conversation_id: conversationId }),
    }),
}

