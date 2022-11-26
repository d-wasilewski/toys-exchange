import { Flex } from "@mantine/core";
import { AllToys } from "../shared/APIs/toysService";
import { ToyCard } from "./ToyCard";

interface ToysListProps {
  toysList: AllToys;
}

export const ToysList = ({ toysList }: ToysListProps) => {
  return (
    <Flex wrap="wrap" gap="lg">
      {toysList.map((toy) => {
        return (
          <ToyCard
            id={toy.id}
            name={toy.name}
            owner={toy.owner}
            ownerId={toy.ownerId}
            imgUrl={toy.imgUrl}
            category={toy.category}
            description={toy.description}
          />
        );
      })}
    </Flex>
  );
};
