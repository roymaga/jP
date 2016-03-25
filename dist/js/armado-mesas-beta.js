// JavaScript Document
// Script para armado de la mesa Beta
function terminarMesaBeta(dialog,mesa){
	jugadoresRestantes=window.maxPlayerPosibleJugadaSelect-window.arrPlayersSelected.length;
	if(jugadoresRestantes==0){
			if(mesa.entry_coins_cost>0){// verificar que tiene las monedas cuando le pregunte, que lo haga preguntando los datos en el momento
				preguntarSiQuiereApostar(dialog,mesa.id,mesa.entry_coins_cost);
			}else{
				enviarJugadaAlServidor(dialog,mesa.id,"false");
			}
			
	}else{// faltan jugadores para hacer la jugada
			avisoEmergenteJugaPlay("Fatan jugadores","<p>Para completar la jugada faltan elegir <b>"+jugadoresRestantes+"</b> jugadores</p>");
		}
}
function registroBetaLanzamiento(){
	abrirRegistro();
}
/* Pregunto si quiere apostar */
function preguntarSiQuiereApostar(dialog,idTabla,costOfTable){
	ga('send', 'event', 'Notification Gambling Virtual Colins Open', 'Feedback', '');
		 tituloMesa=headerDeJugarMonedas();
		 contenidoMesa=contenidoDeJugarMonedas(costOfTable);
		 BootstrapDialog.show({
			 cssClass: 'emergentes-pop-up-gen',
			 title: tituloMesa,
            message: "<div class='contenido-interno'>"+contenidoMesa+"</div>"	,
			buttons: [{
                label: 'No Gracias',
				cssClass: 'btn-warning',
                action: function(dialogItself) {
					dialogItself.close();
                    enviarJugadaAlServidor(dialog,idTabla,"false");
                }
            },
			{
                label: 'Jugar Monedas',
                action: function(dialogItself) {
					if(window.userCoinsToPlay>=costOfTable){
					window.userCoinsToPlay-=costOfTable;
					document.getElementById("pts-pos-tablero-header").innerHTML="<a style='font-size: 18px; font-weight: bolder;cursor: pointer;' onclick='explicacionMonedas();'>"+window.userCoinsToPlay+" <img src='../img/beta/complements/coins.png' height='22' style='margin-top: -5px; margin-left: 7px;'></a>";
					dialogItself.close();
                    enviarJugadaAlServidor(dialog,idTabla,"true");
					}else{
						avisoEmergenteJugaPlay("Monedas Insuficientes","<p>Tienes "+window.userCoinsToPlay+" Monedas Jugaplay y la Jugada requiere "+costOfTable+" Monedas para poder activar el beneficio de duplicar tu premio.</p><p> Consigue monedas de la siguiente manera <a style='font-size: 18px; font-weight: bolder;cursor: pointer;' onclick='explicacionMonedas();'>conseguir monedas Jugaplay</a> </p>");
					}
                }
            }
			
			
			]	 
		 });

}
function headerDeJugarMonedas(){
	texto="<div class='row'><H1>¿Quieres duplicar tu premio?</H1></div>";
	return texto;
}
function contenidoDeJugarMonedas(costOfTable){
	linea1="<div class='row'><h3>Juga <b>"+costOfTable+" Monedas Jugaplay </b> y si te ganas un premio en vez de uno te llevas dos.</h3></div>";
	linea2="<div class='row'><p style='font-size: 14px; font-weight: bolder;cursor: pointer;' onclick='explicacionMonedas();'>¿Qué es esto de las Monedas Jugaplay?</p></div>";
	texto=linea1+linea2;
	return texto;
}
/* Realizo la jugada */
function enviarJugadaAlServidor(dialog,idTabla,bet){
	startLoadingAnimation();
	if(bet!="false"){
		json=JSON.stringify({"table_id":idTabla, "player_ids":[window.arrPlayersSelected],"bet":bet});
	}
	else{
		json=JSON.stringify({"table_id":idTabla, "player_ids":[window.arrPlayersSelected]});
	}
	//alert(json);
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
			setTimeout(function(){graciasPorJugarBeta();}, 1000);
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