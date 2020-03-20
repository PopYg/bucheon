function layout() {
    var $gnb = $("#gnb");
    var $gnbTxtOpen = $("#gnbTxtOpen");

    var $gnbDepth01 = $gnb.find(".gnb_depth01");
    var $heavyTxt = $gnb.find(".heavy_txt");

    $gnbTxtOpen.click(function(){
        TweenMax.to($gnbDepth01, .3, {width:250, ease:esStep});
        TweenMax.to($heavyTxt, .3, {x:0});
    });




}



