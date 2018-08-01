$('.more').click(function() {
    if($(this).find('p').text() === '查看全部') {
        $('#moreText').slideDown();
        $(this).find('p').text('缩起');
        $(this).find('img').css({transform: 'rotate(180deg)'});
    }else{
        $(this).find('p').text('查看全部');
        $('#moreText').slideUp();
        $(this).find('img').css({transform: 'rotate(0deg)'});
    }
});