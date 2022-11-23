import { Stack, TextInput, Button, FileInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../session/sessionState";
import { createToy } from "../../shared/APIs/fetchToys";

export const AddNewToyForm = () => {
  const [loading, setLoading] = useState(false);
  const user = useRecoilValue(userState);

  const form = useForm({
    initialValues: {
      name: "Test",
      category: "Test",
      toyImage: "test",
      address: "Test",
      description: "Test",
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      setLoading(true);
      if (!user) {
        throw Error();
      }
      const dataForm = new FormData();
      const { toyImage, ...rest } = { ...values, ownerId: user.id };
      dataForm.append("toyImage", toyImage);
      dataForm.append("values", JSON.stringify(rest));

      await createToy(dataForm);

      showNotification({
        title: "Success",
        message: "Toy added successfully",
        color: "green",
        autoClose: 3000,
      });
    } catch (e) {
      console.log(e);
      showNotification({
        title: "Error",
        message: "Something went wrong",
        color: "red",
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
      <Stack spacing="md">
        <TextInput
          required
          radius="md"
          label="Name"
          placeholder="McQueen"
          {...form.getInputProps("name")}
        />
        <TextInput
          required
          radius="md"
          label="Category"
          placeholder="Auta"
          {...form.getInputProps("category")}
        />
        <FileInput
          required
          radius="md"
          label="Photo"
          placeholder="toyImage"
          clearable
          {...form.getInputProps("toyImage")}
        />
        {/* <FileDropzone {...form.getInputProps("imgUsrl")} /> */}
        <TextInput
          required
          radius="md"
          label="Address"
          placeholder="Lodz 77"
          {...form.getInputProps("address")}
        />
        <TextInput
          required
          radius="md"
          label="Description"
          placeholder="Good condition"
          {...form.getInputProps("description")}
        />
      </Stack>
      <Button type="submit" mt="md" fullWidth radius="md" loading={loading}>
        Submit
      </Button>
    </form>
  );
};
