import { useGet } from "./useGet.ts";
import { Location } from "../../character/types/Location.ts";
import { getLocation } from "../utils/routes.ts";
export const useGetLocation = (id: string) => {
  const { data, loading, error } = useGet<Location>({
    path: `${getLocation}/${id}`,
  });
  return { location: data, loading, error };
};
