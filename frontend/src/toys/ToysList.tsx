import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { fakeToys } from "./fakeToys";
import { ToyCard } from "./ToyCard";

interface Toy {
  ownerName: string;
  ownerId: number;
  category: string;
  name: string;
  imgUrl: string;
}

export const ToysList = () => {
  // Walmart format?
  const [toysList, setToysList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get("http://localhost:3000/toy/toys");
      setToysList(data.data);
    };
    fetchData();
  }, []);

  return (
    <ToysWrapper>
      {toysList.map((toy: Toy) => {
        return (
          <ToyCard
            name={toy.name}
            ownerName={toy.ownerName}
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
  gap: 20px;
  margin-bottom: 3%;
`;
