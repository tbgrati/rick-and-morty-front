import { Link } from "react-router-dom";
import { LocationLink } from "../locationLink/LocationLink.tsx";
import { StatusChip } from "../statusChip/StatusChip.tsx";
import { Character } from "../../core/types/Character.ts";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type Props = {
  character?: Character;
  loading?: boolean;
};
export const CharacterGridItem = ({ character, loading = false }: Props) => {
  if (loading || !character) return <CharacterGridItemSkeleton />;

  return (
    <div className="max-w-80 max-h-95 rounded-lg bg-primary-400 overflow-hidden transition-transform duration-200 ease-in-out transform hover:scale-105 shadow-md">
      <img
        src={character.image}
        alt="Character"
        className="w-full h-48 object-cover"
      />
      {/* Details section */}
      <div className="p-4 flex flex-col gap-2">
        <Link to={`/character/${character.id}`}>
          <h1 className="font-bold text-2xl hover:text-orange-500">
            {character.name}
          </h1>
        </Link>
        <StatusChip status={character.status} />
        {/* Type and Origin */}
        <div className="flex flex-row gap-x-1">
          <h2 className="text-sm text-gray-300 font-semibold">Type:</h2>
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
  );
};
const CharacterGridItemSkeleton = () => {
  return (
    <div className="max-w-80 max-h-95 rounded-lg bg-primary-400 overflow-hidden transition-transform duration-200 ease-in-out transform hover:scale-105 shadow-md">
      <Skeleton width={320} height={192} borderRadius={0} />
      <div className="p-4 flex flex-col gap-2">
        <Skeleton width={180} height={24} borderRadius={4} />
        <Skeleton width={100} height={20} borderRadius={4} />
        <Skeleton width={120} height={16} borderRadius={4} />
        <Skeleton width={140} height={16} borderRadius={4} />
      </div>
    </div>
  );
};
