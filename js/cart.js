window.onload = function () {
    /*删除弹框*/
    deleteWin();
  }
  /*删除弹框*/
function deleteWin() {

  var jdWin = document.querySelector('.jd_win');
  var jdWinBox = jdWin.querySelector('.jd_win_box');

  var deleteBtns = document.querySelectorAll('.option_delete');

  var up = null;

  for (var i = 0; i < deleteBtns.length; i++) {
    deleteBtns[i].onclick = function () {
      /*1.点击删除按钮*/
      jdWin.style.display = 'block';
      jdWinBox.className = 'jd_win_box myBounceInDown';

      up = this.querySelector('.delete_up');

      up.style.webkitTransition = 'all 1s';
      up.style.transition = 'all 1s';

      up.style.webkitTransformOrigin = 'left bottom';
      up.style.transformOrigin = 'left bottom';

      up.style.webkitTransform = 'rotate(-30deg) translateY(2px)';
      up.style.transform = 'rotate(-30deg) translateY(2px)';

    }
  }

  jdWinBox.querySelector('.cancel').onclick = function () {
    jdWin.style.display = 'none';

    if (up) {
      up.style.webkitTransform = 'none';
      up.style.transform = 'none';
    }
  }

}
