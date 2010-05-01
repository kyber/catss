pistaPipari2('Snoobisession_aamulehti_fi','',-1);
pistaPipari2('Snoobi30minute_aamulehti_fi','',-1);
pistaPipari2('SnoobiID','',-1);
pistaPipari2('Snoobisession_aamulehti_fi','59040991',1,'/','www.aamulehti.fi');
pistaPipari2('Snoobi30minute_aamulehti_fi','59040991',3,'/','www.aamulehti.fi');
pistaPipari2('SnoobiID','292267497',5,'/','www.aamulehti.fi');
try{
localStorage.setItem('snb_ls_hid','292267497');
}
catch(e)
{}

function pistaPipari2(name,value,expires,path,domain,secure){
  var expi = new Date();
  if (expires==-1) expi.setTime(expi.getTime() - 1);
  if (expires== 2){
    expi.setTime(expi.getTime() + 21600000);
  }
  if (expires== 3) expi.setTime(expi.getTime() + 1800000);
  if (expires== 4) expi.setTime(expi.getTime() + 2678400000);
  if (expires== 5){
    expi.setTime(expi.getTime() + 315360000000);
  }
  var expCrumb = ((expires == 1) ? "" : ("; expires=" + expi.toGMTString()));
  var pathCrumb = ((path == null) ? "" : ("; path=" + path));
  var domainCrumb = ((domain == null) ? "" : ("; domain=" + domain));
  var secureCrumb = ((secure == true) ? "; secure" : "");
  document.cookie = name + "=" + escape(value) + expCrumb + pathCrumb + domainCrumb + secureCrumb;
}

if( typeof(snoobiTrans) == 'object' && snoobiTrans instanceof SnoobiTrans )
{
	snoobiTrans.account =  'aamulehti_fi';
	snoobiTrans.UUID =  '';
	snoobiTrans.send( );
}

if( typeof(snoobiCart) == 'object' && snoobiCart instanceof SnoobiCart )
{
	snoobiCart.account =  'aamulehti_fi';
	snoobiCart.UUID =  '';
	snoobiCart.send( );
}
