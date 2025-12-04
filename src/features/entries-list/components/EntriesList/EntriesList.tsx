"use client";

import {
  Alert,
  Badge,
  Card,
  Loader,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { useGetEntries } from "../../api/get-entries";

export function EntriesList() {
  const { data, isLoading, error } = useGetEntries();

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

  if (error) {
    return (
      <Alert color="red" title="Error loading entries">
        {error.message}
      </Alert>
    );
  }

  const entries = data?.body || [];

  return (
    <Card withBorder shadow="sm" radius="md" p="lg">
      <Stack gap="md">
        <Title order={2}>Entries</Title>
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
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        )}
      </Stack>
    </Card>
  );
}
