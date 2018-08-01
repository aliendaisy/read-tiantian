function selectSideItem() {
    $('.side-item').click(function() {
        $('.side-item').removeClass('active');
        $(this).addClass('active');

        //后台获取双重数组，在window.onload时加载，点击sidebar的item后，替换book-list里的数据，得到对应的杂志列表
    });
}

selectSideItem();

