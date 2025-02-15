import { Link } from "react-router-dom";
import { EpisodeLink } from "../episodeLink/EpisodeLink.tsx";
import { Episode } from "../../types/Episode.ts";
import { useGetMultipleEpisodes } from "../../api/hooks/useGetMultipleEpisodes.ts";

type Props = {
    url: string;
    image: string;
    name: string;
    status: string;
    species: string;
    type: string;
    origin: string;
    episodes: string[];
};

export const CharacterListItem = ({ url, image, name, status, species, type, origin, episodes }: Props) => {
    const id = url.split("/api/character/")[1]?.split("/")[0] || "";
    const { episodes: episodeData = [], loading, error } = useGetMultipleEpisodes(episodes);

    return (
        <div className="rounded-lg flex flex-row gap-4 bg-primary-400 overflow-hidden
        transition-transform duration-200 ease-in-out transform hover:scale-105 shadow-md justify-between">

            {/* Left Section: Image & Details */}
            <div className="flex flex-row gap-4">
                <img
                    src={image}
                    alt="Character"
                    className="w-36 h-36 object-cover"
                />
                <div className="flex flex-col justify-center gap-y-2">
                    <Link to={`/character/${id}`}>
                        <h1 className="font-bold text-2xl hover:text-orange-500">{name}</h1>
                    </Link>
                    <h2 className="text-sm flex items-center font-semibold">
                      <span
                          className={`inline-block w-2 h-2 mr-2 rounded-full ${
                              status.toLowerCase() === "alive"
                                  ? "bg-green-500"
                                  : status.toLowerCase() === "dead"
                                      ? "bg-red-500"
                                      : "bg-gray-500"
                          }`}
                      ></span>
                        {status}
                    </h2>
                    <div className="flex flex-row gap-x-1">
                        <h2 className="text-sm text-gray-300 font-semibold">Type: </h2>
                        <h2 className="text-sm">{type || species}</h2>
                    </div>
                    <div className="flex flex-row gap-x-1">
                        <h2 className="text-sm text-gray-300 font-semibold">Origin: </h2>
                        <h2 className="text-sm">{origin}</h2>
                    </div>
                </div>
            </div>

            {/* Right Section: Appeared In */}
            <div className="flex flex-col justify-center w-72">
                <h2 className="font-semibold mb-2 text-gray-300">Appeared in:</h2>
                <div className="max-h-20 flex flex-col overflow-y-auto pr-2 scrollbar mr-2 gap-y-1">
                    {loading ? (
                        <span className="text-sm text-gray-400">Loading...</span>
                    ) : error ? (
                        <span className="text-sm text-red-400">Error loading episodes</span>
                    ) : (
                        episodeData
                            .filter((episode: Episode | undefined) => episode && episode.id && episode.url)
                            .map((episode: Episode) => (
                                <EpisodeLink key={episode.id} episode={episode} />
                            ))
                    )}
                </div>
            </div>
        </div>
    );
};
