"use client";

import { useGetPeople } from "@/features/people-list/api/get-people";
import { CreatePersonModal } from "@/features/people-list/components/CreatePersonModal/CreatePersonModal";
import {
  Alert,
  Button,
  Card,
  Checkbox,
  Loader,
  Select,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { usePostCreateEntry } from "../../api/post-create-entry";

export function AddEntryForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [modalOpened, { open: openModal, close: closeModal }] =
    useDisclosure(false);

  const {
    data: peopleData,
    isLoading: isPeopleLoading,
    refetch: refetchPeople,
  } = useGetPeople();

  const { mutate: createEntry, isPending } = usePostCreateEntry({
    onError: (error) => setError(error.message),
    onSuccess: () => {
      setError(null);
      router.push("/");
    },
  });

  const form = useForm({
    defaultValues: {
      personId: "",
      incidentTime: new Date().toISOString(),
      hasFulfilledTime: false,
      fulfilledTime: null as string | null,
    },
    onSubmit: async ({ value }) => {
      setError(null);
      console.log("Submitting entry with values:", value);
      createEntry({
        personId: value.personId,
        incidentTime: value.incidentTime,
        fulfilledTime:
          value.hasFulfilledTime && value.fulfilledTime
            ? value.fulfilledTime
            : null,
      });
    },
  });

  const people = peopleData?.body || [];
  const peopleOptions = people.map((person) => ({
    value: person.id,
    label: person.name,
  }));

  const handlePersonCreated = (person: {
    id: string;
    name: string;
    groupId: string;
  }) => {
    refetchPeople();
    form.setFieldValue("personId", person.id);
  };

  if (isPeopleLoading) {
    return (
      <Card withBorder shadow="sm" radius="md" p="lg">
        <Stack align="center" gap="md">
          <Loader size="lg" />
          <Text>Loading people...</Text>
        </Stack>
      </Card>
    );
  }

  return (
    <>
      <Card withBorder shadow="sm" radius="md" p="lg">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <Stack gap="md">
            <Title order={2}>Add New Entry</Title>

            <form.Field
              name="personId"
              validators={{
                onChange: ({ value }) => {
                  if (!value || value.trim().length === 0) {
                    return "Please select a person";
                  }
                  return undefined;
                },
              }}
            >
              {(field) => (
                <div>
                  <Select
                    label="Person"
                    placeholder="Select a person"
                    data={peopleOptions}
                    searchable
                    required
                    value={field.state.value}
                    onChange={(value) => field.handleChange(value || "")}
                    onBlur={field.handleBlur}
                    error={field.state.meta.errors?.[0]}
                    nothingFoundMessage="No people found"
                  />
                  <Button
                    variant="subtle"
                    size="xs"
                    mt="xs"
                    onClick={openModal}
                  >
                    + Create new person
                  </Button>
                </div>
              )}
            </form.Field>

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
                <DateTimePicker
                  label="Incident Date"
                  placeholder="Select date"
                  required
                  value={field.state.value ? new Date(field.state.value) : null}
                  onChange={(value) => value && field.handleChange(value)}
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
                      <DateTimePicker
                        label="Fulfilled Date"
                        placeholder="Select date"
                        value={
                          field.state.value ? new Date(field.state.value) : null
                        }
                        onChange={(value) => value && field.handleChange(value)}
                        onBlur={field.handleBlur}
                      />
                    )}
                  </form.Field>
                ) : null
              }
            </form.Subscribe>

            {error && <Alert color="red">{error}</Alert>}

            <Button type="submit" loading={isPending} fullWidth>
              Create Entry
            </Button>
          </Stack>
        </form>
      </Card>

      <CreatePersonModal
        opened={modalOpened}
        onClose={closeModal}
        onSuccess={handlePersonCreated}
      />
    </>
  );
}
