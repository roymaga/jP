// JavaScript Document
// -- Busco en el servidor
function openTablePlayedDetail(tableId,type){
	startLoadingAnimation();
	if(window.IsLoggedInVar && checkConnection()){
		openTablePlayedDetail2(tableId,type);
	}else{
		setTimeout(function(){openTablePlayedDetail(tableId,type)},100);
	}
}
function openTablePlayedDetail2(tableId,type){
	window.showTableInformatioType=type;
	var xmlhttp;
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
			var jsonStr=xmlhttp.responseText;
			if(IsJsonString(jsonStr) && checkConnectionLoggedIn(xmlhttp)){ // Me fijo si dio un error, en el caso de que de le sigo mandando
				var doble=JSON.parse(jsonStr);
				closeLoadingAnimation();
				parseRequestAsToShowHistory(doble);
			}else{
				setTimeout(function(){openTablePlayedDetail(tableId,type);}, 500);
			}
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404 || xmlhttp.status==105){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlayConnectionError();
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("GET",getJPApiURL()+"tables/"+tableId,true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send();
}
function parseRequestAsToShowHistory(table){
	window.actualOpenTable=parseTableForGroupPlayingOption (table);
	var playersSel=[];
	var playersSelId=[];
	for(player in table.playing){
		if(table.playing[player].user_id==getUserJugaplayId()){
			for(opt in table.playing[player].players){
				playersSelId.push(table.playing[player].players[opt].player_id);
			}
			/* Analizo todos los usuarios de las mesas y agrego los jugadores elegidos por el usuario */
			var matchesInTable=table.matches;
			for(a in matchesInTable){// Para cada partido de la mesa
				for (player in matchesInTable[a].local_team.players){
					if(playersSelId.indexOf(matchesInTable[a].local_team.players[player].id)>-1){
						matchesInTable[a].local_team.players[player].team_id=matchesInTable[a].local_team.id;
						playersSel.push(matchesInTable[a].local_team.players[player]);
					}
				}
				for (player in matchesInTable[a].visitor_team.players){
					if(playersSelId.indexOf(matchesInTable[a].visitor_team.players[player].id)>-1){
						matchesInTable[a].visitor_team.players[player].team_id=matchesInTable[a].visitor_team.id;
						playersSel.push(matchesInTable[a].visitor_team.players[player]);
					}
				}
			}
		}
	}
	var detailBody=bodyOfDetailHistory(table,playersSel);
	var detailTitle=table.title
	openOverLapseWindow(detailTitle, detailBody);
}

function openDetailHistoryOfPlay(objetHistoryToOpen){

}
function bodyOfDetailHistory(historyMatch,playersSel){
	return '<div class="container container-full historial-detalle"><div class="container container-title bg-color2"><h3>'+historyMatch.title+'</h3></div><div class="container head-detalle text-center text-color2 text-uppercase"><div class="row text-center"><div class="col-xs-6"><h1>...</h1><h5 class="trn">Mi posición en esta mesa</h5></div><div class="col-xs-6"><h1>...</h1><h5 class="trn">Puntos sumados por Jugadores</h5></div></div></div><div class="container bg-color5 row" style="margin: 0px;padding: 0px;"><a class="btn btn-primary btn-style3 full-width" onClick="openTableInformation(0);"><i class="fa fa-info-circle" aria-hidden="true"></i></a></div><div class="container list-style2 text-color2">'+jugadoresElejidosParaElPartido(playersSel)+'</div></div>';
}
function jugadoresElejidosParaElPartido(playersSel){
	contentAgregarPlayer='';
	for(a in playersSel){
		var props = {
			'{PLAYER_NAME}': playersSel[a].first_name+' '+playersSel[a].last_name,
			'{PLAYER_IMAGE}': playerGetImage(playersSel[a].id),
			'{CLUB_SHIELD}': clubGetLogo(playersSel[a].team_id)
		}
		contentAgregarPlayer+= parseTemplate(props,TEMPLATE_PLAYER_CHOSEN_FOR_MATCH);
	}
	return contentAgregarPlayer;
}
// Comienza el detalle especifico del puntaje

/*
FROM: jugadoresElejidosParaElPartido(playersSel)
var props = {
	'{PLAYER_NAME}': playersSel[a].first_name+' '+playersSel[a].last_name,
	'{PLAYER_IMAGE}': playerGetImage(playersSel[a].id),
	'{CLUB_SHIELD}': clubGetLogo(playersSel[a].team_id)
}
*/
var TEMPLATE_PLAYER_CHOSEN_FOR_MATCH = ''
	+'<div class="row vertical-align bg-color5 text-color1">'
	+'	<div class="col-xs-1" style="padding: 0px; width: 25px; margin-right: 4px;">'
	+'		<img src="{PLAYER_IMAGE}" class="player-profile-pic small" />'
	+'	</div>'
	+'	<div class="col-xs-5" style="padding: 0px;">'
	+'		<p>{PLAYER_NAME}</p>'
	+'	</div>'
	+'	<div class="col-xs-6 text-right">'
	+'		<img class="team-logo small" src="{CLUB_SHIELD}" style="width: 25px;"/>'
	+'		<a class="btn-check"><img src="img/icon-select-green.png" class="player-profile-pic small"></a>'
	+'	</div>'
	+'</div>'
