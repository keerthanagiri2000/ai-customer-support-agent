export const formatTimestamp = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();

  const isToday = date.toDateString() === now.toDateString();
  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();

  const options = { hour: "numeric", minute: "numeric", hour12: true };
  const time = date.toLocaleTimeString([], options);

  if (isToday) return `Today ${time}`;
  if (isYesterday) return `Yesterday ${time}`;
  return date.toLocaleDateString([], { day: "2-digit", month: "short" }) + `, ${time}`;
};