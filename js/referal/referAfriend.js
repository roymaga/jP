// JavaScript Document
window.onload=showRecomendationUrl();
function showRecomendationUrl(){
	var element =  document.getElementById("recomendationLink");
	if (typeof(element) != 'undefined' && element != null)
	{ 	
		linkText="http://www.jugaplay.com/?invitedby="+window.userDataJugaPlay.nickname+"&cnl="+hideUserHashNot(window.userDataJugaPlay.id);
		document.getElementById("recomendationLink").value=linkText;
	}else{
		setTimeout(function(){showRecomendationUrl();}, 500);
	}
}
function inviteFriendsFacebook(){
  //linkText="http://www.jugaplay.com/?invitedby="+window.userDataJugaPlay.nickname+"&cnl="+hideUserHashNot(window.userDataJugaPlay.id);
  linkText="text";
  window.plugins.socialsharing.share(linkText);
}
function inviteFriendsTwitter(){
	linkText="http://jugaplay.com/?cnl="+hideUserHashNot(window.userDataJugaPlay.id);
	window.plugins.socialsharing.share('Demuestra cuanto sabes de futbol: '+linkText);
}
//<a href="whatsapp://send?text=The text to share!" data-action="share/whatsapp/share">Share via Whatsapp</a>
function inviteFriendsWhatsapp(){
	var whatsapp = document.createElement("a");
	linkText="http://www.jugaplay.com/%3fcnl%3d"+hideUserHashNot(window.userDataJugaPlay.id);
		whatsapp.href='whatsapp://send?text=Te%20recomiendo%20Jugaplay,%20un%20increíble%20juego%20que%20pone%20a%20prueba%20cuanto%20sabes%20de%20futbol%20donde%20ganas%20premios%20si%20realmente%20sabes%20\n%20Entra%20con%20este%20link%20así%20me%20haces%20ganar%20monedas:%20\n'+linkText+'%20\n%20Gracias%20:)';
	whatsapp.setAttribute("data-tournament-type", "share/whatsapp/share");
	document.body.appendChild(whatsapp);
	whatsapp.click();
}
// Invitar Amigos por mail

/* Notificacion de como es el mensaje de contacto */
function inviteFriendsMail(){
		 BootstrapDialog.show({
			 cssClass: 'general-modal-msj',
			 title: "<H1>Invitar por Mail</H1>",
            message: contenidoDeEnviarMailInvitacion(),
			buttons: [{
                label: 'Invitar',
				id:'boton-panel-registro-aviso-error-pop-up',
                action: function(dialogItself){
                    enviarMensajeDeInvitacion(dialogItself);
                }
            }]	 
		 });
	}
function headerDeEnviarMailInvitacion(){
	texto="<div class='row'><div class='cont-img'><img src='../img/beta/pop-ups/pop3.jpg'></div></div><div class='row'><H1>INVITAR A AMIGOS POR MAIL</H1></div>";
	return texto;
}
function contenidoDeEnviarMailInvitacion(){
	linea1="<p>Invita amigos y gana monedas para usarlas como quieras!!  Si deseas ingrear mas de un mail, separalos por comas.</p>";
	linea3="<p></p>";
	linea4="<p>Mail/Mails: </p><input id='mailContactoInvitacion' type='text'>";
	texto=linea1+linea3+linea4;
	return texto;
}
function enviarMensajeDeInvitacion(dialog){
	linkText="http://www.jugaplay.com/pages/login.html?invitedby="+window.userDataJugaPlay.nickname+"&cnl="+hideUserHashNot(window.userDataJugaPlay.id);
	mailsContacto=document.getElementById("mailContactoInvitacion").value;
	contenidoContacto="";
	// Mejorar el ingreso de mails, tipo gmail
	if(mailsContacto.length>1){
		json=JSON.stringify( { "mails_contact": mailsContacto,"content_mail": contenidoContacto, "sender_email": window.userDataJugaPlay.email, "sender_id": window.userDataJugaPlay.id, "sender_link": linkText} );
		mensajeAlServidorEnviandoMailInvitacion(json);
		dialog.close();
	}else{
			avisoEmergenteJugaPlay("Sin Contenido","<p>El campo mails es obligatorio</p>");
	}
	//dialog.close;
}
function mensajeAlServidorEnviandoMailInvitacion(json){
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
	 	 if ((xmlhttp.readyState==4 && xmlhttp.status==200) ||  (xmlhttp.readyState==4 && xmlhttp.status==422))
	    {
			ga('send', 'event', 'Invitation for Coins', 'Mail', 'Send');
			//alert(xmlhttp.responseText);
			avisoEmergenteJugaPlay("Muchas Gracias","<p>Muchas gracias por su recomendación</p>");
			
	    }else if(xmlhttp.status==503 || xmlhttp.status==404){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlay("ERROR DE CONEXI&Oacute;N","<p>Hubo un error de conexi&oacute; intente nuevamente</p>");
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("POST","http://data.jugaplay.com/mail/sendMail.php",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		//xmlhttp.withCredentials = "true";
		xmlhttp.send(json);}		
}