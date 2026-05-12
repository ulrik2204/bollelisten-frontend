"use client";

import { BarChart } from "@mantine/charts";
import { Alert, Card, Loader, Stack, Text, Title } from "@mantine/core";
import { DatePickerInput, type DateValue } from "@mantine/dates";
import { useMemo, useState } from "react";

import { useGetEntries } from "@/features/entries-list/api/get-entries";
import { useGetPeople } from "@/features/people-list/api/get-people";

type StatsProps = {
  groupSlug: string;
};

export function Stats({ groupSlug }: StatsProps) {
  const [sinceDate, setSinceDate] = useState<DateValue>(null);

  const {
    data: entriesData,
    isLoading: entriesLoading,
    error: entriesError,
  } = useGetEntries(groupSlug);

  const {
    data: peopleData,
    isLoading: peopleLoading,
    error: peopleError,
  } = useGetPeople(groupSlug);

  const stats = useMemo(() => {
    const entries = entriesData?.body ?? [];
    const people = peopleData?.body ?? [];

    const filtered = sinceDate
      ? entries.filter((e) => new Date(e.incidentTime) >= sinceDate)
      : entries;

    const countByPersonId = new Map<string, number>();
    for (const entry of filtered) {
      const current = countByPersonId.get(entry.person.id) ?? 0;
      countByPersonId.set(entry.person.id, current + 1);
    }

    return people
      .map((person) => ({
        id: person.id,
        name: person.name,
        count: countByPersonId.get(person.id) ?? 0,
      }))
      .sort((a, b) => b.count - a.count);
  }, [entriesData, peopleData, sinceDate]);

  const isLoading = entriesLoading || peopleLoading;
  const error = entriesError || peopleError;

  if (isLoading) {
    return (
      <Card withBorder shadow="sm" radius="md" p="lg">
        <Stack align="center" gap="md">
          <Loader size="lg" />
          <Text>Loading stats...</Text>
        </Stack>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert color="red" title="Error loading stats">
        {error.message}
      </Alert>
    );
  }

  return (
    <Card withBorder shadow="sm" radius="md" p="lg">
      <Stack gap="md">
        <Title order={2}>Entry Stats</Title>

        <DatePickerInput
          label="Since date"
          description="Only count entries from this date onward"
          placeholder="All time"
          value={sinceDate}
          onChange={setSinceDate}
          clearable
          radius="md"
          maxDate={new Date()}
        />

        {stats.length === 0 ? (
          <Text c="dimmed">No people in this group yet</Text>
        ) : (
          <BarChart
            h={Math.max(200, stats.length * 40)}
            data={stats}
            dataKey="name"
            series={[{ name: "count", color: "primary" }]}
            orientation="vertical"
            gridAxis="none"
            withBarValueLabel
            tickLine="none"
          />
        )}
      </Stack>
    </Card>
  );
}
