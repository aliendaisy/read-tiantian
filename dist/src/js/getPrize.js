$(function() {
    $.ajax({
        type: 'post',
        url: '',
        data: {},
        success: function(msg) {

                var days = '25'; //获取差的天数
                $('#days').html(days);
        },
        error: function() {

        }
    })
});

//gift-status1为未领取，倒计时状态
//gift-status2为待领取状态，其中unbindPhone和bindPhone为是否绑定手机的两种状态
//如果显示bindPhone，则去掉#getPrize上一级的btn-disable class即可，并把#getPrize内容替换成'联系客服领取'
