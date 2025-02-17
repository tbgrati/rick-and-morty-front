import { useGet } from "./useGet.ts";
import { Location } from "../../core/types/Location.ts";
export const useGetLocation = (link: string) => {
  const { data, loading, error } = useGet<Location>({ path: link });
  return { location: data, loading, error };
};
