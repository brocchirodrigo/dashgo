import { Flex, Text, Box, Avatar } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Rodrigo Brocchi</Text>

          <Text color="gray.300" fontSize="small">
            rodrigo.brocchi@gmail.com
          </Text>
        </Box>
      )}

      <Avatar
        size={["sm", "md"]}
        name="Rodrigo Brocchi"
        color="gray.900"
        bg="gray.50"
        src="https://github.com/brocchirodrigo.png"
      />
    </Flex>
  );
}
