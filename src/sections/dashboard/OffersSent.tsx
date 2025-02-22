import { Paper, Typography } from "@mui/material";
import * as React from "react";
import Chart from "react-apexcharts";

type DataObject = {
  [key: string]: number;
};

type OffersSentProps = {
  data: DataObject;
};

const OffersSent: React.FC<OffersSentProps> = ({ data }) => {
  const dayOrder = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const formattedData = dayOrder.map((day) => ({
    day,
    value: data[day.toLowerCase()] || 0,
  }));

  const options = {
    chart: {
      type: "line" as "line",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: formattedData.map((item) => item.day),
    },
    colors: ["#1C252E"],

    responsive: [
      {
        breakpoint: 600,
        options: {
          chart: {
            height: 250,
            width: "100%",
          },
        },
      },
    ],
  };

  const series = [
    {
      name: "Value",
      data: formattedData.map((item) => item.value),
    },
  ];

  return (
    <Paper elevation={3} sx={{ width: "100%", overflow: "hidden" }}>
      <Typography pl={3} pt={3} variant="h6">
        Offers sent
      </Typography>
      <Chart
        options={options}
        series={series}
        type="line"
        height={400}
        width="100%"
      />
    </Paper>
  );
};

export default OffersSent;
