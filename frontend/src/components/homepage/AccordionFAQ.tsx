import { Container, Title, Accordion, createStyles } from "@mantine/core";
import { useI18nContext } from "../../i18n/i18n-react";

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: theme.spacing.xl * 2,
    paddingBottom: theme.spacing.xl * 2,
    minHeight: 650,
  },

  title: {
    marginBottom: theme.spacing.xl * 1.5,
  },

  item: {
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing.lg,

    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

export function AccordionFAQ() {
  const { classes } = useStyles();
  const { LL } = useI18nContext();
  return (
    <Container size="sm" className={classes.wrapper}>
      <Title align="center" className={classes.title}>
        {LL.homepage.faq.title()}
      </Title>

      <Accordion variant="separated">
        <Accordion.Item className={classes.item} value="reset-password">
          <Accordion.Control>{LL.homepage.faq.question1()}</Accordion.Control>
          <Accordion.Panel>{LL.homepage.faq.answer1()}</Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="another-account">
          <Accordion.Control>{LL.homepage.faq.question2()}</Accordion.Control>
          <Accordion.Panel>{LL.homepage.faq.answer2()}</Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="newsletter">
          <Accordion.Control>{LL.homepage.faq.question3()}</Accordion.Control>
          <Accordion.Panel>{LL.homepage.faq.answer3()}</Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="credit-card">
          <Accordion.Control>{LL.homepage.faq.question4()}</Accordion.Control>
          <Accordion.Panel>{LL.homepage.faq.answer4()}</Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="payment">
          <Accordion.Control>{LL.homepage.faq.question5()}</Accordion.Control>
          <Accordion.Panel>{LL.homepage.faq.answer5()}</Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}
