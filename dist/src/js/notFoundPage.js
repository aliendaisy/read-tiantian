/**
 * Created by Administrator on 2018/7/25.
 */
function changeTitle(id) {
    switch (id) {
        case 'wrong':
            return '错误';
        case 'loading':
            return '加载中';
        case 'wifi':
            return '无网络';
        default:
            return '404';
    }
}
//传入需要显示的id值，动态修改title值（默认404）
var id = '404';
$('#' + id).show();
document.title = changeTitle(id);