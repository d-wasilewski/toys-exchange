import { Stack, TextInput, Button, FileInput, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../session/sessionState";
import { createToy, ToyCategories } from "../../shared/APIs/toysService";

interface CategoriesSelect {
  value: ToyCategories | "ALL CATEGORIES";
  label: string;
}

export const categoriesData: CategoriesSelect[] = [
  { value: "FIGURES", label: "Figures" },
  { value: "CARS", label: "Cars" },
  { value: "RADIO_CONTROLLED", label: "Radio controlled" },
  { value: "CONSTRUCTION", label: "Construction" },
  { value: "EDUCATIONAL", label: "Educational" },
  { value: "ELECTRONIC", label: "Electronic" },
  { value: "EXECUTIVE", label: "Executive" },
  { value: "FOOD_RELATED", label: "Food related" },
  { value: "GAMES", label: "Games" },
  { value: "PUZZLE", label: "Puzzle" },
  { value: "LEGO", label: "Lego" },
  { value: "SCIENCE", label: "Science" },
  { value: "SOUND", label: "Sound" },
  { value: "SPINNING", label: "Spinning" },
  { value: "WOODEN", label: "Wooden" },
  { value: "OTHER", label: "Other" },
];

export const AddNewToyForm = () => {
  const [loading, setLoading] = useState(false);
  const user = useRecoilValue(userState);

  const form = useForm({
    initialValues: {
      name: "",
      category: "",
      toyImage: "",
      description: "",
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
        <Select
          label="Category"
          required
          radius="md"
          placeholder={categoriesData[0].label}
          data={categoriesData}
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
