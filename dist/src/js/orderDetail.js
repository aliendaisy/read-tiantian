//加载某一杂志列表
$.ajax({
    url: '',
    success: function(msg) {
        var bookImg = '../images/getPrize/test.png';
        var bookTitle = '2018年第20期';

        var template =
            '<li class="book">' +
                '<img src="' + bookImg + '" alt="" class="book-img">' +
                '<p class="book-title">' + bookTitle + '</p>' +
            '</li>';
        $('.book-list').append(template);
    }
});

//此处bookName应为上一页点击之后传过来的值
var bookName = '孤独星球';
document.title = '我的订购-' + bookName;