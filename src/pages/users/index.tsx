import dynamic from "next/dynamic";

import Link from "next/link";

import { Pagination } from "@/components/Pagination";

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
  Spinner,
} from "@chakra-ui/react";

import { RiAddLine, RiPencilLine, RiRefreshLine } from "react-icons/ri";
import { useBreakpointValue } from "@chakra-ui/react";

import { UserType, useUsers } from "@/services/hooks/useUsers";

const Header = dynamic(() => import("@/components/Header"), { ssr: false });
const Sidebar = dynamic(() => import("@/components/Sidebar"), { ssr: false });

export default function UsersList() {
  const { data, isLoading, error, isFetching, refetch } = useUsers();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
              {!isLoading && isFetching ? (
                <Spinner size="sm" color="grey.500" ml="4" />
              ) : (
                <Button
                  type="button"
                  colorScheme="pink"
                  size="sm"
                  ml="4"
                  padding="0"
                  onClick={() => refetch()}
                >
                  <Icon fontSize="lg" m="0" p="0" as={RiRefreshLine} />
                </Button>
              )}
            </Heading>

            <Link href="/users/create">
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

          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao obter os dados dos usuários.</Text>
            </Flex>
          ) : (
            <>
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
                  {data?.map((user: UserType) => (
                    <Tr key={user.id}>
                      <Td px={["4", "4", "6"]}>
                        <Checkbox colorScheme="pink" />
                      </Td>
                      <Td>
                        <Box>
                          <Text fontWeight="bold">{user.name}</Text>
                          <Text fontSize="small" color="gray.300">
                            {user.email}
                          </Text>
                        </Box>
                      </Td>
                      {isWideVersion && <Td>{user.createdAt}</Td>}
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
                  ))}
                </Tbody>
              </Table>

              <Pagination />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
