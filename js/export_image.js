/**
 * Created by txl-pc on 2017/8/11.
 */
function export_image(element, fileName, type) {
  var eleWidth = element.offsetWidth;
  var eleHeight = element.offsetHeight;
  html2canvas(element, {
    background: '#f2f5f7',
    width: eleWidth,
    height: eleHeight,
    onrendered: function(canvas) {
      canvas.width = 2 * eleWidth;
      canvas.height = 2 * eleHeight;
      $('body').append(canvas)
      return false
      var pageData = canvas.toDataURL(type, 1.0);
      var fixtype=function(type){
        type=type.toLocaleLowerCase().replace(/jpg/i,'jpeg');
        var r=type.match(/png|jpeg|bmp|gif/)[0];
        return 'image/'+r;
      };
      pageData=pageData.replace(fixtype(type),'image/octet-stream');
      if ($('body').find('#download_a').length) {

      }
      else {
        // const downLoad = $('<img/>');
        var downLoad = $('<a class="download_href"></a>');
        // downLoad.attr('href', pageData)
        downLoad.attr('href', pageData)
        downLoad.attr('download', fileName + '.' + type)
        $('body').append(downLoad)
        downLoad.get(0).click()
        $('.download_href').remove();
        console.log(downLoad)
      }
    }
  });
}