import { useSearchParams } from "react-router-dom";
import { genders, species, status } from "../../types/Categories.ts";
import Chip from "../../../core/components/Chip/Chip.tsx";

type Props = {
  onChange: () => void;
};

export const FilterBox = ({ onChange }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const toggleFilter = (category: string, value: string) => {
    const currentValue = searchParams.get(category);
    const newParams = new URLSearchParams(searchParams);

    if (currentValue === value) {
      newParams.delete(category);
    } else {
      newParams.set(category, value);
    }
    onChange();
    setSearchParams(newParams);
  };

  const renderFilters = (
    title: string,
    category: string,
    options: string[],
  ) => (
    <div className="flex flex-col gap-2">
      <h1 className="font-semibold">{title}</h1>
      <div className="flex flex-wrap gap-2 gap-y-4">
        {options.map((option) => (
          <Chip
            key={option}
            text={option}
            variant={
              searchParams.get(category) === option ? "active" : "primary"
            }
            onClick={() => toggleFilter(category, option)}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-4 rounded-lg  flex flex-col gap-4 sticky top-10 bg-primary-500">
      {renderFilters("Species", "species", species)}
      {renderFilters("Gender", "gender", genders)}
      {renderFilters("Status", "status", status)}
    </div>
  );
};
