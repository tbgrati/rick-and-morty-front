import { useEffect, useState } from "react";
import { useGetFilteredCharacters } from "../../modules/api/hooks/useGetFilteredCharacters.ts";
import IconButton from "../../modules/components/iconButton/IconButton.tsx";
import { SearchBar } from "../../modules/components/searchBar/SearchBar.tsx";
import { useSearchParams } from "react-router-dom";
import {
  FaThList,
  FaGripHorizontal,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { FilterBox } from "../../modules/components/filterBox/FilterBox.tsx";
import { CharacterItems } from "../../modules/components/characterItems/CharacterItems.tsx";

export const HomePage = () => {
  document.title = `Home - Rick and Morty`;

  const [searchParams, setSearchParams] = useSearchParams();
  const queryName = searchParams.get("name") || "";

  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(queryName);
  const [isGridView, setIsGridView] = useState(false);
  const { ...otherFilters } = Object.fromEntries(searchParams.entries());

  const { characters, loading, error, totalPages } = useGetFilteredCharacters(
    page,
    {
      name: searchTerm,
      ...otherFilters,
    },
  );

  useEffect(() => {
    setSearchTerm(queryName);
  }, [queryName]);

  const handleSearch = (term: string) => {
    if (term !== searchTerm) {
      const newParams = new URLSearchParams(searchParams);
      if (term.trim() === "") {
        newParams.delete("name");
      } else {
        newParams.set("name", term);
      }
      setSearchParams(newParams);
      setPage(1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div className="flex flex-col items-center py-6 gap-8 w-3/5 mx-auto">
      {/* Top Section: Search Bar and Grid/List view toggle */}
      <div className="w-full flex items-center justify-center gap-x-2">
        <div className="w-1/2">
          <SearchBar intialValue={queryName} onSearch={handleSearch} />
        </div>
        <IconButton
          icon={
            isGridView ? <FaThList size={24} /> : <FaGripHorizontal size={24} />
          }
          onClick={() => setIsGridView(!isGridView)}
          variant="primary"
          size="medium"
          rounded="full"
        />
      </div>

      {/* Characters Display and Filter Box*/}
      <div className={"flex flex-row w-full gap-x-8"}>
        <div className={"max-w-60"}>
          <FilterBox onChange={() => setPage(1)} />
        </div>
        <CharacterItems
          characters={error ? [] : characters}
          loading={loading}
          isGridView={isGridView}
        />
      </div>
      {/* Pagination Controls */}
      {error ? null : (
        <div className="flex gap-4 items-center mt-6">
          <IconButton
            icon={<FaChevronLeft size={24} />}
            variant={page === 1 ? "disabled" : "primary"}
            size="medium"
            rounded="full"
            onClick={handlePrevious}
            disabled={page === 1}
          />

          <span className="text-lg font-semibold">
            Page {page} / {totalPages}
          </span>

          <IconButton
            icon={<FaChevronRight size={24} />}
            variant={page < totalPages ? "primary" : "disabled"}
            size="medium"
            rounded="full"
            onClick={handleNext}
            disabled={page === totalPages}
          />
        </div>
      )}
    </div>
  );
};
