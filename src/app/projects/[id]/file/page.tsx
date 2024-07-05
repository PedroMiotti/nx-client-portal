"use client";

import Typography from "@/components/Typography";
import { Flex, Grid, Text } from "@chakra-ui/react";
import File from "@/components/Drive/File";
import Folder from "@/components/Drive/Folder";
import { fetchProjectFolderContent } from "@/lib/api/Drive";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/Loader";

import { useRouter, useSearchParams } from "next/navigation";
import FolderBreadcrumb from "../../components/FolderBreadcrumb";

const Page = ({ params }: { params: { id: string } }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const projectId = params.id;
  const folderId = searchParams.get("folderId");

  const { data, isLoading } = useQuery({
    queryKey: ["project:folder", projectId, folderId],
    queryFn: () => fetchProjectFolderContent(Number(projectId), folderId),
  });

  if (isLoading) return <Loader />;

  return (
    <Flex
      flexDir={"column"}
      gap={5}
      h={"100vh"}
      px="60px"
      py={14}
      minH="30rem"
      bg={"white"}
    >
      <Text
        fontSize={"xs"}
        color={"gray.400"}
        _hover={{ cursor: "pointer" }}
        onClick={() => router.push(`/projects/${projectId}`)}
      >
        {"<-"} Voltar
      </Text>
      <Flex align={"center"} justify={"space-between"}>
        <Typography.Header title="Arquivos" />
      </Flex>

      {folderId && (
        <FolderBreadcrumb
          folder={data?.folder!}
          projectId={Number(projectId!)}
        />
      )}

      <Flex p={2} flexDir={"column"} gap={4}>
        <Typography.Subheader text={`Pastas (${data?.folders.length})`} />

        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
            xl: "repeat(5, 1fr)",
          }}
          gap={4}
        >
          {data?.folders.map((folder) => {
            return <Folder key={folder.Id} folder={folder} />;
          })}
        </Grid>
      </Flex>

      <Flex p={2} flexDir={"column"} gap={4}>
        <Typography.Subheader text={`Arquivos (${data?.files?.length})`} />

        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
            xl: "repeat(5, 1fr)",
          }}
          gap={4}
        >
          {data?.files?.map((file) => {
            return <File key={file.Id} file={file} />;
          })}
        </Grid>
      </Flex>
    </Flex>
  );
};

export default Page;
