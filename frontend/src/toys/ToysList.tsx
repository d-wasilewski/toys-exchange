import styled from "styled-components";
import { fakeToys } from "./fakeToys";
import { ToyCard } from "./ToyCard";

export const ToysList = () => {
  // Walmart format?

  return (
    <ToysWrapper>
      {fakeToys.map((toy) => {
        return (
          <ToyCard
            name={toy.name}
            ownerName={toy.ownerName}
            ownerRating={toy.ownerRating}
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
  gap: 20px;
  margin-bottom: 3%;
`;
