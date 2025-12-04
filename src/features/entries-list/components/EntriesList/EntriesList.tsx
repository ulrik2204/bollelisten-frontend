"use client";

import {
  ActionIcon,
  Alert,
  Badge,
  Button,
  Card,
  Group,
  Loader,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useGetEntries } from "../../api/get-entries";
import { usePutUpdateEntry } from "../../api/put-update-entry";

export function EntriesList() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);
  const { data, isLoading, error: fetchError } = useGetEntries();

  const { mutate: updateEntry, isPending: isMarkingAsDone } = usePutUpdateEntry(
    {
      onError: (error) => setError(error.message),
      onSuccess: () => {
        setError(null);
        queryClient.invalidateQueries({ queryKey: ["entries"] });
      },
    }
  );

  if (isLoading) {
    return (
      <Card withBorder shadow="sm" radius="md" p="lg">
        <Stack align="center" gap="md">
          <Loader size="lg" />
          <Text>Loading entries...</Text>
        </Stack>
      </Card>
    );
  }

  if (fetchError) {
    return (
      <Alert color="red" title="Error loading entries">
        {fetchError.message}
      </Alert>
    );
  }

  const entries = data?.body || [];

  const handleMarkAsDone = (entryId: string) => {
    updateEntry({
      entryId,
      data: { fulfilledTime: new Date().toISOString() },
    });
  };

  const handleEdit = (entryId: string) => {
    router.push(`/edit-entry/${entryId}`);
  };

  return (
    <Card withBorder shadow="sm" radius="md" p="lg">
      <Stack gap="md">
        <Title order={2}>Entries</Title>
        {error && <Alert color="red">{error}</Alert>}
        {entries.length === 0 ? (
          <Text c="dimmed">No entries found</Text>
        ) : (
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Person</Table.Th>
                <Table.Th>Incident Time</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Fulfilled Time</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {entries.map((entry) => (
                <Table.Tr key={entry.id}>
                  <Table.Td>{entry.personName}</Table.Td>
                  <Table.Td>
                    {new Date(entry.incidentTime).toLocaleString()}
                  </Table.Td>
                  <Table.Td>
                    {entry.fulfilledTime ? (
                      <Badge color="green">Fulfilled</Badge>
                    ) : (
                      <Badge color="orange">Pending</Badge>
                    )}
                  </Table.Td>
                  <Table.Td>
                    {entry.fulfilledTime
                      ? new Date(entry.fulfilledTime).toLocaleString()
                      : "-"}
                  </Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      <ActionIcon
                        variant="subtle"
                        color="blue"
                        onClick={() => handleEdit(entry.id)}
                        title="Edit entry"
                      >
                        <IconEdit size={18} />
                      </ActionIcon>
                      {!entry.fulfilledTime && (
                        <Button
                          size="xs"
                          variant="light"
                          onClick={() => handleMarkAsDone(entry.id)}
                          loading={isMarkingAsDone}
                        >
                          Mark as Done
                        </Button>
                      )}
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        )}
      </Stack>
    </Card>
  );
}
