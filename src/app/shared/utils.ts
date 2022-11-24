export const getLhsFromObject = <T>(
  data: T,
  mappingObject: Partial<T>
): Partial<T> => {
  const result: Partial<T> = {};

  for (const field in mappingObject) {
    result[field] = data[field];
  }

  return result;
};
