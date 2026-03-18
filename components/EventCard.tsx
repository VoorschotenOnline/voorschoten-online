import type { EventItem } from "@/lib/queries";

export function EventCard({ event }: { event: EventItem }) {
  return (
    <div className="event-link">
      <div className="meta">
        {event.category} • {new Date(event.start_datetime).toLocaleString("nl-NL")}
      </div>
      <div className="title">{event.title}</div>
      {event.summary ? <div>{event.summary}</div> : null}
      {event.location_name ? <div className="meta" style={{ marginTop: 8 }}>{event.location_name}</div> : null}
    </div>
  );
}