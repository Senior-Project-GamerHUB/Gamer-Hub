import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const PieApexChart = ({ completionStatusData }) => {
  const [chartData, setChartData] = useState({
    series: [0, 0, 0, 0, 0],
    options: {
      chart: {
        type: 'pie',
      },
      labels: ['Tried It', 'Hooked', 'Halfway', 'Finished Most', 'Conquered It'],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      }],
      colors: ['#FF0000', '#FFA500', '#00FF00', '#0000FF', '#800080'],
      legend: {
        labels: {
          colors: '#fff', // Set legend text color to white
        },
      },
    },
  });

  useEffect(() => {
    updateChartData();
  }, [completionStatusData]);

  const updateChartData = () => {
    setChartData(prevChartData => {
      const submissionCounts = completionStatusData.reduce((counts, status) => {
        counts[status] = (counts[status] || 0) + 1;
        return counts;
      }, {});

      // Ensure that the series has values for all possible labels
      const updatedSeries = ['Tried It', 'Hooked', 'Halfway', 'Finished Most', 'Conquered It'].map(label => {
        const count = submissionCounts[label] || 0;
        return count;
      });

      return {
        ...prevChartData,
        series: updatedSeries,
      };
    });
  };

  return (
    <div id="chart">
      <ReactApexChart options={chartData.options} series={chartData.series} type="pie" width={380} />
    </div>
  );
};

export default PieApexChart;