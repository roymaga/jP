// JavaScript Document
// Deberia ponerle un loader cuando arranca y cada vez que carga y borrarlo cada vez
window.historyOfPlays=[];
window.onload=setTimeout(function(){showCompleteHistory(0);}, 1000);
function showCompleteHistory(from){
	/*previousHistory=getCookie("history-Jp");
	if(previousHistory.length>4){		
			var json=JSON.stringify(previousHistory);
			var servidor=JSON.parse(json);
			var doble=JSON.parse(servidor);
			administrateSavedHistory(doble,0);
			armadoDelHistorialCuerpoHistoria(0);
		}else{
			 armadoDelHistorialCuerpoHistoria(0);
		}*/
	armadoDelHistorialCuerpoHistoria(0);
}
function armadoDelHistorialCuerpoHistoria(from){
	//setTimeout(hasBeenRead(4), 3000);// A los 3 segundos de mostrar la explicachion del historial!!  
	// Esta tomando el to como la cantidad a mostrar
	var paginate="?from="+from+"&to=5";
	if(document.getElementById("history-full-content")!=null){
		addLoaderToCertainContainer(document.getElementById("history-full-content"));
	}
	if(checkConnection()){var xmlhttp;
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
			if(IsJsonString(jsonStr)){ // Me fijo si dio un error, en el caso de que de le sigo mandando
				var doble=JSON.parse(jsonStr);
				if(document.getElementById("history-full-content")!=null){
					removeLoaderFromCertainContainer(document.getElementById("history-full-content"));
				}
				administrateSavedHistory(doble, parseInt(from)+5);
				return true;
			}else{
				armadoDelHistorialCuerpoHistoria(from);
			}			
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404 || xmlhttp.status==105){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlayConnectionError();
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("GET",getJPApiURL()+"plays"+paginate,true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send();	
	}
}
function administrateSavedHistory(historialJugadas, next){
	// Si next es 0 es que es lo primero que se trae de memoria
	armadoDelHistorialCuerpoHistoriaMensaje(historialJugadas,next);
}
function armadoDelHistorialCuerpoHistoriaMensaje(historialJugadas, next){
	contentAgregar='';
	historialJugadas.sort(compareTablesSort); // Order tables by date
	for(historia in historialJugadas){// si historialJugadas[historia].table.payed_points != N/A solo mostrar 3
			window.historyOfPlays.push(historialJugadas[historia]);// Agrego la jugada para buscarla despues
			contentAgregar+=generateBoxForHistoryShow(historialJugadas[historia]);
	}
	if(historialJugadas.length>4){contentAgregar+='<a class="btn btn-style3 full-width bg-color3" onclick="showMoreHistory(this,\''+next+'\');">VER +</a>';}
	// ponerle su el elemento existe
	if(document.getElementById("history-full-content")!=null){ // Borrar si habia un loading
	document.getElementById("history-full-content").innerHTML+=contentAgregar;}
}
function showMoreHistory(element,next){
	element.parentNode.removeChild(element);
	armadoDelHistorialCuerpoHistoria(next);
}
function generateBoxForHistoryShow(historyMatch){
	if(historyMatch.table.points != "N/A"){
	return '<div class="container container-full historial-list-item"><h1>'+historyMatch.table.position+'&deg;</h1><h2>'+historyMatch.table.title+'</h2><!--h4>fecha Pendiente</h4--><div class="container"><div class="row"><div class="col-xs-6"><h1>'+historyMatch.points+'</h1><h5>Puntos de Jugadores</h5></div><div class="col-xs-6"><h1>'+historyMatch.earn_coins+' <img src="img/icons/coins/coins.png" style="margin-right: 0px;margin-top: -10px;margin-bottom: -3px;margin-left: 5px;width: 30px;"></h1><h5>Monedas Obtenidas</h5></div></div></div><a onClick="openDetailHistory(\''+historyMatch.table.id+'\')" class="btn btn-primary btn-style3 full-width">Ver Detalle</a></div>';}
	else{return '';}
}