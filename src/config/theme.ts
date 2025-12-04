import { createTheme, MantineColorsTuple } from "@mantine/core";

// Primary color: E1AA7D
const primary: MantineColorsTuple = [
  "#fef6ee",
  "#f9eadb",
  "#f3d3b8",
  "#edba92",
  "#e8a673",
  "#e49b5f",
  "#e39654",
  "#ca8244",
  "#b4733a",
  "#9d622d",
];

// Secondary color: B6D094
const secondary: MantineColorsTuple = [
  "#f4f9ee",
  "#e6f0dc",
  "#cce0b7",
  "#b0cf8f",
  "#98c06c",
  "#89b655",
  "#81b147",
  "#6e9b38",
  "#608a2e",
  "#50771f",
];

// Accent: 6A2E35
const accent: MantineColorsTuple = [
  "#fbeced",
  "#f0d8db",
  "#dfafb5",
  "#cd838d",
  "#be5d6a",
  "#b44754",
  "#af3b48",
  "#982d3a",
  "#882633",
  "#781d2a",
];

export const theme = createTheme({
  colors: {
    primary,
    secondary,
    accent,
  },
  primaryColor: "primary",
  // Background color for the app
  other: {
    background: "#2E2836",
  },
});
