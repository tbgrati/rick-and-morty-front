import { useGetEpisode } from "../../modules/api/hooks/useGetEpisode.ts";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "../../modules/core/components/Header/Header.tsx";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { NotFoundPage } from "../NotFound/NotFound.tsx";
import { CharacterGridView } from "../../modules/character/components/CharacterGridView/CharacterGridView.tsx";

export const EpisodeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { episode, loading, error } = useGetEpisode(id!);

  useEffect(() => {
    if (episode?.name) {
      document.title = `${episode.name} - Rick and Morty`;
    }
  }, [episode]);

  if (error) return <NotFoundPage />;

  return (
    <div>
      <Header />
      <div className="flex flex-col w-3/5 items-center mx-auto py-10 bg-primary-500  border-ram-blue-700 gap-y-6 rounded-lg mt-10">
        <div className="w-full px-6 ">
          <h1 className="font-bold text-5xl border-b-1">
            {loading ? (
              <Skeleton width={300} height={48} />
            ) : (
              `${episode?.name} (${episode?.episode})`
            )}
          </h1>
        </div>
        <h2>
          {loading ? (
            <Skeleton width={200} height={24} />
          ) : (
            `Aired on: ${episode?.air_date}`
          )}
        </h2>
        <div className={"w-full px-6"}>
          <h2 className={"font-semibold mb-5"}>
            {loading ? (
              <Skeleton width={250} height={24} />
            ) : (
              "Characters that appear in this episode:"
            )}
          </h2>
          <CharacterGridView characterUrls={episode?.characters} />
        </div>
      </div>
    </div>
  );
};
