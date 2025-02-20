import { Header } from "../../modules/core/components/Header/Header.tsx";
import { CharacterGridItem } from "../../modules/character/components/CharacterGridItem/CharacterGridItem.tsx";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useGetLocation } from "../../modules/api/hooks/useGetLocation.ts";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { NotFoundPage } from "../NotFound/NotFound.tsx";
import { CharacterGridView } from "../../modules/character/components/CharacterGridView/CharacterGridView.tsx";

export const LocationDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { location, loading, error } = useGetLocation(id!);

  useEffect(() => {
    if (location?.name) {
      document.title = `${location.name} - Rick and Morty`;
    }
  }, [location]);

  if (error) return <NotFoundPage />;

  return (
    <div>
      <Header />
      <div className="flex flex-col w-3/5 items-center mx-auto py-10 bg-primary-500 border-ram-blue-700 gap-y-6 rounded-lg mt-10">
        <div className="w-full px-6 flex flex-col gap-y-2">
          <h1 className="font-bold text-5xl border-b-1">
            {loading ? <Skeleton width={300} height={48} /> : location?.name}
          </h1>
          <div className="flex flex-row gap-x-1">
            <h2 className="text-gray-300 font-semibold">Type:</h2>
            <h2>
              {loading ? <Skeleton width={150} height={24} /> : location?.type}
            </h2>
          </div>
          <h2>
            {loading ? (
              <Skeleton width={200} height={24} />
            ) : (
              location?.dimension
            )}
          </h2>
        </div>
        <div className="w-full px-6">
          <h2 className="font-semibold mb-5">
            {loading ? <Skeleton width={250} height={24} /> : "Residents:"}
          </h2>
          <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
            {loading ? (
              <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
                {[...Array(8)].map((_, index) => (
                  <CharacterGridItem loading={true} key={index} />
                ))}
              </div>
            ) : (
              <CharacterGridView characterUrls={location.residents} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
