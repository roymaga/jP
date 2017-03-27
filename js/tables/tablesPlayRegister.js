// JavaScript Document
/*
function openTablePlayedDetail(tableId){
	previousHistory=getCookie("history-Jp");
	if(previousHistory.length>4){		
			var json=JSON.stringify(previousHistory);
			var servidor=JSON.parse(json);
			var doble=JSON.parse(servidor);
			buscoEnElHistorialJugadaRealizada(doble,tableId,0);
		}else{
			 buscoEnServidorJuagadaRealizada(tableId);
		}
}
// -------------
function buscoEnElHistorialJugadaRealizada(historialJugadas, tableId,time){
	contentAgregar='';
	flag=0;
	window.historyOfPlays=historialJugadas;
	for(historia in historialJugadas){// si historialJugadas[historia].table.payed_points != N/A solo mostrar 3
			if(historialJugadas[historia].table.id==tableId){
				openDetailHistoryOfPlay(historialJugadas[historia]);
				flag=1;
			}
	}
	if(flag!=1&&time!=1){
		buscoEnServidorJuagadaRealizada(tableId);
		}else{
			if(flag!=1){
			 avisoEmergenteJugaPlay("Jugada procesandose","<p>Pruebe dentro de unos instantes</p>");}
		}
} */
// Borrar todo 
// -- Busco en el servidor
function openTablePlayedDetail(tableId){
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
			jsonStr=xmlhttp.responseText;
			stopTimeToWait();
			var json=JSON.stringify(jsonStr);
			var servidor=JSON.parse(json);
			var doble=JSON.parse(servidor);
			// Paro aca
			parseRequestAsToShowHistory(doble);
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlayConnectionError();
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("GET",getJPApiURL()+"tables/"+tableId,true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send();	}
}
function parseRequestAsToShowHistory(table){
	window.actualOpenTable=table;
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
	detailBody=bodyOfDetailHistory(table,playersSel);
	detailTitle=table.title
	openOverLapseWindow(detailTitle, detailBody);
}
/*
// All players
function initializeAddAllPlayers(openTable){
	matchesInTable=openTable.matches;
	for(a in matchesInTable){// Para cada partido de la mesa
		window.matchesInLiveTable.push({"teams":[matchesInTable[a].local_team.id,matchesInTable[a].visitor_team.id],"goals":[]});
		for (player in matchesInTable[a].local_team.players){
			window.liveMatchOpen.players.push(parsePlayers(matchesInTable[a].local_team.players[player],matchesInTable[a].local_team.id));
		}
		for (player in matchesInTable[a].visitor_team.players){
			window.liveMatchOpen.players.push(parsePlayers(matchesInTable[a].visitor_team.players[player],matchesInTable[a].visitor_team.id));
		}
	}
	initializeAddAllUsers(openTable);
}
*/

// window.actualOpenTable --> Tengo que guardar la tabla aca y para buscar el I openTableInformation();
// -------------
function openDetailHistoryOfPlay(objetHistoryToOpen){
	
}
function bodyOfDetailHistory(historyMatch,playersSel){
	return '<div class="container container-full historial-detalle"><div class="container container-title bg-color2"><h3>'+historyMatch.title+'</h3></div><div class="container head-detalle text-center text-color2 text-uppercase"><div class="row text-center"><div class="col-xs-6"><h1>...</h1><h5>Mi posición en este partido</h5></div><div class="col-xs-6"><h1>...</h1><h5>Puntos sumados por Jugadores</h5></div></div></div><div class="container bg-color5 row" style="margin: 0px;padding: 0px;"><a class="btn btn-primary btn-style3 full-width" onClick="openTableInformation(0);"><i class="fa fa-info-circle" aria-hidden="true"></i> Detalle del partido</a></div><div class="container list-style2 text-color2">'+jugadoresElejidosParaElPartido(playersSel)+'</div></div>';
}
function jugadoresElejidosParaElPartido(playersSel){
	contentAgregarPlayer='';
	for(a in playersSel){
	contentAgregarPlayer+='<div class="row vertical-align bg-color5 text-color1"><div class="col-xs-1" style="padding: 0px; width: 25px; margin-right: 4px;"><img src="'+playerGetImage(playersSel[a].id)+'" class="player-profile-pic small"></div><div class="col-xs-5" style="padding: 0px;"><p>'+playersSel[a].first_name+' '+playersSel[a].last_name+'</p></div><div class="col-xs-2" style="padding-right: 0px;"><p> </p></div><div class="col-xs-2" style="padding: 0px; width: 25px;"><img class="team-logo small" src="'+clubGetLogo(playersSel[a].team_id)+'"></div><div class="col-xs-2">Esperando</div></div>';
	}
	return contentAgregarPlayer;
}
// Comienza el detalle especifico del puntaje
