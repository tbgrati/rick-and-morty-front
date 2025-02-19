import { useGet } from "./useGet.ts";
import { Character } from "../../character/types/Character.ts";
import { getCharacters } from "../utils/routes.ts";

export const useGetCharacter = (id: string) => {
  const { data, loading, error } = useGet<Character>({
    path: `${getCharacters}/${id}`,
  });
  return { character: data, loading, error };
};
