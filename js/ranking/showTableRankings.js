// JavaScript Document
//mensajeAlServidorPidiendoRankingLibertadores();
window.onload=showCompleteRanking();
function showCompleteRanking(){
	previousRankingLibertadores=getCookie("ranking-Libertadores-Jp");
	previousRankingArgentino=getCookie("ranking-TArgentino-Jp");
	previousRankingChileno=getCookie("ranking-Chileno-Jp");
	if(previousRankingLibertadores.length>4 && previousRankingArgentino.length>4 && previousRankingChileno.length>4){		
			var json=JSON.stringify(previousRankingLibertadores);
			var servidor=JSON.parse(json);
			var doble=JSON.parse(servidor);
			editarDatosRankingLibertadoresJugaPlay(doble);
			var json=JSON.stringify(previousRankingArgentino);
			var servidor=JSON.parse(json);
			var doble=JSON.parse(servidor);
			editarDatosRankingPrimeraAJugaPlay(doble);
			var json=JSON.stringify(previousRankingChileno);
			var servidor=JSON.parse(json);
			var doble=JSON.parse(servidor);
			editarDatosRankingChilenoJugaPlay(doble);
			// Fin de cargar los rankins
			mensajeAlServidorPidiendoRankingLibertadores();
	
		}else{
			 mensajeAlServidorPidiendoRankingLibertadores();
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
	    }else if(xmlhttp.status==503 || xmlhttp.status==404){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlay("ERROR DE CONEXI&Oacute;N","<p>Hubo un error de conexi&oacute; intente nuevamente</p>");
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("GET","http://app.jugaplay.com/api/v1/tournaments/2/rankings",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true"; 
		xmlhttp.send();		
}
function analizarRespuestaRankingUsuarioPrimeraA(servidor){
	if (typeof(servidor.error) !== 'undefined'){
			//window.location="login.html";
	}else{// Salio todo bien
		editarDatosRankingPrimeraAJugaPlay(servidor);
	}
} 
function editarDatosRankingPrimeraAJugaPlay(ranking){
	window.rankingPrimeraACompleto=ranking;
	document.getElementById("ranking-container-2").innerHTML="<H3>Torneo Argentino</H3>"+armarTablaConRankinGeneral(window.rankingPrimeraACompleto,'PrimeraA');
	setTimeout(function(){
		 $('#dataTables-table-rankingPrimeraA').DataTable({
                responsive: true
        });
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
			setCookie("ranking-Libertadores-Jp", jsonStr, 120);
			//alert("Lo que lee el servidor"+jsonStr);
			var json=JSON.stringify(jsonStr);
			var servidor=JSON.parse(json);
			var doble=JSON.parse(servidor);
			analizarRespuestaRankingUsuarioLibertadores(doble);
			mensajeAlServidorPidiendoRankingPrimeraA();
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlay("ERROR DE CONEXI&Oacute;N","<p>Hubo un error de conexi&oacute; intente nuevamente</p>");
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("GET","http://app.jugaplay.com/api/v1/tournaments/4/rankings",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true"; 
		xmlhttp.send();		
}
function analizarRespuestaRankingUsuarioLibertadores(servidor){
	if (typeof(servidor.error) !== 'undefined'){
			//window.location="login.html";
	}else{// Salio todo bien
		editarDatosRankingLibertadoresJugaPlay(servidor);
	}
} 
function editarDatosRankingLibertadoresJugaPlay(ranking){
	window.rankingLibertadoresCompleto=ranking;
	document.getElementById("ranking-container-1").innerHTML="<H3>Libertadores</H3>"+armarTablaConRankinGeneral(window.rankingLibertadoresCompleto,'Libertadores');
	setTimeout(function(){
		$('#dataTables-table-rankingLibertadores').DataTable({
                responsive: true
        })
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
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlay("ERROR DE CONEXI&Oacute;N","<p>Hubo un error de conexi&oacute; intente nuevamente</p>");
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("GET","http://app.jugaplay.com/api/v1/tournaments/5/rankings",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true"; 
		xmlhttp.send();		
}
function analizarRespuestaRankingUsuarioChileno(servidor){
	if (typeof(servidor.error) !== 'undefined'){
			//window.location="login.html";
	}else{// Salio todo bien
		editarDatosRankingChilenoJugaPlay(servidor);
	}
} 
function editarDatosRankingChilenoJugaPlay(ranking){
	window.rankingChilenoCompleto=ranking;
	document.getElementById("ranking-container-3").innerHTML="<H3>Torneo Chileno</H3>"+armarTablaConRankinGeneral(window.rankingChilenoCompleto,'Chileno');
	setTimeout(function(){
		$('#dataTables-table-rankingChileno').DataTable({
                responsive: true
        })
		}, 500);
}
function armarTablaConRankinGeneral(rankingGN,nombre){
	usuId=window.userDataJugaPlay.id;
	cantidadDeJugadores=rankingGN.length;
	titulo='';
	lineaRanking='';
	for(a in rankingGN){
		if((rankingGN[a].user_id)!=usuId){
			lineaRanking+='<tr><td>'+rankingGN[a].position+'</td><td>'+rankingGN[a].user_nickname+'</td><td>'+rankingGN[a].points+' Pts</td></tr>';
		}
		else{
			lineaRanking+='<tr><th>'+rankingGN[a].position+'</th><th>'+rankingGN[a].user_nickname+'</th><th>'+rankingGN[a].points+' Pts</th></tr>';
			titulo='<p><b> Tu posicion es '+rankingGN[a].position+'° de '+cantidadDeJugadores+' Jugadores</b><p>';
		}
	}
	l1='<table class="table table-striped table-bordered table-hover" id="dataTables-table-ranking'+nombre+'">';
	l2='<thead><tr><th>Posicion</th><th>Nick</th><th>Puntos</th></tr></thead><tbody>';
	//l3='<tr><td>1°</td><td>River Campeon</td><td>48 Pts</td></tr>';
	l4='</tbody></table>';
	texto=titulo+l1+l2+lineaRanking+l4;
	return texto;
}