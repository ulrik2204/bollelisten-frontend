"use client";

import { AddEntryForm } from "@/features/entries-list/components/AddEntryForm/AddEntryForm";
import { Container, Stack } from "@mantine/core";

export default function AddEntryPage() {
  return (
    <Container size="md" py="xl">
      <Stack gap="xl">
        <AddEntryForm />
      </Stack>
    </Container>
  );
}
