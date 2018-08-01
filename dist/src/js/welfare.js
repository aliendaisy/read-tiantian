var welfare = 35;
var _per = $('#heart-percent');


switch (true) {
    case welfare > 75:
        _per.attr('src', '../images/welfare/pic_game_ball75@2x.png');
        break;
    case welfare > 50:
        _per.attr('src', '../images/welfare/pic_game_ball50@2x.png');
        break;
    case welfare > 25:
        _per.attr('src', '../images/welfare/pic_game_ball25@2x.png');
        break;
    default:
        _per.attr('src', '../images/welfare/pic_game_ball0@2x.png');
}