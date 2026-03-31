"use client";

import { AddEntryForm } from "@/features/entries-list/components/AddEntryForm/AddEntryForm";
import { Container, Stack } from "@mantine/core";
import { useParams } from "next/navigation";

export default function AddEntryPage() {
  const params = useParams();
  const groupSlug = params.groupSlug as string;

  return (
    <Container size="md" py="xl">
      <Stack gap="xl">
        <AddEntryForm groupSlug={groupSlug} />
      </Stack>
    </Container>
  );
}
