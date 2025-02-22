import * as React from 'react';
import Chart from 'react-apexcharts';

const data = [
  { day: 'Monday', value: 45 },
  { day: 'Tuesday', value: 65 },
  { day: 'Wednesday', value: 85 },
  { day: 'Thursday', value: 55 },
  { day: 'Friday', value: 95 },
  { day: 'Saturday', value: 75 },
  { day: 'Sunday', value: 80 },
];

const options = {
  chart: {
    type: 'line',
  },
  xaxis: {
    categories: data.map(item => item.day),
  },
};

const series = [
  {
    name: 'Value',
    data: data.map(item => item.value),
  },
];

const OffersSent = () => {
  return <Chart options={options} series={series} type="line" height={350} />;
};

export default OffersSent;
