import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { HttpStatusCode } from "axios";
import { authenticate, logout } from "../api/Auth";
import { User } from "@/shared/types/User";
import { UserType } from "@/shared/enum/User";
import { TokenPayload } from "@/shared/types/Auth";
import { fetchUserById } from "../api/User";
import { OrganizationSettings } from "@/shared/types/OrganizationSettings";
import { fetchOrganizationSettingsByOwnerId } from "../api/OrganizationSettings";

export type AuthenticateRequestDto = {
  document: string;
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
  ParentId: number;
  IsMaster: false;
};

type ClientUser = User & {
  UserTypeId: UserType.CLIENT;
  ParentId: number;
  IsMaster: false;
};

export type CurrentUser = AdminUser | MemberUser | OwnerUser | ClientUser;

interface UserContextType {
  user: CurrentUser | null;
  organizationSettings: OrganizationSettings | null;
  handleAuthenticate: (
    dto: AuthenticateRequestDto
  ) => Promise<boolean | undefined>;
  handleLogout: () => Promise<void>;
  //   permissions: UserPermission[];
}

export const UserContext = createContext<UserContextType>({
  user: {} as CurrentUser,
  organizationSettings: {} as OrganizationSettings,
  handleAuthenticate: async () => false,
  handleLogout: async () => {},
  //   permissions: [],
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [organizationSettings, setOrganizationSettings] = useState<OrganizationSettings | null>(null);
  const [permissions, setPermissions] = useState<[]>([]);

  const handleAuthenticate = async (
    dto: AuthenticateRequestDto
  ): Promise<boolean | undefined> => {
    return authenticate(dto.document)
      .then(async (response) => {
        if (response && response.status === HttpStatusCode.Created) {
          const { AccessToken, RefreshToken } = response.data;

          Cookies.set("arc:client:access_token", AccessToken);
          Cookies.set("arc:client:refresh_token", RefreshToken);

          const payload: TokenPayload = jwtDecode(AccessToken);

          const user = await fetchUserById(+payload.Id);

          if (!user) return false;

          const isMasterUser = user.UserTypeId === UserType.OWNER;
          const ownerId = isMasterUser ? user.Id : user.ParentId
          
          const organizationSettings = await fetchOrganizationSettingsByOwnerId(ownerId!);

          setOrganizationSettings(organizationSettings);

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
    const accessToken = Cookies.get("arc:client:access_token");

    if (!accessToken) return;

    // await logout(accessToken);

    Cookies.remove("arc:client:access_token");
    Cookies.remove("arc:client:refresh_token");
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
      const accessToken = Cookies.get("arc:client:access_token");

      if (!accessToken) return;

      const payload: TokenPayload = jwtDecode(accessToken);

      const fetchedUser = await fetchUserById(+payload.Id);

      if (fetchedUser.UserTypeId === UserType.MEMBER)
        setUser(fetchedUser as MemberUser);
      else setUser(fetchedUser as AdminUser | OwnerUser);

      const isMasterUser = fetchedUser.UserTypeId === UserType.OWNER;
      const ownerId = isMasterUser ? fetchedUser.Id : fetchedUser.ParentId
      const organizationSettings = await fetchOrganizationSettingsByOwnerId(ownerId!);

      setOrganizationSettings(organizationSettings);
    })();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        organizationSettings,
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
