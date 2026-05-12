import { Anchor, Container, Text, Title } from "@mantine/core";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { CreateGroupForm } from "@/features/create-group/components/CreateGroupForm/CreateGroupForm";

export const Route = createFileRoute("/create-group")({
  component: CreateGroupPage,
});

function CreateGroupPage() {
  const navigate = useNavigate();

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
            onSuccess={(groupSlug) =>
              navigate({
                to: "/groups/$groupSlug",
                params: { groupSlug },
              })
            }
          />

          <Text ta="center" mt="md">
            Already have a group?{" "}
            <Anchor href="/" fw={500}>
              Go to group
            </Anchor>
          </Text>
        </div>
      </Container>
    </main>
  );
}
