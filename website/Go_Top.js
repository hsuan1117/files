<!DOCTYPE html>
<html>
  <head>
    <script src='//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js'></script>
    <style>
    /* Go Top 按鈕 */
    #goTop {
    position: fixed;
    bottom: 5px ;
    right: 5px ; 
    width: 40px ; 
    height: 40px ; 
    opacity: 0.4 ; 
    z-index: 10 ;
    cursor: pointer;
    transition: all .5s; 
    -webkit-transition: all .5s;
    -moz-transition: all .5s;
    }
    #goTop:hover { 
    opacity: 1; 
    width: 80px; 
    height: 80px; 
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
