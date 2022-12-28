import { useState } from "react";
import {
  createStyles,
  UnstyledButton,
  Menu,
  Image,
  Group,
} from "@mantine/core";
import { IconChevronDown } from "@tabler/icons";
import polishFlag from "../assets/flag-poland.png";
import englishFlag from "../assets/flag-england.png";
import { useI18nContext } from "../i18n/i18n-react";
import { Locales } from "../i18n/i18n-types";
import { languageState, userState } from "../session/sessionState";
import { useRecoilState } from "recoil";
import { changeLanguage } from "../shared/APIs/userService";

interface dataI {
  label: string;
  image: string;
}

const data = [
  { label: "EN", image: englishFlag },
  { label: "PL", image: polishFlag },
];

const useStyles = createStyles((theme, { opened }: { opened: boolean }) => ({
  control: {
    width: 100,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 15px",
    borderRadius: theme.radius.md,

    transition: "background-color 150ms ease",
    backgroundColor: theme.fn.variant({
      variant: "filled",
      color: theme.primaryColor,
    }).background,
    "&:hover": {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background!,
        0.1
      ),
    },
  },

  label: {
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,
  },

  icon: {
    transition: "transform 150ms ease",
    transform: opened ? "rotate(180deg)" : "rotate(0deg)",
  },
}));

export function LanguagePicker() {
  const [opened, setOpened] = useState(false);
  const { classes } = useStyles({ opened });
  const [locale, setUserLocale] = useRecoilState(languageState);
  const [user, setUser] = useRecoilState(userState);
  const [selected, setSelected] = useState(
    data.find((item) => item.label.toLowerCase() === locale) ?? data[0]
  );
  const { setLocale } = useI18nContext();

  const handleChange = async (item: dataI) => {
    setSelected(item);
    setLocale(item.label.toLowerCase() as Locales);
    setUserLocale(item.label.toLowerCase() as Locales);
    if (user) {
      const changedUser = await changeLanguage(user.id, item.label as Locales);
      setUser(changedUser.data);
    }
  };

  const items = data.map((item) => (
    <Menu.Item
      icon={<Image src={item.image} width={18} height={18} />}
      onClick={() => handleChange(item)}
      key={item.label}
    >
      {item.label}
    </Menu.Item>
  ));

  return (
    <Menu
      onOpen={() => setOpened(true)}
      onClose={() => setOpened(false)}
      radius="md"
      width="target"
    >
      <Menu.Target>
        <UnstyledButton className={classes.control}>
          <Group spacing="xs">
            <Image src={selected.image} width={22} height={22} />
            <span className={classes.label}>{selected.label}</span>
          </Group>
          <IconChevronDown size={16} className={classes.icon} stroke={1.5} />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>{items}</Menu.Dropdown>
    </Menu>
  );
}
