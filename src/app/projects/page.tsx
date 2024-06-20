"use client";

import CardProjects from "@/components/Cards/CardProjects";
import { fetchAllClientProjects } from "@/lib/api/Projects";
import { useAuthenticateUser } from "@/lib/context/user";
import { usePaginatedQuery } from "@/lib/hooks/usePaginatedQuery";
import { DashboardProjectCardData } from "@/shared/mocks/Projects";
import { Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import Casa1 from "../../../public/images/CasaPoles1.jpg";
import Loader from "@/components/Loader";

export default function Projects() {
  const { user } = useAuthenticateUser();
  const router = useRouter();
  const {
    data: projects,
    isLoading: isProjectsLoading,
    page,
    handlePageChange,
    searchQuery,
    handleSearchQueryChange,
    refetch: refetchProjects,
  } = usePaginatedQuery({
    queryKey: ["projects"],
    fetch: (page, search) => {
      return fetchAllClientProjects({
        PageNumber: page,
        PageSize: 10,
        Query: search,
      });
    },
  });

  if (isProjectsLoading) return <Loader />;

  return (
    <Flex w={"full"} h={"100vh"} justify={"center"} align={"center"}>
      <Flex direction={"column"} textAlign={"center"} gap={16}>
        <Flex direction={"column"}>
          <Heading fontFamily={"title"} fontWeight={"regular"}>
            Bem-vindo(a), {user?.Name}!
          </Heading>
          <Text fontFamily={"title"} fontWeight={"regular"} fontSize={"2xl"}>
            Selecione o seu projeto.
          </Text>
        </Flex>
        <Flex w={"full"}>
          <SimpleGrid columns={3} spacing={6}>
            {projects?.Data?.slice(0, 6).map((data) => (
              <CardProjects
                key={data.Id}
                title={data.Name}
                img={Casa1} // Preciso da imagem
                value={15} // Preciso da porcentagem de conclusao
                onClick={() => router.push(`/projects/${data.Id}`)}
              />
            ))}
          </SimpleGrid>
        </Flex>
      </Flex>
    </Flex>
  );
}
