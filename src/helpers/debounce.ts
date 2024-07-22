/* eslint-disable  @typescript-eslint/no-explicit-any */

// helper that executes a cb with some delay
export const debounce = (
  cb: (...args: any[]) => void,
  delay: number
) => {
  let timer: NodeJS.Timeout | null = null;

  return (...args: any[]) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      cb(...args);
    }, delay);
  };
};
