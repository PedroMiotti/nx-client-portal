import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { HttpStatusCode } from "axios";
import { authenticate, logout } from "../api/Auth";
import { User } from "@/shared/types/User";
import { UserType } from "@/shared/enum/User";
import { TokenPayload } from "@/shared/types/Auth";
import { fetchUserById } from "../api/User";

export type AuthenticateRequestDto = {
  email: string;
  password: string;
};

type AdminUser = User & {
  UserTypeId: UserType.ADMIN;
  ParentId: undefined;
  RoleId: undefined;
};

type OwnerUser = User & {
  UserTypeId: UserType.OWNER;
  ParentId: undefined;
  IsMaster: true;
};

type MemberUser = User & {
  UserTypeId: UserType.MEMBER;
  ParentUserId: number;
  IsMaster: false;
};

type ClientUser = User & {
  UserTypeId: UserType.CLIENT;
  ParentUserId: number;
  IsMaster: false;
};

export type CurrentUser = AdminUser | MemberUser | OwnerUser | ClientUser;

interface UserContextType {
  user: CurrentUser | null;
  handleAuthenticate: (
    dto: AuthenticateRequestDto
  ) => Promise<boolean | undefined>;
  handleLogout: () => Promise<void>;
  //   permissions: UserPermission[];
}

export const UserContext = createContext<UserContextType>({
  user: {} as CurrentUser,
  handleAuthenticate: async () => false,
  handleLogout: async () => {},
  //   permissions: [],
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [permissions, setPermissions] = useState<[]>([]);

  const handleAuthenticate = async (
    dto: AuthenticateRequestDto
  ): Promise<boolean | undefined> => {
    return authenticate(dto.email, dto.password)
      .then(async (response) => {
        if (response && response.status === HttpStatusCode.Created) {
          const { AccessToken, RefreshToken } = response.data;

          Cookies.set("arc:access_token", AccessToken);
          Cookies.set("arc:refresh_token", RefreshToken);

          const payload: TokenPayload = jwtDecode(AccessToken);

          const user = await fetchUserById(+payload.Id);

          if (!user) return false;

          if (user.UserTypeId === UserType.MEMBER) setUser(user as MemberUser);
          else setUser(user as AdminUser | OwnerUser);

          //   await getPermissions(user.data);

          return true;
        }
      })
      .catch(() => {
        return false;
      });
  };

  const handleLogout = async () => {
    const accessToken = Cookies.get("arc:access_token");

    if (!accessToken) return;

    // await logout(accessToken);

    Cookies.remove("arc:access_token");
    Cookies.remove("arc:refresh_token");
    localStorage.clear();

    setUser(null);
  };

  const getPermissions = async (user: User) => {
    // const permissions = await getUserPermissions(user.id, teamId);
    setPermissions([]);
  };

  useEffect(() => {
    if (!user) return;
    getPermissions(user);
  }, []);

  useEffect(() => {
    if (user) return;

    (async () => {
      const accessToken = Cookies.get("arc:access_token");

      if (!accessToken) return;

      const payload: TokenPayload = jwtDecode(accessToken);

      const fetchedUser = await fetchUserById(+payload.Id);

      if (fetchedUser.UserTypeId === UserType.MEMBER)
        setUser(fetchedUser as MemberUser);
      else setUser(fetchedUser as AdminUser | OwnerUser);
    })();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        handleAuthenticate,
        handleLogout,
        // permissions,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useAuthenticateUser = () => {
  return useContext(UserContext) as UserContextType;
};
