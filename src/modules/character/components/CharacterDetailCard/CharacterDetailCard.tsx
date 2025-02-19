import { ReactNode } from "react";
import { LocationLink } from "../LocationLink/LocationLink.tsx";
import { Character } from "../../types/Character.ts";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type Props = {
  character?: Character;
  loading?: boolean;
};

type LocationType = { name: string; url: string | null };
export const CharacterDetailCard = ({ character, loading = false }: Props) => {
  if (loading || !character) return <CharacterDetailCardSkeleton />;
  const getDetailValue = (
    label: string,
    value: string | LocationType | null | undefined,
  ): ReactNode => {
    if (label === "ORIGIN" || label === "LOCATION") {
      if (value && typeof value === "object" && "name" in value && value.name) {
        return (
          <LocationLink location={{ name: value.name, url: value.url ?? "" }} />
        );
      }
      return "Unknown";
    }
    return typeof value === "string" ? value : "Unknown";
  };

  return (
    <div>
      <div className="flex-1 flex justify-end">
        <div className="p-1 border-2 rounded-md border-ram-blue-700 w-full max-w-sm">
          <div className="bg-ram-blue-700 text-center font-bold p-1 text-xl m-1 rounded-sm">
            {character?.name}
          </div>
          <img
            src={character.image}
            alt="Character"
            className="w-full h-auto object-cover px-1 rounded-md"
          />
          <div className="bg-ram-blue-700 text-center font-bold p-1 text-xl m-1 rounded-sm">
            Biographical information
          </div>
          <div className="mx-auto">
            {[
              { label: "STATUS", value: character?.status },
              { label: "GENDER", value: character?.gender },
              { label: "SPECIES", value: character?.species },
              {
                label: "TYPE",
                value: character?.type ? character.type : "Normal",
              },
              { label: "ORIGIN", value: character?.origin },
              { label: "LOCATION", value: character?.location },
            ].map(({ label, value }, index) => (
              <div
                key={label}
                className={`grid grid-cols-3 ${
                  index !== 0 ? "border-t-2 border-primary-600" : ""
                }`}
              >
                <span className="font-bold text-ram-blue-500 bg-primary-600 text-right px-4 py-2">
                  {label}
                </span>
                <span className="col-span-2 px-4 py-2">
                  {getDetailValue(label, value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const CharacterDetailCardSkeleton = () => {
  return (
    <div className="flex-1 flex justify-end">
      <div className="p-1 border-2 rounded-md border-ram-blue-700 w-full max-w-sm">
        <div className="bg-ram-blue-700 text-center font-bold p-1 text-xl m-1 rounded-sm h-8"></div>
        <Skeleton width="100%" height={250} borderRadius={8} />
        <div className="bg-ram-blue-700 text-center font-bold p-1 text-xl m-1 rounded-sm h-8"></div>
        <div className="mx-auto">
          {[...Array(6)].map((_, index) => (
            <div key={index} className={`grid grid-cols-3 `}>
              <span className="font-bold text-ram-blue-500 bg-primary-600 text-right px-4 py-4">
                <Skeleton width={80} height={24} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
