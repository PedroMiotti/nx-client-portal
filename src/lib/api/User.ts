import { User } from "@/shared/types/User";
import { Api, BasePaginatedResult, BaseResult } from "./Axios";
import { GetParams } from "@/shared/types/Pagination";

const GATEWAY_PREFIX: string = "/user";

export const fetchUserById = async (id: number) => {
  const { data } = await Api.get<BaseResult<User>>(`${GATEWAY_PREFIX}/${id}`);
  return data.Data;
};

export const fetchAllUsers = async (params?: GetParams) => {
  const { data } = await Api.get<BasePaginatedResult<User[]>>(
    `${GATEWAY_PREFIX}`,
    { params }
  );
  return data;
};
