import { useEffect, useRef, useState } from "react";
import { currently, modelCard, profile } from "../data/content";
import Draggable from "./Draggable";
import PunchCard from "./PunchCard";

const useWide = () => {
  const q = "(min-width: 60rem) and (pointer: fine)";
  const [wide, setWide] = useState(() => window.matchMedia(q).matches);
  useEffect(() => {
    const mq = window.matchMedia(q);
    const update = () => setWide(mq.matches);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return wide;
};

const useKolkataTime = () => {
  const fmt = () =>
    new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" }).format(new Date());
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    const t = setInterval(() => setTime(fmt()), 30_000);
    return () => clearInterval(t);
  }, []);
  return time;
};

/** A falling, slightly noisy loss curve, drawn once. SVG y grows downward. */
const lossY = (i: number) => 94 - 80 * Math.exp(-i / 6) - Math.sin(i * 2.3) * 3 * Math.exp(-i / 12);
const LOSS = Array.from({ length: 24 }, (_, i) => `${(8 + i * 8.6).toFixed(1)},${lossY(i).toFixed(1)}`).join(" ");

const Desk = () => {
  const mat = useRef<HTMLDivElement>(null);
  const wide = useWide();
  const time = useKolkataTime();

  return (
    <section className="desk-wrap container" aria-label="Introduction">
      <div className="mat" ref={mat}>
        <div className="mat-ruler mat-ruler-x" aria-hidden="true" />
        <div className="mat-ruler mat-ruler-y" aria-hidden="true" />

        <Draggable bounds={mat} enabled={wide} tilt={-1.5} className="o-model" label="Model card">
          <article className="model">
            <header className="model-head">
              <span>Model card</span>
              <span>dishan-sarkar</span>
            </header>
            <p className="model-hi">Hi, I’m Dishan.</p>
            <h1 className="model-h">AI engineer, building agents that hold up.</h1>
            <dl className="model-fields">
              {modelCard.map((f) => (
                <div key={f.field}>
                  <dt>{f.field}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
            <div className="model-actions">
              <a className="btn btn-solid" href={`mailto:${profile.email}`}>
                Email me
              </a>
              <a className="btn btn-outline" href={profile.resume} target="_blank" rel="noreferrer">
                Résumé
              </a>
            </div>
          </article>
        </Draggable>

        <Draggable bounds={mat} enabled={wide} tilt={2.5} className="o-punch" label="Punch card">
          <PunchCard text="DISHAN SARKAR / AI ENGINEER / 2027" />
        </Draggable>

        <Draggable bounds={mat} enabled={wide} tilt={-4} className="o-sticky" label="Sticky note">
          <div className="sticky">
            <p className="hand sticky-h">currently into</p>
            <ul className="hand">
              {currently.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </Draggable>

        <Draggable bounds={mat} enabled={wide} tilt={3} className="o-graph" label="Loss curve on graph paper">
          <figure className="graph">
            <svg viewBox="0 0 220 110" aria-hidden="true">
              <path className="graph-axis" d="M6 4V100H214" />
              <polyline className="graph-line" points={LOSS} />
              <circle className="graph-dot" cx={8 + 23 * 8.6} cy={lossY(23)} r="3" />
            </svg>
            <figcaption className="hand">loss, since 2023. still going down.</figcaption>
          </figure>
        </Draggable>

        <Draggable bounds={mat} enabled={wide} tilt={-7} className="o-tag" label="Luggage tag">
          <div className="tag">
            <span className="tag-hole" aria-hidden="true" />
            <p className="tag-h">Looking for a 6-month AI internship</p>
            <p className="tag-p">
              From January 2027. {profile.location}, <span className="num">{time}</span> IST.
            </p>
          </div>
        </Draggable>

        {wide && (
          <p className="hand mat-hint" aria-hidden="true">
            psst, everything here moves
          </p>
        )}
      </div>
    </section>
  );
};

export default Desk;
