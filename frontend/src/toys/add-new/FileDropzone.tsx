import { Group, Text, useMantineTheme } from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";

export function FileDropzone(props: Partial<DropzoneProps>) {
  const theme = useMantineTheme();

  console.log(props);
  return (
    <Dropzone
      onDrop={(files) => console.log("accepted files", files)}
      onReject={(files) => console.log("rejected files", files)}
      maxSize={3 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
      maxFiles={1}
      name="imgUrl"
      {...props}
    >
      <Group
        position="center"
        spacing="xl"
        style={{ minHeight: 120, pointerEvents: "none" }}
      >
        <Dropzone.Accept>
          <IconUpload
            size={50}
            stroke={1.5}
            color={
              theme.colors[theme.primaryColor][
                theme.colorScheme === "dark" ? 4 : 6
              ]
            }
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX
            size={50}
            stroke={1.5}
            color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
          />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconPhoto size={50} stroke={1.5} />
        </Dropzone.Idle>

        <div>
          <Text size="xl" inline>
            Drag images here or click to select files
          </Text>
          <Text size="sm" color="dimmed" inline mt={7}>
            The file should not exceed 5mb
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
}
