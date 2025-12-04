"use client";

import { useGetEntry } from "@/features/entries-list/api/get-entry";
import { EditEntryForm } from "@/features/entries-list/components/EditEntryForm/EditEntryForm";
import { Alert, Card, Loader, Stack, Text } from "@mantine/core";
import { useParams, useRouter } from "next/navigation";

export default function EditEntryPage() {
  const params = useParams();
  const router = useRouter();
  const entryId = params.entryId as string;

  const { data, isLoading, error } = useGetEntry(entryId);

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

  return <EditEntryForm entry={data.body} />;
}
