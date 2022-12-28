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
import { useI18nContext } from "../../i18n/i18n-react";
import { getErrorMessage } from "../../shared/APIs/baseFetch";
import { editToyData } from "../../shared/APIs/toysService";
import { generateCategoriesData } from "../add-new/AddNewToyForm";
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
  const { LL } = useI18nContext();

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
        title: LL.notifications.success(),
        message: LL.notifications.updated({ name: "Toy" }),
        color: "green",
        autoClose: 3000,
      });
    } catch (e) {
      const message = getErrorMessage(e);
      showNotification({
        title: LL.notifications.error(),
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
            label={LL.form.name()}
            placeholder={LL.form.placeholder.toy.name()}
            required
            value={selectedToy.name}
            {...form.getInputProps("name")}
          />
          <Select
            label={LL.filters.category()}
            required
            radius="md"
            placeholder={generateCategoriesData(LL)[0].label}
            data={generateCategoriesData(LL)}
            {...form.getInputProps("category")}
          />
          <Textarea
            radius="md"
            label={LL.form.description()}
            placeholder={LL.form.placeholder.toy.description()}
            required
            value={selectedToy?.description}
            {...form.getInputProps("description")}
          />
        </Stack>
        <Button type="submit" mt="lg" fullWidth radius="md" loading={isLoading}>
          {LL.general.edit()}
        </Button>
      </form>
    </Container>
  );
};
