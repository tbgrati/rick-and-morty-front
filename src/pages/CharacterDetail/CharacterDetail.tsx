import { useEffect } from "react";
import { useGetCharacter } from "../../modules/api/hooks/useGetCharacter.ts";
import { useParams } from "react-router-dom";
import { useGetMultipleEpisodes } from "../../modules/api/hooks/useGetMultipleEpisodes.ts";
import { EpisodeListItem } from "../../modules/components/episodeListItem/EpisodeListItem.tsx";
import { Header } from "../../modules/components/header/Header.tsx";
import { CharacterDetailCard } from "../../modules/components/characterDetailCard/CharacterDetailCard.tsx";
import Skeleton from "react-loading-skeleton";

export const CharacterDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const url = `/character/${id}`;
  const { character, loading, error } = useGetCharacter(url);

  useEffect(() => {
    if (character?.name) {
      document.title = `${character.name} - Rick and Morty`;
    }
  }, [character]);

  if (error) return <span>Error</span>;

  return (
    <div>
      <Header />
      <div className="flex flex-col w-3/5 items-center mx-auto py-10 bg-primary-500 border-ram-blue-700 rounded-lg mt-10 px-4">
        <div className="w-full px-6 gap-y-20">
          <div>
            <h1 className="font-bold text-6xl border-b-1 mb-6">
              {character?.name || <Skeleton />}
            </h1>
          </div>
          <div className="flex w-full">
            {character?.episode ? (
              <Episodes episodeUrls={character.episode} />
            ) : (
              <Skeleton width={360} height={56} count={10} />
            )}
            <CharacterDetailCard loading={loading} character={character} />
          </div>
        </div>
      </div>
    </div>
  );
};

const Episodes = ({ episodeUrls }: { episodeUrls: string[] }) => {
  const {
    episodes: episodeData = [],
    loading: loadingEpisode,
    error: errorEpisode,
  } = useGetMultipleEpisodes(episodeUrls);

  if (loadingEpisode) return <Skeleton width={360} height={56} count={10} />;
  if (errorEpisode) return <span>Error loading episodes</span>;
  if (episodeData.length === 0) return <span>No episodes available</span>;

  return (
    <div className="flex-1">
      <h2 className="font-semibold mb-2 text-gray-300">Appeared in:</h2>
      <div className="max-h-170 flex flex-col overflow-y-auto pr-2 scrollbar mr-2 gap-y-1">
        {episodeData.map((episode) => (
          <EpisodeListItem key={episode.id} episode={episode} />
        ))}
      </div>
    </div>
  );
};
