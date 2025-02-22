import { Paper, Typography } from "@mui/material";

interface StatCardProps {
  label: string;
  count: number;
}
const StatCard: React.FC<StatCardProps> = ({ label, count }) => {
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="subtitle2" fontWeight={"bold"}>
        {label}
      </Typography>
      <Typography variant="h3" fontWeight={"bold"}>
        {count}
      </Typography>
    </Paper>
  );
};

export default StatCard;
