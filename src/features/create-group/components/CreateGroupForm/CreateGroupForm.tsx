"use client";

import { Button, Flex, Paper, Text, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { usePostCreateGroup } from "../../api/post-create-group";

export type CreateGroupFormProps = {
  onSuccess?: (groupSlug: string) => void;
};

function validateSlug(value: string): string | undefined {
  if (!value || value.trim() === "") {
    return "Slug is required";
  }
  return undefined;
}

function validateName(value: string): string | undefined {
  if (!value || value.trim() === "") {
    return "Name is required";
  }
  return undefined;
}

export function CreateGroupForm({ onSuccess }: CreateGroupFormProps) {
  const [error, setError] = useState<string | null>(null);

  const {
    mutate: createGroup,
    isPending,
    isSuccess,
  } = usePostCreateGroup({
    onError: (response) => {
      setError(getErrorMessage(response.info.status));
    },
    onSuccess: (response) => {
      if (!onSuccess) return;
      setTimeout(() => onSuccess(response.body.slug), 2000);
    },
  });

  const form = useForm({
    defaultValues: {
      slug: "",
      name: "",
      description: "",
    },
    onSubmit: async ({ value }) => {
      setError(null);
      createGroup({
        slug: value.slug,
        name: value.name,
        description: value.description || null,
      });
    },
  });

  return (
    <Paper withBorder shadow="sm" radius="md" p="lg" style={{ width: "100%" }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <Flex direction="column" gap="xl">
          <form.Field
            name="slug"
            validators={{
              onChange: ({ value }) => validateSlug(value),
            }}
          >
            {(field) => (
              <TextInput
                label="Group Slug"
                description="Unique identifier for the group (lowercase, numbers, and hyphens only)"
                required
                radius="md"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                error={field.state.meta.errors.join(", ")}
              />
            )}
          </form.Field>

          <form.Field
            name="name"
            validators={{
              onChange: ({ value }) => validateName(value),
            }}
          >
            {(field) => (
              <TextInput
                label="Group Name"
                description="Display name for the group"
                required
                radius="md"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                error={field.state.meta.errors.join(", ")}
              />
            )}
          </form.Field>

          <form.Field name="description">
            {(field) => (
              <Textarea
                label="Description"
                description="Optional description for the group"
                radius="md"
                minRows={3}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
            )}
          </form.Field>

          <Flex direction="column" gap="sm">
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  fullWidth
                  radius="md"
                  loading={isPending || isSubmitting}
                  disabled={!canSubmit}
                >
                  Create Group
                </Button>
              )}
            </form.Subscribe>
            {error && <Text c="red">{error}</Text>}
            {isSuccess && <Text c="green">Group created successfully!</Text>}
          </Flex>
        </Flex>
      </form>
    </Paper>
  );
}

function getErrorMessage(statusCode: number): string {
  if (statusCode === 409) {
    return "A group with this slug already exists";
  }
  if (statusCode === 400) {
    return "Invalid input. Please check your data and try again";
  }
  return "Failed to create group. Please try again later";
}
