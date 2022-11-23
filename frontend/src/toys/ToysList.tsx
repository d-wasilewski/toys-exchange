import { Flex } from "@mantine/core";
import styled from "styled-components";
import { AllToys } from "../shared/APIs/fetchToys";
import { ToyCard } from "./ToyCard";

interface ToysListProps {
  toysList: AllToys;
}

export const ToysList = ({ toysList }: ToysListProps) => {
  // Walmart format?

  return (
    <Flex wrap="wrap" gap="lg">
      {toysList.map((toy) => {
        return (
          <ToyCard
            id={toy.id}
            name={toy.name}
            ownerName={"Owner name"}
            ownerRating={toy.ownerId}
            ownerId={toy.ownerId}
            imgUrl={toy.imgUrl}
            category={toy.category}
          />
        );
      })}
    </Flex>
  );
};
