import { useEffect, useState } from "react";

interface Props {
  intialValue?: string;
  onSearch: (term: string) => void;
  searchOnKeyDown?: boolean; // Enables search after user stops typing
}

export const SearchBar = ({
  intialValue = "",
  onSearch,
  searchOnKeyDown = true,
}: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>(intialValue || "");

  useEffect(() => {
    if (searchOnKeyDown) {
      const timeoutId = setTimeout(() => {
        onSearch(searchTerm);
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [searchTerm, onSearch]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(searchTerm);
    }
  };

  return (
    <div className="w-full">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="🔎 Search..."
        className="w-full px-4 py-2 text-gray-900 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-gray-200"
      />
    </div>
  );
};
