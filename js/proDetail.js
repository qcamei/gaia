
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

			that.showInfo(that);
		})
	},
	showInfo:function(that){
		that.showList.css({'display':'block'});
    	that.edite.css({'display':'none'});	
    },
	showEdite:function(that){
		that.showList.css({'display':'none'});
    	that.edite.css({'display':'block'});
	}
}
var presell = new presell();
presell.init();

/*----------
 * 客户资料：维护标签
 *-----------------------------*/

function manageTagSelf(){}
manageTagSelf.prototype = {
	deleteTag: function(id,tag){
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
			data['id'] = manageTagSelf.userId;
			data[tag]  = str.join(',');

			// var url = _ip + '/pci/update?id='+manageTagSelf.userId+'&'+tag+'='+encodeURIComponent(str.join(','));
			var url = _ip + '/pci/update';
			$.ajax({
	            url:url,
	            type : "POST",
	            dataType: 'json',
	            contentType:'application/json',
	            data:JSON.stringify(data),
	            success:function(data){
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
	addTag: function(id1,id2,id3,tagtype,dec){
		var _id1 = $('#'+id1);
		var _id2 = $('#'+id2);
		var _id3 = $('#'+id3);

		if (id1 == 'addtag-1') {
			_id1.on('click',function(){
			    _id2.css({'display':'block'});
			})

		}else{
			_id1.on('click',function(){
			    _id1.css({'display':'none'});
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
		    	var url = _ip + '/pci/update';
		    	var data = {};

		    	data['id'] = that.userId;
		    	data[tagtype] = arr.join(',');
		    	$.ajax({
		            url:url,
		            type : "POST",
		            dataType: 'json',
		            contentType:'application/json',
		            data:JSON.stringify(data),
		            success:function(data){
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
	updataDec:function(id,dec){
		var _id = $('#'+id);
		_id.on('blur',function(){
			var url = _ip + '/pci/update';
	    	var data = {};
	    	data['id'] = manageTagSelf.userId;
	    	// parseInt(id.split('-')[2])
	    	data[dec] = $(this).val();
	    	$.ajax({
	            url:url,
	            type : "POST",
	            dataType: 'json',
	            contentType:'application/json',
	            data:JSON.stringify(data),
	            success:function(data){
	                if(data.success){
	                	
	                }else{
	                    alert('添加失败, 请稍后重试！');
	                }
	            }
	        })
		})
		return this;
	},
	getExitDot:function(id1,id2){
		var _id1  = $('#'+id1);
		var _id2  = $('#'+id2);
		var url  = _ip + '/tags/select';
    	var data = {};
    	data['type'] = 2;
    	data['name'] = '';
    	$.ajax({
            url:url,
            type : "POST",
            dataType: 'json',
            contentType:'application/json',
            data:JSON.stringify(data),
            success:function(data){
                if(data.success){
                	var data = data.data;
                	var h = '';
                	for(var k = 0, kk = data.length; k < kk ; k++){
                		h += '<li>'+data[k].name+'<input type="hidden" value="'+data[k].name+'"/><i></i></li>';
                	}
                	_id1.html(h);
                }else{
                    alert('添加失败, 请稍后重试！');
                }
            }
        })
        _id1.on('click','li',function(){
        	var i = $(this).find('i');
        	var display = i.css('display');
        	var that = this;
        	if(display == 'block'){
        		i.css({'display':'none'});
        		manageTagSelf.deleteTag('tag-list-1');
        	}else{
        		i.css({'display':'block'});
        		var name = $(this).find('input').val()
        		var url = _ip + '/pci/update';
		    	var data = {};
		    	data['id'] = manageTagSelf.userId;
		    	data['interestTag'] = name;
		    	$.ajax({
		            url:url,
		            type : "POST",
		            dataType: 'json',
		            contentType:'application/json',
		            data:JSON.stringify(data),
		            success:function(data){
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
		var url = _ip + '/pci/select?id=10';
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
                        h += '<div class="text">'+json[k].name+' | <tel>'+json[k].tel+'</tel> <span class="fethure">不好沟通</span>';
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

manageTagSelf.deleteTag('tag-list-1','interestTag')
			 .deleteTag('tag-list-2','managementTag')
			 .deleteTag('tag-list-3','competitorTag')
			 .addTag('addtag-1','addtag-input-1','tag-list-1','interestTag')
			 .addTag('addtag-2','addtag-input-2','tag-list-2','managementTag')
			 .addTag('addtag-3','addtag-input-3','tag-list-3','competitorTag')
			 .updataDec('tag-dec-1','interestDesc')
			 .updataDec('tag-dec-2','managementDesc')
			 .updataDec('tag-dec-3','competitorDesc')
			 .updataDec('tag-dec-4','riskDesc')
			 .getExitDot('addtag-input-ul-1','tag-list-1')
			 .closeOutTag('close-exist-tag','addtag-input-1')
			 .initTagDec('tag-dec-1','tag-dec-2','tag-dec-3','tag-dec-4','tag-list-1','tag-list-2','tag-list-3')
			 .getClientAddressBook('clientAddressBook');



/*----------
 * 客户信息卡
 *-----------------------------*/
function clientInfoCard(){}
clientInfoCard.prototype = {
	showBaseInfo:function(){
		
	}
}
clientInfoCard = new clientInfoCard();


