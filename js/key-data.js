/**
 * Created by sunyan on 2017/8/9.
 */

setVisitOption = {
  option:function () {
    opt = {
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      series: [
        {
          name:'访问来源',
          type:'pie',
          selectedMode: 'single',
          radius: [0, '30%'],

          label: {
            normal: {
              position: 'inner'
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },

        },
        {
          name:'访问来源',
          type:'pie',
          radius: ['40%', '55%'],

          data:[
            {
              value:335,
              name:'直达',
              labelLine: {
                normal: {
                  show: false
                }
              },
              itemStyle:{
                normal:{
                  color:'#4d9be5'
                }
              }
            },
            {
              value:30,
              name:'邮件营销',
              itemStyle:{
                normal:{
                  color:'#5ce5cd'
                }
              }
            }
          ]
        }
      ]
    };
    return opt;
  },
  drawChart:function (chart) {
    var opt = setVisitOption.option();
    chart.setOption(opt)
  }
}
setVisitOption.drawChart(echarts.init(document.getElementById('visit-chart-1')));
setVisitOption.drawChart(echarts.init(document.getElementById('visit-chart-2')));
setVisitOption.drawChart(echarts.init(document.getElementById('visit-chart-3')));

setVisitOption.drawChart(echarts.init(document.getElementById('entry-perfecting-chart-1')));
setVisitOption.drawChart(echarts.init(document.getElementById('entry-perfecting-chart-2')));


var chartUseChart = echarts.init(document.getElementById('use-chart'));
option_use_chart = {
  color: ['#3398DB'],
  tooltip : {
    trigger: 'axis',
    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
      type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis : [
    {
      type : 'category',
      data : ['报修', '接修', '预防性维护', '日常检查', '工程师巡检', '计量'],
      axisTick: {
        alignWithLabel: true
      }
    }
  ],
  yAxis : [
    {
      type : 'value'
    }
  ],
  series : [
    {
      name:'维护次数',
      type:'bar',
      barWidth: '60%',
      data:[10, 52, 200, 334, 390, 330]
    }
  ]
};
chartUseChart.setOption(option_use_chart)

var chartOpenAccount_1 = echarts.init(document.getElementById('open-account-1'));
option_open_account_1 = {
  tooltip: {
    trigger: 'item',
    formatter: "{a} <br/>{b}: {c} ({d}%)"
  },
  series: [
    {
      name:'访问来源',
      type:'pie',
      selectedMode: 'single',
      radius: [0, '30%'],

      label: {
        normal: {
          position: 'inner'
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },

    },
    {
      name:'访问来源',
      type:'pie',
      radius: ['40%', '55%'],

      data:[
        {
          value:335,
          name:'直达',
          labelLine: {
            normal: {
              show: false
            }
          },
          itemStyle:{
            normal:{
              color:'#4d9be5'
            }
          }
        },
        {value:30, name:'邮件营销'},
        {value:10, name:'其他'}
      ]
    }
  ]
};
chartOpenAccount_1.setOption(option_open_account_1)

var chartOpenAccount_2 = echarts.init(document.getElementById('open-account-2'));
option_open_account_2 = {
  tooltip: {
    trigger: 'item',
    formatter: "{a} <br/>{b}: {c} ({d}%)"
  },
  series: [
    {
      name:'访问来源',
      type:'pie',
      selectedMode: 'single',
      radius: [0, '30%'],

      label: {
        normal: {
          position: 'inner'
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },

    },
    {
      name:'访问来源',
      type:'pie',
      radius: ['40%', '55%'],

      data:[
        {
          value:335,
          name:'直达',
          labelLine: {
            normal: {
              show: false
            }
          },
          itemStyle:{
            normal:{
              color:'#4d9be5'
            }
          }
        },
        {value:30, name:'邮件营销'},
        {value:10, name:'其他'}
      ]
    }
  ]
};
chartOpenAccount_2.setOption(option_open_account_2)

drawline = {
  getW:function () {
    var w = $('#accountBox').width()*0.6;
    return w;
  },
  lineTurn:function (id) {
    var w = drawline.getW(),
        h = 260;
    var r = h*0.55;
    var startX = w*0.5,
        startY = (h-r)*0.5;
    var endX = w,
        endY = 30;
    var turnX = w -30,
        turnY = endY;
    var canvas = document.getElementById(id);
    canvas.width= w;
    canvas.height = h;
    ctx = canvas.getContext("2d");
    ctx.resetTransform();
    ctx.translate(0,0);
    ctx.beginPath();
    ctx.moveTo(startX,startY);
    ctx.lineTo(turnX,turnY);
    ctx.lineTo(endX,endY);
    ctx.strokeStyle = '#4d9be5';
    ctx.stroke();

    var startBottomY = r + startY;
    var turnBottomY = h - 30;
    var endBottomY = turnBottomY;
    ctx.beginPath();
    ctx.moveTo(startX,startBottomY);
    ctx.lineTo(turnX,turnBottomY);
    ctx.lineTo(endX,endBottomY);
    ctx.strokeStyle = '#4d9be5';
    ctx.stroke();
  }
}

drawline.lineTurn('lineTop_1')
drawline.lineTurn('lineTop_2')


