/*
 *                        >>>  FY_iWeBook.js  <<<
 *
 *
 *    [Version]    v1.5 (2014-11-10)
 *
 *    [License]    GPL v2
 *
 *    [Run at]     IE 8+ , Firefox 4+ , Chrome , Safari , Opera
 *
 *    [Based on]
 *
 *        jQuery ,  Turn.js v4 ,  jPlayer v2 ,  EasyImport.js v0.6
 *
 *        Smooth_Scroll.js , Hammer.js , PageZoomer.js , Hover_Scroll.js
 *
 *
 *
 *                     (C)2013-2014    SCU FYclub RDD
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

var AlertText = "【友情提示】\n\n \
    您当前使用的浏览器 IE 内核（版本低于 9）暂不能保证有 舒适的阅读体验……\n\n \
    强烈建议您使用 浏览器“高速/极速模式（内核）” 或 Google Chrome、Mozilla Firefox、Apple Safari、Opera！\n\n\n \
    【确认】立即尝试 现代浏览器；【取消】暂时不换 老旧浏览器";

if (ImportJS.UA.IE && confirm(AlertText))  open('http://browsehappy.com/');



// ----------- Turn.js 封装 ----------- //
(function (BOM, $) {
    var First_Run = 0,  Index_PN = 40,  Turn_Arg;

    $.fn.Turn = function () {
        try {
            if (! First_Run) {
                Book_Init(this);
                First_Run = 1;
            }
            $(BOM).Scroll_To(this);
            if ((arguments[0] == 'page') && (arguments[1] == 'index'))
                Turn_Arg = ['page', Index_PN];
            else  Turn_Arg = arguments;
            //  http://api.jquery.com/Types/#Context.2C_Call_and_Apply
            return $.fn.turn.apply(this, Turn_Arg);
        } catch (Err) {
            alert("监测到一个致命错误！\n\n【确认】即可刷新以恢复～");
            BOM.location.reload();
            console.log(Err);
        }
    };
    function Book_Init($_iWB) {
        Index_PN = $_iWB.find('.BookIndex:first').parent().attr('id').slice(5);
        $_iWB.click(function (oEvent) {
            var ES = $(oEvent.target);
            if (ES.is('a[href^="#Page_"]')) {
                $(this).Turn('page', ES.attr('href').slice(6));
                return false;
            }
        });
        $('a[href^="#Page_"]').not(
            $_iWB.selector + ' *'
        ).unbind('click').click(function () {
            $_iWB.Turn('page', $(this).attr('href').slice(6));
            return false;
        });
    }
})(self, self.jQuery);



// ----------- iWeBook.js 核心程序 ----------- //
(function (BOM, DOM, $) {

    var Queries = {};
    $.each(BOM.location.search.substr(1).split('&'), function (c,q) {
        var i = q.split('=');
        Queries[i[0]] = i[1];
    });
    var $_DOM = $(DOM);

    var BGML = [],  Loaded = 0;

    function bgMusic(PN, BGMP) {
        var found = 0;
        for (var i=0; i<BGML.length; i++) {
            if (PN >= BGML[i][3]) {
                if (PN <= BGML[i][4]) {
                    if (BGML[i][0] == 1) return;
                    else {
                        BGML[i][0] = 1;
                        BGMP.jPlayer('clearMedia').jPlayer('setMedia', BGML[i][1]).jPlayer('play');
                        found = 1; continue;
                    }
                } else BGML[i][0] = 0;
            } else BGML[i][0] = 0;
        }
        if (found == 1) return;
        else BGMP.jPlayer('clearMedia');
    }
    function LoadPages() {
        $('.turn-page').each(function () {
            var cPage = $(this);
            if (cPage.html() != '') return;
            else cPage.html('<h3>Loading...</h3>');
            var PageNO = cPage.parents('.turn-page-wrapper').attr('page');
            if (PageNO > 3) {
                var PID = PageNO - 1;
                $.get(location.href.split('?')[0], {
                    mod: 'PageLoad',
                    name: Queries.name,
                    index: Queries.index,
                    pid: PID
                }, function (PageHTML) {
                    cPage.html(PageHTML);
                });
            }
        });
    }
    function FnKeys(oB, oP, sI) {
        oB.bind('contextmenu', function (OE) {return false;});
        $_DOM.keydown(function (Event) {
            var KC = Event.keyCode;
            if ((Event.ctrlKey && (KC == 87)) || (Event.altKey && (KC == 115))) {
                if (confirm("误操作？您没想关闭本页面，是吧？")) return false;
                else return true;
            }
            if (Event.target.form) return true;
            switch (KC) {
                case 33:    ;
                case 37:    oB.Turn('previous');    break;
                case 34:    ;
                case 39:    oB.Turn('next');    break;
                case 36:    oB.Turn('page', 1);    break;
                case 35:    oB.Turn('page', oB.Turn('pages'));    break;
                case 73:    oB.Turn('page', 'index');    break;
                case 80:    oP.jPlayer('play');    break;
                case 81:    oP.jPlayer('pause');    break;
                default:    return true;
            }
            return false;
        });
    }
    $.fn.iWeBook = function ($_BGM_Player) {
        var $_iBook = this;
        $_BGM_Player = ($_BGM_Player instanceof $) ? $_BGM_Player : $($_BGM_Player);

        var DM = 'double';  /*
        var OW = $_iBook.css('width').slice(0, -2);
        if (BOM.ImportJS.UA.Mobile || ($(BOM).width() < OW)) {
            DM = 'single';
            $_iBook.css('width', OW/2);
        }  */
        $_iBook.Turn({
            display:         DM,
            gradients:       true,
            acceleration:    true,
            when:            {
                turned:    function (_Event, _Page, _View) {
                    LoadPages();
                    bgMusic(_Page, $_BGM_Player);
                    if ((_Page > 1) && (_Page < $_iBook.Turn('pages')))
                        location.hash = '#Page_' + _Page;
                    else if (Loaded == 1) location.hash = '';
                }
            }
        });
        Loaded = 1;
        var PN_Temp = location.hash.match(/^#Page_(\d+)$/);
        var int_PN = PN_Temp ? PN_Temp[1].valueOf() : 0;
        if ((int_PN > 1) && (int_PN < $_iBook.Turn('pages')))
            $_iBook.Turn('page', int_PN);

        $_BGM_Player.jPlayer({
            ready:       function () {
                $('#MusicList li').each(function (Index) {
                    var BGM = $(this).attr('src');
                    var BGM_FT = BGM.match(/\.(\w{3})$/)[1];
                    var oBGM = {};    oBGM[BGM_FT] = BGM;
                    var PN = $(this).attr('page').split('-');
                    BGML[Index] = [0, oBGM, $(this).text(), Number(PN[0]), Number(PN[1])];
                });
            },
            ended:       function () {  $(this).jPlayer("play");  },
            swfPath:     './Libs',
            supplied:    'mp3, wav'
        });

        // ----------- 便捷控制扩展 ----------- //
        FnKeys($_iBook, $_BGM_Player, 'message');

        function PageDown_EH() {
            $_iBook.Turn('next');    return false;
        }
        function PageUp_EH() {
            $_iBook.Turn('previous');    return false;
        }
        $('a[href="#Page_Down"]').click(PageDown_EH);
        $('a[href="#Page_Up"]').click(PageUp_EH);
        $('a[href="#Music_Pause"]').click(function () {
            $_BGM_Player.jPlayer('pause');    return false;
        });
        $('a[href="#Music_Play"]').click(function () {
            $_BGM_Player.jPlayer('play');    return false;
        });
        $_iBook.hammer().on('swipeleft', PageDown_EH).on('swiperight', PageUp_EH);

        // ----------- 移动设备 禁用功能 ----------- //
        if (BOM.ImportJS.UA.Mobile) return;
        //  双击书页放大
        $_iBook.dblclick(function () {
            if ($.PageZoom.er() == 1) $.PageZoom.er(1.2, 'top right');
            else $.PageZoom.er(1);
        });
        //  外置目录 鼠标悬停滚动
        $('#Book_Nav').HoverScroll();
    };
})(self, self.document, self.jQuery);



$(self.document).ready(function () {

    // ----------- 报错按钮 ----------- //
    $('a[href="#Debug"]').click(function () {
        var TipText = "输入框中的是『运行环境』信息，请直接复制它们，然后连同 其它测试详情 发给 原作者～";
        prompt(TipText, navigator.userAgent);
        open('http://bbs.fyscu.com/forum.php?mod=forumdisplay&fid=38', '_blank');
        return false;
    });

    // ----------- 侧导航栏 滚动悬停 ----------- //
    $(self.document).scroll(function () {
        var $DO_ST = $(this).scrollTop(),
            $_FSB_1 = $('#Book_Nav').prev();
        var $_FSB_0 = $_FSB_1.parent(),
            $_FSB_OST = $_FSB_1.offset().top - 10;

        if ($_FSB_0.css('position') == 'fixed')
            if ($DO_ST < 30)
                $_FSB_0.css({
                    position:    $_FSB_0.data('position')
                }).stop().animate({
                    top:    $_FSB_0.data('top')
                });
            else return;

        if ($_FSB_OST <= $DO_ST) {
            $_FSB_0.data( $_FSB_0.css(['position', 'top']) );
            $_FSB_0.css({
                position:    'fixed'
            }).stop().animate({
                top:    '-' + $_FSB_OST + 'px'
            });
        }
    });
});
