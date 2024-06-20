"use client";

import CardProjects from "@/components/Cards/CardProjects";
import Navbar from "@/components/Navbar";
import { DashboardProjectCardData } from "@/shared/mocks/Projects";
import { Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";

export default function Projects() {
  return (
    <Flex w={"full"} h={"100vh"} justify={"center"} align={"center"}>
      <Flex direction={"column"} textAlign={"center"} gap={16}>
        <Flex direction={"column"}>
          <Heading fontFamily={"title"} fontWeight={"regular"}>
            Bem-vindo, João Moraes!
          </Heading>
          <Text fontFamily={"title"} fontWeight={"regular"} fontSize={"2xl"}>
            Selecione o projeto.
          </Text>
        </Flex>
        <Flex w={"full"}>
          <SimpleGrid columns={2} spacing={6}>
            {DashboardProjectCardData.map((data) => (
              <CardProjects
                key={data.id}
                title={data.title}
                year={data.year}
                code={data.code}
                img={data.img}
                value={data.value}
              />
            ))}
          </SimpleGrid>
        </Flex>
      </Flex>
    </Flex>
  );
}
