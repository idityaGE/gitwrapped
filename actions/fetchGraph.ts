import { fetchYearContributions } from "./fetchYearContributions";

function getFillColor(count: number): string {
  if (count === 0) return "#00000090";
  if (count <= 5) return "#0E4429";
  if (count <= 10) return "#006D32";
  if (count <= 20) return "#26A641";
  return "#39D353";
}

const fetchGraph = async (username: string): Promise<{ graph: string }> => {
  try {
    // Calculate dates for the last 365 days
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(today.getFullYear() - 1);
    oneYearAgo.setDate(today.getDate() + 1); // Add one day to make it inclusive

    // We need to fetch contributions for both the current and previous year
    const currentYear = today.getFullYear();
    const previousYear = oneYearAgo.getFullYear();

    // Fetch contributions for both years
    const currentYearContributions = await fetchYearContributions(
      username,
      currentYear,
    );

    const previousYearContributions = await fetchYearContributions(
      username,
      previousYear,
    );

    // Combine contributions from both years
    let allContributions = [...previousYearContributions, ...currentYearContributions];

    // Sort by date
    allContributions.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // Filter to only keep contributions from one year ago up to today
    const oneYearAgoStr = oneYearAgo.toISOString().split('T')[0];
    const lastYearContributions = allContributions.filter(
      day => day.date >= oneYearAgoStr && day.date <= todayStr
    );

    if (lastYearContributions.length === 0) return { graph: "No contributions in the last year" };

    // SVG settings
    const dayWidth = 10;
    const dayHeight = 10;
    const dayPadding = 2;
    const weekPadding = 2;
    const svgPadding = 0;

    // Get the start day of the week (0-6, where 0 is Sunday)
    const startDate = new Date(lastYearContributions[0].date);
    const startDayIndex = startDate.getDay();

    // Pad with empty days at the beginning to align with week start
    const emptyStartDays = new Array(startDayIndex).fill({ date: '', contributionCount: 0 });

    // Calculate and create complete weeks
    const allDays = [...emptyStartDays, ...lastYearContributions];

    // Group by weeks
    const weeks = [];
    let currentWeek: { date: string; contributionCount: number }[] = [];

    for (let i = 0; i < allDays.length; i++) {
      currentWeek.push(allDays[i]);

      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    // If there are remaining days in the current week, add them
    if (currentWeek.length > 0) {
      // Fill the remaining days of the week with empty cells
      while (currentWeek.length < 7) {
        currentWeek.push({ date: '', contributionCount: 0 });
      }
      weeks.push(currentWeek);
    }

    // Create SVG
    const numWeeks = weeks.length;
    const svgHeight = 7 * (dayHeight + dayPadding) + 2 * svgPadding;
    const svgWidth = numWeeks * (dayWidth + weekPadding) + 2 * svgPadding;

    const graph = `
    <svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">
      ${weeks
        .map((week, weekIndex) =>
          week
            .map((day, dayIndex) => {
              const x = svgPadding + weekIndex * (dayWidth + weekPadding);
              const y = svgPadding + dayIndex * (dayHeight + dayPadding);
              const fillColor = getFillColor(day.contributionCount);
              return `<rect x="${x}" y="${y}" width="${dayWidth}" height="${dayHeight}" fill="${fillColor}" strokeWidth="0.5" stroke="#5d5e5e20" rx="2" ry="2" />`;
            })
            .join("")
        )
        .join("")}
    </svg>
    `;

    return {
      graph,
    };
  } catch (error) {
    console.log(error);
    return {
      graph: "Error",
    };
  }
};

export default fetchGraph;
