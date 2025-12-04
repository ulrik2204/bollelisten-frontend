"use client";

import {
  Alert,
  Button,
  Card,
  Checkbox,
  Loader,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Entry } from "../../api/get-entries";
import { usePutUpdateEntry } from "../../api/put-update-entry";

type EditEntryFormProps = {
  entry: Entry;
};

export function EditEntryForm({ entry }: EditEntryFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const { mutate: updateEntry, isPending } = usePutUpdateEntry({
    onError: (error) => setError(error.message),
    onSuccess: () => {
      setError(null);
      router.push("/");
    },
  });

  const form = useForm({
    defaultValues: {
      incidentTime: entry.incidentTime,
      hasFulfilledTime: !!entry.fulfilledTime,
      fulfilledTime: entry.fulfilledTime || null,
    },
    onSubmit: async ({ value }) => {
      setError(null);
      console.log("Updating entry with values:", value);
      updateEntry({
        entryId: entry.id,
        data: {
          incidentTime: value.incidentTime,
          fulfilledTime:
            value.hasFulfilledTime && value.fulfilledTime
              ? value.fulfilledTime
              : null,
        },
      });
    },
  });

  if (isPending) {
    return (
      <Card withBorder shadow="sm" radius="md" p="lg">
        <Stack align="center" gap="md">
          <Loader size="lg" />
          <Text>Updating entry...</Text>
        </Stack>
      </Card>
    );
  }

  return (
    <Card withBorder shadow="sm" radius="md" p="lg">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <Stack gap="md">
          <Title order={2}>Edit Entry</Title>

          <Text size="lg" fw={500}>
            Person: {entry.personName}
          </Text>

          <form.Field
            name="incidentTime"
            validators={{
              onChange: ({ value }) => {
                if (!value) {
                  return "Incident time is required";
                }
                return undefined;
              },
            }}
          >
            {(field) => (
              <DatePicker
                label="Incident Date"
                placeholder="Select date"
                required
                value={field.state.value ? new Date(field.state.value) : null}
                onChange={(date) =>
                  field.handleChange(date?.toISOString() || "")
                }
                onBlur={field.handleBlur}
                error={field.state.meta.errors?.[0]}
              />
            )}
          </form.Field>

          <form.Field name="hasFulfilledTime">
            {(field) => (
              <Checkbox
                label="Has fulfilled time"
                checked={field.state.value}
                onChange={(e) => field.handleChange(e.currentTarget.checked)}
              />
            )}
          </form.Field>

          <form.Subscribe selector={(state) => state.values.hasFulfilledTime}>
            {(hasFulfilledTime) =>
              hasFulfilledTime ? (
                <form.Field name="fulfilledTime">
                  {(field) => (
                    <DatePicker
                      label="Fulfilled Date"
                      placeholder="Select date"
                      value={
                        field.state.value ? new Date(field.state.value) : null
                      }
                      onChange={(date) =>
                        field.handleChange(date?.toISOString() || null)
                      }
                      onBlur={field.handleBlur}
                    />
                  )}
                </form.Field>
              ) : null
            }
          </form.Subscribe>

          {error && <Alert color="red">{error}</Alert>}

          <Stack gap="sm">
            <Button type="submit" loading={isPending} fullWidth>
              Update Entry
            </Button>
            <Button variant="subtle" fullWidth onClick={() => router.push("/")}>
              Cancel
            </Button>
          </Stack>
        </Stack>
      </form>
    </Card>
  );
}
