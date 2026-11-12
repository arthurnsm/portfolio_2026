const USERNAME = "arthurnsm";

interface ContributionDay {
  date: string;
  level: number;
  count?: number;
}

function attribute(tag: string, name: string) {
  return tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1];
}

function parseCalendar(html: string): ContributionDay[] {
  const counts = new Map<string, number>();
  for (const match of html.matchAll(
    /<tool-tip\b([^>]*)>([\s\S]*?)<\/tool-tip>/g,
  )) {
    const id = attribute(match[1], "for");
    if (!id?.startsWith("contribution-day-component-")) continue;
    const text = match[2].replace(/<[^>]*>/g, "").trim();
    if (/^No contributions on /.test(text)) counts.set(id, 0);
    else {
      const amount = text.match(/^([\d,]+) contributions? on /)?.[1];
      if (amount) {
        const count = Number(amount.replaceAll(",", ""));
        if (Number.isSafeInteger(count) && count >= 0) counts.set(id, count);
      }
    }
  }

  const days = new Map<string, ContributionDay>();
  for (const match of html.matchAll(
    /<td\b[^>]*\bdata-date="\d{4}-\d{2}-\d{2}"[^>]*>/g,
  )) {
    const tag = match[0];
    const date = attribute(tag, "data-date");
    const levelText = attribute(tag, "data-level");
    const id = attribute(tag, "id");
    if (!date || !levelText || !/^[0-4]$/.test(levelText)) continue;
    const timestamp = Date.parse(`${date}T00:00:00Z`);
    if (
      !Number.isFinite(timestamp) ||
      new Date(timestamp).toISOString().slice(0, 10) !== date
    )
      continue;
    const count = id ? counts.get(id) : undefined;
    days.set(date, {
      date,
      level: Number(levelText),
      ...(count === undefined ? {} : { count }),
    });
  }
  const result = [...days.values()].sort((a, b) =>
    a.date.localeCompare(b.date),
  );
  if (result.length < 350 || result.length > 371)
    throw new Error("Unexpected contribution calendar");
  return result;
}

export async function GET() {
  try {
    const response = await fetch(
      `https://github.com/users/${USERNAME}/contributions`,
      {
        headers: {
          Accept: "text/html",
          "Accept-Language": "en-US",
          "User-Agent": "ArthurRobertoPortfolio/1.0",
        },
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(8000),
      },
    );
    if (!response.ok) throw new Error("GitHub unavailable");
    const html = await response.text();
    if (html.length > 1_000_000) throw new Error("Unexpected response size");
    const days = parseCalendar(html);
    const total = days.every((day) => day.count !== undefined)
      ? days.reduce((sum, day) => sum + (day.count ?? 0), 0)
      : undefined;
    return Response.json(
      {
        days,
        ...(total === undefined ? {} : { total }),
        from: days[0].date,
        to: days[days.length - 1].date,
        username: USERNAME,
        updatedAt: new Date().toISOString(),
      },
      {
        headers: {
          "Cache-Control":
            "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      },
    );
  } catch {
    return Response.json(
      { error: "github_unavailable", username: USERNAME },
      {
        status: 502,
        headers: { "Cache-Control": "no-store" },
      },
    );
  }
}
