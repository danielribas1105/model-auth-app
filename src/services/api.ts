const API_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:8000/api/v1"

export interface LoginPayload {
   email: string
   password: string
}

export interface TokenResponse {
   access_token: string
   refresh_token: string
   token_type: string
}

export interface UserResponse {
   id: string
   email: string
   full_name: string | null
   is_active: boolean
   is_verified: boolean
   created_at: string
}

async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
   const res = await fetch(`${API_URL}${path}`, {
      headers: { "Content-Type": "application/json", ...options.headers },
      ...options,
   })

   if (!res.ok) {
      const error = await res.json().catch(() => ({ detail: "Erro desconhecido" }))
      throw new Error(error.detail ?? "Requisição falhou")
   }

   return res.json()
}

export const authApi = {
   login: (payload: LoginPayload) =>
      apiFetch<TokenResponse>("/auth/login", {
         method: "POST",
         body: JSON.stringify(payload),
      }),

   me: (token: string) =>
      apiFetch<UserResponse>("/users/me", {
         headers: { Authorization: `Bearer ${token}` },
      }),
}
