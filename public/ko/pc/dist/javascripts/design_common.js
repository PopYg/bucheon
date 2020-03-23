"use strict";
var winW;
var winH;
var esStep = "Expo.ease";
var $window = $(window);
var winSc;
var htmlH;

$window.load(function () {
    htmlH = $("body").outerHeight(true);
    winSc = $(this).scrollTop();
    $window.on("resize", function () {
        winW = $(this).width();
        winH = $(this).height();
    });
    $(this).trigger("resize");
    $(window).scroll(function () {
        winSc = $(this).scrollTop();
    });
    /**
     * Shift + Tab
     * @param callback
     * @param event
     * @returns {boolean}
     * @constructor
     */
    function Shifttab(callback, event){
        var e = event;
        var charCode = e.which || e.keyCode;
        if (e.shiftKey === true) {
            if (charCode === 9) {
                callback();
                return true;
            }
        } else {
            return false;
        }
    }

    /**
     * Tab
     * @param callback
     * @param event
     * @returns {boolean}
     * @constructor
     */
    function Tab(callback, event){
        var e = event;
        var charCode = e.which || e.keyCode;
        if (e.shiftKey === false) {
            if (charCode === 9) {
                callback();
                return true;
            }
        } else {
            return false;
        }
    }
    main();
    layout();
    scrollEvent();
});
function layout() {
    var $gnb = $("#gnb");
    var $gnbTxtOpen = $("#gnbTxtOpen");
    var $gnbDepth01 = $gnb.find(".gnb_depth01"),
        $1depthBtn = $gnbDepth01.find("> li > button, > li > a");
    var $gnbDepth02 = $gnb.find(".gnb_depth02"),
        $2depthBtn = $gnbDepth02.find("> li > button, > li > a");
    var $gnbDepth03 = $gnb.find(".gnb_depth03");

    $gnbTxtOpen.click(function(){
        if(!$gnb.hasClass("nav_open")){
            $gnb.addClass("nav_open");
            TweenMax.to($gnbDepth01, .3, {width:250, ease:esStep});
        } else {
            $gnb.removeClass("nav_open");
            TweenMax.to($gnbDepth01, .3, {width:80, ease:esStep});
        }
    });
    //1뎁스 버튼 클릭
    $1depthBtn.click(function(){
        var _this = $(this);
        $1depthBtn.removeClass("active");
        _this.addClass("active");
    });
    //2뎁스 버튼 클릭
    $2depthBtn.click(function(){
        var _this = $(this);
        if(!_this.hasClass("active")){
            $2depthBtn.removeClass("active");
            _this.addClass("active");
        } else {
            _this.removeClass("active");
        }
    });
}




function main() {

}
































function scrollEvent(){
    var $topBtn = $("#topBtn");
    var $pallIcon = $("#pallIcon");
    var $pallRight = $pallIcon.find(".right_icon, .right_bottom_icon, .bottom_icon");
    var $pallLeft = $pallIcon.find(".left_icon, .left_bottom_icon");
    var $subVisual = $("#subVisual");

    $(window).scroll(function () {
        //스크롤에 따른 bg 패럴럭스
        $(".pall_bg").each(function () {
            var offset = $(this).offset();
            var offsetTop = offset.top;
            var _this_h = $(this).innerHeight();
            var _bg_p = (winSc - offsetTop) / _this_h * 100;
            $(this).css({"background-position-y":-_bg_p.toFixed(2) / 2 + "%"});
        });
        //서브 비쥬얼 bg 패럴럭스
        $subVisual.css({"background-position-y":-170 + winSc / 2});

        //탑버튼 하단 위치 고정
        if(winSc > 500){
            TweenMax.to($topBtn, .3, {opacity:1, display:"block"});
        } else {
            TweenMax.to($topBtn, .3, {opacity:0, display:"none"});
        }
        if (winSc > htmlH - 190 - winH) {
            $topBtn.addClass("fixed");
        } else {
            $topBtn.removeClass("fixed");
        }

        //서브 페이지 패럴럭스 아이콘
        var _pallPos = Math.ceil(winSc / 30);
        TweenMax.to($pallRight, 1, {y:-_pallPos, ease:es_step});
        TweenMax.to($pallLeft, 1, {y:_pallPos, ease:es_step});

    });

    $topBtn.click(function () {
        TweenMax.to($("html, body"), .3, {scrollTop:0, ease:es_step});
    });
}









