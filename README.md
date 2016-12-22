# tiny-template
supper light weight 1kb template engine for jquery

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

## Animation

I added some animations ``fade``, ``expand``, you can use it individualy or mix together. If you like to add custom one you can write it to prescript and postscript functions.

```
	<ul id="tiny-ctn" data-template="#tiny-tpl"></ul>
	<script type="text/template" id="tiny-tpl">
		<li>Item {% value %}</li>
	</script>

```

```
	// you also can render primitive value as string or number by put {% value %}

	var toggle = 0;
	var data = ["one", "two"];

	$(document).click(function(){
		$("#tiny-ctn").tinyTpl(data[toggle])				
				
		toggle = 1 - toggle;	
	});
	
``` 

# Contrbutions

All contributions are welcome. If you interst in this project, fork it make it your's and create a pull request.

please keep this eengine as light weight as possible, please don't add no need features.

# Issues

If you have any question please ask me [here](https://github.com/minhlucvan/tiny-tpl/issues), I will try to answer all.

# License 

 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
