function sendToAllChanged(targetId,allId) {

	try{
		var n=0;
		while(true) {
		if(document.getElementById(targetId+n).disabled==false)
			if(document.getElementById(targetId+n).type == "checkbox")
				document.getElementById(targetId+n).checked = document.getElementById(allId).checked;
			else
				document.getElementById(targetId+n).checked = false;
			
			n++;
		}
	}catch(e) { }
}

function areAllFriendsChecked(targetId) {

	try{
		var n=0;
		while(true) {
			if(document.getElementById(targetId+n).type == "checkbox")
			if(document.getElementById(targetId+n).checked == false)return false;
			
			n++;
		}
	}catch(e) {}
	
	
	return true;
}

function isAnyNewFriendChecked(targetId) {

	try{
		var n=0;
		while(true) {
			if(document.getElementById(targetId+n).type == "checkbox")
			if(document.getElementById(targetId+n).checked == true && !document.getElementById(targetId+n).disabled) return true;
			
			n++;
		}
	}catch(e) {}
	
	
	return false;
}

function uncheck(targetId,type,exceptionId)
{

	if(typeof(exceptionId)=="undefined")
		exceptionId="";
		
	try{
		var n=0;
		while(true) {
		if(document.getElementById(targetId+n).disabled==false)
			if(targetId+n != exceptionId)
			if(document.getElementById(targetId+n).type == type)
				document.getElementById(targetId+n).checked=false;
			
			n++;
		}
	}catch(e) {}
}

function sendToCheckboxChanged(targetId,ob,allId) {

	if(document.getElementById(ob).type == "radio")
	{
		uncheck(targetId,"radio",ob);
		uncheck(targetId,"checkbox");
	
	}else 
	{
		uncheck(targetId,"radio");
	}
		
	if(areAllFriendsChecked(targetId))
		document.getElementById(allId).checked = true;
	else
		document.getElementById(allId).checked = false;
}

function copyContentToElement(sourceElementId,destElementId)
{
	document.getElementById(destElementId).innerHTML = document.getElementById(sourceElementId).innerHTML;
}

function setElementContent(destElementId,content)
{
document.getElementById(destElementId).innerHTML = content;	
}

function setElementStyle(destElementId,style)
{
document.getElementById(destElementId).className = style;	
}


function getElementX( oElement )
{
var iReturnValue = 0;
while( oElement != null ) {
iReturnValue += oElement.offsetLeft;
oElement = oElement.offsetParent;
}
return iReturnValue;
}


function getElementY( oElement )
{
var iReturnValue = 0;
while( oElement != null ) {
iReturnValue += oElement.offsetTop;
oElement = oElement.offsetParent;
}
return iReturnValue;
}

/* Filter list */
function searchNames(inputName,listName){
	var inp = document.getElementById(inputName).value.toLowerCase();
	var lista = document.getElementById(listName);
	var nimet = lista.getElementsByTagName('span');
	var nimi;
	var i;
	for(i = 0; i < nimet.length; i++){
		nimi = nimet[i].firstChild.data.toLowerCase();
		id = nimet[i].id;
		
		if(nimi.search(inp) < 0){
			document.getElementById(id).parentNode.style.display = 'none';
		}else{
			document.getElementById(id).parentNode.style.display = 'block';
		}		
	}
}
function resetFieldIf(fieldName,string){
	var field = document.getElementById(fieldName).value;
	var string;
	if(field == string){
		document.getElementById(fieldName).value = '';
		document.getElementById(fieldName).style.color = '#000000';
	}
}
/* Hide/show elements */
function displayElems(display,name01,name02,name03,name04,name05,name06,name07,name08,name09,name10,name11){
	if(typeof(name01)!='undefined') {
	 	document.getElementById(name01).style.display=display;
	}
	if(typeof(name02)!='undefined') {
	 	document.getElementById(name02).style.display=display;
	}
	if(typeof(name03)!='undefined') {
	 	document.getElementById(name03).style.display=display;
	}
	if(typeof(name04)!='undefined') {
	 	document.getElementById(name04).style.display=display;
	}
	if(typeof(name05)!='undefined') {
	 	document.getElementById(name05).style.display=display;
	}
	if(typeof(name06)!='undefined') {
	 	document.getElementById(name06).style.display=display;
	}
	if(typeof(name07)!='undefined') {
	 	document.getElementById(name07).style.display=display;
	}
	if(typeof(name08)!='undefined') {
	 	document.getElementById(name08).style.display=display;
	}
	if(typeof(name09)!='undefined') {
	 	document.getElementById(name09).style.display=display;
	}
	if(typeof(name10)!='undefined') {
	 	document.getElementById(name10).style.display=display;
	}
	if(typeof(name11)!='undefined') {
	 	document.getElementById(name11).style.display=display;
	}
}
/* Set and reset input field title */
function fieldFocus(id,focus){
	var focus;
	var title = document.getElementById(id).title;
	if(focus == false){
		if(document.getElementById(id).value == ''){
			document.getElementById(id).value = title;
			document.getElementById(id).style.color='gray';
		}
	}else if(focus == true && document.getElementById(id).value == title){
		document.getElementById(id).value = '';
		document.getElementById(id).style.color='black';
	}
}

function ask(message,url){
	var answer = confirm (message)
	if (answer){
		window.location=url;
	} else {
		//nothing
	}

}

function askDelete(message,targetPageScript,param1,url){
	var answer = confirm (message)
	if (answer){
		eval(targetPageScript + '("' + param1  +'");');
		if (url != ''){
		eval('openUrl("'+ url + '");');
		}
	} else {
		//nothing
	}

}


var chatMainDivId = "";
var chatContentDivId="";
function chatSetMainDiv(divId)
{
	chatMainDivId=divId;
}

function chatSetContentDiv(divId)
{
	chatContentDivId=divId;
}

function chatGetMainDiv()
{
	return document.getElementById(chatMainDivId);
}

function chatGetContentDiv()
{
	return document.getElementById(chatContentDivId);
}

function chatAllowScroll(value)
{	
	chatPollerScrollToBottomAllowed=value;
}

function chatScroll(direction)
{

	var mainDiv = chatGetMainDiv();
	var contentDiv = chatGetContentDiv();
	var newdiv = document.createElement('div');
	var s = contentDiv.style.top;
	s=s.replace(/[px]/g,""); 
	var oldOffset = parseInt(s);
	var newOffset = oldOffset;
	
	if(direction==0)
		newOffset=oldOffset+(mainDiv.offsetHeight-25);
	else
		newOffset=oldOffset-(mainDiv.offsetHeight-25);
		

	if(newOffset<-(contentDiv.offsetHeight - mainDiv.offsetHeight))
	newOffset = -(contentDiv.offsetHeight - mainDiv.offsetHeight);
	if(newOffset>0)
		if(mainDiv.offsetHeight<contentDiv.offsetHeight) 
			newOffset=0;
		else
			newOffset=oldOffset;
	contentDiv.style.top = newOffset+"px";
	chatScrollPercent = chatGetCurrentOffset() / chatGetBottomOffset();
	
		
	//document.getElementById('test3').innerHTML = percent;
	//document.getElementById('liftspacer_'+chatSparkId).style.height = parseInt(chatScrollPercent*110)+"px";
	//document.getElementById('test3').innerHTML = percent;
	//document.getElementById('chatScrollBar').style.width = parseInt(percent*100)+"px";
}

function chatLiftClick()
{
	alert(parseInt(chatScrollPercent*110));
}

function chatScrollToBottom(nofocus)
{
	document.getElementById("sparkAnchor_"+chatSparkId).focus();
	
	if(typeof(nofocus)=="undefined" || nofocus==false) {
		elementById("sparkForm_"+chatSparkId).v1.focus();
	}
/*
	var contentDiv = chatGetContentDiv();
	var mainDiv = chatGetMainDiv();

	chatScrollPercent=1;
	contentDiv.style.top = -(contentDiv.offsetHeight - mainDiv.offsetHeight)+"px";
	
	chatGetContentDiv().style.top = -(contentDiv.offsetHeight - mainDiv.offsetHeight)+"px";
	*/
	
	//document.getElementById('liftspacer_'+chatSparkId).style.height = parseInt(110)+"px";
}

function chatGetCurrentOffset()
{
	var s = chatGetContentDiv().style.top;
	s=s.replace(/[px]/g,""); 
	return parseInt(s);
}
	
function chatGetBottomOffset() 
{
	var contentDiv = chatGetContentDiv();
	var mainDiv = chatGetMainDiv();
	return -(contentDiv.offsetHeight - mainDiv.offsetHeight); 
}
function setZIndex(id,value) 
{
	var id;
	document.getElementById(id).style.zIndex = value;
	//document.getElementById(id).style.border = '1px solid red';
}
function dimmer(mode){
	var mode;
	if(mode == true){
		/* hide all flash and iframes in the page */
        var flash = document.getElementsByTagName('embed')
        for (var i = 0; i < flash.length; i++) 
        { 
        	flash[i].style.visibility = 'hidden';
        }
        var flash2 = document.getElementsByTagName('object')
        for (var i = 0; i < flash2.length; i++) 
        { 
        	flash2[i].style.visibility = 'hidden';
        }
        var iframe = document.getElementsByTagName('iframe')
        for (var i = 0; i < iframe.length; i++) 
        { 
        	iframe[i].style.visibility = 'hidden';
        }
		var height2 = getElementY(document.getElementById("footerDiv"));
		var height = document.documentElement.scrollHeight;
		document.getElementById("dimmer").style.display = 'block';
		if(height2 > height){
			height = height2+30;
		}
		
		document.getElementById("dimmer").style.height = height+'px';
	}else{
		document.getElementById("dimmer").style.display = 'none';
		/* show all flash and iframes*/
        flash = document.getElementsByTagName('embed')
        for (var i = 0; i < flash.length; i++) 
        { 
        	flash[i].style.visibility = 'visible';
        }
        var flash2 = document.getElementsByTagName('object')
        for (var i = 0; i < flash2.length; i++) 
        { 
        	flash2[i].style.visibility = 'visible';
        }
		var iframe = document.getElementsByTagName('iframe')
        for (var i = 0; i < iframe.length; i++) 
        { 
        	iframe[i].style.visibility = 'visible';
        }
	}
}
function dimmerUpdate(){
	var height2 = getElementY(document.getElementById("footerDiv"));
	var height = document.documentElement.scrollHeight;
	if(height2 > height){
		height = height2+30;
	}	
	document.getElementById("dimmer").style.height = height+'px';
}