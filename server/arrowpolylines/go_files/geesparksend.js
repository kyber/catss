
	//ÄLÄ SIIRRÄ TÄTÄ KOODIA ALAS
	//metodin pitää olla jo muistissa kun alla oleva iframe latautuu
	//muuten google selaimella tulee error
	var iframeloaded=false;
	var sparkSubmitFlag=false;
	function sparkIFrameLoaded()
	{
		if(iframeloaded==false){iframeloaded=true;return; }
		//elementById('sparkForm').target = "_self";
	
		if(sparkSubmitFlag==true) {
			location.reload(true);
		}else {
			showSparkPreview();
		}
	}

function loadTargets()
{
loadContentToElement('${appbase}/sparkTargets',document.getElementById('sendSparkTargetsDiv'),null);
}

function displayCreateSpark()
{
	Effect.toggle('createSparkDiv','BLIND');
//document.getElementById('createSparkDiv').style.display = "block";
}

function hideCreateSpark()
{
Effect.toggle('createSparkDiv','BLIND');

//document.getElementById('createSparkDiv').style.display = "none";
}

function showSendToList() {
	Effect.toggle('chooseResipientsDiv','blind');
	document.getElementById("sparkTargetsBlock").className="hidden";
}

function hideSendToList(noToggle) {

	sendSpark(null,true);//just to get name strings right
	if(userListString.length==0){alert('No recipients!');return;}

	if(typeof(noToggle)=="undefined") {
		Effect.toggle('chooseResipientsDiv','blind');
	}
	
	document.getElementById("sparkTargetsBlock").className="";
	
	
	var userListStringSmall = userListString;
	if(userListStringSmall.length > 80) {
		userListStringSmall = userListStringSmall.substring(0,80)+"..";
	}
	document.getElementById('targets').innerHTML = userListStringSmall;


}
function sendPreviewSpark() {
	sparkSubmitFlag=true;
	document.sparkForm2.submit();
	
}

var formType = "wfm/link";
function sparkSend()
{
	sparkSubmitFlag=true;
	elementById('formAction').value='accept';
	elementById('formType').value=formType;
	//displayElems('none','sparkCreateDiv');
	//startBusyIndicatorCustom('sparkPreview');
	//displayElems('block','sparkPreview');
	
	submitSparkForm();
}

function sparkPreview()
{
	if(elementById('sparkMessage').value == elementById('sparkMessage').title || elementById('sparkMessage').value=='') {
		alert('Message required');
		return;
	}
	
		//	<input type="hidden" name="a" value="accept" id="formAction">
	//	<input type="hidden" name="type" value="wfm/image" id="formType"/>
	
	
	sendSpark(null,true);
	sparkSubmitFlag=false; 
	elementById('formAction').value='binary';
	elementById('formType').value=formType;
	
	displayElems('none','sparkCreateDiv');
	startBusyIndicatorCustom('sparkPreview');
	displayElems('block','sparkPreview');

	
	
	
	submitSparkForm();
}

function submitSparkForm()
{
	if(elementById('sparkMessage').value == elementById('sparkMessage').title || elementById('sparkMessage').value=='') {
		alert('Message required');
		return;
	}
	
	if(elementById('sparkEmbed').value == elementById('sparkEmbed').title) {
		elementById('sparkEmbed').value='';
		
	}
	
	//displayElems('block','sparkPreview');
	//displayElems('none','sparkCreateDiv');
	
	document.sparkForm.submit();
}




function changeFileAddedInfo(inputFieldId)
{
	if(inputFieldId=='musicFileInput') {
		document.getElementById('fileAddedInfo').innerHTML='(Music file added.)';
		document.getElementById('musicFileInput').name="file";
		document.getElementById('imageFileInput').name="fileNone";
		formType = "wfm/binary";
	}else{
		
		document.getElementById('fileAddedInfo').innerHTML='(Picture file added.)';
		document.getElementById('musicFileInput').name="fileNone";
		document.getElementById('imageFileInput').name="file";
		formType = "wfm/image";
	}
}



var fileInputFilled=0;

function fileInputChanged(id)
{
	if(id=='musicFileInput') {
		fileInputFilled=1;
	}else{
		fileInputFilled=2;
	}
	
	changeFileAddedInfo(id);

	//empty other file input fields when one is changed
	
	var elToChange='musicFileInput';
	if(id=='musicFileInput')elToChange='imageFileInput';
	
	document.getElementById(elToChange).value="";
}

var backEmbed,backImeemQuery,backMusicFile,backImageFile;
function backupInputValues()
{
	backEmbed = elementById('sparkEmbed').value;
	backImeemQuery = elementById('imeemQuery').value;
	//backMusicFile = elementById('musicFileInput').value;
	//backImageFile = elementById('imageFileInput').value;
}

function restoreInputValues()
{
	elementById('sparkEmbed').value = backEmbed;
	elementById('imeemQuery').value = backImeemQuery;
	//elementById('musicFileInput').value = backMusicFile;
	//elementById('imageFileInput').value = backImageFile;
	
	elementById('musicFileInput').value = '';
	elementById('imageFileInput').value = '';
	document.getElementById('fileAddedInfo').innerHTML='';
}


function imeemSearchSubmit(e)
{
	if(window.event) // IE
	{
		keynum = e.keyCode;
	}
	else if(e.which) // Netscape/Firefox/Opera
	{
		keynum = e.which;
	}
	
	if(keynum==13)
	{
		doImeemSearch();
	}
}
function doImeemSearch()
{
	imeemSearch();
	displayElems('none','musicFileDiv');
}



function hideMusicPreview()
{
	elementById('imeemIFrame').src = "";
}