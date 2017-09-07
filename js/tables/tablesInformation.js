// JavaScript Document
function openTableInformation(idTable, type){
	//alert(window.showTableInformatioType);
	window.showTableInformationOpen=1; // Information is option 1
	if(idTable!=0){	window.showTableInformatioType=type;askToServerForTableInformation(idTable);jpAnalyticsEvent("VIEW_MATCH_INFO", type, idTable);}
	else{showTableInformation();}
}
function openTableDfInformation(idTable, type){
	//  training training
	window.showTableInformationOpen=0; // Data Factory Information is option 0
	if(idTable!=0){window.showTableInformatioType=type;askToServerForTableInformation(idTable);jpAnalyticsEvent("VIEW_MATCH_INFO", type, idTable);}
	else{showTableInformation();}
}
function openTablePrizeInformation(idTable, type){
	//  training training
	window.showTableInformationOpen=2; // Prize is option 2
	if(idTable!=0){window.showTableInformatioType=type;askToServerForTableInformation(idTable);jpAnalyticsEvent("VIEW_MATCH_INFO", type, idTable);}
	else{showTableInformation();}
}
// Load table information if needed
function askToServerForTableInformation(tableId){
	if(checkConnection()){
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
	 	  if ((xmlhttp.readyState==4 && xmlhttp.status==200) ||  (xmlhttp.readyState==4 && xmlhttp.status==422) ||  (xmlhttp.readyState==4 && xmlhttp.status==401)||  (xmlhttp.readyState==4 && xmlhttp.status==400))
	    {
			var jsonStr=xmlhttp.responseText;
			stopTimeToWait();
			closeLoadingAnimation();
			var json=JSON.stringify(jsonStr);
			var servidor=JSON.parse(json);
			var doble=JSON.parse(servidor);
			if (typeof(doble.errors) !== 'undefined'){
				 avisoEmergenteJugaPlay("Detalle no disponible","<p>Ya no puede ver la información de este desafío debido a que no pertenece más a este grupo.</p>");
				}
			else{
					window.actualOpenTable=parseTableForGroupPlayingOption(doble);
					showTableInformation();
				}
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
}
// Show table information
function showTableInformation(){
	var titleSelectedForTable=window.actualOpenTable.title;
	var contenidoMesa=contentInformationForOpenTableWindow(window.actualOpenTable);
	openOverLapseWindow(titleSelectedForTable, contenidoMesa);
}
function contentInformationForOpenTableWindow(openTable){
	var contetOpenInformation='<div class="container container-full">';
	contetOpenInformation+=generateTabsWithData(openTable);
	contetOpenInformation+='<div class="tab-content">';
	if(hasDfInformation(openTable.description)){
		contetOpenInformation+=generateCeroTabWithData(openTable);
	}
	contetOpenInformation+=generateFirstTabWithData(openTable);
	contetOpenInformation+=generateSecondTabWithData(openTable);
	contetOpenInformation+=generateThirdTabWithData(openTable);
	contetOpenInformation+='</div>';
	contetOpenInformation+='</div>';
	return contetOpenInformation ;
	//return playerTest()+lastWithButton ;
}
function generateTabsWithData(openTable){
	if(hasDfInformation(openTable.description)){
		var dfHtml='<li role="presentation" class="'+showIfActive(0)+'"><a href="#InformationTab0" aria-controls="tab1" role="tab" data-toggle="tab">DATOS</a></li>';
	}else{
		var dfHtml=' ';
	}
	return '<ul class="nav nav-tabs" role="tablist">'+dfHtml+'<li role="presentation" class="'+showIfActive(1)+'"><a href="#InformationTab1" aria-controls="tab1" role="tab" data-toggle="tab">PUNTAJES</a></li><li role="presentation" class="'+showIfActive(2)+'"><a href="#InformationTab2" aria-controls="tab2" role="tab" data-toggle="tab">PREMIOS</a></li><li role="presentation" class="'+showIfActive(3)+'"><a href="#InformationTab3" aria-controls="tab3" role="tab" data-toggle="tab">'+positionsOrPlayingText(openTable)+'</a></li></ul>';
}
function generateCeroTabWithData(openTable){
	var h = window.innerHeight-100;
	return'<div role="tabpanel" class="tab-pane '+showIfActivePane(0)+'" id="InformationTab0"><iframe src="http://jugaplay.com/ftpdatafactory/html/v3/model.html?channel=deportes.futbol.'+openTable.description.replace("-", ".")+'&lang=es_LA&model=gamecast_v6&hidePagesMenu=true" width="100%" height="'+h+'" scrolling="auto" style="width: 1px; min-width: 100%; width: 100%;" class=""></iframe></div>';
}
function generateFirstTabWithData(openTable){
	return'<div role="tabpanel" class="tab-pane '+showIfActivePane(1)+'" id="InformationTab1"><div class="container"> <div class="row text-color2 vertical-align" style="background-color:#35b44a;padding-top: 10px;padding-bottom: 10px;margin-bottom: 15px;"><div class="col-xs-6"><h3 class="title-style1">'+openTable.title+'</h3></div><div class="col-xs-2 text-right match-info">Entrada</br>'+informationCostOfTable(openTable)+'</br></div><div class="col-xs-4 text-right"><p class="text-block-style1">'+dateFormatViewNormal(openTable.start_time)+'</div></div><div class="container"><p>Para Jugar este partido debes elegir <b>'+openTable.number_of_players+'</b> Jugadores</p><p>Los jugadores que elijas serán evaluados según su desempeño en el partido. Sumaran puntos acorde a la siguiente tabla. </p></div><table class="table table-sm table-hover"><tbody>'+showArrayOfIncidencesAndPoints(openTable)+'</tbody></table></div></div>';
}
function generateSecondTabWithData(openTable){
	// window.showTableInformatioType -- // league  training
	//alert(window.showTableInformatioType);
	if(window.showTableInformatioType=="training"){
		return parseTrainingTablePrize(openTable);
	}else{
		return parseLeagueTablePrize(openTable);
	}
}
function parseLeagueTablePrize(openTable){
	var props = {
		'{SHOW_ACTIVE_PANE}' : showIfActivePane(2),
		'{PRIZES}' : showArrayOfPrizeForWinners(openTable)
	}

	return parseTemplate(props,TEMPLATE_TABLE_PRIZE);
}
function parseTrainingTablePrize(openTable){
	return'<div role="tabpanel" class="tab-pane '+showIfActivePane(2)+'" id="InformationTab2"><div class="container"><h1 style="text-align: center;font-size: 80px;">'+openTable.entry_cost_value+'<img src="'+parseImgUrlChipsOrCoins(openTable.entry_cost_type)+'" style="width: 65px;margin-top: -15px;margin-left: 20px;"> </h1><h2 style="text-align: center;">Para cada jugador que finalice mitad de tabla para arriba.</h2></div></div>';
}
function generateThirdTabWithData(openTable){
	return'<div role="tabpanel" class="tab-pane '+showIfActivePane(3)+'" id="InformationTab3"><div class="container"><table class="table table-sm table-hover"><tbody>'+showArrayOfPlayersOrWinners(openTable)+'</tbody></table></div></div>';
}
function informationCostOfTable(openTable){ // editar
	if(window.showTableInformatioType=="training"){
		return "Gratis";
	}else{
		return openTable.entry_cost_value+' <img src="'+parseImgUrlChipsOrCoins(openTable.entry_cost_type)+'" style="margin-right: -10px;">';
	}
}
function positionsOrPlayingText(openTable){
	if(openTable.winners.length>0){return "Posiciones";}
	else{return "Anotados";}
}
function showArrayOfPlayersOrWinners(openTable){
	// showArrayOfPlayersOrWinners
	var showTable1='';
	if(openTable.winners.length>0){
		for(player in openTable.winners){
			showTable1+='<tr><th scope="row">'+openTable.winners[player].position+'</th><td>'+openTable.winners[player].nickname+'</td></tr>'
		}
	}else{
		var amount=0;
		for(player in openTable.playing){
			if(openTable.playing[player].type==window.showTableInformatioType){
				amount++;
				showTable1+='<tr><th scope="row">'+amount+'</th><td>'+openTable.playing[player].nickname+'</td></tr>'
			}
		}
	}
	return showTable1;
}
function showArrayOfPrizeForWinners(openTable){
	var showTable2='';
		for(prize in openTable.prizes){
			showTable2+='<tr><th scope="row">'+openTable.prizes[prize].position+'</th><td>'+openTable.prizes[prize].prize_value+' <img src="'+parseImgUrlChipsOrCoins(openTable.prizes[prize].prize_type)+'" style="width: 25px;"></td></tr>'
		}
	return showTable2;// parseImgUrlChipsOrCoins(which)
}

function showArrayOfIncidencesAndPoints(openTable){
	showTablePoints='<tr><td>Disparo al arco</td><td>'+(parseInt(openTable.table_rules.shots_on_goal)+parseInt(openTable.table_rules.shots))+' Pts</td></tr><tr><td>Disparo al palo</td><td>'+(parseInt(openTable.table_rules.shots_to_the_post)+parseInt(openTable.table_rules.shots))+' Pts</td></tr><tr><td>Disparo afuera</td><td>'+(parseInt(openTable.table_rules.shots_outside)+parseInt(openTable.table_rules.shots))+' Pts</td></tr><tr><td>Goles</td><td>'+(parseInt(openTable.table_rules.scored_goals)+parseInt(openTable.table_rules.shots))+' Pts</td></tr><tr><td>Goles (DEF)</td><td>'+(parseInt(openTable.table_rules.scored_goals)+parseInt(openTable.table_rules.shots)+parseInt(openTable.table_rules.defender_scored_goals))+' Pts</td></tr><tr><td>Goles (ARQ)</td><td>'+(parseInt(openTable.table_rules.scored_goals)+parseInt(openTable.table_rules.shots)+parseInt(openTable.table_rules.goalkeeper_scored_goals))+' Pts</td></tr><tr><td>Tarjeta amarilla</td><td>('+openTable.table_rules.yellow_cards+') Pts</td></tr><tr><td>Tarjeta roja</td><td>('+openTable.table_rules.red_cards+') Pts</td></tr><tr><td>Pases correctos</td><td>'+openTable.table_rules.right_passes+' Pts</td></tr><tr><td>Pases incorrectos</td><td>('+openTable.table_rules.wrong_passes+') Pts</td></tr><tr><td>Faltas</td><td>('+openTable.table_rules.faults+') Pts</td></tr><tr><td>Recuperaciones</td><td>'+openTable.table_rules.recoveries+' Pts</td></tr><tr><td>Asistencias</td><td>'+openTable.table_rules.assists+' Pts</td></tr><tr><td>Fuera de juego</td><td>('+openTable.table_rules.offside+') Pts</td></tr><tr><td>Atajadas</td><td>'+openTable.table_rules.saves+' Pts</td></tr><tr><td>Penal errado</td><td>('+openTable.table_rules.missed_penalties+') Pts</td></tr><tr><td>Penal atajado (ARQ)</td><td>'+openTable.table_rules.saved_penalties+' Pts</td></tr><tr><td>Gol al arquero(ARQ)</td><td>('+openTable.table_rules.missed_saves+') Pts</td></tr><tr><td>Valla invicta (ARQ)</td><td>'+openTable.table_rules.undefeated_goal+' Pts</td></tr><tr><td>Valla invicta (DEF)</td><td>'+openTable.table_rules.undefeated_defense+' Pts</td></tr> <tr><td>Equipo ganador</td><td>'+openTable.table_rules.winner_team+' Pts</td></tr>';
	return showTablePoints;
}
function showIfActive(which){
	if(window.showTableInformationOpen==which)
	return'active';
	else
	return'';
}
function showIfActivePane(which){
	if(window.showTableInformationOpen==which)
	return'active';
	else
	return'fade';
}
function hasDfInformation(data){
	return((data.split("-")).length==2);
}



// -----------------------------------------------------------------------------
// --------------------------=   TEMPLATES   =----------------------------------
// -----------------------------------------------------------------------------

/*
FROM: parseLeagueTablePrize(openTable);
var props = {
	'{SHOW_ACTIVE_PANE}' : showIfActivePane(2),
	'{PRIZES}' : showArrayOfPrizeForWinners(openTable)
}
*/
var TEMPLATE_TABLE_PRIZE = ''
	+'<div role="tabpanel" class="tab-pane {SHOW_ACTIVE_PANE}" id="InformationTab2">'
	+'	<div class="container">'
	+'		<table class="table table-sm table-hover">'
	+'			<tbody>{PRIZES}</tbody>'
	+'		</table>'
	+'	</div>'
	+'</div>';
