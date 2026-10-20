export function createSearchParams(query?: object) {
  return new URLSearchParams(
    query
      ? Object.entries(query)
          .filter((entry) => entry[1] !== undefined && entry[1] !== null)
          .map(([key, value]) => [key, String(value)])
      : [],
  );
}
