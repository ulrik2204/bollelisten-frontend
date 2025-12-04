"use client";

import { getText } from "@/utils/text-service";
import { Button, Flex, Paper, Text, TextInput } from "@mantine/core";
import { useState } from "react";
import { usePostLogin } from "../../api/post-login";

export type LoginFormProps = {
  onSuccess?: () => void;
};

export function LoginForm({ onSuccess }: LoginFormProps) {
  const [groupSlug, setGroupSlug] = useState("");

  const [error, setError] = useState<string | null>(null);

  const {
    mutate: signIn,
    isPending,
    isSuccess,
  } = usePostLogin({
    onError: (response) => setError(getErrorMessage(response.info.status)),
    onSuccess: () => {
      if (!onSuccess) return;
      setTimeout(onSuccess, 2000);
    },
  });

  const handleSubmit = () => {
    const slug = groupSlug.trim();
    if (slug === "") return setError(getText("login.error.empty"));
    setError(null);
    signIn(slug);
  };

  return (
    <Paper withBorder shadow="sm" radius="md" p="lg" style={{ width: "100%" }}>
      <Flex direction="column" gap="xl">
        <TextInput
          label={getText("login.input.group.label")}
          required
          radius="md"
          value={groupSlug}
          onChange={(e) => setGroupSlug(e.target.value)}
        />
        <Flex direction="column" gap="sm">
          <Button
            fullWidth
            radius="md"
            loading={isPending}
            onClick={handleSubmit}
          >
            Sign in
          </Button>
          {error && <Text c="red">{error}</Text>}
          {isSuccess && <Text c="green">{getText("login.success")}</Text>}
        </Flex>
      </Flex>
    </Paper>
  );
}

function getErrorMessage(statusCode: number): string {
  if (statusCode === 401) {
    return getText("login.error.invalidGroup");
  }
  return getText("login.error.generic");
}
