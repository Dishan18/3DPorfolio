import { useId } from "react";

/**
 * An 80-column style punch card, cut down to fit. The holes are real
 * Hollerith encoding of the printed text, so the card actually reads.
 */
const ROWS = ["12", "11", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const holes = (ch: string): string[] => {
  const c = ch.toUpperCase();
  if (c >= "A" && c <= "I") return ["12", String(c.charCodeAt(0) - 64)];
  if (c >= "J" && c <= "R") return ["11", String(c.charCodeAt(0) - 73)];
  if (c >= "S" && c <= "Z") return ["0", String(c.charCodeAt(0) - 81)];
  if (c >= "0" && c <= "9") return [c];
  if (c === "&") return ["12"];
  if (c === "-") return ["11"];
  if (c === "/") return ["0", "1"];
  return [];
};

const PunchCard = ({ text, cols = 34 }: { text: string; cols?: number }) => {
  const chars = text.padEnd(cols, " ").slice(0, cols).split("");
  const cw = 11;
  const rh = 13;
  const padX = 14;
  const top = 26;
  const w = padX * 2 + cols * cw;
  const h = top + ROWS.length * rh + 12;
  const maskId = useId().replace(/:/g, "");
  const paper = `M14 0H${w - 6}a6 6 0 0 1 6 6V${h - 6}a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6V14Z`;
  const cut: { x: number; y: number }[] = [];
  chars.forEach((ch, i) => {
    const punched = holes(ch);
    ROWS.forEach((row, r) => {
      if (punched.includes(row)) cut.push({ x: padX + i * cw + cw / 2, y: top + r * rh + rh / 2 });
    });
  });

  return (
    <svg
      className="punch"
      viewBox={`0 0 ${w} ${h}`}
      role="img"
      aria-label={`Punch card reading ${text}`}
    >
      <defs>
        {/* The holes are cut out of the card, so whatever is underneath shows through. */}
        <mask id={maskId}>
          <path d={paper} fill="white" />
          {cut.map((c) => (
            <rect key={`${c.x}-${c.y}`} x={c.x - 3} y={c.y - 4.5} width={6} height={9} rx={1} fill="black" />
          ))}
        </mask>
      </defs>
      <path className="punch-paper" d={paper} mask={`url(#${maskId})`} />
      {chars.map((ch, i) => (
        <text key={`t${i}`} className="punch-print" x={padX + i * cw + cw / 2} y={15} textAnchor="middle">
          {ch.trim()}
        </text>
      ))}
      {chars.map((ch, i) => {
        const punched = holes(ch);
        return ROWS.map((row, r) => {
          const x = padX + i * cw + cw / 2;
          const y = top + r * rh + rh / 2;
          return r >= 2 && !punched.includes(row) ? (
            <text key={`d${i}-${r}`} className="punch-digit" x={x} y={y + 3} textAnchor="middle">
              {row}
            </text>
          ) : null;
        });
      })}
    </svg>
  );
};

export default PunchCard;
