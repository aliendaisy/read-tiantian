document.title = '读者第12期';

var article =
    '<div class="swiper-slide">' +
        '<div class="banner">' +
            '<img src="../images/getPrize/test.png" alt="">' +
        '</div>' +
        '<article>' +
            '<p class="font-20 font-333 font-bold title">杂志的标题</p>' +
            '<p class="font-12 font-999 author">作者：李四</p>' +
            '<div class="main">' +
                '<p>在当今这个“社交至上”的时代，大家似乎都偏爱能言善辩。</p>' +
                '<p>而沉默寡言就不那么讨巧，职场上显然不如前者受重视，关系中被冠上“无情趣”之名，生活中被认为没有情商。</p>' +
                '<p>而海明威却说：“我们用两年去学会说话，却用六十年来学会沉默。”</p>' +
                '<p>当我们为多说话而付出一些代价的时候 ，就会懂得沉默自有其价值，是一种难能可贵的品质。</p>' +
                '<img src="../images/getPrize/test.png" alt="">' +
                '<p>在当今这个“社交至上”的时代，大家似乎都偏爱能言善辩。</p>' +
                '<p>而沉默寡言就不那么讨巧，职场上显然不如前者受重视，关系中被冠上“无情趣”之名，生活中被认为没有情商。</p>' +
                '<p>而海明威却说：“我们用两年去学会说话，却用六十年来学会沉默。”</p>' +
                '<p>当我们为多说话而付出一些代价的时候 ，就会懂得沉默自有其价值，是一种难能可贵的品质。</p>' +
            '</div>' +
        '</article>' +
    '</div>';
var article2 =
    '<div class="swiper-slide">' +
    '<div class="banner">' +
    '<img src="../images/getPrize/test.png" alt="">' +
    '</div>' +
    '<article>' +
    '<p class="font-20 font-333 font-bold title">杂志的标题2</p>' +
    '<p class="font-12 font-999 author">作者：李四222</p>' +
    '<div class="main">' +
    '<p>在当今这个“社交至上”的时代，大家似乎都偏爱能言善辩。</p>' +
    '<p>而沉默寡言就不那么讨巧，职场上显然不如前者受重视，关系中被冠上“无情趣”之名，生活中被认为没有情商。</p>' +
    '<p>而海明威却说：“我们用两年去学会说话，却用六十年来学会沉默。”</p>' +
    '<p>当我们为多说话而付出一些代价的时候 ，就会懂得沉默自有其价值，是一种难能可贵的品质。</p>' +
    '<img src="../images/getPrize/test.png" alt="">' +
    '<p>在当今这个“社交至上”的时代，大家似乎都偏爱能言善辩。</p>' +
    '<p>而沉默寡言就不那么讨巧，职场上显然不如前者受重视，关系中被冠上“无情趣”之名，生活中被认为没有情商。</p>' +
    '<p>而海明威却说：“我们用两年去学会说话，却用六十年来学会沉默。”</p>' +
    '<p>当我们为多说话而付出一些代价的时候 ，就会懂得沉默自有其价值，是一种难能可贵的品质。</p>' +
    '</div>' +
    '<div class="main">' +
    '<p>在当今这个“社交至上”的时代，大家似乎都偏爱能言善辩。</p>' +
    '<p>而沉默寡言就不那么讨巧，职场上显然不如前者受重视，关系中被冠上“无情趣”之名，生活中被认为没有情商。</p>' +
    '<p>而海明威却说：“我们用两年去学会说话，却用六十年来学会沉默。”</p>' +
    '<p>当我们为多说话而付出一些代价的时候 ，就会懂得沉默自有其价值，是一种难能可贵的品质。</p>' +
    '<img src="../images/getPrize/test.png" alt="">' +
    '<p>在当今这个“社交至上”的时代，大家似乎都偏爱能言善辩。</p>' +
    '<p>而沉默寡言就不那么讨巧，职场上显然不如前者受重视，关系中被冠上“无情趣”之名，生活中被认为没有情商。</p>' +
    '<p>而海明威却说：“我们用两年去学会说话，却用六十年来学会沉默。”</p>' +
    '<p>当我们为多说话而付出一些代价的时候 ，就会懂得沉默自有其价值，是一种难能可贵的品质。</p>' +
    '</div>' +
    '</article>' +
    '</div>';

$('.swiper-wrapper').append(article);
$('.swiper-wrapper').append(article2);
$('.swiper-wrapper').append(article2);

//以上为append文章，后台获取
//swiper切换文章
//window.onload不可少
window.onload = function() {
    var mySwiper = new Swiper('#article-swiper', {
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
        $('.swiper-container').css({margin: '0 0 .54rem 0'});
    }else{
        $('.header,.bottom').show();
        $('.swiper-container').css({margin: '.78rem 0 1.44rem'});
    }
});

//关闭指引层
$('.mask').click(function() {
   $(this).hide();
});