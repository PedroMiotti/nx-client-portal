"use client";

import {
  Box,
  Button,
  Flex,
  Heading,
  Progress,
  SimpleGrid,
  Tag,
  Text,
} from "@chakra-ui/react";
import { MdOutlineOpenInNew } from "react-icons/md";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Casa1 from "../../../../public/images/CasaPoles1.jpg";
import PhasesAccordion from "@/components/PhasesAccordion";
import { useQuery } from "@tanstack/react-query";
import { fetchProjectById } from "@/lib/api/Projects";
import Loader from "@/components/Loader";
import { fetchProjectFolderContent } from "@/lib/api/Drive";
import File from "@/components/Drive/File";

export default function ProjectHome() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = useParams();
  const projectId = params.id;
  const folderId = searchParams.get("folderId");

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => fetchProjectById(Number(projectId)),
  });

  const { data: archives, isLoading: archivesIsLoading } = useQuery({
    queryKey: ["project:folder", projectId, folderId],
    queryFn: () => fetchProjectFolderContent(Number(projectId), folderId),
  });

  if (isLoading || archivesIsLoading) return <Loader />;
  return (
    <Flex h={"full"} w={"full"} p={8} direction={"row"} gap={8}>
      <Flex w={"50%"} h={"full"} direction={"column"} gap={8}>
        <Flex
          w={"full"}
          h={"212px"}
          border={"1px solid"}
          rounded={"xl"}
          borderColor={"#E9E9E9"}
          display={"flex"}
        >
          <Box
            w={"45%"}
            border={"1px solid"}
            rounded={"xl"}
            borderColor={"#E9E9E9"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            position="relative"
          >
            <Image
              src={Casa1}
              alt="Logo"
              fill
              style={{ objectFit: "cover", borderRadius: "10px" }}
            />
          </Box>
          <Flex
            direction={"column"}
            justify={"start"}
            align={"start"}
            h={"full"}
            w={"55%"}
            p={4}
            gap={2}
          >
            <Flex
              direction={"row"}
              w={"full"}
              justify={"space-between"}
              align={"center"}
              mb={4}
            >
              <Text
                fontSize={"2xl"}
                fontFamily={"title"}
                color={"#494949"}
                fontWeight={"semibold"}
              >
                {data?.Name}
              </Text>
              <Text
                fontFamily={"title"}
                color={"#727272"}
                fontWeight={"semibold"}
              >
                <Tag colorScheme="red">{data?.Tag}</Tag>
              </Text>
            </Flex>
            <Text
              fontFamily={"title"}
              color={"#727272"}
              fontWeight={"semibold"}
            >
              Local: Residencial Giverny, Sorocaba-SP
            </Text>

            <Text
              fontFamily={"title"}
              color={"#727272"}
              fontWeight={"semibold"}
            >
              Ano: {data?.CreatedAt?.substring(0, 4)}
            </Text>
          </Flex>
        </Flex>
        <Flex
          border={"1px solid"}
          borderColor={"#E9E9E9"}
          w={"full"}
          h={"450px"}
          rounded={"xl"}
          p={6}
          gap={3}
          direction={"column"}
        >
          <Flex
            justify={"space-between"}
            w={"full"}
            align={"center"}
            h={"50px"}
          >
            <Flex direction={"column"}>
              <Heading fontSize={"2xl"} color={"#494949"} fontWeight={"light"}>
                {`Arquivos (${archives?.files?.length})`}
              </Heading>
              <Text
                fontFamily={"title"}
                color={"#B3B3B3"}
                fontSize={"sm"}
                fontWeight={"semibold"}
              >
                Pastas alteradas recentemente:
              </Text>
            </Flex>
            <Button leftIcon={<MdOutlineOpenInNew />} colorScheme="blue">
              Ver todos
            </Button>
          </Flex>
          <Box
            p={2}
            flexDir={"column"}
            gap={4}
            overflowX={"hidden"}
            overflowY={"scroll"}
            sx={{
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-track": {
                background: "#e0e0e0",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#888",
                borderRadius: "4px",
                border: "2px solid #e0e0e0",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "#555",
              },
            }}
          >
            {!archives ? (
              <Flex>Sem nenhum arquivo</Flex>
            ) : (
              <>
                <Flex mt={2} p={2} flexDir={"column"} gap={4}>
                  <SimpleGrid columns={2} spacing={2}>
                    {archives?.files?.map((file) => {
                      return (
                        <File key={file.Id} file={file} refetch={refetch} />
                      );
                    })}
                  </SimpleGrid>
                </Flex>
              </>
            )}
          </Box>
        </Flex>
      </Flex>
      <Flex
        w={"50%"}
        h={"690px"}
        rounded={"xl"}
        border={"1px solid"}
        borderColor={"#E9E9E9"}
        p={6}
      >
        <Flex
          h={"70px"}
          w={"full"}
          justify={"space-between"}
          align={"center"}
          direction={"column"}
          gap={10}
        >
          <Flex
            justify={"space-between"}
            align={"center"}
            w={"full"}
            direction={"row"}
          >
            <Flex flex={1}>
              <Heading fontSize={"3xl"} color={"#494949"} fontWeight={"light"}>
                Etapas
              </Heading>
            </Flex>
            <Flex direction={"row"} align={"center"} flex={1}>
              <Flex w={"50%"}>
                <Text fontSize={"sm"} color={"#B3B3B3"}>
                  Progresso total:
                </Text>
              </Flex>
              <Flex direction={"column"} w={"50%"}>
                <Text textAlign={"end"}>15%</Text>
                <Progress
                  colorScheme="green"
                  size="sm"
                  value={20}
                  rounded={"md"}
                />
              </Flex>
            </Flex>
          </Flex>
          <Flex w={"full"}>
            <PhasesAccordion />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
