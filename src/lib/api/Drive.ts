import { DriveFile, DriveFolder } from "@/shared/types/File";
import { Api, BaseResult } from "./Axios";

const GATEWAY_PREFIX: string = "/drive";

export const downloadFolder = async (id: number) => {
  const { data } = await Api.get(`${GATEWAY_PREFIX}/folder/${id}/download`, {
    responseType: "blob",
  });

  return data;
};

export const fetchProjectFolderContent = async (
  id: number,
  folderId: string | null
) => {
  const { data } = await Api.get<
    BaseResult<{
      folders: DriveFolder[];
      files: DriveFile[];
      folder: DriveFolder | null;
    }>
  >(`${GATEWAY_PREFIX}/folder/project/${id}`, {
    params: { FolderId: folderId },
  });
  return data.Data;
};
