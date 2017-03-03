
function creatAsideDom() {
    var obj = {
        promanage: {
            name:'项目管理',
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
            data:[
                    {
                        id:'docmanage',
                        name:'文档管理',
                        src:'doc-manage'
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
            h += '<div class="menu-first"><i class="project"></i>'+first.name+'</div>';
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







