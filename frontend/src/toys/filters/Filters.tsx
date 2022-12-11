import { Select, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { AllToys, Toy } from "../../shared/APIs/toysService";
import { categoriesData } from "../add-new/AddNewToyForm";
import { toysListState } from "../toysState";
import { keys } from "@mantine/utils";

interface FiltersProps {
  setToysList: (list: AllToys) => void;
}

export const Filters = ({ setToysList }: FiltersProps) => {
  const toysList = useRecoilValue(toysListState);
  const [search, setSearch] = useState("");

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
    console.log(filteredData);
  };

  const categoriesDataWithAllOption = [
    { value: "ALL CATEGORIES", label: "All categories" },
    ...categoriesData,
  ];

  return (
    <>
      <TextInput
        placeholder="Search by any field"
        radius="md"
        mb="md"
        icon={<IconSearch size={14} stroke={1.5} />}
        label="Search"
        value={search}
        onChange={handleSearchChange}
      />
      <Select
        label="Category"
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
