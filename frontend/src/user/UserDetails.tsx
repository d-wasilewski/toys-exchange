import { Button, Input, Stack, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconChevronRight } from "@tabler/icons";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../session/sessionState";

export const UserDetails = () => {
  const selectedUser = useRecoilValue(userState);
  const [isLoading, setIsLoading] = useState(false);
  const [active] = useOutletContext<string>();

  if (!selectedUser) return null;

  const form = useForm({
    initialValues: {
      name: selectedUser.name,
      email: selectedUser.email,
      phoneNumber: selectedUser.phoneNumber,
    },
    validateInputOnBlur: true,
    // TODO: add validation
    // validate: zodResolver(schema),
  });

  //   TODO: handle data change
  const handleSubmit = () => {
    setIsLoading(!isLoading);
  };

  return (
    <>
      <Title my={20}>{active}</Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack spacing="md" sx={{ width: 500 }}>
          <TextInput
            radius="md"
            label="Name"
            value={selectedUser.name}
            {...form.getInputProps("name")}
          />
          <TextInput
            radius="md"
            label="Email"
            value={selectedUser.email}
            {...form.getInputProps("email")}
          />
          <TextInput
            radius="md"
            label="Phone number"
            value={selectedUser.phoneNumber}
            {...form.getInputProps("phoneNumber")}
          />
          <TextInput
            radius="md"
            label="Date of birth"
            value={selectedUser.createdAt}
          />
          {/* TODO: Implement changing password */}
          <Input.Wrapper label="Password">
            <Input
              component="button"
              rightSection={<IconChevronRight stroke={1} />}
              onClick={() => console.log("KLik")}
              radius="md"
            >
              Change your password
            </Input>
          </Input.Wrapper>
        </Stack>
        {/* TODO: display button only if the data was modified */}
        <Button type="submit" mt="lg" fullWidth radius="md" loading={isLoading}>
          Edit
        </Button>
      </form>
    </>
  );
};
