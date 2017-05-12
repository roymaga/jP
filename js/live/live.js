// JavaScript Document
// id="live-matches-playing" style="display:none;" onClick="showAvailableLiveMatches()"
window.liveMatchesArray=[];
function addTableToLiveArray(table){
	// Ver si sacar o cierre automatico ?
	if(!isTableInLiveArray(table) && table.has_been_played_by_user){window.liveMatchesArray.push(parseTableForLive(table));liveTablesVisible();}
}
function parseTableForLive(groupTable){
	if(groupTable.private){
		groupTable.title=groupTable.group.name+" || "+parseTableChallengeMatchName(groupTable.title);
	}
	return groupTable;
}
function liveTablesVisible(){
	setTimeout(function(){
		//hasBeenRead(6)// A los 3 segundos de empezar muestra la notificacion de vivo Id 6
		if(document.getElementById("live-matches-playing")!=null){document.getElementById("live-matches-playing").style.display="flex";}// Ese es el original
	}
	,1000);
}
function isTableInLiveArray(table){
	for(option in window.liveMatchesArray){
		if(window.liveMatchesArray[option].id==table.id)
		return true;
	}
	return false;
}
function showAvailableLiveMatches(){
	var title='<H4>Partidos en vivo</H4>';
	var content='<div class="list-style1">';
	for(option in window.liveMatchesArray){
			content+='<a onClick="selectLiveMatchToWatch(this,\''+window.liveMatchesArray[option].id+'\')">'+window.liveMatchesArray[option].title+'</a>';
	}
	if(window.liveMatchesArray.length==0){ // Por si quedo abierto sin partidos
		content+='<a>Sin partidos disponibles</a>';
		document.getElementById("live-matches-playing").style.display="none";
	}
	content+='</div>';
	openLiveWindow(title,content);
	//setTimeout(hasBeenRead(6), 3000);// A los 3 segundos de mostrarse el primer partido en vivo muestro la explicacion de que es!! 
}
function selectLiveMatchToWatch(element,tableId){
	// 5 parent nodes para atras esta el boton de cerrar
	var filterContainer=((((element.parentNode).parentNode).parentNode).parentNode).parentNode;
	filterContainer.getElementsByClassName("close").item(0).click();
	var tableSelected=null;
	for(option in window.liveMatchesArray){
		if(window.liveMatchesArray[option].id==tableId){
		var tableSelected=window.liveMatchesArray[option];}
	}
	//alert("Open "+tableSelected.title);
	openTableToPlayLive(tableSelected);
	// Tiene que cerrar el actual si esta en uno y cerrar el filtro
	// Si esta en uno abierto cambia en ese, sino abre ventana
	// Ojo con las actualizaciones.
}
// Open over lapse window
function crateHtmlLiveTable(table){
	// Inicializo las variables
	window.liveTableOpen=null;
	window.liveMatchOpen={"users":[],"players":[],"stats":[]};
	window.readInidences=[];
	var h = window.innerHeight-150;
	var liveDf ='<iframe src="http://jugaplay.com/ftpdatafactory/html/v3/model.html?channel=deportes.futbol.'+table.description.replace("-", ".")+'&lang=es_LA&model=gamecast_v6&hidePagesMenu=true" width="100%" height="'+h+'" scrolling="auto" style="width: 1px; min-width: 100%; width: 100%;" class=""></iframe>';
	// Borro las actualizaciones automaticas
	if(window.keepLiveTablesUpdateVar!=null){clearTimeout(window.keepLiveTablesUpdateVar);}
	var htmlLiveContent='<div class="container container-full" id="complete-live-container"> <div class="bg-color10 text-color2 vertical-align"> <div class="col-xs-3"> <h3 class="title-style2">En vivo</h3> </div><div class="col-xs-1"> <i class="fa fa-refresh" aria-hidden="true"></i> </div><div class="col-xs-8 text-right" onClick="showAvailableLiveMatches();"> '+table.title+' <span class="caret"></span> </div></div><ul class="nav nav-tabs2 bg-color10 text-color2" role="tablist"> <li role="presentation" class="active"><a href="#InformationTab1" aria-controls="tab1" role="tab" data-toggle="tab" aria-expanded="true">Posiciones</a></li><li role="presentation" class=""><a href="#InformationTab2" aria-controls="tab2" role="tab" data-toggle="tab" aria-expanded="false">Jugadores</a></li><li role="presentation"><a href="#InformationTab3" aria-controls="tab3" role="tab" data-toggle="tab" aria-expanded="false">Partido</a></li></ul> <div class="tab-content"> <div role="tabpanel" class="tab-pane active in" id="InformationTab1"> <div class="container"> <div class="row text-color1 vertical-align information-box-style1"> <div class="col-xs-4"><p class="text-block-style3" id="usersShowLive-userPosition">...</p></div><div class="col-xs-4 match-info text-block-style2 text-color6 nopadding"><span class="text-block-style2" id="usersShowLive-userCoins">...</span><img id="usersShowLive-userCoinsImg" src="img/icons/coins/coins.png" style="margin-right: 0px;margin-top: -10px;margin-bottom: -3px;margin-left: 5px;width: 30px;"> <br></div><div class="col-xs-4"> <p class="text-right nomarging"> <span class="text-block-style2" id="usersShowLive-userPts">...</span> <b>Pts</b></p></div></div><div id="usersShowLive"> </div></div></div><div role="tabpanel" class="tab-pane" id="InformationTab2"> <div class="container"> <div id="playersShowLive"> </div></div></div><div role="tabpanel" class="tab-pane" id="InformationTab3">'+liveDf+'</div></div></div>';
	if(document.getElementById("complete-live-container")!=null){
		document.getElementById("complete-live-container").innerHTML=htmlLiveContent;
	}else{
		openOverLapseWindow("Vivo", htmlLiveContent);
	}
	setTimeout(function(){readOpenTableLive(table);}, 1000);
}
function openTableToPlayLive(table){
	startLoadingAnimation();
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
			closeLoadingAnimation();
			//alert(jsonStr);
			var json=JSON.stringify(jsonStr);
			var servidor=JSON.parse(json);
			var doble=JSON.parse(servidor);
			crateHtmlLiveTable(doble);
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404 || xmlhttp.status==105){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlayConnectionError();
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("GET",getJPApiURL()+"tables/"+table.id,true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send();	
	}
}
function openLiveWindow(title,content){
	useId='BS-FL-'+Math.floor((Math.random() * 1000000000) + 1);
	BootstrapDialog.show({
			 id: useId,
			 cssClass: 'filter-pop-up fade',
			 title: title,
            message: content	
		 });  
}