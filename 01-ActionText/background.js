// Copyright (c) 2010 The Chromium Authors. All rights reserved.  Use of this
// source code is governed by a BSD-style license that can be found in the
// LICENSE file.


getPrice(); //直接运行

function handleError() {
   
}

function getPrice(){
var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function() {
      if (xhr.readyState == 4){
      	if(xhr.status==200){  
            //表示服务器端的响应代码是200，正确的返回了数据  
            //纯文本数据的接受方法  
 			//var message=xmlhttp.responseText; 
            console.log(xhr.responseText);
            var text = xhr.responseText;
            console.log(text.substring((text.lastIndexOf("[") + 1 ),(text.indexOf("]"))));
            var arr =(text.substring((text.lastIndexOf("[") + 1 ),(text.indexOf("]")))).split(",");
            console.log(arr[2]);
            chrome.browserAction.setBadgeText({text:arr[2]}); //插件icon添加文字
      }
  	}
       
    };

xhr.open("GET", "http://webboce.hermes.hexun.com/boce//quotelist?code=boceBCAHY,&column=code,name,price,priceweight,updownrate,high,low,updown,lastclose,open&callback=getdata&callback=jQuery111106538825067691505_1457492432619&_=1457492432620", true);
xhr.send(null);
//console.error(xhr.response);
}


//定时
var priceInterval = window.setInterval(function() {self.getPrice();}, 3000);