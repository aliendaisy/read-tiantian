/**
 * Created by Administrator on 2018/7/26.
 */

//获取验证码
$('.getCode').click(function() {
    var timing = 60;
    var self = this;
    var timer = setInterval(function() {
        if(timing < 1) {
            $(self).html('获取验证码');
            clearInterval(timer);
            return;
        }
        $(self).html(timing + 's后重新获取');
        timing -= 1;
    },1000);
});


//选择国家 (json数据可以重找，格式必须是这样)
$.ajax({
    url: '../lib/countryCode.json',
    success: function(msg) {
        var mobileSelect = new MobileSelect({
            trigger: '#country-select',
            title: '选择国家',
            wheels: [
                {data: msg}
            ],
            callback: function(indexArr, data){
                console.log(data);
                var phoneCode = data[0].phoneCode;
                $('.phone-header').html('+' + phoneCode);
            }
        });
    }
});
