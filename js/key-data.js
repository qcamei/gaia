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
      color:['#4d9be5','#5ce5cd','#FFD700']
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
        top: '15%',
        left: '3%',
        right: '4%',
        bottom: '14%',
        containLabel: true
      },
      xAxis : [
        {
          type : 'category',
          //data : ['报修', '接修', '预防性维护', '日常检查', '工程师巡检', '计量'],
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
          }
        }
      ],
      yAxis : {
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
      series : [
        {
          name:'维护次数',
          type:'bar',
          barWidth: '20%',
          label: {
            normal: {
              show: true,
              position: 'top',
              textStyle: {
                color: 'rgb(0, 0, 0)'
              }
            }
          }
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
      url:_ip+url,
      type: 'GET',
      data:data?data:'',
      dataType: 'jsonp',
      contentType:'application/json',
      jsonpCallback: callBack,
      success: function(json) {
        if(!json.success) return
        if(url == '/key/visit') that.callBack_1(json.data)
        if(url == '/device/in') that.callBack_2(json.data)
        if(url == '/open/column') that.callBack_3(json.data)
        if(url == '/quality/use') that.callBack_4(json.data)
      }
    })
  },
  this.callBack_1 = function (json) {
    if(!json) return
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
    if(!json) return
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
            name:data[k].name+' '+data[k].value+'人时',
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
      if(!json) return
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
              name:data[k].name+' '+data[k].value+'家',
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
          var columnHtml_img = '';
          var columnHtml_text = '';
          var H = 200;
          for(var j = 0; j < json[key].column.length; j++){
            columnData.push(json[key].column[j])
          }
          for(var x = 0; x < columnData.length; x++){
            if(columnData[x].present == 0) continue;
            var ch = columnData[x].present+'%';
            columnHtml_img += '<div class="col-area col-'+(x+1)+'" style="height: '+ch+'"></div>'
            columnHtml_text += '<div class="name text-'+(x+1)+'" style="min-height: '+ch+'">'+columnData[x].name+' '+ columnData[x].value +'家</div>'
          }
          if(columnHtml_img && columnHtml_text){
            drawline.lineTurn('lineTop_'+(m+1))
          }
          $('#account_columnar_'+ (m+1) ).html('<div class="columnar-img left">'+columnHtml_img+'</div><div class="columnar-text left">'+columnHtml_text+'</div>');
        }
      }
    },
  this.callBack_4 = function (json) {
    if(!json) return
    $('#currentUser').html(json.currentUser)
    $('#totalUser').html(json.totalUser)
    $('#currentFunction').html(json.currentFunction)
    $('#totaltFunction').html(json.totaltFunction)
    $('#currentPersent').html(json.currentPersent)
    // $('#totaltPersent').html(json.totaltPersent)
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
chatArr1 = [echarts.init(document.getElementById('visit-chart-1')),echarts.init(document.getElementById('visit-chart-2')),echarts.init(document.getElementById('visit-chart-3'))]

//录入和完善
drawCircularMap_2 = new drawCircularMap()
chartArr2 = [echarts.init(document.getElementById('entry-perfecting-chart-1')),echarts.init(document.getElementById('entry-perfecting-chart-2'))]

//开户
drawCircularMap_3 = new drawCircularMap()
chatArr3 = [echarts.init(document.getElementById('open-account-1')),echarts.init(document.getElementById('open-account-2'))]

//使用
drawCircularMap_4 = new drawCircularMap()
chatArr4 = [echarts.init(document.getElementById('use-chart'))]


function doDrawChart(data){
  drawCircularMap_1.init({
    chart:chatArr1,
    url:'/key/visit',
    data:data?data:'',
    callBack:'visit'
  }).drawChart()

  drawCircularMap_2.init({
    chart:chartArr2,
    url:'/device/in',
    data:data?data:'',
    callBack:'deviceIn'
  }).drawChart()

  drawCircularMap_3.init({
    chart:chatArr3,
    url:'/open/column',
    data:data?data:'',
    callBack:'column'
  }).drawChart()

  drawCircularMap_4.init({
    chart:chatArr4,
    url:'/quality/use',
    data:data?data:'',
    callBack:'quality'
  }).drawChart()
}

function initDrawChart (){
  //第一次加载，盘点页面上有没有日期参数
  if(!$$.getUrlParaObj()){
    doDrawChart()
    return
  }
  var beginDate = $$.getUrlParaObj()['beginDate'] || ''
  var endDate = $$.getUrlParaObj()['endDate'] || ''
  if(beginDate && endDate && beginDate != 'false' && endDate != 'false'){
    var initDate = {
      beginDate:beginDate || '',
      endDate: endDate || ''
    }
    doDrawChart(initDate)
  }else{
    doDrawChart()
  }
}
initDrawChart()

$('#date_checkout').on('click',function(){
  var data = {
    beginDate:$('#dpd1').val() || '',
    endDate: $('#dpd2').val() || ''
  }
  if(!data.beginDate && !data.endDate) return
  if(!data.beginDate && data.endDate){
    alert('请选择开始时间！')
    return
  }
  if(data.beginDate && !data.endDate){
    alert('请选择结束时间！')
    return
  }
  doDrawChart(data)
  getThreeBar(data)
})


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
    //ctx.resetTransform();
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
//drawline.lineTurn('lineTop_1')
//drawline.lineTurn('lineTop_2')


function echartsResize() {
  for (var i in G_VAR.echarts) {
    if (G_VAR.echarts[i]) {
      G_VAR.echarts[i].resize()
    }
  }
}

const export_ele = document.querySelector('#key-data-export-images')
$('#export_key').on('click', function () {
  // var export_width = export_ele.offsetWidth
  // echartsResize()
  setTimeout(function () {
    export_image(export_ele, '关键数据', 'jpg');
  }, 1000)
})


window.onresize = function () {
  echartsResize()
}






