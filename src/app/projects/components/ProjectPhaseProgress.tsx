import { Project } from "@/shared/types/Projects";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Circle,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { BiRadioCircleMarked } from "react-icons/bi";
import { FaCheckSquare } from "react-icons/fa";
import { IoIosCheckmark } from "react-icons/io";

interface ProjectPhaseProgressProps {
  project: Project;
}

const ProjectPhaseProgress = ({ project }: ProjectPhaseProgressProps) => {
  const orderedPhases = useMemo(() => {
    return project?.Phase?.sort((a, b) => {
      return a.Id - b.Id;
    });
  }, [project]);

  return (
    <Accordion w={"full"} allowMultiple>
      {orderedPhases?.map((phase, index) => {
        const isPhaseConcluded = phase?.ConcludedAt !== null;
        const isPhaseInProgress = phase?.IsActive === true && !isPhaseConcluded;

        return (
          <AccordionItem key={index} border={"none"}>
            <AccordionButton>
              <Flex align={"center"} justify={"space-between"} w={"full"}>
                <Flex align={"center"}>
                  <Box as="span" textAlign="left" mr={2}>
                    {PhaseStatusIcon(
                      isPhaseConcluded
                        ? "COMPLETE"
                        : isPhaseInProgress
                        ? "IN_PROGRESS"
                        : "PENDING"
                    )}
                  </Box>
                  <Box as="span" flex="1" textAlign="left">
                    {index + 1}. {phase.Title}
                  </Box>
                </Flex>

                <Flex>
                  <AccordionIcon />
                </Flex>
              </Flex>
            </AccordionButton>
            <AccordionPanel pb={4}>
              {phase?.Task?.map((task) => {
                const isComplete =
                  task.BoardStatus.BoardStatusTypeId === 3 ||
                  task.BoardStatus.BoardStatusTypeId === 4;
                const isInProgress = task.BoardStatus.BoardStatusTypeId === 2;

                const color = isComplete
                  ? "#4caa78"
                  : isInProgress
                  ? "#3182ce"
                  : "#b0b2b5";
                return (
                  <Flex key={task.Id} px={"32px"} align={"center"} gap={2}>
                    <BiRadioCircleMarked color={color} fontSize={"18px"} />
                    <Text fontSize={"sm"}>{task.Name}</Text>
                  </Flex>
                );
              })}
            </AccordionPanel>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

type PhaseStatus = "PENDING" | "IN_PROGRESS" | "COMPLETE";
const PhaseStatusIcon = (status: PhaseStatus) => {
  const style: { [key: string]: { color: string; text: string } } = {
    PENDING: { color: "gray.400", text: "Pendente" },
    IN_PROGRESS: { color: "blue.500", text: "Em andamento" },
    COMPLETE: { color: "green.500", text: "Concluído" },
  };

  return (
    <Circle size="6" border={"2px solid"} borderColor={style[status].color}>
      {status === "COMPLETE" ? (
        <IoIosCheckmark color={"#38a169"} fontSize={"20px"} />
      ) : (
        <Text color={style[status].color}>-</Text>
      )}
    </Circle>
  );
};

export default ProjectPhaseProgress;
