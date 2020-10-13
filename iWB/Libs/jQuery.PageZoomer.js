/*
 *                [[ jQuery.PageZoomer.js ]]  v0.4
 *
 *
 *    Build at:    2013-10-04
 *
 *    Run at:      IE 9+ , Firefox 4+ , Chrome , Safari , Opera
 *
 *    Based on:    jQuery        License:     GPL v2
 *
 *
 *                  (C)2013    SCU FYclub RDD
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

(function ($) {
    var OB = $('body'), DO = $('html');
    $.PageZoom = {
        _Width:     Number(OB.css('width').slice(0, -2)),
        _Origin:    0,
        _OverFlow:  DO.css(['overflow', 'overflow-x', 'overflow-y'])
    };
    $.PageZoom['er'] = function (Scale, zOrigin) {
        if (Scale <= 0) throw("Argument 'Scale' must greater than 0.");
        var CM = navigator.userAgent.match(/Firefox|MSIE|Presto/i);
        if (Scale) {
            if (this._Origin) zOrigin = this._Origin;
            if (!zOrigin && !CM) OB.css('zoom', Scale.toString());
            else {
                var SV = ZO = '';
                if (Scale - 1) {
                    SV = 'scale('+Scale+')';
                    ZO = zOrigin || 'top left';
                    if (!zOrigin) OB.css('width', this._Width/Scale+'px');
                    else {
                        DO.css({overflow: 'auto', 'overflow-x': 'auto', 'overflow-y': 'auto'});
                        this._Origin = zOrigin;
                    }
                } else {
                    if (!zOrigin) OB.css('width', '100%');
                    else {
                        var OF = this._OverFlow; DO.css(OF);
                        this._Origin = 0;
                    }
                }
                OB.css({transform: SV, 'transform-origin': ZO});
            }
        } else {
            var TF = OB.css('transform');
            if (!CM) {
                if (TF != 'none')
                    return Number(TF.match(/matrix\(([\d\.]+),[^\)]+\)/)[1]);
                Scale = Number(OB.css('zoom')) + 1/1000;
                return Number(Scale.toFixed(1));
            } else {
                Scale = TF.match(/matrix\(([\d\.]+),[^\)]+\)/);
                return (!Scale)?1.0:Number(Scale[1]);
            }
        }
    };
})(jQuery);

