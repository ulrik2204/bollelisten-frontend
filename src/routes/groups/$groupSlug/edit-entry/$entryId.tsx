import { Alert, Card, Loader, Stack, Text } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";

import { useGetEntry } from "@/features/entries-list/api/get-entry";
import { EditEntryForm } from "@/features/entries-list/components/EditEntryForm/EditEntryForm";

export const Route = createFileRoute("/groups/$groupSlug/edit-entry/$entryId")({
  component: EditEntryPage,
});

function EditEntryPage() {
  const { groupSlug, entryId } = Route.useParams();

  const { data, isLoading, error } = useGetEntry(groupSlug, entryId);

  if (isLoading) {
    return (
      <Card withBorder shadow="sm" radius="md" p="lg">
        <Stack align="center" gap="md">
          <Loader size="lg" />
          <Text>Loading entry...</Text>
        </Stack>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert color="red" title="Error loading entry">
        {error.message}
      </Alert>
    );
  }

  if (!data?.body) {
    return (
      <Alert color="yellow" title="Entry not found">
        The requested entry could not be found.
      </Alert>
    );
  }

  return <EditEntryForm groupSlug={groupSlug} entry={data.body} />;
}
