import { Link } from "react-router-dom";

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
export const CharacterGridItem = ({
  url,
  image,
  name,
  status,
  species,
  type,
  origin,
}: Props) => {
  const id = url.split("/api/character/")[1]?.split("/")[0] || "";

  return (
    <div className="max-w-80 max-h-95 rounded-lg bg-primary-400 overflow-hidden transition-transform duration-200 ease-in-out transform hover:scale-105 shadow-md">
      <img src={image} alt="Character" className="w-full h-48 object-cover" />
      {/* Details section below */}
      <div className="p-4 flex flex-col gap-2">
        <Link to={`/character/${id}`}>
          <h1 className="font-bold text-2xl hover:text-orange-500">{name}</h1>
        </Link>
        {/* Status chip */}
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
        {/* Type and Origin */}
        <div className="flex flex-row gap-x-1">
          <h2 className="text-sm text-gray-300 font-semibold">Type:</h2>
          <h2 className="text-sm">{type || species}</h2>
        </div>
        <div className="flex flex-row gap-x-1">
          <h2 className="text-sm text-gray-300 font-semibold">Origin:</h2>
          <h2 className="text-sm">{origin}</h2>
        </div>
      </div>
    </div>
  );
};
