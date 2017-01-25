// JavaScript Document
window.readExplanations=[];
// La idea es, de ser necesario pregunta, si no esta hace la consulta, si en la consulta no esta muestra la explicacion.
// Cargo lo leido a una variable global
// La funcion hasBeenRead() es la que se pone para ir mostrando
window.onload=setTimeout(function(){initializeExplanations();}, 1000);
function initializeExplanations(){
previousReadExplanations=getCookie("readExplanations-Jp-"+getUserJugaplayId());
	if(previousReadExplanations.length>4){		
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
		markInServerAsRead(explanationId);
	}
}

// Funciones de explicaciones!! 
function showExplanationId(explanationId){
	switch(explanationId){
		case 1:
			openSpecificExplanationWindow(["como_jugar/1.jpg","como_jugar/2.jpg","como_jugar/3.jpg"],"Como Jugar");
		break;
		case 2:
			openSpecificExplanationWindow(["elegir_jugadores/1.jpg","elegir_jugadores/2.jpg","elegir_jugadores/3.jpg","elegir_jugadores/4.jpg"],"Como Elegir");
		break;
		case 3:
			//avisoEmergenteJugaPlay("Explicacion Nro: "+explanationId+" Como ver el Historial");
		break;
		case 4:
			//avisoEmergenteJugaPlay("Explicacion Nro: "+explanationId+" Como ver el Historial");
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
	window.readExplanations.push(explanationId);
	setCookie("readExplanations-Jp-"+getUserJugaplayId(), JSON.stringify(window.readExplanations), 120);
	var json=JSON.stringify({ "explanation_id":explanationId});
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
			jsonStr=xmlhttp.responseText;
			stopTimeToWait();
			if(IsJsonString(jsonStr)){
				// Todo Ok
			}else{
				markInServerAsRead(explanationId);
			}
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlay("ERROR DE CONEXIÓN","<p>Hubo un error de conexió intente nuevamente</p>");
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("POST","http://app.jugaplay.com/api/v1/explanations",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send(json);	
	}
}
function hasBeenRead(explanationId){
	if(window.readExplanations.indexOf(explanationId)>-1){
		return true;
	}else{
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
			if(IsJsonString(jsonStr)){
				readAlExplanationsFromServer(JSON.parse(jsonStr),explanationId);
			}else{
				hasBeenRead(explanationId)
			}
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlay("ERROR DE CONEXIÓN","<p>Hubo un error de conexió intente nuevamente</p>");
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("GET","http://app.jugaplay.com/api/v1/explanations",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send();	
		}
	}
}
// Show explanations
function openSpecificExplanationWindow(images, title){
	tableTitle='<H4>'+title+'</H4>';
	content=returnContentExplanations(images);
	openExplantationWindow(tableTitle,content);
}
function returnContentExplanations(images){
	var hmtlLi='';
	var hmtlDivImg='';
	for(img in images){
		if(img==0){
			hmtlLi+='<li data-target="#carousel-explanation-information" data-slide-to="'+img+'" class="active"></li>';
			hmtlDivImg+='<div onClick="" class="item active"><img src="img/explicaciones/'+images[img]+'" alt=""><div class="carousel-caption"></div></div>';
		}else{
			hmtlLi+='<li data-target="#carousel-explanation-information" data-slide-to="'+img+'"></li>';
			hmtlDivImg+='<div onClick="" class="item"><img src="img/explicaciones/'+images[img]+'" alt=""><div class="carousel-caption"></div></div>';
		}
	}
	return'<div id="carousel-explanation-information" class="carousel slide" data-ride="carousel"><ol class="carousel-indicators">'+hmtlLi+'</li></ol><div class="carousel-inner" role="listbox">'+hmtlDivImg+'</div><a class="left carousel-control" href="#carousel-explanation-information" role="button" data-slide="prev"><span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span><span class="sr-only">Previous</span></a><a class="right carousel-control" href="#carousel-explanation-information" role="button" data-slide="next"><span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span><span class="sr-only">Next</span></a></div>'
}
function openExplantationWindow(title,content){
	useId='BS-FL-'+Math.floor((Math.random() * 1000000000) + 1);
	BootstrapDialog.show({
			 id: useId,
			 cssClass: 'filter-pop-up fade',
			 title: title,
            message: content	
		 });  
}