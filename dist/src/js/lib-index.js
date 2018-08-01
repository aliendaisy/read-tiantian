
window.onload = function() {
    //顶部banner
    var mySwiper = new Swiper('#banner-swiper', {
        autoplay: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
    //广告位banner
    var adSwiper = new Swiper('#ad-swiper', {
        autoplay: false,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        autoHeight: true,
        on: {
            init: function () {
                //解决初始化slide高度有问题的bug
                var initHeight = $('.swiper-slide:eq(0)').find('img').height();
                console.log(initHeight)
                $('.swiper-wrapper').height(initHeight);
            },
        }
    });
};

//底部tab切换
var arr = [];
$.each($('.tab'),function() {
    var src = $(this).find('img').attr('src');
    arr.push(src);
});

$('.tab').click(function() {
    var i = $(this).index();

    //更新数组
    $.each(arr,function(index) {
        if(index === i) {
            arr[index] = this.replace('grey','golden');
        }else{
            arr[index] = this.replace('golden','grey');
        }
    });

    //改变文字样式
    $('.tab').removeClass('tab-active');
    $(this).addClass('tab-active');

    //改变图标样式
    $.each($('.tab'),function(index) {
        $(this).find('img').attr('src',arr[index])
    });
});