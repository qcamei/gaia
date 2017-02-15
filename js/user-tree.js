
function getFirstOrganize(level, data, $content) {
    var url  = _ip+'/dpt/select';
    var levelClass = '';
    $content.find('ul').remove();
    switch (level) {
        case 1:
            levelClass = 'one';
            break;
        case 2:
            levelClass = 'two';
            break;
        case 3:
            levelClass = 'three';
            break;
        case 4:
            levelClass = 'four';
            break;
    }
    organizeAjaxPost(url, data, function(json) {
        if (json.success) {
            var $firstUl = $('<ul></ul>');
            if (json.data.length) {
                $content.find('>div>i').removeClass('none-arrow').addClass('active');
            }
            else {
                $content.find('>div>i').removeClass('active').addClass('none-arrow');
            }
            for (var key in json.data) {
                var msg = json.data[key];
                msg.edit = 'edit';
                msg.level = level;
                msg.levelClass = levelClass;
                treeLi($firstUl, msg);
            }
            $content.append($firstUl);
        }
    });
}

function arrowClick(obj) {
    var $obj = $(obj);
    var $li = $obj.closest('li');
    var id =  $li.attr('id');
    var pid = $li.data('pid');
    var level = parseInt($li.data('level')) + 1;
    $obj.toggleClass('tree-arrow-bottom');
    $li.toggleClass('tree-block');
    if($obj.hasClass('none-arrow')) {
        return false;
    }
    if ($li.hasClass('tree-block')) {
        $li.removeClass('tree-none');
    }
    else {
        $li.addClass('tree-none');
    }
    getFirstOrganize(level, { id: id, pid: pid }, $li);
}

function treeLi($firstUl, msg) {
    var $li = $('<li id="'+ msg.id +'" data-level="'+ msg.level +'" data-pid="'+ msg.pid +'"></li>');
    var noneArrow = '';
    if(msg.ppid) {
        $li.data('ppid', msg.ppid);
    }
    if (!msg.status) {
        noneArrow = 'none-arrow';
    }
    var $treeTitle = $('<div class="'+ msg.levelClass +' tree-title" onclick="treeTitleClick(this); event.stopPropagation();">' +
        '<i onclick="arrowClick(this); event.stopPropagation();" class="tree-arrow ' + noneArrow +' display-middle"></i>' +
        '<span class="display-middle need-none tree-text" style="display: inline-block">'+ msg.name +'</span>' +
        '<span class="right need-none">' +
        '<i class="display-middle edit-organize" onclick="editOrganizeShow(this); event.stopPropagation();"></i>' +
        '<i class="display-middle delete-organize" onclick="deleteOrganize(this); event.stopPropagation();"></i>' +
        '</span>' +
        '<div class="add-tag-line" style="display: none">' +
        '<input type="text" class="add-tag-input display-middle" placeholder="部门名称">' +
        '<button class="tag-btn sure-btn display-middle '+ (msg.edit? "edit": "") +'" onclick="sureAddOrganize(this); event.stopPropagation();">确认</button>' +
        '<button class="tag-btn cancel-btn display-middle cancel-add-edit" onclick="cancelAddEdit(this); event.stopPropagation();">取消</button>' +
        '</div>' +
        '</div>');
    if (msg.add) {
        $treeTitle.addClass(msg.add).find('.need-none').css('display', 'none').end()
            .find('.add-tag-line').css('display', 'inline-block').find('.sure-btn').addClass(msg.add);
    }
    $li.append($treeTitle);
    $firstUl.append($li);
}


function organizeAjaxGet(url, data, jsonpCall, callback) {
    $.ajax({
        url:url,
        type: 'GET',
        dataType: 'jsonp',
        data: data,
        jsonp: 'callback',
        jsonpCallback: jsonpCall,
        success: function(json) {
            if(json.message === 'LOGIN') {
                window.location.href = '/pages/user-login.html';
                return false;
            }
            if(callback) {
                callback(json);
            }
        }
    })
}

function organizeAjaxPost(url, data, callback) {
    $.ajax({
        url:url,
        type: 'POST',
        dataType: 'json',
        contentType:'application/json',
        data:JSON.stringify(data),
        success: function(json) {
            if(json.message === 'LOGIN') {
/*                window.location.href = '/pages/user-login.html';
                return false;*/
            }
            if(callback) {
                callback(json);
            }
        }
    })
}
