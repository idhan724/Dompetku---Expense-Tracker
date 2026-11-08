export const sumRecord = (amounts: Record<string, number>) =>
  Object.values(amounts).reduce((a, b) => a + b, 0);

export const pctChange = (curr: number, prev: number) => {
  if (prev === 0) return curr === 0 ? 0 : null;

  Number((((curr - prev) / prev) * 100).toFixed(1));
};
