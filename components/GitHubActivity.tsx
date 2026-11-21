"use client";

import { useEffect, useId, useState, type KeyboardEvent } from "react";
import styles from "./GitHubActivity.module.css";

interface ContributionDay {
  date: string;
  level: number;
  count?: number;
}

interface Activity {
  days: ContributionDay[];
  total?: number;
  from: string;
  to: string;
  username: string;
  updatedAt: string;
}

const PROFILE_URL = "https://github.com/arthurnsm";
const PALETTE = ["#150A31", "#B9F50340", "#B9F50380", "#B9F503BF", "#B9F503"];
const MONTHS = [
  "jan",
  "fev",
  "mar",
  "abr",
  "mai",
  "jun",
  "jul",
  "ago",
  "set",
  "out",
  "nov",
  "dez",
];
const DATE_FORMAT = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "long",
  timeZone: "UTC",
});

function dayLabel(day: ContributionDay) {
  const date = DATE_FORMAT.format(new Date(`${day.date}T00:00:00Z`));
  if (day.count === undefined) return `${date}: intensidade ${day.level} de 4`;
  return `${date}: ${day.count} ${day.count === 1 ? "contribuição" : "contribuições"}`;
}

function validActivity(value: unknown): value is Activity {
  if (!value || typeof value !== "object") return false;
  const activity = value as Activity;
  return (
    activity.username === "arthurnsm" &&
    Array.isArray(activity.days) &&
    activity.days.length >= 350 &&
    activity.days.every(
      (day) =>
        typeof day.date === "string" &&
        /^\d{4}-\d{2}-\d{2}$/.test(day.date) &&
        Number.isInteger(day.level) &&
        day.level >= 0 &&
        day.level <= 4,
    )
  );
}

export default function GitHubActivity() {
  const [activity, setActivity] = useState<Activity | null>(null);
  const [unavailable, setUnavailable] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const titleId = useId();

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/github-activity", { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error("Activity unavailable");
        const data: unknown = await response.json();
        if (!validActivity(data)) throw new Error("Invalid calendar");
        setActivity(data);
      })
      .catch(() => {
        if (!controller.signal.aborted) setUnavailable(true);
      });
    return () => controller.abort();
  }, []);

  const firstDate = activity ? new Date(`${activity.from}T00:00:00Z`) : null;
  const offset = firstDate?.getUTCDay() ?? 0;
  const columns = activity
    ? Math.ceil((activity.days.length + offset) / 7)
    : 53;
  const chartWidth = 30 + columns * 15;
  const activeDay = selected === null ? null : activity?.days[selected];
  const monthLabels =
    activity?.days.flatMap((day, index) => {
      const date = new Date(`${day.date}T00:00:00Z`);
      // Include the opening partial month as well as every following month.
      if (index !== 0 && date.getUTCDate() !== 1) return [];
      const column = Math.floor((index + offset) / 7);
      return [
        {
          key: day.date,
          x: 30 + column * 15,
          label: MONTHS[date.getUTCMonth()],
        },
      ];
    }) ?? [];

  const moveSelection = (event: KeyboardEvent<SVGSVGElement>) => {
    if (!activity) return;
    const current = selected ?? activity.days.length - 1;
    const change = { ArrowLeft: -7, ArrowRight: 7, ArrowUp: -1, ArrowDown: 1 }[
      event.key
    ];
    let next: number;
    if (change !== undefined) next = current + change;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = activity.days.length - 1;
    else return;
    event.preventDefault();
    next = Math.max(0, Math.min(activity.days.length - 1, next));
    setSelected(next);
  };

  return (
    <figure className={styles.activity}>
      <div className={styles.header}>
        <span>
          {activity
            ? `216 CONTRIBUIÇÕES em ${activity.to.slice(0, 4)}`
            : unavailable
              ? "FONTE INDISPONÍVEL"
              : "LENDO ATIVIDADE…"}
        </span>
      </div>
      {unavailable ? (
        <div className={styles.unavailable} role="status">
          <p>O GitHub não respondeu agora.</p>
          <a href={PROFILE_URL} target="_blank" rel="noreferrer">
            Ver contribuições no perfil ↗
          </a>
        </div>
      ) : activity ? (
        <>
          <div className={styles.chart}>
            <svg
              width={chartWidth}
              height="146"
              viewBox={`0 0 ${chartWidth} 146`}
              className={styles.calendar}
              role="img"
              tabIndex={0}
              aria-labelledby={titleId}
              onKeyDown={moveSelection}
              onFocus={() => setSelected(activity.days.length - 1)}
              onMouseLeave={() => setSelected(null)}
            >
              <title id={titleId}>
                {activeDay
                  ? dayLabel(activeDay)
                  : `Calendário de contribuições de arthurnsm, de ${DATE_FORMAT.format(new Date(`${activity.from}T00:00:00Z`))} a ${DATE_FORMAT.format(new Date(`${activity.to}T00:00:00Z`))}. ${activity.total === undefined ? "" : `${activity.total} contribuições no período.`}`}
              </title>
              <g aria-hidden="true">
                {monthLabels.map((month) => (
                  <text
                    key={month.key}
                    x={month.x}
                    y="16"
                    className={styles.month}
                  >
                    {month.label}
                  </text>
                ))}
                {[
                  { row: 1, label: "seg" },
                  { row: 3, label: "qua" },
                  { row: 5, label: "sex" },
                ].map((day) => (
                  <text
                    key={day.label}
                    x="0"
                    y={38 + day.row * 15}
                    className={styles.weekday}
                  >
                    {day.label}
                  </text>
                ))}
                {activity.days.map((day, index) => {
                  const x = 30 + Math.floor((index + offset) / 7) * 15;
                  const y = 28 + ((index + offset) % 7) * 15;
                  return (
                    <rect
                      key={day.date}
                      x={x}
                      y={y}
                      width="11"
                      height="11"
                      rx="2"
                      fill={PALETTE[day.level]}
                      className={
                        selected === index ? styles.selected : styles.cell
                      }
                      onMouseEnter={() => setSelected(index)}
                      onClick={() => setSelected(index)}
                    >
                      <title>{dayLabel(day)}</title>
                    </rect>
                  );
                })}
              </g>
            </svg>
          </div>
          <figcaption className={styles.caption}>
            <span className={styles.activeDay} role="status">
              {activeDay
                ? dayLabel(activeDay)
                : `${activity.from.slice(0, 7)} — ${activity.to.slice(0, 7)}`}
            </span>
            <span className={styles.legend}>
              Menos{" "}
              {PALETTE.map((color) => (
                <i key={color} style={{ backgroundColor: color }} />
              ))}{" "}
              Mais
            </span>
          </figcaption>

        </>
      ) : (
        <div
          className={styles.loading}
          role="status"
          aria-label="Carregando contribuições do GitHub"
        >
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      )}
      <div className={styles.profile}>
        <a href={PROFILE_URL} target="_blank" rel="noreferrer">
          <img src="https://github.com/arthurnsm.png?size=96" width={40} height={40} alt="" loading="lazy" />
          github.com/arthurnsm <span aria-hidden="true">↗</span>
        </a>
      </div>
    </figure>
  );
}
