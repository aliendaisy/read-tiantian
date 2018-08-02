/**
 * Created by Administrator on 2018/7/25.
 */
//Create a calendar
// 返回当前月天数
function getMonthDays(year, month){
    return new Date(year, month, 0).getDate();
}

// 返回数字几则是星期几
function getWeekday(year, month, day){
    return new Date(year, month-1, day).getDay();
}

// 返回当前月包含几个星期
function getweeksInMonth(year, month){
    var days = getMonthDays(year, month);
    var FirstDayWeekday = getWeekday(year, month, 1);
    return Math.ceil((days + FirstDayWeekday) / 7);
}
// year是要获取的年份
// month是要获取的月份
// day天，用来判断是否是当前天
// type表明要星期几开头，0为星期一开头，1为星期日开头，默认为0
// 返回当前月包含几个星期

var WEEKTABLE = [{
    cn: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    cns: ['日', '一', '二', '三', '四', '五', '六'],
    en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
},{
    cn: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
    cns: ['一', '二', '三', '四', '五', '六', '日'],
    en: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
}];

function getMonthDaysArray(year, month, day, type) {
    if (typeof day === 'undefined' && year === YEAR && month === MONTH) day = DAY;

    var dayArrays = [];
    var days = this.getMonthDays(year, month),
        preDays = this.getMonthDays(year, month - 1);
    var thisMonthFirstDayInWeek = this.getWeekday(year, month, 1),
        thisMonthLastDayInWeek = this.getWeekday(year, month, days);

    type = !type || type !== 1 ? 0 : 1;

    //上月在当月日历面板中的排列
    for (var i = 0; i < thisMonthFirstDayInWeek; i++) {
        dayArrays.push({
            dayNum: (preDays - thisMonthFirstDayInWeek + i + 1),
            weekDay: WEEKTABLE[type].cn[i]
        });
    }
    //当月日历面板中的排列
    for (var i = 1; i <= days; i++) {
        var weekDayFlag = (thisMonthFirstDayInWeek + i - 1) % 7
        dayArrays.push({
            dayNum: i,
            weekDay: WEEKTABLE[type].cn[weekDayFlag],
            selected: i === +day,
            isThisMonth: true
        });
    }
    //下月在当月日历面板中的排列
    for (var i = 1; i <= (6 - thisMonthLastDayInWeek); i++) {
        var weekDayFlag = (thisMonthFirstDayInWeek + days + i - 1) % 7
        dayArrays.push({
            dayNum: i,
            weekDay: WEEKTABLE[type].cn[weekDayFlag]
        });
    }
    return dayArrays;
}


// 参数fmt必须
// date参数不必须，允许字符串和时间对象，不传或者传无法转换成合法时间对象的字符串则默认当前时间,
// 年(YYYY/yyyy)固定四个占位符
// 月(M)、日(d)、小时(h)、分(m)、秒(s)可以用 1-2个占位符,严格区分大小写，
// 毫秒（ms/mss）最多三个占位符，分别对应56，056这种类型
function format(fmt, date){
    _date = new Date(date).toString() === 'Invalid Date' ? new Date() : new Date(date);
    var _rules = [{
        rule: '[yY]{4}',
        value: _date.getFullYear()
    }, {
        rule: 'M+',
        value: _date.getMonth() + 1
    }, {
        rule: '[dD]+',
        value: _date.getDate()
    }, {
        rule: 'h+',
        value: _date.getHours()
    }, {
        rule: 'm+',
        value: _date.getMinutes()
    }, {
        rule: 's+',
        value: _date.getSeconds()
    }, {
        rule: 'ms{1,2}',
        value: _date.getMilliseconds()
    }];

    _rules.forEach(function (_r){
        var rule = _r.rule, val = _r.value;
        fmt = fmt.replace(new RegExp(rule), function ($1) {
            var rLen = val.toString().length, fLen = $1.length;
            return (fLen !== 2 || rLen >= fLen) ? val : ['00', val].join().substr(rLen);
        });
    });
    return fmt;
}