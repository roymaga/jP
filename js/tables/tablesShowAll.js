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
		xmlhttp.send();}else{
			setTimeout(function(){showAvailableTablesToPlay();}, 1000);
		}	
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
	$("#tables-container-show").append('<div class="row players-list-item vertical-align color-player-list tournament-row '+oddOrEven($(".tournament-row").length)+'" data-tournament-id="'+shownTable.tournament_id+'"> <div class="col-xs-2 text-right"> <button type="button" onclick="changeArrow(this);" class="btn btn-live" data-toggle="collapse" data-target="#torunament-container-'+shownTable.tournament_id+'" aria-expanded="true"><i class="fa fa-chevron-down" aria-hidden="true"></i></button> </div><div class="col-xs-6 player-name"> <p>'+getTournamentNameById(shownTable.tournament_id)+'</p></div><div class="col-xs-4"><img src="img/tournament/flags/flag-'+shownTable.tournament_id+'.jpg"></div></div><div id="torunament-container-'+shownTable.tournament_id+'" class="collapse" aria-expanded="false" style="height: 0px;"></div>').after(function() {attachTableMatchContent(shownTable,$("#torunament-container-"+shownTable.tournament_id));});
}
function attachTableMatchContent(shownTable,torunamentContainer){ // Despues ver de editar dependiendo del estado
	// tiene que ser even or odd? 
	$(torunamentContainer).append('<div class="row players-list-item vertical-align league-match-row text-color2 '+oddOrEven($(".league-match-row").length)+'" data-table-id="'+shownTable.id+'" data-table-has_been_played_by_user="'+shownTable.has_been_played_by_user+'" data-table-multiplier="'+shownTable.multiplier+'">'+parseTableMatchInnerConten(shownTable)+'</div>');
}
function updateTableMatchContent(shownTable,matchContainer){ // Despues ver de editar dependiendo del estado del partido
	if(String($(matchContainer).attr("data-table-has_been_played_by_user"))==String(shownTable.has_been_played_by_user) && String($(matchContainer).attr("data-table-multiplier"))==String(shownTable.multiplier)){
		// El JQUERY directamente valida si exsiste el div
		$(matchContainer).find('.amount_of_users_training').html('<h4>'+shownTable.amount_of_users_training+' <i class="fa fa fa-users" aria-hidden="true"></i></h4>');
		$(matchContainer).find('.amount_of_users_league').html('<h4>'+shownTable.amount_of_users_league+' <i class="fa fa fa-users" aria-hidden="true"></i></h4>');
	}else{	
		$(matchContainer).html(parseTableMatchInnerConten(shownTable));
		$(matchContainer).attr("data-table-has_been_played_by_user",shownTable.has_been_played_by_user);
		$(matchContainer).attr("data-table-multiplier",shownTable.multiplier);
					
	}
	//$(matchContainer).html(' <div class="col-xs-9">'+shownTable.title+dateFormatViewTable(shownTable.start_time)+'</div><div class="col-xs-3"> <button type="button" class="btn btn-success"><i class="fa fa-eye fa-2x" aria-hidden="true"></i></button> </div>');
}
function parseTableMatchInnerConten(shownTable){ // preguntar si fue jugada o no
	if(shownTable.has_been_played_by_user){
		return parseTableMatchInnerContentPlayed(shownTable);// Played
	}else{
		return parseTableMatchInnerContentNotPlayed(shownTable);
	}
}
function parseTableMatchInnerContentPlayed(shownTable){
	if(shownTable.played_by_user_type=="training"){
		var contentType=parseTableMatchInnerContentTraining(shownTable);
		var x2Button='<div class="col-xs-3"> </div>';
	}else{
		var contentType=parseTableMatchInnerContentLeague(shownTable);
		var x2Button='<div class="col-xs-3 text-center match-cup" onClick="playTurboOption(\''+shownTable.id+'\','+shownTable.bet_multiplier+',\''+shownTable.multiplier_chips_cost+'\','+shownTable.has_been_played_by_user+');">'+showTurboOption(shownTable.bet_multiplier)+'</div>';
		}
	return '<div class="col-xs-9">'+shownTable.title+dateFormatViewTable(shownTable.start_time)+'</div>'+x2Button+'<div id="show-openDetail-match'+shownTable.id+'"> '+contentType+'</div>';
}
function parseTableMatchInnerContentNotPlayed(shownTable){ 
	return '<div class="col-xs-9">'+shownTable.title+dateFormatViewTable(shownTable.start_time)+'</div><div class="col-xs-3"> <button type="button" class="btn btn-success " data-toggle="collapse" data-target="#show-openDetail-match'+shownTable.id+'" aria-expanded="false" onclick="changeEyeButton(this)"><i class="fa fa-eye fa-2x" aria-hidden="true"></i></button></div><div class="collapse" id="show-openDetail-match'+shownTable.id+'"> '+parseTableMatchInnerContentLeague(shownTable)+parseTableMatchInnerContentTraining(shownTable)+'</div>';
}
function parseTableMatchInnerContentLeague(shownTable){
	return '<div class="match-detail"> <div class="col-xs-2 nopadding text-left"><button type="button" class="btn btn-warning" onClick="openTableDfInformation(\''+shownTable.id+'\',\'league\');"><i class="fa fa-info-circle" aria-hidden="true"></i></button></div><div class="col-xs-3 nopadding text-center"><h4 onclick="openTablePrizeInformation(\''+shownTable.id+'\',\'league\');">'+earnsOfTable(shownTable)+'</h4></div><div class="col-xs-3 amount_of_users_league"><h4>'+shownTable.amount_of_users_league+' <i class="fa fa fa-users" aria-hidden="true"></i></h4></div><div class="col-xs-4 nopadding text-center">'+parseTableMatchInnerContentLeagueButton(shownTable)+'</div></div>';
}
function parseTableMatchInnerContentLeagueButton(shownTable){
	if(shownTable.has_been_played_by_user){
		return '<span style="text-align: center;font-size: 16px;"><b>Partido Oficial</b><br><small>Anotado</small></span>';
	}else{
		return '<button type="button" onClick="openTableToPlayOverLapseWindow(\''+shownTable.id+'\',\'league\');" class="btn btn-success">Oficial '+costOfTable(shownTable)+'</button>';
	}
}
function parseTableMatchInnerContentTraining(shownTable){
	return '<div class="match-detail"> <div class="col-xs-2 nopadding text-left"><button onClick="openTableDfInformation(\''+shownTable.id+'\',\'training\');" type="button" class="btn btn-warning"><i class="fa fa-info-circle" aria-hidden="true"></i></button></div><div class="col-xs-3 nopadding text-center"><h4 onclick="openTablePrizeInformation(\''+shownTable.id+'\',\'training\');">'+earnsOfTableTraining(shownTable)+'</h4></div><div class="col-xs-3 amount_of_users_training"><h4>'+shownTable.amount_of_users_training+' <i class="fa fa fa-users" aria-hidden="true"></i></h4></div><div class="col-xs-4 nopadding text-center">'+ parseTableMatchInnerContentTrainingButton(shownTable)+'</div></div>';
}
function  parseTableMatchInnerContentTrainingButton(shownTable){
	if(shownTable.has_been_played_by_user){
		return '<span style="font-size: 16px;"><b>Partido Amistoso</b><br><small>Anotado</small></span>';
	}else{
		return '<button onClick="openTableToPlayOverLapseWindow(\''+shownTable.id+'\',\'training\');" type="button" class="btn btn-success">Amistoso</button>';
	}
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
	$("#challenges-container-show").append('<div class="row players-list-item vertical-align color-player-list tournament-row '+oddOrEven($(".tournament-row").length)+' group" data-tournament-id="'+shownTable.group.name.replace(/ /g, "-")+'"> <div class="col-xs-2 text-right"> <button type="button" onclick="changeArrow(this);" class="btn btn-live" data-toggle="collapse" data-target="#torunament-container-'+shownTable.group.name.replace(/ /g, "-")+'" aria-expanded="true"><i class="fa fa-chevron-down" aria-hidden="true"></i></button> </div><div class="col-xs-6 player-name"> <p>'+shownTable.group.name+'</p></div><div class="col-xs-4 text-right"><i class="fa fa-users fa-2x" aria-hidden="true"></i></div></div><div id="torunament-container-'+shownTable.group.name.replace(/ /g, "-")+'" class="collapse" aria-expanded="false" style="height: 0px;"></div>').after(function() {attachChallengeMatchContent(shownTable,$("#torunament-container-"+shownTable.group.name.replace(/ /g, "-")));});
}
function attachChallengeMatchContent(shownTable,torunamentContainer){ // Despues ver de editar dependiendo del estado
	// tiene que ser even or odd? 
	$(torunamentContainer).append('<div class="row players-list-item vertical-align league-match-row text-color2 '+oddOrEven($(".league-match-row").length)+'" data-table-id="'+shownTable.id+'" data-table-has_been_played_by_user="'+shownTable.has_been_played_by_user+'" data-table-multiplier="'+shownTable.multiplier+'">'+parseTableChallengeInnerContent(shownTable)+'</div>');
}
function parseTableChallengeInnerContent(shownTable){
	return '<div class="col-xs-9">'+parseTableChallengeMatchName(shownTable.title)+dateFormatViewTable(shownTable.start_time)+'</div><div class="col-xs-3 text-center match-cup"><img src="img/tournament/flags/flag-'+shownTable.tournament_id+'.jpg"></div><div id="show-openDetail-match'+shownTable.id+'"> <div class="match-detail"> <div class="col-xs-2 nopadding text-left"><button type="button" class="btn btn-warning" onClick="openTableDfInformation(\''+shownTable.id+'\',\'challengue\');"><i class="fa fa-info-circle" aria-hidden="true"></i></button></div><div class="col-xs-3 nopadding text-center"><h4 onclick="openTablePrizeInformation(\''+shownTable.id+'\',\'challengue\');">'+earnsOfTable(shownTable)+'</h4></div><div class="col-xs-3 amount_of_users_challenge"><h4>'+shownTable.amount_of_users_challenge+' <i class="fa fa fa-users" aria-hidden="true"></i></h4></div><div class="col-xs-4 nopadding text-center">'+buttonOfChallenge(shownTable)+'</div></div></div>'
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
}function costOfTable(shownTable){
	if(shownTable.entry_cost_type=="coins"){
		return '<b>'+shownTable.entry_cost_value+'</b><img src="img/icons/coins/coin.png">';
	}else		{
		return '<b>'+shownTable.entry_cost_value+'</b><img src="img/icons/coins/chip.svg">';
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
		return'<button type="button" class="btn btn-default btn-style2 selected" onClick="openChallengeToPlayOverLapseWindow(\''+shownTable.id+'\');">Anotado</button>';
	}else{
		return'<button type="button" class="btn btn-default btn-style2" onClick="openChallengeToPlayOverLapseWindow(\''+shownTable.id+'\');">Jugar '+costOfTable(shownTable)+'</button>';}
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
//
//
//function when starts
$(document).ready(function() {initializeGameVars();firstTimeGameVars();});
function firstTimeGameVars(){
	$("#jp-section-title #title-section").text("PARTIDOS DISPONIBLES");
	$("#jp-section-title #title-icon").addClass("");
	if($( "#jp-section-title #title-icon" ).parent().is("a")){  $("#jp-section-title #title-icon").unwrap(); }
	$( "#jp-section-title #title-icon" ).wrap( "<a class='btn-filter' onClick=''>" );
}
function initializeGameVars(){					  
					$('.jp-tabs li a').click(function (e) {
					  e.preventDefault();
					  $(this).tab('show');
					  var section = $(this).attr("data-section");
					  var title = $(this).attr("data-title");
					  var icono = $("#jp-section-title #title-icon");
					  if(icono.parent().is("a")){
							  $("#jp-section-title #title-icon").unwrap();
						  }
						$("#desafiosPlus").remove();
					  switch (section){
						  
						  case "contactos":
						  $("#jp-section-title #title-section").text(title);
						  $("#jp-section-title #title-icon").removeClass().addClass("fa fa-2x fa-user-plus");
						  $("#jp-section-title #title-icon").wrap( "<a class='btn-filter' onClick='searchToAddContactsToList();'></a>" );
						  break;
						  
						  case "partidos":
						  $("#jp-section-title #title-section").text(title);
						  $("#jp-section-title #title-icon").removeClass().addClass("fa fa-2x");
						  $("#jp-section-title #title-icon").wrap( "<a class='btn-filter' onClick=''></a>" );					  
						  break;
						  
						  case "desafios":
						  $plus = '<i id="title-icon" class="fa fa-2x fa-plus-square" aria-hidden="true"></i>';
 						  $("#jp-section-title #title-section").text(title);
 						  $("#jp-section-title #title-icon").removeClass().addClass("fa fa-2x fa-trophy");
 						  $("#jp-section-title #title-icon").parent("div").append("<i id='desafiosPlus' class='fa fa-1x fa-plus' style='color:#FFF;'/>");
 						  $("#jp-section-title #title-icon").wrap( "<a class='btn-filter' onClick='createOrEnterAChallenge();'></a>" );
						  seenAllChallenges();
						  setTimeout(function(){hasBeenRead(3);}, 1000);
						  break;
						  
						  default:
						  $("#jp-section-title #title-section").text("PARTIDOS DISPONIBLES");
						  $("#jp-section-title #title-icon").removeClass("").addClass("fa fa-2x ");
						  $("#jp-section-title #title-icon").wrap( "<a class='btn-filter' onClick=''></a>" );					  
					  }
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
			return'<button type="button" class="btn btn-default btn-style2 selected" onClick="openTablePlayedDetail(\''+idMesa+'\');">Anotado</button>';
		}
	}
	return'<button type="button" class="btn btn-default btn-style2" onClick="openTableOfMatch();">¡Jugar!</button>';
}
