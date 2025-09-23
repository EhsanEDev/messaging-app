import { format, formatDistanceToNow, isToday, isYesterday } from "date-fns";

export function formatLastSeen(date: Date): string {
  if (isToday(date)) {
    return `last seen today at ${format(date, "HH:mm")}`;
  }
  if (isYesterday(date)) {
    return `last seen yesterday at ${format(date, "HH:mm")}`;
  }

  const diff = formatDistanceToNow(date, { addSuffix: true });
  // If within 7 days, use relative time
  if (Date.now() - date.getTime() < 7 * 24 * 60 * 60 * 1000) {
    return diff;
  }

  // Else use full date
  return format(date, "dd MMM yyyy 'at' HH:mm");
}