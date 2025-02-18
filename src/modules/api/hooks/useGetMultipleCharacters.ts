import { useGet } from "./useGet.ts";
import { Character } from "../../core/types/Character.ts";
import { getCharacters } from "../utils/routes.ts";

export const useGetMultipleCharacters = (characters: string[]) => {
  const characterIds = characters.map((ep) => ep.split("/").pop()).join(",");

  const { data, loading, error } = useGet<Character[] | Character>({
    path: `/${getCharacters}/${characterIds}`,
  });

  return {
    characters: Array.isArray(data) ? data : data ? [data] : [],
    loading,
    error,
  };
};
