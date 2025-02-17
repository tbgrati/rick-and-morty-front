import { useSearchParams } from "react-router-dom";
import { genders, species, status } from "../../core/types/Categories.ts";

export const FilterBox = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const toggleFilter = (category: string, value: string) => {
    const currentValue = searchParams.get(category);
    const newParams = new URLSearchParams(searchParams);

    if (currentValue === value) {
      newParams.delete(category);
    } else {
      newParams.set(category, value);
    }

    setSearchParams(newParams);
  };

  const renderFilters = (
    title: string,
    category: string,
    options: string[],
  ) => (
    <div className="flex flex-col gap-2">
      <h1 className="font-semibold">{title}</h1>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            className={`px-3 py-1 rounded-md border ${
              searchParams.get(category) === option
                ? "bg-orange-500 text-white"
                : "bg-primary-500"
            }`}
            onClick={() => toggleFilter(category, option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-4 border rounded-md flex flex-col gap-4">
      {renderFilters("Species", "species", species)}
      {renderFilters("Gender", "gender", genders)}
      {renderFilters("Status", "status", status)}
    </div>
  );
};
