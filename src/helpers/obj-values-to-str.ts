// helper that converts all object params to str
export const objValuesToStr = (obj: object) => {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key,
      value !== null ? String(value) : ''
    ])
  );
};
