
var sn_eventtype, sn_value, sn_message, sn_reference, sn_revenue, sn_margin, sn_amount, sn_currency, sn_products;
document.cookie="Snoop_testi=1; path=/";

try{
	localStorage.setItem("snb_ls_test",Math.floor(Math.random()*1100)); 
}
catch(e){}

if (!window.snoobi){
  snoobi=new Object();
  snoobi.tilit=new Array();
}

snoobi.duplicate=0;
for (snoobi.loop=0; snoobi.loop<snoobi.tilit.length; snoobi.loop++){
  if (snoobi.tilit[snoobi.loop].tili=="aamulehti_fi") snoobi.duplicate=1;
}
if (snoobi.duplicate==0){

snoobi.num=snoobi.tilit.length;
snoobi.tilit[snoobi.num]=new Object();

snoobi.haePipari = function(cookieName){
   var cookieBeg, cookieEnd;
   var cookieJar = document.cookie;
   cookieBeg = cookieJar.indexOf(cookieName+"=",0);
   if(cookieBeg < 0) return "";
   else cookieBeg +=  cookieName.length + 1;
   cookieEnd = cookieJar.indexOf(";",cookieBeg);
   if(cookieEnd < 0)cookieEnd = cookieJar.length;
   return unescape(cookieJar.substring(cookieBeg,cookieEnd));
}

snoobi.ucsToUtf8 = function(s){
    s=s.replace(/\r\n/g,"\n");
    var u="";
    for (var n=0; n<s.length; n++){
        var c = s.charCodeAt(n);
        if (c < 128) u += String.fromCharCode(c);
        else if((c > 127) && (c < 2048)){
            u += String.fromCharCode((c >> 6) | 192);
            u += String.fromCharCode((c & 63) | 128);
        }
        else{
            u += String.fromCharCode((c >> 12) | 224);
            u += String.fromCharCode(((c >> 6) & 63) | 128);
            u += String.fromCharCode((c & 63) | 128);
        }
    }
    return u;
}

snoobi.getFlashVersion = function(){
  this.fv = 0;
  this.MSDetect = false;
  if (navigator.plugins && navigator.plugins.length) {
    this.sn_x = navigator.plugins["Shockwave Flash"];
    if (this.sn_x) {
      if (this.sn_x.description) {
        this.sn_desc = this.sn_x.description;
        this.fv = this.sn_desc.charAt(this.sn_desc.indexOf('.')-1);
                if(this.fv==0){
                this.fv = this.sn_desc.substr((this.sn_desc.indexOf('.')-2),2);
        }
      }
    }
    else this.fv = 0;
    if (navigator.plugins["Shockwave Flash 2.0"]) this.fv = 2;
  }
  else if (navigator.mimeTypes && navigator.mimeTypes.length) {
    this.sn_x = navigator.mimeTypes['application/x-shockwave-flash'];
    if (this.sn_x && this.sn_x.enabledPlugin) this.fv = 99;
    else this.fv = 0;
  }
  else this.MSDetect = true;
  if (this.MSDetect == true) {
    this.fv = 0;
    try{
      this.sn_flash = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
      this.fv = this.sn_flash.GetVariable('$version').substring(4);
      this.fv = this.fv.split(',');
      this.fv = parseFloat(this.fv[0] + '.' + this.fv[1]);
    } catch(e){}
  }
}

snoobi.tilit[snoobi.num].initData = function () {
  if (document.cookie.length == 0) snoobi.ck=0;
  else {
    snoobi.ck=1;
    this.id = snoobi.haePipari('Snoobisession_aamulehti_fi');
    this.id30m = snoobi.haePipari('Snoobi30minute_aamulehti_fi');
    this.hid = snoobi.haePipari('SnoobiID');
  }
  try{
    this.trf=window.top.document.referrer ? window.top.document.referrer : "";
    this.thn=window.top.location.hostname ? window.top.location.hostname : "";
    this.tpn=window.top.location.pathname ? window.top.location.pathname : "";
    this.tqr=window.top.location.search ? window.top.location.search : "";
  }
  catch(errori){
    try{
      this.trf=window.parent.document.referrer ? window.parent.document.referrer : "";
      this.thn=window.parent.location.hostname ? window.parent.location.hostname : "";
      this.tpn=window.parent.location.pathname ? window.parent.location.pathname : "";
      this.tqr=window.parent.location.search ? window.parent.location.search : "";
    }
    catch(errori4){
      this.trf=window.document.referrer ? window.document.referrer : "";
      this.thn=window.location.hostname ? window.location.hostname : "";
      this.tpn=window.location.pathname ? window.location.pathname : "";
      this.tqr=window.location.search ? window.location.search : "";
    }
  }
  try{ snoobi.rs=(screen.width && screen.height) ? screen.width+' x '+screen.height : ""; }
  catch(errori2){ snoobi.rs=""; }
  try{ snoobi.cd=screen.colorDepth ? screen.colorDepth : ""; }
  catch(errori3){ snoobi.cd=""; }

  try
  {
	this.lshid = localStorage.getItem("snb_ls_hid");
  }
  catch(e4){ this.lshid=""; }
  
  try
  {                     
        this.lstest = localStorage.getItem("snb_ls_test");            
  }
  catch(e5){ this.lstest=""; }

  this.trackingScript = window.location.protocol + "//eu1.snoobi.com/snoop2.php";
  this.tili="aamulehti_fi";
  this.page_name="";
  this.section="";
  this.addurl="";
  snoobi.an=navigator.appName ? navigator.appName : "";
  snoobi.sl=navigator.systemLanguage ? navigator.systemLanguage : "";
  snoobi.av=navigator.appVersion ? navigator.appVersion : "";
  snoobi.la=navigator.language ? navigator.language : "";
  snoobi.pf=navigator.platform ? navigator.platform : "";
  snoobi.cs=document.characterSet ? document.characterSet : (document.charset?document.charset:"");
  this.rf=document.referrer ? document.referrer : "";
  this.dt=document.title ? document.title.substr(0,240) :  "";
  this.hn=window.location.hostname ? window.location.hostname : "";
  this.pn=window.location.pathname ? window.location.pathname : "";
  this.qr=window.location.search ? window.location.search : "";
  this.orighref=window.location.href ? window.location.href : "";
  this.hl=history.length ? history.length : "";
  this.etype=sn_eventtype ? sn_eventtype : "";
  this.eval=sn_value ? sn_value : "";
  this.emsg=sn_message ? sn_message : "";
  this.eref=sn_reference ? sn_reference : "";
  this.erev=sn_revenue ? sn_revenue : "";
  this.emar=sn_margin ? sn_margin : "";
  this.eamo=sn_amount ? sn_amount : "";
  this.ecur=sn_currency ? sn_currency : "";
  this.epro=sn_products ? sn_products : "";
  snoobi.je=navigator.javaEnabled() ? 1 : 0;
  snoobi.getFlashVersion();
}

snoobi.tilit[snoobi.num].getTrackUrl = function (mode) {
  this.date=new Date();
  var amp="&";
  if (mode=="html") amp="&amp;";


	if( typeof(snoobiTrans) == 'object' && snoobiTrans instanceof SnoobiTrans || typeof(snoobiCart) == 'object' && snoobiCart instanceof SnoobiCart  )
		var trans = amp+'trans=1'
	else
		var trans = ''

  if(this.lshid!="" && this.lshid!==null) var plshid = amp+'lshid='+escape(this.lshid);
  if(this.lstest!="" && this.lstest!==null) var plstest = amp+'lstest='+escape(this.lstest);

  var segment = (typeof this.segment != 'undefined') ? amp+'segment='+escape(this.segment) : '';
 
  return this.trackingScript+'?'+
  'tili='+escape(this.tili)+
  amp+'page_name='+encodeURIComponent(this.page_name)+
  amp+'section='+encodeURI(this.section)+
  amp+'addurl='+encodeURIComponent(this.addurl)+
  amp+'an='+escape(snoobi.an)+
  amp+'ck='+escape(snoobi.ck)+
  amp+'sl='+escape(snoobi.sl)+
  amp+'av='+escape(snoobi.av)+
  amp+'la='+escape(snoobi.la)+
  amp+'pf='+escape(snoobi.pf)+
  amp+'cs='+escape(snoobi.cs)+
  amp+'rf='+escape(this.rf)+
  amp+'dt='+escape(snoobi.ucsToUtf8(this.dt))+
  amp+'trf='+escape(this.trf)+
  amp+'hn='+escape(this.hn)+
  amp+'pn='+escape(this.pn)+
  amp+'qr='+escape(this.qr)+
  amp+'hl='+escape(this.hl)+
  amp+'id='+escape(this.id)+
  amp+'id30m='+escape(this.id30m)+
  amp+'hid='+escape(this.hid)+
  amp+'etype='+escape(this.etype)+
  amp+'eval='+escape(this.eval)+
  amp+'emsg='+escape(this.emsg)+
  amp+'eref='+escape(this.eref)+
  amp+'erev='+escape(this.erev)+
  amp+'emar='+escape(this.emar)+
  amp+'eamo='+escape(this.eamo)+
  amp+'ecur='+escape(this.ecur)+
  amp+'epro='+escape(this.epro)+
  amp+'rs='+escape(snoobi.rs)+
  amp+'cd='+escape(snoobi.cd)+
  amp+'je='+escape(snoobi.je)+
  amp+'fv='+escape(snoobi.fv)+
  amp+'ti='+escape(this.date.getMinutes()+''+this.date.getSeconds()+''+this.date.getMilliseconds())
  +trans
  +segment
  +plshid
  +plstest;
}

snoobi.tilit[snoobi.num].sendData = function () {
  this.SNB_im = new Image();
  this.SNB_im.src = this.getTrackUrl("url");
}

snoobi.tilit[snoobi.num].trackPageView = function(path, pagename, section) {
  if (snoobi.ck==1){
    this.id = snoobi.haePipari('Snoobisession_aamulehti_fi');
    this.id30m = snoobi.haePipari('Snoobi30minute_aamulehti_fi');
    this.hid = snoobi.haePipari('SnoobiID');
  }

  if (path=="") path="/undefined";
  this.page_name="";
  this.section="";
  if (pagename!=null && pagename!="" && pagename!="undefined") this.page_name=pagename;
  if (section!=null && section!="" && section!="undefined") this.section=section;
  this.dt=this.page_name;
  this.pn=path;
  this.qr="";
  this.addurl="";
  this.rf=this.orighref;
  this.trf=this.rf;
  this.thn=this.hn;
  this.tpn=this.pn;
  this.tqr=this.qr;
  this.sendData();
}

snoobi.tilit[snoobi.num].trackEvent = function() {


}

snoobi.addListener = function(obj,func,action){
        if (obj.addEventListener) {
                obj.addEventListener(action,func,false);
        }
        else if (obj.attachEvent){
                obj.attachEvent("on" + action,func);
        }
}

snoobi.trackFiles = function(SNB_event) {
        var e_url='';
        var e_hn='';
        var e_pn='';
        var e_qr='';
        var e_name='';
        var e_desc='';
        if (SNB_event.srcElement) {
                var SNB_element = SNB_event.srcElement;
                while (SNB_element.tagName.toLowerCase() != "a" && SNB_element.tagName.toLowerCase() != "area") {
                  var SNB_new_element = SNB_element.parentNode;
                  SNB_element = SNB_new_element;
                }
                e_hn = SNB_element.hostname;
                e_pn = "/" + SNB_element.pathname;
                e_qr = SNB_element.search;
                e_desc = SNB_element.innerHTML;
		e_title = SNB_element.title;
        }
        else{
                e_hn = this.hostname;
                e_pn = this.pathname;
                e_qr = this.search;
                e_desc = this.innerHTML;
		e_title = this.title;
        }
        e_url=e_hn+e_pn+e_qr;
        var linkName = '';
        if(e_name){
                linkName = e_name;
        }
        else if(e_desc){
                linkName = e_desc;
        }

  for (snoobi.num=0; snoobi.num<snoobi.tilit.length; snoobi.num++){
        if(snoobi.tilit[snoobi.num].inDocuments(e_url) && snoobi.tilit[snoobi.num].autoTrackFiles==true){
          snoobi.tilit[snoobi.num].initData();
          snoobi.tilit[snoobi.num].page_name="";

          try{
                if(snoobi.tilit[snoobi.num].filesAutoNameFrom=='inner'){
                        snoobi.tilit[snoobi.num].page_name=snoobi.tilit[snoobi.num].filesPrefix+e_desc;
                }
                else if(snoobi.tilit[snoobi.num].linksAutoNameFrom=='title'){
                        snoobi.tilit[snoobi.num].page_name=snoobi.tilit[snoobi.num].filesPrefix+e_title;
                 }
          }
          catch(e){}

          snoobi.tilit[snoobi.num].dt=snoobi.tilit[snoobi.num].page_name;
          snoobi.tilit[snoobi.num].hn=e_hn;
          snoobi.tilit[snoobi.num].pn=e_pn;
          snoobi.tilit[snoobi.num].qr=e_qr;
          snoobi.tilit[snoobi.num].addurl="";
          snoobi.tilit[snoobi.num].rf=snoobi.tilit[snoobi.num].orighref;
          snoobi.tilit[snoobi.num].trf=snoobi.tilit[snoobi.num].rf;
          snoobi.tilit[snoobi.num].thn=snoobi.tilit[snoobi.num].hn;
          snoobi.tilit[snoobi.num].tpn=snoobi.tilit[snoobi.num].pn;
          snoobi.tilit[snoobi.num].tqr=snoobi.tilit[snoobi.num].qr;
          snoobi.tilit[snoobi.num].section="";
          if(snoobi.tilit[snoobi.num].filesSection!="") snoobi.tilit[snoobi.num].section=snoobi.tilit[snoobi.num].filesSection;
          snoobi.tilit[snoobi.num].sendData();
        }
  }
  return '1';
}

snoobi.trackLinks = function(SNB_event){
        var e_lnk='';
        var e_name='';
        var e_desc='';
        if (SNB_event.srcElement) {
                var SNB_element = SNB_event.srcElement;
                while (SNB_element.tagName.toLowerCase() != "a" && SNB_element.tagName.toLowerCase() != "area") {
                        var SNB_new_element = SNB_element.parentNode;
                        SNB_element = SNB_new_element;
                }
                e_lnk = SNB_element.hostname + "/" + SNB_element.pathname + SNB_element.search;
                e_desc = SNB_element.innerHTML;
		e_title = SNB_element.title;
        }
        else{
                e_lnk = this.hostname + this.pathname + this.search;
                e_desc = this.innerHTML;
		e_title = this.title;

        }
      for (snoobi.num=0; snoobi.num<snoobi.tilit.length; snoobi.num++){
        if(!snoobi.tilit[snoobi.num].inSites(e_lnk) && snoobi.tilit[snoobi.num].autoTrackExternals==true){
          snoobi.tilit[snoobi.num].initData();

  	  snoobi.tilit[snoobi.num].page_name='';
	  try{
		if(snoobi.tilit[snoobi.num].linksAutoNameFrom=='inner'){
			snoobi.tilit[snoobi.num].page_name=snoobi.tilit[snoobi.num].linksPrefix+e_desc;
	  	}
	 	else if(snoobi.tilit[snoobi.num].linksAutoNameFrom=='title'){
			snoobi.tilit[snoobi.num].page_name=snoobi.tilit[snoobi.num].linksPrefix+e_title;
	 	 }
	  }
	  catch(e){}

          snoobi.tilit[snoobi.num].dt=snoobi.tilit[snoobi.num].page_name;
          snoobi.tilit[snoobi.num].pn="/outlink/"+e_lnk;
          snoobi.tilit[snoobi.num].qr="";
          snoobi.tilit[snoobi.num].addurl="";
          snoobi.tilit[snoobi.num].rf=snoobi.tilit[snoobi.num].orighref;
          snoobi.tilit[snoobi.num].trf=snoobi.tilit[snoobi.num].rf;
          snoobi.tilit[snoobi.num].thn=snoobi.tilit[snoobi.num].hn;
          snoobi.tilit[snoobi.num].tpn=snoobi.tilit[snoobi.num].pn;
          snoobi.tilit[snoobi.num].tqr=snoobi.tilit[snoobi.num].qr;
          snoobi.tilit[snoobi.num].section="";
          if(snoobi.tilit[snoobi.num].linksSection!="") snoobi.tilit[snoobi.num].section=snoobi.tilit[snoobi.num].linksSection;
          snoobi.tilit[snoobi.num].sendData();
        }
      }
      return '1';
}

snoobi.trackEmails = function(SNB_event){
        var e_href='';
        if (SNB_event.srcElement) {
                var SNB_element = SNB_event.srcElement;
                while (SNB_element.tagName.toLowerCase() != "a" && SNB_element.tagName.toLowerCase() != "area") {
                        var SNB_new_element = SNB_element.parentNode;
                        SNB_element = SNB_new_element;
                }
                e_href = SNB_element.href;
                e_desc = SNB_element.innerHTML;
                e_title = SNB_element.title;
        }
        else{
                e_href = this.href;
                e_desc = this.innerHTML;
                e_title = this.title;

        }
        var e_to=e_href.substr(7);

      for (snoobi.num=0; snoobi.num<snoobi.tilit.length; snoobi.num++){
        if(e_href.substr(0,7).toLowerCase()=="mailto:" && snoobi.tilit[snoobi.num].autoTrackEmails==true){
          snoobi.tilit[snoobi.num].initData();
          snoobi.tilit[snoobi.num].page_name="";
          try{
                if(snoobi.tilit[snoobi.num].emailsAutoNameFrom=='inner'){
                        snoobi.tilit[snoobi.num].page_name=snoobi.tilit[snoobi.num].emailsPrefix+e_desc;
                }
                else if(snoobi.tilit[snoobi.num].emailsAutoNameFrom=='title'){
                        snoobi.tilit[snoobi.num].page_name=snoobi.tilit[snoobi.num].emailsPrefix+e_title;
                 }
          }
          catch(e){}

          snoobi.tilit[snoobi.num].dt=snoobi.tilit[snoobi.num].page_name;
          snoobi.tilit[snoobi.num].pn="/mailto/"+e_to;
          snoobi.tilit[snoobi.num].qr="";
          snoobi.tilit[snoobi.num].addurl="";
          snoobi.tilit[snoobi.num].rf=snoobi.tilit[snoobi.num].orighref;
          snoobi.tilit[snoobi.num].trf=snoobi.tilit[snoobi.num].rf;
          snoobi.tilit[snoobi.num].thn=snoobi.tilit[snoobi.num].hn;
          snoobi.tilit[snoobi.num].tpn=snoobi.tilit[snoobi.num].pn;
          snoobi.tilit[snoobi.num].tqr=snoobi.tilit[snoobi.num].qr;
          snoobi.tilit[snoobi.num].section="";
          if(snoobi.tilit[snoobi.num].emailsSection!="") snoobi.tilit[snoobi.num].section=snoobi.tilit[snoobi.num].emailsSection;
          snoobi.tilit[snoobi.num].sendData();
        }
      }
      return '1';
}


snoobi.tilit[snoobi.num].inSites = function(SNB_host){
        if(SNB_host.length==0) return true;
        if(this.sites.length==0) return true;
        for(z=0; z<this.includedSites.length; z++){
          if(this.includedSites[z].length==0) return true;
          reg = new RegExp(this.includedSites[z],"ig");
          if(reg.test(SNB_host)==true) return false;
        }
        for(z=0; z<this.sites.length; z++){
          if(this.sites[z].length==0) return true;
          reg = new RegExp(this.sites[z],"ig");
          if(reg.test(SNB_host)==true) return true;
        }
        reg = new RegExp("redir\.snoobi\.com","ig");
        if(reg.test(SNB_host)==true) return true;
        return false;
}



snoobi.addListeners = function(){
  //if (snoobi.oldOnload) { snoobi.oldOnload(); }
  for (snoobi.num=0; snoobi.num<snoobi.tilit.length; snoobi.num++){
         if (document.getElementsByTagName){
            var lnk_tags = new Array();
            lnk_tags[0]="a";
            lnk_tags[1]="area";
            for (tagi in lnk_tags){
                var hrefs = document.getElementsByTagName(lnk_tags[tagi]);
                for (var c = 0; c < hrefs.length; c++){
                        if (!hrefs[c].getAttribute("href")) continue;
                        if (hrefs[c].href.substr(0,11).toLowerCase()=="javascript:") continue;
                        if(hrefs[c].href.substr(0,7).toLowerCase()=="mailto:" && snoobi.tilit[snoobi.num].autoTrackEmails==true){
                                if(snoobi.debug) alert("Add mailtolistener:"+hrefs[c]);
                                snoobi.addListener(hrefs[c],snoobi.trackEmails,snoobi.tilit[snoobi.num].trackOnAction);
                        }
                        else if(!snoobi.tilit[snoobi.num].inSites(hrefs[c].href.replace(hrefs[c].protocol+"//","")) && snoobi.tilit[snoobi.num].autoTrackExternals==true){
                                if(snoobi.debug) alert("Add linklistener:"+hrefs[c]);
                                snoobi.addListener(hrefs[c],snoobi.trackLinks,snoobi.tilit[snoobi.num].trackOnAction);
                        }
                        else if(snoobi.tilit[snoobi.num].inDocuments(hrefs[c]) && snoobi.tilit[snoobi.num].autoTrackFiles==true){
                                if(snoobi.debug) alert("Add documentlistener:"+hrefs[c]);
                                snoobi.addListener(hrefs[c],snoobi.trackFiles,snoobi.tilit[snoobi.num].trackOnAction);
                        }
                        else{
                                if(snoobi.debug) alert("No listener added: "+hrefs[c]);
                        }
                }
            }
        }
  }
}

snoobi.tilit[snoobi.num].inDocuments = function(SNB_lnk){
        if(SNB_lnk.length==0) return false;
        if(this.trackExtensions.length==0) return false;
        for(z=0; z<this.trackExtensions.length; z++){
          reg = new RegExp(this.trackExtensions[z],"ig");
          if (reg.test(SNB_lnk)==true) return true;
        }
        return false;
}

snoobi.trackPageView = function(path,page_name, section){
  for (snoobi.num=0; snoobi.num<snoobi.tilit.length; snoobi.num++){
    snoobi.tilit[snoobi.num].trackPageView(path, page_name, section);
  }
}

snoobi.trackEvent = function(){
  for (snoobi.num=0; snoobi.num<snoobi.tilit.length; snoobi.num++){
    snoobi.tilit[snoobi.num].trackEvent();
  }
}


snoobi.tilit[snoobi.num].initData();

snoobi.debug=false;
snoobi.dtxt="";

snoobi.tilit[snoobi.num].autoTrackExternals = '';
snoobi.tilit[snoobi.num].autoTrackFiles = '';
snoobi.tilit[snoobi.num].autoTrackEmails = '';
snoobi.tilit[snoobi.num].linksPrefix = '';
snoobi.tilit[snoobi.num].linksSection = '';
snoobi.tilit[snoobi.num].filesPrefix = '';
snoobi.tilit[snoobi.num].filesSection = '';
snoobi.tilit[snoobi.num].emailsPrefix = '';
snoobi.tilit[snoobi.num].emailsSection = '';
snoobi.tilit[snoobi.num].trackOnAction = 'mousedown';
snoobi.tilit[snoobi.num].linksAutoNameFrom = '';
snoobi.tilit[snoobi.num].emailsAutoNameFrom = '';
snoobi.tilit[snoobi.num].filesAutoNameFrom = '';
snoobi.tilit[snoobi.num].trackExtensions = new Array(); 
snoobi.tilit[snoobi.num].trackExtensions[0] = '\\\.doc\$'; 
snoobi.tilit[snoobi.num].trackExtensions[1] = '\\\.xls\$'; 
snoobi.tilit[snoobi.num].trackExtensions[2] = '\\\.exe\$'; 
snoobi.tilit[snoobi.num].trackExtensions[3] = '\\\.zip\$'; 
snoobi.tilit[snoobi.num].trackExtensions[4] = '\\\.pdf\$'; 
snoobi.tilit[snoobi.num].trackExtensions[5] = '\\\.gif\$'; 
snoobi.tilit[snoobi.num].trackExtensions[6] = '\\\.jpg\$'; 
snoobi.tilit[snoobi.num].trackExtensions[7] = '\\\.txt\$'; 
snoobi.tilit[snoobi.num].trackExtensions[8] = '\\\.png\$'; 
snoobi.tilit[snoobi.num].trackExtensions[9] = '\\\.eps\$'; 
snoobi.tilit[snoobi.num].trackExtensions[10] = '\\\.wmv\$'; 
snoobi.tilit[snoobi.num].trackExtensions[11] = '\\\.mov\$'; 
snoobi.tilit[snoobi.num].trackExtensions[12] = '\\\.avi\$'; 
snoobi.tilit[snoobi.num].trackExtensions[13] = '\\\.jpeg\$'; 
snoobi.tilit[snoobi.num].sites = new Array(); 
snoobi.tilit[snoobi.num].sites[0] = 'aamulehti\\\.fi'; 
snoobi.tilit[snoobi.num].includedSites = new Array(); 

if( typeof snoobi.tilit[snoobi.num].presend == 'function' )
	snoobi.tilit[snoobi.num].presend();

snoobi.listenerAdded=false;

if (snoobi.tilit[snoobi.num].autoTrackFiles==true || snoobi.tilit[snoobi.num].autoTrackExternals==true || snoobi.tilit[snoobi.num].autoTrackEmails==true){
  if (snoobi.listenerAdded==false) addSnbLoadEvent(snoobi.addListeners);
  snoobi.listenerAdded=true;
}



if (window.location.protocol == "http:" || window.location.protocol == "https:"){
  try{
    document.write("<scri");
    document.write("pt type=\"text/javascript\" src=\""+snoobi.tilit[snoobi.num].getTrackUrl('html')+"\"></scr");
    document.write("ipt>");
  }
  catch(e){
    try
    {
	var snoopDOM = document.getElementsByTagName("html")[0];
	var snoopBody = document.getElementsByTagName("body")[0];
	var snoop2Script = document.createElementNS(snoopDOM.namespaceURI,"script"); 
	snoop2Script.type = "text/javascript";
	snoop2Script.src = snoobi.tilit[snoobi.num].getTrackUrl('plain');
	snoopBody.appendChild(snoop2Script);
    }
    catch(e2)
    {
       snoobi.ck=0;
       snoobi.tilit[snoobi.num].sendData();
    }
  }
}


}

function handleError() {
        return true;
}

function addSnbLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  }
  else {
    window.onload = function() {
      oldonload();
      func();
    }
  }
}

