import dynamic from "next/dynamic";

import NextLink from "next/link";

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
  Link,
} from "@chakra-ui/react";

import { RiAddLine, RiPencilLine, RiRefreshLine } from "react-icons/ri";
import { useBreakpointValue } from "@chakra-ui/react";

import { UserType, useUsers } from "@/services/hooks/useUsers";
import { useState } from "react";
import { queryClient } from "../../services/queryClient";
import { api } from "@/services/api";

const Header = dynamic(() => import("@/components/Header"), { ssr: false });
const Sidebar = dynamic(() => import("@/components/Sidebar"), { ssr: false });

export default function UsersList() {
  const [page, setPage] = useState(1);

  const { data, isLoading, error, isFetching, refetch } = useUsers(page);

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  async function handlePrefetchUser(userId: string | number) {
    await queryClient.prefetchQuery(
      ["user", userId],
      async () => {
        const response = await api.get(`/users/${userId}`);

        return response.data;
      },
      {
        staleTime: 1000 * 60 * 10, // 10 min
      }
    );
  }

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

            <NextLink href="/users/create">
              <Button
                size="sm"
                fontSize="small"
                colorScheme="pink"
                leftIcon={<Icon fontSize="20" as={RiAddLine} />}
              >
                Criar novo
              </Button>
            </NextLink>
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
                  {!!data &&
                    data.users.map((user: UserType) => (
                      <Tr key={user.id}>
                        <Td px={["4", "4", "6"]}>
                          <Checkbox colorScheme="pink" />
                        </Td>
                        <Td>
                          <Box>
                            <Link
                              color="purple.400"
                              onMouseEnter={() => handlePrefetchUser(user.id)}
                            >
                              <Text fontWeight="bold">{user.name}</Text>
                            </Link>

                            <Text fontSize="small" color="gray.300">
                              {user.email}
                            </Text>
                          </Box>
                        </Td>
                        {isWideVersion && <Td>{user.created_at}</Td>}
                        {isWideVersion && (
                          <Td>
                            <Button
                              as="a"
                              size="sm"
                              fontSize="small"
                              colorScheme="purple"
                              leftIcon={
                                <Icon fontSize="xm" as={RiPencilLine} />
                              }
                            >
                              Editar
                            </Button>
                          </Td>
                        )}
                      </Tr>
                    ))}
                </Tbody>
              </Table>

              <Pagination
                totalCountOfRegisters={data?.totalCount ?? 1}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
