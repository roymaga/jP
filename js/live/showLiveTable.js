// JavaScript Document
function generateTabsWithData(openTable){
	return '<ul class="nav nav-tabs" role="tablist"><li role="presentation" class="'+showIfActive(1)+'"><a href="#InformationTab1" aria-controls="tab1" role="tab" data-toggle="tab" calss="trn">DATOS</a></li><li role="presentation" class="'+showIfActive(2)+'"><a href="#InformationTab2" aria-controls="tab2" role="tab" data-toggle="tab" calss="trn">Premios</a></li><li role="presentation" class="'+showIfActive(3)+'"><a href="#InformationTab3" aria-controls="tab3" role="tab" data-toggle="tab">'+positionsOrPlayingText(openTable)+'</a></li></ul>';
}
// Despues ir revisando con un bubble sort las posiciones constantemente (Posible animacion flechita para arriba o para abajo)
function updateUsersPlayingLive(){
	var users=window.liveMatchOpen.users;
	var div;
	var usersShowLive=document.getElementById("usersShowLive");
	for (user in users){
		// Reviso si es el usuario activo para poner en el cuadro principal
		if(document.getElementById("live-user-nro"+users[user].id) != null){ // Si ya esta lo actualizo sino lo creo
			parseUpdateUsersComplete(users[user]);
			document.getElementById("live-user-nro"+users[user].id).setAttribute("data-ubication-position", users[user].userPosition);
		}else{
			divUser=document.createElement("div");
			divUser.id="live-user-nro"+users[user].id;
			divUser.setAttribute("data-ubication-position", users[user].userPosition);
			divUser.innerHTML=parseShowUsersComplete(users[user]);
			usersShowLive.appendChild(divUser);
			}
		// es el principal
		if(getUserJugaplayId()==users[user].id){// Si es el usuario actual
			var oldPosition=parseInt(document.getElementById("usersShowLive-userPosition").innerHTML.replace('°',''));
			document.getElementById("usersShowLive-userPosition").innerHTML=users[user].userPositionToShow+'°';
			if(oldPosition>users[user].userPosition){showArrowLive("up",document.getElementById("usersShowLive-userPosition"));}
			if(oldPosition<users[user].userPosition){showArrowLive("down",document.getElementById("usersShowLive-userPosition"));}
			if(users[user].bet_multiplier!=null){
			document.getElementById("usersShowLive-userCoins").innerHTML=users[user].userCoins*users[user].bet_multiplier;
			}else{
				document.getElementById("usersShowLive-userCoins").innerHTML=users[user].userCoins;
			}
			document.getElementById("usersShowLive-userPts").innerHTML=users[user].playersPoints;
			parseUsersBigPrizeImg(users[user].bet_multiplier);

			}
	}
	checkLanguageElement(document.getElementById("usersShowLive"));
	updatePlayersPlayingLive();
}
function parseUsersBigPrizeImg(bet_multiplier){
	if(window.liveTableOpen.playing[0].type=="training"){var prizeType=window.liveTableOpen.entry_cost_type;}
	else{var prizeType=window.liveTableOpen.prizes[0].prize_type;}
	if(prizeType=="coins"){var pr='coins.png';var x='x2.png';}else{var pr='chip.svg';var x='x2c.png';}
	if(bet_multiplier!=null){var img= "img/icons/coins/"+x;}else{var img= "img/icons/coins/"+pr;}
	if(document.getElementById("usersShowLive-userCoinsImg").src!=img){
				document.getElementById("usersShowLive-userCoinsImg").src=img;
				if(bet_multiplier!=null){
				document.getElementById("usersShowLive-userCoinsImg").style.width="50px";}
			}
}
function updatePlayersPlayingLive(){
	var players=window.liveMatchOpen.players;
	var div;
	var playersShowLive=document.getElementById("playersShowLive");
	for (player in players){
		if(document.getElementById("live-player-nro"+players[player].id) != null){ // Si ya esta lo actualizo sino lo creo
			parseUpdatePlayersComplete(players[player]);
			document.getElementById("live-player-nro"+players[player].id).setAttribute("data-ubication-position", player);
		}else{
			divPlayer=document.createElement("div");
			divPlayer.id="live-player-nro"+players[player].id;
			divPlayer.setAttribute("data-ubication-position", player);
			divPlayer.innerHTML=parseShowPlayersComplete(players[player],player);
			playersShowLive.appendChild(divPlayer);
			}
	}
	checkLanguageElement(document.getElementById("playersShowLive"));
	keepLiveTableUpdate();
}
function parseShowUsersComplete(user){
	if(user.userPosition%2==0){oddEven="odd";}else{oddEven="even";}
	collapseHtml='';
	for(player in user.players){
		collapseHtml+=parseShowPlayersBase(user.players[player],player);
	}
	if(user.nickname.length<15){var nick=user.nickname;}else{var nick='<span onClick="showCompleteNickNameLive(this,\''+user.nickname+' \')">'+user.nickname.substr(0, 12)+' ...</span>'}
	return '<div class="row players-list-item vertical-align color-player-list '+oddEven+'"> <div class="col-xs-2"><p class="text-block-style2" id="live-userTablePositionShow-'+user.id+'">'+user.userPositionToShow+'</p></div><div class="col-xs-4 player-name nopadding"> <p><strong>'+nick+'</strong></p></div><div class="col-xs-2 nopadding" id="live-userTableCoinsShow-'+user.id+'"> '+parseShowCoinsLive(user.userCoins, user.bet_multiplier)+'</div><div class="col-xs-2 nopadding" id="live-userTablePointsShow-'+user.id+'"> '+user.playersPoints+' Pts </div><div class="col-xs-2 text-right"> <button type="button" onClick="changeArrow(this);" class="btn btn-live" data-toggle="collapse" data-target="#live-userPlayersContainer-'+user.id+'" ><i class="fa fa-chevron-down" aria-hidden="true"></i></button> </div></div><div id="live-userPlayersContainer-'+user.id+'" class="collapse">'+collapseHtml+'</div>';
}
function parseUpdateUsersComplete(user){
	// Animacion del numero con flechita que sube o baja
	if(parseInt(document.getElementById("live-userTablePositionShow-"+user.id).innerHTML.replace('°',''))>user.userPositionToShow){// Mejoro
		document.getElementById("live-userTablePositionShow-"+user.id).innerHTML=user.userPositionToShow;
		showArrowLive("up",document.getElementById("live-userTablePositionShow-"+user.id));
	}else if(parseInt(document.getElementById("live-userTablePositionShow-"+user.id).innerHTML.replace('°',''))<user.userPositionToShow){//empeoro
		document.getElementById("live-userTablePositionShow-"+user.id).innerHTML=user.userPositionToShow;
		showArrowLive("down",document.getElementById("live-userTablePositionShow-"+user.id));
	}else{// mantuvo
	document.getElementById("live-userTablePositionShow-"+user.id).innerHTML=user.userPositionToShow;}
	// Fin de animacion
	document.getElementById("live-userTableCoinsShow-"+user.id).innerHTML=parseShowCoinsLive(user.userCoins, user.bet_multiplier);
	//showArrowLive(tipe,element) up down
	document.getElementById("live-userTablePointsShow-"+user.id).innerHTML=user.playersPoints+' Pts ';
	collapseHtml='';
	for(player in user.players){collapseHtml+=parseShowPlayersBase(user.players[player],player);}
	document.getElementById("live-userPlayersContainer-"+user.id).innerHTML=collapseHtml;
}
function parseShowPlayersComplete(player,number){
	if(number%2==0){oddEven="odd";}else{oddEven="even";}
	return '<div class="row players-list-item vertical-align color-player-list '+oddEven+'"> <div class="col-xs-2"><img class="team-logo" src="img/icons/team-logo/'+player.playerTeamId+'.gif"></div><div class="col-xs-6 player-name"> <p><strong>'+player.playerName+'</strong></p><p>'+traducirPosicionJugadorMesa(player.playerPosition)+'</p></div><div class="col-xs-2 nopadding" id="live-playerTablePointsShow-'+player.id+'"> '+player.playerPoints+' Pts </div><div class="col-xs-2 text-right"> <button type="button" onClick="changeArrow(this);" class="btn btn-live" data-toggle="collapse" data-target="#live-playerAllStatsContainer-'+player.id+'" ><i class="fa fa-chevron-down" aria-hidden="true"></i></button> </div></div><div id="live-playerAllStatsContainer-'+player.id+'" class="collapse">'+parseShowIncidences(player.playerStats)+'</div>';
}
function parseUpdatePlayersComplete(player){
	document.getElementById("live-playerTablePointsShow-"+player.id).innerHTML=player.playerPoints+' Pts ';
	document.getElementById("live-playerAllStatsContainer-"+player.id).innerHTML=parseShowIncidences(player.playerStats);
}
function parseShowIncidences(insidences){
	var rightPasses=0;
	var wrongPasses=0;
	htmlToShow='';
	countForEven=1;
	if(insidences.length>0){ // Chequeo si hay o no, sino lo pongo en 0
		for(stats in insidences){ // Los pases los sumo directamente para no ser confuso como se muestra
			if(insidences[stats].incidenciaId==180){rightPasses++;}
			else if(insidences[stats].incidenciaId==181){wrongPasses++;}else{
				if(insidences[stats].incidenciaId==0){ // Equipo ganador y valla invicta no llevan minutos
					htmlToShow+='<div class="row players-list-item vertical-align color-player-list2 '+parseNumberToTextOddOrEven(countForEven)+'" > <div class="col-xs-2"><img class="team-logo" src="img/icons/history/'+insidences[stats].name+'.png"></div><div class="col-xs-5 player-name"> <p>'+parseStatsNameToShow(insidences[stats].name)+'</p></div><div class="col-xs-1 text-right nopadding"> </div><div class="col-xs-4"> <p class="text-right nomarging"> <span class="text-block-style2">'+parseStatsPointsToShow(insidences[stats].value)+'</span> <b>Pts</b></p></div></div>';
				}else{
					htmlToShow+='<div class="row players-list-item vertical-align color-player-list2 '+parseNumberToTextOddOrEven(countForEven)+'" > <div class="col-xs-2"><img class="team-logo" src="img/icons/history/'+insidences[stats].name+'.png"></div><div class="col-xs-5 player-name"> <p>'+parseStatsNameToShow(insidences[stats].name)+'</p></div><div class="col-xs-1 text-right nopadding"> '+insidences[stats].minutes+'\' </div><div class="col-xs-4"> <p class="text-right nomarging"> <span class="text-block-style2">'+parseStatsPointsToShow(insidences[stats].value)+'</span> <b>Pts</b></p></div></div>';
				}
				countForEven++;
			}
		}
		if(wrongPasses>0){// Sumo los pases correctos
			htmlToShow='<div class="row players-list-item vertical-align color-player-list2 '+parseNumberToTextOddOrEven(2)+'" > <div class="col-xs-2"><img class="team-logo" src="img/icons/history/right_passes.png"></div><div class="col-xs-5 player-name"> <p>'+parseStatsNameToShow("wrong_passes")+'</p></div><div class="col-xs-1 text-right nopadding"> <b>'+wrongPasses+'</b> </div><div class="col-xs-4"> <p class="text-right nomarging"> <span class="text-block-style2">'+parseStatsPointsToShow(window.liveTableOpen.table_rules.wrong_passes*wrongPasses)+'</span> <b>Pts</b></p></div></div>'+htmlToShow;
			countForEven++;
		}
		if(rightPasses>0){// Sumo los pases correctos
			if(wrongPasses>0){countForEven=1;}else{countForEven=2;}// Para que quede variado
			htmlToShow='<div class="row players-list-item vertical-align color-player-list2 '+parseNumberToTextOddOrEven(countForEven)+'" > <div class="col-xs-2"><img class="team-logo" src="img/icons/history/right_passes.png"></div><div class="col-xs-5 player-name"> <p>'+parseStatsNameToShow("right_passes")+'</p></div><div class="col-xs-1 text-right nopadding"> <b>'+rightPasses+'</b> </div><div class="col-xs-4"> <p class="text-right nomarging"> <span class="text-block-style2">'+parseStatsPointsToShow(window.liveTableOpen.table_rules.right_passes*rightPasses)+'</span> <b>Pts</b></p></div></div>'+htmlToShow;
			countForEven++;
		}
	}else{
		htmlToShow='Sin actividad';
	}
	return htmlToShow;
}
function parseStatsPointsToShow(points){
	if(points>0){return"+ "+points;}else{return"- "+points*-1;}
}
function parseStatsNameToShow(name){ // Poner la insidencia y traducir
	switch (name) { // Que paso con el gol de tiro libre!
		case 'shots_on_goal':
			return'<span class="trn">Disparo al arco</span>';
			break;
		case 'shots_to_the_post':
			return'<span class="trn">Disparo al palo</span>';
			break;
		case 'shots_outside':
			return'<span class="trn">Disparo afuera</span>';
			break;
		case 'scored_goals':
			return'<span class="trn">Goles</span>';
			break;
		case 'defender_scored_goals':
			return'<span class="trn">Goles (DEF)</span>';
			break;
		case 'goalkeeper_scored_goals':
			return'<span class="trn">Goles (ARQ)</span>';
			break;
		case 'yellow_cards':
			return'<span class="trn">Tarjeta amarilla</span>';
			break;
		case 'red_cards':
			return'<span class="trn">Tarjeta roja</span>';
			break;
		case 'right_passes':
			return'<span class="trn">Pases correctos</span>';
			break;
		case 'wrong_passes':
			return'<span class="trn">Pases incorrectos</span>';
			break;
		case 'faults':
			return'<span class="trn">Faltas</span>';
			break;
		case 'recoveries':
			return'<span class="trn">Recuperaciones</span>';
			break;
		case 'assists':
			return'<span class="trn">Asistencias</span>';
			break;
		case 'offside':
			return'<span class="trn">Fuera de juego</span>';
			break;
		case 'saves':
			return'<span class="trn">Atajadas</span>';
			break;
		case 'missed_penalties':
			return'<span class="trn">Penal errado</span>';
			break;
		case 'saved_penalties':
			return'<span class="trn">Penal atajado (ARQ)</span>';
			break;
		case 'missed_saves':
			return'<span class="trn">Gol al arquero(ARQ)</span>';
			break;
		case 'undefeated_goal':
			return'<span class="trn">Valla invicta (ARQ)</span>';
			break;
		case 'undefeated_defense':
			return'<span class="trn">Valla invicta (DEF)</span>';
			break;
		case 'winner_team':
			return'<span class="trn">Equipo ganador</span>';
			break;
		default:
		return name.replace("_", " ");
	}
}
function parseShowPlayersBase(player, number){
	return '<div class="row players-list-item vertical-align color-player-list2 '+parseNumberToTextOddOrEven(number)+'"> <div class="col-xs-2"><img class="team-logo" src="img/icons/team-logo/'+player.playerTeamId+'.gif"></div><div class="col-xs-6 player-name"> <p><strong>'+player.playerName+'</strong></p><p>'+traducirPosicionJugadorMesa(player.playerPosition)+'</p></div><div class="col-xs-1">'+parseCapitanSubLive(number)+'</div><div class="col-xs-3"> <p class="text-right nomarging"> <span class="text-block-style2">'+player.playerPoints+'</span> <b>Pts</b></p></div></div>';
}
function parseCapitanSubLive(nro){
	switch(parseInt(nro)){
		case 0:
			return '<img class="team-logo small capitan" src="img/icons/capitan/capitan.svg">';
		break;
		case 1:
			return '<img class="team-logo small capitan" src="img/icons/capitan/sub_capitan.svg">';
		break;
		default:
        return '';
	}
}
function parseShowCoinsLive(val,bet_multiplier){
	if(window.liveTableOpen.playing[0].type=="training"){var prizeType=window.liveTableOpen.entry_cost_type;}
	else{var prizeType=window.liveTableOpen.prizes[0].prize_type;}
	if(prizeType=="coins"){var pr='coins.png';var x='x2.png';}else{var pr='chip.svg';var x='x2c.png';}
	if(val>0){
		if(bet_multiplier!=null){
			return (parseInt(val)*bet_multiplier)+' <img src="img/icons/coins/'+x+'" style="margin-right: 0px;margin-top: -5px;margin-bottom: -3px; width: 30px;">';
		}else{
			return val +' <img src="img/icons/coins/'+pr+'" style="margin-right: 0px;margin-top: -5px;margin-bottom: -3px; width: 20px;">';
		}
	}else{
		return'';
	}
}
function coinForPositionTableLiveMain(position){
	// Se fijo en la tabla la cantidad de monedas que le corresponden
	for(pos in window.liveTableOpen.prizes){
		if(window.liveTableOpen.prizes[pos].position==position){
			return window.liveTableOpen.prizes[pos].prize_value;
		}
	}
	return 0;
}
function parseNumberToTextOddOrEven(number){if(number%2==0){return "odd";}else{return "even";}}
function showCompleteNickNameLive(element,nick){
	var showNick = document.createElement("div");
	var width = 10*nick.length+"px";
	showNick.style="position: absolute;z-index: 1000;border: solid #747577 2px;background-color: white;width:"+width+";padding: 3px;";
	showNick.innerHTML=nick;
	element.parentNode.appendChild(showNick);
	setTimeout(function(){element.parentNode.removeChild(showNick)}, 3000);
	// <div style="position: absolute;z-index: 1000;border: solid #747577 2px;background-color: white;width: 200%;padding: 3px;">Nombre de Prueba en ejemplo</div>
}
function showArrowLive(tipe,element){
	var showArrow = document.createElement("i");
	if(tipe=="up"){
		showArrow.className="fa fa-arrow-up";
		showArrow.style="position: absolute;color: green;font-size: 30px;opacity: 0.7;top: 0px;left: 0px;";
	}else{
		showArrow.className="fa fa-arrow-down";
		showArrow.style="position: absolute;color: red;font-size: 30px;opacity: 0.7;top: 0px;left: 0px;";
	}
	element.parentNode.appendChild(showArrow);
	setTimeout(function(){element.parentNode.removeChild(showArrow)}, 3000);
 }
// Actualizando
function keepLiveTableUpdate(){
	orderSwapPositionsPrincipal("usersShowLive");
	orderSwapPositionsPrincipal("playersShowLive");
	window.keepLiveTablesUpdateVar=setTimeout(function(){readInidecesOfOpenTable(window.liveTableOpen.description);}, 5000);
}
function orderSwapPositionsPrincipal(nameOfElement){
	//alert(arrayOfElements.length);
	var childsToOrder=document.getElementById(nameOfElement).children;
	while(!orderSwapPositions(childsToOrder)){
		childsToOrder=document.getElementById(nameOfElement).children;
	}
}
function orderSwapPositions(arrayOfElements){
		for(actual in arrayOfElements){
			if(parseInt(actual)+1<arrayOfElements.length && arrayOfElements[parseInt(actual)+1]!=undefined){ // Compara premier con segundo
				if(parseInt(arrayOfElements[parseInt(actual)+1].getAttribute('data-ubication-position'))<parseInt(arrayOfElements[parseInt(actual)].getAttribute('data-ubication-position'))){
					changeOddEvenFromDiv(arrayOfElements[parseInt(actual)+1]);changeOddEvenFromDiv(arrayOfElements[parseInt(actual)]);
					arrayOfElements[parseInt(actual)].parentNode.insertBefore(arrayOfElements[parseInt(actual)+1], arrayOfElements[parseInt(actual)]);
					return false;
				}
			}
		}
	return true;
}
function changeOddEvenFromDiv(element){
	elemento=element.children[0];
	if(elemento.classList.contains("odd")){
		elemento.classList.remove("odd");
		elemento.classList.add("even");
	}else{
		elemento.classList.remove("even");
		elemento.classList.add("odd");
	}

}
