// JavaScript Document
// Comienza Funciones armado de tabla
function openTableToPlayOverLapseWindow(tableId){
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
	 	 if ((xmlhttp.readyState==4 && xmlhttp.status==200) ||  (xmlhttp.readyState==4 && xmlhttp.status==422) ||  (xmlhttp.readyState==4 && xmlhttp.status==401))
	    {
			jsonStr=xmlhttp.responseText;
stopTimeToWait();
			closeLoadingAnimation();
			var json=JSON.stringify(jsonStr);
			var servidor=JSON.parse(json);
			var doble=JSON.parse(servidor);
			readOpenTable(doble);
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlay("ERROR DE CONEXIÓN","<p>Hubo un error de conexió intente nuevamente</p>");
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("GET","http://app.jugaplay.com/api/v1/tables/"+tableId+"/",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send();}	
}
function readOpenTable(openTable){
		 window.actualOpenTable=openTable;
		 window.arrPlayersSelected=[];
		 initializeFiltersForTable();
		 titleSelectedForTable=openTable.title;
		 contenidoMesa=contentForOpenTableWindow(openTable);
		 openOverLapseWindow(titleSelectedForTable, contenidoMesa);
		 updatePositionOfPlayersForWindow();
	}
function contentForOpenTableWindow(openTable){
	startTopBlocks='<div class="container players-top-container" style="width:100%; padding:0; position:fixed; z-index:10;">';
	fisrtBlockShownWithData='<div class="container container-style1 bg-color2"><div class="row text-color2 vertical-align"><div class="col-xs-6"><h3 class="title-style1">'+openTable.title+'</h3></div><div class="col-xs-2 text-right match-info"><a onClick="openTableInformation(0);"><img src="img/icon-i-white.png"></a></div><div class="col-xs-4 text-right"><p class="text-block-style1">'+dateFormatViewNormal(openTable.start_time)+'</p></div></div></div>';
	secondBlockWithFilters='<div class="container container-style1 container-spacing-style1 bg-color3"><a onClick="createShowIndividualTableFilter();" class="btn-filter"><img src="img/icon-filter-white.png"></a><div class="filter-list" id="filter-list-shown-in-table"></div></div>';
	thirdBlockWithPLayersSelected='<div class="container selected-players" id="container-selected-players-table"><div class="arrow-drag up" onClick="colapseSelectedPlayers(this);"></div></div>';
	endTopBlocks='</div>';
	fourthBlockWithPLayersSelected='<div class="container players-list" id="container-listed-players-table">'+addPlayersInToTable(openTable)+'</div>';
	lastWithButton='<div class="container bg-color2 btn-play-container"><button type="button" id="button-play-of-table" onClick="buttomPlayTable();" class="btn btn-play pending">FALTAN '+openTable.number_of_players+' JUGADORES</button></div>';
	return startTopBlocks+fisrtBlockShownWithData+secondBlockWithFilters+thirdBlockWithPLayersSelected+endTopBlocks+fourthBlockWithPLayersSelected+lastWithButton ;
	//return playerTest()+lastWithButton ;
}
function addPlayersInToTable(mesa){
	tabalasSelect="";
	matchesInTable=mesa.matches;
	for(a in matchesInTable){// Para cada partido de la mesa
		equipoLocalShort=matchesInTable[a].local_team.short_name;
		equipoVisitanteShort=matchesInTable[a].visitor_team.short_name;
		partido=equipoLocalShort+" <b>VS</b> "+equipoVisitanteShort;
		for (player in matchesInTable[a].local_team.players){
			tabalasSelect+=tablaSelectJugador(matchesInTable[a].local_team.players[player],matchesInTable[a].local_team.name,matchesInTable[a].local_team.id,partido);
		}
		for (player in matchesInTable[a].visitor_team.players){
			tabalasSelect+=tablaSelectJugador(matchesInTable[a].visitor_team.players[player],matchesInTable[a].visitor_team.name,matchesInTable[a].visitor_team.id,partido);
		}
	}
	return tabalasSelect;
}
function tablaSelectJugador(player,team,teamId,partido){
	id=player.id;
	img='<img class="player-profile-pic" class="player-profile-pic" src="'+playerGetImage(id)+'">';
	imgTeamLogo='<img class="team-logo" src="'+clubGetLogo(teamId)+'">';
	
	name=player.last_name+" "+player.first_name;
	posicion=traducirPosicionJugadorMesa(player.position);
	nacionalidad=player.nationality;
	linea='<div data-player-name="'+name+'" data-player-team="'+team+'" data-player-position="'+player.position+'" class="row players-list-item vertical-align"><div class="col-xs-2">'+img+'</div><div class="col-xs-6 player-name"><p><strong>'+name+'</strong></p><p>'+posicion+'</p></div><div class="col-xs-2">'+imgTeamLogo+'</div><div class="col-xs-2 text-right"><button onClick="gameMesaSelectPlayerForTeam(this,\''+id+'\');" type="button" class="btn btn-player-select"><span>&#10003;</span></button></div></div>';
	return linea;
}
function colapseSelectedPlayers(arrowElement){
	selectedPlayerContainer=arrowElement.parentNode;
	// collapse
	if(arrowElement.classList.contains("up")){ 
		arrowElement.classList.remove("up");
		arrowElement.classList.add("down");
		selectedPlayerContainer.classList.add("collapse");
	}else{
		arrowElement.classList.remove("down");
		arrowElement.classList.add("up");
		selectedPlayerContainer.classList.remove("collapse");
	} 
	 updatePositionOfPlayersForWindow();
}
// Fin Funciones armado de tabla
// Comienza Funciones Juego de mesa
function gameMesaSelectPlayerForTeam(elementBoton,idPlayer){
	playerRow=elementBoton.parentNode.parentNode;
	if(elementBoton.classList.contains("selected")){
		document.getElementById("container-listed-players-table").appendChild(playerRow); 
		elementBoton.classList.remove("selected");
		index=window.arrPlayersSelected.indexOf(idPlayer);
		if(index>-1){window.arrPlayersSelected.splice(index, 1);}	
	}else{
		if(restPlayersToAdd()){
		document.getElementById("container-selected-players-table").appendChild(playerRow);
		elementBoton.classList.add("selected");
		window.arrPlayersSelected.push(idPlayer);
		}else{avisoEmergenteJugaPlay("Listado Completo","<p>Ya selecciono los  <b>"+window.actualOpenTable.number_of_players+"</b> jugadores para jugar esta mesa. Si desea agregar uno distinto debe sacar uno del listado de seleccionados.</p>");}
	} 
	 updatePositionOfPlayersForWindow();
	 updateButtomOfTable(); 
}
function restPlayersToAdd(){
	return (window.arrPlayersSelected.length<window.actualOpenTable.number_of_players)
}
function updateButtomOfTable(){
	buttom=document.getElementById("button-play-of-table");
	if(restPlayersToAdd()){
		if(!buttom.classList.contains("pending")){buttom.classList.add("pending");}
		pendingPlayers=window.actualOpenTable.number_of_players - window.arrPlayersSelected.length;
		buttom.innerHTML="FALTAN "+pendingPlayers+" JUGADORES";
	}else{
		if(buttom.classList.contains("pending")){buttom.classList.remove("pending");}
		buttom.innerHTML="JUGAR";
	}
}
// Una vez que se apreta el boton
function buttomPlayTable(){
	if(!restPlayersToAdd()){
		completePlayingTable();
		}else{avisoEmergenteJugaPlay("Faltan Jugadores","<p>Debe seleccionar <b>"+window.actualOpenTable.number_of_players+"</b> jugadores para jugar esta mesa.</p>");}
}
function completePlayingTable(){
	mesa=window.actualOpenTable;
	if(mesa.entry_coins_cost>0 || mesa.has_password==true){// verificar que tiene las monedas cuando le pregunte
		if(mesa.entry_coins_cost>0){
			checkDataForCoinsGame(mesa.id,mesa.entry_coins_cost);// 
		}
		else{
			preguntarCodigoSms(mesa.id);
		}
	}else{
		sendPlayToJugaplay(mesa.id,"false");
	}
}
/* Revisar Juego Coins */
function checkDataForCoinsGame(idTabla,costOfTable){ // Recordar actualizar los datos despues de la jugada
				if(userCanSpentXCoins(costOfTable)){
					editXCoinsFromUsersWallet(-costOfTable);
                    sendPlayToJugaplay(idTabla,"true");
				}else{
						avisoEmergenteJugaPlay("Monedas Insuficientes","<p>Tienes "+menuGetAmountOfCoins()+" Monedas y la Mesa requiere "+costOfTable+" para anotarse.</p> ");
				}
}
/* Realizo la jugada */
function sendPlayToJugaplay(idTabla,bet){
	startLoadingAnimation();
	if(bet!="false"){
		json=JSON.stringify({"table_id":idTabla, "player_ids":[window.arrPlayersSelected],"bet":bet});
	}
	else{
		json=JSON.stringify({"table_id":idTabla, "player_ids":[window.arrPlayersSelected]});
	}
	//alert(json);
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
			//alert("Respuesta finLogInUsuarioEnElSitioEnviandoDatosJugada"+jsonStr);
			var json=JSON.stringify(jsonStr);
			var servidor=JSON.parse(json);
			var doble=JSON.parse(servidor);
			closeLoadingAnimation();
			if (typeof(doble.error) !== 'undefined'){analizeErrorFromServer("End of Table",doble);}
			else{endOfPlayedTable(idTabla);}
			//analizarRespuestaRegistroBeta(doble);
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlay("ERROR DE CONEXIÓN","<p>Hubo un error de conexió intente nuevamente</p>");
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("POST","http://app.jugaplay.com/api/v1/play",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send(json);}
}
function endOfPlayedTable(idTabla){
	
	closeAllOverLapseWindow();
	setTimeout(function(){changeOptionToPlayed(idTabla);avisoEmergenteJugaPlay("Gracias por Jugar","<p>¡Te deseamos mucha suerte!</p>");}, 1000);
}
// Fin Funciones Juego de mesa
// Funciones complementarias para El Play Tables
function traducirPosicionJugadorMesa(nombrePosicion){
	if(nombrePosicion=="goalkeeper"){return "Arquero";}
	if(nombrePosicion=="defender"){return "Defensor";}
	if(nombrePosicion=="midfielder"){return "Mediocampista";}
	if(nombrePosicion=="forward"){return "Delantero";}
	return "Otra";
}
function updatePositionOfPlayersForWindow(){
	setTimeout(function(){$(".players-list").css("margin-top", $(".players-top-container").height() + "px");}, 200);
}