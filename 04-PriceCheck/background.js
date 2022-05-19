// Copyright (c) 2010 The Chromium Authors. All rights reserved.  Use of this
// source code is governed by a BSD-style license that can be found in the
// LICENSE file.


getPrice(); //直接运行

//http://quote.eastmoney.com/qihuo/m2205.html
var url = "https://futsseapi.eastmoney.com/static/114_m2209"
var appleUrl = "http://webboce.hermes.hexun.com/boce//quotelist?code=boceBCAHY,&column=code,name,price,priceweight,updownrate,high,low,updown,lastclose,open&callback=getdata&callback=jQuery111106538825067691505_1457492432619&_=1457492432620"

function handleError() {

}

function getPrice() {
      console.log("now data " + new Date())
      console.log("is open time " + isOpenTime())

      if (!isOpenTime()) return
      var xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                  if (xhr.status == 200) {
                        //表示服务器端的响应代码是200，正确的返回了数据  
                        //纯文本数据的接受方法  
                        //var message=xmlhttp.responseText; 
                        console.log(xhr.responseText);
                        var text = xhr.responseText;
                        console.log(text.substring((text.lastIndexOf("[") + 1), (text.indexOf("]"))));
                        var arr = (text.substring((text.lastIndexOf("[") + 1), (text.indexOf("]")))).split(",");
                        console.log(arr[2]);
                        console.log(arr[3].split(":")[1]);
                        var price = arr[3].split(":")[1];
                        var zde = arr[8].split(":")[1] > 0;
                        chrome.browserAction.setBadgeText({ text: price }); //插件icon添加文字
                        //color='#FF0000'
                        console.log(zde > 0);
                        if (zde > 0) {
                              console.log("> 0 ");
                              chrome.browserAction.setBadgeBackgroundColor({ color: '#FF0000' });
                        } else {
                              console.log("<= 0 "); //#FF0000
                              chrome.browserAction.setBadgeBackgroundColor({ color: '#008000' });
                        }
                        // chrome.browserAction.setTitle({
                        //       title: 'new pageAction title'
                        //   }, () => {
                        //       console.log("setTitle Successed! tabId is: " + item.id)
                        //   });
                        chrome.browserAction.setTitle({ title: arr[7] + "\r\n" + arr[3] + "\r\n" + arr[8] });
                  }
            }

      };

      xhr.open("GET", url, true);
      xhr.send(null);
      //console.error(xhr.response);
}

// this.time_range("9:00", "23:00")
function isOpenTime() {
      var isOpenTime = false
      if (time_range("8:59", "10:16")) {
            return true
      } else if (time_range("8:59", "10:16")) {
            return true
      } else if (time_range("10:29", "11:31")) {
            return true
      } else if (time_range("13:29", "15:01")) {
            return true
      } else if (time_range("20:59", "23:01")) {
            return true
      } else {
            return false
      }

}

function time_range(beginTime, endTime) {
      var strb = beginTime.split(":");
      if (strb.length != 2) {
            return false;
      }
      var stre = endTime.split(":");
      if (stre.length != 2) {
            return false;
      }
      var b = new Date();
      var e = new Date();
      var n = new Date();
      b.setHours(strb[0]);
      b.setMinutes(strb[1]);
      e.setHours(stre[0]);
      e.setMinutes(stre[1]);
      if (n.getTime() - b.getTime() > 0 && n.getTime() - e.getTime() < 0) {
            //console.log(true);
            return true;
      } else {
            //console.log(false)
            return false;
      }
}

//定时
var priceInterval = window.setInterval(function () { self.getPrice(); }, 5000);