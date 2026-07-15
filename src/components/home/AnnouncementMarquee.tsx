"use client";

import { Marquee } from "@/components/ui/Marquee";
import { ANNOUNCEMENTS } from "@/lib/constants";
import type { Announcement } from "@/types";

export function AnnouncementMarquee(): React.JSX.Element {
  return (
    <Marquee items={[...ANNOUNCEMENTS] as Announcement[]} speed="normal" />
  );
}
