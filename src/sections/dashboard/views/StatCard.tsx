import { Paper, Typography } from "@mui/material";

interface StatCardProps {
  label: string;
  count: number;
}
const formatCount = (count: number) => {
  return count >= 1000
    ? `${(count / 1000).toFixed(1).replace(/\.0$/, "")}k`
    : count;
};
const StatCard: React.FC<StatCardProps> = ({ label, count }) => {
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="subtitle2" fontWeight={"bold"}>
        {label}
      </Typography>
      <Typography variant="h3" fontWeight={"bold"}>
        {formatCount(count)}
      </Typography>
    </Paper>
  );
};

export default StatCard;
