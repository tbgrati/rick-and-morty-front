import { useState } from "react";
import {useGetAllCharacters} from "../../modules/api/hooks/useGetAllCharacters.ts";
import {ArrowIcon} from "../../modules/core/icons/ArrowIcon.tsx";
import IconButton from "../../modules/components/iconButton/IconButton.tsx";
import {ListItem} from "../../modules/components/listItem/ListItem.tsx";


export const HomePage = () => {
    const [page, setPage] = useState(1);
    const { characters, loading, error, totalPages } = useGetAllCharacters(page);

    const handleNext = () => {
        if (page < totalPages) setPage(page + 1);
    };

    const handlePrevious = () => {
        if (page > 1) setPage(page - 1);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="flex flex-col items-center py-6 gap-4 w-1/2 mx-auto">
            <div className="text-lg">Search bar</div>

            <div className="w-full flex flex-col gap-y-6">
                {characters?.map((character) => (
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

            {/* Pagination Controls */}
            <div className="flex gap-4 items-center mt-6">
                <IconButton
                    icon={
                        <div style={{ transform: "rotate(180deg)" }}>
                            <ArrowIcon width="24" height="24" />
                        </div>
                    }
                    variant={page === 1 ? "disabled" : "primary"}
                    size="medium"
                    rounded="full"
                    onClick={handlePrevious}
                    disabled={page === 1}
                />

                <span className="text-lg font-semibold">Page {page} / {totalPages}</span>

                <IconButton
                    icon={<ArrowIcon width="24" height="24" />}
                    variant={page < totalPages ? "primary" : "disabled"}
                    size="medium"
                    rounded="full"
                    onClick={handleNext}
                    disabled={page === totalPages}
                />
            </div>
        </div>
    );
};
