"use client";

import {
  Box,
  Flex,
  Avatar,
  HStack,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { useAuthenticateUser } from "@/lib/context/user";
import LogoFPoles from "../../public/images/logo-poles2.svg";

const excludedRoutes = ["/auth"];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, handleLogout } = useAuthenticateUser();

  const isExcludedRoute = excludedRoutes.find((route) =>
    pathname.includes(route)
  );

  return !isExcludedRoute ? (
    <>
      <Box
        bg={"white"}
        borderBottom={"1px solid"}
        borderBottomColor={"#D4D4D4"}
        px={8}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={8} alignItems={"center"}>
            <Box overflow="hidden" position="relative" onClick={() => router.push('/')} _hover={{ cursor: 'pointer' }}>
              <Image src={LogoFPoles} alt="Logo" width={90} height={90} />
            </Box>
          </HStack>
          <HStack>
            <Text fontSize={"sm"} display={{ base: "none", md: "contents" }}>
              Seja bem-vindo(a), {user?.Name}
            </Text>
            <Flex alignItems={"center"}>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar size={"sm"} name={user?.Name} />
                </MenuButton>
                <MenuList>
                  <MenuItem>Minha conta</MenuItem>
                  <MenuItem
                    onClick={() => {
                      router.push("/projects");
                    }}
                  >
                    Meus projetos
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleLogout();
                      router.push("/auth/login");
                    }}
                  >
                    Sair
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </HStack>
        </Flex>
      </Box>
    </>
  ) : null;
}
