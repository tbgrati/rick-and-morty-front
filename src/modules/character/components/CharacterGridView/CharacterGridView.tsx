import { useGetMultipleCharacters } from "../../../api/hooks/useGetMultipleCharacters.ts";
import { CharacterGridItem } from "../CharacterGridItem/CharacterGridItem.tsx";

type Props = {
  characterUrls?: string[];
};

export const CharacterGridView = ({ characterUrls }: Props) => {
  const shouldLoadCharacters = characterUrls && characterUrls.length > 0;
  const { characters = [], loading } = shouldLoadCharacters
    ? useGetMultipleCharacters(characterUrls || [])
    : { characters: [], loading: false };

  if (characterUrls?.length === 0) return <h1>No characters reside here</h1>;

  if (loading)
    return (
      <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
        {[...Array(8)].map(() => (
          <CharacterGridItem loading={true} />
        ))}
      </div>
    );

  return (
    <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
      {characters?.length > 0 ? (
        characters.map((character) => (
          <CharacterGridItem character={character} />
        ))
      ) : (
        <span>No characters found</span>
      )}
    </div>
  );
};
