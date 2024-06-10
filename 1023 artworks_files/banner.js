
$(document).ready(function() {
  $("#owl-demo").owlCarousel({
  navigation : true,
  slideSpeed : 300,
  paginationSpeed : 400,
  autoPlay:3000,
  singleItem : true
  });
});

 function SetBannerWidth(){
    var zoomWidth = 640; //缩放阀值992px, 即所有小于992px的视口都会对原图进行缩放, 只是缩放比例不同
    var maxWidth = 1920; //最大宽度1920px
    var ratio = 1; //缩放比例
    var viewWidth = $(window).width()//window.innerWidth; // 视口宽度
    if (viewWidth < 640) { //当视口小于768时(移动端), 按992比例缩放
        //ratio = viewWidth / zoomWidth; //视口宽度除以阀值, 计算缩放比例
        ratio = viewWidth/maxWidth;
        $("#owl-demo .item").find('a>img').each(function () {
            var src=$(this).attr('minsrc');
            $(this).attr('src',src);
        });
    }else{
        ratio = viewWidth/maxWidth;
        $("#owl-demo .item").find('a>img').each(function () {
            var src=$(this).attr('maxsrc');
            $(this).attr('src',src);
        });
    }
    var width = maxWidth * ratio; //缩放宽度
    $("#owl-demo .item").find('a>img').each(function () {
        $(this).css({
            "width": '100%',
            //"max-width": width,
            //"margin-left": viewWidth<720?-(width - viewWidth) / 9:-(width - viewWidth) / 2
            //"margin-left":-(width - viewWidth)/9
        }); //图片自适应居中, 图片宽度与视口宽度差除以2的值, 设置为负margin
    });
 }


 SetBannerWidth(); //页面加载时初始化并检查一次
 $(window).resize(function(){
    SetBannerWidth();//判断是否绽放banner
 })