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
    var CHILD_TEMPLATE_KEY = 'template';
    var DATA_FIELD_KEY = 'field';

    /**
     * get deep value of an object
     *
     * @param obj host object
     * @param selector value selectot ex: field1.field2
     * @returns {*} | null value at location of selector or null of selector not valid
     */
    function getDeepValue(obj, selector){
        if(!obj && typeof obj !== 'object' && typeof selector !== 'string') {
            throw new Error("unexpected type passing to function getDeepValue.");
        }

        var fields = selector.split('.');
        var value = obj;

        fields.forEach(function (field) {
            if(value && value.hasOwnProperty( field ) ) {
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
    function findTag( str ) {
        var startPost = str.indexOf( OPEN_TAG );
        var endPost = str.indexOf( CLOSE_TAG, startPost);

        var value = str.substring(startPost + 3, endPost);

        if ( value.length <= 0 ) return '';

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

        if((typeof data === 'string' || typeof data === 'number') && ( field == STRING_VALUE_TAG) ) {
            value = data;
        }

        if(value == null){
            value = "";
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
        var field = findTag( tplStr );

        var result = tplStr;
        var count = 0; // avoid max stacks execution

        while ( field.length > 0 && count < 10000 ){
            var value = getTagValue(data, field);
            result = result.replace(OPEN_TAG + field + CLOSE_TAG, value);
            field = findTag( result );
            count++;
        }


        var $dom = $( result );
        $container.append($dom)
    }

    /**
     * do postscript
     *
     * @param element
     * @param data
     * @param opt
     */
    function doPostScript( element, data, opt ) {
        var $chidConatiner = $(element).find('[' + CHILD_TEMPLATE_KEY + ']');

        $chidConatiner.each(function () {
            var template = $(this).data( CHILD_TEMPLATE_KEY );
            var dataField = $(this).data( DATA_FIELD_KEY );

            var data = getDeepValue(data, dataField);
            try {
                $(this).renderTpl(template, data);
            } catch ( e ){
                console.error('can not render child template.');
            }
        });

        if( opt && typeof opt.postScript === 'function'){
            opt.postScript.call(element, data);
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
     * }
     */
    $.fn.tinyTpl = function(data, tpl ,opt){
        if ( !Array.isArray( data ) ){
            data = [ data ];
        }

        if( !tpl ){
            tpl = $(this).data( CHILD_TEMPLATE_KEY );
        }

        var $tplEl = $(tpl);
        if( $tplEl.length == 0 ){
            throw new Error('can not find template: ' + tpl);
        }

        var tplStr = "";
        if( $tplEl.attr('type') == 'text/template'){
            tplStr = $tplEl.text();
        } else {
            tplStr = $tplEl.html();
        }

        var container = this;
        $(this).text('');
        data.forEach(function ( dat ) {
            renderSingleData(container, tplStr, dat, opt);
        });

        doPostScript(this, data, opt);
    };

})( jQuery );

// end template engine
