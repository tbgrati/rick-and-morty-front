import { useGet } from "./useGet.ts";
import { getCharacters } from "../utils/routes.ts";
import { Character } from "../../core/types/Character.ts";

export const useGetFilteredCharacters = (
  page: number,
  filters?: Record<string, string | number>,
) => {
  // Base URL with pagination
  const baseUrl = `/${getCharacters}/?page=${page}`;

  // Convert filters to query params
  let filterQuery = "";
  if (filters) {
    const params = new URLSearchParams();
    Object.keys(filters).forEach((key) => {
      if (
        filters[key] !== undefined &&
        filters[key] !== null &&
        filters[key] !== ""
      ) {
        params.append(key, String(filters[key]));
      }
    });
    const qs = params.toString();
    if (qs) {
      filterQuery = "&" + qs;
    }
  }

  const { data, loading, error } = useGet<{
    info: { pages: number; next?: string; prev?: string };
    results: Character[];
  }>({
    path: `${baseUrl}${filterQuery}`,
  });

  return {
    characters: data?.results || [],
    totalPages: data?.info?.pages || 1,
    loading,
    error,
  };
};
