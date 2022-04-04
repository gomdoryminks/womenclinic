/**
 * @author minks
 */

$(function() {
    //상위 메뉴 밑의 하위 메뉴 보이기&숨기기
	$('nav.nav .top_menu>li').on("mouseover", function(evt) {
		evt.preventDefault();
        $('nav.nav aside.aside').stop(true,true).slideDown(400);
	});
	
	$('nav.nav').on("mouseleave", function(evt) {
		evt.preventDefault();
        $('nav.nav aside.aside').stop(true,true).slideUp(400);
	});
	
	$('.mb_area .mb_box .top_menu>li .top_menu_tit').click(function() {
		if ($(this).next('.top_sub_menu').css("display") == "block") {
			$(this).next('.top_sub_menu').stop(true,true).slideUp();
			$(this).removeClass("rotate");
			return false;
		} else {
			$('.mb_area .mb_box .top_menu>li .top_sub_menu').slideUp();
            $('.mb_area .mb_box .top_menu>li .top_menu_tit').removeClass("rotate");
			$(this).next('.top_sub_menu').stop(true,true).slideDown();		
			$(this).addClass("rotate");
			return false;
		}
	});
    
	//모바일 슬라이드 메뉴 보이기&숨기기
	$('.mb_area .mb_btn').click(function() {
		if ($('.mb_area .mb_menu').css("display") == "none") {
			$('.mb_area .mb_menu').css('display','block');
			$('.mb_area .mb_menu').css('z-index','999');
			$('.mb_area .mb_box').css('left','0px');
			$('.mb_area .line1').addClass('line11');
			$('.mb_area .line2').addClass('line22');
			$('.mb_area .line3').addClass('line33');
			//$('body').css('overflow','hidden');
		} else {
			$('.mb_area .mb_menu').css('display','none');
			$('.mb_area .mb_menu').css('z-index','-1');
			$('.mb_area .mb_box').css('left','-300px');
			$('.mb_area .line1').removeClass('line11');
			$('.mb_area .line2').removeClass('line22');
			$('.mb_area .line3').removeClass('line33');
			//$('body').css('overflow','scroll');
		}
	});
    
    //카테고리에 따라 내용 변경
    $(".content_main .content_type>li").bind("click", function() {
        var data_type = $(this).attr("data-type");
        $(".content_main .content_type>li").removeClass("active");
        $(".content_main .content_type_con").css("display","none");
        $(this).addClass("active");
        $(".content_main #content_type_" + data_type).css("display","block");
    });
    
    if ($(".content_main .content_type>li.active").length > 0) {
        var li_index = $(".content_main .content_type>li.active").index();
        $(".content_main .content_type>li").eq(li_index).trigger("click");
    } else {
        $(".content_main .content_type>li").eq(0).trigger("click");
    }
    
    //퀵메뉴 설정
    if ($(".content_quick").length > 0) {
        var cssTop = parseInt($(".content_quick").css("top"));
		quickTop(cssTop);
		quickRight(cssTop);
		
		$(window).resize(function() {
			quickTop(cssTop);
			quickRight(cssTop);
		});

        $(window).scroll(function() {
			quickTop(cssTop);
        });
    }
    
    //slick 슬라이드
    $('.slider-for').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        fade: false,
        asNavFor: '.slider-nav',
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        prevArrow: '<div class="slider-prev-arrow"><img src="../img/slide_prev_arrow.png" alt="slide_prev_arrow"></div>',
        nextArrow: '<div class="slider-next-arrow"><img src="../img/slide_next_arrow.png" alt="slide_next_arrow"></div>'
    });
    
    $('.slider-nav').slick({
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        fade: false,
        asNavFor: '.slider-for',
        focusOnSelect: true,
        responsive: [
            {
                breakpoint: 901,
                settings: {
                    slidesToShow: 3
                }
            }
        ]
    });
});

//퀵메뉴 top 설정
function quickTop(cssTop) {
    var winWidth = window.innerWidth;
    var position = $(window).scrollTop();
    var areaHeight = $(".content_main").outerHeight();
    var quickHeight = $(".content_quick").outerHeight();
    var quickWidth = $(".content_quick").outerWidth();
    var conTopHeight = 0;
    var conTitHeight = 0;
    
    if ($(".content_top").length > 0) {
        conTopHeight = $(".content_top").height();
    }
    
    if ($(".content_tit_area").length > 0) {
        conTitHeight = $(".content_tit_area").height();
    }
    
    if (areaHeight > quickHeight) {
        var total = cssTop + position - conTopHeight - conTitHeight;

        if (total < cssTop) { 
            total = cssTop;
        }

        if (total > (areaHeight - quickHeight)) {
            total = areaHeight - quickHeight;
        }

        $(".content_quick").stop().animate({
            "top" : total + "px"
        }, 1000);
    }
}

//퀵메뉴 right 설정
function quickRight(cssTop) {
    var winWidth = window.innerWidth;
    var areaWidth = $(".content_main").outerWidth();
    var quickWidth = $(".content_quick").outerWidth();
    var areaMargin = 0;

    if (winWidth > 1500) {
        areaMargin = (areaWidth - 1400) / 2;
    } else {
        areaMargin = areaWidth * 0.03;
    }

    if (areaMargin > (quickWidth + 20)) {
        var rightVal = areaMargin - (quickWidth + 20);
        $(".content_quick").css("right", rightVal + "px");
    } else {
        $(".content_quick").css("right", 0);
    }
}

