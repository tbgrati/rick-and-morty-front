import {ListItem} from "../../modules/components/listItem/ListItem.tsx";
import {useGetAllCharacters} from "../../modules/api/hooks/useGetAllCharacters.ts";
import {Character} from "../../modules/types/character.ts";


export const HomePage = () => {
    const { characters, loading, error } = useGetAllCharacters();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="flex flex-col items-center py-6 gap-4 w-1/2 mx-auto">
            <div className="text-lg">Search bar</div>
            <div className="w-full flex flex-col gap-y-6">
                {characters?.map((character: Character) => (
                    <ListItem
                        key={character.id}
                        episodes={character.episode}
                        image={character.image}
                        name={character.name}
                        origin={character.origin.name}
                        status={character.status}
                        species={character.species}
                        type={character.type}
                    />
                ))}
            </div>
        </div>
    );
};