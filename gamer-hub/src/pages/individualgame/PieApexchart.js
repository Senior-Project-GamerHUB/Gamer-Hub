import React from 'react';
import ReactApexChart from 'react-apexcharts';

class PieApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    
      series: [44, 55, 13, 43, 22],
      options: {
        chart: {
          type: 'pie',
        },
        labels: ['Tried', 'Hooked', 'Halfway', 'Finished Most', 'Conquered It'],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      },
    };
  }

  // async componentDidMount() {
  //   const { gameID } = this.props; // Assuming gameID is passed as a prop
  //   if (!gameID) return;

  //   try {
  //     const response = await axios.get(`/getReviewsForGame=${gameID}`);
  //     const compStatusData = response.data;

  //     // Assuming comp_status values are in an array in the response
  //     const series = compStatusData.map((compStatus) => compStatus.value);

  //     this.setState({ series });
  //   } catch (error) {
  //     console.error('Error fetching comp_status:', error);
  //   }
  // }

  render() {
    return (
      

<div id="chart">
<ReactApexChart options={this.state.options} series={this.state.series} type="pie" width={380} />
</div>
    );
  }
}

export default PieApexChart;