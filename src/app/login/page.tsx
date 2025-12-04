"use client";

import { LoginForm } from "@/features/login/components/LoginForm/LoginForm";
import { getText } from "@/utils/text-service";
import { Anchor, Container, Text, Title } from "@mantine/core";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Login() {
  const router = useRouter();

  return (
    <main>
      <Container size={420} my={40}>
        <div className={styles.container}>
          <Title ta="center">{getText("login.title")}</Title>

          <Text>{getText("login.description")}</Text>

          <LoginForm onSuccess={() => router.push("/")} />

          <Text ta="center" mt="md">
            Don&apos;t have a group?{" "}
            <Anchor href="/create-group" fw={500}>
              Create group
            </Anchor>
          </Text>
        </div>
      </Container>
    </main>
  );
}
