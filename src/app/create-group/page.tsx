"use client";

import { CreateGroupForm } from "@/features/create-group/components/CreateGroupForm/CreateGroupForm";
import { Anchor, Container, Text, Title } from "@mantine/core";
import { useRouter } from "next/navigation";

export default function CreateGroup() {
  const router = useRouter();

  return (
    <main>
      <Container size={420} my={40}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Title ta="center">Create a New Group</Title>

          <Text>
            Create your own group to start tracking entries. Choose a unique
            slug and give your group a name and description.
          </Text>

          <CreateGroupForm
            onSuccess={(groupSlug) => router.push(`/?group=${groupSlug}`)}
          />

          <Text ta="center" mt="md">
            Already have a group?{" "}
            <Anchor href="/login" fw={500}>
              Sign in
            </Anchor>
          </Text>
        </div>
      </Container>
    </main>
  );
}
