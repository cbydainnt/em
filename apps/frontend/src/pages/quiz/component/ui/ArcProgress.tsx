import { Box, Tooltip, Typography } from '@mui/material';

interface ArcProgressProps {
  achievedPercent: number;
  requiredPercent: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  valueText?: string;
}

export function ArcProgress({ achievedPercent, requiredPercent, size = 210, strokeWidth = 10, label, valueText }: ArcProgressProps) {
  const padding = strokeWidth + 10;
  const viewSize = size + padding * 2;

  const cx = viewSize / 2;
  const cy = viewSize / 2;
  const radius = (size - strokeWidth) / 2;

  const START = -210;
  const TOTAL = 240;

  const clamp = (v: number) => Math.min(Math.max(v, 0), 100);
  const calcAngle = (percent: number) => START + (clamp(percent) / 100) * TOTAL;

  const polar = (angle: number, r: number) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  };

  const arcPath = (from: number, to: number) => {
    const start = polar(from, radius);
    const end = polar(to, radius);
    const largeArc = to - from > 180 ? 1 : 0;

    return `
      M ${start.x} ${start.y}
      A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}
    `;
  };

  const achievedAngle = calcAngle(achievedPercent);
  const requiredAngle = calcAngle(requiredPercent);

  const markerOffset = strokeWidth / 100;
  const markerRadius = radius + markerOffset;

  const achievedPos = polar(achievedAngle, markerRadius);
  const requiredPos = polar(requiredAngle, markerRadius);

  const isPassed = achievedPercent >= requiredPercent;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${viewSize} ${viewSize}`} style={{ display: 'block' }}>
        {/* Arc nền */}
        <path d={arcPath(START, START + TOTAL)} stroke="#E0E0E0" strokeWidth={strokeWidth} fill="none" strokeLinecap="round" />

        {/* Arc đạt được */}
        <path d={arcPath(START, achievedAngle)} stroke={isPassed ? '#4CAF50' : '#FF9800'} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" />

        {/* Marker yêu cầu */}
        <Tooltip title={`Yêu cầu: ${requiredPercent}%`}>
          <circle cx={requiredPos.x} cy={requiredPos.y} r={9} fill="#2196F3" stroke="white" strokeWidth={4} />
        </Tooltip>

        {/* Marker đạt được */}
        <Tooltip title={`Đạt được: ${Math.round(achievedPercent)}%`}>
          <circle cx={achievedPos.x} cy={achievedPos.y} r={6} fill={isPassed ? '#4CAF50' : '#FF5722'} stroke="white" strokeWidth={2} />
        </Tooltip>

        {/* Text trung tâm */}
        {label && (
          <text x={cx} y={cy - 25} textAnchor="middle" fontSize="18" fill="#666">
            {label}
          </text>
        )}

        {valueText && (
          <text x={cx} y={cy + 20} textAnchor="middle" fontSize="40" fontWeight="700" fill={isPassed ? '#2E7D32' : '#E65100'}>
            {valueText}
          </text>
        )}
      </svg>

      <Typography
        variant="body2"
        sx={{
          mt: -5,
          color: 'black',
          borderRadius: 1,
          px: 1.2,
          py: 0.5,
          fontWeight: 600,
        }}
      >
        Bạn phải đạt trên {requiredPercent}% để vượt qua bài thi!
      </Typography>
    </Box>
  );
}
