import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { AllToys } from "../shared/APIs/fetchToys";
import { ToyCard } from "./ToyCard";
import { toysListState } from "./toysState";

interface ToysListProps {
  toysList: AllToys;
}

export const ToysList = ({ toysList }: ToysListProps) => {
  // Walmart format?

  return (
    <ToysWrapper>
      {toysList.map((toy) => {
        return (
          <ToyCard
            name={toy.name}
            ownerName={"Owner name"}
            ownerRating={toy.ownerId}
            imgUrl={toy.imgUrl}
            category={toy.category}
          />
        );
      })}
    </ToysWrapper>
  );
};

const ToysWrapper = styled.div`
  width: 70vw;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 3%;
`;
