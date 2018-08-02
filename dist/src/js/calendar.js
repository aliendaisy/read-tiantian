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

//当前年月
var DATE = new Date();
var YEAR = DATE.getFullYear();
var MONTH = DATE.getMonth() + 1;

var startYear = 2018; //起始年
var startMonth = 8; //起始月

var targetYear = 2020; //目标年
var targetMonth = 10;  //目标月 （实际为当前年月，此处是为了调试）

var year_value = targetYear - startYear;
var month_value = targetMonth - startMonth;

var slide_num = year_value * 12 + month_value + 1;  //总共slide数量

//生成mobileSelect插件需要的年月数组（数组格式已存在的不要变动，可以加入项）
var date_msg = [];
function createData() {
    for(var i = startYear; i <= targetYear; i ++) {
        var obj = {
            value: i,
            childs: []
        };
        if(i == startYear) {
            for(var j = startMonth; j <= 12; j ++) {
                obj.childs.push({value: j});
            }
        }else if(i == targetYear) {
            for(var j = 1; j <= targetMonth; j ++) {
                obj.childs.push({value: j});
            }
        }else{
            for(var j = 1; j <= 12; j ++) {
                obj.childs.push({value: j});
            }
        }
        date_msg.push(obj);
    }
}
createData();

console.log(date_msg);


//计算需要的slide,以及每个月的日历 进行 append操作
function appendSlide() {
    $.each(date_msg, function() {
        var _ = this;
        $.each(_.childs, function() {
            var __ = this;
            var dateArr = getMonthDaysArray(_.value, __.value, 1, 0);

            //单数月份补0
            if(('' + __.value).length == 1) {
                __.value = '0' + __.value;
            }

            //生成带年月id的slide并append
            var template =
                '<ul class="swiper-slide calendar-date" id="' + _.value + '-' + __.value + '"></ul>';
            $('#calendar-swiper .swiper-wrapper').append(template);

            //把具体日期渲染到页面
            $.each(dateArr, function() {
                var template_date;
                if(this.isThisMonth) {
                    template_date = '<li><p>' + this.dayNum + '</p></li>';
                }else{
                    //不是本月的日期隐藏
                    template_date = '<li><p class="disable-date">' + this.dayNum + '</p></li>';
                }
                $('#' + _.value + '-' + __.value).append(template_date);
            });
        });
    });
}
appendSlide();

/*************************************************************************************/
//这里处理用户每日阅读状态请求，可以通过请求改变每个日期的背景色
var badgeBlue = '<span class="badge badge-blue">休息</span>';
var badgeRed = '<span class="badge badge-red">免费</span>';

//假数据
$('#2018-08').find('li p').eq(3).addClass('spot-grey');
$('#2018-08').find('li p').eq(4).addClass('spot-blue');
$('#2018-08').find('li p').eq(5).addClass('spot-yellow');
$('#2018-08').find('li').eq(6).append(badgeBlue);
$('#2018-08').find('li').eq(7).append(badgeRed);

$.ajax({
    type: 'post',
    url: '',
    success: function(res) {
        //对res里的当前月份日期数组进行处理，在dom中找到对应li
        //已读:对li加入spot-yellow的class
        //补读:对li加入spot-blue的class
        //未读:对li加入spot-grey的class
        //每个月有隐藏的补足的日期，所以需要对res里的日期数组处理过再遍历进去
    }
});
/*************************************************************************************/


//选择月份操作
var mobileSelect = new MobileSelect({
    trigger: '#month',
    title: '选择月份',
    wheels: [
        {data: date_msg}
    ],
    position: [date_msg.length - 1, targetMonth - 1],
    callback: function(indexArr, data){
        var m_value = data[0].value + '-' + data[1].value;
        $('#month').html(m_value); //顶部赋值

        var slide_index = $('#' + m_value).index();

        calendar_swiper.slideTo(slide_index); //更新相应月份的日历显示
    }
});

//日历左右滑动操作
var calendar_swiper = new Swiper('#calendar-swiper', {
    autoplay: false,
    autoHeight: true,
    initialSlide: slide_num - 1,
    observer: true,
    observerParents: true,
    on: {
        init: function() {
            //初始化时，高度自适应
            var initMonthWeeks = getweeksInMonth(targetYear, targetMonth);
            var initHeight = initMonthWeeks * .74 + .26;

            $('#calendar-swiper').css({minHeight: initHeight + 'rem'});
        },
        slideChangeTransitionEnd: function(){

            //有可能遇到的只有4周的2月份高度自适应
            $('#calendar-swiper').css({minHeight: 'auto'});

            var id = $('#calendar-swiper .swiper-wrapper').find('.swiper-slide-active').attr('id');
            $('#month').html(id);  //获取相应slide的id，并赋值到头部
        }
    }
});


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

