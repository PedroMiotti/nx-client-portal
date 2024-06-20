import {
  Box,
  Flex,
  Text,
  Heading,
  Progress,
  useColorModeValue,
} from "@chakra-ui/react";
import Image, { StaticImageData } from "next/image";

type CardProjectsProps = {
  title: string;
  year: string;
  code: string;
  img: StaticImageData;
  value: number;
};

const CardProjects = ({ title, year, code, img, value }: CardProjectsProps) => {
  return (
    <Box
      bg={"white"}
      borderRadius="md"
      shadow="md"
      borderWidth="1px"
      borderColor="gray.200"
      minW={"330px"}
    >
      <Box
        height="200px"
        width="100%"
        borderTopRadius="md"
        overflow="hidden"
        position="relative"
      >
        <Image src={img} alt="Logo" fill style={{ objectFit: "cover" }} />
      </Box>
      <Flex direction={"column"} p={4}>
        <Flex justify={"space-between"}>
          <Heading
            size="sm"
            fontFamily={"title"}
            color={"464646"}
            fontWeight={"regular"}
            textAlign={"start"}
          >
            {title}
          </Heading>
          <Text color={"#878787"} fontSize={"sm"}>
            {value}%
          </Text>
        </Flex>
        <Progress
          value={value}
          size="sm"
          mt={2}
          colorScheme="green"
          rounded={"md"}
        />
      </Flex>
    </Box>
  );
};

export default CardProjects;
