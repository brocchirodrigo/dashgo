import Link from "next/link";
import dynamic from "next/dynamic";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// import Header from "@/components/Header";
// import Sidebar from "@/components/Sidebar";

const Header = dynamic(() => import("@/components/Header"), { ssr: false });
const Sidebar = dynamic(() => import("@/components/Sidebar"), { ssr: false });

import { Input } from "@/components/Form/Input";
import { Button, HStack } from "@chakra-ui/react";
import {
  Box,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";

import { useMutation } from "react-query";
import { api } from "@/services/api";
import { queryClient } from "@/services/queryClient";
import { useRouter } from "next/router";

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string | null;
};

const CreateUserSchema = yup.object({
  name: yup.string().required("Digite o nome completo"),
  email: yup
    .string()
    .required("E-mail obrigatório")
    .email("Digite um e-mail válido"),
  password: yup
    .string()
    .required("Senha obrigatória")
    .min(6, "Mínimo de 6 caracteres"),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password")], "As senhas precisam ser iguais"),
});

const date = new Date();

export default function CreateUser() {
  const router = useRouter();

  const createUser = useMutation(
    async (user: CreateUserFormData) => {
      const response = await api.post("/users", {
        user: {
          ...user,
          created_at: new Date(
            date.getTime() - date.getTimezoneOffset() * 60000
          ).toISOString(),
        },
      });

      return response.data.user;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["users"]);
      },
    }
  );

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<CreateUserFormData>({
    resolver: yupResolver(CreateUserSchema),
  });

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (
    values
  ) => {
    await createUser.mutateAsync(values);
    router.push("/users");
  };

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box
          as="form"
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={["6", "8"]}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight="normal">
            Criar usuário
          </Heading>
          <Divider my="6" borderColor="gray.700" />

          <VStack spacing={["6", "8"]}>
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                label="Nome completo"
                {...register("name")}
                error={errors.name}
              />
              <Input
                type="email"
                label="Email"
                {...register("email")}
                error={errors.email}
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                type="password"
                label="Senha"
                {...register("password")}
                error={errors.password}
              />
              <Input
                type="password"
                label="Confirme a senha"
                {...register("password_confirmation")}
                error={errors.password_confirmation}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing={["4", "4", "4", "8"]}>
              <Link href="/users">
                <Button colorScheme="whiteAlpha">Cancelar</Button>
              </Link>
              <Button type="submit" isLoading={isSubmitting} colorScheme="pink">
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
