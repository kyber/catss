var fvInt=td_fV.substring(0,td_fV.indexOf(','));
td_strFlash+='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"';
td_strFlash+=' codebase="https://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version='+td_fV+'"';
td_strFlash+=' width="'+td_width+'" height="'+td_height+'" wmode="'+td_flashWindowMode+'" ID="td_flash" NAME="td_flash">\n';
if(fvInt>5){td_strFlash+='<param name="movie" value="'+td_flashFile+'">\n<param name="FlashVars" value="clickTAG='+td_linkUrl+'&CLICKTAG='+td_linkUrl+'&clicktag='+td_linkUrl+'&clickTag='+td_linkUrl+'&ClickTag='+td_linkUrl+'">\n';
}else{td_strFlash+='<param name="movie" value="'+td_flashFile+'?clickTAG='+td_linkUrl+'&CLICKTAG='+td_linkUrl+'&clicktag='+td_linkUrl+'&clickTag='+td_linkUrl+'&ClickTag='+td_linkUrl+'&">\n';}
td_strFlash+='<param name="wmode" value="'+td_flashWindowMode+'">\n';
td_strFlash+='<param name="quality" value="best">\n';
td_strFlash+='<param name="menu" value="false">\n';
if(fvInt>5){td_strFlash+='<embed src="'+td_flashFile+'" flashVars="clickTAG='+td_linkUrl+'&CLICKTAG='+td_linkUrl+'&clicktag='+td_linkUrl+'&clickTag='+td_linkUrl+'&ClickTag='+td_linkUrl+'" menu="false" quality="best" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash" swLiveConnect="true"';}
else{td_strFlash+='<embed src="'+td_flashFile+'?clickTAG='+td_linkUrl+'&CLICKTAG='+td_linkUrl+'&clicktag='+td_linkUrl+'&clickTag='+td_linkUrl+'&ClickTag='+td_linkUrl+'" menu="false" quality="best" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash" swLiveConnect="true"';}
td_strFlash+=' width="'+td_width+'" height="'+td_height+'" wmode="'+td_flashWindowMode+'" ID="td_flash" NAME="td_flash"></embed></object>';
td_strBackup+='<a href="'+td_backupLinkUrl+'" target="_blank"><img src="'+td_backupImage+'" width="'+td_width+'" height="'+td_height+'" alt="" border="0"></a>';
if(td_fI>1&&td_bFV*1>=fvInt){
document.write(td_strFlash);}else{
document.write(td_strBackup);}