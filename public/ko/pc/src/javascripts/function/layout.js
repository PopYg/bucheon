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



