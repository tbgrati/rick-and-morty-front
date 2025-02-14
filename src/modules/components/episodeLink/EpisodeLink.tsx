import {useGetEpisode} from "../../api/hooks/useGetEpisode.ts";

type Props = {
    episodeUrl: string;
};

export const EpisodeLink = ({ episodeUrl }: Props) => {
    const extracted = episodeUrl.split("/api")[1];
    const { episode, loading, error } = useGetEpisode(extracted)


    if (loading) return <span className="text-sm text-gray-400">Loading...</span>;
    if (error) return <span className="text-sm text-red-400">Error</span>;

    return (
        <div>
            <a
                href={episodeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-400 hover:underline"
            >
                {episode?.name} ({episode?.episode})
            </a>
        </div>
    );
};
