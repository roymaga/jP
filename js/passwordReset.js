// JavaScript Document
setTimeout(function(){passwordResetMainFunction();}, 1500);
function passwordResetMainFunction(){
hacerLogOutDeLaCuentaPreventivoPassReset();
var webDir=window.location.href;
  if(webDir.indexOf('reset_password_token=') == -1){
	  	  avisoEmergenteJugaPlay("Link incorrecto","<p>No encontramos el Token enviado. Por favor copie el link enviado por mail tal cual en su navegador.</p>");
  }else{// No estoy en un celular
  			passToken=webDir.substring(webDir.indexOf('reset_password_token=')+21);
			abrirRecovery(passToken);
  		}
}
function abrirRecovery(passToken){
  		if (checkCookie()!=true) {
    		avisoEmergenteJugaPlay("Habilitar las cookies","<p>Para poder disfrutar la experiencia Jugaplay es necesario que tenga las cookies de su navegador habilitadas</p>");
	  }else{
	BootstrapDialog.show({
			 cssClass: 'log-in-pop-up register',
			 title: "<h3>Nueva Contraseña</h3>",
            message: "<div class='row'><div class='row'><input placeholder='Nueva contraseña' id='new-password' class='botton-general-size' type='text' value=''></div><div class='row'><input placeholder='Confirmar contraseña' id='new-password-confirmation' class='botton-general-size' type='text' value=''></div>",
			buttons: [{
                label: 'Cambiar',
				id:'boton-panel-registro',
                action: function(dialogItself) {
                    passwordRecoveryTransaction(dialogItself, passToken);
                }
            }]
		 });}
		 setTimeout(function(){alwaysShowInputValues();}, 1500);
}

function passwordRecoveryTransaction(dialogItself, passToken){
	passIngresado=document.getElementById('new-password').value;
	passConfirmIngresado=document.getElementById('new-password-confirmation').value;
	if(passIngresado.length<8){
		avisoEmergenteJugaPlay("Contraseña muy corta","<p>La contraseña debe tener más de 8 caracteres.</p>");
	}else if(passIngresado!=passConfirmIngresado){
		avisoEmergenteJugaPlay("Contraseñas no coinciden","<p>La contraseña y la confirmación de la contraseña no coinciden. Por favor revise las mismas.</p>");
		}
	else{
		startLoadingAnimation();
		json=JSON.stringify({ "user": { "password": passIngresado , "password_confirmation": passConfirmIngresado, "reset_password_token": passToken } });
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
			analizarRespuestaDatosPasswordRecoveryReset(doble, dialogItself);
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404 || xmlhttp.status==105){// Esto es si el servidor no le llega a poder responder o esta caido
			 return;
			}
	 	 }
		xmlhttp.open("PUT",getJPApiURL()+"users/password",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send(json);
	}
}
function analizarRespuestaDatosPasswordRecoveryReset(servidor, dialogItself){
	if (typeof(servidor.errors) !== 'undefined' || typeof(servidor.error) !== 'undefined'  ){
		avisoEmergenteJugaPlay("Token incorrecto","<p>El Token ingresado no es válido, es posible que este mal ingresado, que ya haya recuperado la contraseña utilizando el mismo o que no sea el último que se le ah enviado. Verifique de copiar el link tal cual le aparece en su mail. De continuar el error solicite recuperar la contraseña nuevamente. </p>");

	}else{// Ya estaba adentro del sitio
		avisoEmergenteJugaPlay("Contraseña Actualizada","<p>Su contraseña fue actualizada.</p>");
	}
}

function hacerLogOutDeLaCuentaPreventivoPassReset(){
	delete_cookie( "jugaPlayUserRemember" );
	delete_cookie( "juga-Play-User" );
	delete_cookie( "juga-Play-Pass" );
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
			return true;
	    }
	 	 }
		xmlhttp.open("DELETE",getJPApiURL()+"logout",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send();
}
