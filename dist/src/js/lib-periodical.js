$('.item').click(function() {
    var _index = $(this).index();

    //切换nav样式
    if(!$(this).hasClass('active')) {
        $('.item').removeClass('active');
        $(this).addClass('active');
    }

    //切换输入内容
    $('.main-area').hide();
    $('#item' + _index).show();
});


//选择年份方法
var msg = ['2016','2017','2018','2019'];
function selectYear() {
    var mobileSelect = new MobileSelect({
        trigger: '#selectYear',
        title: '选择年份',
        position: [2], //上拉框起始位置
        wheels: [
            {data: msg}
        ],
        callback: function(indexArr, data){
            console.log(data);
            //这里处理选择后到回调函数（从后天获取选择年份到杂志列表）
            ajax();
        }
    });
}
selectYear();

function ajax() {

}

document.title = '读者';