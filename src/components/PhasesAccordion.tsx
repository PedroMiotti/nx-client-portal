import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  Checkbox,
  Circle,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";

type phaseProps = {
  status: string;
  title: string;
  tasks: string[];
};

const Phase = ({ status, title, tasks }: phaseProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const circleColor = useColorModeValue("green.300", "green.700");
  const circleBgColor = useColorModeValue("green.100", "green.800");
  const textColor = useColorModeValue("gray.700", "gray.200");

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const renderTasks = () => {
    return tasks.map((task, index) => (
      <Checkbox
        key={index}
        isChecked={status === "complete" || status === "inProgress"}
        defaultChecked={status === "complete"}
        isDisabled={status === "pending"}
      >
        {task}
      </Checkbox>
    ));
  };

  return (
    <Box display="flex" alignItems="center" gap={4} mb={4}>
      <Circle
        size="8"
        bg={status === "complete" ? circleBgColor : circleColor}
      />
      <Accordion allowMultiple>
        <AccordionItem>
          <AccordionButton _expanded={{ bg: "transparent" }}>
            <Heading fontSize="md" color={textColor}>
              {title}
            </Heading>
          </AccordionButton>
          <AccordionPanel pb={4} px={4} fontSize="sm">
            {renderTasks()}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default function PhasesAccordion() {
  const phases = [
    {
      status: "complete",
      title: "Levantamento de dados",
      tasks: [
        "Preenchimento dos Dados do Cliente",
        "Preenchimento do Breafing",
        "Envio das documentações pessoais",
        "Envio das documentações do terreno",
        "Agendamento da reunião de Breafing",
        "Envio de referências",
        "Agendamento da primeira apresentação",
      ],
    },
    {
      status: "inProgress",
      title: "Estudos",
      tasks: ["Estudos preliminares", "Estudos de viabilidade"],
    },
    {
      status: "pending",
      title: "Aprovação",
      tasks: ["Aprovação do projeto", "Aprovação do orçamento"],
    },
    {
      status: "pending",
      title: "Executivo",
      tasks: ["Execução do projeto", "Gerenciamento da obra"],
    },
    {
      status: "pending",
      title: "Projeto Liberado para Obra",
      tasks: ["Liberação do projeto para obra", "Início da obra"],
    },
  ];

  return (
    <Box>
      {phases.map((phase, index) => (
        <Phase key={index} {...phase} />
      ))}
    </Box>
  );
}
