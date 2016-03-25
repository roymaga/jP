// JavaScript Document
// Este javascript esta encargado de manejar el registro del sitio
function abrirRegistro(){
  		if (checkCookie()!=true) { 
    		avisoEmergenteJugaPlay("Habilitar las cookies","<p>Para poder disfrutar la experiencia Jugaplay es necesario que tenga las cookies de su navegador habilitadas</p>");
	  }else{
	BootstrapDialog.show({
			 cssClass: 'log-in-pop-up register',
			 title: "Registrate Gratis",
            message: "<div class='row'><div onclick='processFacebook();' class='botton-general-size facebook'>Registro con Facebook</div></div><div class='row'>-O-</div><div class='row'><input placeholder='Nickname' id='nickname-pop' class='botton-general-size' type='text' value=''></div><div class='row'><input placeholder='E-Mail' id='email-pop' class='botton-general-size' type='text' value=''></div><div class='row'><input placeholder='Password' id='password-pop' class='botton-general-size' type='password' value=''></div><div class='row'><input type='checkbox' id='checkKeepLogIn' checked>  Recordar</div>",
			buttons: [{
                label: 'Registrarse',
				id:'boton-panel-registro',
                action: function(dialog) {
                    registrarUsuarioEnElSitio();
                }
            }]
		 
		 });}
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
	  var webDir=window.location.href;
	  if(webDir.indexOf('&cnl=') == -1){// Nadie lo recomendo
	  	json=JSON.stringify({ "user": { "first_name": "NONE","last_name": "NONE", "email": mail, "password":pass,"nickname":nickname } });
	  }else{//Alguien lo recomendo
    	var startQuien = webDir.indexOf('&cnl=')+5;
    	var invitacionCifrada = webDir.substring(startQuien, 200);	
	  	invitacion=traducirInvitacionAlSitio(invitacionCifrada);
	  	json=JSON.stringify({ "user": { "first_name": "NONE","last_name": "NONE", "email": mail, "password":pass,"nickname":nickname,"invited_by_id":invitacion } });
  		}
	if(startLoadingAnimation()==true){
	mensajeAlServidorConContenidoRegistro(json);}
}
function mensajeAlServidorConContenidoRegistro(json){
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
	 	 if ((xmlhttp.readyState==4 && xmlhttp.status==200) ||  (xmlhttp.readyState==4 && xmlhttp.status==422))
	    {
			jsonStr=xmlhttp.responseText;
			//alert(jsonStr);
			var json=JSON.stringify(jsonStr);
			var servidor=JSON.parse(json);
			var doble=JSON.parse(servidor);
			analizarRespuestaRegistro(doble);
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlay("ERROR DE CONEXIÓN","<p>Hubo un error de conexió intente nuevamente</p>");
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("POST","http://api.jugaplay.com/api/v1/users",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send(json);		
}
function analizarRespuestaRegistro(servidor){
	if (typeof(servidor.errors) !== 'undefined'){
		closeLoadingAnimation();
		if (typeof(servidor.errors.email) !== 'undefined'){
			avisoEmergenteJugaPlay("Mail en uso","<p>El mail <b>"+document.getElementById("email-pop").value+"</b> ya esta registrado en JugaPlay</p>");
			return false;
		}else{
			avisoEmergenteJugaPlay("Error inesperado","<p>Algo salio mal, vuelva a intentar</p>");
			return false;
		}
	}else{// Salio todo bien
		logInUsuarioEnElSitio();
	}
}
function hacerLogOutPreventivo(){
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
	 	 if ((xmlhttp.readyState==4))
	    {
			//alert(xmlhttp.responseText);
			//analizarRespuestaRegistroBeta(doble);
			return true;
	    }
	 	 }
		xmlhttp.open("DELETE","http://api.jugaplay.com/api/v1/logout",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send();		
}
function diferent(){
}
function traducirInvitacionAlSitio(invitacion){
	return parseInt(invitacion, 36)-500;
}