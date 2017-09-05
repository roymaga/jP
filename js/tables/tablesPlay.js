// JavaScript Document
// Comienza Funciones armado de tabla
function openTableToPlayOverLapseWindow(tableId, type){
	window.showTableInformatioType=type;
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
		 initializeFiltersForTable();
		 titleSelectedForTable=openTable.title;
		 contenidoMesa=contentForOpenTableWindow(openTable);
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
	var lastWithButton='<div class="container bg-color2 btn-play-container"><button type="button" id="button-play-of-table" onClick="buttomPlayTable();" class="btn btn-play pending">FALTAN '+openTable.number_of_players+' JUGADORES</button></div>';
	return startTopBlocks+fisrtBlockShownWithData+secondBlockWithFilters+thirdBlockWithPLayersSelected+endTopBlocks+fourthBlockWithPLayersSelected+lastWithButton ;
}
function addPlayersInToTable(mesa){
	tabalasSelect="";
	matchesInTable=mesa.matches;
	for(a in matchesInTable){// Para cada partido de la mesa
		matchesInTable[a].local_team.players.sort(comparePlayersInTeamSort);
		matchesInTable[a].visitor_team.players.sort(comparePlayersInTeamSort);
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
		index=window.arrPlayersSelected.indexOf(idPlayer);
		if(index>-1){window.arrPlayersSelected.splice(index, 1);}	
	}else{
		if(restPlayersToAdd()){
		document.getElementById("container-selected-players-table").appendChild(playerRow);
		playerRow.classList.add("selected");
		window.arrPlayersSelected.push(idPlayer);
		jpAnalyticsEvent("PICK_PLAYER", playerRow.getAttribute('data-player-name'), playerRow.getAttribute('data-player-team'));
		}else{avisoEmergenteJugaPlay("Listado Completo","<p>Ya selecciono los  <b>"+window.actualOpenTable.number_of_players+"</b> jugadores para jugar este partido. Si desea agregar uno distinto debe sacar uno del listado de seleccionados.</p>");}
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
		pendingPlayers=window.actualOpenTable.number_of_players - window.arrPlayersSelected.length;
		buttom.innerHTML="FALTAN "+pendingPlayers+" JUGADORES";
	}else{
		if(buttom.classList.contains("pending")){buttom.classList.remove("pending");}
			switch(window.showTableInformatioType) {
				case "training":
					buttom.innerHTML="JUGAR AMISTOSO";
					break;
				case "league":
					buttom.innerHTML="JUGAR OFICIAL <b style='font-size: 1.25em;'>"+window.actualOpenTable.entry_cost_value+' <img src="'+parseImgUrlChipsOrCoins(window.actualOpenTable.entry_cost_type)+'" style="width: 35px;"></b>';
					break;
				case "challenge":
					buttom.innerHTML="JUGAR DESAFIO <b style='font-size: 1.25em;'>"+window.actualOpenTable.entry_cost_value+' <img src="'+parseImgUrlChipsOrCoins(window.actualOpenTable.entry_cost_type)+'" style="width: 35px;"></b>';
					break;
				default:
					buttom.innerHTML="JUGAR";
			}
	}
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
	var capitan = element.getElementsByClassName("capitan");
		for(c in capitan){ // Saca el logo de capitan si es que hay
			if(capitan[c].innerHTML !== undefined){
				capitan[c].parentNode.removeChild(capitan[c]);
			}
		}
	var divForCap = element.getElementsByClassName("cap-cont");
		for(t in divForCap){ // Saca el logo de capitan si es que hay
			if(divForCap[t].innerHTML !== undefined){
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
		}else{avisoEmergenteJugaPlay("Faltan Jugadores","<p>Debe seleccionar <b>"+window.actualOpenTable.number_of_players+"</b> jugadores para jugar este partido.</p>");}
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
						avisoEmergenteJugaPlay("Monedas Insuficientes","<p>Tienes "+menuGetAmountOfCoins()+" Monedas y el partido requiere "+costOfTable+" para anotarse.</p> ");
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
								 title: '<H1 class="x2">FICHAS <img src="img/icons/coins/chip.svg" style="width: 30px; margin-top: -10px;margin-left: 5px;"> insuficientes </H1>',
								message: '<p>Le faltan <b>'+chipsNeeded+'</b> <img src="img/icons/coins/chip.svg" style="width: 30px; margin-top: -10px;margin-left: 5px;"> para poder jugar el partido</p>',
								buttons: [{
									label: 'CONSEGUIR <img src="img/icons/coins/chip.svg" style="width: 30px; margin-top: -10px;margin-left: 5px;">',
									cssClass:'btn btn-lg btn-block btn-secundary btn-astp transition',
									action: function(dialogItself2){
										buyChips();
										dialogItself2.close();
									}
								}]		 
							 });
				}
}
/* Realizo la jugada */
function sendPlayToJugaplay(idTabla,bet){
	startLoadingAnimation();
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
			//alert("Respuesta finLogInUsuarioEnElSitioEnviandoDatosJugada"+jsonStr);
			var json=JSON.stringify(jsonStr);
			var servidor=JSON.parse(json);
			var doble=JSON.parse(servidor);
			closeLoadingAnimation();
			if (typeof(doble.error) !== 'undefined'){analizeErrorFromServer("End of Table",doble);}
			else{endOfPlayedTable(idTabla);}
			//analizarRespuestaRegistroBeta(doble);
			return true;
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
	if(!getUserSyncEmail()){noneRegisterPlayerPlayed();}else{avisoEmergenteJugaPlay("YA ELEGISTE TUS JUGADORES! AHORA JUGÁLO EN VIVO! ","<p>1- Ingresa en Jugaplay cuando comienza el partido.</p><p>2- Clickea \"PARTIDOS EN VIVO\" para seguir el rendimiento de tus jugadores y monedas minuto a minuto!</p><p>3- Al finalizar el partido, ingresa a tu historial o espera un email que te llegará al instante con tu resultado.</p>");setTimeout(function(){hasBeenRead(4);}, 2000);}
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
function noneRegisterPlayerPlayed(){
		 BootstrapDialog.show({
			 cssClass: 'general-modal-msj',
			 title: "<H1>Gracias por Jugar</H1>",
            message: '<p>Sincroniza tu cuenta con tus datos para guardar tus jugadas, poder canjear premios, encontrar te con amigos y muchas cosas más.</p><p><fieldset class="form-group"> Nick<input type="text" class="form-control" id="formUserNick" placeholder="Nick"></fieldset></p><p><fieldset class="form-group"> E-Mail <input type="email" class="form-control" id="formUserEmail" placeholder="Email"></fieldset></p><p><fieldset class="form-group"> Contraseña<input type="password" id="formUserPassWord" class="form-control" placeholder="Nueva contraseña"></fieldset></p>',
			buttons: [{
                label: 'Registrar',
				id:'boton-panel-registro-aviso-error-pop-up',
                action: function(dialogItself){
					noneRegisterPlayerRegister(dialogItself);
                }
            }]		 
		 });
		 setTimeout(function(){alwaysShowInputValues();}, 1500);
		 return false;
}
function noneRegisterPlayerRegister(dialogItself){
	var mail=document.getElementById("formUserEmail").value;
	var password= document.getElementById("formUserPassWord").value;
	var nickname=document.getElementById("formUserNick").value;
	if(mail.length < 1 || nickname.length < 1 ){
			var camposVacios="";
			if(mail.length < 1){
				camposVacios+="<p>El Campo <b>Email</b> es obligatorio para guardar los cambios</p>";
			}
			if (nickname.length < 1){
				camposVacios+="<p>El Campo <b>Nick</b> es obligatorio para guardar los cambios</p>";
			}
			// Termina el tipo de mensaje
			avisoEmergenteJugaPlay("Campo vacio",camposVacios);
	return false ;
	}// Si paso es que los campos estan bien
	if(password.length<8){
			avisoEmergenteJugaPlay("Contraseñas muy corta","<p>La contraseña  debe tener al menos 8 caracteres.</p>");
			return true;
		}
	json=JSON.stringify({ "user": { "email": mail, "nickname":nickname, "password": password } });
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
			jsonStr=xmlhttp.responseText;
			//alert(jsonStr);
			var json=JSON.stringify(jsonStr);
			var servidor=JSON.parse(json);
			var doble=JSON.parse(servidor);
			closeLoadingAnimation();
				if (typeof(doble.errors) !== 'undefined'){
						if (typeof(doble.errors.email) !== 'undefined'){
						avisoEmergenteJugaPlay("Mail en uso","<p>El mail <b>"+document.getElementById("formUserEmail").value+"</b> ya esta registrado en JugaPlay</p>");
						return false;
						}else if(typeof(doble.errors.nickname) !== 'undefined'){
						avisoEmergenteJugaPlay("Nick en uso","<p>El Nick <b>"+nickname+"</b> ya esta registrado en JugaPlay, elija otro</p>");
						}else{
						avisoEmergenteJugaPlay("Error inesperado","<p>Algo salio mal, vuelva a intentar</p>");
						return false;
						}
				}else{// Salio todo bien
					jpAnalyticsEvent("GUEST_TO_USER_CONVERTION", idTabla+"-"+window.actualOpenTable.title, doble.id.toString());
					changeAndKeepLogIn(mail,password);// Para hacer el log in ya que lo echa
					dialogItself.close();
					setTimeout(function(){avisoEmergenteJugaPlay("Registro Completo","<p>Se ha registrado correctamente en Jugaplay. En la sección mi perfil podrá editar el resto de sus datos.</p>");}, 2000);
					setTimeout(function(){hasBeenRead(4);}, 4000);
					editDataFromUser(doble.first_name, doble.last_name, doble.email, doble.nickname);
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