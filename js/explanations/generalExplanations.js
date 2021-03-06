// JavaScript Document
window.readExplanations=[];
// La idea es, de ser necesario pregunta, si no esta hace la consulta, si en la consulta no esta muestra la explicacion.
// Cargo lo leido a una variable global
// La funcion hasBeenRead() es la que se pone para ir mostrando
setTimeout(function(){startGralExplJs()}, 500);
function startGralExplJs(){
	if(window.IsLoggedInVar){
		initializeExplanations();
	}else{
		setTimeout(function(){startGralExplJs()}, 100);
	}
}
function initializeExplanations(){
  var previousReadExplanations=getCookie("readExplanations-Jp-"+getUserJugaplayId());
	if(previousReadExplanations.length>4 &&  IsJsonString(previousReadExplanations)){
		window.readExplanations=JSON.parse(previousReadExplanations);
	}
}
function readAlExplanationsFromServer(explanations,explanationId){
	for(explanation in explanations){
		if(window.readExplanations.indexOf(explanations[explanation].id)==-1){
			window.readExplanations.push(explanations[explanation].id);
		}
	}
	setCookie("readExplanations-Jp-"+getUserJugaplayId(), JSON.stringify(window.readExplanations), 120);
	if(window.readExplanations.indexOf(explanationId)==-1){
		showExplanationId(explanationId);
		if(explanationId!=5){// Tiene otra forma de marcarse, con la X
			markInServerAsRead(explanationId);
		}
	}
}

// Funciones de explicaciones!!
function showExplanationId(explanationId){
	switch(explanationId){
		case 1:
			openSpecificExplanationWindow(["como_jugar/1.jpg","como_jugar/2.jpg"],"Como jugar");
		break;
		case 2:
			openSpecificExplanationWindow(["elegir_jugadores/1.jpg","elegir_jugadores/2.jpg","elegir_jugadores/3.jpg","elegir_jugadores/4.jpg"],"Como elegir");
		break;
		case 3:
			openSpecificExplanationWindow(["como_desafios/1.jpg","como_desafios/2.jpg"],"Desafiá a amigos");
		break;
		case 4:
			openSpecificExplanationWindow(["ver_vivo/1.jpg"],"Partidos en vivo");
		break;
		case 5:
			showCapitanSelectExplanation();
		break;
		case 6:
			//avisoEmergenteJugaPlay("Explicacion Nro: "+explanationId+" Jugar en vivo");
		break;
		case 5:
			//avisoEmergenteJugaPlay("Explicacion Nro: "+explanationId+" Como es el monedero");
		break;
	}
	return;
}

// Functions with server
function markInServerAsRead(explanationId){
	if(window.IsLoggedInVar && checkConnection2()){
		markInServerAsRead2(explanationId);
	}else{
		setTimeout(function(){markInServerAsRead(explanationId)},100);
	}
}
function markInServerAsRead2(explanationId){
	window.readExplanations.push(explanationId);
	setCookie("readExplanations-Jp-"+getUserJugaplayId(), JSON.stringify(window.readExplanations), 120);
	var json=JSON.stringify({ "explanation_id":explanationId});
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
			if(checkConnectionLoggedIn(xmlhttp) && IsJsonString(jsonStr)){
				// Todo Ok
				return true;
			}else{
				setTimeout(function(){markInServerAsRead(explanationId);},100);
			}
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404 || xmlhttp.status==105){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlayConnectionError();
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("POST",getJPApiURL()+"explanations",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send(json);
}
function hasBeenRead(explanationId){
	if(window.readExplanations.indexOf(explanationId)>-1){
		return true;
	}else{
		if(window.IsLoggedInVar && checkConnection2()){
			return hasBeenRead2(explanationId);
		}else{
			setTimeout(function(){ return hasBeenRead(explanationId)},100);
		}
	}
}
function hasBeenRead2(explanationId){
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
			if(checkConnectionLoggedIn(xmlhttp) && IsJsonString(jsonStr)){
				readAlExplanationsFromServer(JSON.parse(jsonStr),explanationId);
			}else{
				return hasBeenRead(explanationId);
			}
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404 || xmlhttp.status==105){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlayConnectionError();
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("GET",getJPApiURL()+"explanations",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send();
	}
// Show explanations
function openSpecificExplanationWindow(images, title){
	var tableTitle='<H4 class="trn">'+title+'</H4>';
	var content=returnContentExplanations(images);
	openExplantationWindow(tableTitle,content);
}
function returnContentExplanations(images){
	var hmtlLi='';
	var hmtlDivImg='';
	for(img in images){
		if(img==0){
			hmtlLi+='<li data-target="#carousel-explanation-information" data-slide-to="'+img+'" class="active"></li>';
			hmtlDivImg+='<div onClick="" class="item active"><span class="trn"><img src="img/explicaciones/'+images[img]+'" alt=""></span><div class="carousel-caption"></div></div>';
		}else{
			hmtlLi+='<li data-target="#carousel-explanation-information" data-slide-to="'+img+'"></li>';
			hmtlDivImg+='<div onClick="" class="item "><span class="trn"><img src="img/explicaciones/'+images[img]+'" alt=""></span><div class="carousel-caption"></div></div>';
		}
	}
	return'<div id="carousel-explanation-information" class="carousel slide" data-ride="carousel"><ol class="carousel-indicators">'+hmtlLi+'</li></ol><div class="carousel-inner" role="listbox">'+hmtlDivImg+'</div><a class="left carousel-control" href="#carousel-explanation-information" role="button" data-slide="prev"><span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span><span class="sr-only">Previous</span></a><a class="right carousel-control" href="#carousel-explanation-information" role="button" data-slide="next"><span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span><span class="sr-only">Next</span></a></div>'
}
function openExplantationWindow(title,content){
	var useId='BS-FL-'+Math.floor((Math.random() * 1000000000) + 1);
	BootstrapDialog.show({
			 id: useId,
			 cssClass: 'filter-pop-up fade',
			 title: title,
       message: content,
			 onshown: function(dialogItself) {
									checkLanguageItem(dialogItself);
								}
		 });
}
// Explicaciones detalladas
// Capitanes
function showCapitanSelectExplanation(){
	if(document.getElementById("filter-list-shown-in-table")!=null){
	var html=document.getElementById("filter-list-shown-in-table").parentNode.outerHTML;
	document.getElementById("filter-list-shown-in-table").parentNode.outerHTML='<div class="container container-style1 bg-color12"><div class="vertical-align text-color1" style=" padding-top: 5px; padding-bottom: 10px;"> <div class="col-xs-11 trn" style=" padding: 0px;"><strong>En caso de empate: desempatan el capitan <img class="team-logo small" src="img/icons/capitan/capitan.svg" style="margin: 2px;width: 16px;"> y luego el sub capitan <img class="team-logo small" src="img/icons/capitan/sub_capitan.svg" style="margin: 2px;width: 16px;"></strong></div><div class="col-xs-1 text-color7" onClick="deleteCapitanExpl(this);"><i class="fa fa-2x fa-times" aria-hidden="true"></i></div></div></div>'+html;
	setTimeout(function(){checkLanguageElement($("body")); updatePositionOfPlayersForWindow();},200);
	}else{
		setTimeout(function(){showCapitanSelectExplanation();}, 300);
	}
}
function deleteCapitanExpl(element){
	markInServerAsRead(5);
	var containerRemove = element.parentNode.parentNode;
	containerRemove.parentNode.removeChild(containerRemove);
	updatePositionOfPlayersForWindow();
}
