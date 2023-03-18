import Header from "@/components/Header";
import { Pagination } from "@/components/Pagination";
import Sidebar from "@/components/Sidebar";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
} from "@chakra-ui/react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { useBreakpointValue } from "@chakra-ui/react";
import Link from "next/link";

export default function UsersList() {
  const isWideVersion = useBreakpointValue(
    {
      base: false,
      lg: true,
    },
    { ssr: false }
  );

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
            </Heading>

            <Link href="/users/create" passHref>
              <Button
                size="sm"
                fontSize="small"
                colorScheme="pink"
                leftIcon={<Icon fontSize="20" as={RiAddLine} />}
              >
                Criar novo
              </Button>
            </Link>
          </Flex>

          <Table colorScheme="whiteAlpha">
            <Thead>
              <Tr>
                <Th px={["4", "4", "6"]} color="gray.300" width="8">
                  <Checkbox colorScheme="pink" />
                </Th>
                <Th>Usuário</Th>
                {isWideVersion && <Th>Data de cadastro</Th>}
                {isWideVersion && <Th width="8">Editar</Th>}
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td px={["4", "4", "6"]}>
                  <Checkbox colorScheme="pink" />
                </Td>
                <Td>
                  <Box>
                    <Text fontWeight="bold">Rodrigo Brocchi</Text>
                    <Text fontSize="small" color="gray.300">
                      rodrigo.brocchi@gmail.com
                    </Text>
                  </Box>
                </Td>
                {isWideVersion && <Td>13 de março de 2023</Td>}
                {isWideVersion && (
                  <Td>
                    <Button
                      as="a"
                      size="sm"
                      fontSize="small"
                      colorScheme="purple"
                      leftIcon={<Icon fontSize="xm" as={RiPencilLine} />}
                    >
                      Editar
                    </Button>
                  </Td>
                )}
              </Tr>
            </Tbody>
          </Table>

          <Pagination />
        </Box>
      </Flex>
    </Box>
  );
}
