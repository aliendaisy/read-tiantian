/**
 * Created by Administrator on 2018/7/27.
 */


//按需显示空列表状态/有列表状态
//dom分别为.empty 和 .list


//获取列表
$.ajax({
    url: '',
    success: function(msg) {

        //假数据
        var type = 'VIP';
        var name = '包年VIP';
        var time = '2017-08-30 12:54:35';
        var cost = '188元';


        var template =
            '<li class="label">' +
                '<div class="badge">' +
                    '<p>' + type + '</p>' +
                '</div>' +
                '<div class="main">' +
                    '<div class="top">' +
                        '<p>' + name + '</p>' +
                        '<p>' + cost + '</p>' +
                    '</div>' +
                    '<div class="bottom">' + time + '</div>' +
                '</div>' +
            '</li>';
        $('.label-area').append(template);
    }
});