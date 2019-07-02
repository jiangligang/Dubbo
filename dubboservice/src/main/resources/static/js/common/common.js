/**
 * jQuery JSON plugin 2.4.0
 *
 * @author Brantley Harris, 2009-2011
 * @author Timo Tijhof, 2011-2012
 * @source This plugin is heavily influenced by MochiKit's serializeJSON, which is
 *         copyrighted 2005 by Bob Ippolito.
 * @source Brantley Harris wrote this plugin. It is based somewhat on the JSON.org
 *         website's http://www.json.org/json2.js, which proclaims:
 *         "NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.", a sentiment that
 *         I uphold.
 * @license MIT License <http://www.opensource.org/licenses/mit-license.php>
 */
(function ($) {
	'use strict';

	var escape = /["\\\x00-\x1f\x7f-\x9f]/g,
		meta = {
			'\b': '\\b',
			'\t': '\\t',
			'\n': '\\n',
			'\f': '\\f',
			'\r': '\\r',
			'"' : '\\"',
			'\\': '\\\\'
		},
		hasOwn = Object.prototype.hasOwnProperty;

	/**
	 * jQuery.toJSON
	 * Converts the given argument into a JSON representation.
	 *
	 * @param o {Mixed} The json-serializable *thing* to be converted
	 *
	 * If an object has a toJSON prototype, that will be used to get the representation.
	 * Non-integer/string keys are skipped in the object, as are keys that point to a
	 * function.
	 *
	 */
	$.toJSON = typeof JSON === 'object' && JSON.stringify ? JSON.stringify : function (o) {
		if (o === null) {
			return 'null';
		}

		var pairs, k, name, val,
			type = $.type(o);

		if (type === 'undefined') {
			return undefined;
		}

		// Also covers instantiated Number and Boolean objects,
		// which are typeof 'object' but thanks to $.type, we
		// catch them here. I don't know whether it is right
		// or wrong that instantiated primitives are not
		// exported to JSON as an {"object":..}.
		// We choose this path because that's what the browsers did.
		if (type === 'number' || type === 'boolean') {
			return String(o);
		}
		if (type === 'string') {
			return $.quoteString(o);
		}
		if (typeof o.toJSON === 'function') {
			return $.toJSON(o.toJSON());
		}
		if (type === 'date') {
			var month = o.getUTCMonth() + 1,
				day = o.getUTCDate(),
				year = o.getUTCFullYear(),
				hours = o.getUTCHours(),
				minutes = o.getUTCMinutes(),
				seconds = o.getUTCSeconds(),
				milli = o.getUTCMilliseconds();

			if (month < 10) {
				month = '0' + month;
			}
			if (day < 10) {
				day = '0' + day;
			}
			if (hours < 10) {
				hours = '0' + hours;
			}
			if (minutes < 10) {
				minutes = '0' + minutes;
			}
			if (seconds < 10) {
				seconds = '0' + seconds;
			}
			if (milli < 100) {
				milli = '0' + milli;
			}
			if (milli < 10) {
				milli = '0' + milli;
			}
			return '"' + year + '-' + month + '-' + day + 'T' +
				hours + ':' + minutes + ':' + seconds +
				'.' + milli + 'Z"';
		}

		pairs = [];

		if ($.isArray(o)) {
			for (k = 0; k < o.length; k++) {
				pairs.push($.toJSON(o[k]) || 'null');
			}
			return '[' + pairs.join(',') + ']';
		}

		// Any other object (plain object, RegExp, ..)
		// Need to do typeof instead of $.type, because we also
		// want to catch non-plain objects.
		if (typeof o === 'object') {
			for (k in o) {
				// Only include own properties,
				// Filter out inherited prototypes
				if (hasOwn.call(o, k)) {
					// Keys must be numerical or string. Skip others
					type = typeof k;
					if (type === 'number') {
						name = '"' + k + '"';
					} else if (type === 'string') {
						name = $.quoteString(k);
					} else {
						continue;
					}
					type = typeof o[k];

					// Invalid values like these return undefined
					// from toJSON, however those object members
					// shouldn't be included in the JSON string at all.
					if (type !== 'function' && type !== 'undefined') {
						val = $.toJSON(o[k]);
						pairs.push(name + ':' + val);
					}
				}
			}
			return '{' + pairs.join(',') + '}';
		}
	};

	/**
	 * jQuery.evalJSON
	 * Evaluates a given json string.
	 *
	 * @param str {String}
	 */
	$.evalJSON = typeof JSON === 'object' && JSON.parse ? JSON.parse : function (str) {
		/*jshint evil: true */
		return eval('(' + str + ')');
	};

	/**
	 * jQuery.secureEvalJSON
	 * Evals JSON in a way that is *more* secure.
	 *
	 * @param str {String}
	 */
	$.secureEvalJSON = typeof JSON === 'object' && JSON.parse ? JSON.parse : function (str) {
		var filtered =
			str
			.replace(/\\["\\\/bfnrtu]/g, '@')
			.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
			.replace(/(?:^|:|,)(?:\s*\[)+/g, '');

		if (/^[\],:{}\s]*$/.test(filtered)) {
			/*jshint evil: true */
			return eval('(' + str + ')');
		}
		throw new SyntaxError('Error parsing JSON, source is not valid.');
	};

	/**
	 * jQuery.quoteString
	 * Returns a string-repr of a string, escaping quotes intelligently.
	 * Mostly a support function for toJSON.
	 * Examples:
	 * >>> jQuery.quoteString('apple')
	 * "apple"
	 *
	 * >>> jQuery.quoteString('"Where are we going?", she asked.')
	 * "\"Where are we going?\", she asked."
	 */
	$.quoteString = function (str) {
		if (str.match(escape)) {
			return '"' + str.replace(escape, function (a) {
				var c = meta[a];
				if (typeof c === 'string') {
					return c;
				}
				c = a.charCodeAt();
				return '\\u00' + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
			}) + '"';
		}
		return '"' + str + '"';
	};

/** 

 * 为grid添加自己重新加载方法,解决带条件查询的时候分页栏不能回到首页问题 

 */ 

 $.extend($.fn.datagrid.methods, { 

     cisreload: function(jq, newposition){ 

          return jq.each(function(){ 

                  //显示第一页数据   

                 $(this).datagrid("options").pageNumber = 1;   

                 //分页栏上跳转到第一页   

                 $(this).datagrid('getPager').pagination({pageNumber: 1}); 

                 $(this).datagrid("reload",newposition); 

          }); 

     } 

 
 }); 

 $.extend($.fn.validatebox.defaults.rules, {
     isBlank: {
         validator: function (value, param) { return $.trim(value) != ''},
         message: '不能为空，全空格也不行'
     }
 });
 
 
 
 /**   
  * @author {CaoGuangHui}   
  */   
 $.extend($.fn.tabs.methods, {    
     /** 
      * 加载iframe内容   
      * @param  {jq Object} jq     [description]   
      * @param  {Object} params    params.which:tab的标题或者index;params.iframe:iframe的相关参数   
      * @return {jq Object}        [description]   
      */   
     loadTabIframe:function(jq,params){    
         return jq.each(function(){    
             var $tab = $(this).tabs('getTab',params.which);    
             if($tab==null) return;    
    
             var $tabBody = $tab.panel('body');    
    
             //销毁已有的iframe    
             var $frame=$('iframe', $tabBody);    
             if($frame.length>0){    
                 try{//跨域会拒绝访问，这里处理掉该异常    
                     $frame[0].contentWindow.document.write('');    
                     $frame[0].contentWindow.close();    
                 }catch(e){    
                     //Do nothing    
                 }    
                 $frame.remove();    
                 if($.browser.msie){    
                     CollectGarbage();    
                 }    
             }    
             $tabBody.html('');    
    
             $tabBody.css({'overflow':'hidden','position':'relative'});    
             var $mask = $('<div style="position:absolute;z-index:2;width:100%;height:100%;background:#ccc;z-index:1000;opacity:0.3;filter:alpha(opacity=30);"><div>').appendTo($tabBody);    
             var $maskMessage = $('<div class="mask-message" style="z-index:3;width:auto;height:16px;line-height:16px;position:absolute;top:50%;left:50%;margin-top:-20px;margin-left:-92px;border:2px solid #d4d4d4;padding: 12px 5px 10px 30px;background: #ffffff url(\'js/easyui/themes/default/images/loading.gif\') no-repeat scroll 5px center;">' + (params.iframe.message || '加载中, 请稍等 ...') + '</div>').appendTo($tabBody);    
             var $containterMask = $('<div style="position:absolute;width:100%;height:100%;z-index:1;background:#fff;"></div>').appendTo($tabBody);    
             var $containter = $('<div style="position:absolute;width:100%;height:100%;z-index:0;"></div>').appendTo($tabBody);    
    
             var iframe = document.createElement("iframe");    
             iframe.src = params.iframe.src;    
             iframe.frameBorder = params.iframe.frameBorder || 0;    
             iframe.height = params.iframe.height || '100%';    
             iframe.width = params.iframe.width || '100%';    
             if (iframe.attachEvent){    
                 iframe.attachEvent("onload", function(){    
                     $([$mask[0],$maskMessage[0]]).fadeOut(params.iframe.delay || 'fast',function(){    
                         $(this).remove();    
                         if($(this).hasClass('mask-message')){    
                             $containterMask.fadeOut(params.iframe.delay || 'fast',function(){    
                                 $(this).remove();    
                             });    
                         }    
                     });    
                 });    
             } else {    
                 iframe.onload = function(){    
                     $([$mask[0],$maskMessage[0]]).fadeOut(params.iframe.delay || 'fast',function(){    
                         $(this).remove();    
                         if($(this).hasClass('mask-message')){    
                             $containterMask.fadeOut(params.iframe.delay || 'fast',function(){    
                                 $(this).remove();    
                             });    
                         }    
                     });    
                 };    
             }    
             $containter[0].appendChild(iframe);    
         });    
     },    
     /** 
      * 增加iframe模式的标签页   
      * @param {[type]} jq     [description]   
      * @param {[type]} params [description]   
      */   
     addIframeTab:function(jq,params){    
         return jq.each(function(){    
             if(params.tab.href){    
                 delete params.tab.href;    
             }    
             $(this).tabs('add',params.tab);    
             $(this).tabs('loadTabIframe',{'which':params.tab.title,'iframe':params.iframe});    
         });    
     },    
     /** 
      * 更新tab的iframe内容   
      * @param  {jq Object} jq     [description]   
      * @param  {Object} params [description]   
      * @return {jq Object}        [description]   
      */   
     updateIframeTab:function(jq,params){    
         return jq.each(function(){    
             params.iframe = params.iframe || {};    
             if(!params.iframe.src){    
                 var $tab = $(this).tabs('getTab',params.which);    
                 if($tab==null) return;    
                 var $tabBody = $tab.panel('body');    
                 var $iframe = $tabBody.find('iframe');    
                 if($iframe.length===0) return;    
                 $.extend(params.iframe,{'src':$iframe.attr('src')});    
             }    
             $(this).tabs('loadTabIframe',params);    
         });    
     }    
 });  
 

 	/**
	 * 以下是日期控件my97的使用
	 */
	$.fn.my97 = function(options, params) {
		if (typeof options == "string") {
			return $.fn.my97.methods[options](this, params);
		}
		options = options || {};
		if (!WdatePicker) {
			alert("未引入My97js包！");
			return;
		}
		return this.each(function() {
			var data = $.data(this, "my97");
			var newOptions;
			if (data) {
				newOptions = $.extend(data.options, options);
				data.opts = newOptions;
			} else {
				newOptions = $.extend({}, $.fn.my97.defaults, $.fn.my97
						.parseOptions(this), options);
				$.data(this, "my97", {
					options : newOptions
				});
			}
			$(this).addClass('Wdate').click(function() {

				WdatePicker(newOptions);
			});
		});
	};

	$.fn.my97.methods = {
		setValue : function(target, params) {
			target.val(params);
		},

		getValue : function(target) {
			return target.val();
		},
		clearValue : function(target) {
			target.val('');
		}
	};

	$.fn.my97.parseOptions = function(target) {
		return $.extend({}, $.parser.parseOptions(target, [ "el", "vel",
				"weekMethod", "lang", "skin", "dateFmt", "realDateFmt",
				"realTimeFmt", "realFullFmt", "minDate", "maxDate",
				"startDate", {
					doubleCalendar : "boolean",
					enableKeyboard : "boolean",
					enableInputMask : "boolean",
					autoUpdateOnChanged : "boolean",
					firstDayOfWeek : "number",
					isShowWeek : "boolean",
					highLineWeekDay : "boolean",
					isShowClear : "boolean",
					isShowToday : "boolean",
					isShowOthers : "boolean",
					readOnly : "boolean",
					errDealMode : "boolean",
					autoPickDate : "boolean",
					qsEnabled : "boolean",
					autoShowQS : "boolean",
					opposite : "boolean"
				}
		]));
	};
	$.fn.my97.defaults = {
		dateFmt : 'yyyy-MM-dd'
	};
	$.parser.plugins.push('my97');
})(jQuery);


/**
 * 获取本地基本路径
 */
function getBasePath(){
	var href = window.location.href;
	var port = window.location.port;
	var base = href.substr(0,href.lastIndexOf(port)+port.length+1);
	var pn = window.location.pathname;
	var pjn = pn.split("/")[1];
	base = base+pjn;
	return base;
};
/**
 * 滑动显示信息,必须与jquery 插件一起才有效果
 * @param Msg
 */
function showMsg(Msg){
    $.messager.show({
        title:'系统提示',
        msg: Msg,
        timeout:0,
        showType:'show',
        style: {
        }
    });
}
/**
 * 获取指定select的值 与jquery一起使用
 * @param id
 * @returns
 */
function getSelectValue(id){
	var value = $('#'+id).find("option:selected").value();
	return value;
}


