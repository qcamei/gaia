
/*----------
 * 项目详情
 * creater:sunyan
 * creatTime:2017/01/13
 *-----------------------------*/


/*----------
 * 内容切换
 *-----------------------------*/
function detailItemTab(that,id){
 	var _this = $(that);
 	_this.addClass('current');
 	_this.siblings('li').removeClass('current');

 	var showCard = $('#'+id);
 	showCard.css({'display':'block'});
 	showCard.siblings('div.rel').css({'display':'none'});
}




/*----------
 * 客户资料：维护标签
 *-----------------------------*/

function manageTagSelf(){}
manageTagSelf.prototype = {
	initApi:function(api){
		// // if(api){

		// // }
		// this.upLoadUrl = _ip + api[0];  //更新标签：删除，添加
		// this.getExistTagUrl = _ip + api[1];     //获取已经存在的标签列表
		// this.getAll = _ip + api[2];     //获取全部列表
		// console.log(this.upLoadUrl);
		var that = this;
		that.upLoadUrl = _ip + '/pci/update';
		that.getExistTagUrl = _ip + '/tags/select';

		if(api){

			manageTagSelf.upLoadUrl =  '/cusinfo/update';
		}
		return this;
	},
	deleteTag: function(id,tag,src){
		var _id = $('#'+id);

		_id.on('click','li>span',function(){
			var data = {};
			var str  = [];
			var cstr = $(this).siblings('input').val();
			_id.find('li').each(function(k){
				var s = $(this).find('input').val();
				if(s != cstr){
					str.push(s);
				}
			})
			var that = this;
			// data['id'] = manageTagSelf.userId;
			data[tag]  = str.join(',');
			if(id.indexOf('card') >= 0){
	    		data['cusId'] = id.split('-')[4]; 
	    	}else{
	    		data['id'] = that.userId;
	    	}
			var url = _ip + src;
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
	            	if(data.message === 'LOGIN') {
	                    window.location.href = 'user-login.html';
	                    return false;
	                }
	                if(data.success){
	                }else{
	                    alert('删除失败, 请稍后重试！');
	                }
	            }
	        })
		    $(this).parent('li').remove();
		})
		return this;
	},
	addTag: function(id1,id2,id3,tagtype,showBtn,src){
		var _id1 = $('#'+id1);
		var _id2 = $('#'+id2);
		var _id3 = $('#'+id3);

		if (!showBtn) {
			_id1.on('click',function(){
			    _id1.css({'display':'none'});
			    _id2.css({'display':'block'});
			})

		}else{
			_id1.on('click',function(){
			    _id2.css({'display':'block'});
			})
		}
		
		_id2.on('click','input[type=button]',function(){
		    _id1.css({'display':'block'});
		    _id2.css({'display':'none'});
		})
		var that = this;
		_id2.on('click','input[value=确认]',function(){
		    var val = $(this).siblings('input[type=text]').val();
		    var arr = [];
		    	_id3.find('li').each(function(){
		    		arr.push($(this).find('input').val())
		    	})
		    	arr.push(val);
		    if(val != ''){
		    	var url = _ip + src;
		    	var data = {};
		    	// data['id'] = that.userId;
		    	data[tagtype] = arr.join(',');
		    	if(id1.indexOf('card') >= 0){
		    		data['cusId'] = id1.split('-')[3]; 
		    	}else{
		    		data['id'] = that.userId;
		    	}
		    	console.log(url);
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
		            	if(data.message === 'LOGIN') {
		                    window.location.href = 'user-login.html';
		                    return false;
		                }
		                if(data.success){
		                	var h = '<li>'+val+'<input type="hidden" value="'+val+'"/><span>&times;</span></li>';
		        			_id3.append(h);
		                }else{
		                    alert('添加失败, 请稍后重试！');
		                }
		            }
		        })
		    }
		})

		return this;
	},
	updataDec:function(id,dec,src){
		var _id = $('#'+id);
		_id.on('blur',function(){
			var url = _ip + src;
	    	var data = {};
	    	data['id'] = manageTagSelf.userId;
	    	// parseInt(id.split('-')[2])
	    	data[dec] = $(this).val();
	    	$.ajax({
	            url: url,
	            type : "POST",
	            xhrFields: {
	               withCredentials: true
	            },
	            crossDomain: true,
	            dataType: 'json',
		        contentType:'application/json',
		        data:JSON.stringify(data),
	            success: function(data) {
	            	if(data.message === 'LOGIN') {
	                    window.location.href = 'user-login.html';
	                    return false;
	                }
	                if(data.success){
	                	
	                }else{
	                    alert('添加失败, 请稍后重试！');
	                }
	            }
	        })
		})
		return this;
	},
	getExitDot:function(id1,id2,tagtype,src){
		var _id1  = $('#'+id1);
		var _id2  = $('#'+id2);
		// var url  = _ip + '/tags/select';
    	var data = {};
    	data['type'] = 2;
    	data['name'] = '';
    	$.ajax({
            url:manageTagSelf.getExistTagUrl,
            type : "POST",
           xhrFields: {
               withCredentials: true
            },
            crossDomain: true,
            dataType: 'json',
	        contentType:'application/json',
	        data:JSON.stringify(data),
            success: function(data) {
            	if(data.message === 'LOGIN') {
                    window.location.href = 'user-login.html';
                    return false;
                }
                if(data.success){
                	var data = data.data;
                	var h = '';
                	for(var k = 0, kk = data.length; k < kk ; k++){
                		h += '<li>'+data[k].name+'<input type="hidden" value="'+data[k].name+'"/><i></i></li>';
                	}
                	_id1.html(h);
                }else{
                    alert('获取已存在标签失败, 请稍后重试！');
                }
            }
        })
        _id1.on('click','li',function(){
        	var that = this;
        	var i = $(this).find('i');
        	var display = i.css('display');
        	var that = this;
        	if(display == 'block'){
        		i.css({'display':'none'});
        		manageTagSelf.deleteTag('tag-list-1');
        	}else{
        		i.css({'display':'block'});
        		var name = $(this).find('input').val()
        		var url = _ip + src;
		    	var data = {};
		    	// data['id'] = manageTagSelf.userId;
		    	data[tagtype] = name;
		    	
		    	if(id1.indexOf('card') >= 0){
		    		data['cusId'] = id1.split('-')[4]; 
		    	}else{
		    		data['id'] = 5;
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
		            	if(data.message === 'LOGIN') {
		                    window.location.href = 'user-login.html';
		                    return false;
		                }
		                if(data.success){
		                	_id2.append('<li>'+name+'<input type="hidden" value="'+name+'"/><span>&times;</span></li>');
		                }else{
		                    alert('添加失败, 请稍后重试！');
		                }
		            }
		        })
        	}
        })
		return this;
	},
	initTagDec:function(id1,id2,id3,id4,id5,id6,id7){
		var url  = _ip + '/pci/select?id=10';
		var that = this;
		$.ajax({
            url:url,
            type: 'GET',
        	dataType: 'jsonp',
        	contentType:'application/json',
        	jsonpCallback: 'initdata',
            success:function(json){
                if(json.success && json.data){
                	var data = json.data;
                	$('#'+id1).val(data.interestDesc || '');
                	$('#'+id2).val(data.managementDesc || '');
                	$('#'+id3).val(data.competitorDesc || '');
                	$('#'+id4).val(data.riskDesc || '');
                	that.userId = data.id;
                	manageTagSelf.proId  = data.proId;
                	var obj = {};
                	obj[id5] = data.interestTag ? data.interestTag.split(','):'';
                	obj[id6] = data.managementTag ? data.managementTag.split(','):'';
                	obj[id7] = data.competitorTag ? data.competitorTag.split(','):'';
                	for(var k in obj){
                		var dom  = $('#'+k);
                		var html = ''; 
                		if(obj[k] != ''){
	                		for(var i = 0 ; i < obj[k].length; i++){
	                			html += '<li>'+obj[k][i]+'<input type="hidden" value="'+obj[k][i]+'"/><span>&times;</span></li>';
	                		}
	                		dom.html(html);
                		}
                	}
                }else{
                    // alert('更新dd失败, 请稍后重试！');
                }
            }
        })
        return this;
	},
	closeOutTag:function(id1,id2){
		$('#'+id1).on('click',function(){
			$('#'+id2).css({'display':'none'})
		})
		return this;
	},
	getClientAddressBook:function(id){
		var url = _ip + '/cus/selectAll?id=3';
		$.ajax({
            url:url,
            type: 'GET',
            dataType: 'jsonp',
            contentType:'application/json',
            jsonpCallback: 'book',
            success: function(json) {
                var json = json.data;
                var h = '';
                for(var k = 0 , kk = json.length; k < kk; k++){
                    h += '<li class="clear">';
                    	h += '<div class="name">'+json[k].position+'</div>';
                    	 // <span class="fethure">不好沟通</span>
                        h += '<div class="text">'+json[k].name+' | <tel>'+json[k].tel+'</tel>';
                    // if()
                    h += '</div></li>';           
                }            
                $('#'+id).html(h);
            }
        })
        return this;
	}
}
manageTagSelf = new manageTagSelf();
var urlarr = ['/pci/update','/tags/select','/pci/select?id=10'];
manageTagSelf.initApi(urlarr)
			 .deleteTag('tag-list-1','interestTag','/pci/update') //删除标签：{展示兴趣点的ul的id，}
			 .deleteTag('tag-list-2','managementTag','/pci/update')
			 .deleteTag('tag-list-3','competitorTag','/pci/update') 
			 .addTag('addtag-1','addtag-input-1','tag-list-1','interestTag',true,'/pci/update')  //添加标签
			 .addTag('addtag-2','addtag-input-2','tag-list-2','managementTag',false,'/pci/update')
			 .addTag('addtag-3','addtag-input-3','tag-list-3','competitorTag',false,'/pci/update')
			 .updataDec('tag-dec-1','interestDesc','/pci/update')  // 更新描述
			 .updataDec('tag-dec-2','managementDesc','/pci/update')
			 .updataDec('tag-dec-3','competitorDesc','/pci/update')
			 .updataDec('tag-dec-4','riskDesc','/pci/update')  
			 .getExitDot('addtag-input-ul-1','tag-list-1','interestTag','/pci/update')  //获取已经存在的兴趣点：{兴趣点ul的id，展示兴趣点的ul的id}
			 .closeOutTag('close-exist-tag','addtag-input-1') //关闭已存在的兴趣点点ul
			 .initTagDec('tag-dec-1','tag-dec-2','tag-dec-3','tag-dec-4','tag-list-1','tag-list-2','tag-list-3') //初始化所有标签和描述
			 .getClientAddressBook('clientAddressBook');


/*----------
 * 客户信息卡
 *-----------------------------*/
function  clientDataCard(){}
clientDataCard.prototype = {
 	getAllCard: function(){  //获取所有客户信息卡
 		var url = _ip + '/cus/select?id=4';
		var that = this;
		$.ajax({
            url:url,
            type: 'GET',
        	dataType: 'jsonp',
        	contentType:'application/json',
        	jsonpCallback: 'iniata',
            success:function(json){
                if(json.success && json.data){
                	
                	that.creatCardDom(json.data);
            	}
            }
        })
        return this;
 	},
 	creatCardDom: function(json){
 		var h   = '';
 		var arr = [];
 		for(var i = 0, ii = json.length; i < ii ; i++){
 			var s = json[i].cus;
 			var b = json[i].cusinfo;
 			var n = s.id;
 			arr.push(n);
 			h += '<li>';
 				h += '<div class="head clear"><div class="left name"><span class="left">漆丽君</span><span class="left">院长</span>';
 					h += '<div class="left detail"><i onmouseover="clientInfoCard.showBaseInfo(this);" onmouseout="clientInfoCard.hideBaseInfo(this)"></i>';
 						h += '<div class="detail-slide"><table><tr><td><h6>角色</h6><span>'+s.role+'</span></td><td><h6>科室</h6><span>'+s.department+'</span></td></tr><tr><td><h6>联系电话</h6><span>'+s.tel+'</span></td><td><h6>短号</h6><span>'+s.shortTel+'</span></td></tr></table></div></div></div>';
 					h += '<div class="right edit" onmouseover="clientInfoCard.showOpero(this);" onmouseout="clientInfoCard.hideOpero(this)"><i></i><div class="edit-slide"><a onclick="clientInfoCard.editeClientCard(4)">编辑</a><a onclick="clientInfoCard.deleteClientCard('+n+')">删除</a></div></div></div>';	
 				h += '<ul class="clear dot-tab"><li class="current">兴趣点</li><li>抵触点</li><li>沟通要点</li><li>相关需求</li></ul>';
 				h += '<div class="tabcontener">';
 					// 兴趣点
 					h += '<div class="intresting contentchild" ><ul class="clear tag-list" id="card-intres-showtag-list-'+n+'">';
 						if(b.insterest){
	 						var ins = b.insterest.split(',');
	 						for(var x = 0, xx = ins.length; x < xx; x++){
	 							h += '<li>'+ins[x]+'<input type="hidden" value="'+ins[x]+'"/><span>&times;</span></li>';
	 						}
 						}
 						h += '</ul>';
 						h += '<div style="position: relative;"><div class="add-tag" id="card-intres-addtagbtn-'+n+'">+标签</div>';
 						h += '<div class="add-tag-exist-con" id="card-intres-taglayer-'+n+'"><a href="javascript:" class="close" id="card-intres-taglayer-close-'+n+'">关闭</a><ul class="tag-out-list" id="card-intres-taglayer-list-'+n+'"></ul></div></div></div>';
 					
 					// 抵触点
 					h += '<div class="contradict contentchild" style="display: none;"><ul class="clear tag-list" id="card-tradict-showtag-list-'+n+'">';
 						if(b.conflict){
	 						var conf = b.conflict.split(',');
	 						for(var k = 0, kk = conf.length; k < kk; k++){
	 							h += '<li>'+conf[k]+'<input type="hidden" value="'+conf[k]+'"/><span>&times;</span></li>';
	 						}
 						}
 						
 						h += '</ul>';
 						h += '<div class="add-tag" id="card-tradict-addtagbtn-'+n+'">+标签</div>';
 						h += '<div class="add-tag-con" id="card-intres-taginputbox-'+n+'"><input type="text" placeholder="标签名" /><input type="button" value="确认"><input type="button" value="取消"></div></div>';
 					
 					// 沟通要点
 					h += '<div class="contradict contentchild" style="display: none;"><ul class="clear tag-list" id="card-chat-showtag-list-'+n+'">';
 						if(b.communication){
	 						var chat = b.communication.split(',');
	 						for(var j = 0, jj = chat.length; j < jj; j++){
	 							h += '<li>'+chat[j]+'<input type="hidden" value="'+chat[j]+'"/><span>&times;</span></li>';
	 						}
 						}
 						
 						h += '</ul>';
 						h += '<div class="add-tag" id="card-chat-addtagbtn-'+n+'">+标签</div>';
 						h += '<div class="add-tag-con" id="card-chat-taginputbox-'+n+'"><input type="text" placeholder="标签名" /><input type="button" value="确认"><input type="button" value="取消"></div></div>';
 					
 					// 相关需求
 					h += '<div class="relativeNeed contentchild" style="display: none;"><ul class="relative-need-list" id="relative-need-list-'+n+'">';
 						// h += '<li><i></i><a>合同到期体系</a></li><li><i></i><a>合同到期体系</a></li>';
 						h += '</ul></div>'

 				h += '</div></li>';
 		}
 		h += '<li class="li-add-card"><a class="card-btn" onclick="clientInfoCard.clientCardDom()">添加客户</a></li>';
 		$('#all-card-list').html(h);

 		for(var k = 0, kk = arr.length; k < kk; k++){
 			var n = arr[k];
			
 			// 客户资料卡：兴趣点
 			manageTagSelf.initApi(urlarr)
 						 .addTag('card-intres-addtagbtn-'+n,'card-intres-taglayer-'+n,'card-intres-showtag-list-'+n,'insterest',true,'/cusinfo/update')  //添加标签
 						 .deleteTag('card-intres-showtag-list-'+n,'insterest','/cusinfo/update')
 						 .getExitDot('card-intres-taglayer-list-'+n,'card-intres-showtag-list-'+n,'insterest','/cusinfo/update')  //获取已经存在的兴趣点：{兴趣点ul的id，展示兴趣点的ul的id}
 						 .closeOutTag('card-intres-taglayer-close-'+n,'card-intres-taglayer-'+n)

 			// 客户资料卡：抵触点
			manageTagSelf.initApi(true)
						 .deleteTag("card-tradict-showtag-list-"+n,'conflict','/cusinfo/update')
					     .addTag('card-tradict-addtagbtn-'+n,'card-intres-taginputbox-'+n,'card-tradict-showtag-list-'+n,'conflict',false,'/cusinfo/update');

			// 客户资料卡：沟通要点
			manageTagSelf.initApi(true)
						 .deleteTag("card-chat-showtag-list-"+n,'communication','/cusinfo/update')
					     .addTag('card-chat-addtagbtn-'+n,'card-chat-taginputbox-'+n,'card-chat-showtag-list-'+n,'communication',false,'/cusinfo/update');

			//  客户资料卡：客户相关需求
			clientDataCard.getClientRelativePro('relative-need-list-'+n,'relative'+n);

 		}
 		clientInfoCard.contennerTab('dot-tab','tabcontener');
 	},
 	getClientRelativePro:function(id,callback){   //获取客户相关需求列表
 		var url = _ip + '/original/getRequireByProjectId?id='+id.split('-')[3];
		var that = this;
		$.ajax({
	        url:url,
            type: 'GET',
            dataType: 'jsonp',
            contentType:'application/json',
            jsonpCallback: callback,
	        success: function(json) {
	        	var data = json.data;
	        	var h = '';
	        	for(var k = 0, kk = data.length; k < kk; k++){
	        		h += '<li><i></i><a>'+data[k].name+'</a></li>';
	        	}
	        	$('#'+id).html(h);
	        }
	    })
 	}
}

clientDataCard = new clientDataCard();
clientDataCard.getAllCard();

/*----------
 * 客户信息卡：基本操作操作函数
 *-----------------------------*/
function clientInfoCard(){}
clientInfoCard.prototype = {
	showBaseInfo: function(that){
		$(that).siblings('.detail-slide').css({'display':'block'});
	},
	hideBaseInfo: function(that){
		$(that).siblings('.detail-slide').css({'display':'none'});
	},
	showOpero: function(that){
		$(that).find('.edit-slide').css({'display':'block'});
	},
	hideOpero: function(that){
		$(that).find('.edit-slide').css({'display':'none'});
	},
	contennerTab:function(class1){
		var dom1 = $('.'+class1);
		dom1.find('li').each(function(k){
			var _this = $(this);
			var index = _this.index();
			_this.mouseover(function(){
				_this.addClass('current');
				_this.siblings('li').removeClass('current');
				_this.parent('ul').siblings('.tabcontener').find('div.contentchild').css({'display':'none'});
				_this.parent('ul').siblings('.tabcontener').find('div.contentchild').eq(index).css({'display':'block'});

			})
		})
	},
	clientCardDom: function(url,id){
		var html = '';
        html += '<div class="client-card-box">';
            html += '<p class="card-title">添加客户<a href="javascript:$$.closeLayer()">&times;</a></p>';
            html += '<div class="card-box">';
                html += '<table class="card-input"><tbody>';
                    html += '<tr><td>职务</td><td><input id="name" class="short"></td></tr>';
                    html += '<tr><td>角色</td><td><input id="role" class="short"></td></tr>';
                    html += '<tr><td>姓名</td><td><input id="name" class="short"></td></tr>';
                    html += '<tr><td>科室</td><td><input id="department" class="short"></td></tr>';
                    html += '<tr><td>联系电话</td><td><input id="telphone" class="short"></td></tr>';
                    html += '<tr><td>短号</td><td><input id="short_tel" class="short"></td></tr></table></tbody></div>';
            html += '<div class="buttons"><a class="card-btn card-btn-gray" href="javascript:$$.closeLayer()">取消</a>&emsp;<a class="card-btn" onclick="clientInfoCard.addClientCard('+'\''+(url || '')+'\''+(id?','+id+'':'')+')">确认</a></div>'
        html += '</div>';
        $$.layer(html, {
            isShowMask: true,
            fixedBoxTop:'100px',
            zIndex:99,
            contentBoxWidth: "27%"
        });
	},
	addClientCard: function(url,id){
		var url = _ip + '/cus/insert';
		var data = {
			"name": $('#name').val(),    //必填
		    "role": $('#role').val(),
		    "position": "狂拽酷炫 ",     //必填
		    "department": $('#department').val(),
		    "tel": $('#telphone').val(),    //必填
		    "shortTel": $('#short_tel').val(), 
		    "projectId": 4    //必填
		}
		if(id){
			data['id'] = id;
		}
		$.ajax({
            url:url,
            type: 'POST',
            xhrFields: {
               withCredentials: true
            },
            crossDomain: true,
            dataType: 'json',
	        contentType:'application/json',
	        data:JSON.stringify(data),
            success: function(json) {
            	if(json.message === 'LOGIN') {
                    window.location.href = 'user-login.html';
                    return false;
                }
                if(json.success){
                	clientDataCard.getAllCard();
                	$$.closeLayer()
                }else{
                	alert('添加失败，稍后重试！')
                }
            }
        })
	},
	deleteClientCard:function(id){
		var url = _ip + '/pci/delete?id='+id;
		$.ajax({
	        url:url,
	        type: 'GET',
	        dataType: 'jsonp',
	        contentType:'application/json',
	        jsonpCallback: 'pcide',
	        success: function(json) {
	        	return;
	        	if(json.success){
	        		clientDataCard.getAllCard()
	        	}else{
	        		alert('删除失败，稍后重试！')
	        	}
	        }
	    })
	},
	editeClientCard:function(id){

		var url = '/cus/update';
		this.clientCardDom(url,id);
	}
}
clientInfoCard = new clientInfoCard();

clientInfoCard.contennerTab('dot-tab');

/*----------
 * 预售方式
 *-----------------------------*/
function presell(){}
presell.prototype = {
	showList:$('.show-list'),
	edite:$('.edite-show-list'),
	cancleEditSell:$('#cancleEditSell'),
	sureEditSell:$('#sureEditSell'),
	editeSaleType:$('#editeSaleType'),
	init:function(){
		var that = this;
		this.editeSaleType.click(function(){
			that.showEdite(that);
		})
		this.cancleEditSell.click(function(){
			that.showInfo(that);
		})
		this.sureEditSell.click(function(){
			that.uploadInfo();
			that.showInfo(that);
		})
		
		return this;
	},
	showInfo:function(that){
		that.showList.css({'display':'block'});
    	that.edite.css({'display':'none'});	
    },
	showEdite:function(that){
		that.showList.css({'display':'none'});
    	that.edite.css({'display':'block'});
	},
	getInfo:function(id){
		var url = _ip + '/salebgt/select?id=5';
		$.ajax({
            url:url,
            type: 'GET',
            dataType: 'jsonp',
            contentType:'application/json',
            jsonpCallback: 'sell',
            success: function(json) {

                var json = json.data;
                presell.userId = json.id;
                var h = '';
                	h += '<tr><td colspan="2">销售方式：<span class="type">'+json.type+'</span></td></tr>';
                    h += '<tr><td width="40%"><div class="name">预算：</div><div class="text"><span class="num-style">'+json.budget+'</span>&nbsp;万元</div></td>';
                    	h += '<td><div class="name">采购时间：</div><div class="text"><span class="num-style">'+json.year+'</span>&nbsp;年&nbsp;<span class="num-style">'+json.month+'</span>&nbsp;月</div></td></tr>';
                    h += '<tr><td colspan="2">'+json.discribe+'</td></tr>';     
                $('#'+id).html(h);
            }
        })
        return this;
	},
	uploadInfo:function(){
		var url = _ip + '/salebgt/update';
		var time = $('#proTime').val()+' 00:00:00:00';
		var date = new Date(time).getTime();
    	var data = {
    		"id": presell.userId,
		    "type": $('#sellTypeSelect').val(),
		    "budget": parseInt($('#budget').val()),
		    "proTime": date,
		    "discribe": $('#discribe').val(),
		    "contacts": $('#contacts').val(),
		    "tel": parseInt($('#tel').val())
    	};
    	var that = this;
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
            	if(data.message === 'LOGIN') {
                    window.location.href = 'user-login.html';
                    return false;
                }
                if(data.success){
                	that.getInfo('sellBuget');
                }else{
                    alert('添加失败, 请稍后重试！');
                }
            }
        })
		return this;
	}
}
var presell = new presell();
presell.init().getInfo('sellBuget');


/*----------
 * 商务进度
 *-----------------------------*/
function businessProgress(){}
businessProgress.prototype = {
	addcordbtn:$('#addcordbtn'),
	addcordcontent:$('#addcordcontent'),
	surecord:$('#surecord'),
	canclecord:$('#canclecord'),
	busCordTable:$('#busCordTable'),
	init:function(){
		this.addPeople();
		this.getBusCordList();
		var that = this;
		this.addcordbtn.click(function(){
			that.showInfo(that);
		})
		this.canclecord.click(function(){
			that.showEdite(that);
		})
		this.surecord.click(function(){
			that.insertBusInfo();
		})
		return this;
	},
	showInfo:function(that){
		that.addcordcontent.css({'display':''});
    	that.addcordbtn.css({'display':'none'});	
    },
	showEdite:function(that){
		that.addcordcontent.css({'display':'none'});
    	that.addcordbtn.css({'display':'inline-block'});
	},
	addPeople:function(){
		$('#addPeopleBtn').on('click',function(){
			$('#addPeopleSelect').css({'display':'block'})
		})
		$('#addPeopleClose').on('click',function(){
			$('#addPeopleSelect').css({'display':'none'})
		})
		$('#addPeopleUl').on('click','li',function(){

		})
	},
	getExistPeople:function(){

	},
	insertBusInfo:function(){
		var url = _ip + '/busprogs/insert';
    	var data = {
    		  "id": '',
		      "proId": 6,
		      "type": $('#visitTypeList').val(),
		      "visitResult": $('#visitResultList').val(),
		      "level": $('#bussTypeList').val(),
		      "progress": $('#bussTypeList').val(),
		      "emergency": $('#emergencyList').val(),
		      "visitId": 1,
		      "nextFocus": $('#nextFocus').val(),
		      "nextFollow": $('#nextFollow').val(),
		      "remark": $('#remark').val(),
		      "creater": 2,
		      "createTime": null,
		      "modifyTime": null
    	};
    	var that = this;
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
            	if(data.message === 'LOGIN') {
                    window.location.href = 'user-login.html';
                    return false;
                }
                if(data.success){
                	that.getBusCordList();
                	that.showEdite(that);
                }else{
                    alert('添加失败, 请稍后重试！');
                }
            }
        })
		return this;
	},

	getBusCordList: function(id){ 
		var url = _ip + '/busprogs/selectAll?id=6';
		var that = this;
		$.ajax({
            url:url,
            type: 'GET',
            dataType: 'jsonp',
            contentType:'application/json',
            jsonpCallback: 'busscord',
            success: function(json) {
                var json = json.data;
                var h = '';
                for(var k in json){
                	h += '<thead><tr class="status"><td width="20"><span class="s-2"></span></td><td><div class="status-head clear">';
                		h += '<p class="left">'+k+'</p>';
                		h += '<p class="right">'+json[k].time+'</p></div></td></tr></thead>';
                	h += '<tbody>';
                	for(var i = 0, ii = json[k].data.length; i < ii; i++){
                		var data = json[k].data[i];
                		h += '<tr><td><span class="line"></span><span class="circle"></span></td>';
                			h += '<td><div class="cord-detail">';
                				h += '<div class="t"><i></i><span>'+'</span><span>晓丽</span><span>'+data.createTime+'</span></div>';
                				h += '<ul class="clear key-list"><li>'+data.type+'</li><li>'+data.level+'</li><li>'+data.visitResult+'</li><li>'+data.emergency+'</li></ul>';
                				
                				if(data.nextFocus || data.nextFollow ){
                					h += '<p class="dec">'+data.remark+'</p>';
                					h += '<div class="plan"><span class="title">下次计划</span>';
                					if(data.nextFocus){
                						h += '<div class="paper">'+data.nextFocus+'</div>'; //<span>&emsp;&emsp;2017/01/08&nbsp;12:34</span>
                					}
                					if(data.nextFollow){
                						h += '<div class="paper">'+data.nextFollow+'</div>';
                					}
                				}
                			h += '</div></td></tr>';
                	}
                	h += '</tbody>'
                }
                         
                that.busCordTable.html(h);
            }
        })
        return this;
	}
}
businessProgress = new businessProgress();
businessProgress.init();


/*----------
 * 获取项目需求列表
 *-----------------------------*/
function getCardProList(){
	var url = _ip + '/original/getRequireByCustomer?id=1';
	var that = this;
	$.ajax({
        url:url,
        type: 'GET',
        dataType: 'jsonp',
        contentType:'application/json',
        jsonpCallback: 'cardpro',
        success: function(json) {
        	var data = json.data;
        	var h = '';
        	for(var k = 0, kk = data.length; k < kk; k++){
        		h += '<tr><td><a href="pm-need-detail-mems.html?id='+data[k].id+'" class="link">'+data[k].name+'</a></td>';
                    h += '<td>'+data[k].customerName+'</td>';
                    h += '<td>'+data[k].level+'</td>';
                    h += '<td>'+data[k].creater+'</td>';
                    h += '<td>'+data[k].createTime+'</td>';
                    h += '<td>'+data[k].status+'</td></tr>';
        	}
        	$('#proNeedList').find('tbody').html(h);
        }
    })
}
getCardProList();


