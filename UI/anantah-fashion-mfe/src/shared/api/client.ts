import { getBearerToken } from "../auth/session";

const baseUrl = import.meta.env.VITE_FASHION_API_URL ?? "http://localhost:5134";

export async function apiRequest<T>(path: string, signal?: AbortSignal): Promise<T> {
  const token = getBearerToken();
  const response = await fetch(`${baseUrl}${path}`, {
    headers: {
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    signal,
  });

  if (!response.ok) throw new Error(`Fashion API request failed with ${response.status}.`);
  return (await response.json()) as T;
}