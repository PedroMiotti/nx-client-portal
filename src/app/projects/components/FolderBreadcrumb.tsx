"use client";

import { DriveFolder } from "@/shared/types/File";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useCallback } from "react";

interface FolderBreadcrumbProps {
  projectId: number;
  folder: DriveFolder;
  isRoot?: boolean;
  handleGoBack?: (direction: 'Subfolder' | 'Root') => void;
}

const FolderBreadcrumb = ({
  projectId,
  folder,
  isRoot = true,
  handleGoBack,
}: FolderBreadcrumbProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const crumbs = [{ Id: 0, Name: "Arquivos" }];

  let currentFolder = folder;
  while (currentFolder.ParentFolder) {
    crumbs.push({
      Id: currentFolder.ParentFolder.Id,
      Name: currentFolder.ParentFolder.Name,
    });
    currentFolder = currentFolder.ParentFolder;
  }

  crumbs.push({ Id: folder.Id, Name: folder.Name });

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <Breadcrumb spacing="8px" color={"gray"}>
      {crumbs.map((crumb) => {
        if (crumb.Id === 0) {
          return (
            <BreadcrumbItem key={0}>
              <BreadcrumbLink
                onClick={() =>
                  handleGoBack && !isRoot
                    ? handleGoBack('Root')
                    : router.push(`/projects/${projectId}/file`)
                }
              >
                {crumb.Name}
              </BreadcrumbLink>
            </BreadcrumbItem>
          );
        }

        return (
          <BreadcrumbItem key={crumb.Id}>
            <BreadcrumbLink
              onClick={() => {
                handleGoBack && !isRoot
                  ? handleGoBack('Subfolder')
                  : router.push(
                      pathname +
                        "?" +
                        createQueryString("folderId", crumb.Id.toString())
                    );
              }}
            >
              {crumb.Name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
};

export default FolderBreadcrumb;
