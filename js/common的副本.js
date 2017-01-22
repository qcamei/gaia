var _ip = 'http://121.42.187.170';

/*----------
 * 头部页面头部
 *-----------------------------*/
var header = new Vue({
    el:'#header',
    data:{
        datas: '<div class="right t">小丽，消息<span>2</span></div>'
    }
})


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
            param[d[0]] = d[1]
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

var _api = function(){
    this.getListFirst = function(url,id,defaultId,isSelect){
        $.ajax({
            url:_ip+'/project/getProjectList?callback=source',
            type: 'GET',
            dataType: 'jsonp',
            contentType:'application/json',
            jsonpCallback: 'source',
            success: function(json) {
                var json = json.data;
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
        return this;
    }
}
_api.prototype = {
    getNeedSource: function(id,defaultId,isSelect){  //1. 获取来源列表
        var url = _ip+'/project/getProjectList?callback=source';
        this.getListFirst.apply(this,[url,id,defaultId,isSelect]);
    }
}
var API = new _api();
// API.getNeedSource()

//1. 获取来源列表
function getNeedSource(id,defaultId,isSelect) {
    $.ajax({
        url:_ip+'/project/getProjectList?callback=source',
        type: 'GET',
        dataType: 'jsonp',
        contentType:'application/json',
        jsonpCallback: 'source',
        success: function(json) {
            var json = json.data;
            var h = '';
            if (isSelect) {
                h += '<option value="">请选择</option>';
            }
            for(var k = 0 , kk = json.length; k < kk; k++){
                h += '<option value="'+json[k].id+'" '+  (json[k].id == defaultId?"selected":""  ) +'>'+json[k].name+'</option>'
            }            $('#'+id).html(h);
        }

    })
}

// 2. 获取需求方列表
function getComeSource(id, defaultId) {
    $.ajax({
        url:_ip+'/customer/getCustomerList?callback=sourcec',
        type: 'GET',
        dataType: 'jsonp',
        contentType:'application/json',
        jsonpCallback: 'sourcec',
        success: function(json) {
            var json = json.data;
            var h = '';
            for(var k = 0 , kk = json.length; k < kk; k++){
                h += '<option value="'+json[k].id+'" '+  (json[k].id == defaultId?"selected":""  ) +'>'+json[k].name+'</option>'
            }
            $('#'+id).html(h);
        }

    })
}
// 3. 获取平台列表
function getPlatformList(id,defaultId) {
    $.ajax({
        url:_ip+'/original/getPlatList?callback=platform',
        type: 'GET',
        dataType: 'jsonp',
        contentType:'application/json',
        jsonpCallback: 'platform',
        success: function(json) {
            var json = json.data;
            var h = '';
            for(var k = 0 , kk = json.length; k < kk; k++){
                h += '<option value="'+json[k]+'" '+  (json[k] == defaultId?"selected":""  ) +'>'+json[k]+'</option>'
            }
            $('#'+id).html(h);
        }

    })
}
// 4. 获取功能列表 get
function getFunctionList(id,defaultId,isSelect) {
    $.ajax({
        url:_ip+'/original/getFeatureList?callback=fun&key=微信',
        type: 'GET',
        dataType: 'jsonp',
        contentType:'application/json',
        jsonpCallback: 'fun',
        success: function(json) {
            var json = json.data;
            var h = '';
            if (isSelect) {
                h += '<option value="">请选择</option>';
            }
            for(var k = 0 , kk = json.length; k < kk; k++){
                h += '<option value="'+json[k]+'" '+  (json[k] == defaultId?"selected":""  ) +'>'+json[k]+'</option>'
            }
            $('#'+id).html(h);
        }

    })
}

// 5. 获取需求类别 get
function getTypeList(id,defaultId) {
    $.ajax({
        url:_ip+'/common/getRequireTypeList?callback=type',
        type: 'GET',
        dataType: 'jsonp',
        contentType:'application/json',
        jsonpCallback: 'type',
        success: function(json) {
            var json = json.data;
            var h = '';
            for(var k = 0 , kk = json.length; k < kk; k++){
                h += '<option value="'+json[k]+'" '+  (json[k] == defaultId?"selected":""  ) +'>'+json[k]+'</option>'
            }
            $('#'+id).html(h);
        }
    })
}
// 6. 获取紧急程度 get
function getLevelList(id,defaultId,isSelect) {
    $.ajax({
        url:_ip+'/common/getLevelList?callback=level',
        type: 'GET',
        dataType: 'jsonp',
        contentType:'application/json',
        jsonpCallback: 'level',
        success: function(json) {
            var json = json.data;
            var h = '';
            if (isSelect) {
                h += '<option value="">请选择</option>';
            }
            for(var k = 0 , kk = json.length; k < kk; k++){
                h += '<option value="'+json[k]+'" '+  (json[k] == defaultId?"selected":""  ) +'>'+json[k]+'</option>'
            }
            $('#'+id).html(h);
        }

    })
}

// 7. 获取产品列表
function getProductList(id,defaultId,isSelect) {
    $.ajax({
        url:_ip+'/common/getProductList?callback=pro',
        type: 'GET',
        dataType: 'jsonp',
        contentType:'application/json',
        jsonpCallback: 'pro',
        success: function(json) {
            var json = json.data;
            var h = '';
            if (isSelect) {
                h += '<option value="">请选择</option>';
            }
            for(var k = 0 , kk = json.length; k < kk; k++){
                h += '<option value="'+json[k]+'" '+  (json[k] == defaultId?"selected":""  ) +'>'+json[k]+'</option>'
            }
            $('#'+id).html(h);
        }

    })
}

// 8-1. 获取处理状态:原始需求
function getStatusList(id,defaultId,isSelect) {
    $.ajax({
        url:_ip+'/common/getStatusList?callback=stat',
        type: 'GET',
        dataType: 'jsonp',
        contentType:'application/json',
        jsonpCallback: 'stat',
        success: function(json) {
            var json = json.data;
            var h = '';
            if (isSelect) {
                h += '<option value="">请选择</option>';
            }
            for(var k = 0 , kk = json.length; k < kk; k++){
                h += '<option value="'+json[k]+'" '+  (json[k] == defaultId?"selected":""  ) +'>'+json[k]+'</option>'
            }
            $('#'+id).html(h);
        }

    })
}
// 8-2. 获取处理状态:产品需求
function getStatusListPm(id,defaultId,isSelect) {
    $.ajax({
        url:_ip+'/common/getProductStatusList?callback=stat',
        type: 'GET',
        dataType: 'jsonp',
        contentType:'application/json',
        jsonpCallback: 'stat',
        success: function(json) {
            var json = json.data;
            var h = '';
            if (isSelect) {
                h += '<option value="">请选择</option>';
            }
            for(var k = 0 , kk = json.length; k < kk; k++){
                h += '<option value="'+json[k]+'" '+  (json[k] == defaultId?"selected":""  ) +'>'+json[k]+'</option>'
            }
            $('#'+id).html(h);
        }

    })
}
// 9. 获取优先级列表
function getPriorityList(id,defaultId) {
    $.ajax({
        url:_ip+'/common/getPriorityList',
        type: 'GET',
        dataType: 'jsonp',
        contentType:'application/json',
        jsonpCallback: 'rrr',
        success: function(json) {
            var json = json.data;
            var h = '';
            for(var k = 0 , kk = json.length; k < kk; k++){
                h += '<option value="'+json[k]+'" '+  (json[k] == defaultId?"selected":""  ) +'>'+json[k]+'</option>'
            }
            $('#'+id).html(h);
        }

    })
}

// 10. 获取缺陷状态
function getIssueStatusList(id,defaultId,isSelect) {
    $.ajax({
        url:_ip+'/common/getIssueStatusList?callback=pri',
        type: 'GET',
        dataType: 'jsonp',
        contentType:'application/json',
        jsonpCallback: 'pri',
        success: function(json) {
            var json = json.data;
            var h = '';
            if (isSelect) {
                h += '<option value="">请选择</option>';
            }
            for(var k = 0 , kk = json.length; k < kk; k++){
                h += '<option value="'+json[k]+'" '+  (json[k] == defaultId?"selected":""  ) +'>'+json[k]+'</option>'
            }
            $('#'+id).html(h);
        }

    })
}

// 11. 获取缺陷类型

function getIssueType(id,defaultId,isSelect) {
    $.ajax({
        url:_ip+'/common/getIssueTypeList',
        type: 'GET',
        dataType: 'jsonp',
        contentType:'application/json',
        jsonpCallback: 'bugtype',
        success: function(json) {
            var json = json.data;
            var h = '';
            if (isSelect) {
                h += '<option value="">请选择</option>';
            }
            for(var k = 0 , kk = json.length; k < kk; k++){
                h += '<option value="'+json[k]+'" '+  (k == defaultId?"selected":""  ) +'>'+json[k]+'</option>'
            }
            $('#'+id).html(h);
        }

    })
}

// 12. 获取网络类型
function getNetWorkList(id,defaultId,isSelect) {
    $.ajax({
        url:_ip+'/common/getNetWorkList?callback=network',
        type: 'GET',
        dataType: 'jsonp',
        contentType:'application/json',
        jsonpCallback: 'network',
        success: function(json) {
            var json = json.data;
            var h = '';
            if (isSelect) {
                h += '<option value="">请选择</option>';
            }
            for(var k = 0 , kk = json.length; k < kk; k++){
                h += '<option value="'+json[k]+'" '+  (json[k] == defaultId?"selected":""  ) +'>'+json[k]+'</option>'
            }
            $('#'+id).html(h);
        }

    })
}





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
        this.config.fileUpload.on("change","input[type='file']",function(){
            var filePath=$(this).val();
            if(filePath.indexOf("jpg")!=-1 || filePath.indexOf("png")!=-1 || filePath.indexOf("docx")!=-1 || filePath.indexOf("zip")!=-1){
                var arr=filePath.split('\\');
                var fileName=arr[arr.length-1];
                // that.config.fileName.html(fileName);
                that.uploadFile();
                
            }else{
                // that.config.fileName.html("");
                alert("您未上传文件，或者您上传文件类型有误！");
                return false 
            }
        })
    };
    this.uploadFile = function(){

        var that = this;
        var formData = new FormData();
        
        formData.append('file', $('#file')[0].files[0]);
        $.ajax({
            url: _ip+'/file/upload',
            type: 'POST',       
            cache: false,
            data: formData,
            processData: false,
            contentType: false
        })
        .done(function(res) {
            if(res.success){
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
    this.getAttachmentList = function(attachmentList){
        var h = '';
        var that = this;
        if(attachmentList.length >= 1){
          for(var k = 0 ; k < attachmentList.length; k++){
            if(attachmentList[k].indexOf('__') <= -1) return;
            var name = attachmentList[k].split('__')[1];
            h += '<li rel="'+attachmentList[k]+'"><div>'+name+(that.config.isDetail?'<a class="delete" href="'+_ip+'/file/download?path='+attachmentList[k]+'">下载</a>':'<span class="delete">删除</span>')+'</div></li>';
          }
          that.config.addAttachmentList.append(h); 
        }
    }
}
var attachment = new attachment();




