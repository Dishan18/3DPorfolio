import { CSSProperties, PropsWithChildren, RefObject, useEffect, useRef } from "react";

let topZ = 10;

type Props = PropsWithChildren<{
  className?: string;
  style?: CSSProperties;
  /** Resting tilt in degrees. */
  tilt?: number;
  /** The surface the object lives on; it can hang over the edge but not leave. */
  bounds: RefObject<HTMLElement>;
  enabled: boolean;
  label: string;
}>;

/**
 * A paper object you can pick up and throw. Transform is written straight to
 * the element (no React state per frame); release carries the pointer's
 * velocity with friction, and the edge pulls the object back softly.
 */
const Draggable = ({ className = "", style, tilt = 0, bounds, enabled, label, children }: Props) => {
  const el = useRef<HTMLDivElement>(null);
  const s = useRef({
    x: 0, y: 0, rot: tilt,
    vx: 0, vy: 0,
    px: 0, py: 0, t: 0,
    startX: 0, startY: 0,
    dragging: false, moved: false, raf: 0,
  });

  const paint = (lift = false) => {
    const { x, y, rot } = s.current;
    if (el.current) {
      el.current.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rot}deg) scale(${lift ? 1.03 : 1})`;
    }
  };

  useEffect(() => {
    const st = s.current;
    if (!enabled) {
      cancelAnimationFrame(st.raf);
      st.x = st.y = 0;
      st.rot = tilt;
      if (el.current) el.current.style.transform = "";
      return;
    }
    paint();
    return () => cancelAnimationFrame(st.raf);
  }, [enabled, tilt]);

  const limits = () => {
    const node = el.current, area = bounds.current;
    if (!node || !area) return null;
    const w = node.offsetWidth, h = node.offsetHeight;
    const left = node.offsetLeft, top = node.offsetTop;
    return {
      minX: -left - w * 0.35, maxX: area.clientWidth - left - w * 0.65,
      minY: -top - h * 0.2, maxY: area.clientHeight - top - h * 0.6,
    };
  };

  const settle = () => {
    const st = s.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let last = performance.now();
    const step = (now: number) => {
      const dt = Math.min(32, now - last);
      last = now;
      const lim = limits();
      if (!reduce) {
        st.x += st.vx * dt;
        st.y += st.vy * dt;
      }
      const friction = Math.pow(0.9, dt / 16);
      st.vx *= friction;
      st.vy *= friction;
      if (lim) {
        const cx = Math.min(lim.maxX, Math.max(lim.minX, st.x));
        const cy = Math.min(lim.maxY, Math.max(lim.minY, st.y));
        if (cx !== st.x) { st.x += (cx - st.x) * 0.2; st.vx *= 0.5; }
        if (cy !== st.y) { st.y += (cy - st.y) * 0.2; st.vy *= 0.5; }
      }
      st.rot += (tilt - st.rot) * 0.12;
      paint();
      const moving = Math.abs(st.vx) + Math.abs(st.vy) > 0.01 || Math.abs(tilt - st.rot) > 0.05;
      const outside = lim && (st.x < lim.minX - 0.5 || st.x > lim.maxX + 0.5 || st.y < lim.minY - 0.5 || st.y > lim.maxY + 0.5);
      if (!reduce && (moving || outside)) st.raf = requestAnimationFrame(step);
      else { st.rot = tilt; paint(); }
    };
    st.raf = requestAnimationFrame(step);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (!enabled || e.button !== 0) return;
    const st = s.current;
    if (st.dragging) return; // ignore a second finger
    cancelAnimationFrame(st.raf);
    st.dragging = true;
    st.moved = false;
    st.startX = e.clientX - st.x;
    st.startY = e.clientY - st.y;
    st.px = e.clientX;
    st.py = e.clientY;
    st.t = performance.now();
    st.vx = st.vy = 0;
    el.current!.style.zIndex = String(++topZ);
    el.current!.classList.add("is-held");
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const st = s.current;
    if (!st.dragging) return;
    const nx = e.clientX - st.startX;
    const ny = e.clientY - st.startY;
    if (!st.moved && Math.hypot(nx - st.x, ny - st.y) < 4) return;
    if (!st.moved) {
      st.moved = true;
      el.current!.setPointerCapture(e.pointerId);
    }
    const now = performance.now();
    const dt = Math.max(1, now - st.t);
    st.vx = st.vx * 0.6 + ((e.clientX - st.px) / dt) * 0.4;
    st.vy = st.vy * 0.6 + ((e.clientY - st.py) / dt) * 0.4;
    st.px = e.clientX;
    st.py = e.clientY;
    st.t = now;
    const lim = limits();
    let x = nx, y = ny;
    if (lim) {
      // Past the edge it still moves, with growing resistance.
      const damp = (v: number, lo: number, hi: number) =>
        v < lo ? lo - Math.sqrt(lo - v) * 4 : v > hi ? hi + Math.sqrt(v - hi) * 4 : v;
      x = damp(x, lim.minX, lim.maxX);
      y = damp(y, lim.minY, lim.maxY);
    }
    st.x = x;
    st.y = y;
    st.rot = tilt + Math.max(-8, Math.min(8, st.vx * 6));
    paint(true);
  };

  const end = (e: React.PointerEvent) => {
    const st = s.current;
    if (!st.dragging) return;
    st.dragging = false;
    el.current!.classList.remove("is-held");
    if (el.current!.hasPointerCapture(e.pointerId)) el.current!.releasePointerCapture(e.pointerId);
    if (performance.now() - st.t > 80) st.vx = st.vy = 0; // held still before letting go
    settle();
  };

  return (
    <div
      ref={el}
      className={`obj ${enabled ? "is-draggable " : ""}${className}`}
      style={{ ...style, ["--tilt" as string]: `${tilt}deg` }}
      aria-label={label}
      role="group"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={end}
      onPointerCancel={end}
      onClickCapture={(e) => {
        if (s.current.moved) {
          e.preventDefault();
          e.stopPropagation();
          s.current.moved = false;
        }
      }}
    >
      {children}
    </div>
  );
};

export default Draggable;
