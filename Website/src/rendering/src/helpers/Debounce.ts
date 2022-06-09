export default function debounce(
  func: (arg: string) => void,
  wait: number,
  immediate: boolean
): () => void {
  let timeout: NodeJS.Timeout;

  return function returnFn(this: unknown, ...rest: unknown[]) {
    const args = rest;

    const later = () => {
      timeout = null;
      if (!immediate) {
        func.apply(this, args);
      }
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(this, args);
    }
  };
}
