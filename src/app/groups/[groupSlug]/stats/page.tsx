"use client";

import { Stats } from "@/features/stats/components/Stats/Stats";
import { Anchor, Container, Stack } from "@mantine/core";
import { useParams } from "next/navigation";

export default function StatsPage() {
  const params = useParams();
  const groupSlug = params.groupSlug as string;

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
