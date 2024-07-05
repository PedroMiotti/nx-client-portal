import {
    CreateOrganizationSettingsRequest,
    OrganizationSettings,
    UpdateOrganizationSettingsRequest,
  } from "@/shared/types/OrganizationSettings";
  import { Api, BaseResult } from "./Axios";
  
  const GATEWAY_PREFIX: string = "/organization-settings";
  
  export const fetchOrganizationSettingsById = async (id: number) => {
    const { data } = await Api.get<BaseResult<OrganizationSettings>>(
      `${GATEWAY_PREFIX}/${id}`
    );
    return data.Data;
  };
  
  export const fetchOrganizationSettingsByOwnerId = async (id: number) => {
    const { data } = await Api.get<BaseResult<OrganizationSettings>>(
      `${GATEWAY_PREFIX}/owner/${id}`
    );
    return data.Data;
  };
  
  export const createOrganizationSettings = async (
    user: CreateOrganizationSettingsRequest
  ) => {
    const { data } = await Api.post<BaseResult<OrganizationSettings>>(
      `${GATEWAY_PREFIX}`,
      user
    );
    return data.Data;
  };
  
  export const updateOrganizationSettings = async (
    id: number,
    dto: UpdateOrganizationSettingsRequest
  ) => {
    const { data } = await Api.patch<BaseResult<OrganizationSettings>>(
      `${GATEWAY_PREFIX}/${id}`,
      dto
    );
    return data.Data;
  };
  