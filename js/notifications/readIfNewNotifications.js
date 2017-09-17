// JavaScript Document
// User data Control
window.notificationsLimtToShow=5;
window.JpNotHtmlNotificatios=null;

window.onload=setTimeout(function(){ controlJpNotifications(); }, 1000);
//setTimeout(function(){checkIfUpdateIsNeeded();}, 30000);// Check every 30 seconds
function controlJpNotifications(){
	if(getUserJugaplayId()!=null){
		jugaPlayNotifications=getCookie("jugaPlayNotifications"+getUserJugaplayId);
		if(IsJsonString(jugaPlayNotifications)){
			readNotifications(JSON.parse(jugaPlayNotifications));
		}else{
			updateNotifications();// Desde el primer mensaje
		}
	}else{
		setTimeout(function(){controlJpNotifications();}, 1000);
	}
}

function updateNotificationsObject(notfObj){
	var notfObJp={last_check:null,notifications:null};
	notfObJp.last_check=new Date();
	notfObJp.notifications=notfObj;
	setCookie("jugaPlayNotifications"+getUserJugaplayId, JSON.stringify(notfObJp), 120);
	readNotifications(notfObJp);
}
function onlyUpdateNotificationsObject(notfObj){
	var notfObJp={last_check:null,notifications:null};
	notfObJp.last_check=new Date();
	notfObJp.notifications=notfObj;
	setCookie("jugaPlayNotifications"+getUserJugaplayId, JSON.stringify(notfObJp), 120);
}
function readNotifications(notfObJp){
	var count=0;
	for(not in notfObJp.notifications){
		try{if(notfObJp.notifications[not].read==false){count++;}}
		catch(err) {//alert(err+" not:"+not)
	}}
	showNotificationsAmountOfAlerts(count);
	window.JpNotHtmlNotifications=notfObJp.notifications;
	if(secondsFromNow(notfObJp.last_check)<300){// Actaulizar cada 5 minutos --> 300 Segundos
		setTimeout(function(){readNotifications(notfObJp);}, 1000);// De esta manera tiene actualizado el menu cada 1 segundos
	}else{
		updateNotifications(notfObJp.notifications);
	}
}
function showNotificationsAmountOfAlerts(amount){
	if(amount>0){
		if($( ".btn-alerts-menu" ).find( "p" ).size()>0){
			$( ".btn-alerts-menu" ).find( "p" ).html(amount);
		}else{
			var p = document.createElement("p");
			p.innerHTML=amount;
			$(".btn-alerts-menu").append(p).clone(); 
		}
	}else{
		$( ".btn-alerts-menu" ).find( "p" ).remove();
	}
}
function clickOpenNotifications(){
	var notif=window.JpNotHtmlNotifications;
	html='';
	for(varI in  notif){
		html+=parseNotification(notif[varI], varI);
		if(notif[varI].read==false){notif[varI].read=true;updateNotificationAsRead(notif[varI].id);}
	}
	if(notif.length>=window.notificationsLimtToShow){html+='<a class="btn btn-style3 full-width bg-color3" onclick="showMoreNotifications(this,\''+window.notificationsLimtToShow+'\',event);">VER +</a>';}
	onlyUpdateNotificationsObject(window.JpNotHtmlNotifications);
	document.getElementById("jp-notf-cont").innerHTML=html;
}
function showMoreNotificationsObject(notif,next){
	html='';
	for(varI in  notif){
		html+=parseNotification(notif[varI], varI);
		if(notif[varI].read==false){notif[varI].read=true;updateNotificationAsRead(notif[varI].id);}
	}
	if(notif.length>=window.notificationsLimtToShow){html+='<a class="btn btn-style3 full-width bg-color3" onclick="showMoreNotifications(this,\''+next+'\',event);">VER +</a>';}
	document.getElementById("jp-notf-cont").innerHTML+=html;
}
function parseNotification(notification, oddEven){
	try{
	var id="jpn"+notification.created_at.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
	if(oddEven%2==0){var oddOrEven="odd";}else{var oddOrEven="even";}
	if(notification.type=="challenge"){return '<div class="row players-list-item vertical-align color-player-list '+oddOrEven+'"> <div class="col-xs-2"><i class="fa fa-users fa-2x" aria-hidden="true"></i></div><div class="col-xs-10 player-name"> <p><b>'+notification.title+'</b></p><p><small>'+parseTableChallengeMatchName(notification.text)+'</small></p></div></div>';}
	if(notification.type=="exchange-ready"){return '<div class="row players-list-item vertical-align color-player-list '+oddOrEven+'"> <div class="col-xs-2"><i class="fa fa-gift fa-2x" aria-hidden="true"></i></div><div class="col-xs-6 player-name"> <p>'+notification.title+'</p> </div><div class="col-xs-4 text-right"> <button type="button" class="btn btn-default btn-style2" onclick="'+notification.action+'">Premios</button> </div></div>';}
	// Resultado
	if(notification.type=="result"){
		// opcion nueva vs opcion vieja, veo si va a la nueva
		if(IsJsonString(notification.text) && IsJsonString(notification.title) && IsJsonString(notification.action)){
			Showtitle=JSON.parse(notification.title);
			Showtext=JSON.parse(notification.text);
			Showaction=JSON.parse(notification.action);
			if (Showtitle.table !== undefined){ // es del nuevo formato
				var match_type = parseNotfTypeOfMatch(Showaction.type);
				var match_text = parseNotfTextOfMatch(Showtext);
				return '<div class="row players-list-item vertical-align color-player-list '+oddOrEven+'"> <div class="col-xs-2"><i class="fa fa-futbol-o fa-2x" aria-hidden="true"></i></div><div class="col-xs-6 player-name"> <p><b>'+Showtitle.table+'</br><small>'+match_type+'</small></b></p><p><small>'+match_text+'</small></p></div><div class="col-xs-4 text-right"> <button type="button" class="btn btn-default btn-style2" onclick="window.location=\'history.html?open='+Showaction.table_id+'\'">Historial</button> </div></div>';
			}
			
		}
		// Sino va la opcion vieja
		return '<div class="row players-list-item vertical-align color-player-list '+oddOrEven+'"> <div class="col-xs-2"><i class="fa fa-futbol-o fa-2x" aria-hidden="true"></i></div><div class="col-xs-6 player-name"> <p><b>'+notification.title+'</b></p><p><small>'+notification.text+'</small></p></div><div class="col-xs-4 text-right"> <button type="button" class="btn btn-default btn-style2" onclick="window.location=\'history.html\'">Historial</button> </div></div>';}
	// Torneo
	//{"id": 155137,"type": "league","title": "{"round": 1, "status": 3}","image": null,"text": "{"position": 3, "points_acumulative": 69.5, "movement": 0}","action": "{"league_id": 2}","read": true,"created_at": "2017-08-22T14:10:34.182Z"},
	if(notification.type=="league"){
		Showtitle=JSON.parse(notification.title);
		Showtext=JSON.parse(notification.text);
		Showaction=JSON.parse(notification.action);
		var league_text = parseNotfTextOfLeague(Showtext);
		return '<div class="row players-list-item vertical-align color-player-list '+oddOrEven+'"> <div class="col-xs-2"><i class="fa fa-trophy fa-2x" aria-hidden="true"></i></div><div class="col-xs-6 player-name"> <p><b>Fecha '+Showtitle.round+' actualizada</br><small>Liga Jugaplay</small></b></p><p><small>'+league_text+'</small></p></div><div class="col-xs-4 text-right"> <button type="button" class="btn btn-default btn-style2" onclick="window.location=\'league.html?open='+Showaction.league_id+'\'"">Liga</button> </div></div>';}
	//
	if(notification.type_name=="friend-invitation"){return '<div class="row players-list-item vertical-align color-player-list '+oddOrEven+'"> <div class="col-xs-2"><i class="fa fa-user-plus fa-2x" aria-hidden="true"></i></div><div class="col-xs-6 player-name"> <p>'+notification.title+'</p></div><div class="col-xs-4"> <p class="text-right nomarging"> <span class="text-block-style2">'+notification.text+'</span> <img src="img/icons/coins/coins.png" style="margin-right: 0px;margin-top: -5px;margin-bottom: -3px; width: 20px;"></p></div></div>';}
	if(notification.type_name=="new" || notification.type_name=="personal"){return '<div class="row players-list-item vertical-align bg-color2 text-color2"> <div class="col-xs-2"><i class="fa fa-bell-o fa-2x" aria-hidden="true"></i></div><div class="col-xs-8 player-name"> <p>'+notification.title+'</p></div><div class="col-xs-2 text-right"> <button type="button" onclick="changeArrow(this);" class="btn btn-live" data-toggle="collapse" data-target="#'+id+'"><i class="fa fa-chevron-down" aria-hidden="true"></i></button> </div></div><div id="'+id+'" class="collapse"> <div class="row players-list-item vertical-align color-player-list2 even"> <div class="container"> <p>'+notification.text+'</p></div></div></div>';}
	}catch(e){
		
	}
}function parseNotfTypeOfMatch(type){
	switch(type) {
				case "training":
						return "Amistoso";
					break;
				case "league":
						return "Oficial";
					break;
				case "challenge":
						return "Desafio";
					break;
				default:
					return " ";
			}
}
// "{"position": 1, "earned_coins": 15.0, "type_of_prize": coins}"
function parseNotfTextOfMatch(json){
	if (json.earned_coins !== undefined){ 
		json.earned_prize=json.earned_coins;
	}
	var text=json.position+" ° ";
	if(parseInt(json.earned_prize)>0){ // tiene premio
		if(json.type_of_prize=="coins"){
			text+=' <b>'+parseInt(json.earned_prize)+'</b><img src="img/icons/coins/coins.png" width="15px">';
		}else		{
			text+=' <b>'+parseInt(json.earned_prize)+'</b><img src="img/icons/coins/chip.svg" width="15px">';
		}
	}
	return text;
}
// "{"position": 3, "points_acumulative": 69.5, "movement": 0}"
function parseNotfTextOfLeague(json){
	return json.position+" ° "+json.points_acumulative+" Pts";
}
function updateNotificationAsRead(notfId){
	json=JSON.stringify({"read":true});
	if(checkConnection2()){var xmlhttp;
		if (window.XMLHttpRequest)
	 	 {// code for IE7+, Firefox, Chrome, Opera, Safari
	  		xmlhttp=new XMLHttpRequest();
	  		}
		else
	  	{// code for IE6, IE5
	 	 xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	 	 }
		xmlhttp.onreadystatechange=function()
	  	{
			//alert("xmlhttp.readyState: "+xmlhttp.readyState+"xmlhttp.status: "+xmlhttp.status);
	 	 if ((xmlhttp.readyState==4 && xmlhttp.status==200) ||  (xmlhttp.readyState==4 && xmlhttp.status==422) ||  (xmlhttp.readyState==4 && xmlhttp.status==401))
	    {
			jsonStr=xmlhttp.responseText;
			stopTimeToWait();
			 if(IsJsonString(jsonStr)){
				 //updateNotificationsObject( JSON.parse(jsonStr));
			 }else{
				 updateNotifications(notfId);
			 }
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404 || xmlhttp.status==105){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlayConnectionError();
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("PATCH",getJPApiURL()+"notifications/"+notfId,true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send(json);	
	}else{
		setTimeout(function(){ updateNotificationAsRead(notfId); }, 500);
	}
}
function updateNotifications(){
	if(checkConnection2()){var xmlhttp;
		if (window.XMLHttpRequest)
	 	 {// code for IE7+, Firefox, Chrome, Opera, Safari
	  		xmlhttp=new XMLHttpRequest();
	  		}
		else
	  	{// code for IE6, IE5
	 	 xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	 	 }
		xmlhttp.onreadystatechange=function()
	  	{
			//alert("xmlhttp.readyState: "+xmlhttp.readyState+"xmlhttp.status: "+xmlhttp.status);
	 	 if ((xmlhttp.readyState==4 && xmlhttp.status==200) ||  (xmlhttp.readyState==4 && xmlhttp.status==422) ||  (xmlhttp.readyState==4 && xmlhttp.status==401))
	    {
			stopTimeToWait();
			jsonStr=xmlhttp.responseText;
			 if(IsJsonString(jsonStr)){
				 updateNotificationsObject( JSON.parse(jsonStr).notifications);
			 }else{
				 updateNotifications();
			 }
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404 || xmlhttp.status==105){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlayConnectionError();
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("GET",getJPApiURL()+"notifications?from=0&to="+window.notificationsLimtToShow,true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send();	
	}else{
		setTimeout(function(){ updateNotifications(); }, 500);
	}
}
function showMoreNotifications(element,from,e){
	element.innerHTML='<i class="fa fa-spinner fa-pulse fa-fw"></i>';
	if (!e)
      e = window.event;

    //IE9 & Other Browsers
    if (e.stopPropagation) {
      e.stopPropagation();
    }
    //IE8 and Lower
    else {
      e.cancelBubble = true;
    }
	if(checkConnection()){var xmlhttp;
		if (window.XMLHttpRequest)
	 	 {// code for IE7+, Firefox, Chrome, Opera, Safari
	  		xmlhttp=new XMLHttpRequest();
	  		}
		else
	  	{// code for IE6, IE5
	 	 xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	 	 }
		xmlhttp.onreadystatechange=function()
	  	{
			//alert("xmlhttp.readyState: "+xmlhttp.readyState+"xmlhttp.status: "+xmlhttp.status);
	 	 if ((xmlhttp.readyState==4 && xmlhttp.status==200) ||  (xmlhttp.readyState==4 && xmlhttp.status==422) ||  (xmlhttp.readyState==4 && xmlhttp.status==401))
	    {
			stopTimeToWait();
			jsonStr=xmlhttp.responseText;
			 if(IsJsonString(jsonStr)){
				 element.parentNode.removeChild(element);
				 showMoreNotificationsObject( JSON.parse(jsonStr).notifications, (parseInt(from)+parseInt(window.notificationsLimtToShow)));
			 }else{
				 showMoreNotifications(element,from,e);
			 }
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404 || xmlhttp.status==105){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlayConnectionError();
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("GET",getJPApiURL()+"notifications?from="+from+"&to="+window.notificationsLimtToShow,true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send();	
	}
}