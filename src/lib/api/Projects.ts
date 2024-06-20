import { GetParams } from "@/shared/types/Pagination";
import { Api, BasePaginatedResult, BaseResult } from "./Axios";
import { Project } from "@/shared/types/Projects";

const GATEWAY_PREFIX: string = "/project";

export const fetchAllClientProjects = async (params?: GetParams) => {
  const { data } = await Api.get<BasePaginatedResult<Project[]>>(
    `${GATEWAY_PREFIX}/user/client`,
    {
      params,
    }
  );
  return data;
};

export const fetchProjectById = async (projectId: number) => {
  const { data } = await Api.get<BaseResult<Project>>(
    `${GATEWAY_PREFIX}/${projectId}`
  );
  return data.Data;
};
