// JavaScript Document
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
}
// -- Busco en el servidor
function buscoEnServidorJuagadaRealizada(tableId){
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
			setCookie("history-Jp", jsonStr, 120);
			var json=JSON.stringify(jsonStr);
			var servidor=JSON.parse(json);
			var doble=JSON.parse(servidor);
			buscoEnElHistorialJugadaRealizada(doble,tableId,1);
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlay("ERROR DE CONEXI&Oacute;N","<p>Hubo un error de conexi&oacute; intente nuevamente</p>");
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("GET","http://app.jugaplay.com/api/v1/plays/",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send();}	
}

// -------------
function openDetailHistoryOfPlay(objetHistoryToOpen){
	detailBody=bodyOfDetailHistory(objetHistoryToOpen);
	detailTitle=objetHistoryToOpen.table.title
	openOverLapseWindow(detailTitle, detailBody);
}
function bodyOfDetailHistory(historyMatch){
	return '<div class="container container-full historial-detalle"><div class="container container-title bg-color2"><h3>'+historyMatch.table.title+'</h3></div><div class="container head-detalle text-center text-color2 text-uppercase"><div class="row text-center"><div class="col-xs-6"><h1>...</h1><h5>Mi posición en esta mesa</h5></div><div class="col-xs-6"><h1>...</h1><h5>Puntos sumados por Jugadores</h5></div></div></div><div class="container bg-color5 row" style="margin: 0px;padding: 0px;"><a class="btn btn-primary btn-style3 full-width" onClick="openTableInformation(\''+historyMatch.table.id+'\');">Detalle de la mesa</a></div><div class="container list-style2 text-color2">'+jugadoresElejidosParaElPartido(historyMatch.players)+'</div></div>';
}
function jugadoresElejidosParaElPartido(playersSel){
	contentAgregarPlayer='';
	for(a in playersSel){
	contentAgregarPlayer+='<div class="row vertical-align bg-color5 text-color1"><div class="col-xs-1" style="padding: 0px; width: 25px; margin-right: 4px;"><img src="'+playerGetImage(playersSel[a].id)+'" class="player-profile-pic small"></div><div class="col-xs-5" style="padding: 0px;"><p>'+playersSel[a].first_name+' '+playersSel[a].last_name+'</p></div><div class="col-xs-2" style="padding-right: 0px;"><p> </p></div><div class="col-xs-2" style="padding: 0px; width: 25px;"><img class="team-logo small" src="'+clubGetLogoName(playersSel[a].team)+'"></div><div class="col-xs-2">Esperando resultados</div></div>';
	}
	return contentAgregarPlayer;
}
// Comienza el detalle especifico del puntaje
