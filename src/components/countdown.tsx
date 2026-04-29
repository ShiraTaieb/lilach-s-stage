import { useEffect, useState } from "react";

function diff(target: Date) {
  const now = new Date().getTime();
  const t = target.getTime() - now;
  if (t <= 0) return { d: 0, h: 0, m: 0, s: 0, done: true };
  return {
    d: Math.floor(t / 86400000),
    h: Math.floor((t / 3600000) % 24),
    m: Math.floor((t / 60000) % 60),
    s: Math.floor((t / 1000) % 60),
    done: false,
  };
}

export function Countdown({ date }: { date: string }) {
  const target = new Date(date);
  const [t, setT] = useState(diff(target));
  useEffect(() => {
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [date]);

  if (t.done) {
    return <div className="text-center text-sm text-primary">המופע התקיים</div>;
  }

  const cells = [
    { label: "ימים", val: t.d },
    { label: "שעות", val: t.h },
    { label: "דק׳", val: t.m },
    { label: "שנ׳", val: t.s },
  ];

  return (
    <div className="grid grid-cols-4 gap-2" dir="ltr">
      {cells.map((c) => (
        <div key={c.label} className="rounded-xl border border-primary/20 bg-background/40 p-2 text-center">
          <div className="font-display text-2xl font-bold text-gradient-gold tabular-nums">
            {String(c.val).padStart(2, "0")}
          </div>
          <div className="mt-0.5 text-[10px] uppercase tracking-widest text-muted-foreground">
            {c.label}
          </div>
        </div>
      ))}
    </div>
  );
}
