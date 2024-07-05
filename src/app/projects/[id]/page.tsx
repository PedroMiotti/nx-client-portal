"use client";

import {
  Box,
  Button,
  Flex,
  Heading,
  Progress,
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
import ArchiveTable from "@/components/Drive/ArchiveTable";
import ProjectPhaseProgress from "../components/ProjectPhaseProgress";
import { useMemo } from "react";
import { Task } from "@/shared/types/Projects";

export default function ProjectHome() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const projectId = params.id;
  const folderId = searchParams.get("folderId");

  const { data, isLoading } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => fetchProjectById(Number(projectId)),
  });

  const { data: archives, isLoading: archivesIsLoading } = useQuery({
    queryKey: ["project:folder", projectId, folderId],
    queryFn: () => fetchProjectFolderContent(Number(projectId), folderId),
  });

  const projectProgress = useMemo(() => {
    if (!data || data.Phase.length === 0) return 0;

    const allTasks = data.Phase.reduce((acc, phase) => {
      return [...acc, ...(phase?.Task ?? [])];
    }, [] as Task[]);

    const concludedPercentage = allTasks.filter(
      (task) =>
        task.BoardStatus.BoardStatusTypeId === 3 ||
        task.BoardStatus.BoardStatusTypeId === 4
    ).length;

    return Math.ceil((concludedPercentage / allTasks.length) * 100);
  }, [data]);

  if (isLoading || archivesIsLoading || !data) return <Loader />;

  return (
    <Flex h={"full"} w={"full"} p={8} direction={"row"} gap={6}>
      <Flex flex={1} h={"full"} direction={"column"} gap={6}>
        <Flex
          w={"full"}
          rounded={"xl"}
          border={"1px solid"}
          borderColor={"#E9E9E9"}
        >
          <Flex
            w={"full"}
            border={"1px solid"}
            rounded={"xl"}
            borderColor={"#E9E9E9"}
            justifyContent={"center"}
            alignItems={"center"}
            position="relative"
            flex={1}
          >
            <Image
              src={Casa1}
              alt="Logo"
              fill
              style={{ objectFit: "cover", borderRadius: "10px" }}
            />
          </Flex>
          <Flex
            direction={"column"}
            justify={"start"}
            align={"start"}
            h={"full"}
            flex={1}
            p={4}
            gap={2}
          >
            <Text
              fontWeight={"semibold"}
              fontFamily={"title"}
              color={"#494949"}
              fontSize={"lg"}
              whiteSpace={"wrap"}
              overflow={"hidden"}
              maxW={"auto"}
            >
              {data?.Name}
            </Text>

            <Tag colorScheme="blue" size={"sm"}>
              {data?.Tag}
            </Tag>

            <Text
              fontFamily={"title"}
              color={"#727272"}
              fontWeight={"500"}
              fontSize={"sm"}
            >
              Local: Residencial Giverny, Sorocaba-SP
            </Text>
          </Flex>
        </Flex>

        <Flex
          border={"1px solid"}
          borderColor={"#E9E9E9"}
          w={"full"}
          rounded={"xl"}
          gap={2}
          direction={"column"}
        >
          <Flex
            justify={"space-between"}
            w={"full"}
            align={"center"}
            p={"25px 25px 0 25px"}
          >
            <Flex direction={"column"}>
              <Heading fontSize={"lg"} color={"#494949"} fontWeight={"light"}>
                {`Arquivos (${archives?.files?.length})`}
              </Heading>
              <Text fontFamily={"title"} color={"#B3B3B3"} fontSize={"sm"}>
                Recentes
              </Text>
            </Flex>
            <Button
              leftIcon={<MdOutlineOpenInNew />}
              bg="blue.500"
              color={"white"}
              size={"sm"}
              onClick={() => router.push(`/projects/${projectId}/file`)}
            >
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
              <ArchiveTable
                files={[
                  ...(archives?.files ?? []),
                  ...(archives?.folders ?? []),
                ]}
              />
            )}
          </Box>
        </Flex>
      </Flex>
      <Flex
        flex={1}
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
              <Heading fontSize={"lg"} color={"#494949"} fontWeight={"light"}>
                Etapas
              </Heading>
            </Flex>
            <Flex direction={"row"} align={"center"} flex={1} gap={2}>
              <Text fontSize={"xs"}>Progresso total:</Text>
              <Progress
                colorScheme="green"
                size="xs"
                value={projectProgress}
                rounded={"md"}
                w={"50%"}
              />
              <Text textAlign={"end"} fontSize={"xs"} color={"#B3B3B3"}>
                {projectProgress}%
              </Text>
            </Flex>
          </Flex>
          <Flex w={"full"}>
            <ProjectPhaseProgress project={data} />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
