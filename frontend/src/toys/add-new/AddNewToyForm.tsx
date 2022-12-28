import { Stack, TextInput, Button, FileInput, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from "recoil";
import { useI18nContext } from "../../i18n/i18n-react";
import { TranslationFunctions } from "../../i18n/i18n-types";
import { userState } from "../../session/sessionState";
import { createToy, ToyCategories } from "../../shared/APIs/toysService";
import { currentToysListState } from "../toysState";

interface CategoriesSelect {
  value: ToyCategories | "ALL CATEGORIES";
  label: string;
}

export const generateCategoriesData = (
  LL: TranslationFunctions
): CategoriesSelect[] => {
  return [
    { value: "FIGURES", label: LL.categories.figures() },
    { value: "CARS", label: LL.categories.cars() },
    { value: "RADIO_CONTROLLED", label: LL.categories.radioControlled() },
    { value: "CONSTRUCTION", label: LL.categories.construction() },
    { value: "EDUCATIONAL", label: LL.categories.educational() },
    { value: "ELECTRONIC", label: LL.categories.electronic() },
    { value: "EXECUTIVE", label: LL.categories.executive() },
    { value: "FOOD_RELATED", label: LL.categories.foodRelated() },
    { value: "GAMES", label: LL.categories.games() },
    { value: "PUZZLE", label: LL.categories.puzzle() },
    { value: "LEGO", label: LL.categories.lego() },
    { value: "SCIENCE", label: LL.categories.science() },
    { value: "SOUND", label: LL.categories.sound() },
    { value: "SPINNING", label: LL.categories.spinning() },
    { value: "WOODEN", label: LL.categories.wooden() },
    { value: "OTHER", label: LL.categories.other() },
  ];
};

export const AddNewToyForm = () => {
  const [loading, setLoading] = useState(false);
  const user = useRecoilValue(userState);
  const refreshMyToysList = useRecoilRefresher_UNSTABLE(currentToysListState);
  const { LL } = useI18nContext();

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

      form.reset();
      refreshMyToysList();
      showNotification({
        title: LL.notifications.success(),
        message: LL.notifications.created({ name: "Toy" }),
        color: "green",
        autoClose: 3000,
      });
    } catch (e) {
      showNotification({
        title: LL.notifications.error(),
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
          label={LL.form.name()}
          placeholder={LL.form.placeholder.toy.name()}
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
        <FileInput
          required
          radius="md"
          label={LL.form.photo()}
          placeholder={LL.form.placeholder.photo()}
          clearable
          {...form.getInputProps("toyImage")}
        />
        {/* <FileDropzone {...form.getInputProps("imgUsrl")} /> */}
        <TextInput
          required
          radius="md"
          label={LL.form.description()}
          placeholder={LL.form.placeholder.toy.description()}
          {...form.getInputProps("description")}
        />
      </Stack>
      <Button type="submit" mt="md" fullWidth radius="md" loading={loading}>
        {LL.general.submit()}
      </Button>
    </form>
  );
};
