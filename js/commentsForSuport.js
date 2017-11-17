// JavaScript Document
function enviarMensajeDeContacto(){
	nombreContacto=document.getElementById("nombreContacto").value;
	mailContacto=document.getElementById("mailContacto").value;
	contenidoContactoIngresado=document.getElementById("contenidoContactoTxt").value;
	contenidoContacto=document.getElementById("contenidoContactoTxt").value + "-- mail de contacto: "+window.userDataJugaPlay.email+ "-- USU id: "+window.userDataJugaPlay.id+ "-- Mail ingresado: "+mailContacto;
	//alert(contenidoContacto +nombreContacto+ mailContacto);
	if(contenidoContacto.length<2000 && contenidoContactoIngresado.length>1){
		json=JSON.stringify( { "comment": { "sender_name": nombreContacto,"sender_mail": mailContacto,"content": contenidoContacto } } );
		mensajeAlServidorComentarioContacto(json);
	}else{
		if(contenidoContacto.length>2000){
			avisoEmergenteJugaPlay("<span class='trn'>Contenido Maximo exedido</span>","<p class='trn'>El contenido del mensaje no puede ser mayor a 2000 caracteres, sino escriba a info@jugaplay.com</p>");
		}else{
			avisoEmergenteJugaPlay("<span class='trn'>Sin Contenido</span>","<p class='trn'>El campo comentario es obligatorio</p>");
		}
	}
	//dialog.close;
}
function mensajeAlServidorComentarioContacto(json){
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
			avisoEmergenteJugaPlay("<span class='trn'>Muchas Gracias</span>","<p class='trn'>Muchas gracias por su comentario</p><p class='trn'>Su feedback es muy importante para nosotros</p>");
			document.getElementById("nombreContacto").value=null;
			document.getElementById("mailContacto").value=null;
			document.getElementById("contenidoContactoTxt").value=null;

	    }else if(xmlhttp.status==503 || xmlhttp.status==404 || xmlhttp.status==105){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlayConnectionError();
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("POST",getJPApiURL()+"comments",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send(json);
}
