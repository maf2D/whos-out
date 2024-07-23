/* eslint @typescript-eslint/no-explicit-any: off */

type Debounce = <T extends (...args: any[]) => void>(
  cb: T,
  delay: number
) => (...args: Parameters<T>) => void;

// helper that returns a fn with a delay
export const debounce: Debounce = (cb, delay) => {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<typeof cb>) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      cb(...args);
    }, delay);
  };
};
