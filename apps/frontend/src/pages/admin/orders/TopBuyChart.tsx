import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Paper, Typography } from '@mui/material';
import { useTheme, useMediaQuery } from '@mui/material';

interface TopBuyChartProps {
  title: string;
  data: any[];
  nameKey: string;
}

export default function TopBuyChart({ title, data, nameKey }: TopBuyChartProps) {
  const renderTick = ({ x, y, payload }: any) => {
    const words = payload.value.split(' ');
    const maxLineLength = 12;
    const maxLines = 3;

    const lines: string[] = [];
    let currentLine = '';

    for (const word of words) {
      if ((currentLine + ' ' + word).trim().length <= maxLineLength) {
        currentLine = (currentLine ? currentLine + ' ' : '') + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }

      if (lines.length === maxLines) break;
    }

    if (currentLine && lines.length < maxLines) {
      lines.push(currentLine);
    }

    const isTruncated = payload.value.length > lines.join(' ').length;

    return (
      <g transform={`translate(${x}, ${y + 10})`} pointerEvents="none">
        <title>{payload.value}</title>

        <text textAnchor="middle" fontSize={12} fill="rgb(var(--text-secondary))">
          {lines.map((line, index) => (
            <tspan key={index} x={0} dy={index === 0 ? 0 : 14}>
              {index === maxLines - 1 && isTruncated ? line + '…' : line}
            </tspan>
          ))}
        </text>
      </g>
    );
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Paper
      elevation={0}
      className="dark:bg-gray-800 shadow-lg overflow-hidden"
      sx={{
        borderRadius: 2,
        p: 2,
        mb: 4,

        // 👇 FIX viền đen khi click
        '& svg:focus': {
          outline: 'none',
        },
        '& svg *:focus': {
          outline: 'none',
        },
      }}
    >
      <Typography variant="h6" mb={2} className="text-[#0088FE] font-semibold">
        {title}
      </Typography>

      {isMobile ? (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} layout="vertical" margin={{ top: 16, left: -35, bottom: 16 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" allowDecimals={false} tick={{ fill: 'rgb(var(--text-secondary))', fontSize: 11 }} />
            <YAxis type="category" dataKey={nameKey} width={140} tick={{ fill: 'rgb(var(--text-secondary))', fontSize: 11 }} />
            <Tooltip formatter={(value) => [`${value}`, 'Số lượt mua']} />
            <Bar dataKey="paid_count" fill="#0088FE" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 16, right: 20, left: 10, bottom: 70 }}>
            <CartesianGrid stroke="rgb(var(--border-default))" strokeDasharray="3 3" />
            {/* <XAxis type="number" allowDecimals={false} domain={[0, 'dataMax']} />
          <YAxis type="category" dataKey={nameKey} width={160} tick={{ fontSize: 12 }} /> */}
            <XAxis type="category" dataKey={nameKey} interval={0} textAnchor="end" tick={renderTick} />
            <YAxis type="number" allowDecimals={false} domain={[0, 'dataMax']} tick={{ fill: 'rgb(var(--text-secondary))', fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgb(var(--dialog-bg))',
                border: '1px solid rgb(var(--border-default))',
                borderRadius: 8,
              }}
              labelStyle={{
                color: 'rgb(var(--text-primary))',
                fontSize: 12,
              }}
              itemStyle={{
                color: 'rgb(var(--text-secondary))',
                fontSize: 13,
              }}
              formatter={(value) => [`${value ?? 0}`, 'Số lượt mua']}
              labelFormatter={(label) => label}
            />
            <Bar dataKey="paid_count" fill="#0088FE" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Paper>
  );
}
