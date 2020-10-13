//
//          Smooth_Scroll.js
//
//
//    [Version]     v0.4  (2014-11-06)
//
//    [Based on]    jQuery
//
//
//      (C)2014    SCU FYclub-RDD
//

(function (BOM, DOM, $) {

    var Method_Usage = new TypeError("\n\n \
    [Method Usage]\n\n \
        $(Window window).{Name}(\n\n \
            String/HTMLElement/jQuery target[,  Array offset]\n\n \
        )");

    function x$(jQ_Arg) {
        if (jQ_Arg instanceof $)  return jQ_Arg;
        if ((typeof jQ_Arg == 'string') && (jQ_Arg.slice(0,1) == '#'))
        //  以下的 ID 选择符写法 是为了兼容 MediaWiki 等整站系统的复杂锚点 ID 名
            jQ_Arg = ['*[id="', jQ_Arg.slice(1), '"]'].join('');
        return $(jQ_Arg);
    }
    //  isWindow()    By 司徒正美
    //  http://www.cnblogs.com/rubylouvre/archive/2010/02/20/1669886.html
    var WindowType = {
        '[object Window]':       1,
        '[object DOMWindow]':    1,
        '[object global]':       1
    };  
    function isWindow(Obj) {  
        if ((! Obj) || (typeof Obj !== "object"))
            return false;
        if(WindowType[ WindowType.toString.call(Obj) ])
            return true;
        //  IE 6/7/8
        return (Obj == Obj.document) && (Obj.document != Obj);
    }  

    function Smooth_Scroll(xTop, xLeft) {
        var $_Body = $('body', this.document),  _Args = {};
        if ($_Body.scrollTop() != xTop)  _Args.scrollTop = xTop;
        if ($_Body.scrollLeft() != xLeft)  _Args.scrollLeft = xLeft;
        $_Body.stop().animate(_Args, 'slow');
    }
    $.fn.Scroll_To = function (jQ_Arg, Shift) {
        var __Window__ = this[0],
            $TE = x$(jQ_Arg).eq(0);
        if (! (isWindow(__Window__) && $TE.length)) {
            Method_Usage.message = Method_Usage.message.replace('{Name}', 'Scroll_To');
            throw Method_Usage;
        }
        var TEOS = $TE.offset();
        if (! Shift) Shift = [-60, 0];
        Smooth_Scroll.apply(__Window__, [
            TEOS.top + (Shift[0] || 0),
            TEOS.left + (Shift[1] || 0)
        ]);
    };
    $.fn.Scroll_By = function (_Top, _Left) {
        var __Window__ = this[0];
        if (! isWindow(__Window__)) {
            Method_Usage.message = Method_Usage.message.replace('{Name}', 'Scroll_By');
            throw Method_Usage;
        }
        _Top = _Top || 0,  _Left = _Left || 0;
        Smooth_Scroll.apply(__Window__, [
            ((_Top < 0)?'-=':'+=') + Math.abs(_Top),
            ((_Left < 0)?'-=':'+=') + Math.abs(_Left)
        ]);
    };

    var $_DOM = $(DOM);

    $_DOM.ready(function () {
        $_DOM.find('a[href^="#"]').not('[href="#"]').click(function () {
            $(BOM).Scroll_To( this.href.match(/(#[^#\?\/]+)$/)[1] );
            if ($(this).prop('rel').indexOf('nofollow') > -1)
                return false;
        });
    });
})(self, self.document, self.jQuery);