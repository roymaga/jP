// JavaScript Document
// Deberia ponerle un loader cuando arranca y cada vez que carga y borrarlo cada vez
window.historyOfPlays=[];
setTimeout(function(){startShowAllHistoryJs()}, 500);
function startShowAllHistoryJs(){
	if(window.IsLoggedInVar){
		showCompleteHistory(0);
	}else{
		setTimeout(function(){startShowAllHistoryJs()},100);
	}
}
function showCompleteHistory(from){
	if(window.IsLoggedInVar && checkConnection() && $("#history-full-content").length>0){
		armadoDelHistorialCuerpoHistoria(from);
	}else{
		setTimeout(function(){showCompleteHistory(from)},100);
	}
}
function armadoDelHistorialCuerpoHistoria(from){
	//setTimeout(hasBeenRead(4), 3000);// A los 3 segundos de mostrar la explicachion del historial!!
	// Esta tomando el to como la cantidad a mostrar
	var paginate="?from="+from+"&to=5";
	if(document.getElementById("history-full-content")!=null){
		addLoaderToCertainContainer(document.getElementById("history-full-content"));
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
				if(document.getElementById("history-full-content")!=null){
					removeLoaderFromCertainContainer(document.getElementById("history-full-content"));
				}
				administrateSavedHistory(doble, parseInt(from)+5);
				return true;
			}else{
				showCompleteHistory(from);
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
function administrateSavedHistory(historialJugadas, next){
	// Si next es 0 es que es lo primero que se trae de memoria
	armadoDelHistorialCuerpoHistoriaMensaje(historialJugadas,next);
}
function armadoDelHistorialCuerpoHistoriaMensaje(historialJugadas, next){
	var contentAgregar='';
	historialJugadas.sort(compareTablesSort); // Order tables by date
	for(historia in historialJugadas){// si historialJugadas[historia].table.payed_points != N/A solo mostrar 3
			window.historyOfPlays.push(historialJugadas[historia]);// Agrego la jugada para buscarla despues
			contentAgregar+=generateBoxForHistoryShow(historialJugadas[historia]);
	}
	if(historialJugadas.length>4){contentAgregar+='<a class="btn btn-style3 full-width bg-color3 trn" onclick="showMoreHistory(this,\''+next+'\');">VER +</a>';}
	// ponerle su el elemento existe
	if(document.getElementById("history-full-content")!=null){ // Borrar si habia un loading
	document.getElementById("history-full-content").innerHTML+=contentAgregar;}
	checkLanguageElement($("#history-full-content"));
}
function showMoreHistory(element,next){
	element.parentNode.removeChild(element);
	armadoDelHistorialCuerpoHistoria(next);
}
function generateBoxForHistoryShow(historyMatch){
	if(historyMatch.table.points != "N/A"){
	return '<div class="container container-full historial-list-item"><h1>'+historyMatch.table.position+'&deg;</h1><h2>'+parseTableChallengeMatchName(historyMatch.table.title)+'</h2>'+generateChallangeTitle(historyMatch.table.group_name)+generateX2HistoryTable(historyMatch.bet_multiplier)+'<div class="container">'+parseHistoryResultShown(historyMatch)+'<a onClick="openDetailHistory(\''+historyMatch.table.id+'\')" class="btn btn-primary btn-style3 full-width trn">Ver detalle</a></div>';}
	else{return '';}
}
function parseHistoryResultShown(historyMatch){
	if(historyMatch.leagues.length>0){// Elegido para liga
		return '<div class="row"><div class="col-xs-4"><h1>'+historyMatch.points+'</h1><h5 class="trn">Puntos sumados por Jugadores</h5></div><div class="col-xs-4">'+parseHistoryPrizeShown(historyMatch)+'</div><div class="col-xs-4"><h1><button type="button" class="btn btn-warning btn-matchinfo" onclick="window.location=\'league.html?open='+historyMatch.leagues[0]+'\';"><i class="fa fa-trophy fa-2x" aria-hidden="true"></i></button></h1><h5 style="margin: 5px 0px;" class="trn">Puntaje para liga</h5></div></div></div>'
	}else{
	return '<div class="row"><div class="col-xs-6"><h1>'+historyMatch.points+'</h1><h5 class="trn">Puntos sumados por Jugadores</h5></div><div class="col-xs-6">'+parseHistoryPrizeShown(historyMatch)+'</div></div></div>'
	}
}
function parseHistoryPrizeShown(historyMatch){
	return '<h1>'+historyMatch.prize_value+' <img src="'+parseImgUrlChipsOrCoins(historyMatch.prize_type)+'" style="margin-right: 0px;margin-top: -10px;margin-bottom: -3px;margin-left: 5px;width: 30px;"></h1><h5 class="trn">Premio Obtenido</h5>';
}
function generateChallangeTitle(group_name){
	if(typeof(group_name) !== 'undefined'){
		return '<h4 class="text-color8">'+group_name+'</h4>';
	}else{
		 return '';
	}
}
function generateX2HistoryTable(bet_multiplier){
	if(bet_multiplier != null){
		return '<h4><img src="img/icons/coins/x2.png" style="width: 40px;"></h4>';
	}else{
		 return '';
	}
}
