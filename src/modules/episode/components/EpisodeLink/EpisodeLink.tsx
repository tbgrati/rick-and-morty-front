import { Episode } from "../../types/Episode.ts";
import { Link } from "react-router-dom";

type Props = {
  episode: Episode;
  className?: string;
};

export const EpisodeLink = ({ episode, className }: Props) => {
  return (
    <div>
      <Link
        to={`/episode/${episode.id}`}
        className={`text-sm text-ram-blue-500 font-semibold hover:text-orange-500 text-left hover:cursor-pointer ${className}`}
      >
        {episode.name} ({episode.episode})
      </Link>
    </div>
  );
};
