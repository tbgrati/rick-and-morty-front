import { useNavigate } from "react-router-dom";
import { SearchBar } from "../SearchBar/SearchBar.tsx";
import IconButton from "../IconButton/IconButton.tsx";
import { FaChevronLeft, FaHome } from "react-icons/fa";
export const Header = () => {
  const navigate = useNavigate();
  const handleNavigate = (path: string) => {
    return () => {
      navigate(path);
    };
  };

  const handleBack = () => {
    navigate(-1);
  };
  const handleSearch = (term: string) => {
    if (term.trim() === "") return;
    navigate(`/?name=${encodeURIComponent(term)}`);
  };

  return (
    <div className="bg-primary-700 p-2 sticky top-0 h-16 flex flex-row w-full z-50">
      <IconButton
        icon={<FaChevronLeft size={24} />}
        size="medium"
        rounded="full"
        onClick={handleBack}
        variant="secondary"
        className="mr-auto"
      />
      <div className="flex justify-end items-center w-1/5 gap-x-5 mr-5">
        <SearchBar onSearch={handleSearch} searchOnKeyDown={false} />
        <IconButton
          icon={<FaHome size={24} />}
          size="medium"
          rounded="full"
          onClick={handleNavigate("/")}
          variant="secondary"
        />
      </div>
    </div>
  );
};
