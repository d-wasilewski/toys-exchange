import { forwardRef } from "react";
import { Group, Avatar, Text, Select } from "@mantine/core";
import { useSetRecoilState } from "recoil";
import { offeredToyIdState } from "./toysState";
import { useI18nContext } from "../i18n/i18n-react";

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  image: string;
  label: string;
  description: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ image, label, description, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Avatar src={image} />
        <div>
          <Text size="sm">{label}</Text>
          <Text size="xs" opacity={0.65}>
            {description}
          </Text>
        </div>
      </Group>
    </div>
  )
);

interface AvailableToySelectProps {
  data: {
    value: string;
    label: string;
    description: string;
    image: string;
  }[];
}

export function AvailableToySelect({ data }: AvailableToySelectProps) {
  const { LL } = useI18nContext();
  const setOfferedToyId = useSetRecoilState(offeredToyIdState);
  return (
    <Select
      label={LL.toy.swap.selectOne()}
      placeholder="Pick one"
      itemComponent={SelectItem}
      data={data}
      searchable
      onChange={(value) => value && setOfferedToyId(value)}
      maxDropdownHeight={400}
      nothingFound={LL.toy.swap.notFound()}
      filter={(value, item) =>
        item.label?.toLowerCase().includes(value.toLowerCase().trim()) ||
        item.description.toLowerCase().includes(value.toLowerCase().trim())
      }
    />
  );
}
