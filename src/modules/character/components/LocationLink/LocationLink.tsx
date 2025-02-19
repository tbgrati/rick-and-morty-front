import { Link } from "react-router-dom";
interface LocationLinkProps {
  location: { name: string; url: string | null };
  className?: string;
}

export const LocationLink: React.FC<LocationLinkProps> = ({
  location,
  className,
}) => {
  if (!location.name || !location.url) {
    return <span className={className}>{location.name || "Unknown"}</span>;
  }

  const id = location.url.split("/api/location/")[1]?.split("/")[0] || "";

  return (
    <Link
      to={`/location/${id}`}
      className={`hover:text-orange-500 ${className}`}
    >
      {location.name}
    </Link>
  );
};
