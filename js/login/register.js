// JavaScript Document
// Este javascript esta encargado de manejar el registro del sitio
window.invitationTknId=0;
function abrirRegistro(){
  		if (checkCookie()!=true) { 
    		avisoEmergenteJugaPlay("Habilitar las cookies","<p>Para poder disfrutar la experiencia Jugaplay es necesario que tenga las cookies de su navegador habilitadas</p>");
	  }else{
	BootstrapDialog.show({
			 cssClass: 'log-in-pop-up register',
			 title: "Registrate Gratis",
            message: "<div class='row'><div onclick='processFacebook(\"register\");' class='botton-general-size facebook'>Registro con Facebook</div></div><div class='row'>-O-</div><div class='row'><input placeholder='Nickname' id='nickname-pop' class='botton-general-size' type='text' value=''></div><div class='row'><input placeholder='E-Mail' id='email-pop' class='botton-general-size' type='text' value=''></div><div class='row'><input placeholder='Password' id='password-pop' class='botton-general-size' type='password' value=''></div><div class='row'><input type='checkbox' id='checkKeepLogIn' checked>  Recordar</div>",
			buttons: [{
                label: 'Registrarse',
				id:'boton-panel-registro',
                action: function(dialog) {
                    registrarUsuarioEnElSitio();
                }
            }]
		 
		 });
		 setTimeout(function(){alwaysShowInputValues();}, 1500);
		 }
}
function registrarUsuarioEnElSitio(){
	var mail=document.getElementById("email-pop").value;
	var pass=document.getElementById("password-pop").value;
	var nickname=document.getElementById("nickname-pop").value;
	if(mail.length < 1 || pass.length < 1 || nickname.length < 1 ){
		if(mail.length < 1 && pass.length < 1 ){
			avisoEmergenteJugaPlay("Campos vacios","<p>Los Campos <b>Email, Contraseña y Nickname</b> son obligatorios</p>");
			}
		else{
			if(mail.length < 1){
				avisoEmergenteJugaPlay("Campo vacio","<p>El Campo <b>email</b> es obligatorio</p>");
			}else if (pass.length < 1){
				avisoEmergenteJugaPlay("Campo vacio","<p>El Campo <b>contraseña</b> es obligatorio</p>");
			}else{
				avisoEmergenteJugaPlay("Campo vacio","<p>El Campo <b>nickname</b> es obligatorio</p>");
			}
		}	// Termina el tipo de mensaje
	return false ;
	}else if( pass.length < 8){
		avisoEmergenteJugaPlay("Contraseña muy corta","<p>La <b>contraseña</b> debe tener al menos <p>8 caracteres</p>");
		return false ;
	};// Si paso es que los campos estan bien
	//https://www.jugaplay.com/?invitedby=RiverCampeon2&cnl=fy
	if(window.invitationTknId>0){
		var json=JSON.stringify({ "user": { "first_name": "NONE","last_name": "NONE", "email": mail, "password":pass,"nickname":nickname } ,"invitation_token":window.invitationTknId });
	}else{
		var json=JSON.stringify({ "user": { "first_name": "NONE","last_name": "NONE", "email": mail, "password":pass,"nickname":nickname } });
	}
	if(startLoadingAnimation()==true){
	mensajeAlServidorConContenidoRegistro(json, mail, pass);}
}
function mensajeAlServidorConContenidoRegistro(json, mail, pass){
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
			jsonStr=xmlhttp.responseText;
			stopTimeToWait();
			//alert(jsonStr);
			var json=JSON.stringify(jsonStr);
			var servidor=JSON.parse(json);
			var doble=JSON.parse(servidor);
			analizarRespuestaRegistro(doble, mail, pass);
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlay("ERROR DE CONEXIÓN","<p>Hubo un error de conexió intente nuevamente</p>");
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("POST","http://app.jugaplay.com/api/v1/users",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send(json);		
	}
}
function analizarRespuestaRegistro(servidor, mail, pass){
	if (typeof(servidor.errors) !== 'undefined' || typeof(servidor.error) !== 'undefined'  ){
		closeLoadingAnimation();
		if (typeof(servidor.errors.email) !== 'undefined'){
			avisoEmergenteJugaPlay("Mail en uso","<p>El mail <b>"+document.getElementById("email-pop").value+"</b> ya esta registrado en JugaPlay</p>");
			return false;
		}else{
			avisoEmergenteJugaPlay("Error inesperado","<p>Algo salio mal, vuelva a intentar</p>");
			return false;
		}
	}else{// Salio todo bien
		fbq('track', 'CompleteRegistration');
		window.registerInSite=true;
		logInUsuarioEnElSitioPostRegistro(mail, pass);
	}
}
function hacerLogOutPreventivo(){
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
	 	 if ((xmlhttp.readyState==4))
	    {
			stopTimeToWait();
			//alert(xmlhttp.responseText);
			//analizarRespuestaRegistroBeta(doble);
			return true;
	    }
	 	 }
		xmlhttp.open("DELETE","http://app.jugaplay.com/api/v1/logout",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send();	
	}
}
function probarSinRegistro(){
	var rand = Math.floor((Math.random() * 100000000000000) + 1);
	var rand2 = Math.floor((Math.random() * 100000000000000) + 1);
	var mail=rand+"@guest.com";
	var pass=traducirInvitacionAlSitio(rand2);
	var nickname="Invitado"+rand;
	setCookie("jugaPlayUserRemember", "true", 120);
	setCookie("jugaPlayUserFacebook", "false", 120);
	setCookie("juga-Play-User", mail, 120);
	setCookie("juga-Play-Pass", pass, 120);
	var mailInput = document.createElement("input");
	mailInput.type="hidden";
	mailInput.value=mail;
	mailInput.id="email-pop";
	document.body.appendChild(mailInput);
	var passInput = document.createElement("input");
	passInput.type="hidden";
	passInput.value=pass;
	passInput.id="password-pop";
	document.body.appendChild(passInput);
	var json=JSON.stringify({ "user": { "first_name": "Invitado","last_name": "Invitado", "email": mail, "password":pass,"nickname":nickname } });
	if(startLoadingAnimation()==true){
	mensajeAlServidorConContenidoRegistro(json, mail, pass);}
	
}
function askForInvitationIdFromRequest(requestTkn){
	var json=JSON.stringify({"token": requestTkn });
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
				window.invitationId=(JSON.parse(jsonStr)).id;
			}else{
				askForInvitationIdFromRequest(requestId);
			}
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlay("ERROR DE CONEXIÓN","<p>Hubo un error de conexió intente nuevamente</p>");
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("POST","http://app.jugaplay.com/api/v1/requests/"+requestId+"/invitations",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send(json);	
	}
}
function logInUsuarioEnElSitioPostRegistro(mail, pass){
	var json=JSON.stringify({ "user": { "email": mail, "password":pass } });
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
	 	 if ((xmlhttp.readyState==4 && xmlhttp.status==200) ||  (xmlhttp.readyState==4))
	    {
			// closeLoadingAnimation();
			stopTimeToWait();
			jsonStr=xmlhttp.responseText;
			//alert("Lo que devuelve el log in el servidor"+jsonStr);
			var json=JSON.stringify(jsonStr);
			var servidor=JSON.parse(json);
			var doble=JSON.parse(servidor);
			analizarRespuestaLogInPostRegistro(doble);
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlay("ERROR DE CONEXI&Oacute;N","<p>Hubo un error de conexi&oacute; intente nuevamente</p>");
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("POST","http://app.jugaplay.com/api/v1/login",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send(json);	
	}
}
function analizarRespuestaLogInPostRegistro(servidor){
	if (typeof(servidor.errors) !== 'undefined' || typeof(servidor.error) !== 'undefined'  ){
			closeLoadingAnimation();
			avisoEmergenteJugaPlay("Error en el registro","<p>Por favor vuelva a intentar</p>");
			return false;
	}else{// Salio todo bien
		servidor.last_check=new Date();
		servidor.last_update=new Date();
		var cookieSave=JSON.stringify(servidor);
		setCookie("juga-Play-Data", cookieSave, 120);
		window.location="game.html";
	}
}
function getQueryVariableTranslated(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  } 
  return -1;
}