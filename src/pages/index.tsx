import Head from "next/head";
import { Input } from "../components/Form/Input";

import { Flex, Button, Stack } from "@chakra-ui/react";

import { SubmitHandler, useForm } from "react-hook-form";

type SignInFormData = {
  email: string;
  password: string;
};

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignInFormData>();

  const handleSignIn: SubmitHandler<SignInFormData> = (values) => {
    console.log(values);
  };

  return (
    <>
      <Head>
        <title>dashgo</title>
        <meta name="description" content="dashgo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex w="100vw" h="100vh" align="center" justify="center">
        <Flex
          as="form"
          w="100%"
          maxW={360}
          bg="gray.800"
          p="8"
          borderRadius={8}
          flexDir="column"
          onSubmit={handleSubmit(handleSignIn)}
        >
          <Stack spacing="4">
            <Input
              label="E-mail"
              type="email"
              placeholder="john.doe@email.com"
              {...register("email", {
                required: "E-mail obrigatório",
              })}
              error={errors.email}
            />

            <Input
              label="Password"
              type="password"
              placeholder="******"
              {...register("password", {
                required: "Senha obrigatório",
              })}
              error={errors.password}
            />
          </Stack>

          <Button
            type="submit"
            mt="6"
            colorScheme="pink"
            size="lg"
            isLoading={isSubmitting}
          >
            Entrar
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
