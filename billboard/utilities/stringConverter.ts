import { showDebugMessage } from "./debugger";

export function normalizeString(text: string) {
  showDebugMessage(text.replace(/\W+/g, "-").toLowerCase());
  return text.replace(/\W+/g, "-").toLowerCase();
}
