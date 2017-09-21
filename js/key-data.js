/**
 * Created by sunyan on 2017/8/9.
 */

setVisitOption = {
  option:function (labelLine) {

    opt = {
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      series: [
        {
          name:'访问来源',
          type:'pie',
          radius: ['45%', '55%'],
          data:[
            {
              value:335,
              name:'直达',
              labelLine: {
                normal: {
                  show: labelLine
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
  columnOption: function () {
    var option_use_chart = {
      color: ['#4d9be5'],
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
          //data : ['报修', '接修', '预防性维护', '日常检查', '工程师巡检', '计量'],
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
          barWidth: '20%',
         // data:[10, 52, 200, 334, 390, 330]
        }
      ]
    };
    return option_use_chart
  },
  drawChart:function (chart,labelLine) {
    var opt = setVisitOption.option(labelLine);
    chart.setOption(opt)
  }
}

/*
*
* chart,url,labelLine,data
*
* */
function drawCircularMap (config){
  this.init = function(config){
    this.config = $.extend({
      type:"draw",
      color:['#4d9be5','#5ce5cd']
    },config);
    return this;
  };
  this.getOption = function () {
    var opt = {
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      series: [
        {
          name:'访问来源',
          type:'pie',
          radius: ['45%', '55%'],
          data:[]
        }
      ]
    };
    return opt;
  };
  this.columnOption = function () {
    var option_use_chart = {
      color: ['#4d9be5'],
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
          //data : ['报修', '接修', '预防性维护', '日常检查', '工程师巡检', '计量'],
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
          barWidth: '20%',
          // data:[10, 52, 200, 334, 390, 330]
        }
      ]
    };
    return option_use_chart
  },
  this.drawChart = function () {
    var that = this;

    var url  = this.config.url;
    var data = this.config.data;
    var callBack = this.config.callBack;
    $.ajax({
      url:'http://10.0.1.115:8888'+url,
      type: 'GET',
      data:data?data:'',
      dataType: 'jsonp',
      async:false,
      contentType:'application/json',
      jsonpCallback: callBack,
      success: function(json) {
        if(url == '/key/visit') that.callBack_1(json.data)
        if(url == '/device/in') that.callBack_2(json.data)
        if(url == '/open/column') that.callBack_3(json.data)
        if(url == '/quality/use') that.callBack_4(json.data)
      }
    })
  },
  this.callBack_1 = function (json) {
    $('#visitHospital').html(json.visitHospital)
    $('#visitNum').html(json.visitNum)
    var that = this;
    var len = that.config.chart.length
    if(len){
      for(var m = 0; m < len; m++){
        var opt = this.getOption();
        var key = 'chart_'+ (m+1)
        var data = [];
        for(var n = 0; n < json[key].length; n++){
          data.push(json[key][n])
        }
        for(var k = 0; k < data.length; k++){
          opt.series[0].data.push({
            value:data[k].value,
            name:data[k].name,
            itemStyle:{
              normal:{
                color:that.config.color[k]
              }
            }
          })
        }
        that.config.chart[m].setOption(opt)
      }
    }
  },
  this.callBack_2 = function (json) {
    $('#entryCurrent').html(json.chart_1.current)
    $('#entryTotal').html(json.chart_1.total)
    $('#perfectingCurrent').html(json.chart_2.current)
    var that = this;
    var len = that.config.chart.length
    if(len){
      for(var m = 0; m < len; m++){
        var opt = this.getOption();
        var key = 'chart_'+ (m+1)
        var data = [];
        for(var n = 0; n < json[key].chart.length; n++){
          data.push(json[key].chart[n])
        }
        for(var k = 0; k < data.length; k++){
          opt.series[0].data.push({
            value:data[k].value,
            name:data[k].name,
            itemStyle:{
              normal:{
                color:that.config.color[k]
              }
            }
          })
        }
        that.config.chart[m].setOption(opt)
      }
    }
  },
  this.callBack_3 = function (json) {
      var that = this;
      var len = that.config.chart.length
      if(len){
        for(var m = 0; m < len; m++){
          //环状图
          var opt = this.getOption();
          var key = 'chart_'+ (m+1)
          var data = [];
          for(var n = 0; n < json[key].ring.length; n++){
            data.push(json[key].ring[n])
          }
          for(var k = 0; k < data.length; k++){
            opt.series[0].data.push({
              value:data[k].value,
              name:data[k].name,
              labelLine: {
                normal: {
                  show: false
                }
              },
              itemStyle:{
                normal:{
                  color:that.config.color[k]
                }
              }
            })
          }
          that.config.chart[m].setOption(opt)

          //柱状图
          var columnData = [];
          var columnHtml = '';
          var H = 200;
          for(var j = 0; j < json[key].column.length; j++){
            columnData.push(json[key].column[j])
          }
          for(var x = 0; x < columnData.length; x++){
            if(columnData[x].present == 0) continue;
            var ch = columnData[x].present+'%';
            columnHtml += '<div class="col col-'+(x+1)+' clear" style="height: '+ch+'">';
              columnHtml += '<div class="col-area left"></div>'
              columnHtml += '<div class="name left">'+columnData[x].name+' '+ columnData[x].value +'家</div></div>'
          }
          $('#account_columnar_'+ (m+1) ).html(columnHtml);
        }
      }
    },
  this.callBack_4 = function (json) {
    $('#currentUser').html(json.currentUser)
    $('#totalUser').html(json.totalUser)
    $('#currentFunction').html(json.currentFunction)
    $('#totaltFunction').html(json.totaltFunction)
    $('#currentPersent').html(json.currentPersent)
    $('#totaltPersent').html(json.totaltPersent)
    var that = this;
    var len = that.config.chart.length
    if(len){
      for(var m = 0; m < len; m++){
        var opt = this.columnOption();
        opt.xAxis[0].data = json.x
        opt.series[0].data = json.y
        that.config.chart[m].setOption(opt)
      }
    }
  }
}


//拜访
drawCircularMap_1 = new drawCircularMap()
drawCircularMap_1.init({
  chart:[echarts.init(document.getElementById('visit-chart-1')),echarts.init(document.getElementById('visit-chart-2')),echarts.init(document.getElementById('visit-chart-3'))],
  url:'/key/visit',
  callBack:'visit'
}).drawChart()


//录入和完善
drawCircularMap_2 = new drawCircularMap()
drawCircularMap_2.init({
  chart:[echarts.init(document.getElementById('entry-perfecting-chart-1')),echarts.init(document.getElementById('entry-perfecting-chart-2'))],
  url:'/device/in',
  callBack:'device'
}).drawChart()

//开户
drawCircularMap_3 = new drawCircularMap()
drawCircularMap_3.init({
  chart:[echarts.init(document.getElementById('open-account-1')),echarts.init(document.getElementById('open-account-2'))],
  url:'/open/column',
  callBack:'column'
}).drawChart()

//使用
drawCircularMap_4 = new drawCircularMap()
drawCircularMap_4.init({
  chart:[echarts.init(document.getElementById('use-chart'))],
  url:'/quality/use',
  callBack:'quality'
}).drawChart()

//开户的折线
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



//使用
var chartUseChart = echarts.init(document.getElementById('use-chart'));
function getUseChart(){
  var option_use_chart = {
    color: ['#4d9be5'],
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
        barWidth: '20%',
        data:[10, 52, 200, 334, 390, 330]
      }
    ]
  };
  $.ajax({
    url:'http://10.0.1.115:8888/quality/use',
    type: 'GET',
    dataType: 'jsonp',
    async:false,
    contentType:'application/json',
    jsonpCallback: 'quality',
    success: function(json) {
      console.log(json)
      chartUseChart.setOption(option_use_chart)
    }
  })

}
//getUseChart()





