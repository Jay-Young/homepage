//SetCookie('diggid',null,1); //清空cookie
function postDigg(ftype, aid) {
    var taget_obj = document.getElementById('diggNum' + aid);

    var saveid = GetCookie('diggid'); //我所有赞过的文章id
    //  alert(saveid);
    if (saveid != null) {
        var saveids = saveid.split(',');
        var hasid = false; //cookie中是否已有顶过的记录
        var can_digg = false; //是否还可再顶一次
        saveid = '';
        //  j = 1;
        for (i = saveids.length - 1; i >= 0; i--) {
            var oldaid_arr = saveids[i].split(':');
            //    alert(saveids[i]);
            if (oldaid_arr[0] == aid) {
                hasid = true;
                if (oldaid_arr[1] >= 3) {
                    saveid += (saveid == '' ? saveids[i] : ',' + saveids[i]);
                    can_digg = false;
                    //alert('大于3');

                } else { //小于点击次数
                    //alert('再顶一次');
                    can_digg = true;
                    saveid += (saveid == '' ? oldaid_arr[0] + ':' + (parseInt(oldaid_arr[1]) + 1) : ',' + oldaid_arr[0] + ':' + (parseInt(oldaid_arr[1]) + 1));
                }

            } else {
                //alert('id不对应');
                saveid += (saveid == '' ? saveids[i] : ',' + saveids[i]);
            }
        }
        ///循环结束
        if (hasid) {
            if (can_digg) {

            } else {
                // alert("您已经顶过该帖3次了，请休息一下吧 ！");
                return;
            }
            SetCookie('diggid', saveid, 1);
        } else {
            saveid += ',' + aid + ':1'; //原 cookie没有本文章id 在后面追加上

            SetCookie('diggid', saveid, 1);
            // alert('原 cookie没有本文章id 在后面追加上');
        }


    } else { //如果cookie中无记录,则记录
        SetCookie('diggid', aid + ':1', 1);
        // alert('cookie中无记录');
    }

    myajax = new DedeAjax(taget_obj, false, false, '', '', '');
    var url = "/plus/digg_ajax_list.php?action=" + ftype + "&id=" + aid;
    myajax.SendGet2(url);

    DedeXHTTP = null;
}

function getDigg() {
    var saveid = GetCookie('diggid'); //我所有赞过的文章id
    if (saveid != null) {
        var saveids = saveid.split(',');
        var hasid = false;
        saveid = '';
        j = 1;
        for (i = saveids.length - 1; i >= 0; i--) {
            var oldaid_arr = saveids[i].split(':');
            $('#digg' + oldaid_arr[0]).addClass("clicked");
            //document.getElementById('digg'+saveids[i]).addClass("icon-heart-on");
        }
    }
}
getDigg(); //本函数需要放在网页最下面