/**
 * Created by sunyan on 2017/8/3.
 */
const managers = new Vue({
  el:'#managers',
  data:{
    list:[]
  },
  methods:{
    getData: function () {
      var that = this;
      var url = _ip + '/user/name';
      $.ajax({
        url:url,
        dataType: 'jsonp',
        async:false,
        contentType:'application/json',
        jsonpCallback: 'abcd',
      }).done(function (json) {
        json.data.unshift('---请选择---')
        that.list = json.data;

      })
    }
  }
})
managers.getData();

// 上传文件
attachment1 = new attachment()
attachment1.init({
  fileUpload:$('#fileUpload'),
  addAttachmentList:$('#addAttachmentList'),
  fileBtn:$('#file_1'),
  downloadDelete:true,
  fileType:['xlsm','XLSM','xlsx','XLSX','xls','XLS'],
  fileLength:1
}).deleteFile();

attachment2 = new attachment()
attachment2.init({
  fileUpload:$('#fileUpload_2'),
  addAttachmentList:$('#addAttachmentList_2'),
  fileBtn:$('#file_2'),
  downloadDelete:true,
  fileType:['xlsm','XLSM','xlsx','XLSX','xls','XLS'],
  fileLength:1
}).deleteFile();

attachment3 = new attachment()
attachment3.init({
  fileUpload:$('#fileUpload_3'),
  downloadDelete:true,
  addAttachmentList:$('#addAttachmentList_3'),
  fileBtn:$('#file_3'),
  fileLength:1
}).deleteFile();

attachment4 = new attachment()
attachment4.init({
  fileUpload:$('#fileUpload_4'),
  downloadDelete:true,
  addAttachmentList:$('#addAttachmentList_4'),
  fileBtn:$('#file_4'),
  fileLength:1
}).deleteFile();

const form_1 = new Vue({
  el: '#example-1',
  data: {
    isEdit_1: false,
    isShowEditBtn_1:false,
    isCommit:false
  },
  methods: {
    init:function () {
      if(formCommon.hasPermissions){
        this.isShowEditBtn_1 = true
      }
    },
    showEdit_1:function(){
      this.isEdit_1 = true;
      this.isShowEditBtn_1 = false;
      formCommon.hideDisabled('account-check-body');
      $('#account-check-body').find('input[type=text]').each(function () {
        $(this).removeAttr('disabled')
      })
    },
    cancelEdit_1:function () {
      this.isEdit_1 = false;
      this.isShowEditBtn_1 = true;
      this.getData_1()
      formCommon.showDisabled('account-check-body')
    },
    commitEdit_1:function () {
      if(this.isCommit) return
      var that = this;
      var arr = [];
      $('#account-check-body').find('input[type=checkbox]').each(function () {
        var _this = $(this);
        var text = _this.val();
        if(_this.prop('checked')){
          arr.push(text)
        }
      })
      var url = _ip + '/account/insertApplyAccount';
      var data = {
        field:arr.join(','),
        projectId:getUrlId(),
        time:$('#carry_out_time').val()
      }
      that.isCommit = true
      $.ajax({
        url:url,
        type : "POST",
        xhrFields: {
          withCredentials: true
        },
        crossDomain: true,
        dataType: 'json',
        contentType:'application/json',
        data:JSON.stringify(data),
        success: function(data) {
          that.isCommit = false
          // debugger
          // if(data.message === 'LOGIN') {
          //   location.href = 'user-login.html';
          //   return false;
          // }
          if(data.success){
            that.cancelEdit_1()
          }else{
            alert('修改失败, 请稍后重试！');
          }
        }
      })
    },
    getData_1:function () {
      var url = _ip + '/account/getApplyAccountByPid?projectid='+getUrlId();
      $.ajax({
        url:url,
        dataType: 'jsonp',
        async:false,
        contentType:'application/json',
        jsonpCallback: 'form1',
      }).done(function (json) {
        if(!json.data) return
        var field = json.data.field
        $('#account-check-body').find('input[type=checkbox]').each(function () {
          var _this = $(this);
          var text = _this.val();
          if(field.indexOf(text)!=-1){
            $(this).prop({'checked':'true'})
          }else{
            $(this).removeAttr('checked')
          }
        })
        // formCommon.showSelected('account-check-body',json.data.field)
        $('#carry_out_time').val(json.data.time || '')
      })
    }
  }
})
form_1.getData_1()


const form_2 = new Vue({
  el: '#example-2',
  data: {
    isEdit_2: false,
    isShowEditBtn_2:false,
    isCommit:false
  },
  methods: {
    init:function () {
      if(formCommon.hasPermissions){
        this.isShowEditBtn_2 = true
      }
    },
    showEdit_2:function(){
      this.isEdit_2 = true;
      this.isShowEditBtn_2 = false
      formCommon.hideDisabled('account-check-body-2')
      $('#account-check-body-2').find('input[type=text]').each(function () {
        $(this).removeAttr('disabled')
      })
      $('#managers').removeAttr('disabled')
      $('.a-upload').css({'display':'block'})
      $('#account-check-body-2').find('span.delete').attr("style","");
    },
    cancelEdit_2:function () {
      this.isEdit_2 = false;
      this.isShowEditBtn_2 = true;
      this.getData_2()
      formCommon.showDisabled('account-check-body-2')
      $('#account-check-body-2').find('input[type=text]').each(function () {
        $(this).prop({'disabled':'disable'})
      })
      $('#managers').prop({'disabled':'disable'})
      $('.a-upload').css({'display':'none'})
      $('#account-check-body-2').find('span.delete').css({'display':'none'})
    },
    commitEdit_2:function () {
      if(this.isCommit) return
      var that = this;
      var arr = [];
      $('#account-check-body-2').find('input[type=checkbox]').each(function () {
        var _this = $(this);
        var text = _this.val();
        if(_this.prop('checked')){
          arr.push(text)
        }
      })
      var m = $('#managers').val();
      if(m == '---请选择---'){
        alert('请选择实施经理！');
        return;
      }
      var reg = /^\+?[1-9][0-9]*$/
      var office_count = $('#office_count').val();
      var equipment_count = $('#equipment_count').val();
      var equipment_total_count = $('#equipment_total_count').val()
      if(!reg.test(office_count)){
        alert('实施科室数要填写正整数！')
        return
      }
      if(!reg.test(equipment_count)){
        alert('实施设备数要填写正整数！')
        return
      }
      if(!reg.test(equipment_total_count)){
        alert('设备总数要填写正整数！')
        return
      }
      var url = _ip + '/implement/insertApplyImplement';
      that.isCommit = true
      var data = {
        field:arr.join(','),
        projectId:getUrlId(),
        manager:$('#managers').val(),
        remarkManager:$('#remark_manage').val(),
        officeCount:$('#office_count').val(),
        equipmentCount:$('#equipment_count').val(),
        total:$('#equipment_total_count').val(),
        time:$('#expectTime').val(),
        remarkComplete:$('#remark_complete').val(),
        filea:$('#addAttachmentList').find('li').eq(0).attr('rel') || '',
        fileb:$('#addAttachmentList_2').find('li').eq(0).attr('rel') || '',
        filec:$('#addAttachmentList_3').find('li').eq(0).attr('rel') || '',
        filed:$('#addAttachmentList_4').find('li').eq(0).attr('rel') || ''
      }
      $.ajax({
        url:url,
        type : "POST",
        xhrFields: {
          withCredentials: true
        },
        crossDomain: true,
        dataType: 'json',
        contentType:'application/json',
        data:JSON.stringify(data),
        success: function(data) {
          that.isCommit = false
          // debugger
          // if(data.message === 'LOGIN') {
          //   location.href = 'user-login.html';
          //   return false;
          // }
          if(data.success){
            that.cancelEdit_2()
          }else{
            alert('修改失败, 请稍后重试！');
          }
        }
      })
    },
    getData_2:function () {
      var url = _ip + '/implement/getApplyImplementByPid?projectid='+getUrlId();
      $.ajax({
        url:url,
        dataType: 'jsonp',
        async:false,
        contentType:'application/json',
        jsonpCallback: 'form2',
      }).done(function (json) {
        // console.log(json)
        if(!json.data) return;
        setTimeout(function () {
          $('#managers').find('option').each(function () {
            var text = $(this).text();
            if(text == json.data.manager){
              $(this).prop({'selected':"selected"})
            }
          })
        },500)

        $('#remark_manage').val(json.data.remarkManager);
        $('#office_count').val(json.data.officeCount);
        $('#equipment_count').val(json.data.equipmentCount);
        $('#equipment_total_count').val(json.data.total);
        $('#expectTime').val(json.data.time);
        $('#remark_complete').val(json.data.remarkComplete);
        json.data.filea && attachment1.getAttachmentList(json.data.filea.split(','),json.data.createTime)
        json.data.fileb && attachment2.getAttachmentList(json.data.fileb.split(','),json.data.createTime)
        json.data.filec && attachment3.getAttachmentList(json.data.filec.split(','),json.data.createTime)
        json.data.filed && attachment4.getAttachmentList(json.data.filed.split(','),json.data.createTime)



        var field = json.data.field
        $('#account-check-body-2').find('input[type=checkbox]').each(function () {
          var _this = $(this);
          var text = _this.val();
          if(field.indexOf(text)!=-1){
            $(this).prop({'checked':'true'})
          }else{
            $(this).removeAttr('checked')
          }
        })
        // formCommon.showSelected('account-check-body',json.data.field)
      })
    }
  }
})
form_2.getData_2()

const form_3 = new Vue({
  el: '#example-3',
  data: {
    isEdit_3: false,
    isShowEditBtn_3: true,
    isCommit:false
  },
  methods: {
    init:function () {
      if(formCommon.hasPermissions){
        this.isShowEditBtn_3 = true
      }
    },
    showEdit_3:function(){
      this.isEdit_3 = true;
      this.isShowEditBtn_3 = false;
      formCommon.hideDisabled('account-check-body-3')
    },
    cancelEdit_3:function () {
      this.isEdit_3 = false;
      this.isShowEditBtn_3 = true;
      this.getData_3()
      formCommon.showDisabled('account-check-body-3')
    },
    commitEdit_3:function () {
      if(this.isCommit) return
      var that = this;
      var arr = [];
      $('#account-check-body-3').find('input[type=checkbox]').each(function () {
        var _this = $(this);
        var text = _this.val();
        if(_this.prop('checked')){
          arr.push(text)
        }
      })
      var url = _ip + '/material/insertApplyMaterial';
      var data = {
        field:arr.join(','),
        projectId:getUrlId(),
      }
      that.isCommit = true
      $.ajax({
        url:url,
        type : "POST",
        xhrFields: {
          withCredentials: true
        },
        crossDomain: true,
        dataType: 'json',
        contentType:'application/json',
        data:JSON.stringify(data),
        success: function(data) {
          that.isCommit = false
          // debugger
          // if(data.message === 'LOGIN') {
          //   location.href = 'user-login.html';
          //   return false;
          // }
          if(data.success){
            that.cancelEdit_3()
          }else{
            alert('修改失败, 请稍后重试！');
          }
        }
      })
    },
    getData_3:function () {
      var url = _ip + '/material/getApplyMaterial?projectid='+getUrlId();
      $.ajax({
        url:url,
        dataType: 'jsonp',
        async:false,
        contentType:'application/json',
        jsonpCallback: 'form3',
      }).done(function (json) {
        if(!json.data) return
        var field = json.data.field
        $('#account-check-body-3').find('input[type=checkbox]').each(function () {
          var _this = $(this);
          var text = _this.val();
          if(field.indexOf(text)!=-1){
            $(this).prop({'checked':'true'})
          }else{
            $(this).removeAttr('checked')
          }
        })
        // formCommon.showSelected('account-check-body-3',json.data.field)
      })
    }
  }
})
form_3.getData_3()

const formCommon = {
  init:function() {
    var url  = _ip+'/puser/select';
    var dataPara = {
      id: getUrlId()
    };
    this.isProMember = false;
    this.hasPermissions = false;
    var arr = []
    var that = this
    $.ajax({
      url:url,
      type: 'GET',
      dataType: 'jsonp',
      async:false,
      data:dataPara,
      contentType:'application/json',
      jsonpCallback: 'isProMember',
      success: function(memberJson) {
        if (memberJson.success) {
          arr.push(memberJson.data.owner.id);
          for (var k = 0; k < memberJson.data.list.length; k++) {
            arr.push(memberJson.data.list[k].id);
          }
          // console.log(arr)
          for (var n = 0; n < arr.length; n++) {
            if (parseInt($.cookie('userid')) == arr[n]) {
              that.isProMember = true;
              // console.log(that.isProMember)
              break;
            }
          }
        }
        var roleid = $.cookie('userrole');
        if(roleid == 1 || roleid == 3 || roleid == 9 ||  that.isProMember == true){
          that.hasPermissions = true;
        }
        // console.log(that.hasPermissions)
        form_1.init()
        form_2.init()
        form_3.init()
      }
    })
  },
  showDisabled:function (id) {
    $('#'+id).find('input[type=checkbox]').each(function () {
      var _this = $(this);
      _this.prop('disabled','disabled')
    })
  },
  hideDisabled:function (id) {
    $('#'+id).find('input[type=checkbox]').each(function () {
      var _this = $(this);
      _this.removeAttr('disabled')
    })
  },
  showSelected:function (id,field) {
    console.log(field)
    $('#'+id).find('input[type=checkbox]').each(function () {
      var _this = $(this);
      var text = _this.val();
      console.log(text)
      if(field.indexOf(text)!=-1){
        $(this).prop({'checked':'true'})
      }else{
        $(this).removeAttr('checked')
      }
    })
  }
}
formCommon.init()






