DEBUG=false;DEBUG_LOG=true;Constructor=function(b){var a=this;for(var c in a){if(isArray(a[c])){this[c]=a[c].clone(1);continue}if(isObject(a[c])){this[c]=clone({},a[c],1);continue}this[c]=a[c]}if(b){for(var c in b){if(isArray(b[c])){this[c]=b[c].clone(1);continue}if(isObject(b[c])){this[c]=clone({},b[c],1);continue}this[c]=b[c]}}};window.undefined=window.undefined;var idSeed=0,userAgent=navigator.userAgent.toLowerCase(),isStrict=document.compatMode=="CSS1Compat",isOpera=(/opera/.test(userAgent)),isChrome=(/\bchrome\b/.test(userAgent)),isWebKit=(/webkit/.test(userAgent)),isSafari=!isChrome&&(/safari/.test(userAgent)),isSafari2=isSafari&&(/applewebkit\/4/.test(userAgent)),isSafari3=isSafari&&(/version\/3/.test(userAgent)),isSafari4=isSafari&&(/version\/4/.test(userAgent)),isIE11=/ rv:11\.0\)/.test(userAgent),isIE=!isOpera&&(/msie/.test(userAgent)||isIE11),isIE10=false,isIE9=false,isIE8=false,isIE7=false,isIE6=false,isIE6XPSP2=false,isIE9m=false,isGecko=!isIE&&!isWebKit&&(/gecko/.test(userAgent)),isGecko2=isGecko&&(/rv:1\.8/.test(userAgent)),isGecko3=isGecko&&(/rv:1\.9/.test(userAgent)),isGecko4=isGecko&&(/rv:2\.0/.test(userAgent)),isGecko5=isGecko&&(/rv:5\./.test(userAgent)),isGecko10=isGecko&&(/rv:10\./.test(userAgent)),isFF3_0=isGecko3&&(/rv:1\.9\.0/.test(userAgent)),isFF3_5=isGecko3&&(/rv:1\.9\.1/.test(userAgent)),isFF3_6=isGecko3&&(/rv:1\.9\.2/.test(userAgent)),isGecko2=isGecko&&(/rv:1\.8/.test(userAgent)),isGecko3=isGecko&&(/rv:1\.9/.test(userAgent)),isBorderBox=isIE&&!isStrict,isWindows=(/windows|win32|win64/.test(userAgent)),isWin_XP=(/windows nt 5.1/.test(userAgent)),isMac=(/macintosh|mac os x/.test(userAgent)),isAir=(/adobeair/.test(userAgent)),isLinux=(/linux/.test(userAgent)),isx32onx64=(/WOW64/.test(userAgent)),isWin_x64=(/ win64;/.test(userAgent)),isTabletPC=(/Tablet PC/.test(userAgent)),isSecure=/^https/i.test(window.location.protocol),noArgs=[],nonEnumerables=[],isIOS=(/(ipod)|(ipad)|(iphone)/i.test(userAgent));if(isIE){switch(document.documentMode){case (10):isIE10=true;break;case (9):isIE9=true;break;case (8):isIE8=true;break;case (7):isIE7=true;break;case (5):isIE6=true;break;default:isIE10=(/msie 10/.test(userAgent));isIE9=(/msie 9/.test(userAgent));isIE8=(/msie 8/.test(userAgent));isIE7=(/msie 7/.test(userAgent));isIE6XPSP2=isIE&&(userAgent.indexOf("sv1")>-1);isIE6=(!isIE6XPSP2&&!isIE7&&!isIE8&&!isIE9&&!isIE10&&!isIE11)||(document.documentMode==5)}isIE9m=isIE&&(isIE6XPSP2||isIE6||isIE7||isIE8||isIE9);isBorderBox=isIE9m&&!isStrict}function isDefined(g,c){var k=/undefined|unknown/,f=this,j=isString(g),b=j?g.split("."):[];if((!!c&&j)||b.length>1){if(j){try{var l=f;for(var h=0,a=b.length;l&&h<a;++h){l=l[b[h]]}g=l}catch(d){g=undefined}}if(c&&!isBoolean(c)){if((("hasOwnProperty" in g)&&g.hasOwnProperty(c))||(c in g)){g=g[c]}}}return !k.test(typeof(g))}function isConfig(a){return a&&a.constructor==Object}function isObject(a){return !!a&&Object.prototype.toString.call(a)==="[object Object]"}function isNULL(a){return Object.prototype.toString.call(a)==="[object Null]"}function isUndefined(a){return Object.prototype.toString.call(a)==="[object Undefined]"}function isArray(a){return(Array.isArray?Array.isArray(a):((a instanceof Array)||Object.prototype.toString.apply(a)==="[object Array]"))}function isEmpty(c,b){if(isBoolean(c)){return false}var a=false;a=(!b&&parseFloat(c)==c?parseFloat(c)===0:false)||c===null||c===undefined||typeof c==="unknown"||(isArray(c)?(!b?!c.length:false):false)||(!b?(isString(c)&&c.trim()===""):false);if(a){return a}if(isObject(c)){a=true;for(var d in c){if(c.hasOwnProperty(d)){a=false;break}}if(b){a=false}}return a}function isDate(a){return Object.prototype.toString.apply(a)==="[object Date]"}function isPrimitive(a){return isString(a)||isNumber(a)||isBoolean(a)}function isFunction(a){return Object.prototype.toString.apply(a)==="[object Function]"}function isNumber(a){return(typeof a==="number"||parseFloat(a)==a)&&isFinite(a)}function isString(a){return typeof a==="string"}function isBoolean(a){return typeof a==="boolean"}function isElement(a){return a?!!a.tagName:false}try{if(!(isDefined("window.localStorage")&&window.localStorage!==null)){window.localStorage=false}}catch(e){window.localStorage=false}if(typeof(Math)!="undefined"){Math.rnd=function(d,a,b){b=((b||b===0)?b:2);var c=Math.random()*(a-d)+d;return Math.min(parseFloat(c.toFixed(b)),a)}}if(typeof(JSON)!="undefined"){if(typeof(JSON.parse)!="undefined"){JSON.decode=JSON.parse}if(typeof(JSON.stringify)!="undefined"){JSON.encode=JSON.stringify}}else{if(typeof Ext!="undefined"&&typeof(Ext.util.JSON)!="undefined"){JSON=Ext.util.JSON}}if(!Number.prototype.toFixed){Number.prototype.toFixed=function(b){b=parseFloat(b);var c=Math.round(this*Math.pow(10,b))/Math.pow(10,b);var a=b-c.toString().length+c.toString().indexOf(".")+1;if(b>0){if(c.toString().indexOf(".")<0){return c+"."+Math.pow(10,b).toString().substring(1)}else{if(a>0){return c+Math.pow(10,a).toString().substring(1)}else{return c}}}else{return c}}}function zeroFill(b,a){a-=b.toString().length;if(a>0){return new Array(a+(/\./.test(b)?2:1)).join("0")+b}return b}function getSetValue_Cmp(f,c,d){var b=Ext.getCmp(f),a=Ext.getCmp(c);if(b!=null&&(c!=null?a!=null:true)){if("getValue" in a){d=a.getValue()}else{if("value" in a){d=a.value}}if("setValue" in b){b.setValue(d)}else{if("value" in b){a.value=d}}}}function addslashes(a){a=a.replace(/\\/g,"\\\\");a=a.replace(/\'/g,"\\'");a=a.replace(/\"/g,'\\"');a=a.replace(/\0/g,"\\0");a=a.replace(/\(/g,"\\(");a=a.replace(/\)/g,"\\)");a=a.replace(/\[/g,"\\[");a=a.replace(/\]/g,"\\]");return a}function stripslashes(a){a=a.replace(/\\'/g,"'");a=a.replace(/\\"/g,'"');a=a.replace(/\\0/g,"\0");a=a.replace(/\\\\/g,"\\");a=a.replace(/\\\(/g,"(");a=a.replace(/\\\)/g,")");a=a.replace(/\\\[/g,"[");a=a.replace(/\\\]/g,"]");return a}function execInNewWin(f,c,d){var b=document.getElementById(f);if(!(b)){b=document.createElement("A");b.id=(f||("id"+Math.random()));b.style.display="none";b.setAttribute("target",(d||"_blank"));b.setAttribute("href",c);document.body.appendChild(b)}b.click();setTimeout(function(){b.parentNode.removeChild(b);delete b},1000)}ERROR=new function(){var h=this,f=[],k=(typeof(Ext)!="undefined"?Ext:{}),b="",j=(typeof(j)!="undefined"?j:{ds:{getValue:function(){},setValue:function(){}},setTitle:function(){},show:function(){alert("РћРєРЅР° РѕС€РёР±РѕРє РЅРµС‚")}}),g=(typeof(g)!="undefined"?g:{encode:function(l){return l}}),a=(typeof(a)!="undefined"?a:{request:function(){}});this.reinit=function(l){l=(l||{});k=(l.fw||Ext||k);b=(l.SITE_URL||b);j=(l.LOG||window.LOG||j);g=(l.JSON||(k.util?k.util.JSON:window.JSON)||g);a=(l.Ajax||k.Ajax||window.Ajax||a);j.ds.setValue(g.encode(f)+"\r\n")};function d(l){var m=l.userMsg||l.description||" Р’РѕР·РЅРёРєР»Р° РЅРµРїСЂРµРґРІРёРґРµРЅРЅР°СЏ РѕС€РёР±РєР° ";if(DEBUG){m+=" file: "+l.file+"; line: "+l.line+"; function: "+l["function"]+"; msg: "+l.message+"; stack: "+l.stack}return m}var c=function(o){if(!isDefined("printStackTrace",true)){load_js("js/stacktrace.js")}o=(o||new Error());o.code=(o.code||o.number||0);o.message=(o.message||"");o.userMsg=(o.userMsg||"");o.file=o.file||"";o.line=o.line||0;o["function"]=(o["function"]||"");o.stack=(o.stack||"");if(!o["function"]&&isDefined("printStackTrace",true)){var l=(printStackTrace()||[]),n=l[l.indexOfPart("printStackTrace")+2];if(n){var m=n.match(/:(\d)*:(\d)*$/);o.line=(o.line||(m&&m.length?m[1]:0));o.stack=(o.stack||g.encode(l));o["function"]=(o["function"]||n.replace(/@.*$/,"")||"")}}return o};this.send=function(o){var m=0;function l(){window.setTimeout(n,3000)}function n(){if(m++>3){return}a.request({url:b,params:o,failure:l})}n()};this.add=function(m){var l=f.push(new c(m));j.ds.setValue(j.ds.getValue()+"-------------\r\n"+g.encode(m)+"\r\n");j.setTitle("log ({0})".format(f.length));DEBUG_LOG&&h.send(m);return l};this.getLastError=function(){var l=(f.length?(f.length-1):0);return(f[l]||new c())};this.getLastMessage=function(){return d(h.getLastError())};this.getError=function(l){return(f[l]||new c())};this.show=function(l){var m=d(new c(l));if(k&&k.Msg){k.Msg.show({title:"Р’РЅРёРјР°РЅРёРµ",msg:m,icon:k.Msg.ERROR,buttons:k.Msg.OK})}else{alert(m)}};window.onerror=function(){var l={message:arguments[0],file:arguments[1],line:arguments[2]};h.add(l)};return this};TaskManager=new function(){function c(h){var g=a.indexOfKey("id",h);if(g>-1){delete a[g];delete d[d.indexOfKey("id",h)]}}var f={id:0,run:function(){},interval:10,delayed:10,pid:-1};var a=[],d=[],b=0;this.start=function(g){function h(){g.run();c(g.id)}g.id=(g.id||b++);g.pid=window.setTimeout(h,g.delayed);a.push(g.pid);d.push(g);return g.pid};this.stop=function(g){var h=a.indexOfKey("id",g.id);if(h>-1){window.clearTimeout(a[h]);c(g.id)}}};if(!String.prototype.format){String.prototype.format=function(c){var b=arguments;return this.replace(/\{(\d+)\}/g,function(a,d){return b[d]})}}if(!String.prototype.toggle){String.prototype.toggle=function(b,a){return this==b?a:b}}if(!String.prototype.trim){String.prototype.trim=function(a){return(this||String(a)).replace(/^\s*|\s*$/g,"").replace(/\r*|\n*$/g,"")}}if(String.prototype.ucfirst){String.prototype.ucfirst=function(){return this.charAt(0).toUpperCase()+this.slice(1)}}function equals(f,d,a){var c=0,b=0;for(var g in f){if(!f.hasOwnProperty(g)){continue}c++}for(var g in d){if(!d.hasOwnProperty(g)){continue}b++}if(c!=b){return false}for(var g in f){if(!f.hasOwnProperty(g)){continue}if(typeof f[g]!==typeof d[g]){return false}if(isFunction(f[g])){if(f[g].toString()!=d[g].toString()){return false}}else{if(isDate(f[g])){if((new Date(f[g])).valueOf()!==(new Date(d[g])).valueOf()){return false}}else{if(typeof f[g]=="object"){if(!equals(f[g],d[g])){return false}}else{if(!(a?(f[g]===d[g]):(f[g]==d[g]))){return false}}}}}return true}function clone(j,g,b){if(!g||(isArray(g)&&!g.length)){return j}var f=isArray(j);if(!f&&!isObject(j)){throw {message:"Destination of an unsupported type","function":"clone"}}var a=(isArray(g)||g.length);if(!a&&!isObject(g)){throw {message:"Source of an unsupported type","function":"clone"}}function h(d,k){var l=isArray(k[d])?[]:isObject(k[d])?{}:undefined;if(l&&b!=0){if(f){j.push(clone(l,k[d],b-1))}else{j[d]=clone(l,k[d],b-1)}}else{if(f){j.push(k[d])}else{j[d]=k[d]}}}if(a){for(var c=0;c<g.length;c++){h(c,g)}}else{for(var c in g){if(!g.hasOwnProperty(c)){continue}h(c,g)}}return j}if((typeof jQuery==undefined)&&!Object.prototype.clone){Object.prototype.clone=function(){var a={};return clone(a,this)}}function obj2Array(h,f){var a=[];for(var c in h){if(!h.hasOwnProperty(c)&&isFunction(h[c])){continue}var g={},b;if(isObject(h[c])){b=obj2Array(h[c],f)}b|=h[c];if(f){g[f.key]=c;g[f.value]=b}else{g=b}a.push(g)}return a}if(!Array.prototype.clone){Array.prototype.clone=function(a){var c=[];return clone([],this,a);for(var b in this){if(!this.hasOwnProperty(b)){continue}if(isObject(this[b])||isArray(this[b])){c[b]=this[b].clone(a)}else{c[b]=this[b]}}return c}}if(!Array.prototype.insert){Array.prototype.insert=function(a,b){this.splice(a,0,b);return this}}if(!Array.prototype.unique){Array.prototype.unique=function(){var a=this.sort();var b=[a[0]];for(var c=1;c<a.length;c++){if(a[c-1]!==a[c]){b.push(a[c])}}return b}}if(!Array.prototype.map){Array.prototype.map=function(f,d){var g=[],c=0,a=this.length,b;for(;c<a;c++){b=f.call(d,this[c],c,this);if(b!=null){g.push(b)}}return g}}if(!Array.prototype.forEach){Array.prototype.forEach=function(b){var a=this.length;if(typeof b!="function"){throw new TypeError()}var d=arguments[1];for(var c=0;c<a;c++){if(c in this){if(b.call(d,this[c],c,this)===false){return}}}}}if(!Array.prototype.toObject){Array.prototype.toObject=function(){var b={};for(var a=0;a<this.length;a++){b[a]=this[a]}return b}}if(!Array.prototype.indexOf){Array.prototype.indexOf=function(c,d){var a=this.length,b=c instanceof RegExp;d=Number(arguments[1])||0;d=(d<0)?Math.ceil(d):Math.floor(d);if(d<0){d+=a}for(;d<a;d++){if(this[d]===c){return d}if(typeof(this[d])=="string"&&b&&this[d].match(c)){return d}}return -1}}if(!Array.prototype.indexOfKey){Array.prototype.indexOfKey=function(b,d,f){var a=this.length;f=Number(arguments[2])||0;f=(f<0)?Math.ceil(f):Math.floor(f);if(f<0){f+=a}for(;f<a;f++){try{if(b in this[f]){if(this[f][b]===d){return f}if(isNumber(this[f][b])||isNumber(d)){if(parseInt(d)===parseInt(this[f][b])){return f}}}}catch(c){}}return -1}}if(!Array.prototype.indexOfPart){Array.prototype.indexOfPart=function(c){var a=-1;if(typeof c!="string"){return a}for(var b=0;b<this.length;b++){if(String(this[b]).indexOf(c)>-1){return a=b}}return a}}if(!Array.prototype.remove){Array.prototype.remove=function(b){var a=this.indexOf(b);if(a!=-1){this.splice(a,1)}return this}}function load_css(a){var b=document.createElement("link");b.type="text/css";b.rel="stylesheet";if(b.readyState){b.onreadystatechange=function(){if(b.readyState=="loaded"||b.readyState=="complete"){b.onreadystatechange=null}}}else{b.onload=function(){}}b.href=a;document.getElementsByTagName("head")[0].appendChild(b)}function load_js(a,l,j){if(!l){l=function(){}}var c=3;if(isArray(a)){var g=a,h=1,b=true,f=function(){if(!g.length){b&&l();b=false;return}var n=0;while(n++<h&&g.length){var m=g.shift();if(load_js.loadedScripts.indexOf(m)!=-1){continue}load_js(m,f)}},k=g.shift();load_js(k,f);return}function d(){if(load_js.loadedScripts.indexOf(a)!=-1){l();return}var m=document.createElement("script");if(!j){m.type="text/javascript";m.language="javascript"}else{m.type=j.t;if(j.lng){m.language=j.lng}}if(m.readyState){m.onreadystatechange=function(){if(m.readyState=="loaded"||m.readyState=="complete"){m.onreadystatechange=null;load_js.regScript(a);window.clearTimeout(n);l()}}}else{m.onload=function(){load_js.regScript(a);window.clearTimeout(n);l()}}m.src=a;document.getElementsByTagName("head")[0].appendChild(m);var n=window.setTimeout(function(){if(c--){if(load_js.loadedScripts.indexOf(a)==-1){d()}}else{l()}},3000)}d()}if(!load_js.loadedScripts){load_js.loadedScripts=[]}load_js.regScript=function(a){load_js.loadedScripts.push(a)};Cookies={};Cookies.set=function(c,f){var a=arguments;var j=arguments.length;var b=(j>2)?a[2]:null;var h=(j>3)?a[3]:"/";var d=(j>4)?a[4]:null;var g=(j>5)?a[5]:false;document.cookie=c+"="+escape(f)+((b==null)?"":("; expires="+b.toGMTString()))+((h==null)?"":("; path="+h))+((d==null)?"":("; domain="+d))+((g==true)?"; secure":"")};Cookies.get=function(d){var b=d+"=";var g=b.length;var a=document.cookie.length;var f=0;var c=0;while(f<a){c=f+g;if(document.cookie.substring(f,c)==b){return Cookies.getCookieVal(c)}f=document.cookie.indexOf(" ",f)+1;if(f==0){break}}return null};Cookies.clear=function(a){if(Cookies.get(a)){document.cookie=a+"=; expires=Thu, 01-Jan-70 00:00:01 GMT"}};Cookies.getCookieVal=function(b){var a=document.cookie.indexOf(";",b);if(a==-1){a=document.cookie.length}return unescape(document.cookie.substring(b,a))};Base64=new function(){var a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";this.Encode=function(f){var c="";var n,l,j,m,k,h,g;var d=0;while(d<f.length){n=f.charCodeAt(d++);l=f.charCodeAt(d++);j=f.charCodeAt(d++);m=n>>2;k=((n&3)<<4)|(l>>4);h=((l&15)<<2)|(j>>6);g=j&63;if(isNaN(l)){h=g=64}else{if(isNaN(j)){g=64}}c=c+a.charAt(m)+a.charAt(k)+a.charAt(h)+a.charAt(g)}return c};this.encode=this.Encode;this.Decode=function(f){var c="";var n,l,j;var m,k,h,g;var d=0;f=f.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(d<f.length){m=a.indexOf(f.charAt(d++));k=a.indexOf(f.charAt(d++));h=a.indexOf(f.charAt(d++));g=a.indexOf(f.charAt(d++));n=(m<<2)|(k>>4);l=((k&15)<<4)|(h>>2);j=((h&3)<<6)|g;c=c+String.fromCharCode(n);if(h!=64){c=c+String.fromCharCode(l)}if(g!=64){c=c+String.fromCharCode(j)}}return c};this.decode=this.Decode;var b=/-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/;this.unarmor=function(d){var c=b.exec(d);if(c){if(c[1]){d=c[1]}else{if(c[2]){d=c[2]}else{throw"RegExp out of sync"}}}return this.decode(d)};return this};function utf8_to_b64(b){try{return Base64.Encode(unescape(encodeURIComponent(b)))}catch(a){return""}}function b64_to_utf8(b){try{return decodeURIComponent(escape(Base64.Decode(b)))}catch(a){return""}}UTF8=new function(){this.encode=function(b){b=b.replace(/\r\n/g,"\n");var a="";for(var f=0;f<b.length;f++){var d=b.charCodeAt(f);if(d<128){a+=String.fromCharCode(d)}else{if((d>127)&&(d<2048)){a+=String.fromCharCode((d>>6)|192);a+=String.fromCharCode((d&63)|128)}else{a+=String.fromCharCode((d>>12)|224);a+=String.fromCharCode(((d>>6)&63)|128);a+=String.fromCharCode((d&63)|128)}}}return a};this.decode=function(a){var b="";var d=0;var f=c1=c2=0;while(d<a.length){f=a.charCodeAt(d);if(f<128){b+=String.fromCharCode(f);d++}else{if((f>191)&&(f<224)){c2=a.charCodeAt(d+1);b+=String.fromCharCode(((f&31)<<6)|(c2&63));d+=2}else{c2=a.charCodeAt(d+1);c3=a.charCodeAt(d+2);b+=String.fromCharCode(((f&15)<<12)|((c2&63)<<6)|(c3&63));d+=3}}}return b}};function CompressBin(a){var d="";var b=a.slice(0);b.unshift(1);b.push(1);b.reverse();for(var c in b){d+=b[c]}d=parseInt(d,2);return d}function UncompressBin(b){var a=b.toString(2);a=a.split("");a.reverse();a.shift();a.pop();return a}function CompressLargeBin(a){var b=a.slice(0);var f=[];var d=[];for(var c in b){f.push(b[c]);if(f.length>=50){d.push(CompressBin(f));f=[]}}if(f.length>0){d.push(CompressBin(f))}b=d.join(";");return b}function UncompressLargeBin(a){var b=a.split(";");var f=[];for(var c in b){f.push(UncompressBin(parseInt(b[c])))}b=[];for(var c in f){for(var d in f[c]){b.push(f[c][d])}}return b}function htmlentities(a){var b=document.createElement("PRE");var c=document.createTextNode(a);b.appendChild(c);return b.innerHTML}function innerText(c,b){var a="";if(typeof(b)=="undefined"){if(document.all){a=c.innerText}else{a=c.textContent}}else{if(document.all){c.innerText=b}else{c.textContent=b}}return a}function sortlist(a){arrTexts=new Array();for(i=0;i<a.length;i++){arrTexts[i]=new Array();arrTexts[i][0]=a.options[i].text;arrTexts[i][1]=a.options[i].value}arrTexts.sort();for(i=0;i<a.length;i++){a.options[i].text=arrTexts[i][0];a.options[i].value=arrTexts[i][1]}}function getAttribute(b,a){if(!b.attributes||(typeof(b.attributes[a])=="undefined")){return b.getAttribute(a)}else{return b.attributes[a].nodeValue}}function getClientWidth(){var a=document.documentElement;return window.innerWidth||self.innerWidth||(a&&a.clientWidth)||document.body.clientWidth}function getClientHeight(){var a=document.documentElement;return window.innerHeight||self.innerHeight||(a&&a.clientHeight)||document.body.clientHeight}function getDocumentHeight(){return(document.body.scrollHeight>document.body.offsetHeight)?document.body.scrollHeight:document.body.offsetHeight}function getDocumentWidth(){return(document.body.scrollWidth>document.body.offsetWidth)?document.body.scrollWidth:document.body.offsetWidth}function getBodyScrollTop(){return window.pageYOffset||(document.documentElement&&document.documentElement.scrollTop)||(document.body&&document.body.scrollTop)}function getBodyScrollLeft(){return window.pageXOffset||(document.documentElement&&document.documentElement.scrollLeft)||(document.body&&document.body.scrollLeft)}function getClientCenterX(a){return parseInt(getClientWidth()/2)+getBodyScrollLeft()}function getClientCenterY(a){return parseInt(getClientHeight()/2)+getBodyScrollTop()}function controlX(a){return a.offsetParent?a.offsetLeft+controlX(a.offsetParent):a.offsetLeft}function controlY(a){return a.offsetParent?a.offsetTop+controlY(a.offsetParent):a.offsetTop}function trim(a){return a.replace(/^\s*|\s*$/g,"").replace(/\r*|\n*$/g,"")}function checkInt(a){return a.match(/^[0-9]*$/i)?true:"РўРѕР»СЊРєРѕ С†РёС„СЂС‹"}function checkRusIntSpec(a){if(!a.value.match(/^[Р°-СЏС‘РЃ0-9 \.,в„–!?\"-]*$/i)){a.className="err";return Array(false,"СЂСѓСЃСЃРєРёРµ Р±СѓРєРІС‹, 'РїСЂРѕР±РµР»',\", '-', 'РїСЂРѕР±РµР»', в„–")}else{a.className="c_input";return Array(true)}}function checkRus(a){if(!a.value.match(/^[Р°-СЏС‘РЃ -]*$/i)){a.className="err";return Array(false,"СЂСѓСЃСЃРєРёРµ Р±СѓРєРІС‹, 'РїСЂРѕР±РµР»', С‚РёСЂРµ")}else{a.className="c_input";return Array(true)}}function checkAllChar(a){if(!a.value.match(/^[Р°-СЏС‘РЃ0-9 \.,в„–!?\"a-z-]*/i)){a.className="err";return Array(false,"Р°РЅРіР»РёР№СЃРєРёРµ Р±СѓРєРІС‹")}else{a.className="c_input";return Array(true)}}function checkEng(a){if(a.value.match(/[a-z]/i)){a.className="err";return Array(false,"Р°РЅРіР»РёР№СЃРєРёРµ Р±СѓРєРІС‹")}else{a.className="c_input";return Array(true)}}function checkEmail(c){var d="E-mail РІ С„РѕСЂРјР°С‚Рµ: ****.****@****.****, РіРґРµ РґРѕРїСѓСЃС‚РёРјС‹ С‚РѕР»СЊРєРѕ Р»Р°С‚. Р±РІ., С†РёС„СЂС‹, '@', '_', С‚РѕС‡РєР°(РєР°Рє СЂР°Р·РґРµР»РёС‚РµР»СЊ РґРѕРјРµРЅРѕРІ Рё РёРјРµРЅРё/Р»РѕРіРёРЅР°)";if(c.length==0){return true}var a=c.indexOf("@");if(c.match(/[ ]/)||c.match(/[.]+[.]+/)||a==-1){return d}var b=c.substring(0,a);if(b.length==0){return d}if(!b.match(/^[0-9a-z\!\#\~\*\=\$\&\?\^\+\`\{\}\|\/''\%_-][0-9a-z\!\#\~\*\=\$\&\?\^\+\`\{\}\|\/''\%_\.-]*$/i)){return d}b=c.substring(a+1,c.length);if(b.length==0){return d}if(!b.match(/^([0-9a-zР°-СЏС‘РЃ_-][0-9a-zР°-СЏС‘РЃ_\.-]*\.)*[a-zР°-СЏС‘РЃ]{2,4}$/i)){return d}return true}function checkFIO(a){if(a.length==0){return(true)}if(!a.match(/^[Р°-СЏС‘РЃ-]{2,} [Р°-СЏС‘РЃ-]{2,}( [Р°-СЏС‘РЃ-]{2,})*$/i)){str_time="";str_pos="";for(ii=0;ii<a.length;ii++){str_sub=a.substr(ii,1);if(str_sub==" "){str_pos+=str_sub}else{str_pos=""}if(str_pos.length==1){str_time+=str_pos}if(str_sub.match(/[Р°-СЏС‘РЃ-]/i)){str_time+=str_sub}}a=trim(str_time);return("СЂСѓСЃСЃРєРёРµ Р±СѓРєРІС‹ Рё 'РїСЂРѕР±РµР»'<br/>\nР¤РРћ РЅРµРѕР±С…РѕРґРёРјРѕ РїРёСЃР°С‚СЊ РїРѕР»РЅРѕСЃС‚СЊСЋ, СЃР»РѕРІР° СЂР°Р·РґРµР»СЏС‚СЊ РїСЂРѕР±РµР»РѕРј.")}return(true)}function checkPhone(a){if(!a.value.match(/^[0-9 \)-]*$/i)){a.className="err";return Array(false,"С‚РѕР»СЊРєРѕ С†РёС„СЂС‹")}else{a.className="c_input";return Array(true)}}function checkKPP(b){var a=true;if(b.length==0){return(true)}a=checkInt(b);if(b.length!=9){if(a!==true){a+="\nРєРѕР»РёС‡РµСЃС‚РІРѕ СЃРёРјРІРѕР»РѕРІ РґРѕР»Р¶РЅРѕ Р±С‹С‚СЊ =9."}}return a}function fade(f,d,c,j,h){function b(n,l){var m=k();(b=m=="filter"?new Function("oElem","nOpacity",'nOpacity=Math.round(nOpacity*100);	var oAlpha = oElem.filters["DXImageTransform.Microsoft.alpha"] || oElem.filters.alpha;	if (oAlpha) oAlpha.opacity = nOpacity; else oElem.style.filter += "progid:DXImageTransform.Microsoft.Alpha(opacity="+nOpacity+")";'):m?new Function("oElem","nOpacity","oElem.style."+m+" = nOpacity;"):new Function)(n,l)}function k(){var l;if(typeof document.body.style.opacity=="string"){l="opacity"}else{if(typeof document.body.style.MozOpacity=="string"){l="MozOpacity"}else{if(typeof document.body.style.KhtmlOpacity=="string"){l="KhtmlOpacity"}else{if(document.body.filters&&(navigator.appVersion.match(/MSIE ([\d.]+)/i)[1]>=5.5)){l="filter"}}}}return(k=new Function("return '"+l+"';"))()}f.style.display="";var g=new Date().getTime();b(f,d);var a=window.setInterval(function(){var l=(new Date().getTime()-g)/j;if(l>=1){l=1;if(c==0){f.style.display="none";if(h){h()}}window.clearInterval(a)}b(f,c*l+d*(1-l))},25);return a}if(typeof(Ajax)=="undefined"){Ajax=function(){var b;if(typeof XMLHttpRequest!="undefined"){b=new XMLHttpRequest()}else{if(window.ActiveXObject){var a=["Microsoft.clientXmlHttp","MSXML2.clientXmlHttp","MSXML2.clientXmlHttp.3.0","MSXML2.clientXmlHttp.4.0","MSXML2.clientXmlHttp.5.0","MSXML2.clientXmlHttp.6.0","Microsoft.XMLHTTP"];for(var c=a.length-1;c>=0;c--){try{b=new ActiveXObject(a[c])}catch(d){}}}}if(!b){throw new Error("XMLHttp (AJAX) not supported")}b.request=function(g){if(isDefined("Ext.Ajax",true)){Ext.Ajax.request(g);return}var f=this;g.method=(g.method||"POST");g.url=(g.url||"");g.async=(g.async!==false);g.charset=(g.charset||"utf8");var k=(isEmpty(g.params)?"":(isObject(g.params)?JSON.encode(g.params):g.params));g.success=(g.success||function(){});g.failure=(g.failure||function(){});var j={statusText:"",readyState:-1,status:-1};var h=window.setTimeout(function(){f.abort();j.statusText=f.lng["Connection time is over. Try again."];g.failure(j)},10000);this.open(g.method,g.url,g.async);this.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset="+g.charset);this.setRequestHeader("Accept-Charset",g.charset);this.onreadystatechange=function(){window.clearTimeout(h);if(this.readyState==4){if(this.status==200){var l={responseText:this.responseText,responseXML:this.responseXML};g.success(l)}else{j={statusText:this.statusText,readyState:this.readyState,status:this.status};g.failure(j)}}};this.send(k)};b.lng={"Connection time is over. Try again.":"Connection time is over. Try again."};return b}()}function UUID(g,k){g=(g||36);try{return(new ActiveXObject("Scriptlet.TypeLib").GUID.substr(1,g))}catch(h){var d="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");var j=d,b=[],c=Math.random;k=k||j.length;if(g!=36){for(var f=0;f<g;f++){b[f]=j[0|c()*k]}}else{var a;b[8]=b[13]=b[18]=b[23]="-";b[14]="4";for(var f=0;f<36;f++){if(!b[f]){a=0|c()*16;b[f]=j[(f==19)?(a&3)|8:a&15]}}}return b.join("")}}function crcinn(g){if(g.length==0){return(true)}var h=new Array();var c=-1;if(!g.match(/^[0-9]*$/i)||g.length<10){return("С†РёС„СЂС‹, РѕР±С‰РµРµ РєРѕР»РёС‡РµСЃС‚РІРѕ СЃРёРјРІРѕР»РѕРІ РјРёРЅРёРјСѓРј 10.\nР•С‰Рµ СЂР°Р· РїСЂРѕРІРµСЂСЊС‚Рµ РїСЂР°РІРёР»СЊРЅС‹Р№ Р»Рё РРќРќ Р’С‹ РІРІРµР»Рё.")}for(var d=0;d<g.length;d++){h[d]=parseInt(g.charAt(d))}if(10==g.length){var f=((h[0])*2)+((h[1])*4)+((h[2])*10)+((h[3])*3)+((h[4])*5)+((h[5])*9)+((h[6])*4)+((h[7])*6)+((h[8])*8);if((c=f%11)>9){c=c%10}if(c!=h[9]){return("С†РёС„СЂС‹, РѕР±С‰РµРµ РєРѕР»РёС‡РµСЃС‚РІРѕ СЃРёРјРІРѕР»РѕРІ =10\nР•С‰Рµ СЂР°Р· РїСЂРѕРІРµСЂСЊС‚Рµ РїСЂР°РІРёР»СЊРЅС‹Р№ Р»Рё РРќРќ Р’С‹ РІРІРµР»Рё.")}}if(12==g.length){var b=((h[0])*7)+((h[1])*2)+((h[2])*4)+((h[3])*10)+((h[4])*3)+((h[5])*5)+((h[6])*9)+((h[7])*4)+((h[8])*6)+((h[9])*8);if((c=b%11)>9){c=c%10}if(c!=h[10]){return("С†РёС„СЂС‹, РѕР±С‰РµРµ РєРѕР»РёС‡РµСЃС‚РІРѕ СЃРёРјРІРѕР»РѕРІ =12\nР•С‰Рµ СЂР°Р· РїСЂРѕРІРµСЂСЊС‚Рµ РїСЂР°РІРёР»СЊРЅС‹Р№ Р»Рё РРќРќ Р’С‹ РІРІРµР»Рё.")}var a=((h[0])*3)+((h[1])*7)+((h[2])*2)+((h[3])*4)+((h[4])*10)+((h[5])*3)+((h[6])*5)+((h[7])*9)+((h[8])*4)+((h[9])*6)+((h[10])*8);if((c=a%11)>9){c=c%10}if(c!=h[11]){return("С†РёС„СЂС‹, РѕР±С‰РµРµ РєРѕР»РёС‡РµСЃС‚РІРѕ СЃРёРјРІРѕР»РѕРІ =12\nР•С‰Рµ СЂР°Р· РїСЂРѕРІРµСЂСЊС‚Рµ РїСЂР°РІРёР»СЊРЅС‹Р№ Р»Рё РРќРќ Р’С‹ РІРІРµР»Рё.")}}if(c!=-1){return(true)}return("С†РёС„СЂС‹")}function transliterate(f,b){var c=["С‰","С€","С‡","С†","СЋ","СЏ","С‘","Р¶","СЉ","С‹","СЌ","Р°","Р±","РІ","Рі","Рґ","Рµ","Р·","Рё","Р№","Рє","Р»","Рј","РЅ","Рѕ","Рї","СЂ","СЃ","С‚","Сѓ","С„","С…","СЊ"],d=["shh","sh","ch","cz","yu","ya","yo","zh","``","y'","e`","a","b","v","g","d","e","z","i","j","k","l","m","n","o","p","r","s","t","u","f","x","`"];for(var a=0;a<c.length;a++){f=f.split(b?d[a]:c[a]).join(b?c[a]:d[a]);f=f.split(b?d[a].toUpperCase():c[a].toUpperCase()).join(b?c[a].toUpperCase():d[a].toUpperCase())}return f};