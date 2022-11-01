import styled from "styled-components";
import { Link } from "./Link";

import { Navbar } from "./Navbar";

interface AppNavbarProps {
  links: {
    label: string;
    url: string;
  }[];
  onLinkClick: (path: string) => void;
  isMatch: (path: string) => boolean;
}

export const AppNavbar = ({ links, onLinkClick, isMatch }: AppNavbarProps) => {
  return (
    <Navbar>
      <LinksWrapper>
        {links.map((link) => {
          return (
            <Link
              label={link.label}
              onClick={() => onLinkClick(link.url)}
              match={isMatch(link.url)}
            />
          );
        })}
      </LinksWrapper>
    </Navbar>
  );
};

const LinksWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-grow: 1;
`;
