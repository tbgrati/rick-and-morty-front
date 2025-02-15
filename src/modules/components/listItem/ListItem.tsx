import {EpisodeLink} from "../episodeLink/EpisodeLink.tsx";

type Props = {
    image: string;
    name: string;
    status: string;
    species: string;
    type: string;
    origin: string;
    episodes: string[];
}

export const ListItem = ({ image, name, status, species, type, origin, episodes }: Props) => {
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
                <div className="flex flex-col justify-center">
                    <h1 className="font-bold text-lg">{name}</h1>
                    <h2 className="text-sm">{status}</h2>
                    <h2 className="text-sm">Type: {type ? type : species}</h2>
                    <h2 className="text-sm">Origin: {origin}</h2>
                </div>
            </div>

            {/* Right Section: Appeared In */}
            <div className="flex flex-col justify-center w-72">
                <h2 className="font-semibold">Appeared in:</h2>
                <div className="max-h-20 flex flex-col overflow-y-auto pr-2 scrollbar mr-2">
                    {episodes.map((episodeUrl, index) => (
                        <EpisodeLink key={index} episodeUrl={episodeUrl} />
                    ))}
                </div>
            </div>
        </div>
    );
};

