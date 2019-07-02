jQuery.extend({
	
	checkFileSize : function(fileId) {
		var maxsize = 20 * 1024 * 1024;// 2M
		var errMsg = "上传的附件文件不能超过20M！！！";
		var tipMsg = "您的浏览器暂不支持计算上传文件的大小，确保上传文件不要超过20M，建议使用IE、FireFox、Chrome浏览器。";
		var browserCfg = {};
		var ua = window.navigator.userAgent;
		if (ua.indexOf("MSIE") >= 1) {
			browserCfg.ie = true;
		} else if (ua.indexOf("Firefox") >= 1) {
			browserCfg.firefox = true;
		} else if (ua.indexOf("Chrome") >= 1) {
			browserCfg.chrome = true;
		}

		try {
			var obj_file = document.getElementById(fileId);
			if (obj_file.value == "") {
				layer.msg("请先选择上传文件");
				return false;
			}
			var filesize = 0;
			if (browserCfg.firefox || browserCfg.chrome) {
				filesize = obj_file.files[0].size;
			} else if (browserCfg.ie) {
				var obj_img = document.getElementById('tempimg');
				obj_img.dynsrc = obj_file.value;
				filesize = obj_img.fileSize;
			} else {
				layer.msg(tipMsg);
				return false;
			}
			if (filesize == -1) {
				layer.msg(tipMsg);
				return false;
			} else if (filesize > maxsize) {
				layer.msg(errMsg);
				return false;
			} else {
				//layer.msg("文件大小符合要求");
				return true;
			}
		} catch (e) {
			layer.msg(e);
			return false;
		}

	},
	
    createUploadIframe: function(id, uri)
	{
		// create frame
		var frameId = 'jUploadFrame' + id;
		var iframeHtml = '<iframe id="' + frameId + '" name="' + frameId + '" style="position:absolute; top:-9999px; left:-9999px"';
		if(window.ActiveXObject)
		{
			if(typeof uri== 'boolean'){
				iframeHtml += ' src="' + 'javascript:false' + '"';

			}
			else if(typeof uri== 'string'){
				iframeHtml += ' src="' + uri + '"';

			}	
		}
		iframeHtml += ' />';
		jQuery(iframeHtml).appendTo(document.body);

		return jQuery('#' + frameId).get(0);			
    },
    createUploadForm: function(id,fileElementId,data,fileElement)
	{
		//create form	
		var formId = 'jUploadForm' + id;
		var fileId = 'jUploadFile' + id;
		var form = jQuery('<form  action="" method="POST" name="' + formId + '" id="' + formId + '" enctype="multipart/form-data"></form>');	
		if(data)
		{
			for(var i in data)
			{
				jQuery('<input type="hidden" name="' + i + '" value="' + data[i] + '" />').appendTo(form);
			}			
		}
		var oldElement;
		if(fileElement == null)
			oldElement = jQuery('#' + fileElementId);
		else
			oldElement = fileElement;
		
		var newElement = jQuery(oldElement).clone();
		jQuery(oldElement).attr('id', fileId);
		jQuery(oldElement).before(newElement);
		jQuery(oldElement).appendTo(form);
		
		//set attributes
		jQuery(form).css('position', 'absolute');
		jQuery(form).css('top', '-1200px');
		jQuery(form).css('left', '-1200px');
		jQuery(form).appendTo('body');		
		return form;
    },

    ajaxFileUpload: function(s) {
        // introduce global settings, allowing the client to modify them for all requests, not only timeout		
        s = jQuery.extend({}, jQuery.ajaxSettings, s);
        var id = new Date().getTime();   
		var form = jQuery.createUploadForm(id, s.fileElementId, (typeof(s.data)=='undefined'?false:s.data),s.fileElement);
		var io = jQuery.createUploadIframe(id, s.secureuri);
		var frameId = 'jUploadFrame' + id;
		var formId = 'jUploadForm' + id;	
        // Watch for a new set of requests
        if ( s.global && ! jQuery.active++ )
		{
			jQuery.event.trigger( "ajaxStart" );
		}            
        var requestDone = false;
        // Create the request object
        var xml = {};  
        if ( s.global )
            jQuery.event.trigger("ajaxSend", [xml, s]);
        // Wait for a response to come back
        var uploadCallback = function(isTimeout)
		{			
			var io = document.getElementById(frameId);
            try 
			{				
				if(io.contentWindow)
				{
					 xml.responseText = io.contentWindow.document.body?io.contentWindow.document.body.innerHTML:null;
                	 xml.responseXML = io.contentWindow.document.XMLDocument?io.contentWindow.document.XMLDocument:io.contentWindow.document;
					 
				}else if(io.contentDocument)
				{
					 xml.responseText = io.contentDocument.document.body?io.contentDocument.document.body.innerHTML:null;
                	xml.responseXML = io.contentDocument.document.XMLDocument?io.contentDocument.document.XMLDocument:io.contentDocument.document;
				}						
            }catch(e)
			{
				jQuery.handleError(s, xml, null, e);
			}
            if ( xml || isTimeout == "timeout") 
			{				
                requestDone = true;
                var status;
                try {
                    status = isTimeout != "timeout" ? "success" : "error";
                    // Make sure that the request was successful or notmodified
                    if ( status != "error" )
					{
                        // process the data (runs the xml through httpData regardless of callback)
                        var data = jQuery.uploadHttpData( xml, s.dataType );    
                        // If a local callback was specified, fire it and pass it the data
                        if ( s.success )
                            s.success( data, status );
    
                        // Fire the global callback
                        if( s.global )
                            jQuery.event.trigger( "ajaxSuccess", [xml, s] );
                    } else
                        jQuery.handleError(s, xml, status);
                } catch(e) 
				{
                    status = "error";
                    jQuery.handleError(s, xml, status, e);
                }

                // The request was completed
                if( s.global )
                    jQuery.event.trigger( "ajaxComplete", [xml, s] );

                // Handle the global AJAX counter
                if ( s.global && ! --jQuery.active )
                    jQuery.event.trigger( "ajaxStop" );

                // Process result
                if ( s.complete )
                    s.complete(xml, status);

                jQuery(io).unbind();

                setTimeout(function()
									{	try 
										{
											jQuery(io).remove();
											jQuery(form).remove();	
											
										} catch(e) 
										{
											jQuery.handleError(s, xml, null, e);
										}									

									}, 100);

                xml = null;

            }
        };
        // Timeout checker
        if ( s.timeout > 0 ) 
		{
            setTimeout(function(){
                // Check to see if the request is still happening
                if( !requestDone ) uploadCallback( "timeout" );
            }, s.timeout);
        }
        try 
		{

			var form = jQuery('#' + formId);
			jQuery(form).attr('action', s.url);
			jQuery(form).attr('method', 'POST');
			jQuery(form).attr('target', frameId);
            if(form.encoding)
			{
				jQuery(form).attr('encoding', 'multipart/form-data');      			
            }
            else
			{	
				jQuery(form).attr('enctype', 'multipart/form-data');			
            }			
            jQuery(form).submit();

        } catch(e) 
		{			
            jQuery.handleError(s, xml, null, e);
        }
		
		jQuery('#' + frameId).load(uploadCallback);
        return {abort: function(){
			try
			{
				jQuery('#' + frameId).remove();
				jQuery(form).remove();
			}
			catch(e){}
		}};
    },

    uploadHttpData: function( r, type ) {
        var data = !type;
        data = type == "xml" || data ? r.responseXML : r.responseText;
		
        // If the type is "script", eval it in global context
        if ( type == "script" )
            jQuery.globalEval( data );
        // Get the JavaScript object, if JSON is used.
        if ( type == "json" )
        	// 新版jquery需增加下面代码 LiuDeHua - 20151125
        	data = r.responseText;     
	        var start = data.indexOf(">");     
	        if(start != -1) {     
	           var end = data.indexOf("<", start + 1);     
	           if(end != -1) {     
	              data = data.substring(start + 1, end);     
	           }
	        }
	        eval( "data = " + data );  
        // evaluate scripts within html
        if ( type == "html" )
            jQuery("<div>").html(data).evalScripts();

        return data;
    },
	
	handleError: function( s, xml, status, e ) {
		// If a local callback was specified, fire it
		if ( s.error )
			s.error( xml, status, e );

		// Fire the global callback
		if ( s.global )
			jQuery.event.trigger( "ajaxError", [xml, s, e] );
	}
});

// 异步上传公共代码 LiuDeHua - 20151125
// uploadUrl:上传路径	FileController.java /stone/file/ajaxUpload
// fileType:文件上传类型	image file media
// elementId:组件ID名	<input type="file" id="elementId" />
// inputId：赋值框ID		<input type="hidden" id="inputId" />
// showId:回显ID		<img id="showId" src="" />
function ajaxFileUploadPub(uploadUrl, fileType, elementId,func){
    var flag = $("#flag").val();//压缩的标识符
    if(flag == undefined){
    	flag = "";
    }
    var isWatermark = $("#isWatermark").val();//是否增加图片水印
    if(isWatermark == undefined){
    	isWatermark = "";
    }
	$.ajaxFileUpload({
        url : uploadUrl+'?fileType='+fileType+'&flag='+flag+'&isWatermark='+isWatermark,
        secureuri : false,
        fileElementId : elementId,
        dataType : 'json',
        success : function(data){
           var url = data.url;
           if(url && url != ""){
        	   layer.msg("上传成功");
	            if(func){
	            	func(data);
	            }
           }else{
        	   layer.msg(data.message);
           }
        },
        error: function(data, status, e){
        	layer.msg("上传错误");
        }
    });
}

//(评论图片)异步上传
//uploadUrl:上传路径	FileController.java /stone/file/ajaxUpload
//fileType:文件上传类型	image file media
//elementId:组件ID名	<input type="file" id="elementId" />
//inputId：赋值框ID		<input type="hidden" id="inputId" />
//showId:回显ID		<img id="showId" src="" />
function ajaxFileUploadPubComment(uploadUrl, fileType, elementId, inputId, showId){
	
	var strs = showId.split("_");
	var flag_id = "";
	var index = "";
	if(strs.length == 2){
		flag_id = strs[1];
		index = flag_id+"_a_0";
	}
	
	var liOns = $("#uploadImg_"+flag_id).find('li');
	if(liOns.length >0){
		if(liOns.length >=5){
			layer.msg("最多只能上传5张！");
			return;
		}
		index = flag_id+"_n_"+liOns.length.toString();
	}
	
	var t1 = '<li id="imgli_'+index+'" onMouseMove="showDelImg(\''+index+'\');" onmouseout="hideDelImg(\''+index+'\');">';
	var t2 = '<div class="imgs">';
	var t4 = '</div>';
	var t6 = '</li>';
	
	var flag = $("#flag").val();//压缩的标识符
    if(flag == undefined){
    	flag = "";
    }
    var isWatermark = $("#isWatermark").val();//是否增加图片水印
    if(isWatermark == undefined){
    	isWatermark = "";
    }
	
 $.ajaxFileUpload({
     url : uploadUrl+'?fileType='+fileType+'&flag='+flag+'&isWatermark='+isWatermark,
     secureuri : false,
     fileElementId : elementId,
     dataType : 'json',
     success : function(data){
         if(data.state == "SUCCESS"){
         	var t3 = '<img id="showId_'+index+'" src="'+data.url+'" style="width: 40px; height: 40px; margin-left: 0px;">';
         	var t7 = '<span id="delImg_'+ index +'" onclick="delImg(\''+data.url+'\','+'\''+index+'\','+'\''+flag_id+'\');" style="display:none;">删除</span>';
         	var t5 = '<input type="hidden" value="'+data.url+'" id="goodsCommentImg_'+index+'" name="goodsCommentList[\''+ flag_id +'\'].goodsCommentImg">';
         	var all = t1 + t2 + t3 + t7 +t4 + t5 + t6;
         	$("#uploadImg_"+flag_id).append(all);
         	
         	var src = $('#showId_'+index).attr('src');
         	if(src != ""){
         		$('#showId_'+index).show();
         	}
         	liOns = $("#uploadImg_"+flag_id).find('li');
         	$("#picnum_"+flag_id).html(liOns.length+"/5");
         }
     },
     error: function(data, status, e){
         alert(e);
     }
 });
}

// 删除图片
function delCustomImg(imageId, showId) {
	top.$.jBox.confirm("确定删除图片吗？", "提示", function(v, h, f){
		if (v == 'ok'){
			var url = projectName+"/stone/file/ajaxdelete";
			$.post(url, { filename : $("#"+imageId).val()}, function(result) {
				if (result == false) {
					$.jBox.tip("删除图片失败！");
					return;
				} else {
					$("#"+imageId).val("");
					$("#"+showId).attr("src", "");
					$.jBox.tip("删除图片成功！");
				}
			});
			return true;                     
        } else if (v == 'cancel'){
		   
		}
		return true;
	}); 
}