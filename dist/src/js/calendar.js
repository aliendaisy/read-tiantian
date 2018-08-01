/**
 * Created by Administrator on 2018/7/25.
 */
var base = document.documentElement.clientWidth / 750 * 100;

//swiper
var mySwiper = new Swiper('#book-swiper', {
    autoplay: false,
    freeMode: true,
    width: 1.48 * base,
});

//日历部分
var DATE = new Date();
var YEAR = DATE.getFullYear();
var MONTH = DATE.getMonth() + 1;
var DAY = DATE.getDate();

var startYear = 2018;
var startMonth = 7; //可根据实际情况修改
var swiper_from;

//此处json格式保持不变；
var msg = [
    {
        "value": 2018,
        "childs": [
            {"value" : 1},
            {"value" : 2},
            {"value" : 3},
            {"value" : 4},
            {"value" : 5},
            {"value" : 6},
            {"value" : 7},
            {"value" : 8},
            {"value" : 9},
            {"value" : 10},
            {"value" : 11},
            {"value" : 12}
        ]
    },
    {
        "value": 2019,
        "childs": [
            {"value" : 1},
            {"value" : 2},
            {"value" : 3},
            {"value" : 4},
            {"value" : 5},
            {"value" : 6},
            {"value" : 7},
            {"value" : 8},
            {"value" : 9},
            {"value" : 10},
            {"value" : 11},
            {"value" : 12}
        ]
    }
];

//更新日历数据函数
function updateDate(year, month, day) {
    //获取二联动中初始月份位置
    swiper_from = year === startYear ? startMonth : 1;
    //更新头部月份
    var header_month = format('YYYY-MM', new Date(year, month - 1 ,day));
    header_month = header_month.replace(/,/g,'');
    $('#month').html(header_month);

    //append操作
    for(var i = 1; i <= 12; i ++) {
        //起始月份之前的日期置灰
        if(year === startYear && i < startMonth) {
            $('.calendar-date' + i).addClass('calendar-date-before');
        }else{
            $('.calendar-date' + i).removeClass('calendar-date-before');
        }
        //获取月份的具体日期
        var dateArr = getMonthDaysArray(year, i, 1, 0);

        //把具体日期渲染到页面
        $.each(dateArr, function() {
            var template_date;
            if(this.isThisMonth) {
                template_date = '<li><p>' + this.dayNum + '</p></li>';
            }else{
                //不是本月的日期隐藏
                template_date = '<li><p class="disable-date">' + this.dayNum + '</p></li>';
            }
            $('.calendar-date' + i).append(template_date);
        });
    }


    //这里处理用户每日阅读状态请求，可以通过请求改变每个日期的背景色
    var badgeBlue = '<span class="badge badge-blue">休息</span>';
    var badgeRed = '<span class="badge badge-red">免费</span>';

    //假数据
    $('.calendar-date7').find('li p').eq(0).addClass('spot-grey');
    $('.calendar-date7').find('li p').eq(1).addClass('spot-blue');
    $('.calendar-date7').find('li p').eq(2).addClass('spot-yellow');
    $('.calendar-date7').find('li').eq(0).append(badgeBlue);
    $('.calendar-date7').find('li').eq(1).append(badgeRed);

    $.ajax({
        type: 'post',
        url: '',
        success: function(res) {
            //对res里的当前月份日期数组进行处理，在dom中找到对应li
            //已读对li加入spot-yellow的class
            //补读对li加入spot-blue的class
            //未读对li加入spot-grey的class
            //每个月有补足的日期，所以需要对res里的日期数组处理过再遍历进去
        }
    });
}
updateDate(YEAR, MONTH, DAY); //init日历为当前日期月份

//选择月份操作
var mobileSelect = new MobileSelect({
    trigger: '#month',
    title: '选择月份',
    wheels: [
        {data: msg}
    ],
    position: [0, swiper_from - 1],
    callback: function(indexArr, data){
        //更新年月
        YEAR = data[0].value;
        MONTH = data[1].value;

        $('.calendar-date li').remove();
        updateDate(YEAR, MONTH, 1);

        calendar_swiper.slideTo(MONTH - 1); //更新相应的日历显示
    }
});

//日历左右滑动操作
var calendar_swiper = new Swiper('#calendar-swiper', {
    autoplay: false,
    autoHeight: true,
    initialSlide: MONTH - 1,
    observer: true,
    observerParents: true,
    on: {
        init: function() {
            //初始化时，高度自适应
            var swiper_from_month = getweeksInMonth(YEAR, swiper_from);
            var initHeight = swiper_from_month * .74 + .26;

            $('#calendar-swiper').css({minHeight: initHeight + 'rem'});
        },
        slideChangeTransitionEnd: function(){

            //有可能遇到的只有4周的2月份高度自适应
            $('#calendar-swiper').css({minHeight: 'auto'});

            MONTH = this.activeIndex + 1; //activeIndex为切换结束后当前页的顺序值

            $('.calendar-date li').remove();
            updateDate(YEAR, MONTH, 1); //更新头部年月显示

        }
    }
});

// console.log($('#calendar-swiper .swiper-wrapper').find('.swiper-slide-active').index())
// if($('#calendar-swiper .swiper-wrapper').find('.swiper-slide-active').index() == 11) {
//
//     console.log(111)
//     calendar_swiper.removeSlide(0);
//     calendar_swiper.appendSlide('<ul class="swiper-slide calendar-date"></ul>')
// }


//指引步骤
$('.step1').click(function() {
    $(this).hide();
    $('.step2').show();
});
$('.step2').click(function() {
    $('.mask').hide();
});

//弹框关闭
$('.pop-close').click(function() {
    $(this).parent().parent().hide();
});

