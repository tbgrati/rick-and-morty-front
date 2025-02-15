import {useGet} from "./useGet.ts";
import {getAllCharacters} from "../utils/routes.ts";
import {Character} from "../../types/character.ts";

export const useGetAllCharacters = (page: number) => {
    const { data, loading, error } = useGet<{ info: { pages: number; next?: string; prev?: string }; results: Character[] }>({
        path: `/character/?page=${page}`
    });

    return {
        characters: data?.results || [],
        totalPages: data?.info?.pages || 1,
        loading,
        error
    };
};

