import { getUpcomingEvents } from "@/lib/queries";
import { EventCard } from "@/components/EventCard";

export default async function AgendaPage() {
  const events = await getUpcomingEvents(50);

  return (
    <section className="card">
      <h1 className="section-title">Agenda</h1>
      <div className="article-list">
        {events.length ? events.map((event) => (
          <EventCard key={event.id} event={event} />
        )) : <p className="empty">Nog geen gepubliceerde agenda-items.</p>}
      </div>
    </section>
  );
}