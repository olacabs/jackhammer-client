import React, {Component} from 'react'
import Highcharts from 'highcharts'
import {connect} from 'react-redux'
class TrendChart extends Component {
  componentWillReceiveProps(nextProps) {
    const dashboardData = nextProps.dashboardData;
    if (dashboardData) {
      const vulnerabilityTrend = dashboardData.vulnerabilityTrend;
      var vulnerabilityTrendResult = vulnerabilityTrend.vulnerabilityTrendResult;
      var criticalCount = [];
      var highCount = [];
      var mediumCount = [];
      var lowCount = [];
      var infoCount = [];
      var monthList = [
        "JANUARY",
        "FEBRUARY",
        "MARCH",
        "APRIL",
        "MAY",
        "JUNE",
        "JULY",
        "AUGUST",
        "SEPTEMBER",
        "OCTOBER",
        "NOVEMBER",
        "DECEMBER",
      ];
      var date = new Date();
      var lastSixMonths = []
      for (var i = 5; i >= 0; i--) {
        var month = date.getMonth() - i;
        if (month < 0) {
          month = 12 + month;
        }
        lastSixMonths.push(monthList[month]);
      }
      lastSixMonths
        .map(function(eachMonth) {
          criticalCount.push(vulnerabilityTrendResult[eachMonth]['Critical']);
          highCount.push(vulnerabilityTrendResult[eachMonth]['High']);
          mediumCount.push(vulnerabilityTrendResult[eachMonth]['Medium']);
          lowCount.push(vulnerabilityTrendResult[eachMonth]['Low']);
          infoCount.push(vulnerabilityTrendResult[eachMonth]['Info']);
        });
      Highcharts.chart('lineChart', {
        colors: [
          'rgb(255, 77, 77)',
          'rgb(255, 112, 77)',
          'rgb(247, 163, 92)',
          'rgb(124, 181, 236)',
          'rgb(144, 237, 125)',
        ],
        title: {
          text: 'Vulnerability Trend'
        },
        yAxis: {
          title: {
            text: 'Number of Vulnerabilities'
          }
        },
        xAxis: [
          {
            title: {
              text: 'Month'
            },
            categories: lastSixMonths,
          }
        ],
        legend: {
          x: 0,
          verticalAlign: 'top',
          align: 'right',
          y: 50,
          floating: true,
          backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
          borderColor: '#CCC',
          borderWidth: 1,
          shadow: false,
        },
        series: [
          {
            name: 'Critical',
            data: criticalCount,
          }, {
            name: 'High',
            data: highCount
          }, {
            name: 'Medium',
            data: mediumCount
          }, {
            name: 'Low',
            data: lowCount
          }, {
            name: 'Info',
            data: infoCount
          },
        ],
        credits: {
          enabled: false
        },
        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 500
              },
              chartOptions: {
                legend: {
                  layout: 'horizontal',
                  align: 'center',
                  verticalAlign: 'bottom',
                }
              },
            }
          ]
        }
      });
    }
  }
  render() {
    return (
      <div id="lineChart"></div>
    );
  }
}

const mapStateToProps = (state) => ({dashboardData: state.dashboard.dashboardData});
export default connect(mapStateToProps)(TrendChart);