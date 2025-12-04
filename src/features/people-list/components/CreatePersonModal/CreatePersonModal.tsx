"use client";

import { Alert, Button, Modal, Stack, TextInput } from "@mantine/core";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { usePostCreatePerson } from "../../api/post-create-person";

export type CreatePersonModalProps = {
  opened: boolean;
  onClose: () => void;
  onSuccess?: (person: { id: string; name: string; groupId: string }) => void;
};

export function CreatePersonModal({
  opened,
  onClose,
  onSuccess,
}: CreatePersonModalProps) {
  const [error, setError] = useState<string | null>(null);

  const { mutate: createPerson, isPending } = usePostCreatePerson({
    onError: (error) => setError(error.message),
    onSuccess: (response) => {
      setError(null);
      form.reset();
      onSuccess?.(response.body);
      onClose();
    },
  });

  const form = useForm({
    defaultValues: {
      name: "",
    },
    onSubmit: async ({ value }) => {
      setError(null);
      createPerson(value);
    },
  });

  return (
    <Modal opened={opened} onClose={onClose} title="Create New Person" centered>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <Stack gap="md">
          <form.Field
            name="name"
            validators={{
              onChange: ({ value }) => {
                if (!value || value.trim().length === 0) {
                  return "Name is required";
                }
                if (value.length < 2) {
                  return "Name must be at least 2 characters";
                }
                return undefined;
              },
            }}
          >
            {(field) => (
              <TextInput
                label="Name"
                placeholder="Enter person's name"
                required
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                error={field.state.meta.errors?.[0]}
              />
            )}
          </form.Field>

          {error && <Alert color="red">{error}</Alert>}

          <Button type="submit" loading={isPending} fullWidth>
            Create Person
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
