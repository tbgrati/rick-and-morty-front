import {useState} from "react";

interface Props {
    onSearch: (term: string) => void;
    searchOnKeyDown?: boolean; // Optional prop to control search behavior
}

export const SearchBar = ({ onSearch, searchOnKeyDown = true }: Props) => {
    const [searchTerm, setSearchTerm] = useState("");

    // This will handle the keypress event for Enter key
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            onSearch(searchTerm);
        }
    };

    // This handles search on every keystroke
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        if (searchOnKeyDown) {
            onSearch(e.target.value);
        }
    };

    return (
        <div className="w-full">
            <input
                type="text"
                value={searchTerm}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                placeholder="🔎 Search..."
                className="w-full px-4 py-2 text-gray-900 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-gray-200"
            />
        </div>
    );
};