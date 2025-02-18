import { useNavigate } from "react-router-dom";
import { ImageButton } from "../imageButton/ImageButton.tsx";
import { SearchBar } from "../searchBar/SearchBar.tsx";
import IconButton from "../iconButton/IconButton.tsx";
import { FaChevronLeft } from "react-icons/fa";
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
      <div className="flex justify-end items-center w-1/3 gap-x-10 mr-10">
        <div className="w-1/2">
          <SearchBar onSearch={handleSearch} searchOnKeyDown={false} />
        </div>
        <ImageButton
          imageUrl="https://media.tenor.com/BgR83Df82t0AAAAj/portal-rick-and-morty.gif"
          onClick={handleNavigate("/")}
        />
      </div>
    </div>
  );
};
