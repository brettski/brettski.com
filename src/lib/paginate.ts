export interface Page<T> {
  items: T[];
  page: number;
  totalPages: number;
}

export function paginate<T>(items: T[], page: number, size: number): Page<T> {
  const totalPages = Math.max(1, Math.ceil(items.length / size));
  if (!Number.isInteger(page) || page < 1 || page > totalPages)
    throw new RangeError(`page ${page} out of range 1..${totalPages}`);
  return {
    items: items.slice((page - 1) * size, page * size),
    page,
    totalPages,
  };
}
