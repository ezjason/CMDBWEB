//组件样式
import 'element-ui/lib/theme-default/index.css'

//全局统一样式(含登陆界面样式)
import "../static/less/again.less";

//全局组件样式(含element-ui的覆盖样式)
import "../static/less/plugin.less";

//字体样式
import "../static/iconFont/css/iconFont.css";
import "../static/fontAwesome/css/font-awesome.min.css";

//兼容console处理
if(!window.console){
    window.console={
        log(){}
    }
}
