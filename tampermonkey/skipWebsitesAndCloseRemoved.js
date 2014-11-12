// ==UserScript==
// @name       Skip Websites & Close removed
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      daclips.in/vid/*
// @match      filenuke.com/*
// @match      movpod.in/vid/*
// @match      vidbull.com/*
// @match      gorillavid.in/vid/*
// @match      watchseries.lt/open/cale/*
// @match      boerse.bz/out/*
// @match      played.to/*
// @copyright  2012+, You
// ==/UserScript==

(function(){
    var host  = window.location.host;
    var bodyString = document.getElementsByTagName("body")[0].innerHTML
    var removedList = [
      "Removed for copyright infringement"  
    ];
    
    if(host == "movpod.in" || host == "daclips.in"){   
       setTimeout(
          function() 
          {
            $('#btn_download').click();
          }, 5000);
    }
    else if(host == "vidbull.com"){
       setTimeout(
          function() 
          {
            $('#btn_download').click();
          }, 3000);
    }
    else if(host == "filenuke.com"){
        $('[name="method_free"]').click()
        var elemString = document.getElementsByClassName("cont_block")[0].innerHTML;
        var deathMessages = [
          "File Not Found",
          "The file you were looking for could not be found, sorry for any inconvenience"
        ];
        checkIfDeadAndClose(elemString, deathMessages);
    }
    else if(host == "gorillavid.in" || host == "watchseries.lt"){
        if(document.getElementById('btn_download')){
           document.getElementById('btn_download').disabled = false;
           document.getElementById('btn_download').click();
        }
        if(document.getElementById('popup2-middle') && document.getElementById('popup2-middle').getElementsByTagName("a") && document.getElementById('popup2-middle').getElementsByTagName("a")[0].attributes.href.value)
            self.location.href = document.getElementById('popup2-middle').getElementsByTagName("a")[0].attributes.href.value
    }
    else if(host == "boerse.bz"){ // Skip Boerse.bz "Klicke auf den externen Link"
        var header = document.getElementById('wrapper').firstElementChild;
        if (header == document.getElementsByTagName('header')[0])
          self.location.href = header.getElementsByTagName('a')[0].attributes.href.value;
    }
    else if(host == "played.to"){
        var elementToCheck = document.getElementsByClassName("err")[0];
        var deathMessage = "Removed for copyright infringement";
        if(elementToCheck != null)
          checkIfDeadAndClose(elementToCheck.innerHTML, deathMessage);
    }
    
        

    function checkIfDeadAndClose(elString, deathMessages){
      var msgs = [];
      if(deathMessages instanceof Array)
        msgs = deathMessages;
      else
        msgs.push[deathMessages];

      if(containsAny(elString, msgs)){
          colorAllRed();
          setTimeout(
              function(){
                window.close();
              }, 2000
          );
      }
    }
    
    
    function contains(arrayOrString, el){
      return arrayOrString.indexOf(el) != -1;
    }

    function containsAny(arrayOrString, arrayWithAny){
      for(i = 0; i < arrayWithAny.length; i++){
        if(contains(arrayOrString, arrayWithAny[i]))
          return true;
      }
      return false;
    }

    function colorAllRed(){
        var array = document.getElementsByTagName("*");
        for(i=0; i < array.length; i++){
          if(array[i] != null)
            array[i].style.backgroundColor = "red";
        }
    }
})();