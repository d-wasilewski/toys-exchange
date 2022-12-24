import {
  Avatar,
  Button,
  Center,
  Container,
  Select,
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
import { categoriesData } from "../add-new/AddNewToyForm";
import {
  currentToysListState,
  isEditToyDrawerOpenState,
  selectedToyState,
} from "../toysState";
import { schema } from "./validateSchema";

export const DrawerContent = () => {
  const selectedToy = useRecoilValue(selectedToyState);
  const refreshToys = useRecoilRefresher_UNSTABLE(currentToysListState);
  const refreshSelectedToy = useRecoilRefresher_UNSTABLE(selectedToyState);
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
      await editToyData({ id: selectedToy.id, ...values }, selectedToy.etag);
      refreshToys();
      refreshSelectedToy();
      showNotification({
        title: "Success",
        message: "Toy updated successfully",
        color: "green",
        autoClose: 3000,
      });
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
            required
            value={selectedToy.name}
            {...form.getInputProps("name")}
          />
          <Select
            label="Category"
            required
            radius="md"
            placeholder={categoriesData[0].label}
            data={categoriesData}
            {...form.getInputProps("category")}
          />
          <Textarea
            radius="md"
            label="Description"
            required
            value={selectedToy?.description}
            {...form.getInputProps("description")}
          />
        </Stack>
        <Button type="submit" mt="lg" fullWidth radius="md" loading={isLoading}>
          Edit
        </Button>
      </form>
    </Container>
  );
};
