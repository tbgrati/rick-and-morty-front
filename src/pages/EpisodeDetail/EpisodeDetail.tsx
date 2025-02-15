import {useGetEpisode} from "../../modules/api/hooks/useGetEpisode.ts";
import {CharacterGridItem} from "../../modules/components/characterGridItem/CharacterGridItem.tsx";
import {useGetMultipleCharacters} from "../../modules/api/hooks/useGetMultipleCharacters.ts";
import {useParams} from "react-router-dom";
import {useEffect} from "react";


export const EpisodeDetailPage = () => {
    const { id } = useParams<{ id: string }>()
    const url = `/episode/${id}`;
    const { episode, loading, error } = useGetEpisode(url)
    const {characters, characterLoading, characterError} = useGetMultipleCharacters(episode?.characters || []);

    useEffect(() => {
        if (episode?.name) {
            document.title = `${episode.name} - Rick and Morty`
        }
    }, [episode])


    if (loading) return <span>Loading...</span>
    if (error) return <span>Error</span>

    return (
        <div className="flex flex-col w-3/5 items-center mx-auto py-10 bg-primary-500  border-ram-blue-700 gap-y-6 rounded-lg mt-10">
            {/* Title Section */}
            <div className="w-full px-6 ">
                <h1 className="font-bold text-5xl border-b-1">{episode?.name} ({episode?.episode})</h1>
            </div>
            <h2>Aired on: {episode?.air_date}</h2>
            <div className={"w-full px-6"}>
                <h2 className={"font-semibold mb-5"}>Characters that appear in this episode:</h2>
                <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
                    {characterLoading ? (
                        <span>Loading...</span>
                    ) : characterError ? (
                        <span>Error: {characterError}</span>
                    ) : (
                        <>
                            {characters?.length > 0 ? (
                                characters
                                    .filter((character) => character && character.id && character.url)
                                    .map((character) => (
                                        <CharacterGridItem
                                            key={character.id}
                                            url={character.url}
                                            episodes={character.episode}
                                            image={character.image}
                                            name={character.name}
                                            origin={character.origin?.name || "Unknown"}
                                            status={character.status}
                                            species={character.species}
                                            type={character.type}
                                        />
                                    ))
                            ) : (
                                <span>No characters found</span>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}