// JavaScript Document
// Este javascript esta encargado de manejar el log in del sitio
// Llama a http://api.jugaplay.com/api/v1/tables/ que le devuelve las mesas disponibles para jugar
//window.onload=mensajeAlServidorPidiendoContenidoUsuario();
window.rankingVerano=new Array();
window.onload=setTimeout(function(){mensajeAlServidorPidiendoContenidoUsuario();}, 500);
function mensajeAlServidorPidiendoContenidoUsuario(){
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
			//alert("Lo que lee el servidor"+jsonStr);
			var json=JSON.stringify(jsonStr);
			var servidor=JSON.parse(json);
			var doble=JSON.parse(servidor);
			analizarRespuestaDatosUsuario(doble);
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlay("ERROR DE CONEXI&Oacute;N","<p>Hubo un error de conexi&oacute; intente nuevamente</p>");
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("GET","http://api.jugaplay.com/api/v1/users/33",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true"; 
		xmlhttp.send();		
}
function analizarRespuestaDatosUsuario(servidor){
	//alert("Lo que lee el servidor"+servidor);
	window.JugPlaUser=servidor;
	if (typeof(servidor.error) !== 'undefined'){
			window.location="login.html";
	}else{// Salio todo bien
		editarDatosHeaderJugaPlay(servidor);
	}
} 
function editarDatosHeaderJugaPlay(usuario){
	// Tengo que ponerle los datos que van
	//alert("vamo");
	setCookie("juga-Play-idUser", usuario.id, 120);
	aPonerNic=usuario.email;
	var navBar=document.getElementsByClassName("navbar-fixed-top").item(0);
	var img=navBar.getElementsByClassName("img-circle").item(0); // src
	var nic=navBar.getElementsByClassName("headear-nom-usu").item(0);// .innerHTML
	var posicion=document.getElementById("pos-rank-header");
	var pts=document.getElementById("pts-acum-header");
	//var tableroPntsPos=document.getElementById("pts-pos-tablero-header");
	nic.innerHTML=aPonerNic;
	posicion.innerHTML="-°";
	pts.innerHTML="- Pts";
	//tableroPntsPos.innerHTML="<a>- Pts| -°</a>";
	mensajeAlServidorPidiendoRanking();
	//img.src="../img/users/perfil.jpg";
}

function mensajeAlServidorPidiendoRanking(){
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
			//alert("Lo que lee el servidor"+jsonStr);
			var json=JSON.stringify(jsonStr);
			var servidor=JSON.parse(json);
			var doble=JSON.parse(servidor);
			analizarRespuestaRankingUsuario(doble);
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlay("ERROR DE CONEXI&Oacute;N","<p>Hubo un error de conexi&oacute; intente nuevamente</p>");
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("GET","http://api.jugaplay.com/api/v1/tournaments/1/rankings",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true"; 
		xmlhttp.send();		
}
function analizarRespuestaRankingUsuario(servidor){
	if (typeof(servidor.error) !== 'undefined'){
			//window.location="login.html";
	}else{// Salio todo bien
		editarDatosRankingJugaPlay(servidor);
	}
} 
function editarDatosRankingJugaPlay(ranking){
	// Tengo que ponerle los datos que van
	//alert("vamo");
	var usuId=getCookie("juga-Play-idUser");
	textPosicion="-°";
	textPoints="- Pts";
	textTableroPntPos="<a>- Pts | -°</a>";
	window.rankingVerano[4]=0;
	for(a in ranking){
		if((ranking[a].user_id)==usuId){
			textPosicion=ranking[a].position+"°";
			textPoints=ranking[a].points+" Pts";
			textTableroPntPos="<a>"+textPoints+"| "+textPosicion+"</a>";
			window.rankingVerano[4]=ranking[a].points;
		}
		if(ranking[a].position<4){
			window.rankingVerano[ranking[a].position]=ranking[a].points;
		}
	}
	var navBar=document.getElementsByClassName("navbar-fixed-top").item(0);
	var posicion=document.getElementById("pos-rank-header");
	var pts=document.getElementById("pts-acum-header");
	//var tableroPntsPos=document.getElementById("pts-pos-tablero-header");
	posicion.innerHTML=textPosicion;
	pts.innerHTML=textPoints;
	//tableroPntsPos.innerHTML=textTableroPntPos;
	//img.src="../img/users/perfil.jpg";
}