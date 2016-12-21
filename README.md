# 京东移动端首页、分类页、购物车

## 基本

### HTML

- 视口设置，适配移动端

  ```html
    <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=0"/>
  ```

### CSS

- 初始化 css 并做移动端兼容

  ```css
    *,
    ::before,
    ::after{
      margin: 0;
      padding: 0;
      /*设置所有的盒子的宽度从边框开始计算*/
      /*在移动端在兼容主流浏览器  必须要兼容的是webkit内核*/
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      /*清除移动端点击高亮效果*/
      -webkit-tap-highlight-color: transparent;
    }

    input,textarea{
      border: none;
      outline: none;

      resize: none;/*不让用户自动调整大小 textarea */
      /*在移动端 清除浏览器默认的效果*/
      -webkit-appearance: none;/*清除控件默认样式*/
    }
  ```

- 书写通用公共类

  清除浮动、左右浮动、精灵图公共样式等

- 使用百分比布局

### JS

- 公有方法使用命名空间，防止污染全局空间

- 封装兼容性 transitionEnd 事件

- 封装 tap 方法，用于处理移动端轻触点击事件

## 首页

- 轮播图自动轮播，点图同步

- 轮播图移动端滑动手势处理，并加上磁性吸附效果

- 倒计时

## 分类页

- 仿照 [iscroll](https://github.com/cubiq/iscroll) 封装 iScroll 类，实现分类列表的滑动事件处理

## 购物车

- 使用 [animate.css](https://github.com/daneden/animate.css) 动画库完成页面的相关动效
