// JavaScript Document
window.onload=showRecordAvailableTablesToPlay();
function showRecordAvailableTablesToPlay(){
	previousTablesLoad=getCookie("tablesToPlay-Jp");
	if(previousTablesLoad.length>4){		
			var json=JSON.stringify(previousTablesLoad);
			var servidor=JSON.parse(json);
			var doble=JSON.parse(servidor);
			analizeShowAvailableTablesToPlay(doble);
			showAvailableTablesToPlay();
	
		}else{
			 showAvailableTablesToPlay();
		}
}
function showAvailableTablesToPlay(){
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
stopTimeToWait();
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
		if(checkConnection()){xmlhttp.send();}	
}
function analizeShowAvailableTablesToPlay(obj){
	if (typeof(obj.error) !== 'undefined'){
		showAvailableTablesToPlay();
	}else{
			obj.sort(compareTablesSort);
			arregloDeMesasConComentarios=new Array();
			for (var i = 0; i < obj.length; i++) {
				if(mesaDisponibleParaJugarHorario(obj[i]['start_time'])==true){
				cargarTablaDeMesasConContenidoInicial(obj[i]['id'],obj[i]['title'],obj[i]['number_of_players'],obj[i]['start_time'],obj[i]['end_time'],obj[i]['description'],obj[i]['has_been_played_by_user'],obj[i]['entry_coins_cost'],obj[i]['has_password'],obj[i]['tournament_id']);
				arregloDeMesasConComentarios.push(obj[i]['id']);}
    		}
	}
}
function cargarTablaDeMesasConContenidoInicial(idMesa, tituloMesa, numeroDeJugadores, horaInicioMesa, horaFinMesa, descripcionMesa, yaJugada, coins, sms, torneo_id){
	//alert(idMesa+tituloMesa+numeroDeJugadores+horaInicioMesa+horaFinMesa+descripcionMesa);
	var mesaACrear = document.createElement('div');
	mesaACrear.className="match-list-item";
	mesaACrear.setAttribute("data-tournament-type", torneo_id);
	mesaACrear.setAttribute("data-table-id", idMesa);
	//mesaACrear.style=premiumTable(coins, sms);
	mesaACrear.innerHTML='<div class="container container-title bg-color2"><h3>'+tituloMesa+'</h3></div><div class="container match-data"><div class="row vertical-align"><div class="col-xs-3 text-left match-time"><p>'+dateFormatViewNormal(horaInicioMesa)+'</p></div><div class="col-xs-2 text-center match-cup"><img src="img/tournament/flags/flag-'+torneo_id+'.jpg"></div><div class="col-xs-2 text-center match-type"><a onClick="openTableInformation(\''+idMesa+'\');">'+costOfTable(coins, sms)+'</a></div><div class="col-xs-2 text-center prize-type"><a onClick="openTablePrizeInformation(\''+idMesa+'\');">'+earnsOfTable(coins, sms)+'</a></div><div class="col-xs-4 text-right match-button">'+buttonOfTable(idMesa,yaJugada)+'</div></div></div>';
	addTableToShownTables(mesaACrear);
}
function addTableToShownTables(mesaACrear){ // Add Table to container if already exists it actualize it
	flag=0;
	tablesInContainer=document.getElementById("tables-container-show").getElementsByClassName("match-list-item");
	tableIdToAdd=mesaACrear.getAttribute('data-table-id');
	for(table in tablesInContainer){
		if(tablesInContainer[table].innerHTML !== undefined){
			actualAttributeId=tablesInContainer[table].getAttribute('data-table-id');
			if(actualAttributeId==tableIdToAdd)
				{tablesInContainer[table].innerHTML=mesaACrear.innerHTML;
				flag=1;break;}
		}
	}
	if(flag==0){document.getElementById("tables-container-show").appendChild(mesaACrear);}
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
function earnsOfTable(coins, sms){
	if(coins>0 || sms==true){
		if(coins>0){
			return '<p>871</p><img src="img/icons/coins/treasure.gif">';
		}
	}
	else
	return '<p>450</p><img src="img/icons/coins/treasure.gif">';
}
function buttonOfTable(idMesa,yaJugada){
	if(yaJugada==true){
		return'<button type="button" class="btn btn-default btn-style2 selected" onClick="openTablePlayedDetail(\''+idMesa+'\');">Anotado</button>';
	}else{
		return'<button type="button" class="btn btn-default btn-style2" onClick="openTableToPlayOverLapseWindow(\''+idMesa+'\');">¡Jugar!</button>';}
}
function compareTablesSort(a,b) {
  if (compareSqlDateIfAOlderThanB(a.start_time,b.start_time))// Si el primero es mas antiguo y tiene que ir antes
    return 1;
  else if (compareSqlDateIfAOlderThanB(b.start_time,a.start_time))// Si el segundo es mas antiguo
    return -1;
  else // Si son iguales
    return 0;
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