import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { userState } from "../session/sessionState";
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
  const user = useRecoilValue(userState);
  const navigate = useNavigate();

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
      <UserWidget
        onClick={() => {
          if (user) {
            navigate(`/user/${user.id}`);
          }
        }}
      >
        {user?.name}
      </UserWidget>
    </Navbar>
  );
};

const LinksWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-grow: 1;
`;

const UserWidget = styled.div`
  background-color: #00a3ad;
  color: white;
  margin-right: 40px;
  margin-left: 20px;
  padding: 5px 15px;
  border-radius: 10px;
`;
