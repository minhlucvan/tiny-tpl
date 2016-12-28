/**
 * TinyTPL
 *
 * Copyright (c) 2016 Minh Luc Van - minhlv
 * @repo https://github.com/minhlucvan/tiny-tpl
 * @wiki https://github.com/minhlucvan/tiny-tpl/wiki
 * @issue https://github.com/minhlucvan/tiny-tpl/issues
 * @author minhlv
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

(function ($) {

    // define constants
    var OPEN_TAG = '{% ';
    var CLOSE_TAG = ' %}';

    var STRING_VALUE_TAG = 'value';
    var DEFAULT_FIELD_VALUE = "";

    var TPL_PINED_CLASS = ".tiny-pined";

    var CHILD_TEMPLATE_KEY = 'template';
    var DATA_FIELD_KEY = 'field';

    var ANIMATE_SEPARATOR = '|';

    var ANIMATE_FADE = 'fade';
    var ANIMATE_FADE_IN = 'fadein';
    var ANIMATE_EXPAND = 'expand';

    /**
     * get deep value of an object
     *
     * @param obj host object
     * @param selector value selectot ex: field1.field2
     * @returns {*} | null value at location of selector or null of selector not valid
     */
    function getDeepValue(obj, selector) {
        if (!obj && typeof obj !== 'object' && typeof selector !== 'string') {
            throw new Error("unexpected type passing to function getDeepValue.");
        }

        var fields = selector.split('.');
        var value = obj;

        fields.forEach(function (field) {
            if (value && value.hasOwnProperty(field)) {
                value = value[field];
            } else {
                value = null;
            }
        });

        return value;
    }

    /**
     * find tag in the string
     *
     * @param str
     * @returns string tag content
     */
    function findTag(str) {
        var startPost = str.indexOf(OPEN_TAG);
        var endPost = str.indexOf(CLOSE_TAG, startPost);

        var value = str.substring(startPost + 3, endPost);

        if (value.length <= 0 || startPost < 0 || endPost < 0) return '';

        return value;
    }

    /**
     * get result of tag
     *
     * @param data
     * @param tag
     * @returns string tag value
     */
    function getTagValue(data, tag) {
        var field = tag;
        var value = getDeepValue(data, field);

        if ((typeof data === 'string' || typeof data === 'number') && ( field == STRING_VALUE_TAG)) {
            value = data;
        }

        if (value == null) {
            value = DEFAULT_FIELD_VALUE;
        }
        return value;
    }

    /**
     * render single data node
     * append rendered dom to target element
     *
     * @param target
     * @param data
     * @param tplStr string template
     * @param opt
     */
    function renderSingleData(target, tplStr, data, opt) {
        var $container = $(target);
        var field = findTag(tplStr);

        var result = tplStr;
        var count = 0; // avoid max stacks execution

        while (field.length > 0 && count < 10000) {
            var value = getTagValue(data, field);
            result = result.replace(OPEN_TAG + field + CLOSE_TAG, value);
            field = findTag(result);
            count++;
        }

        var $result = $(result);
        $result.addClass('tiny-presents');
        $container.append($result);
    }

    /**
     * do prescript
     *
     * @param element
     * @param data
     * @param opt
     */
    function doPreScript(element, data, opt) {
        if ( typeof opt.animate === 'string') {
            opt.hasAnimation = true;
            opt.animates = opt.animate.split(ANIMATE_SEPARATOR);
            for (var i = 0; i < opt.animates.length; i++) {
                var animate = opt.animates[i];
                switch (animate) {
                    case ANIMATE_FADE: {
                        $(element).fadeOut();
                        break;
                    }
                    case ANIMATE_FADE_IN: {
                        $(element).hide();
                        break;
                    }
                    case ANIMATE_EXPAND: {
                        opt.oldHeight = $(element).height();
                    }
                }
            }
        }
    }

    /**
     * do postscript
     *
     * @param element
     * @param data
     * @param opt
     */
    function doPostScript(element, data, opt) {
        var $presents = $(element).find('.tiny-presents');
        $presents.each(function (ind) {
            var $childCtn = $(this).find('[data-' + CHILD_TEMPLATE_KEY + ']');
            $childCtn.each(function () {
                var template = $(this).data(CHILD_TEMPLATE_KEY);
                var dataField = $(this).data(DATA_FIELD_KEY);

                var nodeData = getDeepValue(data[ind], dataField);
                try {
                    $(this).tinyTpl(nodeData, template);
                } catch (e) {
                    console.error('can not render child template.');
                }
            });
        });


        if ( opt.hasAnimation ) {
            for (var i = 0; i < opt.animates.length; i++) {
                var animate = opt.animates[i];
                switch (animate) {
                    case ANIMATE_FADE: {
                        $(element).fadeIn();
                        break;
                    }
                    case ANIMATE_FADE_IN: {
                        $(element).fadeIn();
                        break;
                    }
                    case ANIMATE_EXPAND: {
                        var newHeight = $(element).height();
                        $(element).height(opt.oldHeight);
                        $(element).animate({height: newHeight}, 'fast', function() {
                            $(element).height('auto');
                        });
                    }
                }
            }
        }

        if (opt && typeof opt.postScript === 'function') {
            opt.postScript(element, data);
        }
    }


    /**
     * render template to jquery object
     *
     * @param data object or array contain data
     * @param tpl template id
     * @param opt [optional] render option
     * opt: {
     *    postScript: function( renderedDom ) a callback when template built
     *    renderMode: single|multi
     * }
     */
    $.fn.tinyTpl = function (data, tpl, opt) {
        if (typeof data !== 'string' && !data) {
            return;
        }

        if( typeof opt !== 'object' ){
            opt = {};
        }

        if ( !Array.isArray(data) ) {
            data = [data];
        }

        if (typeof tpl === 'object') {
            opt = tpl;
        }

        if (typeof tpl !== 'string') {
            tpl = $(this).data(CHILD_TEMPLATE_KEY);
        }

        var $tplEl = $(tpl);
        if ($tplEl.length == 0) {
            throw new Error('can not find template: ' + tpl);
        }

        var tplStr = "";
        if ($tplEl.attr('type') == 'text/template') {
            tplStr = $tplEl.html();
        } else {
            tplStr = $tplEl.get(0).outerHTML;
        }

        var container = this;

        doPreScript(this, data, opt);

        $(this).children().not(TPL_PINED_CLASS).remove();

        data.forEach(function (dat) {
            renderSingleData(container, tplStr, dat, opt);
        });

        doPostScript(this, data, opt);
    };

})(jQuery);

// end template engine
