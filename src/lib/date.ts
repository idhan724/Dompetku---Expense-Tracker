export function getLastMonth(count = 6, from = new Date()) {
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(
      from.getFullYear(),
      from.getMonth() - (count - 1 - i),
      1
    );
    return {
      month: d.toLocaleDateString("en-US", { month: "short" }),
      year: d.getFullYear(),
    };
  });
}

export const formatDate = (d: Date) =>
  d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
