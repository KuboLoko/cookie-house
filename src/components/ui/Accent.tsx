/** Realça com cor as palavras entre chavetas: "Massa de {croissant}" */
export default function Accent({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <>
      {text.split(/(\{[^}]+\})/g).map((part, i) =>
        part.startsWith("{") ? (
          <span key={i} className={className}>
            {part.slice(1, -1)}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}
