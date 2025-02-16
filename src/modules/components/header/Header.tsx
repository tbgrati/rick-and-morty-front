import { useNavigate } from "react-router-dom";
import { ImageButton } from "../imageButton/ImageButton.tsx";
import { SearchBar } from "../searchBar/SearchBar.tsx";

export const Header = () => {
  const navigate = useNavigate();
  const handleNavigate = (path: string) => {
    return () => {
      navigate(path);
    };
  };

  const handleSearch = (term: string) => {
    if (term.trim() === "") return;
    navigate(`/?name=${encodeURIComponent(term)}`);
  };

  return (
    <div
      className={
        "bg-primary-700 p-2 flex flex-row-reverse sticky top-0 h-16 px-10 items-center z-50 "
      }
    >
      <ImageButton
        imageUrl={
          "https://media.tenor.com/BgR83Df82t0AAAAj/portal-rick-and-morty.gif"
        }
        onClick={handleNavigate("/")}
      />
      <div className={"w-1/6 mx-10"}>
        <SearchBar onSearch={handleSearch} searchOnKeyDown={false} />
      </div>
    </div>
  );
};
