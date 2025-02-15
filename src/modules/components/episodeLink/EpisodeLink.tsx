import {Episode} from "../../types/Episode.ts";

type Props = {
    episode: Episode;
};

export const EpisodeLink = ({ episode }: Props) => {
    return (
        <div>
            <a
                href={episode.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-400 font-semibold hover:text-orange-500"
            >
                {episode.name} ({episode.episode})
            </a>
        </div>
    );
};
