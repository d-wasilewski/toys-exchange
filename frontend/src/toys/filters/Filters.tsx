import { Select, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { AllToys, Toy } from "../../shared/APIs/toysService";
import { generateCategoriesData } from "../add-new/AddNewToyForm";
import { toysListState } from "../toysState";
import { keys } from "@mantine/utils";
import { useI18nContext } from "../../i18n/i18n-react";

interface FiltersProps {
  setToysList: (list: AllToys) => void;
}

export const Filters = ({ setToysList }: FiltersProps) => {
  const toysList = useRecoilValue(toysListState);
  const [search, setSearch] = useState("");
  const { LL } = useI18nContext();

  function filterData(data: Toy[], search: string) {
    const query = search.toLowerCase().trim();
    return data.filter((item) =>
      keys(data[0]).some((key) =>
        String(item[key]).toLowerCase().includes(query)
      )
    );
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    const filteredData = filterData(toysList, value);
    setToysList(filteredData);
  };

  const categoriesDataWithAllOption = [
    { value: "ALL CATEGORIES", label: LL.filters.allCategories() },
    ...generateCategoriesData(LL),
  ];

  return (
    <>
      <TextInput
        placeholder={LL.filters.searchByAny()}
        radius="md"
        mb="md"
        icon={<IconSearch size={14} stroke={1.5} />}
        label={LL.filters.search()}
        value={search}
        onChange={handleSearchChange}
      />
      <Select
        label={LL.filters.category()}
        radius="md"
        placeholder={categoriesDataWithAllOption[0].label}
        data={categoriesDataWithAllOption}
        onChange={(x) => {
          if (x === "ALL CATEGORIES") {
            setToysList(toysList);
          } else {
            setToysList(toysList.filter((toy) => toy.category === x));
          }
        }}
      />
    </>
  );
};
