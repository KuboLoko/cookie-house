"use client";

import { useEffect, useState } from "react";
import { business } from "@/content/business";
import { formatDuration, getOpenStatus, type OpenStatus } from "@/lib/time";

type Labels = {
  open: string;
  closesIn: string;
  closed: string;
  opensToday: string;
  opensTomorrow: string;
};

/** Estado "aberto agora" calculado no cliente, hora de Lisboa, atualizado a cada 30s. */
export default function OpenNow({ labels }: { labels: Labels }) {
  // null até montar: evita diferença de hidratação (o servidor não sabe que horas são para o visitante).
  const [status, setStatus] = useState<OpenStatus | null>(null);

  useEffect(() => {
    const update = () =>
      setStatus(getOpenStatus(new Date(), business.hours, business.timezone));
    update();
    const id = window.setInterval(update, 30_000);
    return () => window.clearInterval(id);
  }, []);

  const isOpen = status?.state === "open";

  let text = "";
  if (status?.state === "open") {
    text = `${labels.open} · ${labels.closesIn.replace("{time}", formatDuration(status.minutesToClose))}`;
  } else if (status) {
    const when = (
      status.opensDay === "today" ? labels.opensToday : labels.opensTomorrow
    ).replace("{time}", status.opensAt);
    text = `${labels.closed} · ${when}`;
  }

  return (
    <p
      className="inline-flex min-h-9 items-center gap-2.5 rounded-full border border-cream/30 bg-choc/40 px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-cream backdrop-blur-sm"
      data-state={status?.state ?? "loading"}
    >
      <span
        aria-hidden
        className={`h-2 w-2 rounded-full ${
          status === null
            ? "bg-cream/30"
            : isOpen
              ? "animate-pulse bg-pistachio"
              : "bg-raspberry"
        }`}
      />
      {status === null ? (
        <span className="invisible" aria-hidden>
          {labels.open} · {labels.closesIn.replace("{time}", "0h 00m")}
        </span>
      ) : (
        <span>{text}</span>
      )}
    </p>
  );
}
