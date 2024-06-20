import { DriveFolder } from "@/shared/types/File";
import {
  Flex,
  Menu,
  MenuButton,
  IconButton,
  Divider,
  MenuItem,
  MenuList,
  useToast,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiFolder } from "react-icons/fi";
import Typography from "../Typography";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import {
  MdDriveFolderUpload,
  MdOutlineCloudDownload,
  MdDriveFileRenameOutline,
  MdDeleteOutline,
} from "react-icons/md";
import { downloadFolder } from "@/lib/api/Drive";

interface FolderProps {
  folder: DriveFolder;
  handleRename?: (folder: DriveFolder) => void;
  handleMove?: (folder: DriveFolder) => void;
  refetch: () => void;
}

const Folder = ({ folder, handleRename, handleMove, refetch }: FolderProps) => {
  const toast = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleDownloadFolder = async () => {
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

  return (
    <Flex
      bg={"#f0f4f9"}
      borderRadius={"md"}
      height={"55px"}
      w={"267px"}
      p={2}
      align={"center"}
      justify={"space-between"}
      gap={2}
      _hover={{ cursor: "pointer" }}
    >
      <Flex
        align={"center"}
        px={2}
        gap={2}
        flex={2}
        onClick={() =>
          router.push(
            pathname + "?" + createQueryString("folderId", folder.Id.toString())
          )
        }
      >
        <FiFolder fontSize={"18px"} />
        <Typography.Body text={folder.Name} fontWeight={"600"} />
      </Flex>

      <Menu>
        <MenuButton
          flex={1}
          zIndex={10}
          color={"#172b4d"}
          maxW={"40px"}
          as={IconButton}
          icon={<BsThreeDotsVertical />}
        />
        <MenuList>
          <MenuItem
            icon={<MdOutlineCloudDownload fontSize={"17px"} />}
            onClick={handleDownloadFolder}
          >
            Download
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default Folder;
