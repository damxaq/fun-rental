export const formatDaysRange = (
  startDate: Date | undefined,
  endDate: Date | undefined
) => {
  return startDate && endDate
    ? startDate.toLocaleDateString() === endDate.toLocaleDateString()
      ? startDate.toLocaleDateString()
      : startDate.toLocaleDateString() + " — " + endDate.toLocaleDateString()
    : "";
};

export const daysBetween = (
  startDate: Date | undefined,
  endDate: Date | undefined
) =>
  startDate && endDate
    ? Math.round(
        (endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000)
      ) + 1
    : 1;
