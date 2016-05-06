// JavaScript Document
window.onload=showCompleteHistory();
function showCompleteHistory(){
	previousHistory=getCookie("history-Jp");
	if(previousHistory.length>4){		
			var json=JSON.stringify(previousHistory);
			var servidor=JSON.parse(json);
			var doble=JSON.parse(servidor);
			armadoDelHistorialCuerpoHistoriaMensaje(doble);
			armadoDelHistorialCuerpoHistoria();
	
		}else{
			 armadoDelHistorialCuerpoHistoria();
		}
}
function armadoDelHistorialCuerpoHistoria(){
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
			setCookie("history-Jp", jsonStr, 120);
			var json=JSON.stringify(jsonStr);
			var servidor=JSON.parse(json);
			var doble=JSON.parse(servidor);
			armadoDelHistorialCuerpoHistoriaMensaje(doble);
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlay("ERROR DE CONEXI&Oacute;N","<p>Hubo un error de conexi&oacute; intente nuevamente</p>");
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("GET","http://app.jugaplay.com/api/v1/plays/",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		if(checkConnection()){xmlhttp.send();}	
}
function armadoDelHistorialCuerpoHistoriaMensaje(historialJugadas){
	contentAgregar='';
	historialJugadas.sort(compareHistorialSort);
	window.historyOfPlays=historialJugadas;
	for(historia in historialJugadas){// si historialJugadas[historia].table.payed_points != N/A solo mostrar 3
			contentAgregar+=generateBoxForHistoryShow(historialJugadas[historia], historia);
	}
	document.getElementById("history-full-content").innerHTML=contentAgregar;
}
function generateBoxForHistoryShow(historyMatch, positionInArray){
	if(historyMatch.table.payed_points != "N/A"){
	return '<div class="container container-full historial-list-item"><h1>'+historyMatch.table.position+'&deg;</h1><h2>'+historyMatch.table.title+'</h2><!--h4>fecha Pendiente</h4--><div class="container"><div class="row"><div class="col-xs-6"><h1>'+historyMatch.points+'</h1><h5>Puntos de Jugadores</h5></div><div class="col-xs-6"><h1>'+historyMatch.table.payed_points+'</h1><h5>Puntos del ranking</h5></div></div></div><a onClick="openDetailHistory(\''+positionInArray+'\')" class="btn btn-primary btn-style3 full-width">Ver Detalle</a></div>';}
	else{return '';}
}
// Funcion para ordenar por ahora
function compareHistorialSort(a,b) {
  if (a.table.id > b.table.id)
    return -1;
  else if (a.table.id < b.table.id)
    return 1;
  else 
    return 0;
}