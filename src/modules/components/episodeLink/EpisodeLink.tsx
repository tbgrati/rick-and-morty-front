import { Episode } from "../../types/Episode.ts";
import { useNavigate } from "react-router-dom";

type Props = {
  episode: Episode;
};

export const EpisodeLink = ({ episode }: Props) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/episode/${episode.id}`);
  };

  return (
    <div>
      <button
        onClick={handleNavigate}
        className="text-sm text-blue-400 font-semibold hover:text-orange-500 text-left hover:cursor-pointer"
      >
        {episode.name} ({episode.episode})
      </button>
    </div>
  );
};
