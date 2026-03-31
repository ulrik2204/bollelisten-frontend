"use client";

import { EntriesList } from "@/features/entries-list/components/EntriesList/EntriesList";
import { GroupInfo } from "@/features/group-info/components/GroupInfo/GroupInfo";
import { PeopleList } from "@/features/people-list/components/PeopleList/PeopleList";
import { getText } from "@/utils/text-service";
import { Anchor, Container, Grid, Stack, Title } from "@mantine/core";
import { useParams } from "next/navigation";

export default function GroupDashboardPage() {
  const params = useParams();
  const groupSlug = params.groupSlug as string;

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        <Title order={1}>Dashboard</Title>

        <Grid gutter="md">
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Stack gap="md">
              <Anchor href={`/groups/${groupSlug}/add-entry`} fw={500}>
                {getText("entries.addEntryButton")}
              </Anchor>
              <Anchor href={`/groups/${groupSlug}/stats`} fw={500}>
                View Stats
              </Anchor>
              <EntriesList groupSlug={groupSlug} />
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack gap="md">
              <GroupInfo groupSlug={groupSlug} />
              <PeopleList groupSlug={groupSlug} />
            </Stack>
          </Grid.Col>
        </Grid>
      </Stack>
    </Container>
  );
}
