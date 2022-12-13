import { Flex } from "@mantine/core";
import { useRecoilState } from "recoil";
import { AllToys } from "../shared/APIs/toysService";
import { EditToyDrawer } from "./edit-toy/EditToyDrawer";
import { ToyCard } from "./ToyCard";
import { isEditToyDrawerOpenState } from "./toysState";

interface ToysListProps {
  toysList: AllToys;
}

export const ToysList = ({ toysList }: ToysListProps) => {
  const [isOpened, setIsOpened] = useRecoilState(isEditToyDrawerOpenState);

  return (
    <Flex wrap="wrap" gap="lg">
      {toysList.map((toy) => {
        return (
          <ToyCard
            id={toy.id}
            name={toy.name}
            owner={toy.owner ?? null}
            ownerId={toy.ownerId}
            imgUrl={toy.imgUrl}
            category={toy.category}
            description={toy.description}
            status={toy.status}
          />
        );
      })}
      <EditToyDrawer isOpened={isOpened} setIsOpened={setIsOpened} />
    </Flex>
  );
};
