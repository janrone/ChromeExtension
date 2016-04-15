// Copyright 2013 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

//http://www.miucheng.com/domains.php?plg_nld=1&plg_uin=1&plg_auth=1&plg_nld=1&plg_usr=1&plg_vkey=1&plg_dev=1

var tag = "checkDomias"
var port = null;
var hbstate = 0;
var lang=window.navigator.language;
var i18nReport="http://info.url.cloud.360safe.com/"
var i18nPage = "/plug.php?";
var domain = "domins";
var tipurl = "http://t.cn/" + "RqhJxSC";
var urlTabId =0;
var urlKey ="";

function getBrowserInfo() {
  var browser = {
    chrome: false, appname: 'unknown', version: 0
  },
  userAgent = window.navigator.userAgent.toLowerCase();
  if (/(chrome)\D+(\d[\d.]*)/.test(userAgent)) {
    browser[RegExp.$1] = true;
    browser.appname = RegExp.$1;
    browser.version = RegExp.$2;
  }
  return browser;
}

function getBrowserInfoEx() {
  var browser = {
    version: navigator.appVersion, agent: navigator.userAgent,
    appname: navigator.appName, fullversion: ''+parseFloat(navigator.appVersion),
    majorversion: parseInt(navigator.appVersion,10)
  }
  var nameOffset,verOffset,ix;

    // In Opera 15+, the true version is after "OPR/" 
    if ((verOffset=browser.agent.indexOf("OPR/"))!=-1) {
     browser.appname = "opera";
     browser.fullversion = browser.agent.substring(verOffset+4);
   }
    // In older Opera, the true version is after "Opera" or after "Version"
    else if ((verOffset=browser.agent.indexOf("Opera"))!=-1) {
     browser.appname = "opera";
     browser.fullversion = browser.agent.substring(verOffset+6);
     if ((verOffset=browser.agent.indexOf("Version"))!=-1) 
       browser.fullversion = browser.agent.substring(verOffset+8);
   }
   else if ((verOffset=browser.agent.indexOf("YaBrowser/"))!=-1) {
     browser.appname = "yandex";
     browser.fullversion = browser.agent.substring(verOffset+10);
   }
    // In MSIE, the true version is after "MSIE" in userAgent
    else if ((verOffset=browser.agent.indexOf("MSIE"))!=-1) {
     browser.appname = "ie";
     browser.fullversion = browser.agent.substring(verOffset+5);
   }
    // In Chrome, the true version is after "Chrome" 
    else if ((verOffset=browser.agent.indexOf("Chrome"))!=-1) {
      browser.appname = "chrome";
      if(browser.agent.indexOf("x64")!=-1)
      {
        browser.appname += "64";
      }
      browser.fullversion = browser.agent.substring(verOffset+7);
    }
    // In Safari, the true version is after "Safari" or after "Version" 
    else if ((verOffset=browser.agent.indexOf("Safari"))!=-1) {
     browser.appname = "safari";
     browser.fullversion = browser.agent.substring(verOffset+7);
     if ((verOffset=browser.agent.indexOf("Version"))!=-1) 
       browser.fullversion = browser.agent.substring(verOffset+8);
   }
    // In Firefox, the true version is after "Firefox" 
    else if ((verOffset=browser.agent.indexOf("Firefox"))!=-1) {
     browser.appname = "firefox";
     browser.fullversion = browser.agent.substring(verOffset+8);
   }
    // In most other browsers, "name/version" is at the end of userAgent 
    else if ( (nameOffset=browser.agent.lastIndexOf(' ')+1) < 
      (verOffset=browser.agent.lastIndexOf('/')) ) 
    {
     browser.appname = browser.agent.substring(nameOffset,verOffset);
     browser.fullversion = browser.agent.substring(verOffset+1);
     if (browser.appname.toLowerCase()==browser.appname.toUpperCase()) {
      browser.appname = navigator.appName;
    }
  }
    // trim the browser.fullversion string at semicolon/space if present
    if ((ix=browser.fullversion.indexOf(";"))!=-1)
    browser.fullversion=browser.fullversion.substring(0,ix);
    if ((ix=browser.fullversion.indexOf(" "))!=-1)
     browser.fullversion=browser.fullversion.substring(0,ix);

   majorVersion = parseInt(''+browser.fullversion,10);
   if (isNaN(majorVersion)) {
     browser.fullversion  = ''+parseFloat(navigator.appVersion); 
     browser.majorversion = parseInt(navigator.appVersion,10);
   }

   return browser;
 }

function procNativeMessage(message) {//msg from native host
  console.log("urlKey" + urlKey );
  if(urlKey != "urlKey"){
    for (var i = 0; i < message.length; i++) {
      var jsonObject = message[i];
      console.log("event" + jsonObject.event );
      console.log("url" + jsonObject.url);
      if(jsonObject.url ==""){
        console.log("good" + urlKey)
        sendResult("good");
      } else{
        console.log("bad" + urlKey);
        sendResult("bad");
      }

      if (typeof (jsonObject.event) != "undefined") {
        if (jsonObject.event == 4) {
          hbstate = 1;
          testNativeHost(5);
            } else if (jsonObject.event == 6) {//install ok
              var browserinfo = getBrowserInfoEx()
              var tipur1 = i18nReport+getBrowserInfoEx().appname.toLowerCase()+i18nPage+"la="+lang+"&rq=2";
              chrome.tabs.create({url: tipurl, selected: false});
            }else {
              var vaid = jsonObject.tabid;
              var vaurl = jsonObject.url;
                //chrome.tabs.update(vaid, { url: vaurl });
                //console.log("hh" + vaid + vaurl);
                if(urlKey != "urlKey"){}
            } 
            urlKey = "urlKey";
          }
        }
    }
}


    function onDisconnected() {
      port = null; 
    if (hbstate == 0) {//native host not exist
      var os = navigator.platform;
      var visturl;

      visturl = i18nReport+getBrowserInfoEx().appname.toLowerCase()+i18nPage+"la="+lang;
        /*if (os.indexOf("Win") > -1) {//not exist native host
			visturl += "&rq=1";
        } else {//not win os ÌáÊ¾Ò»´Î
			visturl += "&rq=3";
    }*/
    if(os.indexOf("Win") < 0){
     visturl += "&rq=3";
     chrome.tabs.create({ url: visturl, selected: true });
   }
 }
}

function createNativeHost() {
  var hostName = "com.google.chrome.wdwedpro";
  port = chrome.runtime.connectNative(hostName);
  port.onMessage.addListener(procNativeMessage);
  port.onDisconnect.addListener(onDisconnected);
}
function callNativeHost(id,url,et) {
  var msg=[{"tabid":id,"url":url,"event":et}];
  console.log("callNativeHost" + url);
  console.log("callNativeHost" + port);
  if ( port != null ) {
    port.postMessage(msg);
  }

  if(urlKey != "" && urlKey !="urlKey" && port == null){
    createNativeHost();
    port.postMessage(msg);
  }
}


function notifyUpdateTab(addid,removeid,url)
{
	var msg=[{"tabid":addid,"removeid":removeid,"url":url,"event":7}];
  if ( port != null ) {
    port.postMessage(msg);
  }
}
function testNativeHost(et) {
  if (port != null) {
    port.postMessage([{"event":et}]);
  }
}

function procUrl(tabId, url,et) {
  console.log("procUrl" + url);
  callNativeHost(tabId, url,et);
}

function setContextInfo() {
  var browserInfo = getBrowserInfoEx();
    //console.log(browserInfo.appname + browserInfo.version);
    if (port != null) {
      port.postMessage([{ "bname": browserInfo.appname, "bver": browserInfo.fullversion}]);
    }
  }

  function checkDomias(){
    var domains = document.getElementById('domins');
  }

  document.addEventListener('DOMContentLoaded', function() {

  });


  function sendResult(resultStr){
    chrome.tabs.sendMessage(
      urlTabId, {result: resultStr}, function(response) {
        console.log("send result to content");
      });         
  }

  chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("Request from content script " + sender.tab.url);
    console.log("Request from content script " + sender.tab.id);
    console.log(request.ckurl);
    urlKey = request.ckurl;
    callNativeHost(sender.tab.id,request.ckurl,2);
    urlTabId = sender.tab.id;
    sendResponse("get from content msg ok"); 
});

(function() {
  createNativeHost();
  setContextInfo();
  chrome.tabs.onCreated.addListener(
   function (tab) {
    if(!tab.url) return; 
    procUrl(tab.id,tab.url,1);
    console.log("page create url" + tab.url);
    console.log("page create url" + tab.id);  
  });

  chrome.tabs.onUpdated.addListener(
   function (tabId, changeInfo, tab) {
     if(changeInfo.status == "loading"){
      if(!tab.url) return; 
      procUrl(tab.id,tab.url,2);
      checkDomias();
      console.log("page create url" + tab.id);  
      console.log("page update url" + tab.url + "tabId" + tabId); 
    }
  });
  chrome.tabs.onReplaced.addListener(
   function (addTabId,removeTabId){
    chrome.tabs.get(addTabId,
     function(tab){
      notifyUpdateTab(addTabId,removeTabId,tab.url);
    }
    );
  }
  );

  chrome.tabs.onRemoved.addListener(
   function (tabId, removeInfo) {
    procUrl(tabId,0,3);
  });
  chrome.runtime.onInstalled.addListener(function(details) {
    if (details.reason == "install") {
      testNativeHost(6);
    } else if (details.reason == "update") {
    }
  });



  chrome.windows.getCurrent(function(currentWindow) {
    currentWindowId = currentWindow.id;
    console.log("getCurrent window");
    checkDomias();
  });

})();
