// JavaScript Document
//function detallesHistoricosPuntaje(playerId,tableId){
	//avisoEmergenteJugaPlay("Detalle","<p>Player ir>"+playerId+" todavía Mesa Id> "+tableId+"  no están .</p>");
	//abrirDetallesHistoricosPuntaje();
//}
// Primero abro la mesa
function detallesHistoricosPuntaje(playerId,idMesa){
	startLoadingAnimation();
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
			jsonStr=xmlhttp.responseText;
			var json=JSON.stringify(jsonStr);
			var servidor=JSON.parse(json);
			var doble=JSON.parse(servidor);
			buscarEstadisticasJugador(doble,playerId);
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlay("ERROR DE CONEXI&Oacute;N","<p>Hubo un error de conexi&oacute; intente nuevamente</p>");
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("GET","http://api.jugaplay.com/api/v1/tables/"+idMesa+"/",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send();	
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
			jsonStr=xmlhttp.responseText;
			var json=JSON.stringify(jsonStr);
			var servidor=JSON.parse(json);
			var doble=JSON.parse(servidor);
			mostrarEstadisticasDelJugadorHistorial(doble,mesa,nameMatchLooked);
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlay("ERROR DE CONEXI&Oacute;N","<p>Hubo un error de conexi&oacute; intente nuevamente</p>");
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("GET","http://api.jugaplay.com/api/v1/matches/"+matchLooked+"/players/"+playerId+"/stats",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send();	
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
	ga('send', 'event', 'Notification Open', 'Feedback', '');
		 tituloMesa=headerDelDetalleHistoricoSumado();
		 contenidoMesa=contenidoDelDetalleHistoricoSumado();
		 BootstrapDialog.show({
			 cssClass: 'emergentes-pop-up-gen',
			 title: tituloMesa,
            message: contenidoMesa	 
		 });
	}
function headerDelDetalleHistoricoSumado(){
	texto='<h1 style="margin-top: -7px;">Detalle de Puntos</h1><h4 style="text-align: center;">'+window.nameOfTheMatch+'</h4>';
	return texto;
}
function contenidoDelDetalleHistoricoSumado(){
	scoreShots=window.statsFromPlayer.stats.scored_goals*window.rulesFromTable.scored_goals+window.statsFromPlayer.stats.shots*window.rulesFromTable.shots+window.statsFromPlayer.stats.shots_on_goal*window.rulesFromTable.shots_on_goal.shots_on_goal+window.statsFromPlayer.stats.shots_to_the_post*window.rulesFromTable.shots_to_the_post+window.statsFromPlayer.stats.shots_outside*window.rulesFromTable.shots_outside+window.statsFromPlayer.stats.goalkeeper_scored_goals*window.rulesFromTable.goalkeeper_scored_goals+window.statsFromPlayer.stats.defender_scored_goals*window.rulesFromTable.defender_scored_goals+window.statsFromPlayer.stats.free_kick_goal*window.rulesFromTable.free_kick_goal;//7
	scorePases=window.statsFromPlayer.stats.right_passes*window.rulesFromTable.right_passes+window.statsFromPlayer.stats.wrong_passes*window.rulesFromTable.wrong_passes;//2
	scoreCards=window.statsFromPlayer.stats.red_cards*window.rulesFromTable.red_cards+window.statsFromPlayer.stats.yellow_cards*window.rulesFromTable.yellow_cards;//2
	scoreOtros=window.statsFromPlayer.stats.faults*window.rulesFromTable.faults+window.statsFromPlayer.stats.recoveries*window.rulesFromTable.recoveries+window.statsFromPlayer.stats.assists*window.rulesFromTable.assists+window.statsFromPlayer.stats.saves*window.rulesFromTable.saves+window.statsFromPlayer.stats.winner_team*window.rulesFromTable.winner_team+window.statsFromPlayer.stats.undefeated_defense*window.rulesFromTable.undefeated_defense+window.statsFromPlayer.stats.undefeated_goal*window.rulesFromTable.undefeated_goal+window.statsFromPlayer.stats.offside*window.rulesFromTable.offside+window.statsFromPlayer.stats.faults*window.rulesFromTable.faults+window.statsFromPlayer.stats.faults*window.rulesFromTable.faults+window.statsFromPlayer.stats.missed_penalties*window.rulesFromTable.missed_penalties+window.statsFromPlayer.stats.saved_penalties*window.rulesFromTable.saved_penalties;//12
	totalScore=scoreShots+scorePases+scoreCards+scoreOtros;//23
	tablePenalties=window.statsFromPlayer.stats.missed_penalties*window.rulesFromTable.missed_penalties+window.statsFromPlayer.stats.saved_penalties*window.rulesFromTable.saved_penalties;
	tableInvictus=Number.parseInt(window.statsFromPlayer.stats.undefeated_defense*window.rulesFromTable.undefeated_defense)+Number.parseInt(window.statsFromPlayer.stats.undefeated_goal*window.rulesFromTable.undefeated_goal);
	//alert(JSON.stringify(window.statsFromPlayer));
	detailPlayer='<div class="row" style="    text-align: center; background-color: #333131;color: #FFF;"><div class="row"><H1>'+window.statsFromPlayer.first_name+' '+window.statsFromPlayer.last_name+'</H1></div><div class="row"><H3>'+totalScore+' Puntos sumados</H3></div></div>';
	openColums='<div class="row"><div class="row">';
	shots='<div class="col-md-4 text-center column-shots"><h3>Disparos</h3><div class="row top-content"><img src="../img/goal-net.jpg"></div><div class="row points-detail"><div class="row"><div class="col-xs-3"><div class="data-circle circle-green"><p>'+window.statsFromPlayer.stats.scored_goals+'</p></div><p>Goles</p></div><div class="col-xs-3"><div class="data-circle circle-yellow"><p>'+window.statsFromPlayer.stats.shots_on_goal+'</p></div><p>Al arco</p></div><div class="col-xs-3"><div class="data-circle circle-orange"><p>'+window.statsFromPlayer.stats.shots_to_the_post+'</p></div><p>Al palo</p></div><div class="col-xs-3"><div class="data-circle circle-red"><p>'+window.statsFromPlayer.stats.shots_outside+'</p></div><p>Afuera</p></div></div></div><div class="row results-data"><div class="row"><div class="col-xs-12"><p>PTS por disparo '+scoreShots+'</p></div></div></div></div>';
	cards='<div class="col-md-4 text-center column-cards"><h3>Tarjetas</h3><div class="row top-content"><img src="../img/cards.jpg"></div>					<div class="row points-detail"><div class="row"><div class="col-xs-6 col-md-offset-1"><div class="data-circle circle-yellow"><p>'+window.statsFromPlayer.stats.yellow_cards+'</p></div>					</div><div class="col-xs-2"><div class="data-circle circle-red"><p>'+window.statsFromPlayer.stats.red_cards+'</p></div></div></div></div>		<div class="row results-data">							<div class="row"><div class="col-xs-12"><p>PTS por tarjeta '+scoreCards+'</p></div></div></div></div>';
	pases='<div class="col-md-4 text-center column-passes"><h3>Actividad de Pases</h3><div class="row points-detail text-center"><p style="color:#5EBC5C;"><strong>'+window.statsFromPlayer.stats.right_passes+'</strong> Correctos</p><p style="color:#ff2a00;"><strong>'+window.statsFromPlayer.stats.wrong_passes+'</strong> Inorrectos</p></div><div class="row results-data"><div class="row"><div class="col-xs-12"><p>PTS por pase '+scorePases+'</p></div></div></div></div>';
	closeColums='</div></div>';
	openDotPoints='<div class="row row-points-dots" style="border-top: 1px solid #ccc;    margin-top: 45px;window.statsFromPlayer.stats.missed_saves*window.rulesFromTable.missed_saves+    padding-top: 25px;">';
	col1Dots='<div class="col-md-4 text-center column-passes"><h3>Faltas</h3><div class="row points-detail text-center"><p style="color:#ff2a00;"><strong>'+window.statsFromPlayer.stats.faults+'</strong> Faltas</p></div><div class="row results-data"><div class="row"><div class="col-xs-12"><p>PTS por faltas '+window.statsFromPlayer.stats.faults*window.rulesFromTable.faults+'</p></div></div></div></div>'+'<div class="col-md-4 text-center column-passes"><h3>Recuperaciones</h3><div class="row points-detail text-center"><p style="color:#5EBC5C;"><strong>'+window.statsFromPlayer.stats.recoveries+'</strong> Recuperaciones</p></div><div class="row results-data"><div class="row"><div class="col-xs-12"><p>PTS por recuperaciones '+window.statsFromPlayer.stats.recoveries*window.rulesFromTable.recoveries+'</p></div></div></div></div>'+'<div class="col-md-4 text-center column-passes"><h3>Asistencias</h3><div class="row points-detail text-center"><p style="color:#5EBC5C;"><strong>'+window.statsFromPlayer.stats.assists+'</strong> Asistencias</p></div><div class="row results-data"><div class="row"><div class="col-xs-12"><p>PTS por asistencias '+window.statsFromPlayer.stats.assists*window.rulesFromTable.assists+'</p></div></div></div></div>'+'<div class="col-md-4 text-center column-passes"><h3>Atajadas</h3><div class="row points-detail text-center"><p style="color:#5EBC5C;"><strong>'+window.statsFromPlayer.stats.saves+'</strong> Atajadas</p></div><div class="row results-data"><div class="row"><div class="col-xs-12"><p>PTS por atajadas '+window.statsFromPlayer.stats.saves*window.rulesFromTable.saves+'</p></div></div></div></div>'+'<div class="col-md-4 text-center column-passes"><h3>Equipo Ganador</h3><div class="row points-detail text-center"><p style="color:#5EBC5C;"><strong>'+undefeatDefence(window.statsFromPlayer.stats.winner_team)+'</strong> Equipo Ganador</p></div><div class="row results-data"><div class="row"><div class="col-xs-12"><p>PTS por equipo ganador '+window.statsFromPlayer.stats.winner_team*window.rulesFromTable.winner_team+'</p></div></div></div></div>';
	col2Dots='<div class="col-md-4 text-center column-passes"><h3>Valla invicta</h3><div class="row points-detail text-center"><p style="color:#ff2a00;"><strong>'+undefeatDefence(Number.parseInt(window.statsFromPlayer.stats.undefeated_defense)+Number.parseInt(window.statsFromPlayer.stats.undefeated_goal))+'</strong> Valla invicta</p></div><div class="row results-data"><div class="row"><div class="col-xs-12"><p>PTS por valla invicta '+tableInvictus+'</p></div></div></div></div>'+'<div class="col-md-4 text-center column-passes"><h3>Fuera de juego</h3><div class="row points-detail text-center"><p style="color:#5EBC5C;"><strong>'+window.statsFromPlayer.stats.offside+'</strong> Fuera de juego</p></div><div class="row results-data"><div class="row"><div class="col-xs-12"><p>PTS por Fuera de juego '+window.statsFromPlayer.stats.offside*window.rulesFromTable.offside+'</p></div></div></div></div>'+'<div class="col-md-4 text-center column-passes"><h3>No Atajadas</h3><div class="row points-detail text-center"><p style="color:#5EBC5C;"><strong>'+window.statsFromPlayer.stats.missed_saves+'</strong> No Atajadas</p></div><div class="row results-data"><div class="row"><div class="col-xs-12"><p>PTS por No Atajadas '+window.statsFromPlayer.stats.missed_saves*window.rulesFromTable.missed_saves+'</p></div></div></div></div>'+'<div class="col-md-4 text-center column-passes"><h3>Penales</h3><div class="row points-detail text-center"><p style="color:#5EBC5C;"><strong>'+undefeatDefence(Number.parseInt(window.statsFromPlayer.stats.missed_penalties)+Number.parseInt(window.statsFromPlayer.stats.saved_penalties))+'</strong> Penales</p></div><div class="row results-data"><div class="row"><div class="col-xs-12"><p>PTS por Penales '+tablePenalties+'</p></div></div></div></div>';
	closeDotPoints='</div>';
	totalPoints='<div class="row text-center"><p class="big-big-text">Total 87 PTS</p></div>';
	texto='<div class="contenido-interno">'+detailPlayer+openColums+shots+cards+pases+closeColums+openDotPoints+col1Dots+col2Dots+closeDotPoints+'</div>';
	return texto;
}
function undefeatDefence(val){
	if(val>0){
		return "si";
	}else{
		return "no";
	}
}