import { useState } from "react";
import {useGetFilteredCharacters} from "../../modules/api/hooks/useGetFilteredCharacters.ts";
import {ArrowIcon} from "../../modules/core/icons/ArrowIcon.tsx";
import IconButton from "../../modules/components/iconButton/IconButton.tsx";
import {CharacterListItem} from "../../modules/components/characterListItem/CharacterListItem.tsx";
import {SearchBar} from "../../modules/components/searchBar/SearchBar.tsx";
import {useSearchParams} from "react-router-dom";


export const HomePage = () => {
    const [searchParams] = useSearchParams();
    const queryName = searchParams.get("name") || "";

    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState(queryName);

    const { characters, loading, error, totalPages } = useGetFilteredCharacters(page, {
        name: searchTerm,
    });

    const handleSearch = (term: string) => {
        if (term.trim() === "") return;
        setSearchTerm(term);
        setPage(1);
    };

    const handleNext = () => {
        if (page < totalPages) setPage(page + 1);
    };

    const handlePrevious = () => {
        if (page > 1) setPage(page - 1);
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="flex flex-col items-center py-6 gap-4 w-1/2 mx-auto">
            <div>
                <SearchBar onSearch={handleSearch}/>
            </div>

            <div className="w-full flex flex-col gap-y-6">
                {/* The API returns an error message when no results are found */}
                {error ? (
                    <div className="text-center text-lg font-semibold text-gray-600 mt-5">
                        No characters found
                    </div>
                ) : characters && characters.length > 0 ? (
                    characters.map((character) => (
                        <CharacterListItem
                            key={character.id}
                            url={character.url}
                            episodes={character.episode}
                            image={character.image}
                            name={character.name}
                            origin={character.origin.name}
                            status={character.status}
                            species={character.species}
                            type={character.type}
                        />
                    ))
                ) : (
                    <div className="text-center text-lg font-semibold text-gray-600 mt-5">
                        No characters found
                    </div>
                )}
            </div>

            {/* Pagination Controls */}
            {error? null : <div className="flex gap-4 items-center mt-6">
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
            </div>}
        </div>
    );
};
