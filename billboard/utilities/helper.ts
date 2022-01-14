export function normalizeString(text: string) {
  return text.replace(/\W+/g, "-").toLowerCase();
}

export function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}
