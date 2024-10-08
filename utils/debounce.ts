export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number = 300, // Default delay of 300ms
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
