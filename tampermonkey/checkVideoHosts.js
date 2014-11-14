// ==UserScript==
// @name       Check Video-Hosts
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  Only For Me =)
// @match      http://www.iwatchtwoandahalfmen.com/*
// @copyright  2012+, You
// ==/UserScript==

(function(){    // anonymous function

  var goodHosts = [
    "filenuke", 
    "played.to", 
    "vidbull",
    "sharerepo",
    "gorillavid...",
    "putlocker",
    "clicktovie...",
    "movpod.in",
    "daclips.in",
    "movzap",
    "veevr"
  ];

  var okHosts = [
    "nowvideo.eu",
    "flashx.tv", 
    "hostingbulk", 
    "movreel", 
    "nosvideo", 
    "sharesix", 
    "vidbux", 
    "vidup.me", 
    "vidxden", 
    "vudu",
    "vreer", 
    "xfinitytvc...",
    "divstage.eu",
    "movshare"
  ];

  var badHosts = [
    "amazon", 
    "cbs", 
    "itunes.apple",
    "videoweed.es",
    "divxstage.eu",
    "blinkbox",
    "novamov", 
    "filebox",
    "zalaa",
    "dishonline",
    "HD Streams"
  ];


  function sliceFirst(array, number){
    var result = [];
    for(i=0; i < number; i++){
      if(array.length > 0)
        result.push(array.shift());
    }
    return result;
  }

  function merge(array1, array2){
    var result = [];
    for(i = 0; i < array1.length; i++){
      result.push(array1[i]);
    }
    for(i = 0; i < array2.length; i++){
      result.push(array2[i]);
    }
    return result;
  }


  function getAllHosts(){
    function getAllStartingWithId(id){
       return document.querySelectorAll('*[id^="' + id + '"]');
    }

    return getAllStartingWithId("part");
  }

  function filter(array, funct){
    var filteredArray = [];
    for (i = 0; i < array.length; i++){
      if(funct(array[i]))
        filteredArray.push(array[i]);
    }
    return filteredArray;
  }

  function map(array, funct){
    var mappedArray = [];
    for (i = 0; i < array.length; i++){
      mappedArray.push(funct(array[i]));
    }
    return mappedArray;
  }

  function filterByHostName(array, text){
    return filter(array, function(el){
      return el.text == text;
    });
  }

  function textColorMap(array, color){
    map(array, function(el){
      el.style.color = color;
    });
  }

  function giveColorToAllWithName(name, color){
    var allHosts = getAllStartingWithId("part");
    var filtered = filterByHostName(allHosts, name);
    textColorMap(filtered, color);
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

  function intersect(array1, array2){
    return filter(array1, function(n){
      return contains(array2, n); 
    });
  }

  function distinct(array){
    var result = [];
    for(i=0; i<array.length; i++){
      if(!contains(result, array[i]))
        result.push(array[i]);
    }
    return result;
  }

  function filterNameInList(array, list){
    return filter(array, function(el){
        return contains(list, el.text);
    });
  }

  function colorHosts(){
    var hosts = getAllHosts();
    textColorMap(filterNameInList(hosts, goodHosts), "rgb(58, 177, 70)");
    textColorMap(filterNameInList(hosts, okHosts), "#fc0"); // orange
    textColorMap(filterNameInList(hosts, badHosts), "red");
  }

  function markAsDead(array){
    for(i=0; i < array.length; i++)
      array[i].style.opacity = 0.5;
  }

  function markAsChecked(el){
    el.style.textDecoration = "line-through";
    el.style.color = "rgb(42, 132, 229)"; 
  }

  function markAllAsChecked(array){
    for(i=0; i < array.length; i++)
      markAsChecked(array[i]);
  }

  function getURLFromHost(el){
    var from = el.getAttribute("onclick").indexOf("'") + 1;  
    var to = el.getAttribute("onclick").substring(from).indexOf("'");
    var url = el.getAttribute("onclick").substring(from, from+to);
    return url;
  }

  function getAllURLsFromHosts(hosts){
    var result = [];
    for(i=0; i < hosts.length; i++){
      result.push(getURLFromHost(hosts[i]));
    }
    return result;
  }

  function openInPopups(hosts){
    for(i=0; i < hosts.length; i++){
      window.open(decodeURIComponent(getURLFromHost(hosts[i]).replace(/\+/g, '%20')),'open'+i,'width=600,height=600,top=0,left=' + i + '50');
    }
    markAllAsChecked(hosts);
    // window.open(decodeURIComponent(url.replace(/\+/g, '%20')),'open','width=200,height=60,menubar=no,status=no,location=no,toolbar=no,scrollbars=yes,resizable=yes');
  }

  function insertOpenBar(){
    var bar = document.createElement('div');
    bar.innerHTML = '<input id="mySearchBar" type="text"></input><button id="myButton1">1</button><button id="myButton3">3</button><button id="myButton5">5</button>'; 
    document.querySelector('*[class^="src_main"]').parentNode.insertBefore(bar, document.querySelector('*[class^="src_main"]'));
    
    document.getElementById("myButton1").addEventListener('click', function(){
      showPopUpsForHostName(document.getElementById("mySearchBar").value, 1);
    }, true);

    document.getElementById("myButton3").addEventListener('click', function(){
      showPopUpsForHostName(document.getElementById("mySearchBar").value, 3);
    }, true);

    document.getElementById("myButton5").addEventListener('click', function(){
      showPopUpsForHostName(document.getElementById("mySearchBar").value, 5);
    }, true);

    document.getElementById("mySearchBar").addEventListener('keydown', function(e){
      if(e.keyCode == 13)
        showPopUpsForHostName(document.getElementById("mySearchBar").value);
    }, true);
  }

  function showPopUpsForHostName(hostName, nr){
    var filtered = filterByHostName(sortedHostList, hostName);
    var toPopUp = [];
    for (i = 0; i < nr; i++) {
      if(filtered.length > 0) {
        toPopUp.push(sortedHostList.splice(sortedHostList.indexOf(filtered.shift()), 1));
      }
      else
        toPopUp.push(sortedHostList.shift());
    }

    if(toPopUp.length > 0)
      openInPopups(toPopUp);
  }

  function sortByQuality(array){
    var allGood = [];
    var allOk = [];
    var allBad = [];
    var allOther = [];
    for (i = 0; i < array.length; i++) {
      if(contains(goodHosts, array[i].text))
        allGood.push(array[i]);
      else if(contains(okHosts, array[i].text))
        allOk.push(array[i]);
      else if(contains(badHosts, array[i].text))
        allBad.push(array[i]);
      else
        allOther.push(array[i]);
    }
    var allSorted = merge(merge(merge(allGood, allOk), allOther), allBad);
    return allSorted;
  }

  var sortedHostList = sortByQuality(getAllHosts());
  colorHosts();
  insertOpenBar();
})();
