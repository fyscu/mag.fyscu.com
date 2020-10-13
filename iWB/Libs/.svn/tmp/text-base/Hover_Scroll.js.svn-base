//
//          >>>  Hover Scroll  <<<
//
//
//      [Version]    v0.1  (2014-03-12)
//
//
//        (C)2014  test_32@fyscu.com
//

(function ($){
    $.fn.HoverScroll = function (jQs_Item) {
        var Scroll_Box = this;
        jQs_Item = ((Scroll_Box.length < 2) && (typeof jQs_Item == 'string')) ? jQs_Item : 'li';

        return Scroll_Box.each(function () {
            var _SB = $(this);
            _SB.css({
                position:  'relative',
                overflow:  'hidden'
            }).find(jQs_Item).hover(function () {
                var _Item = this, pre_To,  _SB_H = _SB.height(),
                    HoverTop = $(_Item).position().top;
                if (HoverTop > (_SB_H * 0.75))  pre_To = '+';
                else if (HoverTop < (_SB_H * 0.25))  pre_To = '-';
                else  return true;
                _SB.stop().animate({
                    scrollTop:  pre_To + '=' + $(_Item).height()
                }, 'slow');
            });
        }).scroll(function () {return false;});
    };
})(jQuery);
