"use client";

import { useEffect, useRef, useState } from "react";
import { TRACK, orbs, platforms } from "./content";

const TRUNK = 300;
const HUB = 250;

// A platform's pipe: out from the trunk, round the corner, up to the underside,
// with a second prong bracketed off the riser.
function pipe(x: number, y: number) {
  const dir = x < TRUNK ? -1 : 1;
  const joint = y + 70;
  const outer = x + dir * 52;
  return [
    `M${TRUNK} ${joint} H${x - dir * 20} Q${x} ${joint} ${x} ${joint - 20} V${y + 20}`,
    `M${x} ${joint - 32} H${outer - dir * 10} Q${outer} ${joint - 32} ${outer} ${joint - 42} V${y + 20}`,
  ];
}

const pipes = [
  ...platforms.flatMap((p) => pipe(p.x, p.y)),
  ...orbs.map((o) => `M${TRUNK} ${o.y} H${o.x}`),
];

const joints = [...platforms.map((p) => p.y + 70), ...orbs.map((o) => o.y)];

// Decoration: x, y, size.
const beads = [
  [338, 446, 15],
  [252, 706, 17],
  [346, 752, 13],
  [96, 520, 11],
];

const stars = [
  [92, 452, 1.5],
  [140, 418, 0.8],
  [118, 500, 1.1],
  [520, 560, 1],
  [552, 392, 0.7],
  [60, 720, 0.9],
];

const STAR = "M0 -10Q1.5 -1.5 10 0Q1.5 1.5 0 10Q-1.5 1.5 -10 0Q-1.5 -1.5 0 -10Z";

// A fixed scatter of far stars: seeded, so the server and the browser agree on it.
const field = (() => {
  let seed = 7;
  const next = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  return Array.from({ length: 150 }, (_, i) => ({
    x: Math.round(next() * 16000) / 10,
    y: Math.round(next() * 10000) / 10,
    r: Math.round((0.5 + next() * 1.3) * 10) / 10,
    i: i % 7,
  }));
})();

// Everything behind the tree: nebulae, stars, planets cut from the same glass as
// the platforms, and the world the trunk stands on.
function Space() {
  return (
    <div className="space" aria-hidden="true">
      <div className="nebula n1" />
      <div className="nebula n2" />
      <div className="nebula n3" />
      <svg className="field" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
        {field.map((star, i) => (
          <circle
            key={i}
            className="twinkle"
            cx={star.x}
            cy={star.y}
            r={star.r}
            fill={star.i % 3 ? "#fff" : "#a8f0dc"}
            style={{ "--i": star.i } as React.CSSProperties}
          />
        ))}
      </svg>
      <span className="shoot s1" />
      <span className="shoot s2" />
      <span className="shoot s3" />
      <div className="planet ringed">
        <i className="ring" />
        <i className="body" />
        <i className="ring front" />
      </div>
      <div className="planet warm">
        <i className="body" />
        <i className="moon" />
      </div>
      <div className="planet small">
        <i className="body" />
      </div>
      <div className="planet tiny">
        <i className="body" />
      </div>
      <div className="globe" />
    </div>
  );
}

function Clock() {
  const ref = useRef<SVGSVGElement>(null);

  // The hands start at the visitor's own time; CSS carries them on from there.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const now = new Date();
    const s = now.getSeconds() + now.getMilliseconds() / 1000;
    const m = now.getMinutes() + s / 60;
    const h = (now.getHours() % 12) + m / 60;
    el.style.setProperty("--s", `${s * 6}deg`);
    el.style.setProperty("--m", `${m * 6}deg`);
    el.style.setProperty("--h", `${h * 30}deg`);
    el.dataset.ready = "";
  }, []);

  return (
    <div className="clock" aria-hidden="true">
      <div className="dial" />
      <svg ref={ref} className="hands" viewBox="-240 -240 480 480">
        <circle r="236" fill="none" stroke="#f6c58a" strokeWidth="1" opacity="0.35" />
        <g stroke="#f6d7a8" strokeLinecap="round" opacity="0.55">
          {Array.from({ length: 12 }, (_, i) => (
            <path key={i} d="M0 -214V-200" strokeWidth={i % 3 ? 1.5 : 3} transform={`rotate(${i * 30})`} />
          ))}
        </g>
        <path className="hand sweep" d="M0 0L0 -226A226 226 0 0 0 -195.7 -113Z" fill="#081a44" opacity="0.5" />
        <path className="hand hour" d="M0 0V-112" stroke="#ffd9a0" strokeWidth="6" strokeLinecap="round" />
        <path className="hand minute" d="M0 0V-186" stroke="#9af0c0" strokeWidth="3" strokeLinecap="round" />
        <path className="hand second" d="M0 24V-208" stroke="#ff6b5e" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export function Scene({ panels }: { panels: Record<string, React.ReactNode> }) {
  const world = useRef<HTMLElement>(null);
  const sheet = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState<string | null>(null);
  const [music, setMusic] = useState(false);
  const [sparks, setSparks] = useState<{ id: number; x: number; y: number }[]>([]);
  const title = platforms.find((p) => p.id === open)?.title;

  const show = (id: string) => {
    setOpen(id);
    sheet.current?.showModal();
  };

  // The layers lean a little toward the pointer, the far ones least.
  const lean = (e: React.PointerEvent) => {
    const el = world.current;
    if (!el || e.pointerType === "touch") return;
    el.style.setProperty("--px", String((e.clientX / el.clientWidth) * 2 - 1));
    el.style.setProperty("--py", String((e.clientY / el.clientHeight) * 2 - 1));
  };

  // A click on open sky leaves a spark behind.
  const spark = (e: React.PointerEvent) => {
    if ((e.target as Element).closest("button, a, dialog")) return;
    setSparks((list) => [...list.slice(-11), { id: e.timeStamp, x: e.clientX, y: e.clientY }]);
  };

  return (
    <main ref={world} className="world" onPointerMove={lean} onPointerDown={spark}>
      <Space />

      <header className="title">
        <h1>Owen Skippen</h1>
        <p>Software developer and CS student in Vancouver, BC.</p>
        <p className="hint">Platforms open the site. Orbs are links.</p>
      </header>

      <div className="scene">
        <Clock />

        <div className="rig">
          <svg className="tree" viewBox="0 0 600 900" aria-hidden="true">
            <defs>
              <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#4fc3d6" />
                <stop offset="0.5" stopColor="#a8d9c6" />
                <stop offset="1" stopColor="#f6b38a" />
              </linearGradient>
              <linearGradient id="bark" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#e3564f" />
                <stop offset="0.45" stopColor="#ff8a78" />
                <stop offset="1" stopColor="#ec6258" />
              </linearGradient>
            </defs>

            <g fill="none" strokeLinecap="round">
              {pipes.map((d, i) => (
                <g key={d} className="pipe" style={{ "--i": i } as React.CSSProperties}>
                  <path d={d} pathLength={1} stroke="#c9423f" strokeWidth="13" />
                  <path d={d} pathLength={1} stroke="#f4776a" strokeWidth="9.5" />
                  <path d={d} pathLength={1} stroke="#ffab98" strokeWidth="2" transform="translate(-1.5 -2.5)" />
                </g>
              ))}
            </g>

            <g className="trunk">
              <path d="M282 900L289 300Q300 288 311 300L318 900Z" fill="url(#bark)" stroke="#c9423f" strokeWidth="1.5" />
              <path
                d="M295 880V330M304 890V420M299 700V520"
                stroke="#ffb5a3"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeDasharray="18 11"
                opacity="0.6"
              />
              <g fill="none" stroke="#c9423f" strokeWidth="2" opacity="0.7">
                {joints.map((y) => (
                  <circle key={y} cx={TRUNK} cy={y} r="9" />
                ))}
              </g>
            </g>

            <g fill="url(#glass)" stroke="#1d4f63" strokeOpacity="0.55" strokeWidth="2">
              {beads.map(([x, y, r], i) => (
                <circle key={i} className="bob" cx={x} cy={y} r={r} style={{ "--i": i + 2 } as React.CSSProperties} />
              ))}
            </g>

            <g fill="#8ff0c2">
              {stars.map(([x, y, s], i) => (
                <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
                  <path className="twinkle" d={STAR} style={{ "--i": i } as React.CSSProperties} />
                </g>
              ))}
            </g>
            <path
              className="heart"
              d="M0 6C-12 -3 -6 -12 0 -5C6 -12 12 -3 0 6Z"
              fill="#ffd38a"
              transform="translate(548 640) scale(1.4)"
            />
          </svg>

          <nav aria-label="Sections">
            {platforms.map((p, i) => (
              <button
                key={p.id}
                type="button"
                className="pill"
                aria-haspopup="dialog"
                style={
                  { "--i": i, left: `${(p.x / 600) * 100}%`, top: `${(p.y / 900) * 100}%` } as React.CSSProperties
                }
                onClick={() => show(p.id)}
              >
                {p.title}
              </button>
            ))}
          </nav>

          <nav aria-label="Links">
            {orbs.map((o, i) => (
              <a
                key={o.id}
                className="orb"
                href={o.href}
                target="_blank"
                rel="noopener noreferrer"
                style={
                  { "--i": i + 5, left: `${(o.x / 600) * 100}%`, top: `${(o.y / 900) * 100}%` } as React.CSSProperties
                }
              >
                {o.title}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="orb hub"
            aria-pressed={music}
            aria-label={music ? "Stop the music" : "Play music"}
            title={music ? `Playing ${TRACK.title} · ${TRACK.by}` : "Play music"}
            style={{ "--i": 8, left: "50%", top: `${(HUB / 900) * 100}%` } as React.CSSProperties}
            onClick={() => setMusic((on) => !on)}
          >
            {music ? (
              <span className="eq">
                <i />
                <i />
                <i />
                <i />
              </span>
            ) : (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M9 18V6l10-2v12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" />
                <circle cx="6.5" cy="18" r="2.8" fill="currentColor" />
                <circle cx="16.5" cy="16" r="2.8" fill="currentColor" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {music && (
        <iframe
          className="radio"
          title={`${TRACK.title} by ${TRACK.by}`}
          src={`https://www.youtube-nocookie.com/embed/${TRACK.id}?autoplay=1&loop=1&playlist=${TRACK.id}&playsinline=1&controls=0`}
          allow="autoplay; encrypted-media"
          tabIndex={-1}
          aria-hidden="true"
        />
      )}

      {sparks.map((s) => (
        <svg
          key={s.id}
          className="spark"
          viewBox="-12 -12 24 24"
          aria-hidden="true"
          style={{ left: s.x, top: s.y }}
          onAnimationEnd={() => setSparks((list) => list.filter((item) => item.id !== s.id))}
        >
          <path d={STAR} />
        </svg>
      ))}

      <div className="scan" aria-hidden="true" />

      <dialog
        ref={sheet}
        className="sheet"
        aria-labelledby="sheet-h"
        onClose={() => setOpen(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) e.currentTarget.close();
        }}
      >
        <div className="sheet-in">
          <header className="sheet-head">
            <h2 id="sheet-h">{title}</h2>
            <button type="button" className="sheet-x" aria-label="Close" onClick={() => sheet.current?.close()}>
              <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
                <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </header>
          {open && panels[open]}
        </div>
      </dialog>
    </main>
  );
}
