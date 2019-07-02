/**
 * @author ZhaoMX
 * 
 * @requires jQuery
 * 
 * 自定义校验 dateRex:日期校验 YYYY-MM-DD, 手机号校验,
 * 			电话号码校验,手机/电话同时校验
 * 
 * @returns object
 */
$.extend($.fn.validatebox.defaults.rules, {
	dateRex : {
		validator : function(value) {
			var rex = /^(\d{4})-(0\d{1}|1[0-2])-(0\d{1}|[12]\d{1}|3[01])$/;//验证日期格式
			return rex.test(value);
		},
		message : '请输入正确的日期格式!'
	},
	mobileRex : {
		validator : function(value) {
			var rex = /^1[3-8]+\d{9}$/;//验证手机号的
			return rex.test(value);
		},
		message : '请输入正确的手机格式!'
	},
	phoneRex : {
		validator : function(value) {
			var rex2 = /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;//验证电话号码的
			return rex2.test(value);
		},
		message : '请输入正确的电话格式!'
	},
	mobileOrPhoneRex : {
		validator : function(value) {
			var rex = /(^1[3-8]+\d{9}$)|(^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$)/;//验证手机号或者电话号码的
			return rex.test(value);
		},
		message : '请输入正确的号码格式!'
	}
	
});
/**
 * @author ZhaoMX
 * 
 * @requires jQuery
 * 
 * 将form表单元素的值序列化成对象
 * 
 * @returns object
 */
serializeObject = function(form) {
	var o = {};
	var fields = form.serializeArray();
	$.each(fields, function(i, field) {
		o[field.name] = field.value; // 设置查询参数
	});
	return o;
};
//多个table，修改列宽度百分比
$(function(){
	$('.input_table td:nth-child(odd)').css("width","10%");  
	$('.input_table td:nth-child(even)').css("width","23%");
});

/*********************************************************************/
// 获取当前日期
function getCurrentDate() {
	var day = new Date(); 
	var Year = 0; 
	var Month = 0; 
	var Day = 0; 
	var CurrentDate = ""; 
	//初始化时间 
	Year= day.getFullYear();
	Month= day.getMonth()+1; 
	Day = day.getDate(); 

	CurrentDate += Year + "-"; 
	 if (Month >= 10 ) { 
		 CurrentDate += Month + "-"; 
	 } else { 
		 CurrentDate += "0" + Month + "-"; 
	 } 
	 if (Day >= 10 ) { 
		 CurrentDate += Day ; 
	 } else { 
		 CurrentDate += "0" + Day ; 
	 } 

	return CurrentDate;
}

//日期比较，起始日期不能晚于结束日期
function compareDate(startDate, endDate) {
	if(startDate==null||startDate==""||startDate==undefined){
		return true;
	}
	if(endDate==null||endDate==""||endDate==undefined){
		return true;
	}
    var d1 = new Date(startDate.replace(/\-/g, "\/"));
    var d2 = new Date(endDate.replace(/\-/g, "\/"));
    if (d1 > d2) {
        return false;
    } 
    return true;
}

function checkIdNo(num){
    num = num.toUpperCase();
    //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
    if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num)))
    {
    	//$.messager.alert('提示','客户身份证件号码必须是由15或18位数字组成（或17位数字加字母X）');
        return false;
    }
    //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
    //下面分别分析出生日期和校验位
    var len, re;
    len = num.length;
    if (len == 15)
    {
        re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
        var arrSplit = num.match(re);
 
        //检查生日日期是否正确
        var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
        var bGoodDay;
        bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
        if (!bGoodDay)
        {
        	$.messager.alert('提示','输入的身份证号里出生日期不对！');
            return false;
        }
        else
        {
                //将15位身份证转成18位
                //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
                var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
                var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
                var nTemp = 0, i;
                num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
                for(i = 0; i < 17; i ++)
                {
                    nTemp += num.substr(i, 1) * arrInt[i];
                }
                num += arrCh[nTemp % 11];
                return true;
        }
    }
    if (len == 18)
    {
        re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
        var arrSplit = num.match(re);
 
        //检查生日日期是否正确
        var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
        var bGoodDay;
        bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
        if (!bGoodDay)
        {
        	$.messager.alert('提示','输入的身份证号里出生日期不对！');
            return false;
        }
    else
    {
        //检验18位身份证的校验码是否正确。
        //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
        var valnum;
        var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
        var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
        var nTemp = 0, i;
        for(i = 0; i < 17; i ++)
        {
            nTemp += num.substr(i, 1) * arrInt[i];
        }
        valnum = arrCh[nTemp % 11];
        if (valnum != num.substr(17, 1))
        {
        	$.messager.alert('提示','18位身份证的校验码不正确！应该为：' + valnum);
            return false;
        }
        return true;
    }
    }
    return false;
}

// 错误信息展示
function showMsg(Msg){
    $.messager.show({
        title:'系统提示',
        msg: Msg,
        timeout:0,
        showType:'show',
        style: {
            top:document.body.scrollTop+document.documentElement.scrollTop
        }
    });
}

//日期框初始化
function initDate(){
	lay('.shortDate').each(function(){
  		laydate.render({
    	elem: this,
    	trigger: 'click'
  		});
	}); 
	lay('.longDate').each(function(){
  		laydate.render({
    	elem: this,
    	type:'datetime',
    	trigger: 'click'
  		});
	}); 
}

//表单必填项标识
function intitValid(formObj){
	var objs;
	if(formObj){
		objs = $(obj).find(".v-notnull");
	}else{
		objs = $(".v-notnull");
	}
	objs.each(function(){
		$(this).before("<font class='valids' color='#d9534f'> *</font>");
	});
}

//表单校验逻辑
function formValid(formObj){
	var flag = true;
	var isFocus = false;
	$(formObj).find('.valids').each(function(){
		$(this).remove();
	});
	
	$(formObj).find('input').each(function(){
		if($(this).hasClass('v-notnull')){
			if(!$(this).val() || $(this).val().trim() == ""){
				$(this).after("<font class='valids' color='#d9534f'>必填</font>");
				flag=false;
			}
		}
		
		if($(this).hasClass('v-number')){
			var reg=/^[\+\-]?[0-9]*$/;
			
			if($(this).val() != "" && !reg.test($(this).val())){
				$(this).after("<font class='valids' color='#d9534f'>数字</font>");
				flag=false;
			}
		}

        if($(this).hasClass('v-email')){
            var reg=/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
            if($(this).val() != "" && !reg.test($(this).val())){
                $(this).after("<font class='valids' color='#d9534f'>邮箱格式不正确</font>");
                flag=false;
            }
        }
		
		if(!flag && !isFocus){
			isFocus = true;
			$(this).focus();
		}
		
	});
	
	$(formObj).find('select').each(function(){
		if($(this).hasClass('v-notnull')){
			if(!$(this).val() || $(this).val().trim() == ""){
				if($(this).hasClass('select2-hidden-accessible')){
					$(this).next().after("<font class='valids' color='#d9534f'>必填</font>");
				}else{
					$(this).after("<font class='valids' color='#d9534f'>必填</font>");
				}
				
				flag=false;
			}
		}
		if(!flag && !isFocus){
			isFocus = true;
			$(this).focus();
		}
	});
	
	return flag;
}

//下拉框初始化
function initSelectFun(url,obj,synflag){
	var selects;
	if(obj){
		selects = $(obj).find("select");
	}else{
		selects = $("select");
	}

	if(synflag || synflag == undefined){
		synflag = true;
	}else {
        synflag = false;
	}
	selects.each(function(){
		var codetype = $(this).attr("codetype");
		var codevalue = $(this).attr("codevalue");
		if(!codevalue){
			codevalue = "";
		}
		
		var stype = $(this).attr("stype");
		var selectObj = $(this);
		if(codetype && codetype != ""){
			$(selectObj).append('<option value="">--请选择--</option>');
			//ajax，支持异步提交
			$.ajax({
				url:url,
				data:{codetype:codetype},
				async : synflag,
				type : "POST",
				dataType : "json",
				success : function(data){
					$.each(data,function(index,item){
						$(selectObj).append('<option value="'+item.code+'">'+item.codename+'</option>');
					});
					$(selectObj).val(codevalue);
				}
			});
			
			if(stype=="find"){
				var width = $(selectObj).css("width");
				$(selectObj).select2();
				$(selectObj).parent().children(".select2").css("width",width);
			}
		
		}
	});
	
}
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
