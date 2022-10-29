import { ReactNode } from "react";
import styled from "styled-components";

interface NavbarProps {
  children: ReactNode;
}
export const Navbar = ({ children }: NavbarProps) => (
  <NavbarWrapper>
    <NavbarContent>{children}</NavbarContent>
  </NavbarWrapper>
);

export const NAVBAR_HEIGHT = 54;

const NavbarWrapper = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  width: 100vw;
  height: ${NAVBAR_HEIGHT}px;
  background: #1b1d21;
`;

const NavbarContent = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;
