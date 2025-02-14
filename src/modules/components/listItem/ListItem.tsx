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
        transition-transform duration-200 ease-in-out transform hover:scale-105 shadow-md">
            <img
                src={image}
                alt="Character"
                className="w-36 h-36 object-cover"
            />
            <div className="flex flex-row gap-4">
                <div>
                    <h1 className="font-bold">{name}</h1>
                    <h2>{status}</h2>
                    <h2>Type: {type? type : species}</h2>
                    <h2>Origin: {origin}</h2>
                </div>
                <div>
                    <h2 className="font-semibold">Appeared in:</h2>
                    <div className="max-h-20 flex flex-col overflow-y-auto pr-2 scrollbar">
                        {episodes.map((episodeUrl, index) => (
                            <EpisodeLink key={index} episodeUrl={episodeUrl} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
