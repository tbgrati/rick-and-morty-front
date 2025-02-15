import { useGet } from "./useGet.ts";
import { Episode } from "../../types/Episode.ts";

export const useGetEpisode = (link: string) => {
  const { data, loading, error } = useGet<Episode>({ path: link });
  return { episode: data, loading, error };
};
