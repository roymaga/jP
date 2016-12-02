// JavaScript Document
// Tarda si o si 10 minutos en preguntar
if(IsJsonString(getCookie("tablesToPlay-lastCheck-Jp"+getUserJugaplayId()))){
	window.lastTableCheck=JSON.parse(getCookie("tablesToPlay-lastCheck-Jp"+getUserJugaplayId()));
}else{
	window.lastTableCheck=new Date(1401507903635);// 2014
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
	 	 if ((xmlhttp.readyState==4 && xmlhttp.status==200) ||  (xmlhttp.readyState==4 && xmlhttp.status==422) ||  (xmlhttp.readyState==4 && xmlhttp.status==401))
	    {
			var jsonStr=xmlhttp.responseText;
			//alert(jsonStr);
			resetTimeOfLastTableAskToServer();
			setCookie("tablesToPlay-Jp", jsonStr, 120);
			var json=JSON.stringify(jsonStr);
			var servidor=JSON.parse(json);
			var doble=JSON.parse(servidor);
			analizeShowAvailableTablesToPlay(doble);
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlay("ERROR DE CONEXIÓN","<p>Hubo un error de conexió intente nuevamente</p>");
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("GET","http://app.jugaplay.com/api/v1/tables/",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send();	}
}
function analizeShowAvailableTablesToPlay(obj){
	// Me aseguro que no quede ningun loader, por las dudas
	var flag=0;
	if (typeof(obj.error) !== 'undefined'){
		showAvailableTablesToPlay();
	}else{
			if(document.getElementById("tables-container-show")!=null){ // Si no hay un elemento visible solo las guarda en memoria cookie tablesToPlay-Jp
				obj.sort(compareTablesSort);
				//arregloDeMesasConComentarios=new Array();
				for (var i = 0; i < obj.length; i++) {
					if(mesaDisponibleParaJugarHorario(obj[i]['start_time'])==true){
					if(flag==0){removeLoaderFromCertainContainer(document.getElementById("tables-container-show"));removeLoaderFromCertainContainer(document.getElementById("challenges-container-show"));flag=1;}// Marco asi no pasa cada vez
					cargarTablaDeMesasConContenidoInicial(obj[i]);
					//arregloDeMesasConComentarios.push(obj[i]['id']);
					}else{// Si no esta disponible lo agrega a en vivo
						deletTableFromVisibleHmtl(obj[i]['id'],obj[i]['private']);
						addTableToLiveArray(obj[i]);
					}
				}
			}// Fin si hay un elemento visible
	setTimeout(showRecordAvailableTablesToPlay, 3000); // Vuelve a hacer el recorrido cada 3 segundos
	}
}
function cargarTablaDeMesasConContenidoInicial(shownTable){
	if(shownTable.private==false){
	cargarTablaDeMatchesConContenidoInicial(shownTable);}else{
	cargarTablaDeChallengesConContenidoInicial(shownTable);
	}
}
function cargarTablaDeMatchesConContenidoInicial(shownTable){
	// Reviso si es grupal o no
	var createTable = document.createElement('div');
	createTable.className="match-list-item";
	createTable.setAttribute("data-tournament-type", shownTable.tournament_id);
	createTable.setAttribute("data-table-id", shownTable.id);
	//mesaACrear.style=premiumTable(coins, sms);
	createTable.innerHTML='<div class="container container-title bg-color2" onClick="openTableDfInformation(\''+shownTable.id+'\');" ><div class="col-xs-9 nopadding"><h3>'+shownTable.title+' <i class="fa fa-info-circle" aria-hidden="true"></i> </h3></div><div class="col-xs-3 nopadding text-right"><h3>'+shownTable.amount_of_users_playing+' <i class="fa fa fa-users" aria-hidden="true"></i></h3></div></div><div class="container match-data"><div class="row vertical-align"><div class="col-xs-3 text-left match-time"><p>'+dateFormatViewNormal(shownTable.start_time)+'</p></div><div class="col-xs-2 text-center match-cup"><img src="img/tournament/flags/flag-'+shownTable.tournament_id+'.jpg"></div><div class="col-xs-2 text-center match-type"><a onClick="openTableInformation(\''+shownTable.id+'\');">'+costOfTable(shownTable.entry_coins_cost, shownTable.has_password)+'</a></div><div class="col-xs-2 text-center prize-type"><a onClick="openTablePrizeInformation(\''+shownTable.id+'\');">'+earnsOfTable(shownTable.pot_prize)+'</a></div><div class="col-xs-4 text-right match-button">'+buttonOfTable(shownTable.id,shownTable.has_been_played_by_user)+'</div></div></div>';
	addTableToShownMatches(createTable);
}
function addTableToShownMatches(tableToCreate){ // Add Table to container if already exists it actualize it
	// Reviso si es grupal o no
	flag=0;
	tablesInContainer=document.getElementById("tables-container-show").getElementsByClassName("match-list-item");
	tableIdToAdd=tableToCreate.getAttribute('data-table-id');
	for(table in tablesInContainer){
		if(tablesInContainer[table].innerHTML !== undefined){
			actualAttributeId=tablesInContainer[table].getAttribute('data-table-id');
			if(actualAttributeId==tableIdToAdd)
				{tablesInContainer[table].innerHTML=tableToCreate.innerHTML;
				flag=1;break;}
		}
	}
	if(flag==0){document.getElementById("tables-container-show").appendChild(tableToCreate);}
}
function cargarTablaDeChallengesConContenidoInicial(shownTable){
	// Reviso si es grupal o no
	var createTable = document.createElement('div');
	createTable.className="match-list-item";
	createTable.setAttribute("data-tournament-type", shownTable.tournament_id);
	createTable.setAttribute("data-table-id", shownTable.id);
	var potPrize= shownTable.group.size*shownTable.entry_coins_cost;
	createTable.innerHTML='<div class="container container-title bg-color11" ><div class="col-xs-9 nopadding"><h3>'+shownTable.group.name+' </h3></div><div class="col-xs-3 nopadding text-right"><h3>'+shownTable.group.size+' <i class="fa fa-reply-all" aria-hidden="true"></i></h3></div></div><div class="container container-title bg-color2" onClick="openTableDfInformation(\''+shownTable.id+'\');" ><div class="col-xs-9 nopadding"><h3>'+parseTableChallengeMatchName(shownTable.title)+' <i class="fa fa-info-circle" aria-hidden="true"></i> </h3></div><div class="col-xs-3 nopadding text-right"><h3>'+shownTable.amount_of_users_playing+' <i class="fa fa fa-users" aria-hidden="true"></i></h3></div></div><div class="container match-data"><div class="row vertical-align"><div class="col-xs-3 text-left match-time"><p>'+dateFormatViewNormal(shownTable.start_time)+'</p></div><div class="col-xs-2 text-center match-cup"><img src="img/tournament/flags/flag-'+shownTable.tournament_id+'.jpg"></div><div class="col-xs-2 text-center match-type"><a onClick="openTableInformation(\''+shownTable.id+'\');">'+costOfTable(shownTable.entry_coins_cost, shownTable.has_password)+'</a></div><div class="col-xs-2 text-center prize-type"><a onClick="openTablePrizeInformation(\''+shownTable.id+'\');">'+earnsOfTable(potPrize)+'</a></div><div class="col-xs-4 text-right match-button">'+buttonOfTable(shownTable.id,shownTable.has_been_played_by_user)+'</div></div></div>';
	addTableToShownChallenges(createTable);
}
function addTableToShownChallenges(tableToCreate){ // Add Table to container if already exists it actualize it
	// Reviso si es grupal o no
	flag=0;
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
function deletTableFromVisibleHmtl(tableId, private){
	if(private==true){var tablesInContainer=document.getElementById("challenges-container-show").getElementsByClassName("match-list-item");}
	else{var tablesInContainer=document.getElementById("tables-container-show").getElementsByClassName("match-list-item");}
	for(table in tablesInContainer){
		if(tablesInContainer[table].innerHTML !== undefined){
			actualAttributeId=tablesInContainer[table].getAttribute('data-table-id');
			if(actualAttributeId==tableId)
				{tablesInContainer[table].parentNode.removeChild(tablesInContainer[table]);
				return;}
		}
	}
}
// Funcion generales utilizadas
function mesaDisponibleParaJugarHorario(fechaHora){
	//14/01/2016 - 22:10
	//012345678901234567
	var dia= fechaHora.substring(0, 2);// Dia del mes
	var mes= fechaHora.substring(3, 5);// que mes
	var ano= fechaHora.substring(6, 10);// que ano
	var hora= fechaHora.substring(13, 15);// hora
	var minutos=fechaHora.substring(16);// minutos
	var t = new Date();
	var d = new Date();
	var diff=t.getTimezoneOffset();// Tiene que ser 180 minutos xq tomamos el GTM de argentina - 3
	var diffMinutos= diff-180;// Los minutos que difiere de argentina
	d.setFullYear(ano, (mes-1), dia);
	d.setHours(hora);
	d.setMinutes(minutos);
	t.setMinutes ( t.getMinutes() + diffMinutos ); // Llevo la hora que comparo a la hora de argentina
	if(t<d){return true;}else{
		return false;
	}
}
function costOfTable(coins, sms){
	if(coins>0 || sms==true){
		if(coins>0){
			return '<p>'+coins+'</p><img src="img/icons/coins/coins.gif">';
		}else
		{
			return '<img src="img/tables/icon-sms.png">';
		}
	}
	else
	return ' ';
}
function earnsOfTable(pot_prize){
	if(pot_prize>0){
			return '<p>'+pot_prize+'</p><img src="img/icons/coins/treasure.gif">';
	}
	else
	return ' ';
}
function buttonOfTable(idMesa,yaJugada){
	if(yaJugada==true){
		return'<button type="button" class="btn btn-default btn-style2 selected" onClick="openTablePlayedDetail(\''+idMesa+'\');">Anotado</button>';
	}else{
		return'<button type="button" class="btn btn-default btn-style2" onClick="openTableToPlayOverLapseWindow(\''+idMesa+'\');">¡Jugar!</button>';}
}
// Functions with tables
function changeOptionToPlayed(idTabla){
	tablesInContainer=document.getElementById("tables-container-show").getElementsByClassName("match-list-item");
	for(table in tablesInContainer){
		if(tablesInContainer[table].innerHTML !== undefined){
			actualAttributeId=tablesInContainer[table].getAttribute('data-table-id');
			if(idTabla==actualAttributeId)
				{
					tablesInContainer[table].getElementsByClassName("match-button").item(0).innerHTML=buttonOfTable(idTabla,true);
					}			
		}
	}
	previousTablesLoad=getCookie("tablesToPlay-Jp");
	if(previousTablesLoad.length>4){		
			var json=JSON.stringify(previousTablesLoad);
			var servidor=JSON.parse(json);
			var tablesInContainer=JSON.parse(servidor);
			for(table in tablesInContainer){
				if(tablesInContainer[table]['id'] == idTabla){
					tablesInContainer[table]['has_been_played_by_user']=true;
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
	$("#jp-section-title #title-icon").addClass("fa-sliders");
	if($( "#jp-section-title #title-icon" ).parent().is("a")){  $("#jp-section-title #title-icon").unwrap(); }
	$( "#jp-section-title #title-icon" ).wrap( "<a class='btn-filter' onClick='openTablesFilterWindow();'></div>" );
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
						  $("#jp-section-title #title-icon").removeClass().addClass("fa fa-2x fa-sliders");
						  $("#jp-section-title #title-icon").wrap( "<a class='btn-filter' onClick='openTablesFilterWindow();'></a>" );					  
						  break;
						  
						  case "desafios":
						  $plus = '<i id="title-icon" class="fa fa-2x fa-plus-square" aria-hidden="true"></i>';
 						  $("#jp-section-title #title-section").text(title);
 						  $("#jp-section-title #title-icon").removeClass().addClass("fa fa-2x fa-trophy");
 						  $("#jp-section-title #title-icon").parent("div").append("<i id='desafiosPlus' class='fa fa-1x fa-plus' style='color:#FFF;'/>");
 						  $("#jp-section-title #title-icon").wrap( "<a class='btn-filter' onClick='createANewChallenge();'></a>" );
						  setTimeout(function(){hasBeenRead(3);}, 1000);
						  break;
						  
						  default:
						  $("#jp-section-title #title-section").text("PARTIDOS DISPONIBLES");
						  $("#jp-section-title #title-icon").removeClass("").addClass("fa fa-2x fa-sliders");
						  $("#jp-section-title #title-icon").wrap( "<a class='btn-filter' onClick='openTablesFilterWindow();'></a>" );					  
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
function avisoProximamente(){
	avisoEmergenteJugaPlay("PROXIMAMENTE","<p>Esto es una beta y esta función no está disponible.</p><p>Segura mente la semana que viene la tengamos habilitada.</p>");
}