"use client";

import {
  Alert,
  Avatar,
  Card,
  Group,
  Loader,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useGetPeople } from "../../api/get-people";

export function PeopleList() {
  const { data, isLoading, error } = useGetPeople();

  if (isLoading) {
    return (
      <Card withBorder shadow="sm" radius="md" p="lg">
        <Stack align="center" gap="md">
          <Loader size="lg" />
          <Text>Loading people...</Text>
        </Stack>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert color="red" title="Error loading people">
        {error.message}
      </Alert>
    );
  }

  const people = data?.body || [];

  return (
    <Card withBorder shadow="sm" radius="md" p="lg">
      <Stack gap="md">
        <Title order={2}>People</Title>
        {people.length === 0 ? (
          <Text c="dimmed">No people found</Text>
        ) : (
          <Stack gap="sm">
            {people.map((person) => (
              <Card key={person.id} withBorder padding="sm">
                <Group>
                  <Avatar color="blue" radius="xl">
                    {person.name.charAt(0).toUpperCase()}
                  </Avatar>
                  <div>
                    <Text fw={500}>{person.name}</Text>
                    <Text size="xs" c="dimmed">
                      ID: {person.id.substring(0, 8)}...
                    </Text>
                  </div>
                </Group>
              </Card>
            ))}
          </Stack>
        )}
      </Stack>
    </Card>
  );
}
