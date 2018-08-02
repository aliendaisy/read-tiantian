document.title = '读者12期';

var heightArr = [];
var base = document.documentElement.clientWidth / 750 * 100;

window.onload = function() {
    $.each($('section'), function() {
        var offsetTop = $(this).find('.category').offset().top; //每个section距离文档顶部的距离
        heightArr.push(offsetTop);
    });
};


window.addEventListener('scroll', function() {

    var scroll = $(document).scrollTop(); //获取滚动条高度

    if(scroll <= 0) {
        $('section').find('.category').removeClass('category-fixed');
    }

    $.each(heightArr, function(i) {
        if(scroll >= heightArr[i]) {
            $('section').find('.category').removeClass('category-fixed');
            $('section').eq(i).find('.category').addClass('category-fixed');

            if(scroll <= 0) {
                $('section').find('.category').removeClass('category-fixed');
            }
        }
    });
});
