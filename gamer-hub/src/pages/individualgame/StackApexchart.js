import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import './StackApexChart.css'; 

const StackApexChart = ({ difficultyData }) => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: 'Easy Peasy',
        data: [0],
      },
      {
        name: 'Simple',
        data: [0],
      },
      {
        name: 'Moderate',
        data: [0],
      },
      {
        name: 'Challenging',
        data: [0],
      },
      {
        name: 'Relentless',
        data: [0],
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          distributed: true,
          dataLabels: {
            position: 'top',
            style: {
              colors: ['#fff000', '#fff', '#fff', '#fff', '#fff'],
              hover: {
                colors: ['#000', '#000', '#000', '#000', '#000'], 
              },
            },
          },
        },
      },
      xaxis: {
        categories: ['Easy Peasy', 'Simple', 'Moderate', 'Challenging', 'Relentless'],
        labels: {
          style: {
            colors: '#fff', 
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: '#fff', 
          },
        },
      },
      colors: ['#FF0000', '#FFA500', '#00FF00', '#0000FF', '#800080'],
      legend: {
        position: 'right',
        labels: {
          colors: '#fff', 
        },
      },
    },
  });

  useEffect(() => {
    updateChartData();
  }, [difficultyData]);

  const updateChartData = () => {
    setChartData((prevChartData) => {
      const difficultyCounts = difficultyData.reduce((counts, difficulty) => {
        counts[difficulty] = (counts[difficulty] || 0) + 1;
        return counts;
      }, {});

      
      const updatedSeriesData = ['Easy Peasy', 'Simple', 'Moderate', 'Challenging', 'Relentless'].map((label) => {
        const count = difficultyCounts[label] || 0;
        return count;
      });

      const updatedSeries = [{ ...prevChartData.series[0], data: updatedSeriesData }];

      return {
        ...prevChartData,
        series: updatedSeries,
      };
    });
  };

  return (
    <div id="chart">
      <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} />
    </div>
  );
};

export default StackApexChart;