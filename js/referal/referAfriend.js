// JavaScript Document
// Link de recomendacion
window.sendMailsInvitatios=[];
window.onload=showRecomendationUrl();
function showRecomendationUrl(){
	var linkText=getCookie("recomJPUsu-"+getUserJugaplayId()+"-Jp");
	if(linkText.length>4){
		var element=document.getElementById("recomendationLink");
		if (typeof(element) != 'undefined' && element != null)
		{ 	
			document.getElementById("recomendationLink").value=linkText;
			setCookie("recomJPUsu-"+getUserJugaplayId()+"-Jp", linkText, 120);
			document.getElementById("recomendationLink").value=linkText;
		}else{
			setTimeout(function(){showRecomendationUrl();}, 500);
		}
	}else{
		askForRequestInvitationId('Link');
	}	
}
function inviteFriendsLink(idRequest){
		var element=document.getElementById("recomendationLink");
		if (typeof(element) != 'undefined' && element != null)
		{ 	
			var linkText="http://www.jugaplay.com/?cnl="+hideUserHashNot(getUserJugaplayId())+"&cri="+hideUserHashNot(idRequest);
			setCookie("recomJPUsu-"+getUserJugaplayId()+"-Jp", linkText, 120);
			document.getElementById("recomendationLink").value=linkText;
		}else{
			setTimeout(function(){inviteFriendsLink(idRequest);}, 500);
		}
}
// Copiar el link
function copyRecomendationLink(){
	document.getElementById("recomendationLink").select();
	copySelectedText();
}
function copySelectedText(){
	try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copying text command was ' + msg);
  	} catch (err) {
    avisoEmergenteJugaPlay('Su navegador no soporta la función para copiar automáticamente');
	console.log('Error ' + err);
  }
}
function relocateInvitationRequest(idRequest, type){
	if(type=="Twitter"){inviteFriendsTwitter(idRequest);}
	if(type=="Facebook"){inviteFriendsFacebook(idRequest);}
	if(type=="Whatsapp"){inviteFriendsWhatsapp(idRequest);}
	if(type=="Mail"){sendMailsRecomendations(idRequest);}
	if(type=="Link"){inviteFriendsLink(idRequest);}
}
// Otras funciones de recomendacion!! 
function inviteFriendsFacebook(idRequest){
  document.getElementById('recomendationLink').click();// Hace click para evitar que se bloquee el pop up de Fb
  linkText="http://www.jugaplay.com/?cnl="+hideUserHashNot(getUserJugaplayId())+"&cri="+hideUserHashNot(idRequest);
  window.plugins.socialsharing.share(linkText);
}
function inviteFriendsTwitter(idRequest){
	linkText="http://www.jugaplay.com/?cnl="+hideUserHashNot(getUserJugaplayId())+"&cri="+hideUserHashNot(idRequest);
	window.plugins.socialsharing.share(linkText);
}
//<a href="whatsapp://send?text=The text to share!" data-action="share/whatsapp/share">Share via Whatsapp</a>
function inviteFriendsWhatsapp(idRequest){
	var whatsapp = document.createElement("a");
	linkText="http://www.jugaplay.com/%3fcnl%3d"+hideUserHashNot(getUserJugaplayId())+"%26cri%3d"+hideUserHashNot(idRequest);
		whatsapp.href='whatsapp://send?text=Te%20desafío%20a%20jugar%20en%20Jugaplay,%20la%20mejor%20competencia%20de%20futbol%20fantasía%20en%20todo%20América.%20Dudo%20que%20me%20puedas%20ganar!\nEntra%20con%20este%20link%20desde%20tu%20celular%20o%20computadora%20así%20me%20haces%20ganar%20monedas:'+linkText+'\nGracias%20:)';
	whatsapp.setAttribute("data-tournament-type", "share/whatsapp/share");
	document.body.appendChild(whatsapp);
	whatsapp.click();
}
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
                    validateMailToSend(dialogItself);
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
function validateMailToSend(dialog){
	mailsContacto=document.getElementById("mailContactoInvitacion").value;
	if(mailsContacto.length>1){
		window.sendMailsInvitatios=(document.getElementById("mailContactoInvitacion").value).split(",");
		askForRequestInvitationId('Mail');
		dialog.close();
	}else{
			avisoEmergenteJugaPlay("Sin Contenido","<p>El campo mails es obligatorio</p>");
	}
}
function sendMailsRecomendations(idRequest){
	if(getUserJugaplayEmail()!=null){var sendFrom=getUserJugaplayEmail();}else{var sendFrom="info@jugaplay.com";}
	var linkText="http://www.jugaplay.com/?cnl="+hideUserHashNot(getUserJugaplayId())+"&cri="+hideUserHashNot(idRequest);
	var json=JSON.stringify({ "from": "info@jugaplay.com", "to": window.sendMailsInvitatios, "from_user_id":getUserJugaplayId(), "sender_link":linkText, "content_mail":" "});
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
			stopTimeToWait();
			avisoEmergenteJugaPlay("Muchas Gracias","<p>Muchas gracias por su recomendación</p>");
			
	    }else if(xmlhttp.status==503 || xmlhttp.status==404){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlay("ERROR DE CONEXI&Oacute;N","<p>Hubo un error de conexi&oacute; intente nuevamente</p>");
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("POST","http://app.jugaplay.com/api/v1/mailer/send_request",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		//xmlhttp.withCredentials = "true";
		xmlhttp.send(json);
	}
}
function askForRequestInvitationId(type){
	json=JSON.stringify({ "request_type_name": type });
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
	 	 if ((xmlhttp.readyState==4 && xmlhttp.status==200) ||  (xmlhttp.readyState==4 && xmlhttp.status==422))
	    {
			stopTimeToWait();
			var jsonStr=xmlhttp.responseText;
			if(IsJsonString(jsonStr)){ // Me fijo si dio un error, en el caso de que de le sigo mandando
			closeLoadingAnimation();
			relocateInvitationRequest( (JSON.parse(jsonStr)).id, type);
				}else{
				askForRequestId(type);
			}
			
	    }else if(xmlhttp.status==503 || xmlhttp.status==404){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlay("ERROR DE CONEXI&Oacute;N","<p>Hubo un error de conexi&oacute; intente nuevamente</p>");
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("POST","http://app.jugaplay.com/api/v1/users/"+getUserJugaplayId()+"/requests/",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send(json);	
	}
}