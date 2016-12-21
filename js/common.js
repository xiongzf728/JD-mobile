/*定义一个空间 专门来定义公用的方法*/

/*挂一个全局变量在window下面*/
window.jdm = {};

/*封装一个兼容的transitionEnd事件的方法*/
jdm.transitionEnd = function(dom,callback){
    /*
    * 1.给谁绑定   dom
    * 2.处理什么逻辑  callback  方法块（）  调用
    * */

    if(dom && typeof dom == 'object'){
        dom.addEventListener('webkitTransitionEnd',function(){
            /*同一个逻辑*/
            callback && callback();
            /*if(callback){
                callback();
            }*/
        });
        dom.addEventListener('transitionEnd',function(){
            /*同一个逻辑*/
            callback && callback();
        });
    }

}

/*封装一个tap方法*/
jdm.tap = function(dom,callback){

    if(dom && typeof dom == 'object') {

        /*在触发touchend的时候计算时间差 */
        /*判断有没有触发touchmove */

        var startTime = 0;
        var isMove = false;

        dom.addEventListener('touchstart', function (e) {
            /* 时间戳 */
            startTime = Date.now();
        });

        dom.addEventListener('touchmove', function (e) {
            isMove = true;
        });

        dom.addEventListener('touchend', function (e) {
         
            if(!isMove && (Date.now()-startTime)<150){
                /*处理触发了这个tap事件的逻辑*/
                callback && callback(e);
            }

            /*重置参数*/
            isMove = false;
            startTime = 0;
        });
    }

}



