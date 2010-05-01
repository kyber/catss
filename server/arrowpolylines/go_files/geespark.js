
var xmlHttp = null;
var xmlHttpPoll = null;
var xmlHttpAutoread = null;
var xmlHttpCustom = null;
var xmlHttpChat = null;
var xmlHttpUser = null;

var elementCustom = null;
var mainUrl = null;
var baseUrl = null;
var curPage = 0;
var curMode = "normal";
var pollAllowed=true;
var pollTimer=null;
var refreshAfterUserAction=false;
var javascriptAfterUserAction=false;
var serverTime=0;
var areMySparks=1;
var userListString="";
var recipientListString="";
var sparkPollEnabled = true;
var communityFetchMode = 1;

var sparkOpen = false;
var chatClose = false;

var activeCommentFormId="";

var customJavascript=null;

var automaticReadSparks = new Array();
var automaticReadTime = (1000*60);


//displayed vars
var pageCount=0;
var unreadCount=0;
var discussionsCount=0;

var selectedCommunityId=0;

var chatPollerActive=false;
var chatPollerUrl="";
var chatPollerDivId="";
var chatOpenInitial=true;
var chatSparkId="";
var chatMediaId="";
var chatScrollPercent="1";
var chatPollerScrollToBottomAllowed=true;
var chatExpandMode="normal";

var sURL = unescape(window.location.pathname);

function refresh()
{
    window.location.href = sURL;
}

// when logging in from popup box, check for login success
function checkSuccess(mediaid,sparkid)
{
 	var loginok = document.getElementById('loginok').innerHTML;
 	if(loginok == 'true'){
 		hideFloater();
 		if(chatClose == true) {
 			chatClose = false;
 			refresh();
 		} else {
 		
 		//RIKKI VIELA
 			openFloater('/wf/html/reigniteTargets?mediaId='+chatMediaId+'&pagename=mainSparks&sparkId='+chatSparkId,chatSparkId);
 		}
 	}
}

function l10n(key) {
	var element = elementById(key);
	if(element == null || element.title == null) {
		return key;
	}
	return element.title;
}

function checkOobRegister()
{
 	var loginok = document.getElementById('loginok').innerHTML;
 	if(loginok != ''){
 		hideFloater();
        refresh();
 	}
 	else {
 	}
}

function loadCreateSparkBox(receiverId, receiverGId)
{
	iframeloaded=false;
	sparkSubmitFlag=false;
	startBusyIndicatorCustom('sparkCreateDiv');
	elementById('sparkPreview').innerHTML="";
	loadContentToElement(baseUrl+"/html/sparkCreateInc?sparkCancelButton=true&sparkCreateLoadToElement=true&sparkReceiverId="+receiverId+"&sparkReceiverGId="+receiverGId,document.getElementById('sparkCreateDiv'),"hideSendToList");
}




function communityFilterChoose(elementId)
{
	var friend=false;
	var id = elementById(elementId).value; 

	if(id.charAt(0)=='f') {
		id = id.substring(1);
		friend=true;
	
	}

	selectedCommunityId=parseInt(id);

	if(selectedCommunityId==0) {
		elementById("communityFilter").options[0].selected=true;
	}
	else if(selectedCommunityId==-1)
		sentMode();
	else {
		if(friend) {
		
			communityFetchMode=2;
			}
		else
			communityFetchMode=1;
		communityMode();
		
	}
	
}

function sortChatInitial(el)
{
	var sorted = new Array();
	var divs=el.getElementsByTagName("div");
	for(var n=0;n<divs.length;n++) {
		if(divs[n].getAttribute("name") == "chatMsgDiv") {
			var newdiv = divs[n].cloneNode(true)
			sorted.push(newdiv);
		
		}
	}
	sorted.reverse();
	
	if(sorted.length==0)return null;
	divs[0].innerHTML="";
	for(var n=0;n<sorted.length;n++) {
	
		divs[0].innerHTML += "<div>"+sorted[n].innerHTML+"</div>";
	}
	chatNewMessages=true;
	
	
	elementById(chatPollerDivId).innerHTML = divs[0].innerHTML;


	return el;
}


function sortChatPoll(origEl,newEl,initial)
{



	var sorted = new Array();
	var divs=newEl.getElementsByTagName("div");
	for(var n=0;n<divs.length;n++) {
		if(divs[n].getAttribute("name") == "chatMsgDiv") {
			sorted.push(divs[n]);
		
		}
	}
	sorted.reverse();
	for(var n=0;n<sorted.length;n++) {
		var newdiv = document.createElement('div');
		newdiv.innerHTML = sorted[n].innerHTML;
		origEl.appendChild(newdiv);
		chatNewMessages=true;
	}
	
	return origEl;
}


function setChatHeaderStyle(sparkId,style)
{
	try {
	
	elementById("openChat_"+sparkId).className=style;
	elementById("openChat2_"+sparkId).className=style+"_l";
	elementById("openChat3_"+sparkId).className=style+"_r";
	
	if(style=="header1")
		elementById("openChat5_"+sparkId).innerHTML="";
		/*
	elementById("closeChat_"+sparkId).className=style;
	elementById("closeChat2_"+sparkId).className=style+"_l";
	elementById("closeChat3_"+sparkId).className=style+"_r";
	*/
	}catch(e){}
}


function closeChat()
{	
	try{
		//chat must be open, so check sparkId
		if(chatSparkId!="") {
		
			setChatHeaderStyle(chatSparkId,"header1");
			chatPollerStop();
			elementById('mainChatDiv_'+chatSparkId).style.display = "none";
			elementById('closeChat_'+chatSparkId).style.display = "none";
			elementById('openChat_'+chatSparkId).style.display = "block";
			
		}
	
	}catch(e){} // catch if old chat is not there anymore
	if(sparkOpen == true){
		dimmerUpdate();
	}
}

function chatResizeWindow() 
{
	var newHeight;
	if(chatExpandMode=="expanded")
		newHeight="300px";
	else
		newHeight="180px";
		
	elementById("chatMessages_"+chatSparkId).style.maxHeight = newHeight;
	elementById("chatMessagesInner_"+chatSparkId).style.maxHeight = newHeight;
	if(sparkOpen == true){
		dimmerUpdate();
	}
}

function toggleExpandChat()
{
	if(chatExpandMode=="normal") {
		chatExpandMode="expanded";
		try {
		chatResizeWindow();
		//elementById("chatExpandLink_"+chatSparkId).innerHTML = "Restore";
		elementById("chatExpandImage_"+chatSparkId).src = baseUrl+"/static/images/chat-restore.png";
		}catch(e){}
	}else{
		chatExpandMode="normal";
		try{
		chatResizeWindow();
		//elementById("chatExpandLink_"+chatSparkId).innerHTML = "Expand";
		elementById("chatExpandImage_"+chatSparkId).src = baseUrl+"/static/images/chat-expand.png";
		}catch(e2){}
	}
	try{
	chatScrollToBottom();
	}catch(e3){}
	
}



function openChat(sparkId,openAsLarge,mediaId)
{
	closeChat();
	chatExpandMode="expanded";
	if(typeof(openAsLarge)!="undefined" && openAsLarge==true) {
		chatExpandMode="normal";
	}
	
	toggleExpandChat();
	
	chatNewMessages=false;
	
	chatPollerScrollToBottomAllowed=true;
	chatPollerDivId = "chatDiv_"+sparkId;
	elementById('mainChatDiv_'+sparkId).style.display = "block";

	chatSetMainDiv('chatMessages_'+sparkId);
	chatSetContentDiv('chatMessagesInner_'+sparkId);
	startBusyIndicatorCustom(chatPollerDivId);
	chatSparkId=sparkId;
	chatMediaId=mediaId;
	chatPollerUrl = baseUrl+"/html/sparkChat/"+sparkId+"?onlyNew=0";
	if(typeof(chatMediaId)!="undefined" && chatMediaId != "") {
		chatPollerUrl += "&mediaId=" + chatMediaId;
	}
	chatOpenInitial=true;
	chatPollerActive=true;
	chatPollerRequest();
	chatScrollToBottom();
}

function openChatOob(mediaId,openAsLarge)
{
	closeChat();
	chatExpandMode="expanded";
	if(typeof(openAsLarge)!="undefined" && openAsLarge==true) {
		chatExpandMode="normal";
	}
	toggleExpandChat();
	chatNewMessages=false;
	chatPollerScrollToBottomAllowed=true;
	chatPollerDivId = "chatDiv_"+mediaId;
	elementById('mainChatDiv_'+mediaId).style.display = "block";
	chatSetMainDiv('chatMessages_'+mediaId);
	chatSetContentDiv('chatMessagesInner_'+mediaId);
	startBusyIndicatorCustom(chatPollerDivId);
	chatSparkId=mediaId;
	chatMediaId=mediaId;
	chatPollerUrl = baseUrl+"/html/sparkChat/"+mediaId+"?onlyNew=0";
	if(typeof(chatMediaId)!="undefined" && chatMediaId != "") {
		chatPollerUrl += "&mediaId=" + chatMediaId;
	}
	chatOpenInitial=true;
	chatPollerActive=true;
	chatPollerRequest();
	chatScrollToBottom();
}


function chatPollerRequest() {

	xmlHttpChat = getXmlHttpObject();
	xmlHttpChat.onreadystatechange=chatRequestStateChanged;
	xmlHttpChat.open("POST",chatPollerUrl,true);

	
	xmlHttpChat.send(null);
}

function chatPollerStop() {
	chatPollerActive=false;
	xmlHttpChat.onreadystatechange = function () {}
	xmlHttpChat.abort();
}

function chatRequestStateChanged() {
	if (xmlHttpChat!=null && typeof(xmlHttpChat)!="undefined" && xmlHttpChat.readyState==4){ 
		if(xmlHttpChat.responseText.length > 1){	
			var data=xmlHttpChat.responseText;
			var newChatDiv=document.createElement("div");
			newChatDiv.innerHTML = data;
			if(chatOpenInitial) {
				elementById(chatPollerDivId).innerHTML="";
				sortChatInitial(newChatDiv);
				chatOpenInitial=false;
			} else {
				
				sortChatPoll(elementById(chatPollerDivId),newChatDiv);
				removeTemporaryComment();
				//elementById(chatPollerDivId).innerHTML = newChatDiv.innerHTML;
			}
			if(chatNewMessages) {
			removeTemporaryComment();
				if(chatPollerScrollToBottomAllowed)
					chatScrollToBottom();
					
				chatNewMessages=false;
			}
			if(chatPollerActive) {
			
				chatOpenInitial=false;
				chatPollerUrl = baseUrl+"/html/sparkChat/"+chatSparkId+"?onlyNew=1";
				if(typeof(chatMediaId)!="undefined" && chatMediaId != "") {
					chatPollerUrl += "&mediaId=" + chatMediaId;
				}
				setTimeout("chatPollerRequest();",5000);
			}
		}
		
	}
}



function sparkMusic(url)
{
elementById('musicFileInput').value = '';
	elementById('imageFileInput').value = '';
	document.getElementById('fileAddedInfo').innerHTML='';
	
	elementById('imeemIFrame').src = "";
	elementById('imeemIFrame').style.display = "none";
	elementById('sparkEmbed').value = url;
	displayElems('none','chooseMusicDiv','headerMusic','addCancel','imeemResult');
	displayElems('block','addAttachment','sparkButtons','musicFileDiv');
}

function previewMusic(url)
{
	elementById('imeemIFrame').src = url;
	elementById('imeemIFrame').style.display = "block";
}

function imeemSearch()
{
	
	var query = document.getElementById('imeemQuery').value;
	if(query=='')return;
	
	query = query.replace(" ","_");
	var urlEl = document.getElementById('imeemResult');
	urlEl.style.display = "block";
	
	urlEl.innerHTML = '<p style="text-align: center;"><img src="'+baseUrl+'/static/images/spark_busy_indicator2.gif"></p>';
	var url = baseUrl+"/html/imeemSearch?query="+escape(query)+"&mediaType=music";
	loadContentToElement(url,urlEl);
}


function setBaseUrl(url)
{
	baseUrl=url;

	
}
	function friendAction(url)
	
	{
		document.getElementById('friendActionDiv').innerHTML='<p style="text-align: center;"><img src="'+baseUrl+'/static/images/spark_busy_indicator2.gif"></p>';
loadContentToElement(url,document.getElementById('friendActionDiv'));
	
	}

	function clickNotification(url)
	
	{
loadContentToElement(url,document.getElementById('notificationsDiv'));
	
	}

function openUrl(url) {
    var url=url;
	self.location = url;
	}

function reIgnite(url,floaterId) {
	var el = document.getElementById(floaterId);
	var sendToIds='';
	try{
		var n=0;
		while(true) {
			var element = document.getElementById("r_target_"+n);
			if(!element.disabled && element.type == 'checkbox') {
				
				if(element.checked) {
					var name=element.name;
					name = name.substring(name.lastIndexOf("_")+1);
					
					if(sendToIds!='') {
						sendToIds+="&";
					}
					sendToIds+= "tos="+ name;
				}
			}
			
			n++;
		}
		
	}catch(e) {}
	
	if(sendToIds!='') {
		url+="&"+sendToIds;
	}

	var groups=document.getElementsByName("toGroup");

	if(groups!=null) {
	for(var n=0;n<groups.length;n++) {
		if(groups[n].checked) {
			url+="&toBand="+groups[n].value;
		}
	}
	}
	var medias=document.getElementsByName("toMedia");

	if(medias!=null) {
	for(var n=0;n<medias.length;n++) {
		if(medias[n].checked) {
			url+="&toMedia="+medias[n].value;
		}
	}
	}
	
	var emails=document.getElementsByName("toEmail");
	try{
	
	if(emails!=null)
	for(var n=0;n<emails.length;n++) {
		var v = emails[n].value
		if(v.length>3) {
			url+="&toEmail="+escape(v);;
		}
	}
	}catch(e){}
		

	
	el.innerHTML = "Sending..";
	
	//debug(url);
	loadContentToElement(url,el,"hideFloater('reignite_floater')");
}

function debug(value) {
//var newdiv = document.createElement('div');
//newdiv.innerHTML = value;
//elementById("top-bar").appendChild(newdiv);
elementById("top-bar").innerHTML=value;
}

function hideFloater(floaterId) {	
	document.getElementById('floater').style.display="none";
	dimmer(false);
}

function openFloater(url,floaterId,elementId,pos,xpos,ypos) {
	chatClose=true;
	dimmer(true);
	var el = document.getElementById(floaterId);
	xposvalue = parseInt(xpos);
	yposvalue = parseInt(ypos);
	document.getElementById(floaterId).setAttribute("class", pos+"_floater");
	document.getElementById(floaterId).setAttribute("className", pos+"_floater");
	startBusyIndicatorCustom(floaterId);
	var x = getElementX(document.getElementById(elementId));
	var y = getElementY(document.getElementById(elementId));
	el.style.left = (x+xposvalue)+"px";					
	el.style.top = (y+yposvalue)+"px";
	el.style.display = "block";
	window.scroll(0,y-350);
	loadContentToElement(url,el);	
}
function loadContentToElement(url,el,javascriptAfterLoad) {
	if(typeof(javascriptAfterLoad)=="undefined") {
		customJavascript = null;	
	} else {
		customJavascript = javascriptAfterLoad;
	}
	
	elementCustom = el;
	xmlHttpCustom = getXmlHttpObject();
	xmlHttpCustom.onreadystatechange=customRequestStateChanged;
	
	if(url.indexOf("?")!=-1)
		url += "&randomnum="+Math.random();
	else
		url += "?randomnum="+Math.random();

	xmlHttpCustom.open("POST",url,true);
	xmlHttpCustom.send(null);
}

function updateElement(url,elementId,javascriptAfterLoad)
{

	elementById(elementId).style.display='block';	
	elementById(elementId).innerHTML = '<p style="text-align: center;"><img src="../static/images/spark_busy_indicator2.gif" alt="Loading..."></p>';
	loadContentToElement(url,elementById(elementId),javascriptAfterLoad);
	
}

function customRequestStateChanged() { 
	if (xmlHttpCustom!=null && typeof(xmlHttpCustom)!="undefined" && xmlHttpCustom.readyState==4){ 
		if(xmlHttpCustom.responseText.length > 1){	
		
		if(elementCustom!=null)
			elementCustom.innerHTML = xmlHttpCustom.responseText;
		
		
		if(customJavascript!=null) {
			if(customJavascript == "hideSendToList") {
				hideSendToList(true);
			
			}else if(customJavascript == "hidereignite") {
				setTimeout("hideFloater();",1000);
			}else
			if(customJavascript == "setPreviewUserList") {

				elementById('formTypePreview').value = elementById('formType').value;
				//this is not currently used in preview, so dont do it
				if(userListString!=null) {
					//elementById("sendUserList").innerHTML = userListString;
					
					var userListStringSmall = userListString;
					if(userListStringSmall.length > 80) {
						userListStringSmall = userListStringSmall.substring(0,80)+"..";
					}
					elementById("sendUserListPreview").innerHTML = userListStringSmall;
				}
				if(recipientListString!=null) {
					elementById('sparkForm2').action+='?'+recipientListString;
				}
			}else{
			setTimeout(customJavascript+";",1000);
			}
			
			
			
		}
		
		
		}
		
	}
}


function startPollTimer() {
	if(sparkPollEnabled) {
		pollTimer = setTimeout("pollPageRequest()", 20000);
	}
}

/* tekee xmlhttp objektin*/
function getXmlHttpObject() {
	var xmlHttpTemp;
	try {
   		// Firefox, Opera 8.0+, Safari
   		xmlHttpTemp=new XMLHttpRequest();
   	} 
	catch (e) {
		// Internet Explorer
   		try {
			xmlHttpTemp=new ActiveXObject("Msxml2.XMLHTTP");
     	} 
		catch (e) {
     		try {
       			xmlHttpTemp=new ActiveXObject("Microsoft.XMLHTTP");
       		} catch (e){
       			alert("Your browser does not support AJAX!");
       			return null;
			}
     	}
   	}
	return xmlHttpTemp;
}

function elementById(id) {
	return document.getElementById(id);
}

function startBusyIndicator() {

	elementById("sparkki").innerHTML = '<p style="text-align: center;"><img src="'+baseUrl+'/static/images/spark_busy_indicator2.gif"></p>';
}

function startBusyIndicatorCustom(elementId)
{


	elementById(elementId).innerHTML = '<p style="text-align: center;"><img src="'+baseUrl+'/static/images/spark_busy_indicator2.gif"></p>';
}


function getSparksForAutomaticRead() {
	try {
	var ret = new Array();
	var date = new Date();
	var curTime = date.getTime();
	curTime = parseInt(curTime);
	
	var c = GetCookie("automaticReads");
	if(c==null || c=='')return null;
	
	var a = c.split(",");
	
	for(var n=0;n<a.length;n+=2) {
		if(parseInt(a[n]) <= parseInt(curTime)) {
			ret.push(a[n+1]);
			a.splice(n,2);
			n-=2;
		}
	}
	
	
	
	SetCookie("automaticReads",a.join(","));
	}catch(e) { return null; } 
	
	return ret;
	
}

function isSparkInAutomaticRead(sparkId) {
	try {
	var oldValuesString = GetCookie("automaticReads");
	if(oldValuesString==null)oldValuesString="";
	var a = oldValuesString.split(",");
	if(a.length>1) {
		for(var n=0;n<a.length;n+=2) {
			if(a[n+1]==sparkId)return true;
		}
	}
	
	return false;
	} catch(e) { return false; }
	
}

function addSparkToAutomaticRead(removeTime,sparkId) {
//SetCookie("automaticReads","");

	if(isSparkInAutomaticRead(sparkId) == true)return;

	clientTime = parseInt(removeTime);
	var oldValuesString = GetCookie("automaticReads");
	if(oldValuesString==null)oldValuesString="";
	if(oldValuesString!="")oldValuesString = oldValuesString+",";
	oldValuesString += new String(clientTime)+","+new String(sparkId);
	SetCookie("automaticReads",oldValuesString);
	
}


/* initialization */
function showSpark(userUrl, newMode) {
	mainUrl = userUrl;
	
	//get base url
	//baseUrl = mainUrl.substring(0,mainUrl.indexOf('/html'));


	//Get objects
	//xmlHttp = getXmlHttpObject();
	//xmlHttpPoll = getXmlHttpObject();
	if(newMode == null) {
		curMode="normal";
	} else {
		curMode=newMode;
	}
	startBusyIndicator();
	normalPageRequest(0);
	startPollTimer();
}

function normalPageRequest(pageNumber) {
	//dont allow even normal request when already working
	if(!pollAllowed)return;
	
	pollAllowed=false;
	curPage = pageNumber;
	var requestUrl = makeUrl(mainUrl, "c=none&rand="+Math.random()+"&page="+curPage);
	
	if(curMode=="sent") {
		elementById("communityFilter").options[1].selected=true;
		requestUrl=makeUrl(mainUrl, "c=none&rand="+Math.random()+"&page="+curPage+"&sentSparks=1");
	}else 
	if(curMode=="community") {
		requestUrl=makeUrl(mainUrl, "c=none&rand="+Math.random()+"&page="+curPage+"&communitySparks="+communityFetchMode+"&communityId="+selectedCommunityId);
	}else{
		elementById("communityFilter").options[0].selected=true;
	}

		
	if(curMode=="discussions")
		requestUrl=makeUrl(mainUrl, "c=none&rand="+Math.random()+"&page="+curPage+"&discussions=1");
	xmlHttp = getXmlHttpObject();
	xmlHttp.onreadystatechange=normalPageStateChanged;
	xmlHttp.open("POST",requestUrl,true);
	xmlHttp.send(null);
}

function makeUrl(url, params) {
	if(url.indexOf('?') != -1) {
		return url + '&' + params;
	} else {
		return url + '?' + params;
	}
}

function userAction(requestUrl,refreshAfter,javascriptAfter) {
	//dont allow even normal request when already working
	//if(!pollAllowed)return;
	pollAllowed=false;
	
	refreshAfterUserAction = refreshAfter;
	
	
	if(typeof(javascriptAfter)!='undefined') {
		javascriptAfterUserAction = javascriptAfter;
	}else {
		javascriptAfterUserAction = false;
	}
	
	xmlHttpUser = getXmlHttpObject();
	xmlHttpUser.onreadystatechange=userActionStateChanged;
	xmlHttpUser.open("POST",requestUrl,true);

	xmlHttpUser.send(null);
}

function discussionMode(){
	if(pollAllowed) {
		startBusyIndicator();
		curMode="discussions";
		normalPageRequest(0)
	}
}

function liveMode() {
	if(pollAllowed) {
		startBusyIndicator();
		curMode="normal";
		normalPageRequest(0)
	}
}

function sentMode() {
	if(pollAllowed) {
		startBusyIndicator();
		curMode="sent";
		normalPageRequest(0)
	}
}

function communityMode() {
	if(pollAllowed) {
		startBusyIndicator();
		curMode="community";
		normalPageRequest(0)
	}
}

function nextPage() {
	if(curPage<pageCount-1 && pollAllowed) {
		
		curPage++;
		markSeenAsRead();
		startBusyIndicator();
		
		//normalPageRequest(curPage);
	}
}


function prevPage() {
	if(curPage>0 && pollAllowed) {
		
		curPage--;
		markSeenAsRead();
		startBusyIndicator();
	}
	
}

function gotoPage(wantedPage) {
	if(wantedPage>=0 && wantedPage<pageCount && pollAllowed) {
		
		curPage=wantedPage;
		markSeenAsRead();
		startBusyIndicator();
		
		//normalPageRequest(curPage);
	}
}


function markSeenAsRead() {
	var sparkIds = getSparkIds(elementById("sparkki"));
	var idString='';

	for(var j=0;j<sparkIds.length;j++) {
		var s= new String(sparkIds[j]).substring(6);		
		if(j!=0)
			idString+=","+s;
		else
			idString+=s;
	}
	var url = baseUrl+"/xml/spark?a=shownReadBatch&batchIds="+idString+"&target="+baseUrl+"/html/sparkCheck?c=none";
	userAction(url,true);
}

function markAllAsRead(fromUser) {
	startBusyIndicator();
	if(curMode=="discussions") {
		userAction(baseUrl+"/xml/spark?a=allCommentsRead&time="+serverTime+"&target="+baseUrl+"/html/sparkCheck?c=none",fromUser);
	}else{
		userAction(baseUrl+"/xml/spark?a=allShownRead&target="+baseUrl+"/html/sparkCheck?c=none",fromUser);
	}
}

function deleteSpark(sparkId) {
	dimmer(false);
	startBusyIndicator();
	if(curMode=="discussions") { 
		userAction(baseUrl+"/xml/spark?a=commentsRead&id="+sparkId+"&time="+serverTime+"&target="+baseUrl+"/html/sparkCheck?c=none",true);
	}else{
	  userAction(baseUrl+"/xml/spark?a=delete&id="+sparkId+"&target="+baseUrl+"/html/sparkCheck?c=none",true);
	}
}

function deleteMedia(sparkId) {
	dimmer(false);
	startBusyIndicator();
    userAction(baseUrl+"/xml/mediaMgnt?a=delete&id="+sparkId+"&target="+baseUrl+"/html/community/",true);
}
function deleteMessage(sparkId, divId) {
	dimmer(false);
	//startBusyIndicator();
	url = baseUrl+"/xml/mediaMgnt?a=delMsgs&ids="+sparkId;
	if(divId != null) {
		var div = elementById(divId);
		if(div != null) {
			div = div.parentNode;
			div.parentNode.removeChild(div);
		}
	}
	loadContentToElement(url,null,null);
}

function bugMe(sparkId,bug) {
	if(sparkOpen == true){
		dimmer(false);
	}	
	startBusyIndicator();
	if(bug)

		userAction(baseUrl+"/xml/spark?a=unread&id="+sparkId+"&target="+baseUrl+"/html/sparkCheck?c=none",true);
	else
		userAction(baseUrl+"/xml/spark?a=mute&id="+sparkId+"&target="+baseUrl+"/html/sparkCheck?c=none",true);
}

function blockSender(url) {
	startBusyIndicator();
	userAction(url,true);
}




/* l√§het√§ komentti palvelimelle */  		
function sendComment(form,mediaId,myNick) {


  activeCommentFormId = form;
  var message = document.getElementById(form).v1.value;
  var url = baseUrl+"/html/mediaMgnt?a=post&v2="+mediaId;
  
  url = url+"&v1="+escape(Utf8.encode(message));
  //url = url+"&v1="+escape(message);
	url= url+"&target="+baseUrl+"/html/";
  userAction(url,false,'sparkComment');
  document.getElementById(form).v1.value="";
 //document.getElementById(form).v1.value=elementById("messageSentDiv").innerHTML;
 //document.getElementById(form).v1.disabled=true;
 addTemporaryComment(myNick,message);
	chatScrollToBottom(true);
} 

function addTemporaryComment(nick,message)
{
	
	var el= elementById("chatDiv_"+chatSparkId);
	var s="";
	s+='<div name="chatMsgDivTemp"><div class="chat"><div class="chat-nickNew">';
	s+=nick;
	s+=' says:</div><div class="chat-timeNew"> </div></div><div class="chat-messageNew">';
	s+=message;
	s+='</div></div>';
	
	el.innerHTML+=s;	

}

function removeTemporaryComment()
{
	try {
	
	var el= elementById("chatDiv_"+chatSparkId);
	
	var divs=el.getElementsByTagName("div");
	for(var n=0;n<divs.length;n++) {
		if(divs[n].getAttribute("name") == "chatMsgDivTemp") {
			el.removeChild(divs[n]);
		
		}
	}
	
	
	/*
	var list = document.getElementsByName("chatMsgDivTemp");
	for(var n=0;n<list.length;n++) {
		var tempDiv = list[n];
		var parentDiv = elementById("chatDiv_"+chatSparkId);
		parentDiv.removeChild(tempDiv);
	}
	*/
	}catch(e){ }
}


function normalPageStateChanged() { 
	if (xmlHttp!=null && typeof(xmlHttp)!="undefined" && xmlHttp.readyState==4){ 
		if(xmlHttp.responseText.length > 40){	
			addSparks(xmlHttp.responseText);
		}
	}
}

/* P√§ivitt√§√§ muudin palvelimelle */  		
function updateMood(url) {
		var moodi =  document.getElementById("mood").value;
		moodi = Utf8.encode(moodi);
		moodi = escape(moodi);
		url = url+"?a=status&v1="+moodi;
		
		document.getElementById("updateStatusLinks").innerHTML = "<div class='info'>Done!</div>";
		setTimeout('hideStatusUpdateLinks();',3000);
		
		loadContentToElement(url,null,null);
		
		//userAction(url,false);
		
}


function showSparkPublic(checkboxname){
  var checkbox = document.getElementById(checkboxname);
  if(checkbox.checked){
    displayElems('none','publicspark');displayElems('block','privatespark');
    }
    else{
    displayElems('none','privatespark');displayElems('block','publicspark')
  };
  
};


function userActionStateChanged() { 
	if (xmlHttpUser!=null && typeof(xmlHttpUser)!="undefined" && xmlHttpUser.readyState==4){ 
		pollAllowed=true;
		if(xmlHttpUser.responseText.length > 0){	
			
			if(refreshAfterUserAction) {
				refreshAfterUserAction=false;
				pollAllowed=true;
				normalPageRequest(curPage);
			}else
			if(javascriptAfterUserAction!=null) {
				if(javascriptAfterUserAction=='sparkpreview')
				{
					showSparkPreview();
				}else if(javascriptAfterUserAction=='sparkComment')
				{
				
					elementById(activeCommentFormId).v1.value = "";
					elementById(activeCommentFormId).v1.disabled=false;
					elementById(activeCommentFormId).v1.focus();
					//chatScrollToBottom();
				}
			}
		}
	}
}

function pollPageRequest() {
	var requestUrl = makeUrl(mainUrl, "c=none&rand="+Math.random()+"&page="+curPage+"&sinceDiscussed=1");
	if(curMode=="discussions")
		requestUrl=makeUrl(mainUrl, "c=none&rand="+Math.random()+"&page="+curPage+"&discussions=1");

	if(curMode=="community")
		requestUrl=makeUrl(mainUrl, "c=none&rand="+Math.random()+"&page="+curPage+"&communitySparks="+communityFetchMode+"&communityId="+selectedCommunityId);
	
		
	if(curMode=="sent")
		requestUrl=makeUrl(mainUrl, "c=none&rand="+Math.random()+"&page="+curPage+"&sentSparks=1");
	
	xmlHttpPoll = getXmlHttpObject();
	
	xmlHttpPoll.onreadystatechange=pollPageStateChanged;
	xmlHttpPoll.open("POST",requestUrl,true);
	xmlHttpPoll.send(null);
}


function autoReadRequest(idString) {
	var requestUrl = baseUrl+"/xml/spark?a=shownReadBatch&batchIds="+idString+"&target="+baseUrl+"/html/sparkCheck?c=none";
	xmlHttpAutoread = getXmlHttpObject();
	xmlHttpAutoread.open("POST",requestUrl,true);
	xmlHttpAutoread.send(null);
}

function pollPageStateChanged() { 
	if (xmlHttpPoll!=null && typeof(xmlHttpPoll)!="undefined" && xmlHttpPoll.readyState==4){ 

		if(xmlHttpPoll.responseText.length > 0){	
			refreshSparks(xmlHttpPoll.responseText);
		}
	}
}

function doAutoRead() {
		var autoRead = getSparksForAutomaticRead();
//alert(GetCookie("automaticReads"));
	if(autoRead!=null && autoRead.length>0) {
		autoReadRequest(autoRead.join(","));
		
	}
	
}

function refreshSparks(data){
	
	if(!pollAllowed){ startPollTimer(); return; }
	

	var newDiv=document.createElement("div");
	
	var oldDiv=elementById("sparkki");
	newDiv.innerHTML = data;
		
	getServerTime(newDiv);
	getGlobalVars(newDiv);
	displayGlobalVars();

	refreshComments(oldDiv,newDiv);
	
	if(curMode!="discussions") {
		addNewSparks(oldDiv,newDiv);
		adjustSparkList(oldDiv);
	}
	
	
	adjustSparkStyles(oldDiv);
	
	doAutoRead();
	
	
	startPollTimer();
	
}


function sparkPollEnable()
{
	if(sparkPollEnabled==false) {
		sparkPollEnabled=true;
		startPollTimer();
	}
	sparkPollEnabled=true;
}


function sparkPollDisable()
{
	try{
	xmlHttpPoll.onreadystatechange = function () {}
	xmlHttpPoll.abort();
	}catch(e){}
	sparkPollEnabled=false;

}


function adjustSparkStyles(newDiv) {
	var date = new Date();
	var removeTime = date.getTime();
	removeTime = parseInt(removeTime)+parseInt(automaticReadTime);
	
	var sparkIds = getSparkIds(newDiv);
	var shownTimeIds = getShownTimeIds(newDiv);
	if(curMode!="discussions") {
	
		for(var j=0;j<shownTimeIds.length;j++) {
			var sparkId = new String(sparkIds[j]).substring(6);
			changeSparkStyle(newDiv,sparkId,"normal");
			addSparkToAutomaticRead(removeTime,sparkId);
			var sTime = getSpanById(newDiv,shownTimeIds[j]).innerHTML;
			if(/*areMySparks==1 && */(sTime==null || typeof(sTime)=="undefined" || sTime=="")){
				changeSparkStyle(newDiv,sparkId,"new");
				addSparkToAutomaticRead(removeTime,sparkId);
			}
		}
	}	
	
}

function addSparks(data){
	var newDiv=document.createElement("div");
	newDiv.innerHTML = data;

	getGlobalVars(newDiv);
	
	adjustSparkStyles(newDiv);
	getServerTime(newDiv);
	elementById("sparkki").innerHTML = newDiv.innerHTML;
	
	displayGlobalVars();
	doAutoRead();
	pollAllowed=true;
}

function getServerTime(newDiv) {
	// Spark ajan etsint√§
	var elems = newDiv.getElementsByTagName("span");
	var time;
	if(typeof(elems) != "undefined" &&
	  elems && 
	  elems.length > 0){
		time = elems[0].firstChild.nodeValue;
	} else {
		time = '';
	}
	serverTime=parseInt(time);

}

function getGlobalVars(newDiv) {
	var elems = newDiv.getElementsByTagName("span");
	for(j=0;j<elems.length;j++) {

		if(elems[j].id=="spark_pagecount")pageCount = parseInt(elems[j].innerHTML);
		
		if(curMode=="discussions" || curMode=="normal") {
			if(elems[j].id=="spark_unreadcount")unreadCount = parseInt(elems[j].innerHTML);
			if(elems[j].id=="spark_discussedcount")discussionsCount = parseInt(elems[j].innerHTML);
		}
		if(elems[j].id=="spark_page")curPage = parseInt(elems[j].innerHTML);	
		if(elems[j].id=="spark_aremysparks")areMySparks = parseInt(elems[j].innerHTML);
	}
	
	if(curMode=="discussions") {
		elementById("liveLink").className="spark-menu";
		//elementById("sentLink").className="spark-menu";
		elementById("chatLink").className="spark-menu-active";
		
	} else if(curMode=="sent") {
		//elementById("sentLink").className="spark-menu-active";
		elementById("liveLink").className="spark-menu";
		elementById("chatLink").className="spark-menu";	
	} else if(curMode=="community") {
		//elementById("sentLink").className="spark-menu";
		elementById("liveLink").className="spark-menu";
		elementById("chatLink").className="spark-menu";	
	} else {
		//elementById("sentLink").className="spark-menu";
		elementById("liveLink").className="spark-menu-active";
		elementById("chatLink").className="spark-menu";	
	}
	
}

function displayGlobalVars() {
	try {
	//elementById("pageCount").innerHTML = (parseInt(curPage)+1) + "/" + parseInt(pageCount);
	elementById("liveCount").innerHTML = parseInt(unreadCount);
	elementById("chatCount").innerHTML = parseInt(discussionsCount);

	if(curMode=="discussions") {
		if(discussionsCount==0)
			elementById('markAllAsReadDiv').style.display="none";
		else
			elementById('markAllAsReadDiv').style.display="block";
		
	//	elementById("markAllAsReadLink").innerHTML = elementById("closeChatLabel").innerHTML;
	} else {		
		if(unreadCount==0)
			elementById('markAllAsReadDiv').style.display="none";
		else
			elementById('markAllAsReadDiv').style.display="block";
	//	elementById("markAllAsReadLink").innerHTML = elementById("markAsReadLabel").innerHTML;
		
		if(curMode!="normal") {
			elementById('markAllAsReadDiv').style.display="none";
		}
		
	}
	
	}catch(e){ alert(e);}
}

function adjustSparkList(oldDiv) {
	var ids = getSparkIds(oldDiv);
	for(var i=5;i<ids.length;i++) {
		oldDiv.removeChild(getDivById(oldDiv,ids[i]));
	}
	
}
	


function addNewSparks(oldNode,newNode) {
  var newIds = getSparkIds(newNode);
  for(var i=0;i<newIds.length;i++) {
	  var oldDiv = getDivById(oldNode,newIds[i]);

	  if(oldDiv==null) {
		  var firstNode = getFirstSparkNode(oldNode);
		  if(firstNode!=null)
		  	oldNode.insertBefore(getDivById(newNode,newIds[i]),firstNode);
		  else 
		    oldNode.appendChild(getDivById(newNode,newIds[i]));
	  }
  } 
}

function getSparkIds(node) {
  var result=new Array();
  if(node) {
    var list = node.getElementsByTagName("div");
    for(i=0;i<list.length;i++) {
      if(list[i].attributes.getNamedItem("id")) {
        var id=""+list[i].attributes.getNamedItem("id").value;
        if(id.indexOf("spark_", 0) == 0) {
          result.push(id);
        }
      }
    }
  }
  return result;
}


function getFirstSparkNode(node) {
  var result=null;
  if(node) {
    var list = node.getElementsByTagName("div");
    if(list==null)return null;
    for(var i=0;i<list.length;i++) {
      if(list[i].attributes.getNamedItem("id")) {
        var id=""+list[i].attributes.getNamedItem("id").value;
        if(id.indexOf("spark_", 0) == 0) {
        	return list[i];
        }
      }
    }
    
      return list[0];
    
  }
  return result;
}

function getCommentIds(node,divId) {
  var result=new Array();
  if(node) {
    var list = node.getElementsByTagName("div");
    for(i=0;i<list.length;i++) {
      if(list[i].attributes.getNamedItem("id")) {
        var id=""+list[i].attributes.getNamedItem("id").value;
        if(id.indexOf(divId, 0) == 0) {
          result.push(id);
        }
      }
    }
  }
  return result;
}

function getShownTimeIds(node) {
  var result=new Array();
  if(node) {
    var list = node.getElementsByTagName("span");
    for(i=0;i<list.length;i++) {
      if(list[i].attributes.getNamedItem("id")) {
        var id=""+list[i].attributes.getNamedItem("id").value;
        if(id.indexOf("showntime_", 0) == 0) {
          		result.push(id);
        }
      }
    }
  }
  return result;
}


function refreshComments(oldNode,newNode) {

//alert(elementById("openChat3_"+chatSparkId).innerHTML);


  var newIds = getCommentIds(newNode,"openChat3_");
  var newIdsComments = getCommentIds(newNode,"openChat4_");
  for(var i=0;i<newIds.length;i++) {
	  var oldDiv = getDivById(oldNode,newIds[i]);
	  var oldCommentDivCount = getDivById(oldNode,newIdsComments[i]);
	  if(oldDiv!=null) {
		  //oldNode.replaceChild(getDivById(newNode,newIds[i]),oldDiv);
		  var newCommentDiv = getDivById(newNode,newIds[i]);
		  var newCommentDivCount = getDivById(newNode,newIdsComments[i]);
		  if(newCommentDivCount.innerHTML != oldCommentDivCount.innerHTML) {
		   var sparkId=oldDiv.id.substring(10);
		  
		   setChatHeaderStyle(sparkId,"header2");
		 
		  }
		  
		  oldDiv.innerHTML = newCommentDiv.innerHTML;
	  }
  } 
}

var Utf8 = {

    // public method for url encoding
    encode : function (string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },

    // public method for url decoding
    decode : function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while ( i < utftext.length ) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }

        return string;
    }

}

function GetCookie( check_name ) {
	// first we'll split this cookie up into name/value pairs
	// note: document.cookie only returns name=value, not the other components
	var a_all_cookies = document.cookie.split( ';' );
	var a_temp_cookie = '';
	var cookie_name = '';
	var cookie_value = '';
	var b_cookie_found = false; // set boolean t/f default f
	
	for ( i = 0; i < a_all_cookies.length; i++ )
	{
		// now we'll split apart each name=value pair
		a_temp_cookie = a_all_cookies[i].split( '=' );
		
		
		// and trim left/right whitespace while we're at it
		cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');
	
		// if the extracted name matches passed check_name
		if ( cookie_name == check_name )
		{
			b_cookie_found = true;
			// we need to handle case where cookie has no value but exists (no = sign, that is):
			if ( a_temp_cookie.length > 1 )
			{
				cookie_value = unescape( a_temp_cookie[1].replace(/^\s+|\s+$/g, '') );
			}
			// note that in cases where cookie is initialized but no value, null is returned
			return cookie_value;
			break;
		}
		a_temp_cookie = null;
		cookie_name = '';
	}
	if ( !b_cookie_found )
	{
		return null;
	}
}				

function SetCookie(cookieName,cookieValue,nDays) {
 var today = new Date();
 var expire = new Date();
 if (nDays==null || nDays==0) nDays=1;
 expire.setTime(today.getTime() + 3600000*24*nDays);
 document.cookie = cookieName+"="+escape(cookieValue)
                 + ";expires="+expire.toGMTString() + ";path=/";
}

function getDivById(node,elementId) {
  var result=null;
  if(node) {
    var list = node.getElementsByTagName("div");
    for(i=0;i<list.length;i++) {
      if(list[i].attributes.getNamedItem("id")) {
        var id=""+list[i].attributes.getNamedItem("id").value;
        if(id==elementId) {
			return list[i];
        }
      }
    }
  }
  return result;
}


function getImageById(node,elementId) {
  var result=null;
  if(node) {
    var list = node.getElementsByTagName("img");
    for(i=0;i<list.length;i++) {
      if(list[i].attributes.getNamedItem("id")) {
        var id=""+list[i].attributes.getNamedItem("id").value;
        if(id==elementId) {
			return list[i];
        }
      }
    }
  }
  return result;
}


function getSpanById(node, targetId) {
  var list = node.getElementsByTagName("span");
  for(i=0;i<list.length;i++) {
    if(list[i].attributes.getNamedItem("id")) {
      var id=""+list[i].attributes.getNamedItem("id").value;
      if(id==targetId) {
        return list[i];
      }
    }
  }
  return null;
}

function getNodeElementById(node,tagName, targetId) {
  var list = node.getElementsByTagName(tagName);
  for(i=0;i<list.length;i++) {
    if(list[i].attributes.getNamedItem("id")) {
      var id=""+list[i].attributes.getNamedItem("id").value;
      if(id==targetId) {
        return list[i];
      }
    }
  }
  return null;
}

function changeSparkStyle(hostEl,sparkId,style) {
return;
			var el = new Array();
			var isOwn;
			try{
				isOwn = document.getElementById("isown_"+sparkId).innerHTML;
				for(var n=1;n<9;n++) {
					el[n] = document.getElementById("sparkBox_"+sparkId+"_"+n);
				}
			}catch(e){
			
				try{
					isOwn = getSpanById(hostEl,"isown_"+sparkId).innerHTML;
			
			
					el[1] = getNodeElementById(hostEl,"img","sparkBox_"+sparkId+"_1");
					el[2] = getNodeElementById(hostEl,"td","sparkBox_"+sparkId+"_2");
					el[3] = getNodeElementById(hostEl,"img","sparkBox_"+sparkId+"_3");
					el[4] = getNodeElementById(hostEl,"td","sparkBox_"+sparkId+"_4");
					el[5] = getNodeElementById(hostEl,"td","sparkBox_"+sparkId+"_5");
					el[6] = getNodeElementById(hostEl,"img","sparkBox_"+sparkId+"_6");
					el[7] = getNodeElementById(hostEl,"td","sparkBox_"+sparkId+"_7");
					el[8] = getNodeElementById(hostEl,"img","sparkBox_"+sparkId+"_8");
				}catch(e2){}
			}
			
			if(style=="normal") {
				
				el[1].src = baseUrl+"/static/geeimages/box_topleft.png";
				el[2].className = "boxhorizontal";
				el[3].src = baseUrl+"/static/geeimages/box_topright.png";
				el[4].className = "boxvertical";
				el[5].className = "boxvertical";
				el[6].src = baseUrl+"/static/geeimages/box_bottomleft.png";
				el[7].className = "boxhorizontal";
				el[8].src = baseUrl+"/static/geeimages/box_bottomright.png";
			}else if(style=="new") {

				el[1].src = baseUrl+"/static/geeimages/box_red_topleft.png";
				el[2].className = "boxhorizontal_red";
				el[3].src = baseUrl+"/static/geeimages/box_red_topright.png";
				el[4].className = "boxvertical_red";
				el[5].className = "boxvertical_red";
				el[6].src = baseUrl+"/static/geeimages/box_red_bottomleft.png";
				el[7].className = "boxhorizontal_red";
				el[8].src = baseUrl+"/static/geeimages/box_red_bottomright.png";	
			}
			
}

/* l√§het√§ sparkki palvelimelle */  	

//ƒLƒ POISTA, tarvitaan nimien updeittiin previewiss‰	
function sendSpark(url,makeOnlyUserList) {

	userListString="";
	recipientListString="";
	/*
		var description = escape(Utf8.encode(document.getElementById("spark_description").value));
		var message = escape(Utf8.encode(document.getElementById("spark_message").value));
		*/
		var description = escape(document.getElementById("sparkMessage").value);
		var message = escape(document.getElementById("sparkEmbed").value);
			
		var to = "";//escape(Utf8.encode(document.getElementById("spark_to").value));
		
		if(document.getElementById("markPrivate").checked)
			markPrivate ="true";
		else
			markPrivate="false";
			
		var form = document.getElementById("sparkForm");
		var elements="";
		var toAll=false;
		for (var i=0; i < form.elements.length; i++) {
		
		
   			var element = form.elements[i];
			if(element.name=="toEmail") {
				if(element.value!="" && element.value.indexOf("@") != -1 && element.value.indexOf(".")){
					userListString+=element.value+",";
					toAll=false;
				}
			}else
			if(element.name=="to") {
				
				
			
				if(element.checked) {
					to+="&to="+element.value;
					if(element.value != 0) {
					
						var d = elementById("U"+element.id.substring(7));
						userListString += d.innerHTML+",";
					}else {
						toAll=true;
					}
				}
			}else 
			if(element.name=="toGroup") {
				
				
			
				if(element.checked) {
					to+="&toGroup="+element.value;
					if(element.value != 0) {
					
						var d = elementById("U"+element.id.substring(7));
						userListString += d.innerHTML+",";
					}else {
						toAll=true;
					}
				}
			}else 
				if(element.name=="toMedia") {
					
					
				
					if(element.checked) {
						to+="&toMedia="+element.value;
						if(element.value != 0) {
						
							var d = elementById("U"+element.id.substring(7));
							userListString += d.innerHTML+",";
						}else {
							toAll=true;
						}
					}
			}
		}
		
		if(toAll)userListString = l10n('spark.label.allfriends')+",";
		
		userListString = userListString.substring(0,userListString.length-1);
		if(to.length > 0) {
			recipientListString = to.substring(1);
		} else {
			recipientListString = to;
		}
		if(typeof(makeOnlyUserList)!='undefined' && makeOnlyUserList==true) {
			return;
		
		}
		
		if(userListString.length==0){alert('No recipients!');return false;}
		
		if((description != '') || (message != '')){
			url = url+"?a=link&spark=true&markRead=false";
			url = url+"&markPrivate="+markPrivate;
			url = url+"&description="+description;
			url = url+"&message="+message;
			url = url+to;
			//document.getElementById("sparkForm").elements["spark_description"].value = ''; // Nollaa description spark formista
			//document.getElementById("sparkForm").elements["spark_message"].value = ''; // nollaa viesti kent√§n formista
			//document.getElementById("sparkStatus").innerHTML = "<h4>Submitted</h4>";
			//setVisibility('sub4','none');
			//document.getElementById("spark_submit").value = "Spark ignited!";
			
			
			userAction(url,false);
			
			//userAction(url,false,'sparkpreview');				
		}
}

function showSparkPreview()
{
	//elementById('sparkCreateDiv').className = "hidden";
	//elementById('sparkPreview').className = "";
	
	//elementById('sparkCreateDiv').style.display = "none";
	elementById('sparkPreview').style.display = "block";
	updateElement(baseUrl+"/html/sparkPreview","sparkPreview","setPreviewUserList");
}
function markAsInappropriate(message,url) {
	var answer = confirm (message,url)
	if (answer){ //mik‰li k‰ytt‰j‰ vastaa kyll‰
		userAction(url,false);
	} else {
		//nothing
	}

}
function openSpark(sparkId)
{
	sparkPollDisable();
	sparkOpen = true;
	
	openChat(sparkId,true);
	//dimmer(true);
	
	/* show all flash and iframes in this spark*/
	var spark = document.getElementById('spark_'+sparkId)
    var flash = spark.getElementsByTagName('embed')
    for (var i = 0; i < flash.length; i++) 
    { 
    	flash[i].style.visibility = 'visible';
    }
	var iframe = document.getElementsByTagName('iframe')
    for (var i = 0; i < iframe.length; i++) 
    { 
    	iframe[i].style.visibility = 'visible';
    }
	
	//setZIndex('spark_'+sparkId,1300);
	
	elementById('sparkOpenLink_'+sparkId).style.display = "none";
	elementById('openChat_'+sparkId).style.display = "none";
	elementById('closeChat_'+sparkId).style.display = "block";
	elementById('sparkCloseLink_'+sparkId).style.display = "inline";
	
}

function closeSpark(sparkId)
{
	sparkOpen = false;
	//closeChat();
	sparkPollEnable();
	//dimmer(false);
	setZIndex('spark_'+sparkId,0);
	elementById('sparkOpenLink_'+sparkId).style.display = "inline";
	elementById('sparkCloseLink_'+sparkId).style.display = "none";
}
function appendContentToElement(source,destination){
	var data = document.getElementById(source).innerHTML;
	var newDiv = document.createElement("div");
	newDiv.innerHTML = data;
	document.getElementById(destination).appendChild(newDiv);	
}