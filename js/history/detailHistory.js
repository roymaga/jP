// JavaScript Document
function openDetailHistory(tableId){
	var detailBody="";
	var detailTitle="";
	historialJugadas=window.historyOfPlays;
	for(historia in historialJugadas){// si historialJugadas[historia].table.payed_points != N/A solo mostrar 3
			if(historialJugadas[historia].table.id==tableId){
				detailBody=bodyOfDetailHistory(historialJugadas[historia]);
				detailTitle=historialJugadas[historia].table.title;
			}
	}
	openOverLapseWindow(detailTitle, detailBody);
}
// -------------
function buscoEnElHistorialJugadaRealizada(historialJugadas, tableId,time){
	contentAgregar='';
	flag=0;
	window.historyOfPlays=historialJugadas;
	for(historia in historialJugadas){// si historialJugadas[historia].table.payed_points != N/A solo mostrar 3
			if(historialJugadas[historia].table.id==tableId){
				openDetailHistoryOfPlay(historialJugadas[historia],tableId);
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
function bodyOfDetailHistory(historyMatch){
	return '<div class="container container-full historial-detalle"><div class="container container-title bg-color2"><h3>'+historyMatch.table.title+'</h3></div><div class="container head-detalle text-center text-color2 text-uppercase"><div class="row text-center"><div class="col-xs-6"><h1>'+historyMatch.table.position+'</h1><h5>Mi posición en este partido</h5></div><div class="col-xs-6"><h1>'+historyMatch.earn_coins+' <img src="img/icons/coins/coins.png" style="margin-right: 0px;margin-top: -10px;margin-bottom: -3px;margin-left: 5px;width: 30px;"></h1><h5>Monedas Obtenidas</h5></div></div></div><div class="container bg-color5 row" style="margin: 0px;padding: 0px;"><a class="btn btn-primary btn-style3 full-width" onClick="openTableInformation(\''+historyMatch.table.id+'\');"><i class="fa fa-info-circle" aria-hidden="true"></i> Detalle del partido</a></div><div class="container list-style2 text-color2">'+jugadoresParaElHistorial(historyMatch.players,historyMatch.table.id)+'</div></div>';
}
function jugadoresParaElHistorial(playersSel,tableId){
	contentAgregarPlayer='';
	for(a in playersSel){
	contentAgregarPlayer+='<div class="row vertical-align bg-color5 text-color1"><div class="col-xs-1" style="padding: 0px; width: 25px; margin-right: 4px;"><img src="'+playerGetImage(playersSel[a].id)+'" class="player-profile-pic small"></div><div class="col-xs-5" style="padding: 0px;"><p>'+playersSel[a].first_name+' '+playersSel[a].last_name+'</p></div><div class="col-xs-2" style="padding-right: 0px;"><p>'+playersSel[a].points+' Pts</p></div><div class="col-xs-2" style="padding: 0px; width: 25px;"><img class="team-logo small" src="'+clubGetLogo(playersSel[a].team_id)+'"></div><div class="col-xs-2"><a onClick="detallesHistoricosPuntaje('+playersSel[a].id+','+tableId+');" type="button" class="btn btn-default btn-style4 xsmall">Detalle</a></div></div>';
	}
	return contentAgregarPlayer;
}
// Comienza el detalle especifico del puntaje
// Primero abro la mesa
function detallesHistoricosPuntaje(playerId,idMesa){
	startLoadingAnimation();
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
			 if ((xmlhttp.readyState==4 && xmlhttp.status==200) ||  (xmlhttp.readyState==4 && xmlhttp.status==422) ||  (xmlhttp.readyState==4 && xmlhttp.status==401)||  (xmlhttp.readyState==4 && xmlhttp.status==400))
	    {
			var jsonStr=xmlhttp.responseText;
			closeLoadingAnimation();
			var json=JSON.stringify(jsonStr);
			var servidor=JSON.parse(json);
			var doble=JSON.parse(servidor);
			if (typeof(doble.errors) !== 'undefined'){
				 avisoEmergenteJugaPlay("Detalle no disponible","<p>Ya no puede ver la información de este desafío debido a que no pertenece más a este grupo.</p>");
				}
			else{
					buscarEstadisticasJugador(doble,playerId);
				}
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404 || xmlhttp.status==105){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlayConnectionError();
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("GET",getJPApiURL()+"tables/"+idMesa+"/",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send();	
	}
}
// Despues la estadistica del Jugador
function buscarEstadisticasJugador(mesa,playerId){// Recordar que esta el loading cargando
	var matchLooked=0;
	var nameMatchLooked="";
	matchesInTable=mesa.matches;
	for(a in matchesInTable){// Para cada partido de la mesa
		for (player in matchesInTable[a].local_team.players){
			if(matchesInTable[a].local_team.players[player].id==playerId){
				matchLooked=matchesInTable[a].id;
				nameMatchLooked=matchesInTable[a].title;
			}
		}
		for (player in matchesInTable[a].visitor_team.players){
			if(matchesInTable[a].visitor_team.players[player].id==playerId){
				matchLooked=matchesInTable[a].id;
				nameMatchLooked=matchesInTable[a].title;
			}
		}
	}
	consultaEstadisticasJugadores(mesa,playerId,matchLooked,nameMatchLooked);
}
function consultaEstadisticasJugadores(mesa,playerId,matchLooked,nameMatchLooked){
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
			var json=JSON.stringify(jsonStr);
			var servidor=JSON.parse(json);
			var doble=JSON.parse(servidor);
			mostrarEstadisticasDelJugadorHistorial(doble,mesa,nameMatchLooked);
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404 || xmlhttp.status==105){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlayConnectionError();
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("GET",getJPApiURL()+"matches/"+matchLooked+"/players/"+playerId+"/stats",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send();	
	}
}
function mostrarEstadisticasDelJugadorHistorial(estadisticas,mesa,nameMatchLooked){
	closeLoadingAnimation();
	//alert(JSON.stringify(estadisticas));
	window.statsFromPlayer=estadisticas;
	window.rulesFromTable=mesa.table_rules;
	window.nameOfTheMatch=nameMatchLooked;
	//alert(nameMatchLooked+"--"+JSON.stringify(mesa.table_rules));
	abrirDetallesHistoricosPuntaje();
}
function abrirDetallesHistoricosPuntaje(){
		detailBodyHistory=contenidoDelDetalleHistoricoSumado();
		detailTitleHistory=window.nameOfTheMatch;
		openOverLapseWindow(detailTitleHistory, detailBodyHistory);
	}
function contenidoDelDetalleHistoricoSumado(){
	var scoreShots=window.statsFromPlayer.stats.scored_goals*window.rulesFromTable.scored_goals+window.statsFromPlayer.stats.shots*window.rulesFromTable.shots+window.statsFromPlayer.stats.shots_on_goal*window.rulesFromTable.shots_on_goal+window.statsFromPlayer.stats.shots_to_the_post*window.rulesFromTable.shots_to_the_post+window.statsFromPlayer.stats.shots_outside*window.rulesFromTable.shots_outside+window.statsFromPlayer.stats.goalkeeper_scored_goals*window.rulesFromTable.goalkeeper_scored_goals+window.statsFromPlayer.stats.defender_scored_goals*window.rulesFromTable.defender_scored_goals+window.statsFromPlayer.stats.free_kick_goal*window.rulesFromTable.free_kick_goal;//7
	//alert("score Shots:"+scoreShots);
	var scorePases=window.statsFromPlayer.stats.right_passes*window.rulesFromTable.right_passes+window.statsFromPlayer.stats.wrong_passes*window.rulesFromTable.wrong_passes;//2
	//alert("scorePases:"+scorePases);
	var scoreCards=window.statsFromPlayer.stats.red_cards*window.rulesFromTable.red_cards+window.statsFromPlayer.stats.yellow_cards*window.rulesFromTable.yellow_cards;//2
	//alert("scoreCards:"+scoreCards);
	var scoreOtros=window.statsFromPlayer.stats.faults*window.rulesFromTable.faults+window.statsFromPlayer.stats.recoveries*window.rulesFromTable.recoveries+window.statsFromPlayer.stats.assists*window.rulesFromTable.assists+window.statsFromPlayer.stats.saves*window.rulesFromTable.saves+window.statsFromPlayer.stats.winner_team*window.rulesFromTable.winner_team+window.statsFromPlayer.stats.undefeated_defense*window.rulesFromTable.undefeated_defense+window.statsFromPlayer.stats.undefeated_goal*window.rulesFromTable.undefeated_goal+window.statsFromPlayer.stats.offside*window.rulesFromTable.offside+window.statsFromPlayer.stats.missed_penalties*window.rulesFromTable.missed_penalties+window.statsFromPlayer.stats.saved_penalties*window.rulesFromTable.saved_penalties+window.statsFromPlayer.stats.missed_saves*window.rulesFromTable.missed_saves;//11 xq son dos vallas vencidas y dos penales, uno errado otro convertido
	//alert("scoreOtros:"+scoreOtros);
	var tablePenalties=window.statsFromPlayer.stats.missed_penalties*window.rulesFromTable.missed_penalties+window.statsFromPlayer.stats.saved_penalties*window.rulesFromTable.saved_penalties;
	//alert("tablePenalties:"+tablePenalties);
	var tableInvictus=addPlusTwoNumbers(window.statsFromPlayer.stats.undefeated_defense*window.rulesFromTable.undefeated_defense,window.statsFromPlayer.stats.undefeated_goal*window.rulesFromTable.undefeated_goal);
	//alert("tableInvictus:"+tableInvictus);
	var totalScore=scoreShots+scorePases+scoreCards+scoreOtros;//ya incluye penalties y invictus
	//alert("totalScore:"+totalScore);
	var textDetailPlayer='<div class="container container-full stats-section">'; // opening
	textDetailPlayer+='<div class="container text-center text-color2 bg-color3 head"><h1>'+window.nameOfTheMatch+'</h1><h2>'+window.statsFromPlayer.first_name+' '+window.statsFromPlayer.last_name+'</h2><h3>'+totalScore+' Pts sumados</h3></div>'; // detail player match total points 
	textDetailPlayer+='<div class="container stats1 text-center"><h4>Disparos</h4><img src="img/goal-net.jpg"><div class="row"><div class="col-xs-3"><h2 class="color1">'+window.statsFromPlayer.stats.scored_goals+'</h2><p>Goles</p></div><div class="col-xs-3"><h2 class="color2">'+window.statsFromPlayer.stats.shots_on_goal+'</h2><p>Al arco</p></div><div class="col-xs-3"><h2 class="color3">'+window.statsFromPlayer.stats.shots_to_the_post+'</h2><p>Al palo</p></div><div class="col-xs-3"><h2 class="color4">'+window.statsFromPlayer.stats.shots_outside+'</h2><p>Afuera</p></div></div><h5 class="boxed">Puntos por disparo: '+scoreShots+'</h5></div>'; // detail shots
	textDetailPlayer+='<div class="container"><div class="line-divider"></div></div><div class="container stats1 text-center"><h4>Tarjetas</h4><img src="img/cards.jpg"><div class="row"><div class="col-xs-6"><h2 class="color2">'+window.statsFromPlayer.stats.yellow_cards+'</h2><p>Amarillas</p></div><div class="col-xs-6"><h2 class="color4">'+window.statsFromPlayer.stats.red_cards+'</h2><p>Rojas</p></div></div><h5 class="boxed">Puntos por tarjetas: '+scoreCards+'</h5></div>'; // detail cards
	textDetailPlayer+='<div class="container"><div class="line-divider"></div></div><div class="container stats1 text-center"><h4>Pases</h4><div class="grafico-pases"><div class="correcto" style="width:'+porcentualRightPases(window.statsFromPlayer.stats.right_passes,window.statsFromPlayer.stats.wrong_passes)+';"></div></div><div class="row"><div class="col-xs-6"><h2 class="color1">'+window.statsFromPlayer.stats.right_passes+'</h2><p>Correctos</p></div><div class="col-xs-6"><h2 class="color4">'+window.statsFromPlayer.stats.wrong_passes+'</h2><p>Incorrectos</p></div></div><h5 class="boxed">Puntos por pases: '+scorePases+'</h5></div><div class="container"><div class="line-divider"></div></div></div>'; // detail pases y cierre del principio
	textDetailPlayer+='<div class="container"><table class="table table-sm table-hover" style="font-size: 14px;"><tbody><tr class="first-row"><th scope="row">Faltas</th><td>'+window.statsFromPlayer.stats.faults+'</td><th>'+window.statsFromPlayer.stats.faults*window.rulesFromTable.faults+' PTS</th></tr><tr><th scope="row">Recuperaciones</th><td>'+window.statsFromPlayer.stats.recoveries+'</td><th>'+window.statsFromPlayer.stats.recoveries*window.rulesFromTable.recoveries+' PTS</th></tr>	<tr><th scope="row">Asistencias</th><td>'+window.statsFromPlayer.stats.assists+'</td><th>'+window.statsFromPlayer.stats.assists*window.rulesFromTable.assists+' PTS</th></tr>	<tr><th scope="row">Atajadas</th><td>'+window.statsFromPlayer.stats.saves+'</td><th>'+window.statsFromPlayer.stats.saves*window.rulesFromTable.saves+' PTS</th></tr>	<tr><th scope="row">Equipo Ganador</th><td>'+undefeatDefence(window.statsFromPlayer.stats.winner_team)+'</td><th>'+window.statsFromPlayer.stats.winner_team*window.rulesFromTable.winner_team+' PTS</th></tr>	<tr><th scope="row">Valla invicta</th><td>'+undefeatDefence(addPlusTwoNumbers(window.statsFromPlayer.stats.undefeated_defense, window.statsFromPlayer.stats.undefeated_goal))+'</td><th>'+tableInvictus+' PTS</th></tr>	<tr><th scope="row">Fuera de juego</th><td>'+window.statsFromPlayer.stats.offside+'</td><th>'+window.statsFromPlayer.stats.offside*window.rulesFromTable.offside+' PTS</th></tr>	<tr><th scope="row">No Atajadas</th><td>'+window.statsFromPlayer.stats.missed_saves+'</td><th>'+window.statsFromPlayer.stats.missed_saves*window.rulesFromTable.missed_saves+' PTS</th></tr>	<tr><th scope="row">Penales</th><td>'+undefeatDefence(addPlusTwoNumbers(window.statsFromPlayer.stats.missed_penalties,window.statsFromPlayer.stats.saved_penalties))+'</td><th>'+tablePenalties+' PTS</th></tr></tbody></table></div>'; // tabla final 
	textDetailPlayer+='<div class="container stats-section text-center"><h5 class="boxed">Puntos total: '+totalScore+'</h5></div><div class="container"><div class="line-divider"></div></div>'; // cierre
	return textDetailPlayer;
}
function addPlusTwoNumbers(a,b){// Hago esta funcion por que sino en IE no lo toma
	var aa=parseInt(a);
	var bb=parseInt(b);
	return aa+bb;
}
function undefeatDefence(val){
	if(val>0){
		return "si";
	}else{
		return "no";
	}
}
function porcentualRightPases(rigth,wrong){
	//alert(rigth+'-'+wrong);
	return parseInt((parseInt(rigth)/(parseInt(wrong)+parseInt(rigth)))*100)+'%'
}