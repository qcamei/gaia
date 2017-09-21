/**
 * Created by txl-pc on 2017/8/10.
 */
window.G_VAR = {}
G_VAR.echarts = {
  // openAccountPreEcharts: null,
  // openAccountTotalEcharts: null
}
var openAccountPreEcharts = document.querySelector('#openAccountPre')
var openAccountTotalEcharts = document.querySelector('#openAccountTotal')

// 开户-当期
var openAccountPreOption = {
  // legend_data: ['医院(家)', '项目和集团客户(家)'],
  // x_data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子", "其他"],
  // y_data:[
  //   {
  //     type:'bar',
  //     key: 'hospital',
  //     name:'医院(家)',
  //     data:[5, 20, 36, 10, 10, 20, 61],
  //     color:'rgb(85,137,209)',
  //   },
  //   {
  //     type:'bar',
  //     key:'client',
  //     name:'项目和集团客户(家)',
  //     data:[15, 26, 26, 18, 70, 50, 15],
  //     color:'rgb(118,213,185)',
  //   }
  // ],
  half: true
}

// 开户-当期
var openAccountTotalOption = {
  // legend_data: ['医院(家)', '项目和集团客户(家)'],
  // x_data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子", "其他"],
  // y_data:[
  //   {
  //     type:'bar',
  //     key: 'hospital',
  //     name:'医院(家)',
  //     data:[5, 20, 36, 10, 10, 20, 61],
  //     color:'rgb(85,137,209)'
  //   },
  //   {
  //     type:'bar',
  //     key:'client',
  //     name:'项目和集团客户(家)',
  //     data:[15, 26, 26, 18, 70, 50, 15],
  //     color:'rgb(118,213,185)'
  //   }
  // ],
  half: true
}

function getThreeBar(data){
  $.ajax({
    url:'http://10.0.1.115:8888/open/option',
    type: 'GET',
    data:data?data:'',
    dataType: 'jsonp',
    contentType:'application/json',
    jsonpCallback: 'openOption',
    success: function(json) {
      var json = json.data
      openAccountPreOption.legend_data = json.openAccountPreOption.legend_data
      openAccountPreOption.x_data = json.openAccountPreOption.x_data
      openAccountPreOption.y_data = json.openAccountPreOption.y_data

      openAccountTotalOption.legend_data = json.openAccountPreOption.legend_data
      openAccountTotalOption.x_data = json.openAccountPreOption.x_data
      openAccountTotalOption.y_data = json.openAccountPreOption.y_data

      threeBar(openAccountPreEcharts, openAccountPreOption, G_VAR.echarts, 'openAccountPreEcharts')
      threeBar(openAccountTotalEcharts, openAccountTotalOption, G_VAR.echarts, 'openAccountTotalEcharts')
    }
  })
}
getThreeBar()


window.onresize = function () {
  for (var i in G_VAR.echarts) {
    if (G_VAR.echarts[i]) {
      G_VAR.echarts[i].resize()
    }
  }
}