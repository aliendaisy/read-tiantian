//按需显示空vip状态/有列表状态
//dom分别为.empty 和 .list


//加载杂志列表
$.ajax({
    url: '',
    success: function(msg) {
        var bookImg = '../images/getPrize/test.png';
        var bookName = '孤独星球';
        var bookDuring = '(购24期，待发12期)';

        var template =
            '<li class="book">' +
                '<img src="' + bookImg + '" alt="" class="book-img">' +
                '<p class="book-title">' + bookName + '</p>' +
                '<p class="book-during">' + bookDuring + '</p>' +
            '</li>';
        $('.book-list').append(template);
    }
});

