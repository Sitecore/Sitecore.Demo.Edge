export const getMockExpirationDate = (): string => {
  const now = new Date();
  const nowYear = now.getFullYear();
  now.setFullYear(nowYear + 2);
  return now.toISOString();
};
