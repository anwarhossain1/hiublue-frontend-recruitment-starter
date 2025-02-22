import { Paper, Typography } from "@mui/material";
import React from "react";
import Chart from "react-apexcharts";

interface WebsiteVisitProps {
  data: Record<string, { desktop: number; mobile: number }> | null;
}

const WebsiteVisit: React.FC<WebsiteVisitProps> = ({ data }) => {
  const chartData = data || {
    friday: { desktop: 0, mobile: 0 },
    monday: { desktop: 0, mobile: 0 },
    saturday: { desktop: 0, mobile: 0 },
    sunday: { desktop: 0, mobile: 0 },
    thursday: { desktop: 0, mobile: 0 },
    tuesday: { desktop: 0, mobile: 0 },
    wednesday: { desktop: 0, mobile: 0 },
  };

  const days = Object.keys(chartData);
  const desktopValues = days.map((day) => chartData[day].desktop);
  const mobileValues = days.map((day) => chartData[day].mobile);

  const options = {
    chart: {
      type: "bar" as "bar",
      height: 400,
      stacked: false,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: { horizontal: false, columnWidth: "50%" },
    },
    xaxis: {
      categories: days.map((day) => day.charAt(0).toUpperCase() + day.slice(1)),
    },
    colors: ["#007867", "#FFAB00"], // Blue for Desktop, Red for Mobile
    dataLabels: { enabled: false },
    legend: { position: "top" as "top" },
    yaxis: { title: { text: "Usage" } },
  };

  const series = [
    { name: "Desktop", data: desktopValues },
    { name: "Mobile", data: mobileValues },
  ];

  return (
    <Paper elevation={3} sx={{ width: "100%", overflow: "hidden" }}>
      <Typography pl={3} pt={3} variant="h6">
        Website visits
      </Typography>
      <Chart options={options} series={series} type="bar" height={400} />
    </Paper>
  );
};

export default WebsiteVisit;
