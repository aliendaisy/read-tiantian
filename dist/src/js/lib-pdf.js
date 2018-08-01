document.title = '读者第12期';

//换成pdf格式文件，自测可行
var pdfSrc = [
    '../images/lib-pdf/01.jpg',
    '../images/lib-pdf/02.jpg',
    '../images/lib-pdf/03.jpg',
    '../images/lib-pdf/04.jpg',
    '../images/getPrize/test.png'
];


//遍历后台获取的pdf格式文件src数组，并append到dom中
$.each(pdfSrc, function() {
    var template =
        '<div class="swiper-slide">' +
            '<img src="' + this + '" class="pdf-lg"/>' +
        '</div>';
    $('.swiper-wrapper').append(template);
});


//swiper切换pdf
//window.onload不可少
window.onload = function() {
    var mySwiper = new Swiper('#pdf-swiper', {
        autoplay: false,
        loop: false,
        autoHeight: true,
        navigation: {
            nextEl: '#next',
            prevEl: '#prev',
        },
        pagination: {
            el: '#page',
            type: 'fraction',
        },
        on: {
            init: function() {
                //解决初始化slide高度有问题的bug
                var initHeight = $('.swiper-slide:eq(0)').height();
                $('.swiper-wrapper').height(initHeight);
            },
            slideChangeTransitionStart: function(){
                //每次切换时，文章滚动到最上面
                $(window).scrollTop(0);

                //当切换到第一张时，隐藏上一篇
                //当切换到最后一张时，隐藏下一篇
                var index = mySwiper.activeIndex;
                var len = $('.swiper-slide').length;
                if(index === 0) {
                    $('#prev').addClass('hidden');
                    $('#next').removeClass('hidden');
                }else if(index === len - 1) {
                    $('#next').addClass('hidden');
                    $('#prev').removeClass('hidden');
                }else{
                    $('#next, #prev').removeClass('hidden');
                }
            },
        }
    });
};

//点击切换内容显示隐藏
$('.swiper-container').click(function() {
    var flag = $('.header,.bottom').is(':hidden');
    if(!flag) {
        $('.header,.bottom').hide();
        $('.swiper-container').css({margin: 0});
    }else{
        $('.header,.bottom').show();
        $('.swiper-container').css({margin: '.78rem 0 .9rem'});
    }
});