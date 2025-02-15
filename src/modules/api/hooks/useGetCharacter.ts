import { useGet } from "./useGet.ts";
import { Character } from "../../types/Character.ts";

export const useGetCharacter = (link: string) => {
  const { data, loading, error } = useGet<Character>({ path: link });
  return { character: data, loading, error };
};
