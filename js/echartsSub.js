/**
 * Created by txl-pc on 2017/8/9.
 */
function threeBar(element, optionData, echartObject, parameter) {
  if (!echartObject[parameter]) {
    echartObject[parameter] = echarts.init(element)
  }
  var option = {
    tooltip: {},
    legend: {
      data:optionData.legend_data,
      orient: 'vertical',
      left: '88%',
      align: 'left',
      top: 'middle',
      textStyle: {
        color: 'rgb(0,0,0)'
      }
    },
    grid: {
      left: '5%',
      top: 20,
      bottom: 25,
      right: '14%'
    },
    xAxis: {
      axisTick: false,
      axisLine: {
        lineStyle: {
          color: 'rgb(191,191,191)',
          width: 2
        }
      },
      splitLine: {
        show:true,
        lineStyle: {
          color: 'rgba(221,221,221, 0.5)',
          width: 1
        }
      },
      axisLabel: {
        margin: 4,
        textStyle: {
          color: 'rgb(0,0,0)'
        }
      },
      data: optionData.x_data
    },
    yAxis: {
      axisTick: false,
      axisLine: {
        lineStyle: {
          color: 'rgb(191,191,191)',
          width: 2
        }
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(221,221,221, 0.5)',
          width: 1
        }
      },
      axisLabel: {
        margin: 4,
        textStyle: {
          color: 'rgb(0,0,0)'
        }
      }
    },
    series: []
  };
  if (optionData.color) {
    option.color = optionData.color
  }
  var series_data = []
  var bar_json = {
    name: '销量',
    type: 'bar',
    label: {
      normal: {
        show: true,
        position: 'top',
        textStyle: {
          color: 'rgb(0, 0, 0)'
        }
      }
    },
    itemStyle: {
      normal: {
        color:'rgb(85,137,209)'
      }
    },
    barWidth: '10%',
    data: []
  }
  var line_json = {
    name: '销量',
    type: 'bar',
    symbol: 'circle',
    symbolSize: 10,
    label: {
      normal: {
        show: true,
        position: 'top',
        textStyle: {
          color: 'rgb(0, 0, 0)'
        }
      }
    },
    itemStyle: {
      normal: {
        color:'rgb(85,137,209)'
      }
    },
    data: []
  }
  if (optionData.half) {
    option.grid.top = 50
    option.grid.right = '6%'
    option.grid.left = '10%'
    option.grid.bottom = 35
    option.legend.orient = 'horizontal'
    option.legend.top = 'top'
    option.legend.left = 'center'
    bar_json.barWidth = '15%'
  }
  $.each(optionData.y_data, function (index, yData) {
    if (yData.type === 'bar') {
      var barJson = JSON.parse(JSON.stringify(bar_json))
      barJson.name = yData.name;
      barJson.type = yData.type;
      barJson.data = yData.data;
      barJson.itemStyle.normal.color = yData.color;
      series_data.push(barJson)
    }
    else if (yData.type === 'line') {
      var lineJson = JSON.parse(JSON.stringify(line_json))
      lineJson.name = yData.name;
      lineJson.type = yData.type;
      lineJson.data = yData.data;
      lineJson.zlevel = 2
      lineJson.itemStyle.normal.color = yData.color;
      if (yData.offset) {
        lineJson.label.normal.offset = yData.offset;
        // lineJson.label.normal.textStyle.color = yData.color;
      }
      series_data.push(lineJson)
    }
  })
  option.series = series_data;
  echartObject[parameter].setOption(option);
}