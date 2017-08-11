/**
 * Created by txl-pc on 2017/8/9.
 */
window.G_VAR = {}
G_VAR.echarts = {
  visitPresentEcharts: null,
  visitTotalEcharts: null,
  openAccountPresentEcharts: null,
  openAccountTotalEcharts: null,
  devicePresentEcharts: null,
  deviceTotalEcharts: null,
  manpowerPresentEcharts: null,
  manpowerTotalEcharts: null,
  repairPresentEcharts: null,
  repairTotalEcharts: null,
  controlPresentEcharts: null,
  controlTotalEcharts: null,
  documentPresentEcharts: null,
  documentTotalEcharts: null,
  userPresentEcharts: null,
  userTotalEcharts: null
}
var visitPresentEcharts = document.querySelector('.visit_present_echarts')
var visitTotalEcharts = document.querySelector('.visit_total_echarts')
var openAccountPresentEcharts = document.querySelector('.openAccount_present_echarts')
var openAccountTotalEcharts = document.querySelector('.openAccount_total_echarts')
var devicePresentEcharts = document.querySelector('.device_present_echarts')
var deviceTotalEcharts = document.querySelector('.device_total_echarts')
var manpowerPresentEcharts = document.querySelector('.manpower_present_echarts')
var manpowerTotalEcharts = document.querySelector('.manpower_total_echarts')
var repairPresentEcharts = document.querySelector('.repair_present_echarts')
var repairTotalEcharts = document.querySelector('.repair_total_echarts')
var controlPresentEcharts = document.querySelector('.control_present_echarts')
var controlTotalEcharts = document.querySelector('.control_total_echarts')
var documentPresentEcharts = document.querySelector('.document_present_echarts')
var documentTotalEcharts = document.querySelector('.document_total_echarts')
var userPresentEcharts = document.querySelector('.user_present_echarts')
var userTotalEcharts = document.querySelector('.user_total_echarts')

// 拜访-当期
var visitPresentOption = {
  legend_data: ['拜访医院(家)', '拜访次数(次)', '拜访人力(人次)'],
  x_data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子", "其他"],
  y_data:[
    {
      type:'bar',
      key: 'visit_hospital',
      name:'拜访医院(家)',
      data:[5, 20, 36, 10, 10, 20,35],
      color:'rgb(85,137,209)'
    },
    {
      type:'bar',
      name:'拜访次数(次)',
      key: 'visit_count',
      data:[15, 26, 26, 18, 70, 50, 64],
      color:'rgb(118,213,185)'
    },
    {
      type:'bar',
      name:'拜访人力(人次)',
      key: 'visit_person',
      data:[35, 86, 46, 38, 10, 34,23],
      color:'rgb(160,178,209)'
    }
  ]
}
// 拜访-累计
var visitTotalOption = {
  legend_data: ['拜访医院(家)', '拜访次数(次)', '拜访人力(人次)'],
  x_data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子", "其他"],
  y_data:[
    {
      type:'bar',
      name:'拜访医院(家)',
      key: 'visit_hospital',
      data:[5, 20, 36, 10, 10, 20, 34],
      color:'rgb(85,137,209)'
    },
    {
      type:'bar',
      name:'拜访次数(次)',
      key: 'visit_count',
      data:[15, 26, 26, 18, 70, 50, 24],
      color:'rgb(118,213,185)'
    },
    {
      type:'bar',
      name:'拜访人力(人次)',
      key: 'visit_person',
      data:[35, 86, 46, 38, 10, 34, 26],
      color:'rgb(160,178,209)'
    }
  ]
}
// 开户-当期
var openAccountPresentOption = {
  legend_data: ['项目与集团客户(家)', '医院(家)', '维修商(家)', '三甲(家)'],
  x_data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子", "其他"],
  y_data:[
    {
      type:'bar',
      key: 'client',
      name:'项目与集团客户(家)',
      data:[5, 20, 36, 10, 10, 20,35],
      color:'rgb(85,137,209)'
    },
    {
      type:'bar',
      key: 'hospital',
      name:'医院(家)',
      data:[15, 26, 26, 18, 70, 50, 64],
      color:'rgb(118,213,185)'
    },
    {
      type:'bar',
      key: 'server',
      name:'维修商(家)',
      data:[35, 86, 46, 38, 10, 34,23],
      color:'rgb(160,178,209)'
    },
    {
      type:'line',
      key: 'superfine',
      name:'三甲(家)',
      data:[5, 6, 16, 18, 10, 14,13],
      color:'rgb(246,230,82)',
      offset: [0, 4]
    }
  ]
}

// 开户-累计
var openAccountTotalOption = {
  legend_data: ['项目与集团客户(家)', '医院(家)', '维修商(家)', '三甲(家)'],
  x_data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子", "其他"],
  y_data:[
    {
      type:'bar',
      key: 'client',
      name:'项目与集团客户(家)',
      data:[5, 20, 36, 10, 10, 20,35],
      color:'rgb(85,137,209)'
    },
    {
      type:'bar',
      key: 'hospital',
      name:'医院(家)',
      data:[15, 26, 26, 18, 70, 50, 64],
      color:'rgb(118,213,185)'
    },
    {
      type:'bar',
      key: 'server',
      name:'维修商(家)',
      data:[35, 86, 46, 38, 10, 34,23],
      color:'rgb(160,178,209)'
    },
    {
      type:'line',
      key: 'superfine',
      name:'三甲(家)',
      data:[5, 6, 16, 18, 10, 14,13],
      color:'rgb(246,230,82)',
      offset: [0,4]
    }
  ]
}
// 实施-设备-当期
var devicePresentOption = {
  legend_data: ['录入设备(台)', '完善设备(台)'],
  x_data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子", "其他"],
  y_data:[
    {
      type:'bar',
      key: 'entering',
      name:'录入设备(台)',
      data:[5, 20, 36, 10, 10, 20, 61],
      color:'rgb(85,137,209)'
    },
    {
      type:'bar',
      key: 'perfect',
      name:'完善设备(台)',
      data:[15, 26, 26, 18, 70, 50, 15],
      color:'rgb(118,213,185)'
    }
  ]
}

// 实施-设备-累计
var deviceTotalOption = {
  legend_data: ['录入设备(千台)', '完善设备(千台)'],
  x_data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子", "其他"],
  y_data:[
    {
      type:'line',
      key: 'entering',
      name:'录入设备(千台)',
      data:[5, 20, 36, 10, 10, 20, 87],
      color:'rgb(90,144,220)'
    },
    {
      type:'line',
      key: 'perfect',
      name:'完善设备(千台)',
      data:[15, 25, 16, 60, 40, 70, 27],
      color:'rgb(124,223,195)'
    }
  ]
}

// 实施-人力-录入
var manpowerPresentOption = {
  legend_data: ['全职(人时)', '兼职(人时)', '医院(人时)'],
  x_data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子", "其他"],
  y_data:[
    {
      type:'bar',
      key: 'fullTime',
      name:'全职(人时)',
      data:[5, 20, 36, 10, 10, 20, 23],
      color:'rgb(85,137,209)'
    },
    {
      type:'bar',
      key: 'pluralism',
      name:'兼职(人时)',
      data:[15, 26, 26, 18, 70, 50, 35],
      color:'rgb(118,213,185)'
    },
    {
      type:'bar',
      key:'hospital',
      name:'医院(人时)',
      data:[35, 86, 46, 38, 10, 34, 47],
      color:'rgb(160,178,209)'
    }
  ]
}

// 实施-人力-完善
var manpowerTotalOption = {
  legend_data: ['全职(人时)', '兼职(人时)', '医院(人时)'],
  x_data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子", "其他"],
  y_data:[
    {
      type:'bar',
      key: 'fullTime',
      name:'全职(人时)',
      data:[5, 20, 36, 10, 10, 20, 87],
      color:'rgb(85,137,209)'
    },
    {
      type:'bar',
      key: 'pluralism',
      name:'兼职(人时)',
      data:[15, 26, 26, 18, 70, 50, 35],
      color:'rgb(118,213,185)'
    },
    {
      type:'bar',
      key:'hospital',
      name:'医院(人时)',
      data:[35, 86, 46, 38, 10, 34, 67],
      color:'rgb(160,178,209)'
    }
  ]
}

// 功能-维修-当期
var repairPresentOption = {
  legend_data: ['报修', '接修'],
  x_data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子", "其他"],
  y_data:[
    {
      type:'bar',
      key: 'report',
      name:'报修',
      data:[5, 20, 36, 10, 10, 20, 39],
      color:'rgb(85,137,209)'
    },
    {
      type:'bar',
      key: 'receive',
      name:'接修',
      data:[15, 26, 26, 18, 70, 50, 76],
      color:'rgb(118,213,185)'
    }
  ]
}


// 功能-维修-累计
var repairTotalOption = {
  legend_data: ['报修', '接修'],
  x_data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子", "其他"],
  y_data:[
    {
      type:'bar',
      key: 'report',
      name:'报修',
      data:[5, 20, 36, 10, 10, 20, 39],
      color:'rgb(85,137,209)'
    },
    {
      type:'bar',
      key: 'receive',
      name:'接修',
      data:[15, 26, 26, 18, 70, 50, 76],
      color:'rgb(118,213,185)'
    }
  ]
}


// 功能-质控-当期
var controlPresentOption = {
  legend_data: ['预防性维护', '日常检查', '工程师巡检', '计量'],
  x_data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子", "其他"],
  y_data:[
    {
      type:'bar',
      key: 'servicing',
      name:'预防性维护',
      data:[35, 86, 46, 38, 10, 34, 29],
      color:'rgb(31,84,155)'
    },
    {
      type:'bar',
      key: 'inspect',
      name:'日常检查',
      data:[15, 50, 86, 70, 40, 60, 59],
      color:'rgb(49,121,192)'
    },
    {
      type:'bar',
      key: 'inspection',
      name:'工程师巡检',
      data:[35, 86, 26, 68, 30, 80, 46],
      color:'rgb(99,158,213)'
    },
    {
      type:'bar',
      key: 'meterage',
      name:'计量',
      data:[25, 36, 56, 88, 50, 74, 59],
      color:'rgb(124,224,195)'
    }
  ]
}


// 功能-质控-累计
var controlTotalOption = {
  legend_data: ['预防性维护', '日常检查', '工程师巡检', '计量'],
  x_data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子", "其他"],
  y_data:[
    {
      type:'bar',
      key: 'servicing',
      name:'预防性维护',
      data:[35, 86, 46, 38, 10, 34, 29],
      color:'rgb(31,84,155)'
    },
    {
      type:'bar',
      key: 'inspect',
      name:'日常检查',
      data:[15, 50, 86, 70, 40, 60, 59],
      color:'rgb(49,121,192)'
    },
    {
      type:'bar',
      key: 'inspection',
      name:'工程师巡检',
      data:[35, 86, 26, 68, 30, 80, 46],
      color:'rgb(99,158,213)'
    },
    {
      type:'bar',
      key: 'meterage',
      name:'计量',
      data:[25, 36, 56, 88, 50, 74, 59],
      color:'rgb(124,224,195)'
    }
  ]
}


// 功能-文档-当期
var documentPresentOption = {
  legend_data: ['文档'],
  x_data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子", "其他"],
  y_data:[
    {
      type:'bar',
      key: 'doc',
      name:'文档',
      data:[45, 46, 46, 78, 50, 74, 79],
      color:'rgb(85,137,209)'
    }
  ]
}


// 功能-文档-累计
var documentTotalOption = {
  legend_data: ['文档'],
  x_data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子", "其他"],
  y_data:[
    {
      type:'bar',
      key: 'doc',
      name:'文档',
      data:[45, 46, 46, 78, 50, 74, 79],
      color:'rgb(85,137,209)'
    }
  ]
}

// 功能-用户-当期
var userPresentOption = {
  legend_data: ['使用人数(人)'],
  x_data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子", "其他"],
  y_data:[
    {
      type:'bar',
      key: 'use_person',
      name:'使用人数(人)',
      data:[5, 20, 36, 10, 10, 20, 87],
      color:'rgb(85,137,209)'
    }
  ]
}

// 功能-用户-累计
var userTotalOption = {
  legend_data: ['使用人数(人)'],
  x_data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子", "其他"],
  y_data:[
    {
      type:'line',
      key: 'use_person',
      name:'使用人数(人)',
      data:[5, 20, 36, 10, 10, 20, 87],
      color:'rgb(124,223,195)'
    }
  ]
}


threeBar(visitPresentEcharts, visitPresentOption, G_VAR.echarts.visitPresentEcharts)
threeBar(visitTotalEcharts, visitTotalOption, G_VAR.echarts.visitTotalEcharts)
threeBar(openAccountPresentEcharts, openAccountPresentOption, G_VAR.echarts.openAccountPresentEcharts)
threeBar(openAccountTotalEcharts, openAccountTotalOption, G_VAR.echarts.openAccountTotalEcharts)
threeBar(devicePresentEcharts, devicePresentOption, G_VAR.echarts.devicePresentEcharts)
threeBar(deviceTotalEcharts, deviceTotalOption, G_VAR.echarts.deviceTotalEcharts)
threeBar(manpowerPresentEcharts, manpowerPresentOption, G_VAR.echarts.manpowerPresentEcharts)
threeBar(manpowerTotalEcharts, manpowerTotalOption, G_VAR.echarts.manpowerTotalEcharts)
threeBar(repairPresentEcharts, repairPresentOption, G_VAR.echarts.repairPresentEcharts)
threeBar(repairTotalEcharts, repairTotalOption, G_VAR.echarts.repairTotalEcharts)
threeBar(controlPresentEcharts, controlPresentOption, G_VAR.echarts.controlPresentEcharts)
threeBar(controlTotalEcharts, controlTotalOption, G_VAR.echarts.controlTotalEcharts)
threeBar(documentPresentEcharts, documentPresentOption, G_VAR.echarts.documentPresentEcharts)
threeBar(documentTotalEcharts, documentTotalOption, G_VAR.echarts.documentTotalEcharts)
threeBar(userPresentEcharts, userPresentOption, G_VAR.echarts.userPresentEcharts)
threeBar(userTotalEcharts, userTotalOption, G_VAR.echarts.userTotalEcharts)

function dataInit($ele) {
  var dateMax = moment().subtract(1,'d').format('YYYY-MM-DD')
  switch ($ele.val()) {
    case 'week':
      dateMax = moment().subtract(1,'d').format('YYYY-MM-DD')
      break;
    case 'month':
      dateMax = moment().subtract(1,'d').format('YYYY-MM-DD')
      break;
    case 'halfYear':
      dateMax = moment().subtract(1,'M').format('YYYY-MM-DD')
      break;
    case 'year':
      dateMax = moment().subtract(1,'M').format('YYYY-MM-DD')
      break;
  }
  $('#endDate').remove();
  $('.endDate_box').append('<input type="text" id="endDate" name="endDate" class="calendar-input">')
  $('#endDate').fdatepicker({
    initialDate: dateMax,
    format: 'yyyy-mm-dd',
    endDate: dateMax
  });
}
dataInit($('#dateRange'))
$('#dateRange').on('change', function (ele) {
  dataInit($(this))
})
const export_ele = document.querySelector('.trendCount_box')
$('#export_trend').on('click', function () {
  export_image(export_ele, '趋势统计', 'jpg');
})