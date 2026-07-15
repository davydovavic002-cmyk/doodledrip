"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { EventCard } from "@/components/events/EventCard";
import { RsvpTicket } from "@/components/events/RsvpTicket";
import { EVENTS } from "@/data/events";
import type { ShopEvent } from "@/types";

export function EventsPageContent(): React.JSX.Element {
  const [rsvpEvent, setRsvpEvent] = useState<ShopEvent | null>(null);

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <div className="grid gap-6 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {EVENTS.map((event, index) => (
            <EventCard
              key={event.id}
              event={event}
              index={index}
              onRsvp={setRsvpEvent}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {rsvpEvent ? (
          <RsvpTicket
            event={rsvpEvent}
            onClose={() => setRsvpEvent(null)}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}
