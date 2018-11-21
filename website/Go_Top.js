<!DOCTYPE html>
<html>
  <head>
    <script src='//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js'></script>
    <style>
    /* Go Top 按鈕 */
    #goTop {
    position: fixed;
    bottom: 5px; /* 與下方的距離, 也可改為百分比, 即為距離螢幕下方的百分比 */
    right: 5px; /* 與右方的距離 */
    width: 40px; /* 按鈕原始寬度 */
    height: 40px; /* 按鈕原始高度 */
    opacity: 0.4; /* 按鈕原始透明度 */
    z-index: 10;
    cursor: pointer;
    transition: all .5s; /* 動畫效果 持續期間 */
    -webkit-transition: all .5s;
    -moz-transition: all .5s;
    }
    #goTop:hover { /* 滑鼠經過按鈕時 */
    opacity: 1; /* 透明度 */
    width: 80px; /* 按鈕寬度 */
    height: 80px; /* 按鈕高度 */
    }
    </style>
  </head>
  <body>
    <!-- Go Top 按鈕+動畫 start -->
    <img id="goTop" src="https://raw.githubusercontent.com/chiyi4488/Yi-s-Blog/master/back-to-top(big).png" title="Back to Top"/>
    <script>
    $.extend($.easing, {
    easeOutExpo: function (x, t, b, c, d) {
    return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
    }
    });
    $("#goTop").click(function(){
    $("html, body").animate({scrollTop: 0}, 1000, "easeOutExpo");
    });
    </script>
    <!-- Go Top 按鈕+動畫 end, Designed by WFU BLOG -->
  </body>
</html>
