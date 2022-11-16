import { Box, Text } from "@mantine/core";
import { IconX, IconCheck } from "@tabler/icons";

interface PasswordRequirementsProps {
  meets: boolean;
  label: string;
}

export const PasswordRequirement = ({
  meets,
  label,
}: PasswordRequirementsProps) => {
  return (
    <Text
      color={meets ? "teal" : "red"}
      sx={{ display: "flex", alignItems: "center" }}
      mt={7}
      size="sm"
    >
      {meets ? <IconCheck size={14} /> : <IconX size={14} />}{" "}
      <Box ml={10}>{label}</Box>
    </Text>
  );
};
