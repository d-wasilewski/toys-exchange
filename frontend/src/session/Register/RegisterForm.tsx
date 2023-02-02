import {
  Button,
  Input,
  Paper,
  PasswordInput,
  Popover,
  Progress,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import InputMask from "react-input-mask";
import { useDisclosure } from "@mantine/hooks";
import { PasswordRequirement } from "./PasswordRequirement";
import { getStrength } from "./getPasswordStrength";
import { useState } from "react";
import { schema } from "./validateSchema";
import { signUp } from "../../shared/APIs/userService";
import { isEmpty } from "lodash";
import { getErrorMessage } from "../../shared/APIs/baseFetch";
import { showNotification } from "@mantine/notifications";
import { useI18nContext } from "../../i18n/i18n-react";
import { TranslationFunctions } from "../../i18n/i18n-types";

const getRequirements = (LL: TranslationFunctions) => [
  { re: /[0-9]/, label: LL.register.requirements.number() },
  { re: /[a-z]/, label: LL.register.requirements.lower() },
  { re: /[A-Z]/, label: LL.register.requirements.upper() },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: LL.register.requirements.special() },
];

export const RegisterForm = () => {
  const [visible, { toggle }] = useDisclosure(false);
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { LL } = useI18nContext();

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      address: "",
      password: "",
      confirmPassword: "",
    },
    validateInputOnBlur: true,
    validate: zodResolver(schema(LL)),
    transformValues: (values) => ({
      ...values,
      phoneNumber: values.phoneNumber.replaceAll("-", "").substring(4),
    }),
  });

  const requirements = getRequirements(LL);

  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(form.values.password)}
    />
  ));

  const strength = getStrength(form.values.password, requirements);

  const color = strength === 100 ? "teal" : strength > 50 ? "yellow" : "red";

  const handleSubmit = async (values: typeof form.values) => {
    if (strength !== 100) {
      form.setFieldError("password", "Password doesn't match requirements");
    }

    if (!isEmpty(form.errors)) return;

    const { confirmPassword, ...valuesWithoutTerms } = values;

    try {
      setIsLoading(true);
      await signUp(valuesWithoutTerms);
      showNotification({
        title: LL.notifications.success(),
        message: LL.notifications.registered(),
        color: "green",
        autoClose: 3000,
      });
    } catch (e) {
      const message = getErrorMessage(e);
      showNotification({
        title: LL.notifications.error(),
        message,
        color: "red",
        autoClose: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
      <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
        <Stack spacing="md">
          <TextInput
            required
            radius="md"
            label={LL.form.name()}
            placeholder={LL.form.placeholder.name()}
            {...form.getInputProps("name")}
          />
          <TextInput
            required
            radius="md"
            label={LL.form.email()}
            placeholder={LL.form.placeholder.email()}
            {...form.getInputProps("email")}
          />
          <Input.Wrapper
            label={LL.form.phone()}
            id="phoneNumber"
            required
            {...form.getInputProps("phoneNumber")}
          >
            <Input
              component={InputMask}
              radius="md"
              mask="+48 999-999-999"
              id="phoneNumber"
              placeholder={LL.form.placeholder.phone()}
              {...form.getInputProps("phoneNumber")}
            />
          </Input.Wrapper>
          <TextInput
            radius="md"
            label={LL.form.address()}
            placeholder={LL.form.placeholder.address()}
            {...form.getInputProps("address")}
          />
          <Popover
            opened={popoverOpened}
            position="bottom"
            width="target"
            transition="pop"
          >
            <Popover.Target>
              <div
                onFocusCapture={() => setPopoverOpened(true)}
                onBlurCapture={() => setPopoverOpened(false)}
              >
                <PasswordInput
                  withAsterisk
                  radius="md"
                  label={LL.form.password()}
                  placeholder={LL.form.placeholder.password()}
                  visible={visible}
                  onVisibilityChange={toggle}
                  {...form.getInputProps("password")}
                />
              </div>
            </Popover.Target>
            <Popover.Dropdown>
              <Progress
                color={color}
                value={strength}
                size={5}
                style={{ marginBottom: 10 }}
              />
              <PasswordRequirement
                label={LL.register.requirements.characters()}
                meets={form.values.password.length > 7}
              />
              {checks}
            </Popover.Dropdown>
          </Popover>

          <PasswordInput
            withAsterisk
            radius="md"
            label={LL.form.confirmPassword()}
            placeholder={LL.form.placeholder.password()}
            visible={visible}
            onVisibilityChange={toggle}
            {...form.getInputProps("confirmPassword")}
          />
        </Stack>
        <Button type="submit" mt="md" fullWidth radius="md" loading={isLoading}>
          {LL.register.register()}
        </Button>
      </form>
    </Paper>
  );
};
