import { Character } from "../../types/Character.ts";
import { CharacterGridItem } from "../CharacterGridItem/CharacterGridItem.tsx";
import { CharacterListItem } from "../CharacterListItem/CharacterListItem.tsx";
import { useGetMultipleEpisodes } from "../../../api/hooks/useGetMultipleEpisodes.ts";
import { Episode } from "../../../episode/types/Episode.ts";

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
  const episodeIds = Array.from(
    new Set(characters.flatMap((character) => character.episode)),
  );
  const { episodes = [], loading: loadingEpisodes } =
    episodeIds.length > 0
      ? useGetMultipleEpisodes(episodeIds)
      : { episodes: [], loading: false };

  const episodeMap = Object.fromEntries(episodes.map((ep) => [ep.id, ep]));

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
      {!loading && characters.length > 0 ? (
        characters.map((character) =>
          isGridView ? (
            <CharacterGridItem key={character.id} character={character} />
          ) : (
            <CharacterListItem
              key={character.id}
              character={character}
              episodes={character.episode
                .map((epUrl) => {
                  const id = epUrl.split("/").pop();
                  return id ? episodeMap[id] : undefined;
                })
                .filter((ep): ep is Episode => Boolean(ep))}
              loadingEpisodes={loadingEpisodes}
            />
          ),
        )
      ) : !loading ? (
        <div className="text-center text-lg font-semibold text-gray-600 mt-5">
          No characters found
        </div>
      ) : null}
    </div>
  );
};
