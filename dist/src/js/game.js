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


//随机定位营养值气泡位置
var base = document.documentElement.clientWidth / 750 * 100;

var bubble = [
    10,20,10,20,5,10
];
var randomArr = [];
//len参数为后台返回气泡的数量;limit为气泡两两重叠范围限值（以bubble-area百分比计算）
function createRandomArray(len,limit) {
    do{
        var randomX = Math.random();
        var randomY = Math.random();

        if(randomArr.length > 0) {
            var flag = false; //是否push到数组里的必要条件
            $.each(randomArr,function(index) {
                var distance = Math.sqrt(Math.pow((randomX - this.x),2) + Math.pow((randomY - this.y),2));
                if(distance < limit) {
                    flag = true;
                }
                //所有项均满足，才push到数组里
                if(!flag && index === randomArr.length - 1) {
                    randomArr.push({x: randomX,y: randomY});
                }
            });
        }else{
            randomArr.push({x: randomX,y: randomY});
        }
    }
    while(randomArr.length < len);
}
createRandomArray(bubble.length,0.24);

$.each(bubble,function(index) {
    var x = (randomArr[index].x * 100) + '%';
    var y = (randomArr[index].y * 100) + '%';
    var bubbleColor = this <= 10 ? "light" : "dark";
    var template =
        '<div class="bubble bubble-' + bubbleColor + '" style="bottom:' + y + ';right:' + x + '">' +
            '<p>营养值</p>' +
            '<p>+' + this + '</p>' +
        '</div>';
    $('.bubble-area').append(template);
});

//营养值收取
$('.bubble').click(function() {
    var self = this;
    //气泡点击动画
    $(this).css({
        width: 0,
        height: 0,
        bottom: -base,
        right: 1.6 * base,
        opacity: 0
    });

    setTimeout(function() {
        //清除已收的dom
        $(self).remove();
        //小船动画
        $('.boat').css({
            animation: 'bounce linear 2s'
        });
        setTimeout(function() {
            $('.boat').css({
                animation: 'none'
            });
        },2000);
    },500);
});


//场景切换
function change(url) {
    $('.right-cloud').css({animation: 'cloudRight ease-in-out 5s'});
    $('.left-cloud').css({animation: 'cloudLeft ease-in-out 5s'});

    //切换背景图片
    setTimeout(function() {
        $('main').css({
            "background": 'url(' + url + ') no-repeat',
            "backgroundSize": '100%',
            "backgroundPosition": '0 -2rem',
        });
    },2500);

    //转场动画结束后恢复初始化状态
    $('.right-cloud,.left-cloud').on('animationend',function() {
        $(this).css({animation: 'none'});
    });
}

//这里写的是假数据，实际根据接口
var healthNum = 0;
var time = setInterval(function() {
    healthNum += 1000;
    console.log(healthNum)
    if(healthNum >= 6000) {
        clearInterval(time);
        return;
    }
    if(healthNum >= 4000) {
        change("../images/game/bg_game03.png");
    }else if(healthNum >= 2000) {
        change("../images/game/bg_game02.png");
    }

    judgeBg();

},5000);

//判断是否是场景3显示爱心
function judgeBg() {
    var mainBg = $('main').css('backgroundImage').split("(")[1].split(")")[0];
    var str = mainBg.substr(mainBg.length - 6);
    if(str === '3.png"') {
        $('.heart').show();
    }
}
judgeBg();


window.onload = function() {
    var dialog2 = '<p>再攒<span>XX</span>营养值就可以打开我了哦</p>';
    $('.dialog2').append(dialog2);

    setTimeout(function() {
        $('.dialog2').css({opacity: 1});
    },400);

    setTimeout(function() {
        $('.dialog2').css({opacity: 0});
    },10000);
};


//新增(上面也有些微改动，最好对比一下)
$('.bottle').click(function() {
    $(this).find('.dialog2').css({opacity: 1});
    setTimeout(function() {
        $('.dialog2').css({opacity: 0});
    },10000);
});

//根据礼物百分比和公益心百分比动图改变图片
var gift_percent = 55;
var heart_percent = 80;
var _gift = $('#gift-img');
var _heart = $('#heart-img');

switch (true) {
    case gift_percent < 25:
        _gift.attr('src', '../images/game/icon_game_gift0@2x.png');
        break;
    case gift_percent < 50:
        _gift.attr('src', '../images/game/icon_game_gift25@2x.png');
        break;
    case gift_percent < 75:
        _gift.attr('src', '../images/game/icon_game_gift50@2x.png');
        break;
    case gift_percent < 100:
        _gift.attr('src', '../images/game/icon_game_gift75@2x.png');
        break;
    default:
        _gift.attr('src', '../images/game/icon_game_gift100@2x.png');
}

switch (true) {
    case heart_percent < 25:
        _heart.attr('src', '../images/game/icon_game_heart0@2x.png');
        break;
    case heart_percent < 50:
        _heart.attr('src', '../images/game/icon_game_heart25@2x.png');
        break;
    case heart_percent < 75:
        _heart.attr('src', '../images/game/icon_game_heart50@2x.png');
        break;
    case heart_percent < 100:
        _heart.attr('src', '../images/game/icon_game_heart75@2x.png');
        break;
    default:
        _heart.attr('src', '../images/game/icon_game_heart100@2x.png');
}

//弹框

$('#toSea').click(function() {
    $('.popup2').show();
    $('#bottle-pop').hide();
});

$('#cancel').click(function() {
    $('.mask').hide();
});