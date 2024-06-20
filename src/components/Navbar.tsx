"use client";

import {
  Box,
  Flex,
  Avatar,
  HStack,
  Text,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useColorModeValue,
  Stack,
  Divider,
} from "@chakra-ui/react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import LogoPoles from "../../public/images/LogoFpoles.png";
import Image from "next/image";
import { useAuthenticateUser } from "@/lib/context/user";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

const excludedRoutes = ["/auth"];

export default function Navbar() {
  const pathname = usePathname();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, handleLogout } = useAuthenticateUser();
  const router = useRouter();

  const isExcludedRoute = excludedRoutes.find((route) =>
    pathname.includes(route)
  );

  return !isExcludedRoute ? (
    <>
      <Box
        bg={"white"}
        borderBottom={"1px solid"}
        borderBottomColor={"#D4D4D4"}
        px={6}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={8} alignItems={"center"}>
            <Box overflow="hidden" position="relative">
              <Image src={LogoPoles} alt="Logo" width={150} height={150} />
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
