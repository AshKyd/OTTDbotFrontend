import { formatDistance, formatDistanceToNow } from "date-fns";
export default function RelativeTime({ date }) {
  const relativeTime = formatDistance(date, new Date()); // Get relative time
  return (
    <time dateTime={date.toISOString()} title={new Date(date).toLocaleString()}>
      {relativeTime}
    </time>
  );
}
