# jQuery-image-upload

![](demo.png)

## API

<table>
        <tr>
            <th>参数</th>
            <th>说明</th>
            <th>类型</th>
            <th>默认值</th>
        </tr>
        <tr>
            <td>multiple</td>
            <td>设置multiple属性</td>
            <td>boolean</td>
            <td>false</td>
        </tr>
        <tr>
            <td>accept</td>
            <td>接收图片类型</td>
            <td>string</td>
            <td>image/*</td>
        </tr>
        <tr>
            <td>maxLength</td>
            <td>上传图片最多张数</td>
            <td>Number</td>
            <td>9</td>
        </tr>
        <tr>
            <td>maxSize</td>
            <td>图片尺寸最大值，单位为'kb','mb','gb'</td>
            <td>string</td>
            <td>200kb</td>
        </tr>
        <tr>
            <td>showImage</td>
            <td>是否显示图片</td>
            <td>boolean</td>
            <td>false</td>
        </tr>
        <tr>
            <td>_server</td>
            <td>服务器地址</td>
            <td>string</td>
            <td>无</td>
        </tr>
        <tr>
            <td>path</td>
            <td>post的路径</td>
            <td>string</td>
            <td>'uploadimg'</td>
        </tr>
        <tr>
            <td>fileName</td>
            <td>保存文件数据的input的name名称</td>
            <td>string</td>
            <td>files</td>
        </tr>
        <tr>
            <td>onSuccess</td>
            <td>文件上传成功的回调</td>
            <td>function(res,state)</td>
            <td>无</td>
        </tr>       
        <tr>
            <td>onError</td>
            <td>文件上传失败的回调</td>
            <td>function(error)</td>
            <td>无</td>
        </tr>       
</table>

## 如何使用


``` html
// css文件
<link rel="stylesheet" href="fileUpload.css">
// html 结构示例如下：
<form action="">
	<div id="upload"></div>
	<input type="submit">
</form>
```


``` javascript
// 引入jquery文件
<script src="jquery.min.js"></script>
// 引入uploadFile.js
<script src="uploadFile.js"></script>
<script>
	$('#upload').fileUpload({
        multiple: true,
        maxLength: 3,
        showImage: true
    });
</script>
```


******

接收图片的后台用node.js造了个，参考了<https://segmentfault.com/a/1190000009316054>