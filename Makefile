#
#
#   Makefile for Emoji Passcodes
#
# Tested with macOS 10.11.6
# Version @1.1.1
# Developer release
#
#

default: devel

devel :
	sed -e '/{{CSS}}/r build/app.css' -e '/{{CSS}}/d' build/app.html > html00.tmp
	sed -e '/{{JS}}/r build/app.js' -e '/{{JS}}/d' html00.tmp > html01.tmp
	sed -e 's/{{JS_DEBUG}}/true/g' html01.tmp > bookmarklet-devel.html

prod :
	make minify
	sed -e '/{{CSS}}/r css.min.tmp' -e '/{{CSS}}/d' build/app.html > html00.tmp
	sed -e '/{{JS}}/r js.min.tmp' -e '/{{JS}}/d' html00.tmp > html01.tmp
	sed -e 's/{{JS_DEBUG}}/false/g' html01.tmp > bookmarklet.html
	echo "javascript:(function()%7Bopen(%27data%3Atext%2Fhtml%3Bcharset%3Dutf8%3Bbase64%2C" > bookmarklet.js.tmp
	cat bookmarklet.html | base64 > bookmarklet.html.tmp
	sed -e 's/+/%2b/g' -e 's/-/%2d/g'  -e 's/=/%3D/g' bookmarklet.html.tmp >> bookmarklet.js.tmp
	echo "%27%2C%27emoji-passcode%27%2C%27height%3D580%2Cwidth%3D770%2Cresizable%3Dno%2Cscrollbars%3Dno%2Ctitlebar%3Dno%2Clocation%3Dno%27)%7D)()" >> bookmarklet.js.tmp
	tr -d '\n' < bookmarklet.js.tmp > bookmarklet.js

minify :
	sed -e "s/	//g" build/app.css > css.tmp
	tr -d '\n' < css.tmp > css.min.tmp
	sed -e "s/	//g" build/app.js > js.tmp
	tr -d '\n' < js.tmp > js.min.tmp

clean :
	rm -rf *.tmp *.html *.js
