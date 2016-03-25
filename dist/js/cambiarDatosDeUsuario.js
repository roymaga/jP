// JavaScript Document
function cambiarDatosDeUsuarioEnElSitio(){
	var mail=document.getElementById("emailInputChange").value;
	var firstName=document.getElementById("firstNameInputChange").value;
	var lastName=document.getElementById("lastNameInputChange").value;
	var nickname=document.getElementById("nicNameInputChange").value;
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
	json=JSON.stringify({ "user": { "first_name": firstName,"last_name": nickname, "email": mail, "nickname":nickname } });
	if(startLoadingAnimation()==true){
	mensajeAlServidorConContenidoRegistro(json);}
}
function mensajeAlServidorConContenidoRegistro(json){
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
	 	 if ((xmlhttp.readyState==4 && xmlhttp.status==200) ||  (xmlhttp.readyState==4 && xmlhttp.status==422))
	    {
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
		xmlhttp.open("PATCH","http://api.jugaplay.com/api/v1/users/"+userId,true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send(json);		
}
function analizarRespuestaCambiarDatosUsuarios(servidor){
	//alert(JSON.stringify(servidor));
	closeLoadingAnimation();
	if (typeof(servidor.errors) !== 'undefined'){
			if (typeof(servidor.errors.email) !== 'undefined'){
			avisoEmergenteJugaPlay("Mail en uso","<p>El mail <b>"+document.getElementById("emailInputChange").value+"</b> ya esta registrado en JugaPlay</p>");
			return false;
		}else{
			avisoEmergenteJugaPlay("Error inesperado","<p>Algo salio mal, vuelva a intentar</p>");
			return false;
		}
	}else{// Salio todo bien
		avisoEmergenteJugaPlay("Cambios Relizados","<p>Los cambios se realizaron con exito!!</p>");
		document.getElementById("nameBigShow").innerHTML=servidor.first_name;
		document.getElementById("nicBigShow").innerHTML=servidor.nickname;
	}
}