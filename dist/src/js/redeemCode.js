/**
 * Created by Administrator on 2018/7/26.
 */
$('.item').click(function() {
    var _index = $(this).index();

    //切换nav样式
    if(!$(this).hasClass('active')) {
        $('.item').removeClass('active');
        $(this).addClass('active');
    }

    //切换输入内容
    $('.confirm-area').hide();
    $('#item' + _index).show();
});