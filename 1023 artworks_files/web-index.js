$(function(){
	$('.products-list').imagesLoaded(function(){
		$('.products-list.masonry').masonry({
			gutter: 20,
			itemSelector: '.item'
		});
	
		$('.similar-list.masonry').masonry({
			gutter: 10,
			itemSelector: '.item'
		});
	});
})

//ajax加载
function AjaxLoadList(){
    var PageData = $('.page-data');
    PageData.each(function(i,e){
        var Name = $(e).attr('name'),
            Page = $(e).attr('page'),
            Max = $(e).attr('max'),
            Where = $(e).attr('where'),
            List = $('#'+Name),
            Switch = true,
            Path = $(e).attr('path');

        ScrollShow($(e),true,function(){
            if(Page && Path && Switch && Max && Where && List.length && Max>Page){
                Switch = false;
                $(e).addClass('loading');
                setTimeout(function(){
                    Page++;
                    $.get(Path,{page:Page,where:Where},function(Data){
                        if(Data){
                        	if(List.hasClass('masonry')){
                        		var $L = $(Data);
                                $L.imagesLoaded(function(){
                                    List.append($L).masonry('appended', $L);
                                });
                        	}else{
                        		List.append(Data);
                        	}
                            Switch = true;
                        }
                        $(e).removeClass('loading');
                    });
                },500);
            }
        });
    });

    return false;
}

function ScrollShow(Obj,Repeat,Callbacks){          //瀵硅薄婊氬姩鍒版祻瑙堝櫒鍙鍖哄煙鏃舵墽琛屽洖璋冨嚱鏁�
    if(Obj.length){
        Obj.each(function(i,e){
            var Site = $(e).offset(),
                Height = $(e).outerHeight(true),
                WinTop = $(this).scrollTop(),         //婊氬姩鏉′綅缃�
                WinHeight = $(this).height(),      //绐楀彛楂樺害
                WinArea = WinTop+WinHeight,        //娴忚鍣ㄥ彲瑙嗗尯鍩�
                IsRepeat = Repeat === true ? true : false,      //閲嶅鎵ц
                Switch = true;                                  //寮€鍏�

            $(window).scroll(function(){
                Site = $(e).offset();
                Height = $(e).outerHeight(true);
                WinTop = $(this).scrollTop();
                WinHeight = $(this).height();
                WinArea = WinTop+WinHeight;
                //document.title = parseInt(Site.top)+' '+WinArea+' | '+parseInt(Height+Site.top)+' '+WinTop;
                if(Site.top <= WinArea && (Height+Site.top) >= WinTop && Switch){
                    $.isFunction(Callbacks) && Callbacks();
                    Switch = false;
                }else{
                    if(IsRepeat === true && Switch === false){
                        Switch = true
                    }
                }
            });
        });
    }
    return;
}

var MySwiper1 = new Swiper('#term_index',{
	slidesPerView : 1,
	slidesPerGroup : 1,
	spaceBetween : 20,
	prevButton:".term-button-prev",
	nextButton:".term-button-next",
	breakpoints:{}
});


$('.list .li').on('click',function(){
    $('#video').removeClass('no');
    $('#big_black').removeClass('no');
    var myPlayer = videojs('my-video');
    var video = $(this).attr('data');
    videojs("my-video").ready(function(){
        window.myPlayer = this;
        myPlayer.src(video);
        myPlayer.load(video);
        myPlayer.play();
    });
});
$('#video .close').on('click',function(){
	var myPlayer = videojs('my-video');
	myPlayer.pause();
	$('#video').addClass('no');
	$('#big_black').addClass('no');
});