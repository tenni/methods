var tools = tools || {};

// 公用功能
tools.public = {
	isAndroid: navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1, //android终端 if (isAndroid==true)
	init: function(){
		var t = this;
		// 每个页面都有
		// t.statistics();
		
		// 两个页面以上
		t.nav('.header-new');
		t.sideHotPics(".block-pic-title2");
		t.changeColor(".js-hover");
		t.channelHot(".block-pic-title");
		t.baiduSearch();
	},

	// 滚动悬浮
	rightFloat: function(floatBox,main,side,footer,body){
		
		$(body).css('position', 'relative');
		document.writeln('<style>.fixed-div2{position: fixed; top:0px; z-index: 999; margin-top:-30px;}.fixed-div3{position: absolute; bottom:0px; z-index: 999;}.floatBox{width: 362px;}</style>');

		
	    var _floatBoxT=$(floatBox).offset().top;// 悬浮框top
		$(window).scroll(function() {
		    var _floatBoxH=$(floatBox).height();// 悬浮高度
		    var _mainH=$(main).height();// 主栏高度
		    var _sideH=$(side).height();// 侧栏高度
			var _footerT = $(footer).offset().top; // 页眉top
			if (_mainH > _sideH) {
				if ($(this).scrollTop() > _floatBoxT-30) {
					$(floatBox).addClass('fixed-div2');
					if ($(this).scrollTop() > _footerT - _floatBoxH) {
						$(floatBox).removeClass('fixed-div2');
						$(floatBox).addClass('fixed-div3');
					} else {
						$(floatBox).removeClass('fixed-div3');
						$(floatBox).addClass('fixed-div2');
					}
				} else {
					$(floatBox).removeClass('fixed-div2').removeClass('fixed-div3');
				}
			}
		})
	},

	// 搜索
	baiduSearch: function(){
		if ($('.m-search').length > 0) {
			var _text = $('.m-search .text');
			$('.search-button').click(function() {
				if ("" != _text.val().trim()) {
					var val = _text.val();
					window.open("http://zhannei.baidu.com/cse/search?s=3401906806299373792&q=" + val);
				} else {
					window.open("http://zhannei.baidu.com/cse/search?s=3401906806299373792");
				}
			});
			_text.keydown(function(event) {
				event = event || window.event;//前者火狐，后者ie
		        if (event.keyCode == 13) {
		            if ("" == _text.val().trim()) {
		                return false;
		            }           
		            $('.search-button').click();
		        }
			})
		}
	},
	
	// 频道热点
	channelHot: function(obj){
		if ($(obj).length>0) {
			$('.block-pic-title li').mouseover(function(){
				$(this).addClass('cur').siblings('.cur').removeClass('cur');
			});
		}
	},
	//改变标题颜色
	changeColor: function(obj){
		if ($(obj).length>0) {
			$(obj).hover(function() {
				$(this).parent().siblings().find('.js-color').attr('style', 'color:#f60');
			}, function() {
				$(this).parent().siblings().find('.js-color').removeAttr('style');
			});
		}
	},

	// 导航
	nav: function(obj){
		if ($(obj).length>0) {
			$(obj+' dt').on('mouseover', function(event) {
				event.preventDefault();
				$(this).parent().addClass('cur').siblings('.cur').removeClass('cur');
				$('.crumbs .g-w').css('visibility', 'hidden');
			});
			$(obj).on('mouseleave', function(event) {
				event.preventDefault();
				$(this).find('.nav .cur').removeClass('cur');
				$('.crumbs .g-w').css('visibility', 'visible');
			});
		}
	},
	
	// 右侧热门图库
	sideHotPics: function(obj){
		if ($(obj).length>0) {
			$(obj).slide({titCell:".hd ul",mainCell:".list",autoPage:true,effect:"left",autoPlay:false,interTime : 3500,delayTime:0});
		}
	},

	statistics: function(){
		// 百度推送
		(function(){
			var nowurl=window.location.href;
			//LFL 2015-11-06 17:52:56 排除动态页和带参数页面
			if(nowurl.indexOf("?") != -1){
				//alert("不推送");
				return false;
			}
			var bp = document.createElement('script');
			bp.src = '//push.zhanzhang.baidu.com/push.js';
			var s = document.getElementsByTagName("script")[0];
			s.parentNode.insertBefore(bp, s);
		})();

		//cnzz统计
		document.writeln("<div style=\'display:none;\'><script src=\'https://w.cnzz.com/c.php?id=1260890147&l=3\' language=\'JavaScript\'></script></div>");

		//百度统计
		var _hmt = _hmt || [];
		(function() {
		  var hm = document.createElement("script");
		  hm.src = "https://hm.baidu.com/hm.js?2ac835af74eae6fa026632f75772be35";
		  var s = document.getElementsByTagName("script")[0]; 
		  s.parentNode.insertBefore(hm, s);
		})();
	},

	// 回顶
	backTop: function(){
		$(window).scroll(function(){
			if ($(window).scrollTop()>200){
				$(".back-top").show();
			} 
			else { 
				$(".back-top").hide();
			} 
		}); 

		$(".back-top").click(function(){
			scrollTo(0,0);
		});
	},

	// 地区判断
	areaJudge: function(){
		document.writeln("<script src=\'http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js\' type=\'text/ecmascript\'></script>");
	},

	// 百度分享
	baiduShare: function(){
		with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion='+~(-new Date()/36e5)];
	}
}

// 首页
tools.home = {
	init: function(){
		$(".one-screen .main-c .slide").slide({titCell:".hd ul",mainCell:".bd ul",autoPage:true,autoPlay:true,interTime : 3500,effect:"fold",delayTime:1000});
		$(".one-screen .main-c .slide").find('.bd li').eq(0).stop().css('opacity', '1');

		$(".l-vogue .side-c .top .slide").slide({titCell:".hd ul",mainCell:".bd ul",autoPage:true,autoPlay:true,interTime : 3500,effect:"fold",delayTime:1000});
		$(".l-vogue .side-c .top .slide").find('.bd li').eq(0).stop().css('opacity', '1');

		$(".l-life .main-c .main-c-b .slide").slide({titCell:".hd ul",mainCell:".bd ul",autoPage:true,autoPlay:false,interTime : 3500,effect:"fade",delayTime:1000});
		$(".l-life .main-c .main-c-b .slide").find('.bd li').eq(0).stop().css('opacity', '1');

		$('.l-recreation .first .side-c .list li').on('mouseover', function(event) {
			event.preventDefault();
			$(this).addClass('cur').siblings('.cur').removeClass('cur');
		});

		//显示隐藏箭头
		$(".js-arrow").hover(function() {
			$(this).find('.prev').stop().animate({ left: '15'}, 300);
			$(this).find('.next').stop().animate({ right: '15'}, 300);
		}, function() {
			$(this).find('.prev').stop().animate({ left: '-40'}, 300);
			$(this).find('.next').stop().animate({ right: '-40'}, 300);
		});

		$('.l-recreation .second li').on('mouseover', function(event) {
			event.preventDefault();
			$(this).addClass('cur').siblings('.cur').removeClass('cur');
		});
		//滑上滑下升级版
		$('.js-slide01').hover(function() {
			$(this).find('.text-bg').stop().animate({ bottom: 0}, 300)
		}, function() {
			$(this).find('.text-bg').stop().animate({ bottom: -36}, 300)
		});
	}
}

// 列表页
tools.list = {
	init: function(){
		var g = tools.public;
		$(".block-hot-search,.block-pic-title2").wrapAll('<div class="floatBox"></div>');
		g.rightFloat(".floatBox",".main-left",".main-right",".footer",".list-main");
	}
}

// 内容页
tools.content = {
	init: function(){
		var t = this;

		var g = tools.public;
		g.baiduShare();

		$(".block-hot-search,.block-pic-title2").wrapAll('<div class="floatBox"></div>');
		g.rightFloat(".floatBox",".main-left",".main-right",".footer",".mainlf");
	},
	// 畅言
	changyan: function(){

	}
}

// 图库
tools.gallery = {
	init: function(){
		$(".js-slide-first").slide({titCell:".hd ul",mainCell:".bd ul",autoPage:true,effect:"fold",autoPlay:true,interTime : 3500,delayTime:1000,startFun:function(i){
			var link=$(".js-slide-first .bd li").eq(i).find('a').attr('href');
			var title=$(".js-slide-first .bd li").eq(i).find('img').attr('alt');
			var text=$(".js-slide-first .bd li").eq(i).find('img').attr('data-text');
			var name=$(".js-slide-first .bd li").eq(i).find('img').attr('data-name');
			var type=$(".js-slide-first .bd li").eq(i).find('img').attr('data-type');
			$(".js-slide-first .info h3 a").attr('href', link);
			$(".js-slide-first .info h3 a").html(title);
			$(".js-slide-first .info .text").html(text);
			$(".js-slide-first .info .name").html(name);
			$(".js-slide-first .info .type").html(type);
		}});

		$(".js-slide-first").find('.bd li').eq(0).stop().css('opacity', '1');
		$(".js-slide-first").hover(function() {
			$('.g-first .m-slide .btn').show();
		}, function() {
			$('.g-first .m-slide .btn').hide();
		});
		}
}

// 图库
tools.ztInner = {
	init: function() {
		var g = tools.public;
		$(".block-hot-search").wrapAll('<div class="floatBox"></div>');
		g.rightFloat(".floatBox",".main-left",".main-right",".footer",".list-main");
	}

}

/**
 * 调用
 */
// 每个页面都有
tools.public.init();

// 首页
if ($('.p-home').length>0) {
	tools.home.init();
}

// 列表页
if ($('.p-list').length>0) {
	tools.list.init();
}

// 内容页
if ($('.p-content').length>0) {
	tools.content.init();
}

// 图库
if ($('.p-gallery').length>0) {
	tools.gallery.init();
}

// 专题内页
if ($('.p-zt-inner').length>0) {
	tools.ztInner.init();
}