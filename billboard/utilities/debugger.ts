export function showDebugMessage(message: any) {
  const hostname =
    typeof window !== "undefined" && window.location.hostname
      ? window.location.hostname
      : "";
  const isLocalhost = hostname == "localhost";
  if (isLocalhost) {
    console.log(message);
  }
}
