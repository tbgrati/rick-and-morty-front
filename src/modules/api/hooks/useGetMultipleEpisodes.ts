import { useGet } from "./useGet.ts";
import { Episode } from "../../core/types/Episode.ts";

export const useGetMultipleEpisodes = (episodes: string[]) => {
  const episodeIds = episodes.map((ep) => ep.split("/").pop()).join(",");

  const { data, loading, error } = useGet<Episode[] | Episode>({
    path: `/episode/${episodeIds}`,
  });

  return {
    episodes: Array.isArray(data) ? data : data ? [data] : [],
    loading,
    error,
  };
};
