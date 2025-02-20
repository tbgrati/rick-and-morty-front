import { useGetMultipleCharacters } from "../../../api/hooks/useGetMultipleCharacters.ts";
import { CharacterGridItem } from "../CharacterGridItem/CharacterGridItem.tsx";

export const CharacterGridView = ({
  characterUrls,
}: {
  characterUrls: string[];
}) => {
  const { characters, loading } = useGetMultipleCharacters(characterUrls);

  if (characterUrls.length === 0) return <h1>No characters reside here</h1>;

  if (loading)
    return (
      <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
        {[...Array(8)].map(() => (
          <CharacterGridItem loading={true} />
        ))}
      </div>
    );

  return (
    <>
      {characters?.length > 0 ? (
        characters.map((character) => (
          <CharacterGridItem character={character} />
        ))
      ) : (
        <span>No characters found</span>
      )}
    </>
  );
};
