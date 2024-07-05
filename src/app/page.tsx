"use client";

import CardProjects from "@/components/Cards/CardProjects";
import { fetchAllClientProjects } from "@/lib/api/Projects";
import { useAuthenticateUser } from "@/lib/context/user";
import { usePaginatedQuery } from "@/lib/hooks/usePaginatedQuery";
import { Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import Casa1 from "../../public/images/CasaPoles1.jpg";
import Loader from "@/components/Loader";

const mockImages = [
  "https://images.adsttc.com/media/images/6230/792e/bf5d/eb01/6590/90d3/newsletter/07-residenciadc.jpg?1647343944",
  "https://images.adsttc.com/media/images/62ce/5633/6566/ee01/657b/d437/large_jpg/residencia-am-f-poles-arquitetura_5.jpg?1657689713",
  "https://images.adsttc.com/media/images/64db/e235/fbc6/5840/d273/0ffa/newsletter/residencia-zv-f-poles-arquitetura_36.jpg?1692131928",
  "https://lucenera.com.br/images/projetos/casaabpaisagismo/01_casa_ab.jpg",
];

export default function Projects() {
  const { user } = useAuthenticateUser();

  const { data: projects, isLoading: isProjectsLoading } = usePaginatedQuery({
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
    <Flex w={"full"} h={"80vh"} justify={"center"} align={"center"}>
      <Flex direction={"column"} textAlign={"center"} gap={10}>
        <Flex direction={"column"}>
          <Heading fontFamily={"title"} fontWeight={"regular"}>
            Bem-vindo(a), {user?.Name}!
          </Heading>
          <Text fontFamily={"title"} fontWeight={"regular"} fontSize={"2xl"}>
            Selecione o seu projeto.
          </Text>
        </Flex>

        <SimpleGrid minChildWidth="260px" gap={3}>
          {projects?.Data?.slice(0, 4).map((data, index) => {
            const mockImage = mockImages[index];
            return (
              <CardProjects
                key={data.Id}
                project={data}
                tempProjectImage={mockImage}
              />
            );
          })}
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}
