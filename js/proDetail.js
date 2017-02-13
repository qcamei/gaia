
/*----------
 * 项目详情
 * creater:sunyan
 * creatTime:2017/01/13
 *-----------------------------*/

 function detailItemTab(that,id){
 	var _this = $(that);
 	_this.addClass('current');
 	_this.siblings('li').removeClass('current');

 	var showCard = $('#'+id);
 	showCard.css({'display':'block'});
 	showCard.siblings('div.rel').css({'display':'none'});
 }