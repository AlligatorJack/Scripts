// ==UserScript==
// @name       Skip Websites & Close removed
// @namespace  http://use.i.E.your.homepage/
// @version    0.3
// @description  enter something useful
// @match      daclips.in/vid/*
// @match      filenuke.com/*
// @match      movpod.in/vid/*
// @match      vidbull.com/*
// @match      gorillavid.in/vid/*
// @match      watchseries.lt/open/cale/*
// @match      boerse.bz/out/*
// @match      played.to/*
// @match      nosvideo.com/*
// @match      movreel.com/*
// @match      www.firedrive.com/*
// @run-at document-end
// @copyright  2012+, You
// ==/UserScript==

(function(){
    var host  = window.location.host;
    var bodyString = document.getElementsByTagName("body")[0].innerHTML;
    var removedList = [
      "Removed for copyright infringement"  
    ];
    
    if(host == "nosvideo.com"){
      var f = function(){
        if(isAlreadySkipped()){
          document.getElementById('btn').disabled = false;
          document.getElementById('btn').click();
        }
      };

      var isAlreadySkipped = function(){
        return $('#btn') === undefined || $('#btn').length === 0;
      };

      tryUntil(f, isAlreadySkipped, 7000, 1000, 6);
    } 
    else if(host == "vidbull.com" || 
            host == "movreel.com" || 
            host == "movpod.in" || 
            host == "daclips.in"){

      var beginTimeOut = 0;

      if(host == "movpod.in" || host == "daclips.in")
        beginTimeOut = 5000;
      else if(host == "vidbull.com" || host == "movreel.com") 
        beginTimeOut = 3000;

      var f = function(){
        $('#btn_download').click();
        checkIfDeadAndClose($('#content').innerHTML, "Datei nicht gefunden");
        checkIfDeadAndClose($('#container').innerHTML, "Datei nicht gefunden");
      };

      var isAlreadySkipped = function(){
        return $('#btn_download') === undefined || $('#btn_download').length === 0;
      };

      tryUntil(f, isAlreadySkipped, beginTimeOut, 1000, 6);
    }
    else if(host == "filenuke.com"){
      var beginTimeOut = 0;

      var f = function(){
        $('[name="method_free"]').click()
        var elemString = $(".cont_block")[0].innerHTML;
        var deathMessages = [
          "File Not Found",
          "The file you were looking for could not be found, sorry for any inconvenience"
        ];
        checkIfDeadAndClose(elemString, deathMessages);
      };

      var isAlreadySkipped = function(){
        return $('[name="method_free"]') === undefined || $('[name="method_free"]').length === 0;
      };

      tryUntil(f, isAlreadySkipped, 0, 1000, 6);
    }
    else if(host == "gorillavid.in" || host == "watchseries.lt"){
      var f = function(){
        if($('#btn_download') !== undefined || $('#btn_download').length !== 0){
          $('#btn_download')[0].removeAttribute("disabled");
          $('#btn_download').click();
        }
        if($('#popup2-middle') && $('#popup2-middle a') && $('#popup2-middle a')[0].attributes.href.value)
          self.location.href = $('#popup2-middle a')[0].attributes.href.value
      };
      
      var isAlreadySkipped = function(){
        return $('#btn_download') === undefined || $('#btn_download').length === 0;
      };

      tryUntil(f, isAlreadySkipped, 100, 1000, 6);
    }
    else if(host == "www.firedrive.com"){
      var f = function(){
        $("#prepare_continue_btn").click();
        loadplayer();
        checkIfDeadAndClose($('#player p').text(), "Error loading player: No playable sources found");
      };
      var isAlreadySkipped = function(){
        return $("#prepare_continue_btn") === undefined || $("#prepare_continue_btn").length === 0;
      };
      tryUntil(f, isAlreadySkipped, 100, 1000, 6);
    }
    else if(host == "boerse.bz"){ // Skip Boerse.bz "Klicke auf den externen Link"
      var header = $('#wrapper').firstElementChild;
      if (header == $('header')[0])
        self.location.href = header.getElementsByTagName('a')[0].attributes.href.value;
    }
    else if(host == "played.to"){
      var f = function(){
        var elemString = $(".err")[0].innerHTML;
        var deathMessage = "Removed for copyright infringement";
        checkIfDeadAndClose(elemString, deathMessage);
      };
      var isAlreadySkipped = function(){
        return $("err")[0] === undefined || $("err")[0].length === 0;
      };
      tryUntil(f, isAlreadySkipped, 100, 1000, 6);
    }
    

    function tryUntil(f, isAlreadySkipped, beginTimeOut, thenTimeOut, retryTimes){
      setTimeout(
        function(){
          var counter = 0;
          function tryAgain(){
            setTimeout(
              function(){
                f();
                counter++;
                if(!isAlreadySkipped() && counter < retryTimes)
                  tryAgain();
              }, thenTimeOut
            );
          }

          f();
          if(retryTimes !== 0 && !isAlreadySkipped())
            tryAgain();
        }, beginTimeOut
      );
    }

    function checkIfDeadAndClose(elString, deathMessages){
      var msgs = [];
      if(deathMessages instanceof Array)
        msgs = deathMessages;
      else
        msgs.push(deathMessages);

      if(elString !== undefined && elString !== "" && containsAny(elString, msgs)){
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
          if(array[i] !== null)
            array[i].style.backgroundColor = "red";
        }
    }
})();