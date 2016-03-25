// JavaScript Document
// Este javascript esta encargado de manejar el log in del sitio
// Llama a http://api.jugaplay.com/api/v1/tables/ que le devuelve las mesas disponibles para jugar

function abrirLogIn(){
  		if (checkCookie()!=true) { 
    		avisoEmergenteJugaPlay("Habilitar las cookies","<p>Para poder disfrutar la experiencia Jugaplay es necesario que tenga las cookies de su navegador habilitadas</p>");
	  }else{
	BootstrapDialog.show({
			 cssClass: 'log-in-pop-up',
			 title: "Log in",
            message: "<div class='row'><div onclick='processFacebook();' class='botton-general-size facebook'>Log-In con Facebook</div></div><div class='row'>-O-</div><div class='row'><input placeholder='E-Mail' id='email-pop' class='botton-general-size' type='text' value=''></div><div class='row'><input placeholder='Password' id='password-pop' class='botton-general-size' type='password' value=''></div><div class='row'><a style=' margin-right: 20px; cursor: pointer;' onclick='passwordRecovery();'>¿Olvido su contraseña?</a><input type='checkbox' id='checkKeepLogIn' checked>  Recordar</div>",
			buttons: [{
                label: 'Log In',
				id:'boton-panel-login',
                action: function(dialog) {
                    logInUsuarioEnElSitio();
                }
            }]
		 
		 });}
}
function logInUsuarioEnElSitio(){
	var mail=document.getElementById("email-pop").value;
	var pass=document.getElementById("password-pop").value;
	if(mail.length < 1 || pass.length < 1 ){
		if(mail.length < 1 && pass.length < 1 ){
			avisoEmergenteJugaPlay("Campos vacios","<p>Los Campos <b>Email y Contraseña</b> tienen que estar completos</p>");
			}
		else{
			if(mail.length < 1){
				avisoEmergenteJugaPlay("Campo vacio","<p>El Campo <b>email</b> tiene que estar completo</p>");
			}else{
				avisoEmergenteJugaPlay("Campo vacio","<p>El Campo <b>contraseña</b> tiene que estar completo</p>");
			}
		}	// Termina el tipo de mensaje
	return false ;
	}else if( pass.length < 8){
		avisoEmergenteJugaPlay("Contraseña muy corta","<p>La <b>contraseña</b> tiene que tener al menos <p>8</b> caracteres</p>");
		return false ;
	};// Si paso es que los campos estan bien
	json=JSON.stringify({ "user": { "email": mail, "password":pass } });
	if(startLoadingAnimation()==true){
	mensajeAlServidorConContenidoLogIn(json);}
}
function mensajeAlServidorConContenidoLogIn(json){
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
			jsonStr=xmlhttp.responseText;
			//alert("Lo que devuelve el log in el servidor"+jsonStr);
			var json=JSON.stringify(jsonStr);
			var servidor=JSON.parse(json);
			var doble=JSON.parse(servidor);
			analizarRespuestaLogIn(doble);
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlay("ERROR DE CONEXI&Oacute;N","<p>Hubo un error de conexi&oacute; intente nuevamente</p>");
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("POST","http://api.jugaplay.com/api/v1/login",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send(json);		
}
function analizarRespuestaLogIn(servidor){
	if (typeof(servidor.error) !== 'undefined'){
			avisoEmergenteJugaPlay("Datos Incorrectos","<p>El <b> mail o contraseña </b> no se han ingresado correctamente, por favor revise ambos</p>");
			return false;
	}else{// Salio todo bien
		if(document.getElementById("checkKeepLogIn")!=null){
		if(document.getElementById("checkKeepLogIn").checked){
			var mail=document.getElementById("email-pop").value;
			var pass=document.getElementById("password-pop").value;
			setCookie("jugaPlayUserRemember", "true", 120);
			setCookie("juga-Play-User", mail, 120);
			setCookie("juga-Play-Pass", pass, 120);
		}}
		window.location="inicial.html";
	}
}
window.onload=function(){
	if(getCookie("jugaPlayUserRemember")=="true"){
	mail=getCookie("juga-Play-User");
	pass=getCookie("juga-Play-Pass");
	json=JSON.stringify({ "user": { "email": mail, "password":pass } });
	mensajeAlServidorConContenidoLogIn(json)
	}else{
		analizarSiyaEstaLogueado();
	}
}
function analizarSiyaEstaLogueado(){
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
			analizarRespuestaDatosUsuarioLogIn(doble);
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404){// Esto es si el servidor no le llega a poder responder o esta caido
			 return;
			}
	 	 }
		xmlhttp.open("GET","http://api.jugaplay.com/api/v1/users/33",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true"; 
		xmlhttp.send();		
}
function analizarRespuestaDatosUsuarioLogIn(servidor){
	if (typeof(servidor.error) !== 'undefined'){
	}else{// Ya estaba adentro del sitio
		window.location="inicial.html";
	}
} 
function processFacebook(){
	window.location='http://api.jugaplay.com/api/v1/users/auth/facebook';
}
function passwordRecovery(){
	BootstrapDialog.show({
			 cssClass: 'emergentes-mesa avisos',
			 title: 'Recuperar Contraseña',
            message: "<div class='row'><p>Ingresa tu mail y te enviaremos un link para recuperar tu contraseña</p></div><div class='row'><input placeholder='E-Mail' id='email-recuperarPassword'  style=' width: 80%;text-align:center; margin-left: 9%;' type='text' value=''></div>",
			buttons: [{
                label: 'Recuperar',
				id:'boton-panel-registro-aviso-error-pop-up',
                action: function(dialogItself){
					recoverProcess(dialogItself);   
                }
            }]		 
		 });
		 return false;
}
function recoverProcess(dialogItself){
	emailIngresado=document.getElementById('email-recuperarPassword').value;
	if(emailIngresado.length<2){
		avisoEmergenteJugaPlay("Campo Vacio","<p>Complete el campo mail</p>");
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
			jsonStr=xmlhttp.responseText;
			//alert("Lo que lee el servidor"+jsonStr);
			var json=JSON.stringify(jsonStr);
			var servidor=JSON.parse(json);
			var doble=JSON.parse(servidor);
			analizarRespuestaDatosPasswordRecovery(doble, dialogItself);
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404){// Esto es si el servidor no le llega a poder responder o esta caido
			 return;
			}
	 	 }
		xmlhttp.open("POST","http://api.jugaplay.com/api/v1/users/password",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true"; 
		xmlhttp.send(json);	
	}
}
function analizarRespuestaDatosPasswordRecovery(mensaje, dialogItself){
	if (mensaje.success != true){
		avisoEmergenteJugaPlay("Mail no registrado","<p>El mail que se ingresó no se encuentra registrado en el sitio, revise si lo escribió correctamente. </p>");
	}else{// Ya estaba adentro del sitio
		avisoEmergenteJugaPlay("Mail enviado","<p>Se le envió un mail con un link para recuperar su contraseña. Si no encuentra el mail verifique su casilla de spam.</p>");
		dialogItself.close();
	}
}