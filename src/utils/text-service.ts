import fallbackTexts from "./fallbackTexts.json";

export function getText(key: keyof typeof fallbackTexts) {
  if (key in fallbackTexts) {
    return fallbackTexts[key];
  }
  console.error(`Missing text for key: ${key}`);
  return "";
}
