// JavaScript Document
//window.onload=openTableToPlayLive(186);
window.keepLiveTablesUpdateVar=null;
window.liveTableOpen=null;
window.liveMatchOpen={"users":[],"players":[],"stats":[]};
window.readInidences=[];
window.resultArrayTeams=[];
function readInidecesOfOpenTable(tableDescription){
	var splitArray=tableDescription.split('-'); // Ejemplo "libertadores-257742"
	json=JSON.stringify({"table_tournament":splitArray[0],"table_match":splitArray[1]});
	//startLoadingAnimation();
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
			if(IsJsonString(jsonStr)){ // Me fijo si dio un error, en el caso de que de le sigo mandando
			var doble=JSON.parse(jsonStr);
			readIncidencesForLiveTable(doble);
			return true;}else{
				readInidecesOfOpenTable(tableDescription);
			}
	    }else if(xmlhttp.status==503 || xmlhttp.status==404){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlay("ERROR DE CONEXIÓN","<p>Hubo un error de conexió intente nuevamente</p>");
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("POST","http://data.jugaplay.com/live/xmlReaderToJson.php",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		//xmlhttp.withCredentials = "true";
		xmlhttp.send(json);	
	}else{
		setTimeout(function(){ readInidecesOfOpenTable(tableDescription); }, 500);
	}
}
// Initialize functions
function readOpenTableLive(openTable){
		openTable=parseTableForGroupPlayingOption(openTable);
		window.liveTableOpen=openTable;
		initializeAddAllPlayers(openTable);
	}
// All players
function initializeAddAllPlayers(openTable){
	matchesInTable=openTable.matches;
	for(a in matchesInTable){// Para cada partido de la mesa
		for (player in matchesInTable[a].local_team.players){
			window.liveMatchOpen.players.push(parsePlayers(matchesInTable[a].local_team.players[player],matchesInTable[a].local_team.id,"Home"));
		}
		for (player in matchesInTable[a].visitor_team.players){
			window.liveMatchOpen.players.push(parsePlayers(matchesInTable[a].visitor_team.players[player],matchesInTable[a].visitor_team.id,"Away"));
		}
	}
	initializeAddAllUsers(openTable);
}
function initializeAddAllUsers(openTable){
	usersInTable=openTable.playing;
	for (user in usersInTable){
		window.liveMatchOpen.users.push(parseUsers(usersInTable[user]));
	}
	readInidecesOfOpenTable(openTable.description);
	//alert(JSON.stringify(window.liveMatchOpen));
	//setTimeout(function(){ changeValues(); }, 3000);
}
function parsePlayers(player,teamId, HomeOrAway){
	return {"id":player.id,"dfId":player.data_factory_id,"playerTeamId":teamId,"playerName":player.first_name+' '+player.last_name,"playerPosition":player.position,"playerStats":[],"playerPoints":0,"playerOrder":0, "HomeOrAway":HomeOrAway}
}
function parseUsers(user){
	var players=parseAddPlayerToUser(user.players);
	// Tengo que intentar no usar el id para identificarlo sino el nickname, no esta repetido el nick no? // 
	return {"id":user.user_id,"nickname":user.nickname,"players":players,"RankingTournamentPosition":user.RankingTournamentPosition,"playersPoints":0,"userPosition":0}
}
function parseAddPlayerToUser(players){
	var selectedPlayers=[];
	for (player in window.liveMatchOpen.players){
			if(playerHasBeenSelectedByUser( window.liveMatchOpen.players[player],players)){
				selectedPlayers.push(window.liveMatchOpen.players[player]);
			}
		}
	return selectedPlayers
}
// "players": [{"data_factory_id": 57885},{"data_factory_id": 16266},{"data_factory_id": 572}]
function playerHasBeenSelectedByUser(player,selectedPlayersByUser){
	for(a in selectedPlayersByUser){
		if(selectedPlayersByUser[a].player_id==player.id){return true;}
	}
	return false;
}
function incidenceHasBeenConsiderd(nro){
	if(window.readInidences.indexOf(nro)>-1){ // ya esta
		return true;
	}else{
		window.readInidences.push(nro);
		return false;
	}
}
// {'Id':999".$incidencia[incidenceId].",incidenciaId':39,'playerId':".$incidencia[assistanceById].",'minutes':".$incidencia[minutes].",'seconds':".$incidencia[seconds]."}
function readIncidencesForLiveTable(recieveTableArray){
	window.resultArrayTeams=recieveTableArray[0].teams;
	incidencesArray=recieveTableArray[0].stats;
	for(incidence in incidencesArray){
		if(!incidenceHasBeenConsiderd(incidencesArray[incidence].id)){
			fetchPlayerForIncidence(incidencesArray[incidence]);
		}
	}
	calculatePlayerPointsAndAddGeneralStats();
}
// {'Id':14120418,'incidenciaId':180,'playerId':166,'minutes':0,'seconds':17, 'name':}
function fetchPlayerForIncidence(icidence){
	playerOptions=window.liveMatchOpen.players;
	for (player in playerOptions){
		if(playerOptions[player].dfId==icidence.playerId){
			addIncidenceToPlayer(icidence,playerOptions[player]);
			return;
		}
	}
	return;
}
function addIncidenceToPlayer(icidence,player){
	tableRules=window.liveTableOpen.table_rules;
	// playerPosition
	switch(icidence.incidenciaId) {
			case 3://amarilla
			icidence.name="yellow_cards";
			icidence.value=tableRules.yellow_cards;
			player.playerStats.push(icidence);
        	break;
			case 4://Roja
			icidence.name="red_cards";
			icidence.value=tableRules.red_cards;
			player.playerStats.push(icidence);
        	break;
			case 5://Roja
			icidence.name="red_cards";
			icidence.value=tableRules.red_cards;
			player.playerStats.push(icidence);
        	break;
			case 33://Disparo afuera
			icidence.name="shots_outside";
			icidence.value=tableRules.shots_outside+tableRules.shots;
			player.playerStats.push(icidence);
        	break;
			case 34://Disparo al palo
			icidence.name="shots_to_the_post";
			icidence.value=tableRules.shots_to_the_post+tableRules.shots;
			player.playerStats.push(icidence);
        	break;
			case 35://Disparo al arco
			icidence.name="shots_on_goal";
			icidence.value=tableRules.shots_on_goal+tableRules.shots;
			player.playerStats.push(icidence);
        	break;
			case 36:// Falta cometida
			icidence.name="faults";
			icidence.value=tableRules.faults;
			player.playerStats.push(icidence);
        	break;
			case 38:// atajada
				if(player.playerPosition=="goalkeeper"){
					icidence.name="saves";
					icidence.value=tableRules.saves;
					player.playerStats.push(icidence);
				}
        	break;
			case 39:// asistencia
			icidence.name="assists";
			icidence.value=tableRules.assists;
			player.playerStats.push(icidence);
        	break;
			case 42:// Penal atajado
			icidence.name="saved_penalties";
			icidence.value=tableRules.saved_penalties;
			player.playerStats.push(icidence);
        	break;
			case 43:// Penal errado
			icidence.name="missed_penalties";
			icidence.value=tableRules.missed_penalties;
			player.playerStats.push(icidence);
        	break;
			case 44:// Penal errado
			icidence.name="missed_penalties";
			icidence.value=tableRules.missed_penalties;
			player.playerStats.push(icidence);
        	break;
			case 45:// Penal errado
			icidence.name="missed_penalties";
			icidence.value=tableRules.missed_penalties;
			player.playerStats.push(icidence);
        	break;
			case 47:// Offside
			icidence.name="offside";
			icidence.value=tableRules.offside;
			player.playerStats.push(icidence);
			break;
			case 182:// Quite
			icidence.name="recoveries";
			icidence.value=tableRules.recoveries;
			player.playerStats.push(icidence);
        	break;
    		case 180://Pase correcto
			icidence.name="right_passes";
			icidence.value=tableRules.right_passes;
			player.playerStats.push(icidence);
        	break;
    		case 181:// Pases incorrectos
			icidence.name="wrong_passes";
			icidence.value=tableRules.wrong_passes;
			player.playerStats.push(icidence);
       		break;
			case 9:// Gol de jugada
			if(player.playerPosition=="goalkeeper"){
					icidence.name="goalkeeper_scored_goals";
					icidence.value=tableRules.scored_goals+tableRules.shots+tableRules.goalkeeper_scored_goals;
					player.playerStats.push(icidence);
				}
			else if(player.playerPosition=="defender"){
					icidence.name="defender_scored_goals";
					icidence.value=tableRules.scored_goals+tableRules.shots+tableRules.defender_scored_goals;
					player.playerStats.push(icidence);
			}else{
					icidence.name="scored_goals";
					icidence.value=tableRules.scored_goals+tableRules.shots;
					player.playerStats.push(icidence);
			}
       		break;
			case 11:// Gol de cabeza
       		if(player.playerPosition=="goalkeeper"){
					icidence.name="goalkeeper_scored_goals";
					icidence.value=tableRules.scored_goals+tableRules.shots+tableRules.goalkeeper_scored_goals;
					player.playerStats.push(icidence);
				}
			else if(player.playerPosition=="defender"){
					icidence.name="defender_scored_goals";
					icidence.value=tableRules.scored_goals+tableRules.shots+tableRules.defender_scored_goals;
					player.playerStats.push(icidence);
			}else{
					icidence.name="scored_goals";
					icidence.value=tableRules.scored_goals+tableRules.shots;
					player.playerStats.push(icidence);
			}
       		break;
			case 12:// Gol de tiro libre
			if(player.playerPosition=="goalkeeper"){
					icidence.name="goalkeeper_scored_goals";
					icidence.value=tableRules.scored_goals+tableRules.shots+tableRules.goalkeeper_scored_goals+free_kick_goal;
					player.playerStats.push(icidence);
				}
			else if(player.playerPosition=="defender"){
					icidence.name="defender_scored_goals";
					icidence.value=tableRules.scored_goals+tableRules.shots+tableRules.defender_scored_goals+free_kick_goal;
					player.playerStats.push(icidence);
			}else{
					icidence.name="scored_goals";
					icidence.value=tableRules.scored_goals+tableRules.shots+tableRules.free_kick_goal;
					player.playerStats.push(icidence);
			}
			player.playerStats.push({'Id':icidence.Id+99000000,'incidenciaId':icidence.incidenciaId,'playerId':icidence.playerId,'minutes':icidence.minutes,'seconds':icidence.seconds, 'name':'free_kick_goal','value':tableRules.free_kick_goal});
			// free_kick_goal
       		break;
			case 13:// Gol de penal
       		if(player.playerPosition=="goalkeeper"){
					icidence.name="goalkeeper_scored_goals";
					icidence.value=tableRules.scored_goals+tableRules.shots+tableRules.goalkeeper_scored_goals;
					player.playerStats.push(icidence);
				}
			else if(player.playerPosition=="defender"){
					icidence.name="defender_scored_goals";
					icidence.value=tableRules.scored_goals+tableRules.shots+tableRules.defender_scored_goals;
					player.playerStats.push(icidence);
			}else{
					icidence.name="scored_goals";
					icidence.value=tableRules.scored_goals+tableRules.shots;
					player.playerStats.push(icidence);
			}
       		break;
    		default:
			//alert('In No'+incidenciaId);
			}
			//alert("tipo:"+icidence.name+", Jugador:"+player.playerName);
}
function addWinnerTeamAndNoGoalsToPlayersAndMissSaves(player){
	while(!deleteOldResultPlayerStats(player)){;}// Borro todas las stats antiguas que dependan del resultado
	if(player.playerStats.length>0){// Tiene que haber intervenido en el juego, sino no suma
		for(team in window.resultArrayTeams){
			if(window.resultArrayTeams[team].teamHome==player.HomeOrAway){
				playerTeam= window.resultArrayTeams[team].teamGoals;
			}else{
				otherTeam= window.resultArrayTeams[team].teamGoals;
			}
		}
		if(otherTeam==0){
			if(player.playerPosition=="goalkeeper"){player.playerStats.push({"Id":"0","incidenciaId":0,"playerId":0,"minutes":0,"seconds":0,"name":"undefeated_goal","value":window.liveTableOpen.table_rules.undefeated_goal});}
			if(player.playerPosition=="defender"){player.playerStats.push({"Id":"0","incidenciaId":0,"playerId":0,"minutes":0,"seconds":0,"name":"undefeated_defense","value":window.liveTableOpen.table_rules.undefeated_defense});}
		}else{
			if(player.playerPosition=="goalkeeper"){
				for(var goal=0; goal<otherTeam; goal++){ // Agrego una no atajada por gol
					player.playerStats.push({"Id":"0","incidenciaId":0,"playerId":0,"minutes":0,"seconds":0,"name":"missed_saves","value":window.liveTableOpen.table_rules.missed_saves});
				}
		}
		}
		if(playerTeam>otherTeam){player.playerStats.push({"Id":"0","incidenciaId":0,"playerId":0,"minutes":0,"seconds":0,"name":"winner_team","value":window.liveTableOpen.table_rules.winner_team});}
	}
	return true;
}
function deleteOldResultPlayerStats(player){
	for(stat in player.playerStats){
		if(["winner_team","undefeated_goal","undefeated_defense","missed_saves"].indexOf(player.playerStats[stat].name)>-1){ // Si es una de estas
			player.playerStats.splice(stat, 1);
			return false;
		}
	}
	return true;
}
// Calcular puntos y posiciones una vez ya sumado todo
function calculatePlayerPointsAndAddGeneralStats(){
	playerOptions=window.liveMatchOpen.players;
	for (player in playerOptions){
		addWinnerTeamAndNoGoalsToPlayersAndMissSaves(playerOptions[player]);
		playerOptions[player].playerPoints=totalValuePlayerStats(playerOptions[player].playerStats);
	}
	calculateUserPoints();
}
function calculateUserPoints(){
	userOptions=window.liveMatchOpen.users;//window.liveMatchOpen.users
	for (user in userOptions){
		userOptions[user].playersPoints=totalValuePlayersPoints(userOptions[user].players);
	}
	calculateUserPositions();
}
function calculateUserPositions(){
	window.liveMatchOpen.users.sort(sortUsersByPointsAndRanking);
	for (user in window.liveMatchOpen.users){
		window.liveMatchOpen.users[user].userPosition=parseInt(user)+1;
	}
	window.liveMatchOpen.players.sort(sortPlayersByPoints);
	for (player in window.liveMatchOpen.players){
		window.liveMatchOpen.players[player].playerOrder=parseInt(player);
	}
	// Verificar si sigue abierto antes de actualizar
	if(document.getElementById("complete-live-container")!=null){
		updateUsersPlayingLive();
	}
}
// Calculo el valor total de las incidencias del jugador
function totalValuePlayerStats(insidences){
	var returnValue=0;
	for(stats in insidences){
		returnValue+=insidences[stats].value
	}
	return returnValue;
}
// Calculo el valor total de las sumatorias de los jugadores elegidos
function totalValuePlayersPoints(players){
	var returnValue=0;
	for(player in players){
		returnValue+=players[player].playerPoints;
	}
	return returnValue;
}
// Function Sort Users
// RankingTournamentPosition  playersPoints  userPosition
function sortUsersByPointsAndRanking(a,b){ // -1 va antes 1 despues 0 mantiene
	if(a.playersPoints == b.playersPoints)
    {
        return (b.RankingTournamentPosition > a.RankingTournamentPosition) ? -1 : (b.RankingTournamentPosition < a.RankingTournamentPosition) ? 1 : 0;
    }
    else
    {
        return (a.playersPoints > b.playersPoints) ? -1 : 1;
    }
	
}
function sortPlayersByPoints(a,b){ // -1 va antes 1 despues 0 mantiene
	 return (a.playerPoints > b.playerPoints) ? -1 : (a.playerPoints < b.playerPoints) ? 1 : 0;
}
//Function Sort Players