export async function getUpcomingEvents(limit = 20): Promise<EventItem[]> {
  const events = [
    {
      id: 1,
      slug: "markt-voorschoten",
      title: "Weekmarkt Voorschoten",
      summary: "Gezellige weekmarkt met lokale producten.",
      category: "markt_evenement",
      location_name: "Treubplein",
      start_datetime: new Date().toISOString()
    },
    {
      id: 2,
      slug: "concert-cultuurcentrum",
      title: "Live muziek in cultuurcentrum",
      summary: "Optreden van lokale band.",
      category: "cultuur",
      location_name: "Cultureel Centrum",
      start_datetime: new Date().toISOString()
    }
  ];

  return events.slice(0, limit);
}