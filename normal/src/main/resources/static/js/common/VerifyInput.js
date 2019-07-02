/*******************************************************************************
 * 程序名称: VerifyInput.js 程序功能: 通用校验函数Ver2 比Ver1增加科学记数法校验，校验类型间可进行“与（&）”、“或（|）”运算
 * 创建人 : 胡 博 最近更新日期: 2002-10-22
 ******************************************************************************/
var arrVerifyErrInfo = new Array();   // 记录一个字段的校验错误信息

function verifyClass()
{
	this.verifyInput = verifyInput;
	this.verifyForm = verifyForm;
	this.verifyElement = verifyElement;
	this.verifyType = verifyType;
	this.verifyMustNull = verifyMustNull;
	this.verifyNotNull = verifyNotNull;
	this.verifyNumber = verifyNumber;
	this.verifyDate = verifyDate;
	this.verifyEmail = verifyEmail;
	this.verifyDecimal=verifyDecimal;
	this.verifyInteger = verifyInteger;
	this.verifyLength = verifyLength;
	this.verifyValue = verifyValue;
	this.verifyCode = verifyCode;
	this.verifyDateAndTime = verifyDateAndTime;
}

// 业务程序调用接口，如果通过校验返回true，否则返回false
function verifyInput()
{
	var formsNum = 0;	// 窗口中的FORM数
	var elementsNum = 0;	// FORM中的元素数
	var passFlag = true;	// 校验通过标志

	// 遍历所有FORM
	for (formsNum=0; formsNum<window.document.forms.length; formsNum++)
	{
		// 遍历FORM中的所有ELEMENT
		for (elementsNum=0; elementsNum<window.document.forms[formsNum].elements.length; elementsNum++)
		{
			// 元素校验属性verify不为NULL
			if (window.document.forms[formsNum].elements[elementsNum].verify != null && window.document.forms[formsNum].elements[elementsNum].verify != "")
			{
				// 进行校验verifyElement
				if (!verifyElement(window.document.forms[formsNum].elements[elementsNum].verify, window.document.forms[formsNum].elements[elementsNum].value))
				{
					passFlag = false;
					break;
				}
			}
		}
		if (!passFlag) break;
	}

	// if(passFlag) alert("通过校验");
	return passFlag;
}

// 业务程序调用接口，如果通过校验返回true，否则返回false
function verifyInput3()
{
	var formsNum = 0;	// 窗口中的FORM数
	var elementsNum = 0;	// FORM中的元素数
	var passFlag = true;	// 校验通过标志

    var aDivs = document.body.all.tags("DIV");
    
    for (var i=0; i<aDivs.length; i++)
    {
        if (aDivs[i].style.display != 'none')
        {
            var inputs = aDivs[i].all;
            for (var j=0; j<inputs.length; j++)
            {
                if (inputs[j].tagName == 'INPUT')
                {
                    // 元素校验属性verify不为NULL
			        if (inputs[j].verify != null && inputs[j].verify != "")
                     {
                        // 进行校验verifyElement
				        if (!verifyElement(inputs[j].verify, inputs[j].value))
				        {
					        passFlag = false;
					        break;
				        }
				    }
                }
            }
        }
        if (!passFlag)
        {
            break;
        }
    }
	// if(passFlag) alert("通过校验");
	return passFlag;
}

// 业务程序调用接口，以FORM为单位，如果通过校验返回true，否则返回false
function verifyForm(formName)
{
	var elementsNum = 0;	// FORM中的元素数
	var passFlag = true;	// 校验通过标志

	// 遍历FORM中的所有ELEMENT
	for (elementsNum=0; elementsNum<window.document.all(formName).elements.length; elementsNum++)
	{
		// 元素校验属性verify不为NULL
		if (window.document.all(formName).elements[elementsNum].verify != null && window.document.all(formName).elements[elementsNum].verify != "")
		{
			// 进行校验verifyElement
			if (!verifyElement(window.document.all(formName).elements[elementsNum].verify, window.document.all(formName).elements[elementsNum].value))
			{
				passFlag = false;
				break;
			}
		}
	}

	// if(passFlag) alert("通过校验");
	return passFlag;
}

// 校验元素，strInfo为元素校验信息，strValue为元素值
function verifyElement(strInfo, strValue)
{
	if(strInfo.indexOf("branchcodeview")>=0){
		// alert("如果是营业部编码输入项，则直接跳过");
		return true;
	}
	var strValue = trim(strValue);	// 清空空格
	var passFlag = true;	// 校验通过标志，true表示通过
	var vName;	// 校验字段名称
	var vType;	// 要进行的校验类型
	var intIndex;	// 运算符索引
	var typeStack = new Array();	// 一个字段的校验结果堆栈
	var operStack = new Array();	// 一个字段的校验计算符号堆栈，仅限于“与”，“或”计算

	while (arrVerifyErrInfo != "")
	{
		// 清空前一个字段的校验错误信息
		arrVerifyErrInfo.pop();
	}

	// 分离出字段名称，兼容前一版本，故仍用“|”分隔
	vName = strInfo.substring(0, strInfo.indexOf("|"));
	strInfo = strInfo.substring(strInfo.indexOf("|") + 1);

	// 拆分出校验类型，并进行校验，返回校验结果（通过TRUE，否FALSE），并入堆栈
	while (strInfo != "")
	{
		if (strInfo.indexOf("|") != -1 && strInfo.indexOf("&") != -1)
		{
			// 存在两种运算
			intIndex = strInfo.indexOf("|")>strInfo.indexOf("&")?strInfo.indexOf("&"):strInfo.indexOf("|");
			vType = strInfo.substring(0, intIndex);
			typeStack.push(verifyType(vName, vType, strValue));
			operStack.push(strInfo.substring(intIndex, intIndex + 1));
			strInfo = strInfo.substring(intIndex + 1);
		}
		else if (strInfo.indexOf("|") != -1 || strInfo.indexOf("&") != -1)
			{
				// 只有一种运算
				intIndex = strInfo.indexOf("|")>strInfo.indexOf("&")?strInfo.indexOf("|"):strInfo.indexOf("&");
				vType = strInfo.substring(0, intIndex);
				typeStack.push(verifyType(vName, vType, strValue));
				operStack.push(strInfo.substring(intIndex, intIndex + 1));
				strInfo = strInfo.substring(intIndex + 1);
			}
			else
			{
				// 无运算
				vType = strInfo;
				strInfo = "";
				typeStack.push(verifyType(vName, vType, strValue));
			}
	}

	passFlag = typeStack[0];
	// 只有一个校验类型时
	for (var k=0; k<operStack.length; k++)
	{
		// 有多个校验类型，进行运算
		if (operStack[k] == "|")
		{
			typeStack[k + 1] = typeStack[k] | typeStack[k + 1];
		}
		else if (operStack[k] == "&")
			{
				typeStack[k + 1] = typeStack[k] & typeStack[k + 1];
			}
			else
			{
				alert("校验参数设置有误");
			}
		passFlag = typeStack[k + 1];
	}

	var strVerifyErrInfo = "输入有误，可能是如下错误中的一个：\n";
	if (!passFlag)
	{
		while (arrVerifyErrInfo != "")
		{
			strVerifyErrInfo = strVerifyErrInfo + arrVerifyErrInfo.pop();
		}
		alert(strVerifyErrInfo);
	}
	return passFlag;
}

function verifyType(vName, vType, strValue)
{
	var passFlag = true;

	if (vType.toUpperCase() == "NULL") passFlag = verifyMustNull(vName, strValue);

	if (vType.toUpperCase() == "NOTNULL") passFlag = verifyNotNull(vName, strValue);

	if (vType.toUpperCase() == "NUM") passFlag = verifyNumber(vName, strValue);

	if (vType.toUpperCase() == "DATE") passFlag = verifyDate(vName, strValue);
	
	if (vType.toUpperCase() == "DATETIME") passFlag = verifyDateAndTime(vName, strValue);

	if (vType.toUpperCase() == "EMAIL") passFlag = verifyEmail(vName, strValue);
        if (vType.toUpperCase() == "Decimal") passFlag = verifyDecimal(vName, strValue);
	if (vType.toUpperCase() == "INT") passFlag = verifyInteger(vName, strValue);

	// 不能随意修改约定“LEN”
	if (vType.toUpperCase().indexOf("LEN") == 0) passFlag = verifyLength(vName, strValue, vType);

	// 不能随意修改约定“VALUE”
	if (vType.toUpperCase().indexOf("VALUE") == 0) passFlag = (verifyNumber(vName, strValue) && verifyValue(vName, strValue, vType));

	// 不能随意修改约定“CODE:”
	if (vType.toUpperCase().indexOf("CODE:") == 0) passFlag = verifyCode(vName, strValue, vType);

	// 不能随意修改约定“CODE:”
	if (vType.toUpperCase() == "ZIPCODE") passFlag = (verifyLength(vName, strValue, "len=6") && verifyNumber(vName, strValue));

	return passFlag;
}

// 返回true表示通过校验，返回false表示不通过，数据违法
// 必须为空校验
function verifyMustNull(vName, strValue) {
	if (strValue != "")
	{
		arrVerifyErrInfo.push(vName + "必须为空!\n");
		return false;
	}
	return true;
}

// 不能为空校验
function verifyNotNull(vName, strValue)
{
	if (strValue == "")
	{
		arrVerifyErrInfo.push(vName + "不能为空!\n");
		return false;
	}
	return true;
}

// 数字类型校验
function verifyNumber(vName, strValue)
{
	if (strValue != "" && !isNubmerId(strValue))
	{
		arrVerifyErrInfo.push(vName + "不是有效的数字!\n");
		return false;
	}
	return true;
}
function isNubmerId(strValue)
{
	var m=0;
	if(strValue.charAt(0)=="+"||strValue.charAt(0)=="-")
		var m=1;
	for(i=m;i<strValue.length;i++)
	{
		if(!isNumeric(strValue.charAt(i)))
		{
			return false;
		}
	}
	return true;
}
// 日期类型校验
function verifyDate(vName, strValue) {
	if (strValue != "" && !isDate(strValue)&&!isDateN(strValue))
	{
		arrVerifyErrInfo.push(vName + "不是有效的日期格式(YYYY-MM-DD)或者(YYYYMMDD)!\n");
		return false;
	}
	return true;
}

// 日期时间类型校验
function verifyDateAndTime(vName, strValue) {
	if (strValue != "" && !isDateAndTime(strValue)) {
		arrVerifyErrInfo.push(vName + "不是有效的日期时间格式(YYYY-MM-DD HH:MM:SS)或者(YYYYMMDD HH:MM:SS)!\n");
		return false;
	}
	return true;
}

function isDateAndTime(str) {
	//var regex = "^((\\d{2}(([02468][048])|([1357Array][26]))[\\-\\/\\s]?((((0?[13578])|(1[02]))[\\-\\/\\s]?((0?[1-Array])|([1-2][0-Array])|(3[01])))|(((0?[46Array])|(11))[\\-\\/\\s]?((0?[1-Array])|([1-2][0-Array])|(30)))|(0?2[\\-\\/\\s]?((0?[1-Array])|([1-2][0-Array])))))|(\\d{2}(([02468][123567Array])|([1357Array][0134578Array]))[\\-\\/\\s]?((((0?[13578])|(1[02]))[\\-\\/\\s]?((0?[1-Array])|([1-2][0-Array])|(3[01])))|(((0?[46Array])|(11))[\\-\\/\\s]?((0?[1-Array])|([1-2][0-Array])|(30)))|(0?2[\\-\\/\\s]?((0?[1-Array])|(1[0-Array])|(2[0-8]))))))(\\s(((0?[0-Array])|([1-2][0-3]))\\:([0-5]?[0-Array])((\\s)|(\\:([0-5]?[0-Array])))))?$";
	var regex="^((((1[6-9]|[2-9]\\d)\\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\\d|3[01]))|(((1[6-9]|[2-9]\\d)\\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\\d|30))|(((1[6-9]|[2-9]\\d)\\d{2})-0?2-(0?[1-9]|1\\d|2[0-8]))|(((1[6-9]|[2-9]\\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-)) (20|21|22|23|[0-1]?\\d):[0-5]?\\d:[0-5]?\\d$";
	var myReg = new RegExp(regex);
	if(myReg.test(str)) 
		return true;
	else
		return false;
}

function verifyEmail (vName, strValue)
{
	if (strValue != "")
	{
		var s=strValue;
		var i = 1;
		var len = s.length;
		if (len > 50)
		{
			arrVerifyErrInfo.push(vName +"email地址长度不能超过50位！");
			return false;
		}
		var pos1 = s.indexOf("@");
		var pos2 = s.indexOf(".");
		var pos3 = s.lastIndexOf("@");
		var pos4 = s.lastIndexOf(".");

		if ((pos1 <= 0)||(pos1 == len)||(pos2 <= 0)||(pos2 == len))
		{
			arrVerifyErrInfo.push(vName +"请输入有效的e-mail地址！");
			return false;
		}
		else
		{
			if( (pos1 == pos2 - 1) || (pos1 == pos2 + 1)|| ( pos1 != pos3 )|| ( pos4 < pos3 ) )
			{
				arrVerifyErrInfo.push(vName +"请输入有效的e-mail地址！");
				return false;
    		}
    	}
		if ( !isCharsInBag( s, "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.-_@"))
		{
			arrVerifyErrInfo.push(vName +"email地址中只能包含字符ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.-_@\n"+"请重新输入" );
			return false;
		}
		var badChar ="><,[]{}?/+=|\:;!#$%^&()`";
		if (isCharsInBag(s,badChar))
		{
			arrVerifyErrInfo.push(vName +"请不要在email地址中输入字符 " + badChar + "\n" );
			return false;
		}
	}
	return true;
}
// 在0到1之间的数值(0,1]
function verifyDecimal(vName, strValue) {
        if (strValue != "" &&(parseFloat(strValue)<=0||parseFloat(strValue)>1) )
        {
		arrVerifyErrInfo.push(vName + "不是0到1之间的小数!\n");
		return false;
	}
	return true;        
}
// 整数类型校验
function verifyInteger(vName, strValue) {
	if (strValue != "" && !isInteger(strValue))
	{
		arrVerifyErrInfo.push(vName + "不是有效的整数!\n");
		return false;
	}
	return true;
}

// 输入长度校验
function verifyLength(vName, strValue, vType) {
	var oper;
	var len;
	var strOperLen = vType.substring(3);	// 截取出操作符和值

	if (strValue == "") return true;

	if (isNaN(parseInt(strOperLen.substring(1))))
	{
		oper = strOperLen.substring(0, 2);	// 当为">=", "<="时
		len = strOperLen.substring(2);
	}
	else
	{
		oper = strOperLen.substring(0, 1);	// 当为"=", "<", ">"时
		len = strOperLen.substring(1);
	}

	switch (oper)
	{
		case "=" :
			if (strValue.length != parseInt(len))
			{
				arrVerifyErrInfo.push(vName + "不符合规定的输入长度!长度需要等于" + len + "\n");
				return false;
			}
			break;
		case ">" :
			if (strValue.length <= parseInt(len))
			{
				arrVerifyErrInfo.push(vName + "不符合规定的输入长度!长度需要大于" + len + "\n");
				return false;
			}
			break;
		case "<" :
			if (strValue.length >= parseInt(len))
			{
				arrVerifyErrInfo.push(vName + "不符合规定的输入长度!长度需要小于" + len + "\n");
				return false;
			}
			break;
		case ">=" :
			if (strValue.length < parseInt(len))
			{
				arrVerifyErrInfo.push(vName + "不符合规定的输入长度!长度需要大于等于" + len + "\n");
				return false;
			}
			break;
		case "<=" :
			if (strValue.length > parseInt(len))
			{
				arrVerifyErrInfo.push(vName + "不符合规定的输入长度!长度需要小于等于" + len + "\n");
				return false;
			}
			break;
	}
	return true;
}

// 输入值校验
function verifyValue(vName, strValue, vType)
{
	var oper;
	var Val;
	var strOperVal = vType.substring(5);	// 截取出操作符和值

	if (strValue == "") return true;

	if (isNaN(parseFloat(strOperVal.substring(1))))
	{
		oper = strOperVal.substring(0, 2);	// 当为">=", "<="时
		Val = strOperVal.substring(2);
	}
	else
	{
		oper = strOperVal.substring(0, 1);	// 当为"=", "<", ">"时
		Val = strOperVal.substring(1);
	}

	switch (oper)
	{
		case "=" :
			if (parseFloat(strValue) != parseFloat(Val))
			{
				arrVerifyErrInfo.push(vName + "不符合规定的取值!输入值需要等于" + Val + "\n");
				return false;
			}
			break;
		case ">" :
			if (parseFloat(strValue) <= parseFloat(Val))
			{
				arrVerifyErrInfo.push(vName + "不符合规定的取值!输入值需要大于" + Val + "\n");
				return false;
			}
			break;
		case "<" :
			if (parseFloat(strValue) >= parseFloat(Val))
			{
				arrVerifyErrInfo.push(vName + "不符合规定的取值!输入值需要小于" + Val + "\n");
				return false;
			}
			break;
		case ">=" :
			if (parseFloat(strValue) < parseFloat(Val))
			{
				arrVerifyErrInfo.push(vName + "不符合规定的取值!输入值需要大于等于" + Val + "\n");
				return false;
			}
			break;
		case "<=" :
			if (parseFloat(strValue) > parseFloat(Val))
			{
	// alert(vName + "不符合规定的取值!输入值需要小于等于"+Val);
	arrVerifyErrInfo.push(vName + "不符合规定的取值!输入值需要小于等于" + Val + "\n");
	return false;
	}
	break;
	}
	return true;
}

// 代码类型校验，可与CodeSelect功能配合
function verifyCode(vName, strValue, vType, returnCode)
{
	var strCode = vType.substring(5)	// 截取出代码类型标志
	var arrCode = mVs.getVar(strCode);	// 从内存读数据
	var passFlag = false;	// 校验通过标志，true表示通过
	var arrRecord;	// 拆分的记录数组
	var arrField;	// 拆分的字段数组
	var recordNum;	// 记录数
	var fieldNum;	// 字段数
	var arrResult = new Array();	// 结果数组，模仿CodeSelect数据格式
	var urlStr = "../common/jsp/CodeQueryWindow.jsp?codeType=" + strCode;
	// urlStr：查询窗口URL和查询参数
	var sFeatures = "status:no;help:0;close:0;dialogWidth:150px;dialogHeight:0px;dialogLeft:-1;dialogTop:-1;resizable=1";
	// sFeatures：查询窗口样式
	var strCodeSelect = "";
	if (strValue == "") return true;

	// 内存中有数据，直接进行校验
	if (arrCode != false)
	{
		for (var i=0; i<arrCode.length; i++)
		{
			for (var j=0; j<arrCode[i].length; j++)
			{
				if (strValue == arrCode[i][j])
				{
					// 在个人承保录入的校验职业和职业代码中用到
					if (typeof(returnCode) != "undefined") return arrCode[i];
					passFlag = true;
					break;
				}
			}
		}
	}
	else
	{
		// 连接数据库进行CODE查询，返回查询结果给arrCode
		arrCode = window.showModalDialog(urlStr, "", sFeatures);

		if ((arrCode == false) || (arrCode == ""))
		{
			// 等待从数据库端取回数据
			arrVerifyErrInfo.push("CODE查询功能错误，请与管理员联系！\n");
			return false;
		}
		else if (arrCode == "Code Query Faile")
			{
				// 查询数据库失败处理
				arrVerifyErrInfo.push(vName + " 数据库代码查询失败，请与管理员联系！\n");
				return false;
			}
			else
			{
				arrRecord = arrCode.split("^");	// 拆分记录，形成返回的数组
				recordNum = arrRecord.length;
				for (i=1; i<recordNum; i++)
				{
					arrField  = arrRecord[i].split("|");	// 拆分字段,将每个纪录拆分为一个数组
					fieldNum = arrField.length;
					arrResult[i-1] = new Array();
					for (j=0;j<fieldNum;j++)
					{
						arrResult[i-1][j] = arrField[j];
					}
					strCodeSelect = strCodeSelect + "<option value=" + arrResult[i-1][0] + ">";
					strCodeSelect = strCodeSelect + arrResult[i-1][0] + "-" + arrResult[i-1][1];
					strCodeSelect = strCodeSelect + "</option>";
				}
				mVs.addArrVar(strCode,"",arrResult);	// 保存进内存，提供给CodeSelect共享
				mVs.addVar(strCode+"Select","",strCodeSelect);	// 无论是否有数据从服务器端得到,都设置该变量

				for (i=0; i<arrResult.length; i++)
				{
					// 进行校验
					for (j=0; j<arrResult[i].length; j++)
					{
						if (strValue == arrResult[i][j])
						{
							// 在个人承保录入的校验职业和职业代码中用到
							if (typeof(returnCode) != "undefined") return arrResult[i];
							passFlag = true;
							break;
						}
					}
				}
			}
	}
	if (!passFlag)
	{
		arrVerifyErrInfo.push(vName + "输入不符合数据库规定的取值范围！请查阅或双击输入框选择！\n");
	}
	return passFlag;
}

function verifyElementWrap(strInfo, strValue,boxName)
{
	var strboxName,strfocus,strcolor,cleardata;
	strboxName=boxName;
	chkoldclass="if(!"+strboxName+".oldclass) \n"+strboxName+".oldclass="+strboxName+".className;";
	eval(chkoldclass);
	if (!verifyElement(strInfo, strValue))
	{
		strfocus=strboxName+".onblur="+strboxName+".focus;";
		strcolor=strboxName+".className=\"warn\";";
		cleardata=strboxName+".value='';";
		eval(strcolor);
		eval(cleardata);
		eval(strfocus);
		return false;
	}
	strfocus=strboxName+".onblur=null";
	strcolor=strboxName+".className="+strboxName+".oldclass;";
	eval(strcolor);
	eval(strfocus);
	return true;
}

// add with wzw 2004-10-12
function verifyElementWrap2(strInfo, strValue,boxName)
{
	var strboxName,strfocus,strcolor,cleardata;
	strboxName=boxName;
	chkoldclass="if(!"+strboxName+".oldclass) \n"+strboxName+".oldclass="+strboxName+".className;";
	eval(chkoldclass);
	if (!verifyElement(strInfo, strValue))
	{
		strfocus=strboxName+".focus();";
		if(eval(boxName+".className") == "codeno")
		{
		 	strcolor=strboxName+".className=\"warnno\";";	
		}	
	  else 
	  {
			strcolor=strboxName+".className=\"warn\";";	
		}
		cleardata=strboxName+".value='';";
		eval(strcolor);
		eval(cleardata);
		eval(strfocus);
		return false;
	}
	strcolor=strboxName+".className="+strboxName+".oldclass;";
	eval(strcolor);
	return true;
}

// 业务程序调用接口，如果通过校验返回true，否则返回false
function verifyInput2()
{
	var formsNum = 0;	// 窗口中的FORM数
	var elementsNum = 0;	// FORM中的元素数
	var passFlag = true;	// 校验通过标志
	// 遍历所有FORM
	for (formsNum=0; formsNum<window.document.forms.length; formsNum++)
	{
		// 遍历FORM中的所有ELEMENT
		for (elementsNum=0; elementsNum<window.document.forms[formsNum].elements.length; elementsNum++)
		{
			// 元素校验属性verify不为NULL
			if (window.document.forms[formsNum].elements[elementsNum].verify != null && window.document.forms[formsNum].elements[elementsNum].verify != "")
			{
				// 进行校验verifyElement
				if (!verifyElementWrap2(window.document.forms[formsNum].elements[elementsNum].verify, window.document.forms[formsNum].elements[elementsNum].value,window.document.forms[formsNum].name+"."+window.document.forms[formsNum].elements[elementsNum].name))
				{
					passFlag = false;
					break;
				}
			}
		}
		if (!passFlag) break;
	}
	return passFlag;
}