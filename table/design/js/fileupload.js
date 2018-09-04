// form upload image
var FileUpload = function() {
}
FileUpload.prototype.initFilePreview = function(inputImgObj, filePath, width, height) {
	 var fieldName = inputImgObj.attr("name");
     var appendToObj = inputImgObj.parent();
     var html ="<div class='file-preview' style='height: "+height+"px;width: "+width+"px;'>"
         html+= "<div class='file-drop-zone'>";
         html+=     "<div class='file-preview-thumbnails file-preview-hbs' style='height:100%;width:"+(width - 20)+"px;'>";
         html+=     "</div>";
         html+= "</div>";
         html+= "<div class='fileinput-upload-button' style='width:100%;text-align:center;display:table;margin-top:3px;'>";
         html+=     "<span class='btn btn-success btn-squared fileinput-button'>";
         html+=         "<span>选择图片</span>";
         html+=         "<input type='file' name='file_"+fieldName+"' onchange='upload.selectedUploadImage(this, event)'>";
         html+=     "</span>";
         html+= "</div>";
         html+="</div>";
         appendToObj.append(html);
      this.initImagePreviewFrame(fieldName, filePath, inputImgObj);
}

FileUpload.prototype.clearFilePreview = function(inputImgObj) {
	inputImgObj.next("img").remove();
    inputImgObj.next("div.file-preview").remove();
    inputImgObj.val("");
}

FileUpload.prototype.initImagePreviewFrame = function(inputName, imageArray, inputImgObj) {
	var inputObj = inputImgObj;
    var imagePaths = inputObj.val();
    if(imageArray != undefined && imageArray.length > 0) {
       var previewFrameDiv = inputObj.parent().find("div.file-preview-thumbnails");
       var frameHeight = previewFrameDiv.height() - 35;
       var frameWidth = previewFrameDiv.width() - 20;
       var height = Math.max(50, frameHeight);
       var width = Math.max(50, frameWidth)/2;
       if(!previewFrameDiv) {
          return;
       }
       var timeId = new Date().getTime(); 
       for(var i = 0; i < imageArray.length; i++) {
          previewFrameDiv.append(upload.createFilePreviewFrame(inputName, timeId + i, height, width));
          var _preImg = $('<img></img>').attr('src', imageArray[i]).width(width).height(height);
          $("#imagePreview-" + (timeId + i)).append(_preImg);
       }
    }
} 

FileUpload.prototype.createFilePreviewFrame = function(fieldName, id, height, width) {
    var html = "<div class='file-preview-frame' id='preview-" + id + "'>";
	     html+= "<div id='imagePreview-"+ id +"' style='filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod = scale); width:"+width+"px; height: "+height+"px;'>";
		 html+= "</div>";
		 html+= "<div class='file-thumbnail-footer'>";
		 html+=    "<div class='file-actions'>";
		 html+=      "<div class='file-footer-buttons'>";
		 html+=        "<button type='button' class='kv-file-remove btn btn-xs btn-default' title='删除文件' onclick=\"upload.deleteFilePreviewFrame("+id+", '"+fieldName+"')\">";
		 html+=          "<i class='icon iconfont icon-del red icon-size-14'></i>";
		 html+=        "</button>";
		 html+=      "</div>";
		 html+=    "</div>";
		 html+=  "</div>";
		 html+= "</div>";
    return html;
}

FileUpload.prototype.createFileinputButton = function(fieldName) {
	var html = "<span class='btn btn-success btn-squared fileinput-button'>";
	     html+=    "<span>选择图片</span>";
		 html+=    "<input type='file' name='file_"+fieldName+"' onchange='upload.selectedUploadImage(this, event)'>";
		 html+= "</span>";
    return html;
}

FileUpload.prototype.deleteFilePreviewFrame = function(id, fieldName) {
     var preview = $("#preview-" + id);
     var filePath = preview.attr("filePath");

      var previewFrameDiv = preview.parent(".file-preview-thumbnails");

      //delete preview image
      preview.remove();
      //delete file upload button
      $("#file-" + id).parent("span").remove();

      upload.deleteImage(previewFrameDiv, fieldName);
}

FileUpload.prototype.selectedUploadImage = function(obj, e) {
	var timeId = new Date().getTime();
	 var file = obj.files[0];
     if(!/image\/\w+/.test(file.type)){
         alert("请上传图片!");
         return false;
     }
     var reader = new FileReader();
     reader.onload = function(){
         var data = this.result;
         
         var fileObj = $(obj);
         fileObj.attr("id", "file-" + timeId);

         var fileName = fileObj.attr("name");
         var fieldName = fileName.substring("file_".length, fileName.length);

         var btnDiv = fileObj.closest(".fileinput-upload-button");
         btnDiv.append(upload.createFileinputButton(fieldName));

         var previewFrameDiv = fileObj.closest(".fileinput-upload-button").prev().find(".file-preview-thumbnails");
         var frameHeight = previewFrameDiv.height() - 35;
         var frameWidth = previewFrameDiv.width() - 20;

         var height = Math.max(50, frameHeight);
         var width = Math.max(50, frameWidth)/2;
         previewFrameDiv.append(upload.createFilePreviewFrame(fieldName, timeId, height, width));
         
         var _preImg = $('<img></img>').attr('src', data).width(width).height(height);

         //hide current file button
         fileObj.parent("span").hide();
         $("#imagePreview-" + timeId).prepend(_preImg);
     }
     reader.readAsDataURL(file);
}

FileUpload.prototype.deleteImage = function(previewFrameDiv, fileName) {
       var hiddenInput = $("input[type=hidden][name="+fileName+"]");
       var filePaths = "";
       previewFrameDiv.find(".file-preview-frame").each(function(){
             if($(this).attr("filePath")) {
                 filePaths += $(this).attr("filePath");
                 filePaths += ",";
             }
       });

       if(filePaths.length > 1) {
            filePaths = filePaths.substring(0, filePaths.length - 1);
       }
       hiddenInput.val(filePaths);
}

var upload = new FileUpload();