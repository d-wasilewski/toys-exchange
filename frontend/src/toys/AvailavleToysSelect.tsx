import { forwardRef } from "react";
import { Group, Avatar, Text, Select } from "@mantine/core";
import { useSetRecoilState } from "recoil";
import { offeredToyIdState } from "./toysState";

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
  const setOfferedToyId = useSetRecoilState(offeredToyIdState);
  return (
    <Select
      label="Select one of your toys"
      placeholder="Pick one"
      itemComponent={SelectItem}
      data={data}
      searchable
      onChange={(value) => value && setOfferedToyId(value)}
      maxDropdownHeight={400}
      nothingFound="Nobody here"
      filter={(value, item) =>
        item.label?.toLowerCase().includes(value.toLowerCase().trim()) ||
        item.description.toLowerCase().includes(value.toLowerCase().trim())
      }
    />
  );
}
