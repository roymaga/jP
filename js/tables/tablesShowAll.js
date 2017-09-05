// JavaScript Document
// Tarda si o si 10 minutos en preguntar
if(IsJsonString(getCookie("tablesToPlay-lastCheck-Jp"+getUserJugaplayId()))){
	window.lastTableCheck=JSON.parse(getCookie("tablesToPlay-lastCheck-Jp"+getUserJugaplayId()));
}else{
	window.lastTableCheck=new Date(1401507903635);// 2014
}
if(IsJsonString(getCookie("challengesSeenToPlay-Jp"+getUserJugaplayId()))){
	try{
	window.previusSeenChallenges=JSON.parse(getCookie("challengesSeenToPlay-Jp"+getUserJugaplayId()));
	for(table in window.previusSeenChallenges){
		if(!mesaDisponibleParaJugarHorario(window.previusSeenChallenges[table].startTime)){
			window.previusSeenChallenges[table].pop();
			table--;
		}
	}
	window.newChallengeOptions=false;
	}catch(e){
		window.previusSeenChallenges=[];
		window.newChallengeOptions=false;
	}
}else{
	window.previusSeenChallenges=[];
	window.newChallengeOptions=false;
}
window.onload=setTimeout(function(){showRecordAvailableTablesToPlay();setTimeout(function(){hasBeenRead(1);}, 5000);}, 1000);
function showRecordAvailableTablesToPlay(){
	previousTablesLoad=getCookie("tablesToPlay-Jp");
	if(previousTablesLoad.length>4){
			var json=JSON.stringify(previousTablesLoad);
			var servidor=JSON.parse(json);
			var doble=JSON.parse(servidor);
			if(updateTablesFromServer()){
				showAvailableTablesToPlay();
			}else{
				analizeShowAvailableTablesToPlay(doble);
			}

		}else{
			 showAvailableTablesToPlay();
		}
}
function updateTablesFromServer(){// Veo si lo traigo de memoria o no
	if(secondsFromNow(window.lastTableCheck)>300){// Si tiene mas de 5 minutos 300 segundos
			resetTimeOfLastTableAskToServer();
		return true;
	}else{
		return false;
	}
}
function resetTimeOfLastTableAskToServer(){
	window.lastTableCheck= new Date();
	var jsonUpdt=JSON.stringify(window.lastTableCheck);
	setCookie("tablesToPlay-lastCheck-Jp"+getUserJugaplayId(), jsonUpdt, 120);
}
function showAvailableTablesToPlay(){
	if(document.getElementById("tables-container-show")!=null){
		addLoaderToCertainContainer(document.getElementById("tables-container-show"));
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
	 	 if ((xmlhttp.readyState==4 && xmlhttp.status==200) ||  (xmlhttp.readyState==4 && xmlhttp.status==422))
	    {
			var jsonStr=xmlhttp.responseText;
			if(IsJsonString(jsonStr)){ // Me fijo si dio un error, en el caso de que de le sigo mandando
			var doble=JSON.parse(jsonStr);
			setCookie("tablesToPlay-Jp", jsonStr, 120);
			resetTimeOfLastTableAskToServer();
			analizeShowAvailableTablesToPlay(doble);
			}else{
				showAvailableTablesToPlay();
			}
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404 || xmlhttp.status==105){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlayConnectionError();
			 return "ERROR";
			}else if((xmlhttp.readyState==4 && xmlhttp.status==401)){
				ifLogInIsNeed();
				//setTimeout(function(){showAvailableTablesToPlay();}, 1000);
			}
	 	 }
		xmlhttp.open("GET",getJPApiURL()+"tables/",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send();
}
function analizeShowAvailableTablesToPlay(obj){
	// Me aseguro que no quede ningun loader, por las dudas
	try{
		var flag=0;
		if (typeof(obj.error) !== 'undefined'){
			showAvailableTablesToPlay();
		}else{
				if(document.getElementById("tables-container-show")!=null){ // Si no hay un elemento visible solo las guarda en memoria cookie tablesToPlay-Jp
					obj.sort(compareTablesSort);
					// Vacio las mesas en vivo para que no queden una vez cerradas, total se vuelven a agregar en la consulta
					window.liveMatchesArray=[];
					//arregloDeMesasConComentarios=new Array();
					for (var i = 0; i < obj.length; i++) {
						if(mesaDisponibleParaJugarHorario(obj[i]['start_time'])==true){
						if(flag==0){removeLoaderFromCertainContainer(document.getElementById("tables-container-show"));removeLoaderFromCertainContainer(document.getElementById("challenges-container-show"));flag=1;}// Marco asi no pasa cada vez
						cargarTablaDeMesasConContenidoInicial(obj[i]);
						//arregloDeMesasConComentarios.push(obj[i]['id']);
						}else{// Si no esta disponible lo agrega a en vivo
							deletTableFromVisibleHmtl(obj[i]);
							addTableToLiveArray(obj[i]);
						}
					}
				}// Fin si hay un elemento visible
		setTimeout(showRecordAvailableTablesToPlay, 3000); // Vuelve a hacer el recorrido cada 3 segundos
		}
	}catch(e){
		showAvailableTablesToPlay();
	}
}
function cargarTablaDeMesasConContenidoInicial(shownTable){
	if(shownTable.private==false){
	cargarTablaDeMatchesConContenidoInicial(shownTable);}else{
	cargarTablaDeChallengesConContenidoInicial(shownTable);
	}
}
// tournament-row -- Tiene que tener un data  'data-table-id'
// tableToCreate.getAttribute('data-tournament-id')
// Create tournament
// ahi creo los partidos
// shownTable.id
// shownTable.tournament_id
function cargarTablaDeMatchesConContenidoInicial(shownTable){ // me fijo si existe o si hay que modificar
	//alert("cargarTablaDeMatchesConContenidoInicial");
	if($("#torunament-container-"+shownTable.tournament_id).length){
		  if( $("#torunament-container-"+shownTable.tournament_id+" .league-match-row[data-table-id='" + shownTable.id + "']").length>0){
			  	$("#torunament-container-"+shownTable.tournament_id+" .league-match-row[data-table-id='" + shownTable.id + "']").each(function( index ) {
			 	 updateTableMatchContent(shownTable,$(this));}); // le paso los datos y el partido
		  }else{
			  attachTableMatchContent(shownTable,$("#torunament-container-"+shownTable.tournament_id)); // le paso los datos y el contenedor del torneo
		  }
	}else{
		createTournamentContent(shownTable);
	}

}
// getTournamentNameById
function createTournamentContent(shownTable){
	// Tiene que ser even or odd?
	//alert("createTournamentContent");
	var props = {
		'{ODDS_EVEN}': oddOrEven($("#tables-container-show>.tournament-row").length),
		'{TOURNAMENT_ID}': shownTable.tournament_id,
		'{TOURNAMENT_NAME}': getTournamentNameById(shownTable.tournament_id)
	}

	$("#tables-container-show").append(parseTemplate(props,TEMPLATE_TOURNAMENT_CONTENT)).show('slow')
			.after(function() {attachTableMatchContent(shownTable,$("#torunament-container-"+shownTable.tournament_id));});
}

function attachTableMatchContent(shownTable,torunamentContainer){ // Despues ver de editar dependiendo del estado

	var itemIndex = $(torunamentContainer).find(".league-match-row").length;
	var props = {
		'{ODDS_EVEN}': oddOrEven(itemIndex),
		'{TABLE_ID}': shownTable.id,
		'{PLAYED_BY_USER}': shownTable.has_been_played_by_user,
		'{MULTIPLIER}': shownTable.multiplier,
		'{CONTENT}': parseTableMatchInnerContent(shownTable)
	}
	$(torunamentContainer).append(parseTemplate(props,TEMPLATE_TABLE_MATCH_CONTENT));
}

function updateTableMatchContent(shownTable,matchContainer){ // Despues ver de editar dependiendo del estado del partido
	if(String($(matchContainer).attr("data-table-has_been_played_by_user"))==String(shownTable.has_been_played_by_user) && String($(matchContainer).attr("data-table-multiplier"))==String(shownTable.multiplier)){
		// El JQUERY directamente valida si exsiste el div
		$(matchContainer).find('.amount_of_users_training').html('<h4>'+shownTable.amount_of_users_training+' <i class="fa fa fa-users" aria-hidden="true"></i></h4>');
		$(matchContainer).find('.amount_of_users_league').html('<h4>'+shownTable.amount_of_users_league+' <i class="fa fa fa-users" aria-hidden="true"></i></h4>');
	}else{
		$(matchContainer).html('<div class="container">'+parseTableMatchInnerContent(shownTable)+'</div>');
		$(matchContainer).attr("data-table-has_been_played_by_user",shownTable.has_been_played_by_user);
		$(matchContainer).attr("data-table-multiplier",shownTable.multiplier);

	}
	//$(matchContainer).html(' <div class="col-xs-9">'+shownTable.title+dateFormatViewTable(shownTable.start_time)+'</div><div class="col-xs-3"> <button type="button" class="btn btn-success"><i class="fa fa-eye fa-2x" aria-hidden="true"></i></button> </div>');
}

function parseTableMatchInnerContent(shownTable){ // preguntar si fue jugada o no
	if(shownTable.has_been_played_by_user){

		if(shownTable.played_by_user_type=="training") {
			// TRAINGING
			return parseTableMatchInnerContentPlayedTraining(shownTable);
		}else{
			// LEAGUE
			return parseTableMatchInnerContentPlayedLeague(shownTable);
		}
	}else{
		// NOT PLAYED
		return parseTableMatchInnerContentNotPlayed(shownTable);
	}
}

function parseTableMatchInnerContentPlayedTraining(shownTable) {

	var contentType=parseTableMatchInnerContentTraining(shownTable);
	var props = {
		'{DATE}': shownTable.title+dateFormatViewTable(shownTable.start_time),
		'{TABLE_ID}': shownTable.id,
		'{EARNS}': earnsOfTableTraining(shownTable),
		'{USERS}' : shownTable.amount_of_users_training,
		'{BUTTON}' : parseTableMatchInnerContentTrainingButton(shownTable)
	}

	return parseTemplate(props,TEMPLATE_TABLE_MATCH_INNER_CONTENT_PLAYED_TRAINING);
}

function  parseTableMatchInnerContentTrainingButton(shownTable){
	if(shownTable.has_been_played_by_user){
		return '<span><b>Partido Amistoso</b><br><small>Anotado</small></span>';
	}else{
		return '<button onClick="openTableToPlayOverLapseWindow(\''+shownTable.id+'\',\'training\');" type="button" class="btn btn-success btn-block btn-action btn-training">Amistoso</button>';
	}
}

function parseTableMatchInnerContentPlayedLeague(shownTable) {

	var props = {
		'{DATE}': shownTable.title+dateFormatViewTable(shownTable.start_time),
		'{TABLE_ID}': shownTable.id,
		'{BET_MULTIPLIER}': shownTable.bet_multiplier,
		'{CHIPS_COST}': shownTable.multiplier_chips_cost,
		'{PLAYED_BY_USER}': shownTable.has_been_played_by_user,
		'{TURBO}': showTurboOption(shownTable.bet_multiplier),
		'{TABLE_EARNS}': earnsOfTable(shownTable),
		'{LEAGUE_USERS}': shownTable.amount_of_users_league,
		'{ACTION_BUTTON}': parseTableMatchInnerContentLeagueButton(shownTable)
	}

	return parseTemplate(props,TEMPLATE_TABLE_MATCH_INNER_CONTENT_PLAYED_LEAGUE);
}

function parseTableMatchInnerContentLeagueButton(shownTable){
	if(shownTable.has_been_played_by_user){
		return '<span><b>Partido Oficial</b><br><small>Anotado</small></span>';
	}else{
		return '<button type="button" onClick="openTableToPlayOverLapseWindow(\''+shownTable.id+'\',\'league\');" class="btn btn-success btn-block btn-action">Oficial '+costOfTable(shownTable)+'</button>';
	}
}

function parseTableMatchInnerContentNotPlayed(shownTable){

	var props = {
		'{DATE}': shownTable.title+dateFormatViewTable(shownTable.start_time),
		'{TABLE_ID}': shownTable.id,
		'{CONTENT}': parseTableMatchInnerContentLeague(shownTable)+parseTableMatchInnerContentTraining(shownTable),
	}
	return parseTemplate(props, TEMPLATE_TABLE_MATCH_INNER_CONTENT_NOT_PLAYED);
}

function parseTableMatchInnerContentLeague(shownTable){
	var props = {
		'{TABLE_ID}': shownTable.id,
		'{TABLE_EARNS}': earnsOfTable(shownTable),
		'{LEAGUE_USERS}': shownTable.amount_of_users_league,
		'{ACTION_BUTTON}': parseTableMatchInnerContentLeagueButton(shownTable)
	}
	return parseTemplate(props,TEMPLATE_TABLE_MATCH_INNER_CONTENT_LEAGUE);
}

function parseTableMatchInnerContentTraining(shownTable){
	return '<div class="match-detail row"> <div class="col-xs-2 nopadding text-left"><button onClick="openTableDfInformation(\''+shownTable.id+'\',\'training\');" type="button" class="btn btn-warning btn-matchinfo"><i class="fa fa-info-circle" aria-hidden="true"></i></button></div><div class="col-xs-3 nopadding text-center"><h4 onclick="openTablePrizeInformation(\''+shownTable.id+'\',\'training\');">'+earnsOfTableTraining(shownTable)+'</h4></div><div class="col-xs-3 amount_of_users_training"><h4>'+shownTable.amount_of_users_training+' <i class="fa fa fa-users" aria-hidden="true"></i></h4></div><div class="col-xs-4 nopadding text-center">'+ parseTableMatchInnerContentTrainingButton(shownTable)+'</div></div>';
}

function changeEyeButton(button){
	if($(button).hasClass("active")){
		$(button).removeClass("active");
	}else{
		$(button).addClass("active");
	}
}
function cargarTablaDeChallengesConContenidoInicial(shownTable){ // me fijo si existe o si hay que modificar
	//alert("cargarTablaDeMatchesConContenidoInicial");
	if($("#torunament-container-"+shownTable.group.name.replace(/ /g, "-")).length){
		  if( $("#torunament-container-"+shownTable.group.name.replace(/ /g, "-")+" .league-match-row[data-table-id='" + shownTable.id + "']").length>0){
			  	$("#torunament-container-"+shownTable.group.name.replace(/ /g, "-")+" .league-match-row[data-table-id='" + shownTable.id + "']").each(function( index ) {
			 	 updateTableChallengeContent(shownTable,$(this));}); // le paso los datos y el partido
		  }else{
			  attachChallengeMatchContent(shownTable,$("#torunament-container-"+shownTable.group.name.replace(/ /g, "-"))); // le paso los datos y el contenedor del torneo
		  }
	}else{
		createGroupContent(shownTable);
	}

}
// getTournamentNameById
function createGroupContent(shownTable){

	$("#noChallengesMessage").remove();
	var tournamentId = shownTable.group.name.replace(/ /g, "-");
	var props = {
		'{ODDS_EVEN}': oddOrEven($("#challenges-container-show>.tournament-row").length),
		'{TOURNAMENT_ID}': tournamentId,
		'{TOURNAMENT_NAME}': shownTable.group.name
	}

	$("#challenges-container-show").append(parseTemplate(props,TEMPLATE_CHALLENGE_CONTENT))
		.after(function() {attachChallengeMatchContent(shownTable,$("#torunament-container-"+tournamentId));});
}

function attachChallengeMatchContent(shownTable,torunamentContainer){ // Despues ver de editar dependiendo del estado

	var props = {
		'{ODD_EVEN}': oddOrEven($(".league-match-row").length),
		'{TABLE_ID}': shownTable.id,
		'{PLAYED_BY_USER}':shownTable.has_been_played_by_user,
		'{MULTIPLIER}':shownTable.has_been_played_by_user,
		'{CONTENT}':parseTableChallengeInnerContent(shownTable)
	}
	parseTemplate(props,TEMPLATE_CHALLENGE_MATCH_CONTENT);

	$(torunamentContainer).append(parseTemplate(props,TEMPLATE_CHALLENGE_MATCH_CONTENT));
}

function parseTableChallengeInnerContent(shownTable){

	var props = {
		'{MATCH_NAME}': parseTableChallengeMatchName(shownTable.title)+dateFormatViewTable(shownTable.start_time),
		'{TOURNAMENT_ID}': shownTable.tournament_id,
		'{TABLE_ID}': shownTable.id,
		'{EARNS}': earnsOfTable(shownTable),
		'{USERS_AMOUNT}': shownTable.amount_of_users_challenge,
		'{ACTION_BUTTON}': buttonOfChallenge(shownTable)
	}
	return parseTemplate(props, TEMPLATE_CHALLENGE_INNER_CONTENT);
}

function updateTableChallengeContent(shownTable,matchContainer){
	// Aca lo que le actualizamos!! a los desafios
	if(String($(matchContainer).attr("data-table-has_been_played_by_user"))==String(shownTable.has_been_played_by_user)){
		// El JQUERY directamente valida si exsiste el div
		$(matchContainer).find('.amount_of_users_challenge').html('<h4>'+shownTable.amount_of_users_challenge+' <i class="fa fa fa-users" aria-hidden="true"></i></h4>');
	}else{
		$(matchContainer).html(parseTableChallengeInnerContent(shownTable));
	}
}
function addTableToShownChallenges(tableToCreate){ // Add Table to container if already exists it actualize it
	// Reviso si es grupal o no
	var flag=0;
	tablesInContainer=document.getElementById("challenges-container-show").getElementsByClassName("match-list-item");
	tableIdToAdd=tableToCreate.getAttribute('data-table-id');
	for(table in tablesInContainer){
		if(tablesInContainer[table].innerHTML !== undefined){
			actualAttributeId=tablesInContainer[table].getAttribute('data-table-id');
			if(actualAttributeId==tableIdToAdd)
				{tablesInContainer[table].innerHTML=tableToCreate.innerHTML;
				flag=1;break;}
		}
	}
	if(flag==0){document.getElementById("challenges-container-show").appendChild(tableToCreate);}
}
function deletTableFromVisibleHmtl(shownTable){
		$(".league-match-row[data-table-id='" + shownTable.id + "']").each(function( index ) {
			$(this).remove(); // elimina la mesa
			});
}
// Funcion generales utilizadas
function showTurboOption (bet_multiplier){
	// null no jugado, sino nro
	if(bet_multiplier==null){
		return '<img class="grey-img" src="img/icons/coins/x2.png">';
	}else{
		return '<img src="img/icons/coins/x2.png" >';
	}
}

function costOfTable(shownTable){

	if(shownTable.entry_cost_value > 0) {
		if(shownTable.entry_cost_type=="coins"){
			return '<b>'+shownTable.entry_cost_value+'</b><img src="img/icons/coins/coin.png">';
		}else		{
			return '<b>'+shownTable.entry_cost_value+'</b><img src="img/icons/coins/chip.svg">';
		}
	}else{
		return "gratis";
	}
}
function earnsOfTable(shownTable){
	if(shownTable.private){shownTable.pot_prize_value=parseInt(shownTable.group.size*shownTable.entry_cost_value);shownTable.pot_prize_type=shownTable.entry_cost_type;}
	if(shownTable.pot_prize_type=="coins"){
		return '<b>'+shownTable.pot_prize_value+'</b><img src="img/icons/coins/coins.png">';
	}else		{
		return '<b>'+shownTable.pot_prize_value+'</b><img src="img/icons/coins/chip.svg">';
	}
}
function earnsOfTableNow(shownTable){
	if(shownTable.private){shownTable.pot_prize_value=parseInt(shownTable.amount_of_users_playing*shownTable.entry_cost_value); shownTable.pot_prize_type=shownTable.entry_cost_type;}
	if(shownTable.pot_prize_type=="coins"){
		return '<b>'+shownTable.pot_prize_value+'</b><img src="img/icons/coins/coins.png">';
	}else		{
		return '<b>'+shownTable.pot_prize_value+'</b><img src="img/icons/coins/chip.svg">';
	}
}
function earnsOfTableTraining(shownTable){
	if(shownTable.entry_cost_type=="coins"){
		return '<b>+'+shownTable.entry_cost_value+'</b><img src="img/icons/coins/coin.png">';
	}else		{
		return '<b>+'+shownTable.entry_cost_value+'</b><img src="img/icons/coins/chip.svg">';
	}
}
function buttonOfChallenge(shownTable){
	if(shownTable.has_been_played_by_user==true){
		return'<button type="button" class="btn btn-default btn-style2 btn-block btn-training btn-action selected" onClick="openChallengeToPlayOverLapseWindow(\''+shownTable.id+'\');">Anotado</button>';
	}else{
		var noCoinIconClass = (shownTable.entry_cost_value > 0) ? "" : "btn-training";
		return'<button type="button" class="btn btn-default btn-success btn-block btn-action ' +noCoinIconClass+'" onClick="openChallengeToPlayOverLapseWindow(\''+shownTable.id+'\');">Jugar '+costOfTable(shownTable)+'</button>';}
}
// Functions with tables
function changeOptionToPlayed(idTabla){ // window.showTableInformatioType
	var previousTablesLoad=getCookie("tablesToPlay-Jp");
	if(previousTablesLoad.length>4){
			var json=JSON.stringify(previousTablesLoad);
			var servidor=JSON.parse(json);
			var tablesInContainer=JSON.parse(servidor);
			for(table in tablesInContainer){
				if(tablesInContainer[table]['id'] == idTabla){
					tablesInContainer[table]['has_been_played_by_user']=true;
					if(window.showTableInformatioType=="league"){tablesInContainer[table]['amount_of_users_league']++;}
					if(window.showTableInformatioType=="training"){tablesInContainer[table]['amount_of_users_training']++;}
					if(window.showTableInformatioType=="challenge"){tablesInContainer[table]['amount_of_users_challenge']++;}
					tablesInContainer[table]['amount_of_users_playing']++;
					tablesInContainer[table]['played_by_user_type']=window.showTableInformatioType;
					if(tablesInContainer[table].private){
						cargarTablaDeChallengesConContenidoInicial(tablesInContainer[table]);
					}else{
						cargarTablaDeMatchesConContenidoInicial(tablesInContainer[table]);
					}
				}

			}
			var jsonStr=JSON.stringify(tablesInContainer);
			setCookie("tablesToPlay-Jp", jsonStr, 120);
	}
}

//function when starts
$(document).ready(function() {initializeGameVars();});

function initializeGameVars(){
					$('.jp-tabs li a').click(function (e) {
					  e.preventDefault();
					  $(this).tab('show');
					  var section = $(this).attr("data-section");
					  var title = $(this).attr("data-title");

					});
					// Swipe for principal Game features
					$("#game-principal-tab .tab-pane").swipe( {
						swipeLeft:function(event, direction, distance, duration, fingerCount) {
							event.preventDefault();
							var $tab = $('.jp-tabs .active').next();
            				if ($tab.length > 0)
								$tab.find('a').click();
						},
						swipeRight: function(event, direction, distance, duration, fingerCount) {
							event.preventDefault();
							var $tab = $('.jp-tabs .active').prev();
            				if ($tab.length > 0)
                				$tab.find('a').click();
						},
						//Default is 75px -- sensiblidad con la que se mueve
						threshold:75
					});
}
function changeOptionTox2(idTabla){
	var previousTablesLoad=getCookie("tablesToPlay-Jp");
	if(previousTablesLoad.length>4){
			var json=JSON.stringify(previousTablesLoad);
			var servidor=JSON.parse(json);
			var tablesInContainer=JSON.parse(servidor);
			for(table in tablesInContainer){
				if(tablesInContainer[table]['id'] == idTabla){
					tablesInContainer[table]['bet_multiplier']=2;
					cargarTablaDeMatchesConContenidoInicial(tablesInContainer[table]);
				}

			}
			var jsonStr=JSON.stringify(tablesInContainer);
			setCookie("tablesToPlay-Jp", jsonStr, 120);
	}
}
function avisoProximamente(){
	avisoEmergenteJugaPlay("PROXIMAMENTE","<p>Esto es una beta y esta función no está disponible.</p><p>Segura mente la semana que viene la tengamos habilitada.</p>");
}
//
function addTableToArrayOfChallengesSeen(tableId, startTime, played){
	if(mesaDisponibleParaJugarHorario(startTime)==true && !played){
		for(table in window.previusSeenChallenges){
			if(window.previusSeenChallenges[table].tableId==tableId){
				return;
			}
			if(!window.previusSeenChallenges[table].seen){newChallengesNotSeen();}
		}
		window.previusSeenChallenges.push({"tableId":tableId,"startTime":startTime,"seen":false});
		newChallengesNotSeen();
		setCookie("challengesSeenToPlay-Jp"+getUserJugaplayId(), JSON.stringify(window.previusSeenChallenges), 120);
	}
}
function newChallengesNotSeen(){
	if(!window.newChallengeOptions){
		window.newChallengeOptions=true;
		document.getElementById("new-challenge-notf").innerHTML='<i class="fa fa-circle" aria-hidden="true" style="font-size: 0.7em;margin-left: 12px;"></i>';
	}
}
function seenAllChallenges(){
	if(window.newChallengeOptions){
		window.newChallengeOptions=false;
		document.getElementById("new-challenge-notf").innerHTML='';
		for(table in window.previusSeenChallenges){
			window.previusSeenChallenges[table].seen=true;
		}
		setCookie("challengesSeenToPlay-Jp"+getUserJugaplayId(), JSON.stringify(window.previusSeenChallenges), 120);
	}
}
/* Cosas que no se por que desaparecieron*/
function buttonOfChallengeTable(idMesa,playing){
	for(user in playing){
		if(getUserJugaplayId()==playing[user].user_id){
			return'<button type="button" class="btn btn-default btn-style2 selected" onClick="openTablePlayedDetail(\''+idMesa+'\', \'challenge\');">Anotado</button>';
		}
	}
	return'<button type="button" class="btn btn-default btn-style2" onClick="openTableOfMatch();">¡Jugar!</button>';
}

// ------------------------------------------------------------------------------------
// --- TEMPLATES ----------------------------------------------------------------------
/*
FROM: function createGroupContent(shownTable){

PROPS: {
	'{ODDS_EVEN}': '',
	'{TOURNAMENT_ID}': '',
	'{TOURNAMENT_NAME}': '',

}
*/
var TEMPLATE_CHALLENGE_CONTENT = ''
	+'<div class="row players-list-item vertical-align color-player-list tournament-row {ODDS_EVEN} group" data-tournament-id="{TOURNAMENT_ID}">'
	+'	<div class="col-xs-2 text-right">'
	+'		<button type="button" onclick="changeArrow(this);" class="btn btn-live" data-toggle="collapse" data-target="#torunament-container-{TOURNAMENT_ID}" aria-expanded="true">'
	+'			<i class="fa fa-chevron-down" aria-hidden="true"></i>'
	+'		</button>'
	+'	</div>'
	+'	<div class="col-xs-6 player-name" onclick="clickOnLine(this);"> <p>{TOURNAMENT_NAME}</p></div>'
	+'	<div class="col-xs-4 text-right" onclick="clickOnLine(this);"><i class="fa fa-users fa-2x" aria-hidden="true"></i></div>'
	+'</div>'
	+'<div id="torunament-container-{TOURNAMENT_ID}" class="collapse row" style="height: 0px;"></div>';

/*
FROM: function attachChallengeMatchContent(shownTable){

var props = {
	'{ODD_EVEN}': oddOrEven($(".league-match-row").length),
	'{TABLE_ID}': shownTable.id,
	'{PLAYED_BY_USER}':shownTable.has_been_played_by_user,
	'{MULTIPLIER}':shownTable.has_been_played_by_user,
	'{CONTENT}':parseTableChallengeInnerContent(shownTable)
}
*/
var TEMPLATE_CHALLENGE_MATCH_CONTENT = ''
	+'<div class="col-xs-12 players-list-item vertical-align league-match-row text-color2 {ODD_EVEN}" '
	+'		data-table-id="{TABLE_ID}" data-table-has_been_played_by_user="{PLAYED_BY_USER}" data-table-multiplier="{MULTIPLIER}">'
	+'	{CONTENT}'
	+'</div>';


/*
FROM: function parseTableChallengeInnerContent(shownTable){

PROPS: {
	'{MATCH_NAME}': parseTableChallengeMatchName(shownTable.title)+dateFormatViewTable(shownTable.start_time),
	'{TOURNAMENT_ID}': shownTable.tournament_id,
	'{TABLE_ID}': shownTable.id,
	'{EARNS}': earnsOfTable(shownTable),
	'{USERS_AMOUNT}': shownTable.amount_of_users_challenge,
	'{ACTION_BUTTON}': buttonOfChallenge(shownTable),

}
*/
var TEMPLATE_CHALLENGE_INNER_CONTENT = ''
		+'<div class="container">'
		+'	<div class="row">'
		+'		<div class="col-xs-9">{MATCH_NAME}</div>'
		+'		<div class="col-xs-3 text-center match-cup">'
		+'			<img src="img/tournament/flags/flag-{TOURNAMENT_ID}.jpg">'
		+'		</div>'
		+'	</div>'

		+'	<div class="row">'
		+'		<div class="col-xs-12">'
		+'			<div class="container">'

		+'				<div class="row match-detail" id="show-openDetail-match{TABLE_ID}">'
		+'					<div class="col-xs-2 nopadding text-left">'
		+'						<button type="button" class="btn btn-warning btn-matchinfo" onClick="openTableDfInformation(\'{TABLE_ID}\',\'challenge\');">'
		+'							<i class="fa fa-info-circle" aria-hidden="true"></i>'
		+'						</button>'
		+'					</div>'
		+'					<div class="col-xs-3 nopadding text-center">'
		+'						<h4 onclick="openTablePrizeInformation(\'{TABLE_ID}\',\'challenge\');">{EARNS}</h4>'
		+'					</div>'
		+'					<div class="col-xs-3 amount_of_users_challenge">'
		+'						<h4>{USERS_AMOUNT}<i class="fa fa fa-users" aria-hidden="true"></i></h4>'
		+'					</div>'
		+'					<div class="col-xs-4 nopadding text-center">{ACTION_BUTTON}</div>'

		+'				</div>';
		+'			</div>';
		+'		</div>';

		+'	</div>';
		+'</div>';


	/*
	FROM: function createTournamentContent(shownTable){

	PROPS: {
		'{ODDS_EVEN}': '',
		'{TOURNAMENT_ID}': '',
		'{TOURNAMENT_NAME}': '',

	}
	*/
var TEMPLATE_TOURNAMENT_CONTENT = ''
		+'<div class="row players-list-item vertical-align color-player-list tournament-row {ODDS_EVEN}" data-tournament-id="{TOURNAMENT_ID}" >'
		+'	<div class="col-xs-2 text-right">'
		+'		<button type="button" onclick="changeArrow(this);" class="btn btn-live" '
		+'				data-toggle="collapse" data-target="#torunament-container-{TOURNAMENT_ID}" aria-controls="torunament-container-{TOURNAMENT_ID}">'
		+'			<i class="fa fa-chevron-down" aria-hidden="true"></i>'
		+'		</button>'
		+'	</div>'
		+'	<div class="col-xs-6 player-name" onclick="clickOnLine(this);"><p>{TOURNAMENT_NAME}</p></div>'
		+'	<div class="col-xs-4 text-right" onclick="clickOnLine(this);"><img src="img/tournament/flags/flag-{TOURNAMENT_ID}.jpg"></div>'
		+'</div>'
		+'<div id="torunament-container-{TOURNAMENT_ID}" class="collapse tournament-row-container row" aria-expanded="false" style="height: 0px;"></div>';

/*
FROM: function attachTableMatchContent(shownTable,torunamentContainer)

PROPS: {
	'{ODDS_EVEN}': '',
	'{TABLE_ID}': '',
	'{PLAYED_BY_USER}': '',
	'{MULTIPLIER}': '',
	'{CONTENT}': ''
}
*/
var TEMPLATE_TABLE_MATCH_CONTENT = ''
		+'<div class="col-xs-12 players-list-item vertical-align league-match-row text-color2 {ODDS_EVEN}" '
		+'		data-table-id="{TABLE_ID}" data-table-has_been_played_by_user="{PLAYED_BY_USER}" '
		+'		data-table-multiplier="{MULTIPLIER}">'
		+'	<div class="container">'
		+'		{CONTENT}'
		+'	</div>'
		+'</div>';


/*
FROM: function parseTableMatchInnerContentLeague(shownTable)

PROPS: {
	'{TABLE_ID}': 0,
	'{TABLE_EARNS}': 0,
	'{LEAGUE_USERS}': 0,
	'{ACTION_BUTTON}': ''
}
*/
var TEMPLATE_TABLE_MATCH_INNER_CONTENT_LEAGUE = ''
		+'<div class="match-detail row">'
		+'	<div class="col-xs-2 nopadding text-left">'
		+'		<button type="button" class="btn btn-warning btn-matchinfo" onClick="openTableDfInformation(\'{TABLE_ID}\',\'league\');">'
		+'			<i class="fa fa-info-circle" aria-hidden="true"></i>'
		+'		</button>'
		+'	</div>'
		+'	<div class="col-xs-3 nopadding text-center">'
		+'		<h4 onclick="openTablePrizeInformation(\'{TABLE_ID}\',\'league\');">{TABLE_EARNS}</h4>'
		+'	</div>'
		+'	<div class="col-xs-3 amount_of_users_league">'
		+'		<h4>{LEAGUE_USERS}<i class="fa fa fa-users" aria-hidden="true"></i></h4>'
		+'	</div>'
		+'	<div class="col-xs-4 nopadding text-center">{ACTION_BUTTON}</div>'
		+'</div>';

/*
FROM: function parseTableMatchInnerContentPlayed(shownTable)

PROPS: {
	'{DATE}': 0,
	'{BTN_2X}': 0,
	'{TABLE_ID}': 0,
	'{CONTENT}': ''
}
*/
/*var TEMPLATE_TABLE_MATCH_INNER_CONTENT_PLAYED = ''
		+'<div class="col-xs-9">{DATE}</div>'
		+'{BTN_2X}'
		+'<div id="show-openDetail-match{TABLE_ID}">{CONTENT}</div>';
*/
// ***************************************************************************************************************************************
// TRAINING PLAYED
/*
PROPS: {
	'{DATE}': 0,
	'{TABLE_ID}': 0,
	'{EARNS}': 0,
	'{USERS}' : 0,
	'{BUTTON}': ''
}
*/
var TEMPLATE_TABLE_MATCH_INNER_CONTENT_PLAYED_TRAINING = ''
		+'	<div class="row">'
		+'		<div class="col-xs-9">{DATE}</div>'
		+'		<div class="col-xs-3"></div>'
		+'	</div>'
		+'	<div class="row">'
		+'		<div class="col-xs-12">'
		+'			<div class="container" id="show-openDetail-match{TABLE_ID}">'
		+'				<div class="row match-detail">'
		+'					<div class="col-xs-12 nopadding text-left">'
		+'						<button type="button" class="btn btn-primary btn-matchinfo" onClick="openTablePlayedDetail(\'{TABLE_ID}\',\'training\');">'
		+'							<i class="fa fa-street-view" aria-hidden="true"></i>'
		+'						</button>'
		+'						<button onClick="openTableDfInformation(\'{TABLE_ID}\',\'training\');" type="button" class="btn btn-warning btn-matchinfo">'
		+'							<i class="fa fa-info-circle" aria-hidden="true"></i>'
		+'						</button>'
		+'						<h4 class="inline-stats">{EARNS}</h4>'
		+'						<h4 class="inline-stats">{USERS}&nbsp;<i class="fa fa fa-users" aria-hidden="true"></i></h4>'
		+'						<b class="right-stats">Amistoso&nbsp;<i class="fa fa-check"></i></b>'
		+'					</div>';
		+'			</div>';
		+'		</div>';
		+'	</div>';

// ***************************************************************************************************************************************
// LEAGUE PLAYED
/*
PROPS: {
	'{DATE}': 0,
	'{TABLE_ID}': 0,
	'{BET_MULTIPLIER}':0,
	'{CHIPS_COST}':0,
	'{PLAYED_BY_USER}':0,
	'{TURBO}':0
}
*/
var TEMPLATE_TABLE_MATCH_INNER_CONTENT_PLAYED_LEAGUE = ''
		+'	<div class="row">'
		+'		<div class="col-xs-9">{DATE}</div>'
		+'		<div class="col-xs-3 text-center match-cup" onClick="playTurboOption(\'{TABLE_ID}\',{BET_MULTIPLIER},\'{CHIPS_COST}\',{PLAYED_BY_USER});">{TURBO}</div>'
		+'	</div>'
		+'	<div class="row">'
		+'		<div class="col-xs-12">'
		+'			<div class="container" id="show-openDetail-match{TABLE_ID}">'
		+'				<div class="row match-detail">'
		+'					<div class="col-xs-12 nopadding text-left">'
		+'						<button type="button" class="btn btn-primary btn-matchinfo" onClick="openTablePlayedDetail(\'{TABLE_ID}\',\'league\');">'
		+'							<i class="fa fa-street-view" aria-hidden="true"></i>'
		+'						</button>'
		+'						<button type="button" class="btn btn-warning btn-matchinfo" onClick="openTableDfInformation(\'{TABLE_ID}\',\'league\');">'
		+'							<i class="fa fa-info-circle" aria-hidden="true"></i>'
		+'						</button>'
		+'						<h4 class="inline-stats">{TABLE_EARNS}</h4>'
		+'						<h4 class="inline-stats">{LEAGUE_USERS}&nbsp;<i class="fa fa fa-users" aria-hidden="true"></i></h4>'
		+'						<b class="right-stats">Oficial&nbsp;<i class="fa fa-check"></i></b>'
		+'				</div>';
		+'			</div>';
		+'		</div>';
		+'	</div>';

// ***************************************************************************************************************************************
// NOT PLAYED
/*
PROPS: {
	'{DATE}': shownTable.title+dateFormatViewTable(shownTable.start_time),
	'{TABLE_ID}': shownTable.id,
	'{CONTENT}': parseTableMatchInnerContentLeague(shownTable)+parseTableMatchInnerContentTraining(shownTable),
}
*/
var TEMPLATE_TABLE_MATCH_INNER_CONTENT_NOT_PLAYED = ''

		+'<div class="row">'
		+'	<div class="col-xs-9" onclick="clickOnLine(this);">{DATE}</div>'
		+'	<div class="col-xs-3">'
		+'		<button type="button" class="btn btn-success btn-xs" data-toggle="collapse" data-target="#show-openDetail-match{TABLE_ID}" aria-expanded="false" onclick="changeEyeButton(this)"><i class="fa fa-eye fa-2x" aria-hidden="true"></i></button>'
		+'	</div>'
		+'</div>'
		+'<div class="row">'
		+'	<div class="col-xs-12">'
		+'		<div class="collapse container" id="show-openDetail-match{TABLE_ID}">'
		+'			{CONTENT}'
		+'		</div>';
		+'	</div>';
		+'</div>';