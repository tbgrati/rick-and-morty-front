import { Character } from "../../core/types/Character.ts";
import { CharacterGridItem } from "../characterGridItem/CharacterGridItem.tsx";
import { CharacterListItem } from "../characterListItem/CharacterListItem.tsx";

type Props = {
  characters: Character[];
  isGridView?: boolean;
  loading?: boolean;
};

export const CharacterItems = ({
  characters,
  isGridView = false,
  loading = false,
}: Props) => {
  const SkeletonItems = () => (
    <div
      className={
        isGridView
          ? "grid gap-6 grid-cols-[repeat(auto-fit,minmax(250px,1fr))] w-full"
          : "w-full flex flex-col gap-y-6"
      }
    >
      {Array.from({ length: 6 }).map((_, index) =>
        isGridView ? (
          <CharacterGridItem key={index} loading={true} />
        ) : (
          <CharacterListItem key={index} loading={true} />
        ),
      )}
    </div>
  );

  return (
    <div
      className={
        isGridView
          ? "grid gap-6 grid-cols-[repeat(auto-fit,minmax(250px,1fr))] w-full"
          : "w-full flex flex-col gap-y-6"
      }
    >
      {loading && <SkeletonItems />}
      {!loading && characters && characters.length > 0 ? (
        characters.map((character) =>
          isGridView ? (
            <CharacterGridItem key={character.id} character={character} />
          ) : (
            <CharacterListItem key={character.id} character={character} />
          ),
        )
      ) : !loading && (!characters || characters.length === 0) ? (
        <div className="text-center text-lg font-semibold text-gray-600 mt-5">
          No characters found
        </div>
      ) : null}
    </div>
  );
};
