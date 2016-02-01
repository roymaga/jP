// JavaScript Document
//window.onload=setTimeout(function(){revisarMesaApi();}, 500);
function revisarMesaApi(){
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
			var json=JSON.stringify(jsonStr);
			var servidor=JSON.parse(json);
			var doble=JSON.parse(servidor);
			analizarRespuestaRevisarMesaApi(doble);
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlay("ERROR DE CONEXI&Oacute;N","<p>Hubo un error de conexi&oacute; intente nuevamente</p>");
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("GET","http://api.jugaplay.com/api/v1/tables/",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send();	
}
function analizarRespuestaRevisarMesaApi(respuesta){
	//alert(respuesta[1].has_been_played_by_user);
	for (a in respuesta){
		if(respuesta[a].has_been_played_by_user==true){
		cancelarOpcionJugarMesaYaJugada(respuesta[a].id);
		}
	}
	
}
function cancelarOpcionJugarMesaYaJugada(idMesa){
	if(document.getElementById("btn-mesa-visible-id"+idMesa)!=null){
	boton=document.getElementById("btn-mesa-visible-id"+idMesa);
	boton.innerHTML="ANOTADO"; //.btn-jugar-no-disponible
	boton.className="btn btn-jugar-no-disponible btn-block";
	boton.onclick=function(){mesaYaJugada(idMesa);};}
}
function mesaYaJugada(idMesa){
	// Poner los Jugadores que eligio
	avisoEmergenteJugaPlay("Mesa ya jugada","<p>Los usuarios solo pueden jugar una vez cada mesa</p>");
}
