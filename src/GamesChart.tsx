import { useState } from "react";
import { GameEntity } from "./types"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type GamesChartProps = {
    games: GameEntity[];
   }

   const timeRanges = ['day', 'week', 'month'] as const;
   type TimeRange = typeof timeRanges[number];

   export const GameChart = ({ games }: GamesChartProps) => {
    const [timeRange, setTimeRange] = useState<TimeRange>('day');

    const filteredGames = games.filter((game) => {
        const gameDate = new Date(game.matchdate);
        const now = new Date();

        switch (timeRange) {
            case 'day': return gameDate.toDateString() === now.toDateString();
            case 'week': return  gameDate > new Date(now.setDate(now.getDate() - 7));
            case 'month': return gameDate > new Date(now.setMonth(now.getMonth()- 1));
            default: return false;
        }
    });
    const data = filteredGames.reduce(
        (acc: { date: string; count: number }[], game) => {
        const date = new Date(game.matchdate).toLocaleDateString();
        const existingEntry = acc.find((entry) => entry.date === date);
        if(existingEntry) {
            existingEntry.count += 1;
        } else {
            acc.push({date, count: 1});
        }
        return acc;
    },[])
    return (
        <div>
          <h3>Games Chart</h3>
          <div>
            {timeRanges.map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                style={{ fontWeight: timeRange === range ? "bold" : "normal" }}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </button>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      );

   }
