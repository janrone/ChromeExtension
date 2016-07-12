

var i = -1;

var alist ="";
function checkDomias1(){

	alist=$('#domins li span.domain')
	sendMessageUrl();
}
checkDomias1();

function sendMessageUrl(){

	console.log("sendMessageUrl");
		//http://0476fanxian.com/
		//$(alist[i]).text()
		i++;
		if(i <= alist.length){
			chrome.extension.sendMessage({ckurl: getUrl()}, function(response) {
				console.log(response);
				
			});
		}
		
	}

	function getUrl(){
		if(alist == "") return "";
		return $(alist[i]).text();
	}

	function setCheckResult(result){
		var url = $(alist[i]).text();
		$(alist[i]).text(url + " "+ result)	
	}
	chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
		console.log("get back msg ok" + request.result);
		setCheckResult(request.result);
		setTimeout("sendMessageUrl()", 2000);
		
	});
