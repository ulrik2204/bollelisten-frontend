import { Container, Stack } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";

import { AddEntryForm } from "@/features/entries-list/components/AddEntryForm/AddEntryForm";

export const Route = createFileRoute("/groups/$groupSlug/add-entry")({
  component: AddEntryPage,
});

function AddEntryPage() {
  const { groupSlug } = Route.useParams();

  return (
    <Container size="md" py="xl">
      <Stack gap="xl">
        <AddEntryForm groupSlug={groupSlug} />
      </Stack>
    </Container>
  );
}
