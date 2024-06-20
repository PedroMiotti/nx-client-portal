"use client";

import { Flex, Spinner } from "@chakra-ui/react";

const Loader = () => {
  return (
    <Flex height={"100vh"} w={"100%"} align={"center"} justify={"center"}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="black.500"
        size="lg"
      />
    </Flex>
  );
};

export default Loader;
