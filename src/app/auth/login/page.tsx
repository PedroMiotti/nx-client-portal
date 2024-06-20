"use client";
import { useState } from "react";

import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import NexusLogo from "../../../../public/nexus-logo.svg";
import {
  AuthenticateRequestDto,
  useAuthenticateUser,
} from "@/lib/context/user";
import CustomCard from "@/components/CustomCard";

export default function Login() {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [isAuthRequestPending, setIsAuthRequestPending] = useState(false);
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);

  const router = useRouter();
  const toast = useToast();
  const { handleAuthenticate } = useAuthenticateUser();

  if (redirectToReferrer) router.push("/");

  const handleLoginRequest = async (data: AuthenticateRequestDto) => {
    setIsAuthRequestPending(true);
    const response = await handleAuthenticate(data);

    if (response) {
      router.push("/");
      setIsAuthRequestPending(false);
    } else {
      toast({
        title: "Erro ao fazer login",
        description: "Verifique as credenciais e tente novamente",
        status: "error",
        position: "top-right",
        duration: 9000,
        isClosable: true,
      });
      setIsAuthRequestPending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLoginRequest({ email: emailValue, password: passwordValue });
    }
  };

  return (
    <Box
      w="100%"
      h="100vh"
      bg="#ededed"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Flex flexDirection={"column"}>
        <Flex
          alignContent={"center"}
          justifyContent={"center"}
          flexDir={"column"}
          justifyItems={"center"}
          alignItems={"center"}
          gap={6}
        >
          <Image
            src={NexusLogo}
            alt="Nexus (application name) logo"
            width={200}
            height={200}
          />
        </Flex>
        <Flex
          flex={1}
          flexDirection="column"
          align={"center"}
          justifyContent="flex-start"
          zIndex={1}
          p={{ base: "1rem", md: "2rem 6rem 1rem" }}
        >
          <CustomCard
            height={{ base: "auto", md: "auto" }}
            p="24px 24px"
            display="flex"
            flexDirection="column"
            minW={{ base: "90%", md: "xl" }}
            maxWidth="xl"
            alignItems="center"
            justifyContent="center"
          >
            <Stack spacing={4} w={"full"} px={7} py={4}>
              <Flex direction="column" mb={4} gap={2}>
                <Heading fontSize="24px" fontWeight="600">
                  Entrar
                </Heading>
                <Text fontSize={"14px"} fontWeight={"400"} color="#616161">
                  Por favor, insira suas informações de acesso.
                </Text>
              </Flex>

              <FormControl id="email">
                <FormLabel fontSize="14px" fontWeight="600">
                  Email
                </FormLabel>
                <Input
                  fontSize="sm"
                  placeholder="joao@exemplo.com.br"
                  value={emailValue}
                  onKeyDown={handleKeyDown}
                  onChange={(e) => setEmailValue(e.target.value)}
                  type="email"
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel fontSize="14px" fontWeight="600">
                  Senha
                </FormLabel>
                <Input
                  fontSize="sm"
                  onKeyDown={handleKeyDown}
                  placeholder="**********"
                  value={passwordValue}
                  onChange={(e) => setPasswordValue(e.target.value)}
                  type="password"
                />
              </FormControl>
              <Stack spacing={6}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>
                    <Text fontSize={"14px"} color="#616161">
                      Lembrar informações
                    </Text>
                  </Checkbox>
                  <Link
                    fontWeight="500"
                    fontSize="12px"
                    color="blue.500"
                    textDecoration={"underline"}
                  >
                    Esqueci a senha
                  </Link>
                </Stack>
                <Button
                  mt={7}
                  color={"white"}
                  bg="blue.500"
                  isLoading={isAuthRequestPending}
                  onClick={() =>
                    handleLoginRequest({
                      email: emailValue,
                      password: passwordValue,
                    })
                  }
                >
                  Entrar
                </Button>
              </Stack>
            </Stack>
          </CustomCard>
        </Flex>
      </Flex>
    </Box>
  );
}
