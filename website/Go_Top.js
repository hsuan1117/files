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
