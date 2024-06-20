"use client";

import {
  Flex,
  Image,
  Box,
  Text,
  Divider,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Avatar,
  useToast,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  PiFilePdf,
  PiMicrosoftWordLogo,
  PiMicrosoftExcelLogo,
  PiFileDoc,
  PiFileText,
  PiFileVideo,
  PiFileAudio,
} from "react-icons/pi";
import Typography from "../Typography";

import {
  MdDriveFolderUpload,
  MdOutlineCloudDownload,
  MdDriveFileRenameOutline,
  MdDeleteOutline,
} from "react-icons/md";
import { formatDateTime } from "@/shared/utils/Date";
import { blobToURL } from "@/shared/utils/Blob";
import { DriveFile } from "@/shared/types/File";

interface FileProps {
  file: DriveFile;
  handleRename?: (file: DriveFile) => void;
  handleMove?: (file: DriveFile) => void;
  refetch: () => void;
}

const File = ({ file, handleRename, handleMove, refetch }: FileProps) => {
  const toast = useToast();

  const handleDownload = async () => {
    const response = await fetch(file.Url);
    const blob = await response.blob();
    const url = await blobToURL(blob);
    const a = document.createElement("a");

    a.href = url as string;
    a.download = file.Name + file.Extension;
    a.click();
  };

  return (
    <Flex
      flexDir={"column"}
      gap={2}
      borderRadius={"8px"}
      bg={"#f0f4f9"}
      w={"250px"}
      h={"210px"}
      p={"8px 8px 0px 8px"}
      _hover={{ cursor: "pointer" }}
    >
      <Box id="header">
        <Flex align={"center"} justify={"space-between"} px={1}>
          <Typography.Body
            whiteSpace={"nowrap"}
            overflow={"hidden"}
            textOverflow={"ellipsis"}
            maxW={"190px"}
            text={file.Name + file.Extension}
            fontWeight={"500"}
            px={1}
          />

          <Menu>
            <MenuButton
              flex={1}
              maxW={"40px"}
              color={"#172b4d"}
              as={IconButton}
              icon={<BsThreeDotsVertical />}
            />

            <MenuList>
              <MenuItem
                icon={<MdOutlineCloudDownload fontSize={"17px"} />}
                onClick={handleDownload}
              >
                Download
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Box>

      <Flex
        id="content"
        align={"center"}
        justify={"center"}
        p={2}
        gap={2}
        w={"100%"}
        h={"100%"}
        maxH={"108px"}
        bg={"white"}
      >
        {file.MimeType?.includes("application/pdf") ? (
          <PiFilePdf fontSize={"50px"} color="red" />
        ) : file.Extension === ".docx" ? (
          <PiMicrosoftWordLogo fontSize={"50px"} color="blue" />
        ) : file.Extension === ".xlsx" ? (
          <PiMicrosoftExcelLogo fontSize={"50px"} color="green" />
        ) : file.MimeType?.includes("image/") ? (
          <Box width={"100%"} height={"100%"}>
            <Image
              src={file.Url}
              alt="preview"
              height={"100%"}
              maxW={"100%"}
              objectFit={"cover"}
            />
          </Box>
        ) : file.MimeType?.includes("text/") ? (
          <PiFileText fontSize={"50px"} />
        ) : file.MimeType?.includes("video/") ? (
          <PiFileVideo fontSize={"50px"} />
        ) : file.MimeType?.includes("audio/") ? (
          <PiFileAudio fontSize={"50px"} />
        ) : (
          <PiFileDoc fontSize={"50px"} />
        )}
      </Flex>

      <Flex id="footer" p={"4px 4px 0px 4px"} gap={2} align={"center"}>
        <Avatar size="xs" name={file?.User?.Name} />
        <Flex fontSize={"11px"} color={"#737375"}>
          <Text
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "80px",
            }}
          >
            {file?.User?.Name}
          </Text>{" "}
          - {formatDateTime(file?.CreatedAt)}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default File;
