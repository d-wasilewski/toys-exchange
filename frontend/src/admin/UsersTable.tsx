import { useEffect, useState } from "react";
import {
  createStyles,
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  Avatar,
} from "@mantine/core";
import { keys } from "@mantine/utils";
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
} from "@tabler/icons";
import { UserList } from "../shared/APIs/userService";
import { StatusBadge } from "./StatusBadge";
import { RoleBadge } from "./RoleBadge";
import { UserActions } from "./UserActions";
import { useI18nContext } from "../i18n/i18n-react";

const useStyles = createStyles((theme) => ({
  th: {
    padding: "0 !important",
  },

  control: {
    width: "100%",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  icon: {
    width: 21,
    height: 21,
    borderRadius: 21,
  },
}));

interface TableSortProps {
  data: UserList[];
}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const { classes } = useStyles();
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;
  return (
    <th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group position="apart">
          <Text weight={500} size="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size={14} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  );
}

function filterData(data: UserList[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) => String(item[key]).toLowerCase().includes(query))
  );
}

function sortData(
  data: UserList[],
  payload: { sortBy: keyof UserList | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return String(b[sortBy]).localeCompare(String(a[sortBy]));
      }

      return String(a[sortBy]).localeCompare(String(b[sortBy]));
    }),
    payload.search
  );
}

export function UsersTable({ data }: TableSortProps) {
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof UserList | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const { LL } = useI18nContext();

  useEffect(() => {
    setSortedData(data);
  }, [data]);

  const setSorting = (field: keyof UserList) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(
      sortData(data, { sortBy, reversed: reverseSortDirection, search: value })
    );
  };

  const rows = sortedData.map((row) => {
    return (
      <tr key={row.id}>
        <td>
          <Avatar src={row.imgUrl} />
        </td>
        <td>{row.name}</td>
        <td>{row.email}</td>
        <td>{row.phoneNumber}</td>
        <td>
          <RoleBadge role={row.role} />
        </td>
        <td>
          <StatusBadge status={row.status} confirmed={row.confirmed} />
        </td>
        <td>
          <UserActions userId={row.id} />
        </td>
      </tr>
    );
  });

  return (
    <ScrollArea>
      <TextInput
        placeholder={LL.filters.searchByAny()}
        mb="md"
        icon={<IconSearch size={14} stroke={1.5} />}
        value={search}
        onChange={handleSearchChange}
      />
      <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        sx={{ tableLayout: "auto", minWidth: 700 }}
        withBorder
        highlightOnHover
      >
        <thead>
          <tr>
            <th></th>
            <Th
              sorted={sortBy === "name"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("name")}
            >
              {LL.admin.name()}
            </Th>
            <Th
              sorted={sortBy === "email"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("email")}
            >
              {LL.admin.email()}
            </Th>
            <Th
              sorted={sortBy === "phoneNumber"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("phoneNumber")}
            >
              {LL.admin.phone()}
            </Th>
            <Th
              sorted={sortBy === "role"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("role")}
            >
              {LL.admin.role()}
            </Th>
            <Th
              sorted={sortBy === "status"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("status")}
            >
              {LL.admin.status()}
            </Th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <tr>
              <td colSpan={Object.keys(data[0]).length}>
                <Text weight={500} align="center">
                  {LL.general.nothingFound()}
                </Text>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </ScrollArea>
  );
}
