import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const DonutApexChart = ({ worthThePriceData }) => {
  const [chartData, setChartData] = useState({
    series: [0, 0, 0, 0, 0],
    options: {
      chart: {
        type: 'donut',
        width: 500, 
        height: 400, 
      },
      labels: ['Pass', 'Wait For Sale', 'Reasonable', 'Great Deal', 'Worth Every Penny'],
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
          colors: '#fff', 
        },
      },
    },
  });

  useEffect(() => {
    updateChartData();
  }, [worthThePriceData]);

  const updateChartData = () => {
    setChartData(prevChartData => {
      const categoryCounts = worthThePriceData.reduce((counts, category) => {
        counts[category] = (counts[category] || 0) + 1;
        return counts;
      }, {});

      console.log('Category Counts:', categoryCounts);

      const updatedSeries = ['Pass', 'Wait For Sale', 'Reasonable', 'Great Deal', 'Worth Every Penny'].map(category => {
        const count = categoryCounts[category] || 0;
        return count;
      });

      console.log('Updated Series:', updatedSeries);

      return {
        ...prevChartData,
        series: updatedSeries,
      };
    });
  };

  return (
    <div id="chart" style={{ width: '400px', height: '300px' }}> 
      <ReactApexChart options={chartData.options} series={chartData.series} type="donut" />
    </div>
  );
};

export default DonutApexChart;