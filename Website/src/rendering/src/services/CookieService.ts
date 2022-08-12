export function getCookie(name: string): string {
  if (typeof window === 'undefined') {
    // skip when running on the server (ssr)
    return '';
  }
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
  return '';
}

export function setCookie(name: string, value: string, expirationMinutes: number): void {
  if (typeof window === 'undefined') {
    // skip when running on the server (ssr)
    return;
  }
  const date = new Date();
  date.setTime(date.getTime() + expirationMinutes * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
}

export function deleteCookie(name: string): void {
  if (typeof window === 'undefined') {
    // skip when running on the server (ssr)
    return;
  }
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
