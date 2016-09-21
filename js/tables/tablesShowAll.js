// JavaScript Document
// Tarda si o si 10 minutos en preguntar
if(IsJsonString(getCookie("tablesToPlay-lastCheck-Jp"+getUserJugaplayId()))){
	window.lastTableCheck=JSON.parse(getCookie("tablesToPlay-lastCheck-Jp"+getUserJugaplayId()));
}else{
	window.lastTableCheck=new Date(1401507903635);// 2014
}
window.onload=setTimeout(function(){ showRecordAvailableTablesToPlay(); }, 1000);
function showRecordAvailableTablesToPlay(){
	setTimeout(function(){hasBeenRead(1)}, 5000);// A los 10 segundos de empezar muestra la notificacion de como jugar Id 1
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
	if(checkConnection2()){
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
			stopTimeToWait();
			jsonStr=xmlhttp.responseText;
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
		xmlhttp.send();	
	}else{
		setTimeout(function(){showAvailableTablesToPlay();}, 500);
	}
}
function analizeShowAvailableTablesToPlay(obj){
	// Me aseguro que no quede ningun loader, por las dudas
	var flag=0;
	if (typeof(obj.error) !== 'undefined'){
		showAvailableTablesToPlay();
	}else{
			if(document.getElementById("tables-container-show")!=null){ // Si no hay un elemento visible solo las guarda en memoria cookie tablesToPlay-Jp
				obj.sort(compareTablesSort);
				arregloDeMesasConComentarios=new Array();
				for (var i = 0; i < obj.length; i++) {
					if(mesaDisponibleParaJugarHorario(obj[i]['start_time'])==true){
					if(flag==0){removeLoaderFromCertainContainer(document.getElementById("tables-container-show"));flag=1;}// Marco asi no pasa cada vez
					cargarTablaDeMesasConContenidoInicial(obj[i]);
					arregloDeMesasConComentarios.push(obj[i]['id']);}else{// Si no esta disponible lo agrega a en vivo
						deletTableFromVisibleHmtl(obj[i]['id']);
						addTableToLiveArray(obj[i]);
					}
				}
			}
	setTimeout(showRecordAvailableTablesToPlay, 3000); // Vuelve a hacer el recorrido cada 3 segundos
	}
}
function cargarTablaDeMesasConContenidoInicial(shownTable){
	var createTable = document.createElement('div');
	createTable.className="match-list-item";
	createTable.setAttribute("data-tournament-type", shownTable.tournament_id);
	createTable.setAttribute("data-table-id", shownTable.id);
	//mesaACrear.style=premiumTable(coins, sms);
	createTable.innerHTML='<div class="container container-title bg-color2" onClick="openTableDfInformation(\''+shownTable.id+'\');" ><h3>'+shownTable.title+' <i class="fa fa-info-circle" aria-hidden="true"></i> </h3></div><div class="container match-data"><div class="row vertical-align"><div class="col-xs-3 text-left match-time"><p>'+dateFormatViewNormal(shownTable.start_time)+'</p></div><div class="col-xs-2 text-center match-cup"><img src="img/tournament/flags/flag-'+shownTable.tournament_id+'.jpg"></div><div class="col-xs-2 text-center match-type"><a onClick="openTableInformation(\''+shownTable.id+'\');">'+costOfTable(shownTable.entry_coins_cost, shownTable.has_password)+'</a></div><div class="col-xs-2 text-center prize-type"><a onClick="openTablePrizeInformation(\''+shownTable.id+'\');">'+earnsOfTable(shownTable.pot_prize)+'</a></div><div class="col-xs-4 text-right match-button">'+buttonOfTable(shownTable.id,shownTable.has_been_played_by_user)+'</div></div></div>';
	addTableToShownTables(createTable);
}
function addTableToShownTables(tableToCreate){ // Add Table to container if already exists it actualize it
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
function deletTableFromVisibleHmtl(tableId){
	tablesInContainer=document.getElementById("tables-container-show").getElementsByClassName("match-list-item");
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
//removeLoaderFromCertainContainer(document.getElementById("tables-container-show"))
