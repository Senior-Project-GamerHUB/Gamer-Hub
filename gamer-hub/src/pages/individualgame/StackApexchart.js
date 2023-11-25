import React from 'react';
import ReactApexCharts from 'react-apexcharts';

class StackApexChart extends React.Component {
  constructor(props) {
    super(props);

    // Define the chart options
    const options = {
      series: [{
        name: 'Easy Peasy',
        data: [44]
      }, {
        name: 'Simple',
        data: [53]
      }, {
        name: 'Intermediate',
        data: [12]
      }, {
        name: 'Challenging',
        data: [9]
      }, {
        name: 'Relentless',
        data: [25]
      }],
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        stackType: '100%'
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      stroke: {
        width: 1,
        colors: ['#fff']
      },
      title: {
      
      },
      xaxis: {
        categories: ['Difficulty'],
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + "K";
          }
        }
      },
      fill: {
        opacity: 1
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetX: 40
      }
    };

    
    this.state = {
      options: options,
    };
  }

  render() {
    return (
      <div id="chart">
        <ReactApexCharts options={this.state.options} series={this.state.options.series} type="bar" height={350} />
      </div>
    );
  }
}

export default StackApexChart;
