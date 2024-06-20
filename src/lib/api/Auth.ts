import { Api } from "./Axios";
import mem from "mem";
import Cookies from "js-cookie";

const GATEWAY_PREFIX: string = "/auth";

export const authenticate = (document: string) => {
  return Api.post(`${GATEWAY_PREFIX}/login/client`, { document });
};

export const refreshSession = (accessToken: string, refreshToken: string) => {
  return Api.post(`${GATEWAY_PREFIX}/tokens/refresh`, {
    accessToken,
    refreshToken,
  });
};

export const logout = (accessToken: string) => {
  return Api.post(`${GATEWAY_PREFIX}/logout`, { accessToken });
};

export const _refreshToken = async () => {
  const currentRefreshToken = Cookies.get("arc:refresh_token");
  const currentAccessToken = Cookies.get("arc:access_token");

  if (!currentRefreshToken || !currentAccessToken) return;

  try {
    const response = await refreshSession(
      currentAccessToken,
      currentRefreshToken
    );

    const { AccessToken, RefreshToken } = response?.data;
    if (!AccessToken || !RefreshToken) {
      window.location.href = "/auth/login";
      Cookies.remove("arc:refresh_token");
      Cookies.remove("arc:access_token");
    }

    Cookies.set("arc:access_token", AccessToken);
    Cookies.set("arc:refresh_token", RefreshToken);

    return {
      AccessToken,
      RefreshToken,
    };
  } catch (e) {
    console.log(e);
    window.location.href = "/auth/login";
    Cookies.remove("arc:refresh_token");
    Cookies.remove("arc:access_token");
  }
};

export const memoizedRefreshToken = mem(_refreshToken, {
  maxAge: 10000,
});
