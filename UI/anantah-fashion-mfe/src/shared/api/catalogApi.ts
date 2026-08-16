import { apiRequest } from "./client";

export type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  brand: string;
  priceInr: number;
  color: string;
  rating: number;
  imageUrl: string;
};

export function getCategories(signal?: AbortSignal) {
  return apiRequest<string[]>("/api/v1/fashion/categories", signal);
}

export function getProducts(category?: string, signal?: AbortSignal) {
  const params = new URLSearchParams();
  if (category && category !== "All") params.set("category", category);
  const query = params.toString();
  return apiRequest<Product[]>(`/api/v1/fashion/products${query ? `?${query}` : ""}`, signal);
}