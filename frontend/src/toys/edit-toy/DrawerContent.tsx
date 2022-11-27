import {
  Avatar,
  Button,
  Center,
  Container,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import {
  useRecoilRefresher_UNSTABLE,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { getErrorMessage } from "../../shared/APIs/baseFetch";
import { editToyData } from "../../shared/APIs/toysService";
import {
  currentToysListState,
  isEditToyDrawerOpenState,
  selectedToyState,
} from "../toysState";
import { schema } from "./validateSchema";

export const DrawerContent = () => {
  const selectedToy = useRecoilValue(selectedToyState);
  const refreshToys = useRecoilRefresher_UNSTABLE(currentToysListState);
  const [isLoading, setIsLoading] = useState(false);
  const setIsDrawerOpen = useSetRecoilState(isEditToyDrawerOpenState);

  if (!selectedToy) return null;

  const form = useForm({
    initialValues: {
      name: selectedToy.name,
      description: selectedToy.description,
      imgUrl: selectedToy.imgUrl,
      category: selectedToy.category,
    },
    validateInputOnBlur: true,
    validate: zodResolver(schema),
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      setIsLoading(true);
      await editToyData({ id: selectedToy.id, ...values });
      refreshToys();
    } catch (e) {
      const message = getErrorMessage(e);
      showNotification({
        title: "Error",
        message: message ?? "Something went wrong",
        color: "red",
        autoClose: 5000,
      });
    } finally {
      setIsLoading(false);
      setIsDrawerOpen(false);
      showNotification({
        title: "Success",
        message: "Toy updated successfully",
        color: "green",
        autoClose: 3000,
      });
    }
  };

  return (
    <Container px="xs">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack spacing="md">
          <Center>
            <Avatar src={selectedToy.imgUrl} size={200} />
          </Center>
          <TextInput
            radius="md"
            label="Name"
            value={selectedToy.name}
            {...form.getInputProps("name")}
          />
          <TextInput
            radius="md"
            label="Category"
            value={selectedToy.category}
            {...form.getInputProps("category")}
          />
          <Textarea
            radius="md"
            label="Description"
            value={selectedToy?.description}
            {...form.getInputProps("description")}
          />
          {/* select for categories later  */}
          {/* <Select
            label="Role"
            radius="md"
            data={rolesData}
            {...form.getInputProps("role")}
          /> */}
        </Stack>
        <Button type="submit" mt="lg" fullWidth radius="md" loading={isLoading}>
          Edit
        </Button>
      </form>
    </Container>
  );
};
