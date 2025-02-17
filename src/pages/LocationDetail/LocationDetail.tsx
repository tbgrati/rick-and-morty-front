import { Header } from "../../modules/components/header/Header.tsx";
import { Loader } from "../../modules/components/loader/Loader.tsx";
import { CharacterGridItem } from "../../modules/components/characterGridItem/CharacterGridItem.tsx";
import { useParams } from "react-router-dom";
import { useGetMultipleCharacters } from "../../modules/api/hooks/useGetMultipleCharacters.ts";
import { useEffect } from "react";
import { useGetLocation } from "../../modules/api/hooks/useGetLocation.ts";

export const LocationDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const url = `/location/${id}`;
  const { location, loading, error } = useGetLocation(url);
  const {
    characters,
    loading: characterLoading,
    error: characterError,
  } = useGetMultipleCharacters(location?.residents || []);

  useEffect(() => {
    if (location?.name) {
      document.title = `${location.name} - Rick and Morty`;
    }
  }, [location]);

  if (loading) return <span>Loading...</span>;
  if (error) return <span>Error</span>;

  return (
    <div>
      <Header />
      <div className="flex flex-col w-3/5 items-center mx-auto py-10 bg-primary-500  border-ram-blue-700 gap-y-6 rounded-lg mt-10">
        {/* Title Section */}
        <div className="w-full px-6 flex flex-col gap-y-2">
          <h1 className="font-bold text-5xl border-b-1">{location.name}</h1>
          <div className="flex flex-row gap-x-1">
            <h2 className="text-gray-300 font-semibold">Type:</h2>
            <h2>{location.type}</h2>
          </div>
          <h2>{location.dimension}</h2>
        </div>
        <div className={"w-full px-6"}>
          <h2 className={"font-semibold mb-5"}>Residents:</h2>
          <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
            {characterLoading ? (
              <span>
                <Loader />
              </span>
            ) : characterError ? (
              <span>Error: {characterError}</span>
            ) : (
              <>
                {characters?.length > 0 ? (
                  characters
                    .filter(
                      (character) => character && character.id && character.url,
                    )
                    .map((character) => (
                      <CharacterGridItem
                        key={character.id}
                        url={character.url}
                        episodes={character.episode}
                        image={character.image}
                        name={character.name}
                        origin={character.origin}
                        status={character.status}
                        species={character.species}
                        type={character.type}
                      />
                    ))
                ) : (
                  <span>No characters found</span>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
