window.onload = function(){
    /*搜索*/
    search();
    /*轮播图*/
    banner();
    /*倒计时*/
    downTime();
}
/*搜索*/
function search(){

    /*获取dom元素*/
    /*搜索盒子*/
    var searchBox = document.querySelector('.jd_header_box');
    /*轮播图*/
    var bannerBox = document.querySelector('.jd_banner');
    /*一定的高度*/
    var height = bannerBox.offsetHeight;

    /*监听页面滚动*/
    window.onscroll = function(){
        var top = document.body.scrollTop;
        /*计算当前的搜索盒子的透明度*/
        /*最大的透明度 0.85*/

        var opacity = 0;

        if(top < height){
            opacity = top/height*0.85;
        }else{
            opacity = 0.85;
        }

        /*把透明度设置到搜索盒子*/
        searchBox.style.background = 'rgba(201,21,35,'+opacity+')';
    }
}
/*轮播图*/
function banner(){
    /*轮播图*/
    var banner = document.querySelector('.jd_banner');
    /*当前轮播图宽度*/
    var width = banner.offsetWidth;
    /*图片盒子*/
    var imageBox = banner.querySelector('ul:first-child');
    /*点盒子*/
    var pointBox = banner.querySelector('ul:last-child');
    /*所有的点*/
    var points = pointBox.querySelectorAll('li');

    /*公用的方法*/
    /*加过渡*/
    var addTransition = function(){
        /*加上过渡属性*/
        imageBox.style.transition = 'all 0.2s';/*注意：过渡的时间一定不要大于或定于定时器的时间*/
        imageBox.style.webkitTransition = 'all 0.2s';/*做兼容*/
    };

    /*清过渡*/
    var clearTransition = function(){
        /*清除过渡*/
        imageBox.style.transition = 'none';
        imageBox.style.webkitTransition = 'none';
    };

    /*定位*/
    var setTranslateX = function(translateX){
        imageBox.style.transform = 'translateX('+translateX+'px)';
        imageBox.style.webkitTransform = 'translateX('+translateX+'px)';
    };

    /*当前轮播图的索引  重要*/
    var index = 1;
    /*定时器*/
    var timer = setInterval(function(){
        /*下一张*/
        index ++;
        /*动画的移动下一张*/
        /*加上过渡属性*/
        addTransition();
        /*改变当前的定位*/
        setTranslateX(-index*width);
    },4000);

    jdm.transitionEnd(imageBox,function(){
        if(index >= 9){
            /*自动轮播时候的无缝衔接*/
            index = 1;
            /*还能以过渡的形式定位过去吗  动画*/
            /*清除过渡*/
            clearTransition();
            /*在定位 瞬间*/
            setTranslateX(-index*width);
        }else if(index <= 0){
            /*滑动时候的无缝衔接*/
            index = 8;
            /*还能以过渡的形式定位过去吗  动画*/
            /*清除过渡*/
            clearTransition();
            /*在定位 瞬间*/
            setTranslateX(-index*width);
        }

        /*设置对应的点*/
        setPoint();
    });

    /*知道当期图片的序号*/
    var setPoint = function(){
        /*清除上一次的当前样式*/
        for(var i = 0 ; i < points.length; i++){
            points[i].className = " ";
        }
        /*给当前对应的点加上当前样式*/
        points[index-1].className = "current";
    }

    /*记录起始滑动的时候的x坐标*/
    var startX = 0;
    /*记录滑动的时候的X坐标*/
    var moveX =0;
    /*计算两个点的位子的改变*/
    var distanceX = 0;
    /*是否滑动过*/
    var isMove = false;


    /*只有执行了三个事件才算是滑动过了*/
    imageBox.addEventListener('touchstart',function(e){
        startX = e.touches[0].clientX;
        /*清除定时器*/
        clearInterval(timer);
    });
    imageBox.addEventListener('touchmove',function(e){
        moveX = e.touches[0].clientX;
        distanceX = moveX - startX;
        console.log(distanceX);
        /*滑动起来  原理不停的定位*/
        clearTransition();
        /*随着手指做定位*/
        /*计算当前图片的定位*/
        var translateX = -index*width + distanceX;
        setTranslateX(translateX);
        isMove = true;
    });
    /*在模拟器试用touchend的是可能会丢失*/
    /*始终在window是可以捕捉到*/
    window.addEventListener('touchend',function(e){

        if(isMove && Math.abs(distanceX) > width/3){
            /*上一张*/
            if(distanceX>0){
                index --;
            }
            /*下一张*/
            else{
                index ++;
            }
            /*加过渡*/
            addTransition();
            /*定位*/
            setTranslateX(-index*width);
        }else{
            /*回到原来的位子*/
            /*加过渡*/
            addTransition();
            /*定位*/
            setTranslateX(-index*width);
        }

        /*重置记录的参数*/
        startX = 0;
        moveX = 0;
        distanceX =0;
        isMove = false;

        /*离开时候再加上*/
        /*保证只加一次 严谨考虑*/
        clearInterval(timer);
        timer = setInterval(function(){
            /*下一张*/
            index ++;
            /*动画的移动下一张*/
            /*加上过渡属性*/
            addTransition();
            /*改变当前的定位*/
            setTranslateX(-index*width);
        },4000);
    });

}
/*倒计时*/
function downTime(){

    var skTime = document.querySelector('.sk_time');
    /*所有的span*/
    var spans = skTime.querySelectorAll('span');

    /*假设了一个时间*/
    var time = 3 * 60 * 60 ;

    /*定时器*/
    var timer = setInterval(function(){
        time --;

        if(time<0){
            clearInterval(timer);
            return false;
        }

        /*转格式*/
        var h = Math.floor(time/3600);/*小时*/
        var m = Math.floor(time%3600/60);/*分钟*/
        var s = time%60;

        spans[0].innerHTML = Math.floor(h/10);
        spans[1].innerHTML = h%10;

        spans[3].innerHTML = Math.floor(m/10);
        spans[4].innerHTML = m%10;

        spans[6].innerHTML = Math.floor(s/10);
        spans[7].innerHTML = s%10;

    },1000);

}

