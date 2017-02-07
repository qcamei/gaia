var _ip = 'http://192.168.6.12:8080';

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
        var url = _ip+'/project/getProjectList';
        this.getListFirst.apply(this,[url,id,defaultId,isSelect,'needsource']);
        return this;
    },
    getComeSource: function(id, defaultId,isSelect){ // 2. 获取需求方列表
        var url = _ip+'/customer/getCustomerList';
        this.getListFirst.apply(this,[url,id,defaultId,isSelect,'sourcec']);
        return this;
    },
    getPlatformList: function(id, defaultId,isSelect){ // 3. 获取平台列表
        var url = _ip+'/original/getPlatList';
        this.getListSecond.apply(this,[url,id,defaultId,isSelect,'platform']);
        return this;
    },
    getFunctionList: function(id, defaultId,isSelect,platformList){ // 4. 获取功能列表 get
        
        var plat = $('#'+platformList).val() || 'APP';
        var url = _ip+'/original/getFeatureList?key='+plat;
        this.getListSecond.apply(this,[url,id,defaultId,isSelect,'fun']);
        return this;
    },
    getTypeList: function(id, defaultId,isSelect){ // 5. 获取需求类别 get
        var url = _ip+'/common/getRequireTypeList';
        this.getListSecond.apply(this,[url,id,defaultId,isSelect,'type']);
        return this;
    },
    getLevelList: function(id, defaultId,isSelect){ // 6. 获取紧急程度 get
        var url = _ip+'/common/getLevelList';
        this.getListSecond.apply(this,[url,id,defaultId,isSelect,'level']);
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
        this.getListSecond.apply(this,[url,id,defaultId,isSelect,'IssueStatus']);
        return this;
    },
    getNetWorkList: function(id, defaultId,isSelect){ // 12. 获取网络类型
        var url = _ip+'/common/getNetWorkList';
        this.getListSecond.apply(this,[url,id,defaultId,isSelect,'network']);
        return this;
    },
    getOcpList: function(id, defaultId,isSelect) { // 13. 获取组织架构
        var url = _ip+'/user/getOcpList';
        this.getListSecond.apply(this,[url,id,defaultId,isSelect,'Ocp']);
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




