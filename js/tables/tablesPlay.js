// JavaScript Document
// Comienza Funciones armado de tabla
function openTableToPlayOverLapseWindow(tableId,type){
	startLoadingAnimation();
	if(window.IsLoggedInVar && checkConnection()){
		console.log("Table play");
		openTableToPlayOverLapseWindow2(tableId,type);
	}else{
		console.log("Check");
		setTimeout(function(){openTableToPlayOverLapseWindow(tableId,type)},100);
	}
}
function openTableToPlayOverLapseWindow2(tableId, type){
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
				readOpenTable(doble);
				return true;
			}else{
				setTimeout(function(){openTableToPlayOverLapseWindow(tableId,type);}, 500);
			}
			closeLoadingAnimation();
			var json=JSON.stringify(jsonStr);
			var servidor=JSON.parse(json);
			var doble=JSON.parse(servidor);
			readOpenTable(doble);
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404 || xmlhttp.status==105){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlayConnectionError();
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("GET",getJPApiURL()+"tables/"+tableId+"/",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send();
}
function readOpenTable(openTable){
		openTable=parseTableForGroupPlayingOption (openTable);
		 window.actualOpenTable=openTable;
		 window.arrPlayersSelected=[];
		 //window.showTableInformatioType=type
		 initializeFiltersForTable();
		 var titleSelectedForTable=openTable.title;
		 var contenidoMesa=contentForOpenTableWindow(openTable);
		 openOverLapseWindow(titleSelectedForTable, contenidoMesa);
		 jpAnalyticsEvent("BEGIN_PLAYER_SELECTION", window.showTableInformatioType, openTable.title);
		setTimeout(function(){hasBeenRead(2);}, 5000);// A los 10 segundos de mostrarse el primer partido muestra como elegir los jugadores
		setTimeout(function(){ updatePositionOfPlayersForWindow();},800);// Ya que tarda 500 en abrir la ventana
	}
function contentForOpenTableWindow(openTable){
	setTimeout(function(){hasBeenRead(5);}, 500);// Explicacion de capitanes
	var startTopBlocks='<div class="container players-top-container" style="width:100%; padding:0; position:fixed; z-index:10;">';
	var fisrtBlockShownWithData='<div class="container container-style1 bg-color2"><div class="row text-color2 vertical-align"><div class="col-xs-6"><h3 class="title-style1">'+openTable.title+'</h3></div><div class="col-xs-2 text-right match-info"><a class="text-color2" onclick="openTableInformation(0);"><i class="fa fa-info-circle fa-2x" aria-hidden="true"></i></a></div><div class="col-xs-4 text-right"><p class="text-block-style1">'+dateFormatViewNormal(openTable.start_time)+'</p></div></div></div>';
	var secondBlockWithFilters='<div class="container container-style1 container-spacing-style1 bg-color3"><a onClick="createShowIndividualTableFilter();" class="btn-filter"><i class="fa fa-sliders fa-2x" aria-hidden="true" style="color: #fff;"></i></a><div class="filter-list" id="filter-list-shown-in-table"></div></div>';
	var thirdBlockWithPLayersSelected='<div class="container selected-players" id="container-selected-players-table"><div class="arrow-drag up" onClick="colapseSelectedPlayers(this);"></div></div>';
	var endTopBlocks='</div>';
	var fourthBlockWithPLayersSelected='<div class="container players-list" id="container-listed-players-table">'+addPlayersInToTable(openTable)+'</div>';
	var lastWithButton='<div class="container bg-color2 btn-play-container"><button type="button" id="button-play-of-table" onClick="buttomPlayTable();" class="btn btn-play pending"><span class="trn">Falta agregar</span> '+openTable.number_of_players+' <span class="trn">jugadores</span></button></div>';
	return startTopBlocks+fisrtBlockShownWithData+secondBlockWithFilters+thirdBlockWithPLayersSelected+endTopBlocks+fourthBlockWithPLayersSelected+lastWithButton ;
}
function addPlayersInToTable(mesa){
	var tabalasSelect="";
	var matchesInTable=mesa.matches;
	for(a in matchesInTable){// Para cada partido de la mesa
		matchesInTable[a].local_team.players.sort(comparePlayersInTeamSort);
		matchesInTable[a].visitor_team.players.sort(comparePlayersInTeamSort);
		var equipoLocalShort=matchesInTable[a].local_team.short_name;
		var equipoVisitanteShort=matchesInTable[a].visitor_team.short_name;
		var partido=equipoLocalShort+" <b>VS</b> "+equipoVisitanteShort;
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
	var id=player.id;
	var img='<img class="player-profile-pic" class="player-profile-pic" src="'+playerGetImage(id)+'">';
	var imgTeamLogo='<img class="team-logo" src="'+clubGetLogo(teamId)+'">';
	var name=player.last_name+" "+player.first_name;
	var posicion=traducirPosicionJugadorMesa(player.position);
	var nacionalidad=player.nationality;
	var linea='<div data-player-name="'+name+'" data-player-team="'+team+'" data-player-position="'+player.position+'" data-player-id="'+id+'" class="row players-list-item vertical-align" onClick="gameMesaSelectPlayerForTeam(this,\''+id+'\');"><div class="col-xs-2">'+img+'</div><div class="col-xs-6 player-name"><p><strong>'+name+'</strong></p><p>'+posicion+'</p></div><div class="col-xs-2 cap-cont"></div><div class="col-xs-2">'+imgTeamLogo+'</div></div>';
	return linea;
}
function comparePlayersInTeamSort(a,b) {
	// player.position --  player.last_name -- player.first_name
	// Ordeno por posicion -- 0-goalkeeper 1-defender 2-midfielder 3-forward
	// var n = (a.last_name).localeCompare(b.last_name); // -1 // a is sorted before b
  if (a.position==b.position)// Si el primero es mas antiguo y tiene que ir antes
    return (a.last_name+" "+a.first_name).localeCompare(b.last_name+" "+b.first_name);
  else{
	  if(returnPositionAsNumber(a.position)<returnPositionAsNumber(b.position)){
		  return -1;
	  }else{
		  return 1;
	  }
   }
}
function returnPositionAsNumber(position){
	if(position=="goalkeeper"){return 0;}
	if(position=="defender"){return 1;}
	if(position=="midfielder"){return 2;}
	if(position=="forward"){return 3;}
	return 4;// No deberia salir por aca pero por las dudas...
}
// <div class="col-xs-2 text-right"><button onClick="gameMesaSelectPlayerForTeam(this,\''+id+'\');" type="button" class="btn btn-player-select"><span>&#10003;</span></button></div>
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
function gameMesaSelectPlayerForTeam(playerRow,idPlayer){
	//playerRow=elementBoton.parentNode.parentNode;
	if(playerRow.classList.contains("selected")){
		returnToPlayerListInOrder(playerRow);
		var capitan = playerRow.getElementsByClassName("capitan");
		for(c in capitan){ // Saca el logo de capitan si es que hay
			if(capitan[c].innerHTML !== undefined){
				capitan[c].parentNode.removeChild(capitan[c]);
			}
		}
		playerRow.classList.remove("selected");
		var index=window.arrPlayersSelected.indexOf(idPlayer);
		if(index>-1){window.arrPlayersSelected.splice(index, 1);}
	}else{
		if(restPlayersToAdd()){
		document.getElementById("container-selected-players-table").appendChild(playerRow);
		playerRow.classList.add("selected");
		window.arrPlayersSelected.push(idPlayer);
		jpAnalyticsEvent("PICK_PLAYER", playerRow.getAttribute('data-player-name'), playerRow.getAttribute('data-player-team'));
		}else{avisoEmergenteJugaPlay("<span class='trn'>Listado Completo</span>","<p><span class='trn'>Ya selecciono los</span>  <b>"+window.actualOpenTable.number_of_players+"</b> <span class='trn'>jugadores para jugar esta mesa. Si desea agregar uno distinto debe sacar uno del listado de seleccionados.</span></p>");}
	}
	 updatePositionOfPlayersForWindow();
	 updateButtomOfTable();
}
function returnToPlayerListInOrder(playerRow){
	var listedPlayers=document.getElementById("container-listed-players-table").getElementsByClassName("players-list-item");
	var beenTroughTeam=false;
	//var hasBeenAppend=false;
	for(position in listedPlayers){
		if(listedPlayers[position].innerHTML !== undefined){
		if(listedPlayers[position].getAttribute('data-player-team')==playerRow.getAttribute('data-player-team')){beenTroughTeam=true;}
		if((beenTroughTeam==true)&&(listedPlayers[position].getAttribute('data-player-team')!=playerRow.getAttribute('data-player-team'))){// Si ya paso por el equipo
			document.getElementById("container-listed-players-table").insertBefore(playerRow,listedPlayers[position]);
			return;// Termina por que lo adjunta
		}else{
			if(beenTroughTeam==true){
				if(returnPositionAsNumber(listedPlayers[position].getAttribute('data-player-position'))>returnPositionAsNumber(playerRow.getAttribute('data-player-position'))){// Si ya paso la posicion
					document.getElementById("container-listed-players-table").insertBefore(playerRow,listedPlayers[position]);
					return;// Termina por que lo adjunta
				}else{
					if(returnPositionAsNumber(listedPlayers[position].getAttribute('data-player-position'))==returnPositionAsNumber(playerRow.getAttribute('data-player-position'))){// Si es igual
						if((playerRow.getAttribute('data-player-name')).localeCompare(listedPlayers[position].getAttribute('data-player-name'))<=0){
							document.getElementById("container-listed-players-table").insertBefore(playerRow,listedPlayers[position]);
							return;// Termina por que lo adjunta
						}
					}
				}
			}
		}
	}}
	document.getElementById("container-listed-players-table").appendChild(playerRow);// Si no lo ubico antes
	return;
}
function restPlayersToAdd(){
	return (window.arrPlayersSelected.length<window.actualOpenTable.number_of_players)
}
function updateButtomOfTable(){
	updateCapitans();
	var buttom=document.getElementById("button-play-of-table");
	if(restPlayersToAdd()){
		if(!buttom.classList.contains("pending")){buttom.classList.add("pending");}
		var pendingPlayers=window.actualOpenTable.number_of_players - window.arrPlayersSelected.length;
		buttom.innerHTML='<span class="trn">Falta agregar</span> '+pendingPlayers+' <span class="trn">jugadores</span>';
	}else{
		if(buttom.classList.contains("pending")){buttom.classList.remove("pending");}
			switch(window.showTableInformatioType) {
				case "training":
					buttom.innerHTML="<span class='trn'>JUGAR AMISTOSO</span>";
					break;
				case "league":
					buttom.innerHTML="<span class='trn'>JUGAR OFICIAL</span> <b style='font-size: 1.25em;'>"+window.actualOpenTable.entry_cost_value+' <img src="'+parseImgUrlChipsOrCoins(window.actualOpenTable.entry_cost_type)+'" style="width: 35px;"></b>';
					break;
				case "challenge":
					buttom.innerHTML="<span class='trn'>JUGAR DESAFIO</span> <b style='font-size: 1.25em;'>"+window.actualOpenTable.entry_cost_value+' <img src="'+parseImgUrlChipsOrCoins(window.actualOpenTable.entry_cost_type)+'" style="width: 35px;"></b>';
					break;
				default:
					buttom.innerHTML="<span class='trn'>JUGAR</span>";
			}
	}
	checkLanguageElement(buttom);
	checkLanguageElement($('body'));
}
function updateCapitans(){
	var listedPlayers=document.getElementById("container-selected-players-table");
	for (player in window.arrPlayersSelected){
		for(op in listedPlayers){
				try{
					if(listedPlayers[op].getAttribute('data-player-id')==window.arrPlayersSelected[player]){
						addCapitanIcon(listedPlayers[op],player);
					}
				}catch(e){}// Sino no va, sale error --> getAttribute is not a function
		}
	}

}
function addCapitanIcon(element,pos){
	// alert(" addCapitanIcon("+element+","+pos+")");
	var t;
	var capitan = element.getElementsByClassName("capitan");
		for(c in capitan){ // Saca el logo de capitan si es que hay
			if(typeof(capitan[c].innerHTML) !== 'undefined'){
				capitan[c].parentNode.removeChild(capitan[c]);
			}
		}
	var divForCap = element.getElementsByClassName("cap-cont");
		for(t in divForCap){ // Saca el logo de capitan si es que hay
			if(typeof(divForCap[t].innerHTML) !== 'undefined'){
				if(pos==0){
					divForCap[t].innerHTML+='<img class="team-logo small capitan" src="img/icons/capitan/capitan.svg">';
				}
				if(pos==1){
					divForCap[t].innerHTML+='<img class="team-logo small capitan" src="img/icons/capitan/sub_capitan.svg">';
				}
			}
		}
}
// Una vez que se apreta el boton
function buttomPlayTable(){
	if(!restPlayersToAdd()){
		completePlayingTable();
		}else{avisoEmergenteJugaPlay("<span class='trn'>Faltan Jugadores</span>","<p><span class='trn'>Debe seleccionar</span> <b>"+window.actualOpenTable.number_of_players+"</b> <span class='trn'>jugadores para jugar esta mesa.</span></p>");}
}
function completePlayingTable(){
	var mesa=window.actualOpenTable;
	if(mesa.entry_cost_value>0 && window.showTableInformatioType!="training"){// verificar que tiene las monedas cuando le pregunte
		if(mesa.entry_cost_type=="coins"){
			checkDataForCoinsGame(mesa.id,mesa.entry_cost_value);//
		}
		else{
			checkDataForChipsGame(mesa.id,mesa.entry_cost_value);
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
						avisoEmergenteJugaPlay("<span class='trn'>Monedas Insuficientes</span>","<p><span class='trn'>Tienes</span> "+menuGetAmountOfCoins()+" <span class='trn'>Monedas y el partido requiere</span> "+costOfTable+" <span class='trn'>para anotarse.</span></p> ");
				}
}
function checkDataForChipsGame(idTabla,costOfTable){ // Recordar actualizar los datos despues de la jugada
				if(userCanSpentXChips(costOfTable)){
					editXChipsFromUsersWallet(-costOfTable);
                    sendPlayToJugaplay(idTabla,"true");
				}else{
					var chipsNeeded=parseInt(costOfTable)-parseInt(getUserJugaplayChips());
					jpAnalyticsEvent("LACK_CHIPS_POPUP", "LEAGUE", chipsNeeded);
						BootstrapDialog.show({
							 cssClass: 'general-modal-msj x2',
							 title: '<H1 class="x2"><span class="trn">FICHAS</span> <img src="img/icons/coins/chip.svg" style="width: 30px; margin-top: -10px;margin-left: 5px;"> <span class="trn">insuficientes</span> </H1>',
							message: '<p><span class="trn">Le faltan</span> <b>'+chipsNeeded+'</b> <img src="img/icons/coins/chip.svg" style="width: 30px; margin-top: -10px;margin-left: 5px;"> <span class="trn">para poder jugar el partido</span></p>',
							buttons: [{
								label: '<span class="trn">CONSEGUIR</span> <img src="img/icons/coins/chip.svg" style="width: 30px; margin-top: -10px;margin-left: 5px;">',
								cssClass:'btn btn-lg btn-block btn-secundary btn-astp transition',
								action: function(dialogItself2){
									buyChips();
									dialogItself2.close();
								}
							}],onshown: function(dialogItself) {
													checkLanguageItem(dialogItself);
												}
						 });
				}
}
/* Realizo la jugada */
function sendPlayToJugaplay(idTabla,bet){
	startLoadingAnimation();
	if(window.IsLoggedInVar && checkConnection()){
		sendPlayToJugaplay2(idTabla,bet);
	}else{
		setTimeout(function(){sendPlayToJugaplay(idTabla,bet)},100);
	}
}
function sendPlayToJugaplay2(idTabla,bet){
		switch(window.showTableInformatioType) {
				case "training":
					var json=JSON.stringify({"table_id":idTabla, "player_ids":window.arrPlayersSelected});
					break;
				case "league":
				case "challenge":
					var json=JSON.stringify({"table_id":idTabla, "player_ids":window.arrPlayersSelected,"bet":"true"});
					break;
				default:
					var json=JSON.stringify({"table_id":idTabla, "player_ids":window.arrPlayersSelected,"bet":"true"});
			}
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
				if (typeof(doble.error) !== 'undefined'){analizeErrorFromServer("End of Table",doble);}
				else{endOfPlayedTable(idTabla);}
			}else{
				setTimeout(function(){sendPlayToJugaplay(idTabla,bet)}, 500);
			}

	    }else if(xmlhttp.status==503 || xmlhttp.status==404 || xmlhttp.status==105){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlayConnectionError();
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("POST",getJPApiURL()+"play",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send(json);
}
function endOfPlayedTable(idTabla){
	if(!window.actualOpenTable.private){
		jpAnalyticsEvent("START_MATCH", window.showTableInformatioType, window.actualOpenTable.entry_cost_value.toString());
	}else{
		jpAnalyticsEvent("ACCEPT_CHALLENGE", window.actualOpenTable.group.name, window.actualOpenTable.entry_cost_value.toString());
	}
	closeAllOverLapseWindow();
	setTimeout(function(){changeOptionToPlayed(idTabla);playedGameThanksMessage();}, 1000);
}
function playedGameThanksMessage(){
	if(!getUserSyncEmail()){noneRegisterPlayerPlayed();}else{avisoEmergenteJugaPlay("<span class='trn'>YA ELEGISTE TUS JUGADORES! AHORA JUGÁLO EN VIVO!</span>","<p class='trn'>1- Ingresa en Jugaplay cuando comienza el partido.</p><p class='trn'>2- Clickea \"PARTIDOS EN VIVO\" para seguir el rendimiento de tus jugadores y monedas minuto a minuto!</p><p class='trn'>3- Al finalizar el partido, ingresa a tu historial o espera un email que te llegará al instante con tu resultado.</p>");setTimeout(function(){hasBeenRead(4);}, 2000);}
}
// Fin Funciones Juego de mesa
// Funciones complementarias para El Play Tables
function updatePositionOfPlayersForWindow(){
	setTimeout(function(){$(".players-list").css("margin-top", $(".players-top-container").height() + "px");}, 200);
}
function noneRegisterPlayerPlayed(){
	BootstrapDialog.show({
		cssClass: 'general-modal-msj',
		title: "<H1 class='trn'>Gracias por Jugar</H1>",
				 message: '<span class="trn">Sincroniza tu cuenta con tus datos para guardar tus jugadas, poder canjear premios y muchas cosas más.</span> <p></p><p><fieldset class="form-group"><input type="text" class="form-control trn" id="formUserNick" placeholder="Apodo" data-trn-holder="nick"></fieldset><p></p><p><fieldset class="form-group"><input type="email" class="form-control trn" id="formUserEmail" placeholder="Correo electrónico" data-trn-holder="email"></fieldset><p></p><p><fieldset class="form-group"> <input type="password" id="formUserPassWord" class="form-control" placeholder="Contraseña" data-trn-holder="pass"></fieldset>',
	 buttons: [{
						 label: "<span class='trn'>Registrate</span>",
		 id:'boton-panel-registro-aviso-error-pop-up',
						 action: function(dialogItself){
			 noneRegisterPlayerRegister(dialogItself);
						 }
				 }],  onshown: function(dialogItself) {
											 checkLanguageItem(dialogItself);
										 }
	});
	setTimeout(function(){alwaysShowInputValues();}, 1500);
	return false;
}
function noneRegisterPlayerRegister(dialogItself){
	if(window.IsLoggedInVar && checkConnection()){
		noneRegisterPlayerRegister2(dialogItself);
	}else{
		setTimeout(function(){noneRegisterPlayerRegister(dialogItself)},100);
	}
}
function noneRegisterPlayerRegister2(dialogItself){
	var mail=document.getElementById("formUserEmail").value;
	var pass= document.getElementById("formUserPassWord").value;
	var nickname=document.getElementById("formUserNick").value;
	if(mail.length < 1 || pass.length < 1 || nickname.length < 1 ){
		if(mail.length < 1 && pass.length < 1 ){
			avisoEmergenteJugaPlay("<span class='trn'>Campos vacíos</span>","<p class='trn'>Los campos <b>Correo electrónico, Contraseña y Apodo</b> son obligatorios</p>");
			}
		else{
			if(mail.length < 1){
				avisoEmergenteJugaPlay("<span class='trn'>Campo vacío</span>","<p class='trn'>El Campo <b>Correo electrónico</b> es obligatorio</p>");
			}else if (pass.length < 1){
				avisoEmergenteJugaPlay("<span class='trn'>Campo vacío</span>","<p class='trn'>El Campo <b>Contraseña</b> es obligatorio</p>");
			}else{
				avisoEmergenteJugaPlay("<span class='trn'>Campo vacío</span>","<p class='trn'>El Campo <b>Apodo</b> es obligatorio</p>");
			}
		}	// Termina el tipo de mensaje
	return false ;
	}else if( pass.length < 8){
		avisoEmergenteJugaPlay("<span class='trn'>Contraseña muy corta</span>","<p class='trn'>La <b>contraseña</b> debe tener al menos <b>8</b> caracteres</p>");
		return false ;
	};
	var json=JSON.stringify({ "user": { "email": mail, "nickname":nickname, "password": pass } });
	if(startLoadingAnimation()==true){
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
	 	 if ((xmlhttp.readyState==4 && xmlhttp.status==200) ||  (xmlhttp.readyState==4 && xmlhttp.status==422))
	    {
			var jsonStr=xmlhttp.responseText;
			if(IsJsonString(jsonStr) && checkConnectionLoggedIn(xmlhttp)){ // Me fijo si dio un error, en el caso de que de le sigo mandando
				var doble=JSON.parse(jsonStr);
				closeLoadingAnimation();
				completeGuestRegister(doble,mail,pass,nickname,dialogItself);
			}else{
				setTimeout(function(){openTablePlayedDetail(tableId,type);}, 500);
			}
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404 || xmlhttp.status==105){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlayConnectionError();
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("PATCH",getJPApiURL()+"users/"+getUserJugaplayId(),true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send(json);
	}
}
function completeGuestRegister(doble,mail,password,nickname,dialogItself){
	if (typeof(doble.errors) !== 'undefined'){
		if (typeof(doble.errors.email) !== 'undefined'){
			avisoEmergenteJugaPlay("<span class='trn'>Correo electrónico en uso</span>","<p><span class='trn'>El correo electrónico</span> <b>"+document.getElementById("email-pop").value+"</b> <span class='trn'>ya esta registrado en JugaPlay</span></p>");
			return false;//
		}else if (typeof(doble.errors.nickname) !== 'undefined'){
			avisoEmergenteJugaPlay("<span class='trn'>Apodo en uso</span>","<p><span class='trn'>El Apodo</span> <b>"+document.getElementById("nickname-pop").value+"</b> <span class='trn'>ya esta registrado en JugaPlay</span></p>");
			return false;// nickname
		}else{
			avisoEmergenteJugaPlay("<span class='trn'>Error inesperado</span>","<p class='trn'>Algo salio mal, vuelva a intentar</p>");
			return false;
			}
	}else{// Salio todo bien
		jpAnalyticsEvent("GUEST_TO_USER_CONVERTION", window.actualOpenTable.title, doble.id.toString());
		changeAndKeepLogIn(mail,password);// Para hacer el log in ya que lo echa
		dialogItself.close();
		setTimeout(function(){avisoEmergenteJugaPlay("<span class='trn'>Registro Completo</span>","<p class='trn'>Se ha registrado correctamente en Jugaplay. En la sección mi perfil podrá editar el resto de sus datos.</p>");}, 2000);
		setTimeout(function(){hasBeenRead(4);}, 4000);
		editDataFromUser(doble.first_name, doble.last_name, doble.email, doble.nickname);
	}
}
function alwaysShowInputValues(){
	$('input').focus(function() {
	$(".modal-dialog").css( "-ms-transform", "translate(0, -170px)" );
	$(".modal-dialog").css( "-webkit-transform", "translate(0, -170px)" );
	$(".modal-dialog").css( "transform", "translate(0, -170px)" );
	});
	$('input').focusout(function() {
	$(".modal-dialog").css( "-ms-transform", "translate(0, 0)" );
	$(".modal-dialog").css( "-webkit-transform", "translate(0, 0)" );
	$(".modal-dialog").css( "transform", "translate(0, 0)" );
	});
}
