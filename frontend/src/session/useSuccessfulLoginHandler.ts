import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { getUserData } from "../shared/APIs/userService";
import { userState } from "./sessionState";
import jwtDecode from "jwt-decode";

interface IDecodedToken {
  username: string;
  iat: number;
  sub: string;
}

export const useSuccessfulLoginHandler = () => {
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();

  const setUserAndRedirect = async (access_token: string) => {
    localStorage.setItem("authToken", access_token);

    const decodedToken: IDecodedToken = jwtDecode(access_token);

    const userData = await getUserData(decodedToken.sub);

    setUser(userData);

    navigate("/toys");
  };

  return { setUserAndRedirect };
};
