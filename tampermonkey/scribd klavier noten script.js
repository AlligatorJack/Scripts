// ==UserScript==
// @name       scribd.com get all piano sheets
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      *scribd.com/doc/*
// @copyright  2012+, You
// ==/UserScript==

(function(){
  $("body").prepend($("<input type='button' id='mybutton' style='z-index: 9999; position: absolute; left: 100px; top:30px;' value='Do the Flori magic!'/>"))
  var button = document.getElementById("mybutton");
  button.addEventListener('click',showsheets,true);


  function showsheets(){
    $('.image_layer img').each( function() { 
      $(this).css('opacity', '1')
    });

    $('.text_layer').each( function() { 
        $(this).css('color', 'black');
        $(this).css('text-shadow', '');
    });

    $('#doc_sidebar').remove()

    $('.page-blur-promo').remove()
    $('.page-blur-promo-overlay').remove()
    $('.page_missing_explanation').remove()


    $('#global_header').remove()

    $('#doc_info').remove()

    $('.header_spacer').remove()
    $('.read_mode_btn').click()

    $('.toolbar_spacer').remove()

    $('.footer_documents').remove()
    $('.global_footer').remove()
    $('.document_activity').remove()
    $('#mybutton').remove()
  }
})();