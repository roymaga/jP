// JavaScript Document
// Starts complete data of user
setTimeout(function(){startReadProfileJs();}, 500);
function startReadProfileJs(){
	if(window.IsLoggedInVar){
		completeDataOfProfile();
	}else{
		setTimeout(function(){startReadProfileJs()},100);
	}
}
function completeDataOfProfile(){
	if($("#profile-coins-show").length>0 && $("#user-real-name").length>0 && $("#profile-image-ppal").length>0 && $("#formUserFirstName").length>0 && $("#formUserLastName").length>0 && $("#formUserNick").length>0 && $("#formUserEmail").length>0){
		var datosDelUsuario=window.userDataJugaPlay;
		// Complete shown data
		document.getElementById("profile-coins-show").innerHTML=menuGetAmountOfCoins();
		document.getElementById("user-real-name").innerHTML='<h3 style="margin:0;">'+datosDelUsuario.nickname+'</h3><h4 style="margin-top:0; margin-bottom:15px;">'+datosDelUsuario.first_name+' '+datosDelUsuario.last_name+'</h4>';
		document.getElementById("profile-image-ppal").src=menuGetImage();
		//Complete
		document.getElementById("formUserFirstName").value=datosDelUsuario.first_name;
		document.getElementById("formUserLastName").value=datosDelUsuario.last_name;
		document.getElementById("formUserNick").value=datosDelUsuario.nickname;
		document.getElementById("formUserEmail").value=datosDelUsuario.email;
 }else{
	 setTimeout(function(){completeDataOfProfile()},100);
 }

}
// Ends complete data of user
// Starts edit user data functions
function cambiarDatosDeUsuarioEnElSitio(){
	var mail=document.getElementById("formUserEmail").value;
	var firstName=document.getElementById("formUserFirstName").value;
	var lastName=document.getElementById("formUserLastName").value;
	var nickname=document.getElementById("formUserNick").value;
	if(mail.length < 1 || firstName.length < 1 || lastName.length < 1 || nickname.length < 1 ){
			var camposVacios="";
			if(mail.length < 1){
				camposVacios+="<p class='trn'>El Campo <b>Correo electrónico</b> es obligatorio</p>";
			}
			if (firstName.length < 1){
				camposVacios+="<p class='trn'>El Campo <b>Nombre</b> es obligatorio</p>";
			}
			if (lastName.length < 1){
				camposVacios+="<p class='trn'>El Campo <b>Apellido</b> es obligatorio</p>";
			}
			if (nickname.length < 1){
				camposVacios+="<p class='trn'>El Campo <b>Apodo</b> es obligatorio</p>";
			}
			// Termina el tipo de mensaje
			avisoEmergenteJugaPlay("<span class='trn'>Campos vacíos</span>",camposVacios);
	return false ;
	}// Si paso es que los campos estan bien
	var json=JSON.stringify({ "user": { "first_name": firstName,"last_name": lastName, "email": mail, "nickname":nickname } });
	if(startLoadingAnimation()==true){
	mensajeAlServidorConContenidoRegistro(json);}
}
function mensajeAlServidorConContenidoRegistro(json){
	if(window.IsLoggedInVar && checkConnection()){
		mensajeAlServidorConContenidoRegistro2(json);
	}else{
		setTimeout(function(){mensajeAlServidorConContenidoRegistro(json)},100);
	}
}
function mensajeAlServidorConContenidoRegistro2(json){
	var userId=window.userIdPlay;
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
			if(IsJsonString(jsonStr) && checkConnectionLoggedIn(xmlhttp)){
				analizarRespuestaCambiarDatosUsuarios(JSON.parse(jsonStr));
				return true;
			}else{
				mensajeAlServidorConContenidoRegistro(json);
			}
	    }else if(xmlhttp.status==503 || xmlhttp.status==404 || xmlhttp.status==105){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlayConnectionError();
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("PATCH",getJPApiURL()+"users/"+userId,true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send(json);
}
function analizarRespuestaCambiarDatosUsuarios(servidor){
	//alert(JSON.stringify(servidor));
	closeLoadingAnimation();
	if (typeof(servidor.errors) !== 'undefined' || typeof(servidor.error) !== 'undefined' ){
			if (typeof(servidor.errors.email) !== 'undefined'){
						avisoEmergenteJugaPlay("<span class='trn'>Correo electrónico en uso</span>","<p><span class='trn'>El correo electrónico</span> <b>"+document.getElementById("formUserEmail-pop").value+"</b> <span class='trn'>ya esta registrado en JugaPlay</span></p>");
						return false;
						}else if(typeof(servidor.errors.nickname) !== 'undefined'){
						avisoEmergenteJugaPlay("<span class='trn'>Apodo en uso</span>","<p><span class='trn'>El Apodo</span> <b>"+document.getElementById("formUserNick").value+"</b> <span class='trn'>ya esta registrado en JugaPlay</span></p>");
						}else{
						avisoEmergenteJugaPlay("<span class='trn'>Error inesperado</span>","<p class='trn'>Algo salio mal, vuelva a intentar</p>");
						return false;
						}
	}else{// Salio todo bien
		avisoEmergenteJugaPlay("<span class='trn'>Cambios Realizados</span>","<p class='trn'>Los cambios se realizaron con exito</p>");
		editDataFromUser(servidor.first_name, servidor.last_name, servidor.email, servidor.nickname);
		document.getElementById("user-real-name").innerHTML='<h3 style="margin:0;">'+servidor.nickname+'</h3><h4 style="margin-top:0; margin-bottom:15px;">'+servidor.first_name+' '+servidor.last_name+'</h4>';
	}
}
// Reset password
function passwordResetRequest(){
	var html='<div class="container container-full"><div class="form-style1 text-color1"><fieldset class="form-group"><span class="trn">Nueva contraseña</span><input type="password" id="formUserPassWord" class="form-control" placeholder="Nueva contraseña"></fieldset><fieldset class="form-group"> <span class="trn">Repetir contraseña</span> <input class="form-control" type="password" id="formUserPassWordRepeat" placeholder="Repetir contraseña"></fieldset></div></div>';
	 BootstrapDialog.show({
			 cssClass: 'general-modal-msj',
			 title: "<H1 class='trn'>Cambiar contraseña</H1>",
            message: html,
			buttons: [{
                label: '<span class="trn">Aceptar</span>',
				id:'boton-panel-registro-aviso-error-pop-up',
                action: function(dialogItself){
					serverPasswordResetRequest(dialogItself);
                    //dialogItself.close();
                }
            }],
            onshown: function(dialogItself) {
                        checkLanguageItem(dialogItself);
                      }
		 });
		 return false;
}
function serverPasswordResetRequest(dialog){
		var password= document.getElementById("formUserPassWord").value;
		var repPassword= document.getElementById("formUserPassWordRepeat").value;
		if(password!=repPassword){
			avisoEmergenteJugaPlay("<span class='trn'>Contraseñas distintas</span>","<p class='trn'>La contraseña  y la repetición de la misma deben ser iguales.</p>");
			return true;
		}
		if(password.length<8){
			avisoEmergenteJugaPlay("<span class='trn'>Contraseña muy corta</span>","<p class='trn'>La <b>contraseña</b> debe tener al menos <b>8</b> caracteres</p>");
			return true;
		}
		startLoadingAnimation();
		var json=JSON.stringify({ "user": { "password": password} });
		startLoadingAnimation();
		changePasswordServer(json);
	}
	function changePasswordServer(json){
		if(window.IsLoggedInVar && checkConnection()){
			changePasswordServer2(json);
		}else{
			setTimeout(function(){changePasswordServer(json)},100);
		}
	}
	function changePasswordServer2(json){
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
			dialog.close();
			changeAndKeepLogIn(getUserJugaplayEmail(),password);// Para hacer el log in ya que lo echa
			avisoEmergenteJugaPlay("Cambio de contraseña","<p>El cambio de contraseña se concretó correctamente.</p>");
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404 || xmlhttp.status==105){// Esto es si el servidor no le llega a poder responder o esta caido
			 return;
			}
	 	 }
		xmlhttp.open("PATCH",getJPApiURL()+"users/"+getUserJugaplayId(),true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send(json);
}
function analizarRespuestaDatosPasswordRecovery(mensaje){
	if (mensaje.success != true){
		location.reload();
	}else{// Ya estaba adentro del sitio
		avisoEmergenteJugaPlay("<span class='trn'>Correo electrónico enviado</span>","<p class='trn'>Se le envió un correo electrónico con un enlace para recuperar su contraseña. Si no encuentra el correo electrónico verifique su casilla de correo no deseado.</p>");
		//dialogItself.close();
	}
}
function editCommunicationChannels(){
	alert("Editar canales de comunicacion");
}
// Ends edit user data functions
