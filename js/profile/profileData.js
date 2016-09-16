// JavaScript Document
// Starts complete data of user
window.onload=loadDataToProfile();
function loadDataToProfile(){
	if(window.userDataJugaPlay!=null){
		completeDataOfProfile();
	}else{
		setTimeout(function(){loadDataToProfile();}, 100);
	}
}
function completeDataOfProfile(){
	datosDelUsuario=window.userDataJugaPlay;
	// Complete shown data
	document.getElementById("profile-coins-show").innerHTML=menuGetAmountOfCoins();
	document.getElementById("user-real-name").innerHTML='<h3 style="margin:0;">'+datosDelUsuario.nickname+'</h3><h4 style="margin-top:0; margin-bottom:15px;">'+datosDelUsuario.first_name+' '+datosDelUsuario.last_name+'</h4>';
	document.getElementById("profile-image-ppal").src=menuGetImage();
	//Complete
	document.getElementById("formUserFirstName").value=datosDelUsuario.first_name;
	document.getElementById("formUserLastName").value=datosDelUsuario.last_name;
	document.getElementById("formUserNick").value=datosDelUsuario.nickname;
	document.getElementById("formUserEmail").value=datosDelUsuario.email;
	setTimeout(function(){loadDataToProfile();}, 180000);
	
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
				camposVacios+="<p>El Campo <b>Email</b> es obligatorio para guardar los cambios</p>";
			}
			if (firstName.length < 1){
				camposVacios+="<p>El Campo <b>Nombre</b> es obligatorio para guardar los cambios</p>";
			}
			if (lastName.length < 1){
				camposVacios+="<p>El Campo <b>Apellido</b> es obligatorio para guardar los cambios</p>";
			}
			if (nickname.length < 1){
				camposVacios+="<p>El Campo <b>Nick</b> es obligatorio para guardar los cambios</p>";
			}
			// Termina el tipo de mensaje
			avisoEmergenteJugaPlay("Campo vacio",camposVacios);
	return false ;
	}// Si paso es que los campos estan bien
	json=JSON.stringify({ "user": { "first_name": firstName,"last_name": lastName, "email": mail, "nickname":nickname } });
	if(startLoadingAnimation()==true){
	mensajeAlServidorConContenidoRegistro(json);}
}
function mensajeAlServidorConContenidoRegistro(json){
	var userId=window.userIdPlay;
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
			jsonStr=xmlhttp.responseText;
			//alert(jsonStr);
			var json=JSON.stringify(jsonStr);
			var servidor=JSON.parse(json);
			var doble=JSON.parse(servidor);
			analizarRespuestaCambiarDatosUsuarios(doble);
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlay("ERROR DE CONEXIÓN","<p>Hubo un error de conexió intente nuevamente</p>");
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("PATCH","http://app.jugaplay.com/api/v1/users/"+userId,true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send(json);	
	}
}
function analizarRespuestaCambiarDatosUsuarios(servidor){
	//alert(JSON.stringify(servidor));
	closeLoadingAnimation();
	if (typeof(servidor.errors) !== 'undefined'){
			if (typeof(doble.errors.email) !== 'undefined'){
						avisoEmergenteJugaPlay("Mail en uso","<p>El mail <b>"+document.getElementById("formUserEmail").value+"</b> ya esta registrado en JugaPlay</p>");
						return false;
						}else if(typeof(doble.errors.nickname) !== 'undefined'){
						avisoEmergenteJugaPlay("Nick en uso","<p>El Nick <b>"+nickname+"</b> ya esta registrado en JugaPlay, elija otro</p>");
						}else{
						avisoEmergenteJugaPlay("Error inesperado","<p>Algo salio mal, vuelva a intentar</p>");
						return false;
						}
	}else{// Salio todo bien
		avisoEmergenteJugaPlay("Cambios Realizados","<p>Los cambios se realizaron con exito!!</p>");
		document.getElementById("user-real-name").innerHTML='<h3 style="margin:0;">'+servidor.nickname+'</h3><h4 style="margin-top:0; margin-bottom:15px;">'+servidor.first_name+' '+servidor.last_name+'</h4>';
		editDataFromUser(servidor.first_name, servidor.last_name, servidor.email, servidor.nickname);
	}
}
// Reset password
function passwordResetRequest(){
	var html='<div class="container container-full"><div class="form-style1 text-color1"><fieldset class="form-group"> Nueva contraseña<input type="text" id="formUserPassWord" class="form-control" placeholder="Nueva contraseña"></fieldset><fieldset class="form-group"> Repetir nueva contraseña <input class="form-control" type="text" id="formUserPassWordRepeat" placeholder="Repetir contraseña"></fieldset></div></div>';
	 BootstrapDialog.show({
			 cssClass: 'general-modal-msj',
			 title: "<H1>Cambiar contraseña</H1>",
            message: html,
			buttons: [{
                label: 'Aceptar',
				id:'boton-panel-registro-aviso-error-pop-up',
                action: function(dialogItself){
					serverPasswordResetRequest(dialogItself);
                    //dialogItself.close();
                }
            }]		 
		 });
		 return false;
}
function serverPasswordResetRequest(dialog){
		var password= document.getElementById("formUserPassWord").value;
		var repPassword= document.getElementById("formUserPassWordRepeat").value;
		if(password!=repPassword){
			avisoEmergenteJugaPlay("Contraseñas distintas","<p>La contraseña  y la repetición de la misma deben ser iguales.</p>");
			return true;
		}
		if(password.length<8){
			avisoEmergenteJugaPlay("Contraseñas muy corta","<p>La contraseña  debe tener al menos 8 caracteres.</p>");
			return true;
		}
		startLoadingAnimation();
		json=JSON.stringify({ "user": { "password": password} });
		//alert(json);
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
	 	 if ((xmlhttp.readyState==4 && xmlhttp.status==200) ||  (xmlhttp.readyState==4 && xmlhttp.status==422) ||  (xmlhttp.readyState==4 && xmlhttp.status==401) ||  (xmlhttp.readyState==4 && xmlhttp.status==406))
	    {
			stopTimeToWait();
			closeLoadingAnimation();
			dialog.close();
			avisoEmergenteJugaPlay("Cambio de contraseña","<p>El cambio de contraseña se concretó correctamente.</p>");
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404){// Esto es si el servidor no le llega a poder responder o esta caido
			 return;
			}
	 	 }
		xmlhttp.open("PATCH","http://app.jugaplay.com/api/v1/users/"+getUserJugaplayId(),true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true"; 
		xmlhttp.send(json);	
		}
}
function analizarRespuestaDatosPasswordRecovery(mensaje){
	if (mensaje.success != true){
		location.reload();
	}else{// Ya estaba adentro del sitio
		avisoEmergenteJugaPlay("Mail enviado","<p>Se le envió un mail con un link e instrucciones para cambiar su contraseña a <b>"+window.userDataJugaPlay.email+"</b>. Si no encuentra el mail verifique su casilla de spam.</p>");
		//dialogItself.close();
	}
}
function editCommunicationChannels(){
	alert("Editar canales de comunicacion");
}
// Ends edit user data functions