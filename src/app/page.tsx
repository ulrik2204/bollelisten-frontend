"use client";

import {
  Anchor,
  Button,
  Container,
  Flex,
  Paper,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [groupSlug, setGroupSlug] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleGoToGroup = () => {
    const slug = groupSlug.trim();
    if (!slug) {
      setError("Please enter a group slug.");
      return;
    }
    setError(null);
    router.push(`/groups/${slug}`);
  };

  return (
    <main>
      <Container size={420} my={40}>
        <Flex direction="column" gap="md">
          <Title ta="center">Go to Your Group</Title>
          <Text>
            Enter your group slug to access your group&apos;s Bollelisten
          </Text>

          <Paper
            withBorder
            shadow="sm"
            radius="md"
            p="lg"
            style={{ width: "100%" }}
          >
            <Flex direction="column" gap="xl">
              <TextInput
                label="Group Slug"
                required
                radius="md"
                value={groupSlug}
                onChange={(e) => setGroupSlug(e.target.value)}
                error={error}
              />
              <Button fullWidth radius="md" onClick={handleGoToGroup}>
                Go to group
              </Button>
            </Flex>
          </Paper>

          <Text ta="center" mt="md">
            Don&apos;t have a group?{" "}
            <Anchor href="/create-group" fw={500}>
              Create group
            </Anchor>
          </Text>
        </Flex>
      </Container>
    </main>
  );
}
