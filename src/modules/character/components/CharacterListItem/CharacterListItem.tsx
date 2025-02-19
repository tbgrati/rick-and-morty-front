import { Link } from "react-router-dom";
import { EpisodeLink } from "../../../episode/components/EpisodeLink/EpisodeLink.tsx";
import { Episode } from "../../../episode/types/Episode.ts";
import { LocationLink } from "../LocationLink/LocationLink.tsx";
import { StatusChip } from "../StatusChip/StatusChip.tsx";
import { Character } from "../../types/Character.ts";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { LazyImage } from "../../../core/utils/lazyImageLoad/LazyImage.tsx";

type Props = {
  character?: Character;
  episodes?: Episode[];
  loading?: boolean;
  loadingEpisodes?: boolean;
};

export const CharacterListItem = ({
  character,
  loading = false,
  episodes = [],
  loadingEpisodes = false,
}: Props) => {
  if (loading || !character) return <CharacterListItemSkeleton />;

  return (
    <div
      className="rounded-lg flex flex-row gap-4 bg-primary-400 overflow-hidden
        transition-transform duration-200 ease-in-out transform hover:scale-105 shadow-md justify-between"
    >
      {/* Left Section: Image & Details */}
      <div className="flex flex-row gap-4">
        <LazyImage
          src={character.image}
          alt="Character"
          className="w-36 h-36 object-cover"
        />
        <div className="flex flex-col justify-center gap-y-2">
          <Link to={`/character/${character.id}`}>
            <h1 className="font-bold text-2xl hover:text-orange-500">
              {character.name}
            </h1>
          </Link>
          <StatusChip status={character.status} />
          <div className="flex flex-row gap-x-1">
            <h2 className="text-sm text-gray-300 font-semibold">Type: </h2>
            <h2 className="text-sm">{character.type || character.species}</h2>
          </div>
          <div className="flex flex-row gap-x-1">
            <h2 className="text-sm text-gray-300 font-semibold">Origin: </h2>
            <LocationLink
              location={character.origin}
              className="text-sm font-semibold"
            />
          </div>
        </div>
      </div>

      {/* Right Section: Appeared In */}
      <div className="flex flex-col justify-center w-72">
        <h2 className="font-semibold mb-2 text-gray-300">Appeared in:</h2>
        <div className="max-h-20 flex flex-col overflow-y-auto pr-2 scrollbar mr-2 gap-y-1">
          {loadingEpisodes ? (
            <Skeleton count={4} />
          ) : (
            episodes?.map((episode: Episode) => (
              <EpisodeLink key={episode.id} episode={episode} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const CharacterListItemSkeleton = () => {
  return (
    <div
      className="rounded-lg flex flex-row gap-4 bg-primary-400 overflow-hidden
        transition-transform duration-200 ease-in-out transform shadow-md justify-between"
    >
      <div className="flex flex-row gap-4">
        <Skeleton width={144} height={144} />
        <div className="flex flex-col justify-center gap-y-2">
          <Skeleton width={192} height={24} borderRadius={4} />
          <Skeleton width={96} height={20} borderRadius={4} />
          <Skeleton width={96} height={16} borderRadius={4} />
          <Skeleton width={112} height={16} borderRadius={4} />
        </div>
      </div>
      <div className="flex flex-col justify-center w-72">
        <Skeleton width={200} height={16} borderRadius={4} />
        <div className="max-h-20 flex flex-col overflow-y-auto pr-2 scrollbar mr-2 gap-y-1">
          <Skeleton height={16} borderRadius={4} count={3} />
        </div>
      </div>
    </div>
  );
};
