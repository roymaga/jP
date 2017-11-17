// JavaScript Document
// Este javascript esta encargado de manejar el log in del sitio
// Llama a http://app.jugaplay.com/api/v1/tables/ que le devuelve las mesas disponibles para jugar
// Comienzo log-In Comun
function abrirLogIn(){
  		if (checkCookie()!=true) {
    		avisoEmergenteJugaPlay("Habilitar las cookies","<p>Para poder disfrutar la experiencia Jugaplay es necesario que tenga las cookies de su navegador habilitadas</p>");
	  }else{
	BootstrapDialog.show({
			 cssClass: 'log-in-pop-up',
			 title: "<span class='trn'>Iniciar sesión</span>",
            message: "<div class='row'><div onclick='processFacebook(\"login\");' class='botton-general-size facebook'><span class='trn'>Ingresa con Facebook</span></div></div><div class='row'>-O-</div><div class='row'><input placeholder='Correo electrónico' data-trn-holder='email' id='email-pop' class='botton-general-size trn' type='text' value=''></div><div class='row'><input placeholder='Contraseña' data-trn-holder='pass' id='password-pop' class='botton-general-size trn' type='password' value=''></div><div class='row'><a style=' margin-right: 20px; cursor: pointer;' onclick='passwordRecovery();' class='trn'>¿Olvido su contraseña?</a><input type='checkbox' id='checkKeepLogIn' checked>  <span class='trn'>Recordar</span></div>",
			buttons: [{
                label: "<span class='trn'>Iniciar sesión</span>",
				id:'boton-panel-login',
                action: function(dialog) {
                    logInUsuarioEnElSitio();
                }
            }],
                  onshown: function(dialogItself) {
                              checkLanguageItem(dialogItself);
                            }

		 });
		 setTimeout(function(){alwaysShowInputValues();}, 1500);
		 }
}
function logInUsuarioEnElSitio(){
	var mail=document.getElementById("email-pop").value;
	var pass=document.getElementById("password-pop").value;
	if(mail.length < 1 || pass.length < 1 ){
		if(mail.length < 1 && pass.length < 1 ){
			avisoEmergenteJugaPlay("<span class='trn'>Campos vacíos</span>","<p class='trn'>Los campos <b>Correo electrónico, Contraseña y Apodo</b> son obligatorios</p>");
			}
		else{
			if(mail.length < 1){
        avisoEmergenteJugaPlay("<span class='trn'>Campo vacío</span>","<p class='trn'>El Campo <b>Correo electrónico</b> es obligatorio</p>");
			}else{
				avisoEmergenteJugaPlay("<span class='trn'>Campo vacío</span>","<p class='trn'>El Campo <b>Contraseña</b> es obligatorio</p>");
			}
		}	// Termina el tipo de mensaje
	return false ;
	}else if( pass.length < 8){
		avisoEmergenteJugaPlay("<span class='trn'>Contraseña muy corta</span>","<p class='trn'>La <b>contraseña</b> debe tener al menos <b>8</b> caracteres</p>");
		return false ;
	};// Si paso es que los campos estan bien
	var json=JSON.stringify({ "user": { "email": mail, "password":pass } });
	if(startLoadingAnimation()==true){
	mensajeAlServidorConContenidoLogIn(json);}
}
function mensajeAlServidorConContenidoLogIn(json){
	if(checkConnection()){
		mensajeAlServidorConContenidoLogIn2(json);
	}else{
		setTimeout(function(){mensajeAlServidorConContenidoLogIn(json)},100);
	}
}
function mensajeAlServidorConContenidoLogIn2(json){
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
	 	 if ((xmlhttp.readyState==4 && xmlhttp.status==200) ||  (xmlhttp.readyState==4))
	    {
			closeLoadingAnimation();
			var jsonStr=xmlhttp.responseText;
			//alert("Lo que devuelve el log in el servidor"+jsonStr);
			var json=JSON.stringify(jsonStr);
			var servidor=JSON.parse(json);
			var doble=JSON.parse(servidor);
			analizarRespuestaLogIn(doble);
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404 || xmlhttp.status==105){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlayConnectionError();
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("POST",getJPApiURL()+"login",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send(json);
}
function analizarRespuestaLogIn(servidor){
	if (typeof(servidor.errors) !== 'undefined' || typeof(servidor.error) !== 'undefined' ){
			avisoEmergenteJugaPlay("<span class='trn'>Datos Incorrectos</span>","<p class='trn'>El <b> correo electrónico o contraseña </b> no se han ingresado correctamente, por favor revise ambos</p>");
			return false;
	}else{// Salio todo bien
		if(window.registerInSite!=true){// No vengo del registro
			jpAnalyticsEvent("LOGIN", servidor.id.toString(), "MOBILE");
		}
		jpAnalyticsUserId(servidor.id);
		if(document.getElementById("checkKeepLogIn")!=null){
		if(document.getElementById("checkKeepLogIn").checked){
			var mail=document.getElementById("email-pop").value;
			var pass=document.getElementById("password-pop").value;
			setCookie("jugaPlayUserRemember", "true", 120);
			setCookie("jugaPlayUserFacebook", "false", 120);
			setCookie("juga-Play-User", mail, 120);
			setCookie("juga-Play-Pass", pass, 120);
		}}
		servidor.last_check=new Date();
		servidor.last_update=new Date();
		cookieSave=JSON.stringify(servidor);
		setCookie("juga-Play-Data", cookieSave, 120);
		window.location="game.html";
	}
}
// Fin de log-In Comun
// Comienzo Log-in/ Registro Fb
function processFacebook(type){
	if(document.getElementById("checkKeepLogIn")!=null){
		if(document.getElementById("checkKeepLogIn").checked){
			setCookie("jugaPlayUserRemember", "true", 120);
			setCookie("jugaPlayUserFacebook", "true", 120);
		}}
	//fbq('track', 'CompleteRegistration');// Esto nos va a traer inconsistencias por que no diferencia quien se registra de quien no
	if(window.invitationTknId>0 && type=="register"){
		var windowB=cordova.InAppBrowser.open(getJPApiURL()+'users/auth/facebook?invitation_token='+window.invitationTknId, '_blank', 'location=yes');
	}else{
    var windowB=cordova.InAppBrowser.open(getJPApiURL()+'users/auth/facebook', '_blank', 'location=yes');
	}
  windowB.addEventListener('loadstop', function(event) {
		if (event.url.indexOf("facebookok") !== -1) {
			windowB.close();
			checkIfLogInWithFacebook(type);
		}
		if (event.url.indexOf("facebookfacebookcancel") !== -1) {
			windowB.close();
		}
	});
	windowB.addEventListener('loaderror', function() {
			windowB.close();
			checkIfLogInWithFacebook(type);
	});
	windowB.addEventListener('exit', function() {checkIfLogInWithFacebook(type); });
}
function checkIfWindowFacebookClose(windowB,type){
	if (windowB.closed) {
		checkIfLogInWithFacebook(type);
    }else{
		setTimeout(function (){checkIfWindowFacebookClose(windowB,type);}, 500);
	}
}
function checkIfLogInWithFacebook(type){
	startLoadingAnimation();
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
			var jsonStr=xmlhttp.responseText;
      stopTimeToWait();
			//alert("Lo que lee el servidor"+jsonStr);
			var json=JSON.stringify(jsonStr);
			var servidor=JSON.parse(json);
			var doble=JSON.parse(servidor);
			if(type=="register"){
				analizarRespuestaLogInPostRegistroFacebook(doble,type);
			}else{
				analizarRespuestaDatosUsuarioLogIn(doble);
			}
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404 || xmlhttp.status==105){// Esto es si el servidor no le llega a poder responder o esta caido
			 return;
			}
	 	 }
		xmlhttp.open("GET",getJPApiURL()+"users/33",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send();
}
function analizarRespuestaLogInPostRegistroFacebook(servidor,type){
	if (typeof(servidor.errors) !== 'undefined' || typeof(servidor.error) !== 'undefined' ){
			closeLoadingAnimation();
			avisoEmergenteJugaPlay("<span class='trn'>Error inesperado</span>","<p class='trn'>Algo salio mal, vuelva a intentar</p>");
			return false;
	}else{// Salio todo bien
		servidor.last_check=new Date();
		servidor.last_update=new Date();
		var cookieSave=JSON.stringify(servidor);
		setCookie("juga-Play-Data", cookieSave, 120);
		if(type=="register" && checkIfRegisteredToday(servidor.member_since)){
			if(window.invitationTknId.length>2){
				jpAnalyticsEvent("COMPLETED_REGISTRATION", "FACEBOOK", "FRIEND");
			}else{
				jpAnalyticsEvent("COMPLETED_REGISTRATION", "FACEBOOK", "NORMAL");
			}
		}
		setTimeout(function (){window.location="game.html";}, 500);// Le doy tiempo a registrar el registro de la cookie
	}
}
function checkIfRegisteredToday(member_since){
	if(daysFromDate(member_since+" - 23:50")<1){
		return true;
	}else{
		return false;
	}
}
// Fin Log in registro Fb
// Comienzo password Recovery
function passwordRecovery(){
	BootstrapDialog.show({
			 cssClass: 'general-modal-msj',
			 title: "<H1 class='trn'>Recuperar Contraseña</H1>",
            message: "<div class='row'><p class='trn'>Ingresa tu correo electrónico y te enviaremos un enlace para recuperar tu contraseña</p></div><div class='row'><input placeholder='Correo electrónico' data-trn-holder='email' id='email-recuperarPassword' class='trn' style=' width: 80%;text-align:center; margin-left: 9%;' type='text' value=''></div>",
			buttons: [{
                label: "<span class='trn'>Recuperar</span>",
				id:'boton-panel-registro-aviso-error-pop-up',
                action: function(dialogItself){
					recoverProcess(dialogItself);
                }
            }],
            onshown: function(dialogItself) {
                        checkLanguageItem(dialogItself);
                      }
		 });
		 return false;
}
function recoverProcess(dialogItself){
	if(checkConnection()){
		recoverProcess2(dialogItself);
	}else{
		setTimeout(function(){recoverProcess(dialogItself)},100);
	}
}
function recoverProcess2(dialogItself){
	var emailIngresado=document.getElementById('email-recuperarPassword').value;
	if(emailIngresado.length<2){
		avisoEmergenteJugaPlay("<span class='trn'>Campo vacío</span>","<p class='trn'>El Campo <b>Correo electrónico</b> es obligatorio</p>");
    stopTimeToWait()
	}else{
		startLoadingAnimation();
		json=JSON.stringify({ "user": { "email": emailIngresado} });
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
	 	 if ((xmlhttp.readyState==4 && xmlhttp.status==200) ||  (xmlhttp.readyState==4 && xmlhttp.status==422) ||  (xmlhttp.readyState==4 && xmlhttp.status==401) ||  (xmlhttp.readyState==4 && xmlhttp.status==406))
	    {
			closeLoadingAnimation();
      stopTimeToWait()
			var jsonStr=xmlhttp.responseText;
			//alert("Lo que lee el servidor"+jsonStr);
			var json=JSON.stringify(jsonStr);
			var servidor=JSON.parse(json);
			var doble=JSON.parse(servidor);
			analizarRespuestaDatosPasswordRecovery(doble, dialogItself);
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404 || xmlhttp.status==105){// Esto es si el servidor no le llega a poder responder o esta caido
			 return;
			}
	 	 }
		xmlhttp.open("POST",getJPApiURL()+"users/password",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send(json);
	}
}
function analizarRespuestaDatosPasswordRecovery(mensaje, dialogItself){
	if (mensaje.success != true){
    avisoEmergenteJugaPlay("<span class='trn'>Correo electrónico no registrado</span>","<p class='trn'>El correo electrónico que se ingresó no se encuentra registrado en el sitio, revise si lo escribió correctamente.</p>");
	}else{// Ya estaba adentro del sitio
		avisoEmergenteJugaPlay("<span class='trn'>Correo electrónico enviado</span>","<p class='trn'>Se le envió un correo electrónico con un enlace para recuperar su contraseña. Si no encuentra el correo electrónico verifique su casilla de correo no deseado.</p>");
		dialogItself.close();
	}
}
//window.onload=setTimeout(function(){play();}, 3000);
function alwaysShowInputValues(){
	$('input').focus(function() {
	$(".modal-dialog").css( "-ms-transform", "translate(0, -170px)" );
	$(".modal-dialog").css( "-webkit-transform", "translate(0, -170px)" );
	$(".modal-dialog").css( "transform", "translate(0, -170px)" );
	});
	$('input').focusout(function() {
	$(".modal-dialog").css( "-ms-transform", "translate(0, 0)" );
	$(".modal-dialog").css( "-webkit-transform", "translate(0, 0)" );
	$(".modal-dialog").css( "transform", "translate(0, 0)" );
	});
}
// Fin de pssword recovery
