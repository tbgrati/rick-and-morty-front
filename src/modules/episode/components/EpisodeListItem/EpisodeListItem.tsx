import { Episode } from "../../types/Episode.ts";
import { Link } from "react-router-dom";

export const EpisodeListItem = ({ episode }: { episode: Episode }) => {
  return (
    <div className={"mb-4"}>
      {/* Episode Title */}
      <Link to={`/episode/${episode.id}`}>
        <h1 className="font-bold text-2xl hover:text-orange-500">
          {episode.name}
        </h1>
      </Link>
      {/* Episode Details */}
      <div className="flex flex-col gap-y-2">
        <h2 className="text-sm flex items-center font-semibold">
          {episode.air_date}
        </h2>
        <div className="flex flex-row gap-x-1">
          <h2 className="text-sm text-gray-300 font-semibold">Episode: </h2>
          <h2 className="text-sm">{episode.episode}</h2>
        </div>
      </div>
    </div>
  );
};
