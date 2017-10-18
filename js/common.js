
var _ip = location.origin;
if(_ip.indexOf('localhost') != -1){
    _ip = 'http://121.42.187.170'; //本地
    // _ip = 'http://192.168.8.31:8080'  //展播
    // _ip = 'http://10.0.2.14:8080/operation-web'; //广播
    // _ip = 'http://10.0.1.81:8888';
}else{
    //will remove after project complete
  _ip = 'http://121.42.187.170'; //本地
  // _ip = 'http://121.42.252.26/';
}

/*----------
 * 头部页面头部
 *-----------------------------*/


 /*----------
  * 判断是否登陆
  *-----------------------------*/
 var globleUserId;
 function isLogin(){
     var url = _ip + '/user/getLoginUserInfo';
     $.ajax({
         url:url,
         type: 'GET',
         xhrFields: {
             withCredentials: true
         },
         crossDomain: true,
         dataType: 'json',
         contentType:'application/json',
         jsonpCallback: 'login',
         success: function(json) {
             if(!json.success){
                 location.href = 'user-login.html';
             }
             else {
                 $.cookie('username',json.data.userName);
                 $.cookie('name',json.data.name);
                 $.cookie('userid',json.data.id);
                 $.cookie('userrole',json.data.role);

                 globleUserId = parseInt(json.data.id);
                 globleRoleId = parseInt(json.data.role);
                 creatAsideDom();
                 var roleName = '';
                 switch (json.data.role) {
                     case 0:
                         roleName = '产品经理';
                         break;
                     case 1:
                         roleName = '区域负责人';
                         break;
                     case 2:
                         roleName = '普通用户';
                         break;
                     case 3:
                         roleName = '全域管理员';
                         break;
                     case 9:
                       roleName = '超级管理员';
                       break;
                 }
                 $('#headusername').html(json.data.userName+'&nbsp;'+ roleName);
                 modityAsideCurrent();

             }
         }
     })
 }

 isLogin();


function loginOut(){
    var url = _ip + '/loginOut';
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'jsonp',
        contentType: 'application/json',
        jsonpCallback: 'loginOut',
        success: function (json) {
            if (json.success) {
                location.href = 'user-login.html';
            }
        }
    })
}

function creatAsideDom() {
    var obj = {
        promanage: {
            name:'项目管理',
            iconClass:'project',
            data: [
                    {
                        id:'prolit',
                        name:'项目列表',
                        src:'mems-pro-list'
                    }
                  ]
        },
        needmange:{
            name:'需求管理',
            iconClass:'need',
            data:[
                    {
                        id:'needlist',
                        name:'需求池',
                        src:'pm-need-list'
                    },
                    {
                        id:'buglist',
                        name:'缺陷池',
                        src:'pm-bug-list'
                    }
                 ]
        },
        system:{
            name:'系统配置',
            iconClass:'system',
            data:[
                    {
                        id:'usermanage',
                        name:'用户管理',
                        src:'user-manage'
                    },
                    {
                        id:'organize',
                        name:'组织架构',
                        src:'organize-architecture'
                    },
                    {
                        id:'tagmanage',
                        name:'标签管理',
                        src:'tag-manage'
                    }
                ]
        },
        documentmanage:{
            name:'文档管理',
            iconClass:'document',
            data:[
                    {
                        id:'docmanage',
                        name:'文档管理',
                        src:'doc-manage'
                    }
                 ]
        },
        runReport:{
            name:'运营报告',
            iconClass:'report',
            data:[
              {
                id:'keydata',
                name:'数据概览',
                src:'key-data'
              },
              {
                id:'dataexport',
                name:'数据导出',
                src:'data-export'
              }
            ]
        }
    }
    var h = ''
    for(var k in obj){
        var first = obj[k];
        if(k == 'system' && (globleRoleId == 0 || globleRoleId == 1 || globleRoleId == 2) ){
            continue;
        }

        h += '<li id="'+k+'">';
            h += '<div class="menu-first"><i class="'+first.iconClass+'"></i>'+first.name+'</div>';
            var second = first.data;
            h += '<dl class="menu-second">';
            for(var n = 0; n < second.length; n ++){
                var item = second[n];
                if(globleRoleId==3 && (item.name == '用户管理' || item.name == '组织架构')) continue;
                h += '<dd><a href="'+item.src+'.html" id="'+item.id+'">'+item.name+'</a></dd>';
            }
            h += '</dl>';
        h += '</li>';
    }
    $('#asidemenu').html(h);
}

function modityAsideCurrent(){
    var pathname = location.pathname;

    var obj = {

        promanage:{
            prolit:['mems-pro-list','mems-pro-list-myself','mems-pro-creat-1','mems-pro-detail-baseinfo','mems-pro-creat-1','mems-pro-creat-2','mems-pro-creat-3']
        }, //项目管理文件列表
        needmange:{
            needlist:['pm-need-list','pm-need-commite','pm-need-list-meme','pm-need-commite-pm','pm-need-detail-pm','pm-need-commite','pm-commite-relative','pm-need-detail-mems'],
            buglist:['pm-bug-list','pm-bug-commite','pm-bug-detail','pm-bug-detail-edit']
        },   //需求管理文件列表
        system:{
            usermanage:['user-manage'],
            organize:['organize-architecture'],
            tagmanage:['tag-manage']
        },      //系统配置文件列表
        documentmanage:{
            docmanage:['doc-manage']
        },   //文档管理文件列表
        runReport:{
            keydata:['key-data','trend-count'],
            dataexport:['data-export']
        } //运营报告列表

    }

    for(var k in obj){
        var first = obj[k];
        // if(k == 'system' && globleRoleId == 0){
        //     continue;
        // }
        for(var i in first){
            var second = first[i];
            for(var j = 0, jj = second.length; j < jj; j++){
                var pagename = second[j];
                if(pathname.indexOf(pagename) > -1){
                    $('#'+k).find('div.menu-first').addClass('current');
                    $('#'+i).addClass('current');
                    break;
                }

            }
        }
    }

}




/*----------
 * 弹框相关的通用样式
 *-----------------------------*/
var $$ = {}
/*----------
 * 显示遮罩层
 * @ param {number} zIndex
 * @ return {jqueryDom} 弹出层jQuery对象
 *-----------------------------*/
$$.showMask = function(zIndex, config) {
    config = config || {};
    if ( $$._maskDom ) $$.hideMask();
    var setting = {
        background: config.background ? config.background : 'rgba(0,0,0,0.5)'
    };
    zIndex = zIndex || 500;
    var mask = document.createElement("div"),
        h =  (document.body.scrollHeight >= window.screen.availHeight)?document.body.scrollHeight:window.screen.availHeight;
    mask.id = "JS_mask";
    mask.style.cssText = "height:"+h+"px;width:100%;position:absolute;background:"+setting.background+";top:0;left:0;z-index:"+zIndex;
    $$._maskDom = $(mask);

    $("body").append($$._maskDom);
    return $$._maskDom;
}
/*----------
 * 漂浮弹框
 * @ param  {string} html    弹出的html代码{=id} 为当前dom id
 * @ param  {Object} buttons 按钮对象{'确定':function(){},'关闭':'close'}
 * @ param  {number}  zIndex
 * @ param  {String}  style 最外框样式
 * @ param  {Boolean} showMask 是否显示遮罩层
 * @ param  {String}  clasName 最外框class
 * @ return {Dom Object}     自身Dom,非jQueryDom
 *-----------------------------*/
$$.layer = function(html, config) {
    config = config || {};
    var setting = {
        zIndex: config.zIndex || 500,
        fixedBoxTop: config.fixedBoxTop || 200,
        contentBoxWidth: config.contentBoxWidth || '90%',
        isShowMask: config.isShowMask || false

    };

    setting.fixedBoxTop = setting.fixedBoxTop + 'px';
    setting.fixedBoxTop = parseInt(setting.fixedBoxTop.replace(/px/g, ''));

    var
        Dom = document.createElement("div"),
        t = new Date(),
        scrollTop = $(window).scrollTop(),
        tmpId = t.getTime().toString(36),
        focus = true,
        id = "JS_lightBox_" + tmpId;

    Dom.id = id;
    Dom.className = 'mob_ligthBox';
    Dom.style.cssText = 'width:100%;position:absolute;left:0;';
    Dom.style.top = setting.fixedBoxTop + scrollTop + 'px';
    Dom.style.zIndex = setting.zIndex;
    Dom.innerHTML = '<div class="mob-layer-content" style="margin-left:auto;margin-right:auto;width:'+setting.contentBoxWidth+'">'+html+'</div>';
    document.body.appendChild(Dom);
    Dom._showMask = config.isShowMask;

    if ( setting.isShowMask ) $$.showMask(setting.zIndex - 1,'rgb(,1,12,)');

    $$.layerBoxId = id; //一个全局id
    $$.layerBoxTempId = tmpId;
    return Dom;
}

/*----------
 * 关闭弹框
 * @ param {String} id  关闭弹框的ID，默认为最后打开的弹框id
 * @ param {Function} callback 回调函数
 * @ return {undefined}
 *-----------------------------*/
$$.closeLayer = function(id, callback) {
    if ( !id ) id = $$.layerBoxId;
    id = "JS_lightBox_" + ( (id+"").replace("JS_lightBox_","") );
    var dom = $("#"+id);
    if ( dom.length ) {
        if ( dom[0]._showMask ) $$.hideMask();
        dom.remove();
    }
    if ( typeof callback == 'function' ) callback(id);
}
/*----------
 * 移除遮罩层
 * @ return {undefined}
 *-----------------------------*/
$$.hideMask = function(){
    if ( $$._maskDom ) {
        $$._maskDom.remove();
        $$._maskDom = null;
    }
}


/*----------
 * 获取url上的参数
 * @ return {para}
 *-----------------------------*/

 $$.getUrlParaObj = function(k){
    var search = location.search;
    if(search != "" && search.length >= 1){
        var search = search.split('?')[1];

        var param  = {}; 
        var arr = search.split('&');
        for(var k = 0, kk = arr.length; k < kk ; k++){
            var d = arr[k].split('=');
            param[d[0]] = decodeURI(d[1])
        }
    }
    return param;
 }

/*----------
 * 获取url上的id
 * @ return {id}
 *-----------------------------*/
function getUrlId(){
    var param = $$.getUrlParaObj();
    return  param['id'];
}



/*----------
 * 通用API
 * @ return {_API}
 *-----------------------------*/
var _api = function(){
    this.getListFirst = function(url,id,defaultId,isSelect,callback){
        $.ajax({
            url:url,
            type: 'GET',
            dataType: 'jsonp',
            contentType:'application/json',
            jsonpCallback: callback,
            success: function(json) {
                var json = json.data;
                if(!json || !json.length) return
                var h = '';
                if (isSelect) {
                    h += '<option value="">请选择</option>';
                }

                for(var k = 0 , kk = json.length; k < kk; k++){
                    h += '<option value="'+json[k].id+'" '+  (json[k].id == defaultId?"selected":""  ) +'>'+json[k].name+'</option>'
                }            
                $('#'+id).html(h);
            }
        })
    },
    this.getListSecond = function(url,id,defaultId,isSelect,callback){
        $.ajax({
            url:url,
            type: 'GET',
            dataType: 'jsonp',
            contentType:'application/json',
            jsonpCallback: callback,
            success: function(json) {
                var json = json.data;
                if(!json || !json.length) return
                var h = '';
                if (isSelect) {
                    h += '<option value="">请选择</option>';
                }
                for(var k = 0 , kk = json.length; k < kk; k++){
                     h += '<option value="'+json[k]+'" '+  (json[k] == defaultId?"selected":""  ) +'>'+json[k]+'</option>';
                }            
                $('#'+id).html(h);
            }
        })
    }
}
_api.prototype = {
    getNeedSource: function(id,defaultId,isSelect){  //1. 获取来源列表
        var url = _ip+'/project/select';
        this.getListFirst.apply(this,[url,id,defaultId,isSelect,'needsource']);
        return this;
    },
    getComeSource: function(id, defaultId,isSelect,proId){ // 2. 获取需求方列表
        var url = _ip+'/cus/selectAll?id='+proId;
        this.getListFirst.apply(this,[url,id,defaultId,isSelect,'sourcec']);
        return this;
    },
    getPlatformList: function(id, defaultId,isSelect){ // 3. 获取平台列表
        var url = _ip+'/common/getPlatList';
        this.getListSecond.apply(this,[url,id,defaultId,isSelect,'platform']);
        return this;
    },
    getFunctionList: function(id, defaultId,isSelect,productList,defaltplat){ // 4. 获取功能列表 get,与产品相关联
        var plat = defaltplat || $('#'+productList).val();
        var url = _ip+'/common/getFeatureList?key='+plat;
        this.getListSecond.apply(this,[url,id,defaultId,isSelect,'fun']);
        return this;
    },
    getTypeList: function(id, defaultId,isSelect){ // 5. 获取类别 get
        var url = _ip+'/common/getRequireTypeList';
        this.getListSecond.apply(this,[url,id,defaultId,isSelect,'type']);
        return this;
    },
    getLevelList: function(id, defaultId,isSelect){ // 6. 获取紧急程度 get
        var url = _ip+'/common/getLevelList';
        this.getListSecond.apply(this,[url,id,defaultId,isSelect,'level']);
        return this;
    },
    getReliableSet: function(id, defaultId,isSelect){ // 6. 获取可靠度 get
        var url = _ip+'/common/getReliableSet';
        this.getListSecond.apply(this,[url,id,defaultId,isSelect,'ReliableSet']);
        return this;
    },
    getProductList: function(id, defaultId,isSelect){ // 7. 获取产品列表
        var url = _ip+'/common/getProductList';
        this.getListSecond.apply(this,[url,id,defaultId,isSelect,'pro']);
        return this;
    },
    getStatusList: function(id, defaultId,isSelect){ // 8-1. 获取处理状态:原始需求
        var url = _ip+'/common/getStatusList';
        this.getListSecond.apply(this,[url,id,defaultId,isSelect,'stat']);
        return this;
    },
    getStatusListPm: function(id, defaultId,isSelect){ // 8-2. 获取处理状态:产品需求
        var url = _ip+'/common/getProductStatusList';
        this.getListSecond.apply(this,[url,id,defaultId,isSelect,'statpm']);
        return this;
    },
    getPriorityList: function(id, defaultId,isSelect){ // 9. 获取优先级列表
        var url = _ip+'/common/getPriorityList';
        this.getListSecond.apply(this,[url,id,defaultId,isSelect,'pri']);
        return this;
    },
    getIssueStatusList: function(id, defaultId,isSelect){ // 10. 获取缺陷状态
        var url = _ip+'/common/getIssueStatusList';
        this.getListSecond.apply(this,[url,id,defaultId,isSelect,'IssueStatus']);
        return this;
    },
    getIssueType: function(id, defaultId,isSelect){ // 11. 获取缺陷类型
        var url = _ip+'/common/getIssueTypeList';
        this.getListSecond.apply(this,[url,id,defaultId,isSelect,'IssueType']);
        return this;
    },
    getNetWorkList: function(id, defaultId,isSelect){ // 12. 获取网络类型
        var url = _ip+'/common/getNetWorkList';
        this.getListSecond.apply(this,[url,id,defaultId,isSelect,'network']);
        return this;
    },
    getDptList: function(id, defaultId,isSelect) { // 13. 获取组织架构
        var url = _ip+'/dpt/user';
        this.getListSecond.apply(this,[url,id,defaultId,isSelect,'Ocp']);
        return this;
    },
    getBussTypeList: function(id, defaultId,isSelect) { // 13. 项目管理：项目列表--商务阶段
        var url = _ip+'/common/getBussTypeList';
        this.getListSecond.apply(this,[url,id,defaultId,isSelect,'PBuss']);
        return this;
    },
    getPSegmentationList: function(id, defaultId,isSelect) { // 14. 项目管理：获取segmentation
        var url = _ip+'/common/getPSegmentationList';
        this.getListSecond.apply(this,[url,id,defaultId,isSelect,'Segmentation']);
        return this;
    },
    getPLevelList: function(id, defaultId,isSelect) { // 15. 项目管理：获取级别
        var url = _ip+'/common/getPLevelList';
        this.getListSecond.apply(this,[url,id,defaultId,isSelect,'PLevel']);
        return this;
    },
    getPBussTypeList: function(id, defaultId,isSelect,proId) { // 16. 项目管理：商务阶段
        var url = _ip+'/common/getPBussTypeList?id='+proId;
        this.getListSecond.apply(this,[url,id,defaultId,isSelect,'PBusst']);
        return this;
    },
    getSellType: function(id, defaultId,isSelect){   //17. 项目管理：获取销售方式
        var url = _ip+'/common/getSaleType';
        this.getListSecond.apply(this,[url,id,defaultId,isSelect,'seltt']);
        return this;
    },
    getVisitTypeList: function(id, defaultId,isSelect) { // 18. 项目管理：拜访方式
        var url = _ip+'/common/getVisitTypeList';
        this.getListSecond.apply(this,[url,id,defaultId,isSelect,'ty']);
        return this;
    },
    getVisitStatusList: function(id, defaultId,isSelect,proId) { // 19. 项目管理：拜访状态
        var url = _ip+'/common/getVisitStatusList?id='+proId;
        this.getListSecond.apply(this,[url,id,defaultId,isSelect,'sr']);
        return this;
    },
    getVisitResultList: function(id, defaultId,isSelect) { // 20. 项目管理：拜访结果
        var url = _ip+'/common/getVisitResultList';
        this.getListSecond.apply(this,[url,id,defaultId,isSelect,'re']);
        return this;
    },
    getEmergencyList: function(id, defaultId,isSelect) { // 21. 项目管理：紧急程度
        var url = _ip+'/common/getEmergencyList';
        this.getListSecond.apply(this,[url,id,defaultId,isSelect,'em']);
        return this;
    },
    getProNameList: function(id, defaultId,isSelect) { // 21. 项目管理：项目名称列表
        var url = _ip+'/project/name';
        this.getListFirst.apply(this,[url,id,defaultId,isSelect,'pname']);
        return this;
    },
    checkProNameList: function(id, defaultId,isSelect,name) { // 21. 项目管理：项目名称列表
        var url = _ip+'/project/name?name='+name;
        this.getListFirst.apply(this,[url,id,defaultId,isSelect,'checkname']);
        return this;
    },
    getExcelTheme: function(id, defaultId,isSelect) { // 22. 数据导出：获取内容
      var url = _ip+'/excel/theme';
      this.getListSecond.apply(this,[url,id,defaultId,isSelect,'theme']);
      return this;
    },
    getExcelDimen: function(id, defaultId,isSelect) { // 23. 数据导出：获取维度
      var url = _ip+'/excel/dimen';
      this.getListSecond.apply(this,[url,id,defaultId,isSelect,'dimen']);
      return this;
    },
    getDistrict: function(id, defaultId,isSelect){ //获取大区
        var url = _ip+'/common/getDistrict';
        this.getListSecond.apply(this,[url,id,defaultId,isSelect,'getDistrict'+(new Date).getTime()]);
        return this;
    },
    getPrivence: function(id, defaultId,isSelect,areaPra){ //获取省
        var url = _ip+'/common/getPrivence?area='+areaPra;
        this.getListSecond.apply(this,[url,id,defaultId,isSelect,'getPrivence'+(new Date).getTime()]);
        return this;
    },
    getCity: function(id, defaultId,isSelect,areaPra,provicePra){ //获取市
        var url = _ip+'/common/getCity?area='+areaPra+'&privence='+provicePra;
        this.getListSecond.apply(this,[url,id,defaultId,isSelect,'getCity'+(new Date).getTime()]);
        return this;
    },
    dynamicDistrick: function(id1,id2,id3){
        var _id1 = $('#'+id1),
            _id2 = $('#'+id2),
            _id3 = $('#'+id3);
        _API.getDistrict(id1,0,true);
        _id1.on('change',function(){
            _API.getPrivence(id2,0,true,_id1.val());
            _id3.html('<option>请选择</option>');
        })
        _id2.on('change',function(){
            _API.getCity(id3,0,true,_id1.val(),_id2.val());
        })
        return this;
    }


}
var _API = new _api();




/*----------
 * 上传附件
 * @ param {fileUpload} 点击上传的按钮
 * @ return {fileName} 文件名
 * @ return {addAttachmentList} 文件列表
 * @ return {isDetail} 是否是详情页
 *-----------------------------*/
function attachment(config){
    this.init = function(config){
        this.config = $.extend({
            type:"base"
        },config);
        if(!this.config.isDetail) this.analysisName();
        return this;
    };
    this.analysisName = function(){
        var that = this;
        this.config.fileUpload.on('click', "input[type='file']", function() {
            $(this).val('');
        });
        this.config.fileUpload.on("change","input[type='file']",function(){
            if(that.config.fileLength){
              if(that.config.addAttachmentList.find('li').length>=that.config.fileLength){
                alert('只能上传'+that.config.fileLength+'个文件！');
                return
              }
            }
            var filePath=$(this).val();
            if(that.config.noFormat) {
                if(filePath){
                    that.uploadFile();

                }else{
                    alert("您未上传文件!");
                    return false;
                }
            }
            else {
                var specialSymbols = ['*','#','&','@','%','^'];
                var isSpecial = false;
                for(var m = 0; m < specialSymbols.length; m++){
                    if(filePath.indexOf(specialSymbols[m]) != -1){
                        isSpecial = true;
                        break;
                    }
                }
                if(isSpecial){
                    alert("文件名不能包含*、#等特殊符号！");
                    return false
                }
                var format = filePath.split('.')[1].toLocaleUpperCase();
                var formatArr = ['JPG','PDF','XLSX','XLS','CSV','PNG','DOCX','DOC','ZIP','PPT'];
                if(that.config.fileType && that.config.fileType.length > 0){
                  formatArr = that.config.fileType
                }
                var isSport = false;
                for(var n = 0; n < formatArr.length; n++){
                    if(format.indexOf(formatArr[n]) != -1){
                        isSport = true;
                        break;
                    }
                }
                if(isSport){
                    var arr=filePath.split('\\');
                    var fileName=arr[arr.length-1];
                    that.uploadFile();
                }else{
                    alert("您上传文件类型有误！");
                    return false
                }
            }
        })
    };
    this.uploadFile = function(){

        var that = this;
        var formData = new FormData();
        
        formData.append('file', that.config.fileBtn?that.config.fileBtn[0].files[0]:$('#file')[0].files[0]);
        $.ajax({
            url:  that.config.url ||_ip+'/file/upload',
            type: 'POST',
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            cache: false,
            data: formData,
            processData: false,
            contentType: false
        })
        .done(function(res) {
            if(res.success){
                if(that.config.success) {
                    that.config.success(res);
                    return false;
                }
                var name = res.data[0].split('__')[1];
                var h = '<li rel='+res.data[0] +'><div>'+name+'<span class="delete">删除</span></div></li>';
                that.config.addAttachmentList.append(h);
                that.deleteFile();
            }
        })
        .fail(function(res) {
            alert('上传失败！');
        });
    }
    this.deleteFile = function(){
        var that = this;
        that.config.addAttachmentList.on('click','span.delete',function(){
            $(this).parent('div').parent('li').remove();
            var len = that.config.addAttachmentList.find('li').length; 
            if(len<=0){
                // that.config.fileName.html('尚未上传文件！');
            }
        })
    }
    this.getAttachmentList = function(attachmentList,time){
        var h = '';
        var that = this;
        if(attachmentList.length >= 1){
          for(var k = 0 ; k < attachmentList.length; k++){
            if(attachmentList[k].indexOf('__') <= -1) return;
            var nameArr = attachmentList[k].split('__')[1].split('.');
            var name = nameArr[0]+'-'+time+'.'+nameArr[1];
            if(that.config.downloadDelete){
              h += '<li rel="'+attachmentList[k]+'"><div>'+name+'  <span>' + (attachmentList[k].time || '')+'</span> <a class="delete" href="'+_ip+'/file/download?path='+attachmentList[k]+'">下载</a>'+'<span class="delete" style="display: none">删除</span></div></li>';
            }else{
              h += '<li rel="'+attachmentList[k]+'"><div>'+name+(that.config.isDetail?'<a class="delete" href="'+_ip+'/file/download?path='+attachmentList[k]+'">下载</a>':'<span class="delete">删除</span>')+'</div></li>';
            }
          }

          that.config.addAttachmentList.html(h);
        }
    }

}
// var attachment = new attachment();




