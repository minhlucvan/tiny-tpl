# tiny-template
supper light weight 1kb template engine for jquery


![](https://img.shields.io/badge/build-success-green.svg)
![](https://img.shields.io/codeclimate/coverage/github/triAGENS/ashikawa-core.svg)
![](https://img.shields.io/codeclimate/issues/github/me-and/mdf.svg)
![](https://img.shields.io/packagist/l/doctrine/orm.svg)
![](https://img.shields.io/badge/jquey-%3E%3D1.7-ff69b4.svg)

## browsers compatibility

| [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/edge.png" alt="IE / Edge" width="16px" height="16px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/firefox.png" alt="Firefox" width="16px" height="16px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/chrome.png" alt="Chrome" width="16px" height="16px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/safari.png" alt="Safari" width="16px" height="16px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/opera.png" alt="Opera" width="16px" height="16px" />](http://godban.github.io/browsers-support-badges/)</br>Opera | [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/vivaldi.png" alt="Vivaldi" width="16px" height="16px" />](http://godban.github.io/browsers-support-badges/)</br>Vivaldi |
| --------- | --------- | --------- | --------- | --------- | --------- |
| IE9, IE10, IE11, Edge|  all veisions| all versions| all versions| all versions| all versions

# Features

- [x] light weight
- [x] cross browsers
- [x] mobile friendly
- [x] array rendering
- [x] primitive value
- [x] child template 
- [x] string template
- [x] dom template
- [x] animation support
- [x] pined elements

# Usages

## Basic

```html

	<div id="tiny-ctn" data-template="#tiny-tpl"></div>
	<script type="text/template" id="tiny-tpl">
		<h1>Hello {% name %}</h1>
	</script>

```

```javascript
	$('#tiny-ctn').tinyTpl({name: "Tiny-tpl"});
```
Very easy, right?

## Advanced

I added some animations ``fade``, ``expand``, you can use it individualy or mix together. If you like to add custom one you can write it to prescript and postscript functions.

```html
	<ul id="tiny-ctn" data-template="#tiny-tpl"></ul>
	<script type="text/template" id="tiny-tpl">
		<li>Item {% value %}</li>
	</script>

```

```javascript

	// you also can render primitive value as string or number by put {% value %}

	var toggle = 0;
	var data = ["one", "two"];

	$(document).click(function(){
		$("#tiny-ctn").tinyTpl(data[toggle], {animate: "fade|expand"})				
				
		toggle = 1 - toggle;	
	});
	
``` 

### Array Rendering

Tiny-tpl support array rendering, you simply pass your array  as usual, tiny-tpl will render your data one by one. 

### Pined elements

Pined elements will not be remove when call render, you simply add class ``tiny-pined`` to elements that you want to keep.

# Contrbutions

All contributions are welcome. If you interst in this project, fork it make it your's and create a pull request.

please keep this eengine as light weight as possible, please don't add no need features.

# Issues

If you have any question please ask me [here](https://github.com/minhlucvan/tiny-tpl/issues), I will try to answer all.

# License 

 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
