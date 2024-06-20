import { UserType } from "../enum/User";

export type TokenPayload = {
  Id: string;
  Email: string;
  ClientId: string;
  OwnerId: string;
};
