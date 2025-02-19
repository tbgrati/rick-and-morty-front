import { useGet } from "./useGet.ts";
import { Episode } from "../../episode/types/Episode.ts";
import { getEpisodes } from "../utils/routes.ts";

export const useGetEpisode = (id: string) => {
  const { data, loading, error } = useGet<Episode>({
    path: `${getEpisodes}/${id}`,
  });
  return { episode: data, loading, error };
};
