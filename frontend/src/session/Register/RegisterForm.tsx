import {
  Input,
  Paper,
  PasswordInput,
  Popover,
  Progress,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import styled from "styled-components";
import InputMask from "react-input-mask";
import { useDisclosure } from "@mantine/hooks";
import { PasswordRequirement } from "./PasswordRequirement";
import { getStrength } from "./getPasswordStrength";
import { useState } from "react";

const requirements = [
  { re: /[0-9]/, label: "Includes number" },
  { re: /[a-z]/, label: "Includes lowercase letter" },
  { re: /[A-Z]/, label: "Includes uppercase letter" },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Includes special symbol" },
];

export const RegisterForm = () => {
  const [visible, { toggle }] = useDisclosure(false);
  const [popoverOpened, setPopoverOpened] = useState(false);

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
    validate: zodResolver(null),
    transformValues: (values) => ({
      ...values,
      phoneNumber: "33",
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

  return (
    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Stack spacing="md">
          <TextInput
            withAsterisk
            radius="md"
            label="Name"
            placeholder="Damian"
            {...form.getInputProps("name")}
          />
          <TextInput
            withAsterisk
            radius="md"
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps("email")}
          />
          <Input.Wrapper label="Phone number" id="phoneNumber" required>
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
          <ButtonWrapper>
            <button type="submit">Submit</button>
          </ButtonWrapper>
        </Stack>
      </form>
    </Paper>
  );
};

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;
