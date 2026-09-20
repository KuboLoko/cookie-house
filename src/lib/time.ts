// Sem imports de propósito: função pura, testável diretamente com Node.

export type Hours = { readonly open: string; readonly close: string }; // "HH:mm"

export type OpenStatus =
  | { state: "open"; minutesToClose: number }
  | {
      state: "closed";
      opensDay: "today" | "tomorrow";
      opensAt: string;
      minutesToOpen: number;
    };

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

/** Minutos desde a meia-noite no fuso indicado. */
export function minutesInZone(now: Date, timeZone: string): number {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  return get("hour") * 60 + get("minute");
}

/** Horário igual todos os dias, por isso o dia da semana não importa. */
export function getOpenStatus(
  now: Date,
  hours: Hours,
  timeZone: string,
): OpenStatus {
  const nowMin = minutesInZone(now, timeZone);
  const open = toMinutes(hours.open);
  const close = toMinutes(hours.close);

  if (nowMin >= open && nowMin < close) {
    return { state: "open", minutesToClose: close - nowMin };
  }
  if (nowMin < open) {
    return {
      state: "closed",
      opensDay: "today",
      opensAt: hours.open,
      minutesToOpen: open - nowMin,
    };
  }
  return {
    state: "closed",
    opensDay: "tomorrow",
    opensAt: hours.open,
    minutesToOpen: 24 * 60 - nowMin + open,
  };
}

/** 192 -> "3h 12m", 180 -> "3h", 42 -> "42 min". */
export function formatDuration(totalMinutes: number): string {
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  if (h === 0) return `${m} min`;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}
