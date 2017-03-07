
/*----------
 * 项目详情
 * creater:sunyan
 * creatTime:2017/01/13
 *-----------------------------*/

// 获取项目id
var globleProjectId = getUrlId();


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

// globleRoleId = $.cookie('userrole')


/*----------
 * 客户资料：维护标签
 *-----------------------------*/

function manageTagSelf(){}
manageTagSelf.prototype = {
	initApi:function(api){
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
		var that = this;
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
	                    location.href = 'user-login.html';
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
	addTag: function(id1,id2,id3,id4,tagtype,showBtn,src,srcget,typeId,cid){
		var _id1 = $('#'+id1);
		var _id2 = $('#'+id2);
		var _id3 = $('#'+id3);
		var that = this;
		if (!showBtn) {
			_id1.on('click',function(){
			    _id1.css({'display':'none'});
			    _id2.css({'display':'block'});
			})

		}else{
			_id1.on('click',function(){
			    _id2.css({'display':'block'});
				that.getTagsBank(id4,srcget,typeId,cid);
			})
		}
		
		_id2.on('click','input[value=取消]',function(){
		    _id1.css({'display':'block'});
		    _id2.css({'display':'none'});
		})
		var that = this;
		_id2.on('click','input[value=确认]',function(){
			var _input = $(this).siblings('input[type=text]');
		    var val = _input.val();
			if(val.length >= 12){
				alert('不能超过12个字符');
				return;
			}
			_id1.css({'display':'block'});
			_id2.css({'display':'none'});
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
							_input.val('');
		        			_id3.append(h);
		                }else{
		                    alert(data.message);
		                }
		            }
		        })
		    }
		})

		return this;
	},
	updataDec:function(id,dec,src){
		var _id = $('#'+id);
		var that = this;
		_id.on('blur',function(){
			var url = _ip + src;
	    	var data = {};
	    	data['id'] = that.userId;
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
	                if(!data.success){
						alert(data.message);
	                }
	            }
	        })
		})
		return this;
	},
	getTagsBank:function (id1,src,typeId,cid) {
		var _id1  = $('#'+id1);
		var url  = _ip + src;
		var data = {};
		data['type'] = typeId || 1;
		if(cid){
			data['cid'] = cid;
		}else{
			data['pid'] = parseInt(globleProjectId);
		}
		data['name'] = '';
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
					var data = data.data;
					var h = '';
					for(var k = 0, kk = data.length; k < kk ; k++){
						h += '<li>'+data[k].name+'<input type="hidden" value="'+data[k].name+'"/><i></i></li>';
					}
					_id1.html(h);
				}else{
					alert(data.message);
				}
			}
		})
	},
	getExitDot:function(id1,id2,tagtype,src,srcget,typeId,cid){
		this.getTagsBank(id1,srcget,typeId,cid);
		var _id1  = $('#'+id1);
		var _id2  = $('#'+id2);
        var that = this;
		var url  = _ip + src;

        _id1.on('click','li',function(){
        	var that = this;
        	var i = $(this).find('i');
        	var display = i.css('display');
        	if(display == 'block'){
        		i.css({'display':'none'});

        	}else{
        		i.css({'display':'block'});
				var name = $(this).find('input').val()
				// var url = _ip + '/pci/update';
				var data = {};
				var str  = [];
				var isre = false;
				_id2.find('li').each(function(k){
					var s = $(this).find('input').val();
					if(s != name){
						str.push(s);
						isre = false;
					}else{
						isre = true;

					}
				})

				if(!isre){
					str.push(name);
				}else{
					return false;
				}
		    	data[tagtype] = str.join(',');

		    	if(id1.indexOf('card') >= 0){
		    		data['cusId'] = id1.split('-')[4]; 
		    	}else{


                    data['id'] = canuserId; //that.userId
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
		var url  = _ip + '/pci/select?id='+globleProjectId;
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
					window.canuserId = data.id;
					manageTagSelf.proId  = data.proId;

					// var that = this;//判断是否是项目成员
					var url  = _ip+'/puser/select';
					var dataPara = {
						id: getUrlId()
					};
					var isShowMark = false;
					var arr = [];
					organizeAjaxGet(url, dataPara, 'xxx', function(memberJson) {
						if (memberJson.success) {
							arr.push(memberJson.data.owner.id);
							for(var k = 0; k < memberJson.data.list.length; k++){
								arr.push(memberJson.data.list[k].id);
							}
							var isProMember = false;
							for(var n = 0; n < arr.length; n++){
								if(that.userId == arr[n]){
									isProMember = true;
									break;
								}
							}

							if(globleRoleId == 9 || globleRoleId == 3){
								isShowMark = true;
							}
							if( (globleRoleId == 0 || globleRoleId == 1 || globleRoleId == 2) && isProMember ){
								isShowMark = true;
							}


							var obj = {};
							obj[id5] = data.interestTag ? data.interestTag.split(','):'';
							obj[id6] = data.managementTag ? data.managementTag.split(','):'';
							obj[id7] = data.competitorTag ? data.competitorTag.split(','):'';
							// console.log(isShowMark)
							for(var k in obj){
								var dom  = $('#'+k);
								var html = '';
								if(obj[k] != ''){
									for(var i = 0 ; i < obj[k].length; i++){
										html += '<li>'+obj[k][i]+'<input type="hidden" value="'+obj[k][i]+'"/>'+(isShowMark?'<span>&times;</span>':'')+'</li>';
									}
									dom.html(html);

								}
							}

						}

					})






                }else{
                    // alert('更新dd失败, 请稍后重试！');
                }
            }
        })
        return this;
	},
	closeOutTag:function(id1,id2){
		$('#'+id1).on('click',function(){
			$('#'+id2).css({'display':'none'}).find('.tag-out-list').html('');
		});
		return this;
	},
	getClientAddressBook:function(id){
		var url = _ip + '/cus/selectAll?id='+globleProjectId;
		$.ajax({
            url:url,
            type: 'GET',
            dataType: 'jsonp',
            contentType:'application/json',
            jsonpCallback: 'book',
            success: function(json) {
                var json = json.data;
                var h = '';
                if(!json || json.length <= 0) return;
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
var urlarr = ['/pci/update','/tags/select','/pci/select?id='+globleProjectId];
manageTagSelf.initApi(urlarr)
		     .deleteTag('tag-list-1','interestTag','/pci/update') //删除标签：{展示兴趣点的ul的id，}
			 .deleteTag('tag-list-2','managementTag','/pci/update')
			 .deleteTag('tag-list-3','competitorTag','/pci/update')

			 .addTag('addtag-1','addtag-input-1','tag-list-1','addtag-input-ul-1','interestTag',true,'/pci/update','/tags/select',1)  //添加标签
			 .addTag('addtag-2','addtag-input-2','tag-list-2','addtag-input-ul-2','managementTag',true,'/pci/update','/tags/select',2)
			 .addTag('addtag-3','addtag-input-3','tag-list-3','addtag-input-ul-3','competitorTag',true,'/pci/update','/tags/select',3)

			 .updataDec('tag-dec-1','interestDesc','/pci/update')  // 更新描述
			 .updataDec('tag-dec-2','managementDesc','/pci/update')
			 .updataDec('tag-dec-3','competitorDesc','/pci/update')
			 .updataDec('tag-dec-4','riskDesc','/pci/update')

			 .getExitDot('addtag-input-ul-1','tag-list-1','interestTag','/pci/update','/tags/select',1)  //获取已经存在的兴趣点：{兴趣点ul的id，展示兴趣点的ul的id}
             .getExitDot('addtag-input-ul-2','tag-list-2','managementTag','/pci/update','/tags/select',2)
             .getExitDot('addtag-input-ul-3','tag-list-3','competitorTag','/pci/update','/tags/select',3)

             .closeOutTag('close-exist-tag','addtag-input-1') //关闭已存在的兴趣点点ul
             .closeOutTag('close-exist-tag-2','addtag-input-2')
             .closeOutTag('close-exist-tag-3','addtag-input-3')
			 .initTagDec('tag-dec-1','tag-dec-2','tag-dec-3','tag-dec-4','tag-list-1','tag-list-2','tag-list-3') //初始化所有标签和描述
			 .getClientAddressBook('clientAddressBook');


/*----------
 * 客户信息卡
 *-----------------------------*/
function  clientDataCard(){}
clientDataCard.prototype = {
 	getAllCard: function(){  //获取所有客户信息卡
 		var url = _ip + '/cus/select?id='+globleProjectId;
		var that = this;
		that.mark = false;
		$.ajax({
            url:url,
            type: 'GET',
        	dataType: 'jsonp',
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
        	contentType:'application/json',
        	jsonpCallback: 'iniata',
            success:function(json){
				console.log(json)
                if(json.success){
					// that.creatCardDom(json.data,that.mark);
					var url  = _ip+'/puser/select';
					var datap = {
						id: getUrlId()
					};

					var arrn = [];
					organizeAjaxGet(url, datap, 'gg', function(data) {
						console.log(data);
						if (data.success) {
							arrn.push(data.data.owner.id);
							for(var k = 0; k < data.data.list.length; k++){
								arrn.push(data.data.list[k].id);
							}
							var isProMember = false;
							for(var n = 0; n < arrn.length; n++){
								if(globleUserId == arrn[n]){
									isProMember = true;
									break;
								}
							}
							if(globleRoleId == 9 || globleRoleId == 3){
								that.mark = true;
							}
							if( (globleRoleId == 0 || globleRoleId == 1 || globleRoleId == 2) && isProMember ){
								that.mark = true;
							}

							that.creatCardDom(json.data,that.mark);
						}


					})

            	}
            }
        })
        return this;
 	},
 	creatCardDom: function(json,mark){

 		var h   = '';
 		var arr = [];
 		for(var i = 0, ii = json.length; i < ii ; i++){
 			var s = json[i].cus;
 			var b = json[i].cusinfo;
 			var n = s.id;
 			arr.push(n);
 			h += '<li>';
 				h += '<div class="head clear"><div class="left name"><span class="left">'+s.name+'</span><span class="left">'+s.position+'</span>';
 					h += '<div class="left detail"><i onmouseover="clientInfoCard.showBaseInfo(this);" onmouseout="clientInfoCard.hideBaseInfo(this)"></i>';
 						h += '<div class="detail-slide"><table><tr><td><h6>角色</h6><span>'+s.role+'</span></td><td><h6>科室</h6><span>'+s.department+'</span></td></tr><tr><td><h6>联系电话</h6><span>'+s.tel+'</span></td><td><h6>短号</h6><span>'+s.shortTel+'</span></td></tr></table></div></div></div>';
 					h += '<div class="right edit" onmouseover="clientInfoCard.showOpero(this);" onmouseout="clientInfoCard.hideOpero(this)"><i></i>';
					if(mark){
						h += '<div class="edit-slide"><a onclick="clientInfoCard.editeClientCard('+n+')">编辑</a><a onclick="clientInfoCard.deleteClientCard('+n+')">删除</a></div>';
					}
				h += '</div></div>'
 				h += '<ul class="clear dot-tab"><li class="current">兴趣点</li><li>抵触点</li><li>沟通要点</li><li>相关需求</li></ul>';
 				h += '<div class="tabcontener">';
 					// 兴趣点
 					h += '<div class="intresting contentchild" ><ul class="clear tag-list" id="card-intres-showtag-list-'+n+'">';
 						if(b.insterest){
	 						var ins = b.insterest.split(',');
	 						for(var x = 0, xx = ins.length; x < xx; x++){
	 							h += '<li>'+ins[x]+'<input type="hidden" value="'+ins[x]+'"/>'+(mark?'<span>&times;</span>':'')+'</li>';
	 						}
 						}
 						h += '</ul>';
						if(mark){
							h += '<div style="position: relative;"><div class="add-tag" id="card-intres-addtagbtn-'+n+'">+标签</div>';
							h += '<div class="add-tag-exist-con" id="card-intres-taglayer-'+n+'"><a href="javascript:" class="close" id="card-intres-taglayer-close-'+n+'">关闭</a><ul class="tag-out-list" id="card-intres-taglayer-list-'+n+'"></ul></div></div></div>';

						}

 					// 抵触点
 					h += '<div class="contradict contentchild" style="display: none;"><ul class="clear tag-list" id="card-tradict-showtag-list-'+n+'">';
 						if(b.conflict){
	 						var conf = b.conflict.split(',');
	 						for(var k = 0, kk = conf.length; k < kk; k++){
	 							h += '<li>'+conf[k]+'<input type="hidden" value="'+conf[k]+'"/><span>&times;</span></li>';
	 						}
 						}
 						
 						h += '</ul>';
						if(mark){
							h += '<div class="add-tag" id="card-tradict-addtagbtn-'+n+'">+标签</div>';
							h += '<div class="add-tag-con" id="card-intres-taginputbox-'+n+'"><input type="text" placeholder="标签名" /><input type="button" value="确认"><input type="button" value="取消"></div></div>';
						}

 					// 沟通要点
 					h += '<div class="contradict contentchild" style="display: none;"><ul class="clear tag-list" id="card-chat-showtag-list-'+n+'">';
 						if(b.communication){
	 						var chat = b.communication.split(',');
	 						for(var j = 0, jj = chat.length; j < jj; j++){
	 							h += '<li>'+chat[j]+'<input type="hidden" value="'+chat[j]+'"/><span>&times;</span></li>';
	 						}
 						}
 						
 						h += '</ul>';
						if(mark){
							h += '<div class="add-tag" id="card-chat-addtagbtn-'+n+'">+标签</div>';
							h += '<div class="add-tag-con" id="card-chat-taginputbox-'+n+'"><input type="text" placeholder="标签名" /><input type="button" value="确认"><input type="button" value="取消"></div></div>';

						}

 					// 相关需求
 					h += '<div class="relativeNeed contentchild" style="display: none;"><ul class="relative-need-list" id="relative-need-list-'+n+'">';
 						// h += '<li><i></i><a>合同到期体系</a></li><li><i></i><a>合同到期体系</a></li>';
 						h += '</ul></div>'

 				h += '</div></li>';
 		}
 		//此处的权限没有加
		if(mark){
			h += '<li class="li-add-card"><a class="card-btn" onclick="clientInfoCard.clientCardDom()">添加客户</a></li>';
		}
 		$('#all-card-list').html(h);

 		for(var k = 0, kk = arr.length; k < kk; k++){
 			var n = arr[k];
			
 			// 客户资料卡：兴趣点
 			manageTagSelf.initApi(urlarr)
 						 .addTag('card-intres-addtagbtn-'+n,'card-intres-taglayer-'+n,'card-intres-showtag-list-'+n,'card-intres-taglayer-list-'+n,'insterest',true,'/cusinfo/update','/tags/select',1,n)  //添加标签
 						 .deleteTag('card-intres-showtag-list-'+n,'insterest','/cusinfo/update')
 						 .getExitDot('card-intres-taglayer-list-'+n,'card-intres-showtag-list-'+n,'insterest','/cusinfo/update','/tags/select',1,n)  //获取已经存在的兴趣点：{兴趣点ul的id，展示兴趣点的ul的id}
 						 .closeOutTag('card-intres-taglayer-close-'+n,'card-intres-taglayer-'+n)

 			// 客户资料卡：抵触点
			manageTagSelf.initApi(true)
						 .deleteTag("card-tradict-showtag-list-"+n,'conflict','/cusinfo/update')
					     .addTag('card-tradict-addtagbtn-'+n,'card-intres-taginputbox-'+n,'card-tradict-showtag-list-'+n,'card-tradict-showtag-list-'+n,'conflict',false,'/cusinfo/update');

			// 客户资料卡：沟通要点
			manageTagSelf.initApi(true)
						 .deleteTag("card-chat-showtag-list-"+n,'communication','/cusinfo/update')
					     .addTag('card-chat-addtagbtn-'+n,'card-chat-taginputbox-'+n,'card-chat-showtag-list-'+n,'card-chat-showtag-list-'+n,'communication',false,'/cusinfo/update');

			//  客户资料卡：客户相关需求
			clientDataCard.getClientRelativePro('relative-need-list-'+n,'relative'+n);

 		}
 		clientInfoCard.contennerTab('dot-tab','tabcontener');
 	},
 	getClientRelativePro:function(id,callback){   //获取客户相关需求列表
 		var url = _ip + '/original/getRequireByCustomer?id='+id.split('-')[3];
		var that = this;
		$.ajax({
	        url:url,
            type: 'GET',
            dataType: 'jsonp',
            contentType:'application/json',
            jsonpCallback: callback,
	        success: function(json) {
	        	var data = json.data;
				if(data.length == 0) return;
	        	var h = '';
	        	for(var k = 0, kk = data.length; k < kk; k++){
	        		h += '<li><i></i><a href="pm-need-detail-mems.html?id='+data[k].id+'">'+data[k].name+'</a></li>';
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
	    if(url && id){
            $.ajax({
                url: _ip+'/cus/sel?cusid='+id,
                type: 'GET',
                dataType: 'jsonp',
                contentType: 'application/json',
                jsonpCallback: 'cusedit',
                success: function (json) {
                    if (json.success) {

                        var json = json.data;
                        var html = '';
                        html += '<div class="client-card-box">';
                        html += '<p class="card-title">编辑客户信息卡<a href="javascript:$$.closeLayer()">&times;</a></p>';
                        html += '<div class="card-box">';
                        html += '<table class="card-input"><tbody>';
                        html += '<tr><td><span class="red-start">*</span>职务</td><td><input id="position" placeholder="必填" value="'+json.position+'" class="short"></td></tr>';
                        html += '<tr><td>角色</td><td><input id="role" value="'+json.role+'" class="short"></td></tr>';
                        html += '<tr><td><span class="red-start">*</span>姓名</td><td><input id="name" placeholder="必填" value="'+json.name+'" class="short"></td></tr>';
                        html += '<tr><td>科室</td><td><input id="department" value="'+json.department+'" class="short"></td></tr>';
                        html += '<tr><td><span class="red-start">*</span>联系电话</td><td><input id="telphone" placeholder="必填" value="'+json.tel+'" class="short"></td></tr>';
                        html += '<tr><td>短号</td><td><input id="short_tel" value="'+json.shortTel+'" class="short"></td></tr></table></tbody></div>';
                        html += '<div class="buttons"><a class="card-btn card-btn-gray" href="javascript:$$.closeLayer()">取消</a>&emsp;<a class="card-btn" onclick="clientInfoCard.updateClientCard('+id+')">确认</a></div>'
                        html += '</div>';
                        $$.layer(html, {
                            isShowMask: true,
                            fixedBoxTop:'100px',
                            zIndex:99,
                            contentBoxWidth: "27%"
                        });

                    }
                }
            })
        }else{
            var html = '';
            html += '<div class="client-card-box">';
            html += '<p class="card-title">添加客户信息卡<a href="javascript:$$.closeLayer()">&times;</a></p>';
            html += '<div class="card-box">';
            html += '<table class="card-input"><tbody>';
            html += '<tr><td><span class="red-start">*</span>职务</td><td><input id="position" placeholder="必填" class="short"></td></tr>';
            html += '<tr><td>角色</td><td><input id="role" class="short"></td></tr>';
            html += '<tr><td><span class="red-start">*</span>姓名</td><td><input id="name" placeholder="必填" class="short"></td></tr>';
            html += '<tr><td>科室</td><td><input id="department" class="short"></td></tr>';
            html += '<tr><td><span class="red-start">*</span>联系电话</td><td><input id="telphone" placeholder="必填" class="short"></td></tr>';
            html += '<tr><td>短号</td><td><input id="short_tel" class="short"></td></tr></table></tbody></div>';
            html += '<div class="buttons"><a class="card-btn card-btn-gray" href="javascript:$$.closeLayer()">取消</a>&emsp;<a class="card-btn" onclick="clientInfoCard.addClientCard('+'\''+(url || '')+'\''+(id?','+id+'':'')+')">确认</a></div>'
            html += '</div>';
            $$.layer(html, {
                isShowMask: true,
                fixedBoxTop:'100px',
                zIndex:99,
                contentBoxWidth: "27%"
            });
        }

	},
	addClientCard: function(url,id){
		var url = _ip + '/cus/insert';
        var position = $('#position').val();
        if(position == ''){
            $('#position').addClass('error-i');
            return;
        }
        var name = $('#name').val();
        if(name == ''){
            $('#name').addClass('error-i');
            return;
        }
        var tel = $('#telphone').val();
        if(!/^1(\d){10}$/.test(tel)){
            $('#telphone').addClass('error-i');
            return;
        }
		var data = {
			"name": $('#name').val(),    //必填
		    "role": $('#role').val(),
		    "position": $('#position').val(),     //必填
		    "department": $('#department').val(),
		    "tel": $('#telphone').val(),    //必填
		    "shortTel": $('#short_tel').val(), 
		    "projectId": globleProjectId    //必填
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
    updateClientCard:function (id) {
        var url = _ip + '/cus/insert';
        var position = $('#position').val();
        if(position == ''){
            $('#position').addClass('error-i');
            return;
        }
        var name = $('#name').val();
        if(name == ''){
            $('#name').addClass('error-i');
            return;
        }
        var tel = $('#telphone').val();
        if(!/^1(\d){10}$/.test(tel)){
            $('#telphone').addClass('error-i');
            return;
        }
        var url = _ip + '/cus/update';
        var data = {
            "name": $('#name').val(),    //必填
            "role": $('#role').val(),
            "position": $('#position').val(),     //必填
            "department": $('#department').val(),
            "tel": $('#telphone').val(),    //必填
            "shortTel": $('#short_tel').val(),
            "projectId": globleProjectId    //必填
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
                    alert(json.message);
                }
            }
        })
    },
	deleteClientCard:function(id){
		var url = _ip + '/cus/delete?id='+id;
		$.ajax({
	        url:url,
	        type: 'GET',
	        dataType: 'jsonp',
	        contentType:'application/json',
	        jsonpCallback: 'pcide',
	        success: function(json) {
	        	if(json.success){
	        		clientDataCard.getAllCard()
	        	}else{
	        		alert(json.message)
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
		var url = _ip + '/salebgt/select?id='+globleProjectId;
		$.ajax({
            url:url,
            type: 'GET',
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
            dataType: 'jsonp',
            contentType:'application/json',
            jsonpCallback: 'sell',
            success: function(json) {
				if(!json.success) return;
                var json = json.data;
                presell.userId = json.id;
				// console.log(json.proYear)
                var h = '';
                	h += '<tr><td colspan="2">销售方式：'+ (json.type?'<span class="type">'+json.type+'</span>':'') +'</td></tr>';
                    h += '<tr><td width="40%"><div class="name">预算：</div><div class="text"><span class="num-style">'+(json.budget || 0)+'</span>&nbsp;万元</div></td>';
                    	h += '<td><div class="name">采购时间：</div><div class="text"><span class="num-style">'+(json.proYear || 0)+'</span>&nbsp;年&nbsp;<span class="num-style">'+(json.proMonth || 0)+'</span>&nbsp;月</div></td></tr>';
					h += '<tr><td><div class="name">预计收款时间：</div><div class="text"><span class="num-style">'+(json.payYear || 0)+'</span>&nbsp;年&nbsp;<span class="num-style">'+(json.payMonth || 0) +'</span>&nbsp;月</div></td></tr>';
				h += '<tr><td colspan="2">'+(json.discribe || '')+'</td></tr>';
                $('#'+id).html(h);

                $('#contacts').val(json.contacts);
                $('#tel').val(json.tel);
                $('#budget').val(json.budget);
                // $('#proTime').val(json.proYear+'-'+json.proMonth);
				// $('#getMoneyTime').val(json.payYear+'-'+json.payMonth)
                $('#discribe').val(json.discribe)
            }
        })
        return this;
	},
	uploadInfo:function(){
		var url = _ip + '/salebgt/update';
		var time = $('#proTime').val()==''?null:$('#proTime').val()+'-01 00:00:00:00';
		var time2 = $('#getMoneyTime').val()==''?null:$('#getMoneyTime').val()+'-01 00:00:00:00';
		// var date = new Date(time).getTime();
        $('#tel').focus(function(){
            $('#tel').removeClass('error-i');
        })
        $('#budget').focus(function(){
            $('#budget').removeClass('error-i');
        })

        var tel = $('#tel').val();
        if(tel != '' && !/^1(\d){10}$/.test(tel)){
            $('#tel').addClass('error-i');
            return false;
        }
        var budget = $('#budget').val();
        // if(budget != '' && !/(\d)/.test(budget)){
        //     $('#budget').addClass('error-i');
        //     return false;
        // }

    	var data = {
    		"id": presell.userId,
		    "type": $('#sellTypeSelect').val() || null,
		    "budget": $('#budget').val() || null,
		    "proTime": time,
			"expectPaymentTime":time2,
		    "discribe": $('#discribe').val() || null,
		    "contacts": $('#contacts').val() || null,
		    "tel": parseInt($('#tel').val()) || null
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
                    _API.getSellType('sellTypeSelect',$('#sellTypeSelect').val(),true);
                    that.showInfo(that);
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
    addPeopleUl:$('#addPeopleUl'),
    addPeopleList:$('#addPeopleList'),
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
        that.getExistPeople();
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
	    var that = this;
		$('#addPeopleBtn').on('click',function(){
			$('#addPeopleSelect').css({'display':'block'})
			that.getExistPeople()

		})
		$('#addPeopleClose').on('click',function(){
			$('#addPeopleSelect').css({'display':'none'})
		})
		that.addPeopleUl.on('click','li',function(){
            var v = $(this).find('input').val();
            var arr = [];
            that.addPeopleList.find('li').each(function () {
                var ev = $(this).find('input').val();
                arr.push(ev)
            })

            var str = arr.join(',');

            if(str.indexOf(v) == -1){

                var len = that.addPeopleList.find('li').length;
                if(len >=2){
                   alert('只能添加两个!');
                   return;
                }
                var h = '<li>'+v+'<input type="hidden" value="'+v+'"><span>×</span></li>';
                $(this).find('i').css('display','block')
                that.addPeopleList.append(h);
            }else{
                $(this).find('i').css('display','none')
            }



		})
        that.addPeopleList.on('click','li>span',function () {
            $(this).parent('li').remove();
        })
	},
	getExistPeople:function(){
        var that = this;
		var len = that.addPeopleList.find('li').length;
		if(len >= 1){
			var first = that.addPeopleList.find('li').eq(0).find('input').val();
		}
		if(len >= 2){
			var second = that.addPeopleList.find('li').eq(1).find('input').val();

		}
		var url = _ip + '/user/name?first='+first+'&second='+second;
		$.ajax({
            url:url,
            type: 'GET',
            dataType: 'jsonp',
            contentType:'application/json',
            jsonpCallback: 'namename',
            success: function(json) {
                var json = json.data;
                var h = '';
                for(var k = 0 , kk = json.length; k < kk; k++){
                    h += '<li>'+json[k]+'<input type="hidden" value="'+json[k]+'"><i></i></li>';
                }
                that.addPeopleUl.html(h);
            }
        })
	},
	insertBusInfo:function(){
		var url = _ip + '/busprogs/insert';
        var arr = [];
        this.addPeopleList.find('li').each(function () {
            arr.push($(this).find('input').val());
        })
		if(arr.length <= 0){
        	alert('请添加拜访人员！');
			return;
		}
    	var data = {
    		  "id": null,
		      "proId": parseInt(globleProjectId),
		      "type": $('#visitTypeList').val(),
		      "visitResult": $('#visitResultList').val(),
		      "level": $('#visitStatusList').val(),
		      "progress": $('#bussTypeList').val(),
		      "emergency": $('#emergencyList').val(),
		      "visitId": arr.join(','),
		      "nextFocus": $('#nextFocus').val(),
		      "nextFollow": $('#nextFollow').val(),
			  "support": $('#support').val(),
		      "remark": $('#remark').val(),
		      "creater": $.cookie('userid'),
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
					_API.getPBussTypeList('bussTypeList',false,false,globleProjectId)
						.getVisitStatusList('visitStatusList',false,false,globleProjectId);
                }else{
                    alert('添加失败, 请稍后重试！');
                }
            }
        })
		return this;
	},

	getBusCordList: function(id){ 
		var url = _ip + '/busprogs/selectAll?id='+globleProjectId;
		var that = this;
		$.ajax({
            url:url,
            type: 'GET',
            dataType: 'jsonp',
            contentType:'application/json',
            jsonpCallback: 'busscord',
            success: function(json) {

                var json = json.data;
                if(!json || json.length <= 0) return;
                var h = '';
                var arr = [];
                for(var m=0; m < json.length; m++){
					var record = json[m];
					for (var k in record) {
						arr.push(k);
						h += '<thead><tr class="status"><td width="20"><span class="s-2"></span></td><td><div class="status-head clear">';
						h += '<p class="left">'+k+'</p>';
						h += '<p class="right">'+record[k].time+'</p></div></td></tr></thead>';
						h += '<tbody>';
						for(var i = 0, ii = record[k].data.length; i < ii; i++){
							var data = record[k].data[i];
							h += '<tr><td><span class="line"></span><span class="circle"></span></td>';
							h += '<td><div class="cord-detail">';
							h += '<div class="t"><i></i>';
							var v = data.visitId.split(',');
							for(var j = 0; j < v.length; j++){
								h += '<span>'+v[j]+'</span>';
							}
							h += '<span>'+data.createTime+'</span></div>';
							h += '<ul class="clear key-list"><li>'+data.type+'</li><li>'+data.level+'</li><li>'+data.visitResult+'</li><li>'+data.emergency+'</li></ul>';

							if(data.nextFocus || data.nextFollow ){
								h += '<p class="dec">'+(data.support ? data.support : '-')+'</p>';
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
                }
                if(arr.length){
                    $('#bussProNameTile').html(arr[0]).css({'display':'inline-block'});

                }else{
                    $('#bussProNameTile').css({'display':'none'});

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
	var url = _ip + '/original/getRequireByProjectId?id='+globleProjectId;
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



