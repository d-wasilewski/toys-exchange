import { Anchor, Center, Loader, Paper, Stack, Text } from "@mantine/core";
import { IconCircleCheck, IconCircleLetterX } from "@tabler/icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useConfirmAccountHandler } from "./useConfirmAccountHandler";

export const ConfirmedAccount = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const navigate = useNavigate();

  if (!token) return null;

  const { confirmed, loading } = useConfirmAccountHandler(token);

  const confirmedCard = (
    <Stack>
      <Text size="lg" weight={500}>
        Account confirmed
      </Text>
      <Text color="dimmed">
        Your account has been confirmed! Please{" "}
        <Anchor
          component="button"
          type="button"
          onClick={() => navigate("/login")}
        >
          login
        </Anchor>{" "}
        to the application using your credentials.
      </Text>
      <Center>
        <IconCircleCheck color="green" size={80} />
      </Center>
    </Stack>
  );

  const declinedCard = (
    <Stack>
      <Text size="lg" weight={500}>
        Account not confirmed
      </Text>
      <Text color="dimmed">
        Something went wrong, please try sending the email again
      </Text>
      <Center>
        <IconCircleLetterX color="red" size={80} />
      </Center>
    </Stack>
  );

  return (
    <Center style={{ height: "80%" }}>
      <Paper withBorder p="lg" radius="md" shadow="md" style={{ width: 400 }}>
        {!loading ? confirmed ? confirmedCard : declinedCard : <Loader />}
      </Paper>
    </Center>
  );
};
