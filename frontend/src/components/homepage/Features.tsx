import { createStyles, Text, SimpleGrid, Container } from "@mantine/core";
import {
  IconTruck,
  IconCertificate,
  IconCoin,
  TablerIcon,
} from "@tabler/icons";
import { useI18nContext } from "../../i18n/i18n-react";
import { TranslationFunctions } from "../../i18n/i18n-types";

const useStyles = createStyles((theme) => ({
  feature: {
    position: "relative",
    paddingTop: theme.spacing.xl,
    paddingLeft: theme.spacing.xl,
  },

  overlay: {
    position: "absolute",
    height: 100,
    width: 160,
    top: 0,
    left: 0,
    backgroundColor: theme.fn.variant({
      variant: "light",
      color: theme.primaryColor,
    }).background,
    zIndex: 1,
  },

  content: {
    position: "relative",
    zIndex: 2,
  },

  icon: {
    color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
      .color,
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },
}));

interface FeatureProps extends React.ComponentPropsWithoutRef<"div"> {
  icon: TablerIcon;
  title: string;
  description: string;
}

function Feature({
  icon: Icon,
  title,
  description,
  className,
  ...others
}: FeatureProps) {
  const { classes, cx } = useStyles();

  return (
    <div className={cx(classes.feature, className)} {...others}>
      <div className={classes.overlay} />

      <div className={classes.content}>
        <Icon size={38} className={classes.icon} stroke={1.5} />
        <Text weight={700} size="lg" mb="xs" mt={5} className={classes.title}>
          {title}
        </Text>
        <Text color="dimmed" size="sm">
          {description}
        </Text>
      </div>
    </div>
  );
}

const getData = (LL: TranslationFunctions) => [
  {
    icon: IconTruck,
    title: LL.homepage.features.title1(),
    description: LL.homepage.features.description1(),
  },
  {
    icon: IconCertificate,
    title: LL.homepage.features.title2(),
    description: LL.homepage.features.description2(),
  },
  {
    icon: IconCoin,
    title: LL.homepage.features.title3(),
    description: LL.homepage.features.description3(),
  },
];

export function Features() {
  const { LL } = useI18nContext();

  const items = getData(LL).map((item) => (
    <Feature {...item} key={item.title} />
  ));

  return (
    <Container mt={150} mb={150} size="lg">
      <SimpleGrid
        cols={3}
        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        spacing={50}
      >
        {items}
      </SimpleGrid>
    </Container>
  );
}
