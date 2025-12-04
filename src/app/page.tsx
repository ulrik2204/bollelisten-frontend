"use client";

import { EntriesList } from "@/features/entries-list/components/EntriesList/EntriesList";
import { GroupInfo } from "@/features/group-info/components/GroupInfo/GroupInfo";
import { PeopleList } from "@/features/people-list/components/PeopleList/PeopleList";
import { getText } from "@/utils/text-service";
import { Anchor, Container, Grid, Stack, Title } from "@mantine/core";

export default function Home() {
  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        <Title order={1}>Dashboard</Title>

        <Grid gutter="md">
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Stack gap="md">
              <Anchor href="/add-entry" fw={500}>
                {getText("entries.addEntryButton")}
              </Anchor>
              <EntriesList />
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack gap="md">
              <GroupInfo />
              <PeopleList />
            </Stack>
          </Grid.Col>
        </Grid>
      </Stack>
    </Container>
  );
}
