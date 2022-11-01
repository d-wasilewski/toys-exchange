import styled from "styled-components";
import { NAVBAR_HEIGHT } from "./Navbar";

interface LinkProps {
  onClick: () => void;
  label: string;
  match: boolean;
}
export const Link = ({ label, match, onClick }: LinkProps) => (
  <LinkWrapper onClick={onClick} isActive={match}>
    <p>{label}</p>
  </LinkWrapper>
);

const LinkWrapper = styled.div<{
  isActive: boolean;
}>`
  position: relative;
  display: flex;
  height: ${NAVBAR_HEIGHT}px;
  align-items: center;
  cursor: pointer;
  padding: 0 16px;
  color: white;
  border-color: ${({ isActive }) => (isActive ? "red" : "transparent")};

  &::after {
    content: "";
    border-bottom: 5px solid;
    position: absolute;
    bottom: 0;
    right: 16px;
    left: 16px;
    border-color: ${({ isActive }) => (isActive ? "green" : "transparent")};
  }
`;
