"use client";

import { Alert, Card, Group, Loader, Stack, Text, Title } from "@mantine/core";
import { useGetCurrentGroup } from "../../api/get-current-group";

export function GroupInfo() {
  const { data, isLoading, error } = useGetCurrentGroup();

  if (isLoading) {
    return (
      <Card withBorder shadow="sm" radius="md" p="lg">
        <Stack align="center" gap="md">
          <Loader size="lg" />
          <Text>Loading group info...</Text>
        </Stack>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert color="red" title="Error loading group info">
        {error.message}
      </Alert>
    );
  }

  const group = data?.body;

  if (!group) {
    return (
      <Alert color="yellow" title="No group found">
        You are not currently logged into a group
      </Alert>
    );
  }

  return (
    <Card withBorder shadow="sm" radius="md" p="lg">
      <Stack gap="md">
        <Group justify="space-between" align="flex-start">
          <div>
            <Title order={2}>{group.name}</Title>
            <Text size="sm" c="dimmed">
              @{group.slug}
            </Text>
          </div>
        </Group>
        {group.description && <Text size="sm">{group.description}</Text>}
      </Stack>
    </Card>
  );
}
