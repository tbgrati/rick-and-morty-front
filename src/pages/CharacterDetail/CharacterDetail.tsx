import { useEffect } from "react";
import { useGetCharacter } from "../../modules/api/hooks/useGetCharacter.ts";
import { useParams } from "react-router-dom";
import { useGetMultipleEpisodes } from "../../modules/api/hooks/useGetMultipleEpisodes.ts";
import { Episode } from "../../modules/core/types/Episode.ts";
import { EpisodeListItem } from "../../modules/components/episodeListItem/EpisodeListItem.tsx";
import { Header } from "../../modules/components/header/Header.tsx";
import { Loader } from "../../modules/components/loader/Loader.tsx";
import { LocationLink } from "../../modules/components/locationLink/LocationLink.tsx";

type LocationType = { name: string; url: string | null };
export const CharacterDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const url = `/character/${id}`;
  const { character, loading, error } = useGetCharacter(url);
  const {
    episodes: episodeData = [],
    loading: loadingEpisode,
    error: errorEpisode,
  } = useGetMultipleEpisodes(character?.episode || []);

  const getDetailValue = (
    label: string,
    value: string | LocationType | null | undefined,
  ) => {
    if (label === "ORIGIN" || label === "LOCATION") {
      return typeof value === "object" && value?.name ? (
        <LocationLink location={{ name: value.name, url: value.url ?? "" }} />
      ) : (
        "Unknown"
      );
    }
    return value || "Unknown";
  };

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
        {/* Title Section */}
        {loading ? (
          <Loader />
        ) : (
          <div className="w-full px-6 gap-y-20">
            <div>
              <h1 className="font-bold text-6xl border-b-1">
                {character?.name}
              </h1>
            </div>
            {/* Content Section: Episodes & Details */}
            <div className="flex w-full">
              {/* Left Section: Episodes */}
              <div className="flex-1">
                <div className="flex flex-col">
                  <h2 className="font-semibold mb-2 text-gray-300">
                    Appeared in:
                  </h2>
                  <div className="max-h-170 flex flex-col overflow-y-auto pr-2 scrollbar mr-2 gap-y-1">
                    {loadingEpisode ? (
                      <span className="text-sm text-gray-400">Loading...</span>
                    ) : errorEpisode ? (
                      <span className="text-sm text-red-400">
                        Error loading episodes
                      </span>
                    ) : (
                      episodeData
                        .filter(
                          (episode: Episode | undefined) =>
                            episode && episode.id && episode.url,
                        )
                        .map((episode: Episode) => (
                          <EpisodeListItem key={episode.id} episode={episode} />
                        ))
                    )}
                  </div>
                </div>
              </div>
              {/* Right Section: Image & Details */}
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
          </div>
        )}
      </div>
    </div>
  );
};
