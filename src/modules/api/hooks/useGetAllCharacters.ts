import {useGet} from "./useGet.ts";
import {getAllCharacters} from "../utils/routes.ts";
import {Character} from "../../types/character.ts";

export const useGetAllCharacters = () => {
    const { data, loading, error } = useGet<{ info: any; results: Character[] }>({ path: getAllCharacters });
    return { characters: data?.results || [], loading, error };
};