//此处时间以字符串形式传入分和秒
var minute = '10';
var second = '00';

toTheEnd();

var timer = setInterval(function() {
    //倒计时结束，清除定时器
    if(second === '00' && minute === '00') {
        clearInterval(timer);
        return;
    }

    if(second === '00') {
        second = 60;
        minute -= 1;
        //补0处理
        if(minute < 10) minute = "0" + minute;
    }

    second -= 1;

    //补0处理
    if(second < 10) second = "0" + second;

    toTheEnd();
},1000);

//当倒计时到00:00时处理dom
function toTheEnd() {
    $('#timer').html(minute + ':' + second);
    if(minute === '00' && second === '00') $('#getWelfare').removeClass('btn-disable');
}