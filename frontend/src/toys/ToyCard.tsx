import styled from "styled-components";

interface ToyCardProps {
  ownerName: string;
  ownerRating: number;
  category: string;
  name: string;
  imgUrl: string;
}

export const ToyCard = ({
  name,
  category,
  imgUrl,
  ownerName,
  ownerRating,
}: ToyCardProps) => {
  return (
    <CardWrapper>
      <Image src={imgUrl} />
      <OwnerDetails>
        <div>{ownerName}</div>
        <div>{ownerRating}</div>
      </OwnerDetails>
      <div>{category}</div>
      <div>{name}</div>
      <button>Swap</button>
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  width: 220px;
  height: 300px;
  background-color: coral;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 50%;
  object-fit: contain;
`;

const OwnerDetails = styled.div`
  display: flex;
  justify-content: space-between;
`;
