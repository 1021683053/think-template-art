# think-template-art for ThinkJS

## Install

```sh
  npm install think-template-art
```

## How to use

#### 注册 `adapter`

添加文件`src/common/bootstrap/adapter.js`.
```javascript
import artTemplate from 'think-template-art';
think.adapter('template', 'art', artTemplate);
```

#### 配置

修改配置文件 `src/common/config/view.js`:
```javascript
export default {
  type: 'art',
  content_type: 'text/html',
  file_ext: '.html',
  file_depr: '_',
  root_path: think.ROOT_PATH + '/view',
  helper_path: think.RESOURCE_PATH+'/static/js/template.helper.js',
  adapter: {
    ejs: {},
    art: {
        //这里书写 art-template 配置，如果基础配置存在，将覆盖基础配置
    }
  }
};
```
#### helper函数配置
修改 `config/view`中的 `helper_path` helper函数的格式为
```javascript
!(function(){

    let helpers  = {};

    /**
     * 对日期进行格式化，
     * @param date 要格式化的日期
     * @param format 进行格式化的模式字符串
     *     支持的模式字母有：
     *     y:年,
     *     M:年中的月份(1-12),
     *     d:月份中的天(1-31),
     *     h:小时(0-23),
     *     m:分(0-59),
     *     s:秒(0-59),
     *     S:毫秒(0-999),
     *     q:季度(1-4)
     * @return String
     */
    helpers.dateFormat = function (date, format) {
        if( [].toString.call(date) != '[object Date]' ){
            date = new Date(date-0);
        }
        var map = {
            "M": date.getMonth() + 1, //月份
            "d": date.getDate(), //日
            "h": date.getHours(), //小时
            "m": date.getMinutes(), //分
            "s": date.getSeconds(), //秒
            "q": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };

        console.log(map);
        format = format.replace(/([yMdhmsqS])+/g, function(all, t){
            var v = map[t];
            if(v !== undefined){
                if(all.length > 1){
                    v = '0' + v;
                    v = v.substr(v.length-2);
                }
                return v;
            }
            else if(t === 'y'){
                return (date.getFullYear() + '').substr(4 - all.length);
            }
            return all;
        });
        return format;
    };

    // RequireJS && SeaJS
    if (typeof define === 'function') {
        define(function() {
            return helpers;
        });
    // NodeJS
    } else if (typeof exports !== 'undefined') {
        module.exports = helpers;
    } else {
        this.helpers = helpers;
    }
})();
```
拷贝后放到你需要的位置

**如果你需要同构页面务必把文件放到 `/www/static` 中**

[辅助方法的例子](http://aui.github.io/artTemplate/demo/helper.html)
 | [art-template文档](https://github.com/aui/artTemplate) | [ThinkJS文档](https://thinkjs.org/zh-cn/doc/index.html)
## LICENSE

MIT
