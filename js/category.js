window.onload = function () {
    /*左侧栏js效果*/
    leftSwipe();
    /*右侧栏*/
    rightSwipe();
  }
  /*左侧栏js效果*/
function leftSwipe() {
  var parentBox = document.querySelector('.jd_category_left');
  var childBox = parentBox.querySelector('ul');
  var lis = childBox.querySelectorAll('li');

  /*父元素的高度*/
  var parentHeight = parentBox.offsetHeight;
  /*子元素的高度*/
  var childHeight = childBox.offsetHeight;
  /*===计算定位区间*/
  var maxPosition = 0;
  var minPosition = parentHeight - childHeight;
  /*缓冲的距离*/
  var distance = 100;
  /*滑动区间*/
  var maxSwipe = maxPosition + distance;
  var minSwipe = minPosition - distance;

  /*公用的方法*/
  /*加过渡*/
  var addTransition = function () {
    /*加上过渡属性*/
    childBox.style.transition = 'all 0.2s'; /*注意：过渡的时间一定不要大于或定于定时器的时间*/
    childBox.style.webkitTransition = 'all 0.2s'; /*做兼容*/
  };

  /*清过渡*/
  var clearTransition = function () {
    /*清除过渡*/
    childBox.style.transition = 'none';
    childBox.style.webkitTransition = 'none';
  };

  /*定位*/
  var setTranslateY = function (translateY) {
    childBox.style.transform = 'translateY(' + translateY + 'px)';
    childBox.style.webkitTransform = 'translateY(' + translateY + 'px)';
  };

  /*记录当前盒子的定位的一个参数*/
  var currentY = 0;

  /*让左侧栏滑动起来 */
  var startY = 0;
  var moveY = 0;
  var distanceY = 0;

  /*绑定事件*/
  childBox.addEventListener('touchstart', function (e) {
    startY = e.touches[0].clientY;
  });
  childBox.addEventListener('touchmove', function (e) {
    moveY = e.touches[0].clientY;
    distanceY = moveY - startY;
    clearTransition();
    /*将要去定位的位置  滑动*/
    if ((currentY + distanceY) < maxSwipe && (currentY + distanceY) > minSwipe) {
      setTranslateY(currentY + distanceY);
    }

  });
  window.addEventListener('touchend', function (e) {
    /*滑动结束的时候  现在想要去做定位的位置超过了最大定位*/
    if ((currentY + distanceY) > maxPosition) {
      currentY = maxPosition;
      addTransition();
      setTranslateY(currentY);
    }
    /*滑动结束的时候  现在想要去做定位的位置超过了最小定位*/
    else if ((currentY + distanceY) < minPosition) {
      currentY = minPosition;
      addTransition();
      setTranslateY(currentY);
    }
    /*正常情况*/
    else {
      /*这次记录的当前定位  是下一次滑动基准的定位*/
      currentY = currentY + distanceY;
    }

    /*重置参数*/
    startY = 0;
    moveY = 0;
    distanceY = 0;
  });

  jdm.tap(childBox, function (e) {
    /*当前点击的li*/
    var currLi = e.target.parentNode;

    for (var i = 0; i < lis.length; i++) {
      lis[i].className = " ";
      lis[i].index = i;
    }

    currLi.className = 'now';

    /*计算 将要去做定位的位子  当前索引 li 高度*/
    var translateY = -currLi.index * 50;

    /*计算最终的定位  当前currentY*/
    /*在定位区间范围内*/
    if (translateY > minPosition) {
      currentY = translateY;
      addTransition();
      setTranslateY(currentY);
    }
    /*不在定位区间内*/
    else {
      currentY = minPosition;
      addTransition();
      setTranslateY(currentY);
    }

  })

}

function rightSwipe() {
  jdm.iScroll({
    swipeDom: document.querySelector('.jd_category_right'),
    swipeType: 'y',
    swipeDistance: 50
  });
}
