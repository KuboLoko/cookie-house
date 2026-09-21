"use client";

import { useRef, useState } from "react";

type Labels = {
  title: string;
  intro: string;
  flavorLabel: string;
  flavorPlaceholder: string;
  contactLabel: string;
  contactHelp: string;
  submit: string;
  sending: string;
  success: string;
  again: string;
  error: string;
  soon: string;
  errors: {
    flavorRequired: string;
    flavorShort: string;
    flavorLong: string;
    contactLong: string;
  };
};

type Status = "idle" | "sending" | "success" | "error" | "soon";
type Errors = { flavor?: string; contact?: string };

const LIMITS = { flavorMin: 3, flavorMax: 200, contactMax: 80 } as const;

const field =
  "mt-2 block w-full border-0 border-b-2 border-choc/60 bg-transparent px-0 py-3 text-lg text-theme-fg outline-none transition-colors placeholder:text-choc/70 focus:border-brick aria-[invalid=true]:border-raspberry";

/**
 * "Sugere um sabor". Só UI + validação no cliente. Faz POST para /api/suggest-flavor
 * (placeholder que responde 501): qualquer resposta não-2xx cai no estado de erro,
 * e um 2xx mostra o sucesso. Quando o backend existir não é preciso mexer aqui.
 */
export default function SuggestFlavor({
  labels,
  locale,
  instagram,
}: {
  labels: Labels;
  locale: "pt" | "en";
  instagram: { url: string; handle: string };
}) {
  const [flavor, setFlavor] = useState("");
  const [contact, setContact] = useState("");
  const [trap, setTrap] = useState(""); // honeypot: um humano nunca o preenche
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const flavorRef = useRef<HTMLTextAreaElement>(null);
  const contactRef = useRef<HTMLInputElement>(null);

  const fill = (msg: string, vars: Record<string, number>) =>
    Object.entries(vars).reduce((s, [k, v]) => s.replace(`{${k}}`, String(v)), msg);

  function validateFlavor(value: string): string | undefined {
    const v = value.trim();
    if (!v) return labels.errors.flavorRequired;
    if (v.length < LIMITS.flavorMin)
      return fill(labels.errors.flavorShort, { min: LIMITS.flavorMin });
    if (v.length > LIMITS.flavorMax)
      return fill(labels.errors.flavorLong, { max: LIMITS.flavorMax });
  }
  function validateContact(value: string): string | undefined {
    if (value.trim().length > LIMITS.contactMax)
      return fill(labels.errors.contactLong, { max: LIMITS.contactMax });
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const next: Errors = {
      flavor: validateFlavor(flavor),
      contact: validateContact(contact),
    };
    setErrors(next);
    if (next.flavor) return flavorRef.current?.focus();
    if (next.contact) return contactRef.current?.focus();

    if (trap) {
      setStatus("success"); // bot: finge que correu bem, não envia nada
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/suggest-flavor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          flavor: flavor.trim(),
          contact: contact.trim() || undefined,
          locale,
        }),
      });
      // 501 = o backend ainda não está ligado (placeholder): mostrar um estado honesto, não um erro.
      if (res.status === 501) return setStatus("soon");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function reset() {
    setFlavor("");
    setContact("");
    setErrors({});
    setStatus("idle");
  }

  if (status === "success") {
    return (
      <div role="status" className="py-6">
        <p className="font-display text-3xl font-light [font-variation-settings:'SOFT'_100,'WONK'_1]">
          {labels.success}
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 font-mono text-xs uppercase tracking-widest underline underline-offset-4 hover:text-brick"
        >
          {labels.again}
        </button>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-8">
      <div>
        <label
          htmlFor="sf-flavor"
          className="font-mono text-xs uppercase tracking-widest"
        >
          {labels.flavorLabel}
        </label>
        <textarea
          id="sf-flavor"
          ref={flavorRef}
          rows={2}
          value={flavor}
          maxLength={LIMITS.flavorMax + 40}
          placeholder={labels.flavorPlaceholder}
          aria-required="true"
          aria-invalid={errors.flavor ? true : undefined}
          aria-describedby={errors.flavor ? "sf-flavor-err" : "sf-flavor-count"}
          onChange={(e) => {
            setFlavor(e.target.value);
            if (errors.flavor) {
              setErrors((p) => ({ ...p, flavor: validateFlavor(e.target.value) }));
            }
          }}
          onBlur={() =>
            flavor && setErrors((p) => ({ ...p, flavor: validateFlavor(flavor) }))
          }
          className={`${field} resize-none`}
        />
        <div className="mt-2 flex justify-between gap-4 font-mono text-xs">
          <p id="sf-flavor-err" role="alert" className="text-raspberry-deep">
            {errors.flavor}
          </p>
          <p
            id="sf-flavor-count"
            className={`ml-auto tabular-nums ${flavor.trim().length > LIMITS.flavorMax ? "text-raspberry-deep" : "opacity-80"}`}
          >
            {flavor.trim().length}/{LIMITS.flavorMax}
          </p>
        </div>
      </div>

      <div>
        <label
          htmlFor="sf-contact"
          className="font-mono text-xs uppercase tracking-widest"
        >
          {labels.contactLabel}
        </label>
        <input
          id="sf-contact"
          ref={contactRef}
          type="text"
          value={contact}
          autoComplete="off"
          aria-invalid={errors.contact ? true : undefined}
          aria-describedby={errors.contact ? "sf-contact-err" : "sf-contact-help"}
          onChange={(e) => {
            setContact(e.target.value);
            if (errors.contact) {
              setErrors((p) => ({ ...p, contact: validateContact(e.target.value) }));
            }
          }}
          onBlur={() =>
            setErrors((p) => ({ ...p, contact: validateContact(contact) }))
          }
          className={field}
        />
        {errors.contact ? (
          <p id="sf-contact-err" role="alert" className="mt-2 font-mono text-xs text-raspberry-deep">
            {errors.contact}
          </p>
        ) : (
          <p id="sf-contact-help" className="mt-2 font-mono text-xs opacity-80">
            {labels.contactHelp}
          </p>
        )}
      </div>

      {/* Honeypot, invisível para pessoas e leitores de ecrã */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={trap}
          onChange={(e) => setTrap(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
        <button
          type="submit"
          disabled={sending}
          className="rounded-full bg-brick px-7 py-3.5 font-mono text-sm font-medium uppercase tracking-wider text-cream outline-offset-4 transition-colors hover:bg-choc focus-visible:outline-2 focus-visible:outline-brick disabled:cursor-wait disabled:opacity-60"
        >
          {sending ? labels.sending : labels.submit}
        </button>
        <p role="status" aria-live="polite" className="font-mono text-xs text-raspberry-deep">
          {status === "error" ? labels.error : ""}
        </p>
      </div>
      {status === "soon" && (
        <p role="status" className="max-w-md text-base leading-relaxed">
          {labels.soon}{" "}
          <a
            href={instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap underline underline-offset-4 hover:text-brick"
          >
            {instagram.handle} ↗
          </a>
        </p>
      )}
    </form>
  );
}
