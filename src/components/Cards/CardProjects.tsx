import { Project, Task } from "@/shared/types/Projects";
import {
  Box,
  Flex,
  Text,
  Heading,
  Progress,
  useColorModeValue,
  Badge,
} from "@chakra-ui/react";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

type CardProjectsProps = {
  project: Project;
  tempProjectImage: string;
};

const CardProjects = ({ project, tempProjectImage }: CardProjectsProps) => {
  const router = useRouter();

  const projectProgress = useMemo(() => {
    if (project.Phase.length === 0) return 0;

    const allTasks = project.Phase.reduce((acc, phase) => {
      return [...acc, ...(phase?.Task ?? [])];
    }, [] as Task[]);

    const concludedPercentage = allTasks.filter(
      (task) =>
        task.BoardStatus.BoardStatusTypeId === 3 ||
        task.BoardStatus.BoardStatusTypeId === 4
    ).length;

    return Math.ceil((concludedPercentage / allTasks.length) * 100);
  }, [project]);

  return (
    <Box
      bg={"white"}
      borderRadius="md"
      borderWidth="1px"
      borderColor="gray.200"
      w={"260px"}
      onClick={() => router.push(`/projects/${project.Id}`)}
      cursor={"pointer"}
    >
      <Box
        height="150px"
        width="100%"
        borderTopRadius="md"
        overflow="hidden"
        position="relative"
      >
        <Image
          src={tempProjectImage}
          alt="Logo"
          fill
          style={{ objectFit: "cover" }}
        />
      </Box>
      <Flex direction={"column"} p={4} gap={3}>
        <Heading
          size="sm"
          fontFamily={"title"}
          color={"464646"}
          fontWeight={"regular"}
          textAlign={"start"}
          whiteSpace={"nowrap"}
          textOverflow={"ellipsis"}
          overflow={"hidden"}
          maxW={"auto"}
        >
          {project.Name}
        </Heading>

        <Badge colorScheme={"blue"} fontSize={"2xs"} w={"fit-content"}>
          EM ANDAMENTO
        </Badge>

        <Flex gap={1} w={"full"} align={"center"}>
          <Progress
            value={projectProgress}
            size="sm"
            colorScheme="green"
            borderRadius={"sm"}
            w={"full"}
          />
          <Text
            textAlign={"right"}
            fontSize={"13px"}
            color={"gray.600"}
            w={"40px"}
          >
            {projectProgress}%
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default CardProjects;
