// JavaScript Document
//mensajeAlServidorPidiendoRankingLibertadores();
window.onload=setTimeout(function(){showCompleteRanking();}, 500);
window.rankingForAnalytics=[];
function showCompleteRanking(){
	var previousRankingArgentino=getCookie("ranking-TArgentino-Jp");
	var previousRankingChileno=getCookie("ranking-Chileno-Jp");
	var previousRankingChampions=getCookie("ranking-Champions-Jp");
	var previousRankingLibertadores=getCookie("ranking-Libertadores-Jp");
	if(previousRankingArgentino.length>4 && previousRankingChileno.length>4 && previousRankingChampions.length>4 && previousRankingLibertadores.length>4){		
			var json=JSON.stringify(previousRankingArgentino);
			var servidor=JSON.parse(json);
			var doble=JSON.parse(servidor);
			editarDatosRankingPrimeraAJugaPlay(doble);
			var json=JSON.stringify(previousRankingChileno);
			var servidor=JSON.parse(json);
			var doble=JSON.parse(servidor);
			editarDatosRankingChilenoJugaPlay(doble);
			var json=JSON.stringify(previousRankingChampions);
			var servidor=JSON.parse(json);
			var doble=JSON.parse(servidor);
			var json=JSON.stringify(previousRankingLibertadores);
			var servidor=JSON.parse(json);
			var doble=JSON.parse(servidor);
			editarDatosRankingLibertadoresJugaPlay(doble);
			// Fin de cargar los rankins
			mensajeAlServidorPidiendoRankingPrimeraA();
	
		}else{
			 mensajeAlServidorPidiendoRankingPrimeraA();
		}
}
function mensajeAlServidorPidiendoRankingPrimeraA(){
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
	 	 if ((xmlhttp.readyState==4 && xmlhttp.status==200) ||  (xmlhttp.readyState==4 && xmlhttp.status==422) ||  (xmlhttp.readyState==4 && xmlhttp.status==401))
	    {
			jsonStr=xmlhttp.responseText;
			setCookie("ranking-TArgentino-Jp", jsonStr, 120);
			//alert("Lo que lee el servidor"+jsonStr);
			var json=JSON.stringify(jsonStr);
			var servidor=JSON.parse(json);
			var doble=JSON.parse(servidor);
			analizarRespuestaRankingUsuarioPrimeraA(doble);
			mensajeAlServidorPidiendoRankingChileno();	
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404 || xmlhttp.status==105){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlayConnectionError();
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("GET",getJPApiURL()+"tournaments/8/rankings",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true"; 
		xmlhttp.send();		
}
function analizarRespuestaRankingUsuarioPrimeraA(servidor){
	if (typeof(servidor.errors) !== 'undefined' || typeof(servidor.error) !== 'undefined' ){
			//window.location="login.html";
	}else{// Salio todo bien
		editarDatosRankingPrimeraAJugaPlay(servidor);
	}
} 
function editarDatosRankingPrimeraAJugaPlay(ranking){
	window.rankingPrimeraACompleto=ranking;
	document.getElementById("ranking-container-1").innerHTML="<H3>Torneo Argentino</H3>"+armarTablaConRankinGeneral(window.rankingPrimeraACompleto,'PrimeraA');
	setTimeout(function(){
		 $('#dataTables-table-rankingPrimeraA').DataTable({
                responsive: true
        });
		}, 500);
}
function mensajeAlServidorPidiendoRankingChileno(){
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
	 	 if ((xmlhttp.readyState==4 && xmlhttp.status==200) ||  (xmlhttp.readyState==4 && xmlhttp.status==422) ||  (xmlhttp.readyState==4 && xmlhttp.status==401))
	    {
			jsonStr=xmlhttp.responseText;
			setCookie("ranking-Chileno-Jp", jsonStr, 120);
			//alert("Lo que lee el servidor"+jsonStr);
			var json=JSON.stringify(jsonStr);
			var servidor=JSON.parse(json);
			var doble=JSON.parse(servidor);
			analizarRespuestaRankingUsuarioChileno(doble);
			mensajeAlServidorPidiendoRankingChampions();
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404 || xmlhttp.status==105){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlayConnectionError();
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("GET",getJPApiURL()+"tournaments/10/rankings",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true"; 
		xmlhttp.send();		
}
function analizarRespuestaRankingUsuarioChileno(servidor){
	if (typeof(servidor.errors) !== 'undefined' || typeof(servidor.error) !== 'undefined' ){
			//window.location="login.html";
	}else{// Salio todo bien
		editarDatosRankingChilenoJugaPlay(servidor);
	}
} 
function editarDatosRankingChilenoJugaPlay(ranking){
	window.rankingChilenoCompleto=ranking;
	document.getElementById("ranking-container-2").innerHTML="<H3>Torneo Chileno</H3>"+armarTablaConRankinGeneral(window.rankingChilenoCompleto,'Chileno');
	setTimeout(function(){
		$('#dataTables-table-rankingChileno').DataTable({
                responsive: true
        })
		}, 500);
}
/* */
function mensajeAlServidorPidiendoRankingChampions(){
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
	 	 if ((xmlhttp.readyState==4 && xmlhttp.status==200) ||  (xmlhttp.readyState==4 && xmlhttp.status==422) ||  (xmlhttp.readyState==4 && xmlhttp.status==401))
	    {
			jsonStr=xmlhttp.responseText;
			setCookie("ranking-Champions-Jp", jsonStr, 120);
			//alert("Lo que lee el servidor"+jsonStr);
			var json=JSON.stringify(jsonStr);
			var servidor=JSON.parse(json);
			var doble=JSON.parse(servidor);
			mensajeAlServidorPidiendoRankingLibertadores();
			analizarRespuestaRankingUsuarioChampions(doble);
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404 || xmlhttp.status==105){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlayConnectionError();
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("GET",getJPApiURL()+"tournaments/9/rankings",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true"; 
		xmlhttp.send();		
}
function analizarRespuestaRankingUsuarioChampions(servidor){
	if (typeof(servidor.errors) !== 'undefined' || typeof(servidor.error) !== 'undefined' ){
			//window.location="login.html";
	}else{// Salio todo bien
		editarDatosRankingChampionsJugaPlay(servidor);
	}
} 
function editarDatosRankingChampionsJugaPlay(ranking){
	window.rankingCAmericaCompleto=ranking;
	document.getElementById("ranking-container-3").innerHTML="<H3>Champions League</H3>"+armarTablaConRankinGeneral(window.rankingCAmericaCompleto,'Champions');
	setTimeout(function(){
		$('#dataTables-table-rankingChampions').DataTable({
                responsive: true
        })
		}, 500);
}
function mensajeAlServidorPidiendoRankingLibertadores(){
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
	 	 if ((xmlhttp.readyState==4 && xmlhttp.status==200) ||  (xmlhttp.readyState==4 && xmlhttp.status==422) ||  (xmlhttp.readyState==4 && xmlhttp.status==401))
	    {
			jsonStr=xmlhttp.responseText;
			setCookie("ranking-Champions-Jp", jsonStr, 120);
			//alert("Lo que lee el servidor"+jsonStr);
			var json=JSON.stringify(jsonStr);
			var servidor=JSON.parse(json);
			var doble=JSON.parse(servidor);
			analizarRespuestaRankingUsuarioLibertadores(doble);
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404 || xmlhttp.status==105){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlayConnectionError();
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("GET",getJPApiURL()+"tournaments/11/rankings",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true"; 
		xmlhttp.send();		
}
function analizarRespuestaRankingUsuarioLibertadores(servidor){
	if (typeof(servidor.errors) !== 'undefined' || typeof(servidor.error) !== 'undefined' ){
			//window.location="login.html";
	}else{// Salio todo bien
		editarDatosRankingLibertadoresJugaPlay(servidor);
	}
} 
function editarDatosRankingLibertadoresJugaPlay(ranking){
	window.rankingLibertadoresCompleto=ranking;
	document.getElementById("ranking-container-4").innerHTML="<H3>Libertadores</H3>"+armarTablaConRankinGeneral(window.rankingLibertadoresCompleto,'Libertadores');
	setTimeout(function(){
		$('#dataTables-table-rankingLibertadores').DataTable({
                responsive: true
        })
		}, 500);
}
/* */ 
function armarTablaConRankinGeneral(rankingGN,nombre){
	var usuId=window.userDataJugaPlay.id;
	var cantidadDeJugadores=rankingGN.length;
	var titulo='';
	var lineaRanking='';
	for(a in rankingGN){
		if((rankingGN[a].user_id)!=usuId){
			lineaRanking+='<tr><td>'+rankingGN[a].position+'</td><td>'+rankingGN[a].user_nickname+'</td><td>'+rankingGN[a].points+' Pts</td></tr>';
		}
		else{
			lineaRanking+='<tr><th>'+rankingGN[a].position+'</th><th>'+rankingGN[a].user_nickname+'</th><th>'+rankingGN[a].points+' Pts</th></tr>';
			titulo='<p><b> Tu posicion es '+rankingGN[a].position+'° de '+cantidadDeJugadores+' Jugadores</b><p>';
			window.rankingForAnalytics[nombre]=rankingGN[a].position;
		}
	}
	var l1='<table class="table table-striped table-bordered table-hover" id="dataTables-table-ranking'+nombre+'">';
	var l2='<thead><tr><th>Posicion</th><th>Nick</th><th>Puntos</th></tr></thead><tbody>';
	//l3='<tr><td>1°</td><td>River Campeon</td><td>48 Pts</td></tr>';
	var l4='</tbody></table>';
	var texto=titulo+l1+l2+lineaRanking+l4;
	return texto;
}
function changeTournament(tournament){
	jpAnalyticsEvent("ENTER_RANKING", tournament, window.rankingForAnalytics[tournament].toString());
}