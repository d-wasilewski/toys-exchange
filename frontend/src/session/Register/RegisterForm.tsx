import {
  Button,
  Checkbox,
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

const requirements = [
  { re: /[0-9]/, label: "Includes number" },
  { re: /[a-z]/, label: "Includes lowercase letter" },
  { re: /[A-Z]/, label: "Includes uppercase letter" },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Includes special symbol" },
];

export const RegisterForm = () => {
  const [visible, { toggle }] = useDisclosure(false);
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
    validateInputOnBlur: true,
    validate: zodResolver(schema),
    transformValues: (values) => ({
      ...values,
      phoneNumber: values.phoneNumber.replaceAll("-", "").substring(4),
    }),
  });

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

    if (!form.values.terms) {
      form.setFieldError("terms", "This field is required");
    }

    if (!isEmpty(form.errors)) return;

    const { terms, confirmPassword, ...valuesWithoutTerms } = values;

    try {
      setIsLoading(true);
      await signUp(valuesWithoutTerms);
    } catch (e) {
      const message = getErrorMessage(e);
      showNotification({
        title: "Error",
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
            label="Name"
            placeholder="Damian"
            {...form.getInputProps("name")}
          />
          <TextInput
            required
            radius="md"
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps("email")}
          />
          <Input.Wrapper
            label="Phone number"
            id="phoneNumber"
            required
            {...form.getInputProps("phoneNumber")}
          >
            <Input
              component={InputMask}
              radius="md"
              mask="+48 999-999-999"
              id="phoneNumber"
              placeholder="Your phone"
              {...form.getInputProps("phoneNumber")}
            />
          </Input.Wrapper>
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
                  label="Password"
                  placeholder=""
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
                label="Includes at least 6 characters"
                meets={form.values.password.length > 5}
              />
              {checks}
            </Popover.Dropdown>
          </Popover>

          <PasswordInput
            withAsterisk
            radius="md"
            label="Password"
            placeholder=""
            visible={visible}
            onVisibilityChange={toggle}
            {...form.getInputProps("confirmPassword")}
          />
          <Checkbox
            mt="sm"
            label="I accept terms and conditions"
            {...form.getInputProps("terms", { type: "checkbox" })}
            error={form.errors.terms}
          />
        </Stack>
        <Button type="submit" mt="md" fullWidth radius="md" loading={isLoading}>
          Submit
        </Button>
      </form>
    </Paper>
  );
};
