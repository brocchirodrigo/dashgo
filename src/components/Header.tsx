import { Flex, Input, Text, Icon } from "@chakra-ui/react";

import { RiSearchLine } from "react-icons/ri";

export default function Header() {
  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      <Text fontSize="3xl" fontWeight="bold" letterSpacing="tight" w="64">
        dashgo
        <Text as="span" ml="1" color="pink.500">
          .
        </Text>
      </Text>

      <Flex
        as="label"
        flex="1"
        py="4"
        px="8"
        ml="6"
        maxW="400"
        alignSelf="center"
        color="gray.300"
        position="relative"
        bg="gray.800"
        borderRadius="full"
      >
        <Input
          color="gray.50"
          variant="unstyled"
          placeholder="Buscar na plataforma"
          px="4"
          mr="4"
          _placeholder={{
            color: "gray.400",
          }}
        />

        <Icon as={RiSearchLine} fontSize="20" />
      </Flex>
    </Flex>
  );
}
