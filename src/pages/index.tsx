import Head from "next/head";
import { Input } from "../components/Form/Input";

import { Flex, Button, Stack } from "@chakra-ui/react";

export default function SignIn() {
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
        >
          <Stack spacing="4">
            <Input
              name="email"
              label="E-mail"
              type="email"
              placeholder="john.doe@email.com"
            />

            <Input
              name="password"
              label="Password"
              type="password"
              placeholder="******"
            />
          </Stack>

          <Button type="submit" mt="6" colorScheme="pink" size="lg">
            Entrar
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
