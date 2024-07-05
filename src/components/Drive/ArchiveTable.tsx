import { DriveFile, DriveFolder } from "@/shared/types/File";
import { createColumnHelper } from "@tanstack/react-table";
import DataTable from "../Table";

import {
  Avatar,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useToast,
} from "@chakra-ui/react";
import {
  PiFilePdf,
  PiMicrosoftWordLogo,
  PiMicrosoftExcelLogo,
  PiFileDoc,
  PiFileText,
  PiFileVideo,
  PiFileAudio,
  PiFolderSimpleFill,
} from "react-icons/pi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineCloudDownload } from "react-icons/md";
import { blobToURL } from "@/shared/utils/Blob";
import { downloadFolder } from "@/lib/api/Drive";
import { useAuthenticateUser } from "@/lib/context/user";

type ArchiveFile = DriveFile | DriveFolder;

interface ArchiveTableProps {
  files: ArchiveFile[];
}

const ArchiveTable = ({ files }: ArchiveTableProps) => {
  const toast = useToast();
  const { organizationSettings } = useAuthenticateUser();

  const handleDownloadFile = async (file: DriveFile) => {
    const response = await fetch(file.Url);
    const blob = await response.blob();
    const url = await blobToURL(blob);
    const a = document.createElement("a");

    a.href = url as string;
    a.download = file.Name + file.Extension;
    a.click();
  };

  const handleDownloadFolder = async (folder: DriveFolder) => {
    const downloadPromise = new Promise((resolve, reject) => {
      downloadFolder(folder.Id)
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `${folder.Name}.zip`);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);

          resolve("Pasta baixada com sucesso");
        })
        .catch((error) => reject(error));
    });

    toast.promise(downloadPromise, {
      success: {
        title: "Download realizado com sucesso",
        position: "top-right",
      },
      error: {
        title:
          "Erro ao fazer o download da pasta. Tente novamente mais tarde ou contate o suporte Nexus.",
        position: "top-right",
      },
      loading: { title: "Download está em andamento", position: "top-right" },
    });
  };

  const archiveColumnBuilder = createColumnHelper<ArchiveFile>();

  const archiveColumns = [
    archiveColumnBuilder.accessor("Name", {
      cell: (info) => {
        const fileExtension = (info.row.original as DriveFile)?.Extension;
        const isFile = fileExtension !== undefined;

        return (
          <Flex align={"center"} gap={2}>
            <ArchiveFileIcon
              mimeType={(info.row.original as DriveFile)?.MimeType ?? "Folder"}
            />
            <Text
              whiteSpace={"nowrap"}
              textOverflow={"ellipsis"}
              overflow={"hidden"}
              maxW={"230px"}
            >
              {info.getValue()}
              {isFile ? fileExtension : ""}
            </Text>
          </Flex>
        );
      },
      header: "Nome",
    }),
    archiveColumnBuilder.display({
      id: "ModifiedBy",
      cell: (info) => {
        return (
          <Flex gap={1} align={"center"}>
            <Avatar
              size={"sm"}
              src={organizationSettings?.LogoUrl}
              name={organizationSettings?.Name}
            />
            <Text>Equipe {organizationSettings?.Name}</Text>
          </Flex>
        );
      },
      header: "Criador",
    }),
    archiveColumnBuilder.display({
      id: "Actions",
      cell: (info) => {
        const isFile =
          (info.row.original as DriveFile)?.Extension !== undefined;

        return (
          <Menu matchWidth>
            <MenuButton
              flex={1}
              size={"xs"}
              variant={"ghost"}
              as={IconButton}
              icon={<BsThreeDotsVertical />}
            />

            <MenuList>
              <MenuItem
                icon={<MdOutlineCloudDownload fontSize={"17px"} />}
                onClick={() => {
                  if (isFile)
                    handleDownloadFile(info.row.original as DriveFile);
                  else handleDownloadFolder(info.row.original as DriveFolder);
                }}
              >
                Download
              </MenuItem>
            </MenuList>
          </Menu>
        );
      },
      header: "Ações",
    }),
  ];

  return (
    <DataTable columns={archiveColumns} loading={false} data={files ?? []} />
  );
};

const ArchiveFileIcon = ({ mimeType }: { mimeType: string }) => {
  switch (mimeType) {
    case "Folder":
      return <PiFolderSimpleFill fontSize={"15px"} color="#3182ce" />;
    case "application/pdf":
      return <PiFilePdf fontSize={"15px"} />;
    case "application/msword":
      return <PiMicrosoftWordLogo fontSize={"15px"} />;
    case "application/vnd.ms-excel":
      return <PiMicrosoftExcelLogo fontSize={"15px"} />;
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return <PiFileDoc fontSize={"15px"} />;
    case "text/plain":
      return <PiFileText fontSize={"15px"} />;
    case "video/mp4":
      return <PiFileVideo fontSize={"15px"} />;
    case "audio/mpeg":
      return <PiFileAudio fontSize={"15px"} />;
    default:
      return <PiFileText fontSize={"15px"} />;
  }
};

export default ArchiveTable;
