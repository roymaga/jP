// JavaScript Document
// Script para armado de la mesa Beta
function terminarMesaBeta(dialog,mesa){
	jugadoresRestantes=window.maxPlayerPosibleJugadaSelect-window.arrPlayersSelected.length;
	if(jugadoresRestantes==0){
			enviarJugadaAlServidor(dialog,mesa.id);
	}else{// faltan jugadores para hacer la jugada
			avisoEmergenteJugaPlay("Fatan jugadores","<p>Para completar la jugada faltan elegir <b>"+jugadoresRestantes+"</b> jugadores</p>");
		}
}
function registroBetaLanzamiento(){
	abrirRegistro();
}
/* Realizo la jugada */
function enviarJugadaAlServidor(dialog,idTabla){
	startLoadingAnimation();
	json=JSON.stringify({"table_id":idTabla, "player_ids":[window.arrPlayersSelected]});
	//alert("enviarJugadaAlServidor Json"+json);
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
			//alert("Respuesta finLogInUsuarioEnElSitioEnviandoDatosJugada"+jsonStr);
			var json=JSON.stringify(jsonStr);
			var servidor=JSON.parse(json);
			var doble=JSON.parse(servidor);
			closeLoadingAnimation();
			ga('send', 'event', 'JUGADA', idTabla, '');
			dialog.close();
			cancelarOpcionJugarMesaYaJugada(idTabla);
			setTimeout(function(){graciasPorJugarBeta();}, 3000);
			//analizarRespuestaRegistroBeta(doble);
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlay("ERROR DE CONEXI&Oacute;N","<p>Hubo un error de conexi&oacute; intente nuevamente</p>");
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("POST","http://api.jugaplay.com/api/v1/play",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send(json);		
}
function graciasPorJugarBeta(){
	avisoEmergenteJugaPlay("Gracias por Jugar","<p>Muchas gracias por ingresar y participar en Jugaplay.</p><p>Valoramos mucho tu visita.</p><p>Te enviaremos los resultados de tu Jugada al mail cuando termine el partido.</p><p>¡Te deseamos mucha suerte!</p>");
}