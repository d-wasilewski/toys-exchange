import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { ToysList } from "./ToysList";
import { myToysListState } from "./toysState";

export const MyToysView = () => {
  const myToysList = useRecoilValue(myToysListState);

  return (
    <PageWrapper>
      <h1>List of my toys</h1>
      <ToysList toysList={myToysList} />
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding-top: 54px;
`;
