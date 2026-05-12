import { createFileRoute } from "@tanstack/react-router";
import { Anchor, Container, Stack } from "@mantine/core";

import { Stats } from "@/features/stats/components/Stats/Stats";

export const Route = createFileRoute("/groups/$groupSlug/stats")({
  component: StatsPage,
});

function StatsPage() {
  const { groupSlug } = Route.useParams();

  return (
    <Container size="md" py="xl">
      <Stack gap="xl">
        <Anchor href={`/groups/${groupSlug}`} fw={500}>
          Back to dashboard
        </Anchor>
        <Stats groupSlug={groupSlug} />
      </Stack>
    </Container>
  );
}
