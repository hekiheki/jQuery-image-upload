;(function($, window, document,undefined){
    var File = function( ele , opt ){
    	this.$element = ele;
    	this.defaults = {
            multiple: false,
            accept: 'image/*',
            maxLength: 9,
            maxSize: '200kb',
            showImage: false,
            _server: '',
            path: 'uploadimg',
            onSuccess: null,
            onError: null,
            fileName: 'files',
            progress: false
    	}
        for(var key in opt){
            if(!this.defaults.hasOwnProperty(key)){
              jQuery.error("no "+key+" in fileUpload")
            }
          }
    	this.options = $.extend({}, this.defaults, opt)
    }
    File.prototype = {
        fileList: [],
        fileLength: 0,
    	init: function(){
            var element = this.$element;
            var fileList = [];

            this.createDOM(element);

            this.selectFile();

            this.deleteImage();
            
        },
        createDOM: function(element){
            var showImageBox = '<div class="show-image-box"></div>',
                fileInput = this.options.multiple ? '<input type="file" id="imagesUpload" multiple accept='+this.options.accept+' >': '<input type="file" id="imagesUpload" accept='+this.options.accept+' >',
                fileBtn = '<div class="file-btn">'+fileInput+'<input type="hidden" id="setImageValue" name="'+this.options.fileName+'"><span>+</span></div>',
                html = this.options.showImage ? showImageBox + fileBtn: fileBtn;
            element.html(html);
        },
        selectFile: function(){
            var maxSize = this.options.maxSize,
                maxLength = this.options.maxLength,
                element = $('#imagesUpload'),
                isShowImage = this.options.showImage,
                _this = this,
                tempLength = 0;

            element.change(function(){
                var files = element[0].files;
                tempLength = _this.fileLength;
                tempLength += files.length;

                if(tempLength>maxLength){
                    alert('图片不能超过'+maxLength+'张');
                    return;
                }else{
                    _this.fileLength += files.length;
                    
                    for(var i=0;i<files.length;i++){
                        var file = files[i];
                        if(_this.isOverSize(file.size,maxSize)){
                            alert('图片大小不能超过'+maxSize);
                            return;
                        }
                        if(isShowImage){
                            _this.showImage(file);
                        }
                        //上传图片返回url
                        _this.uploadImage(file,_this.options.onSuccess,_this.options.onError);
                    }
                }
                
            })
           
        },
        isOverSize: function(filesize,maxSize){
            var unit = maxSize.substring(maxSize.length-2),
                sizeNum = parseInt(maxSize);
            
            if(unit === 'kb'){
                sizeNum = sizeNum * 1024;
            }else if(unit === 'mb'){
                sizeNum = sizeNum * 1024 * 1024;
            }else if(unit === 'gb'){
                sizeNum = sizeNum * 1024 * 1024 * 1024;
            }else{
                alert('size的单位错了');
                return;
            }
            return filesize>sizeNum ;
        },
        showImage: function(image){
            var imageSrc = this.getLocalUrl(image),
                closeIcon = '<i class="upload-icon iconfont icon-delete"></i>',
                imgDiv = '<div class="show-image-item"><img src="'+ imageSrc +'" />'+ closeIcon +'</div>',
                showDiv = $('.show-image-box');
            showDiv.append(imgDiv);
        },
        getLocalUrl: function(file){
            var url = null;
            if (window.createObjectURL != undefined) { 
                url = window.createObjectURL(file);
            } else if (window.URL != undefined) { 
                url = window.URL.createObjectURL(file);
            } else if (window.webkitURL != undefined) { 
                url = window.webkitURL.createObjectURL(file);
            }
            return url;
        },
        deleteImage: function(){
            var _this = this,
                element = $('.show-image-box');
            element.on('click','.upload-icon',function(){
                var index = $(this).parent('.show-image-item').index();
                $(this).parent('.show-image-item').remove();
                _this.fileList.splice(index,1);
                _this.setValue(_this.fileList);
                _this.fileLength--;
            })
        },
        uploadImage: function(file,onsuccess,onerror){
            var formdata = new FormData(),
                url = this.options._server ? this.options._server+'/'+this.options.path : this.options.path,
                _this = this;
            formdata.append('files',file);
            $.ajax({
                type: 'POST',
                url: url,
                data: formdata,
                xhr: function(){
                    myXhr = $.ajaxSettings.xhr();  
                    if(myXhr.upload){ //检查upload属性是否存在  
                        //绑定progress事件的回调函数 
                        if(_this.options.progress){
                            myXhr.upload.addEventListener('progress',_this.showProgress, false);
                        }  
                    }  
                    return myXhr; //xhr对象返回给jQuery使用  
                },
                processData: false,
                contentType: false,
                success: function(res,state){
                    if(onsuccess && typeof onsuccess === 'function'){
                        onsuccess(res,state);
                    }else{
                        $.each(res,function(i,data){
                           _this.fileList.push(data.filename) 
                            _this.setValue(_this.fileList);
                        })
                    }
                },
                error: function(error){
                    if(onerror && typeof onerror === 'function'){
                        onerror(error);
                    }else{
                        jQuery.error(error)
                    }
                    
                }
            })
        },
        setValue: function(array){
            $('#setImageValue').val(array);
        },
        showProgress: function(e,progress){
            if (e.lengthComputable) {
                $('progress').attr({value : e.loaded, max : e.total}); //更新数据到进度条  
                var percent = e.loaded/e.total*100;  
                $('.progress').html(percent.toFixed(2) + "%");  
            }
        }
    }
    $.fn.fileUpload = function(options) {
      var file = new File(this, options);
      // 
      //调用其方法
      return file.init();
  	}
})(jQuery, window, document);