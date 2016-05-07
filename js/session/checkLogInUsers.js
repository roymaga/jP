// JavaScript Document
// Funcion inicial
if(getCookie("jugaPlayUserRemember")=="true"){// Si el usuario esta logeado
		if(getCookie("jugaPlayUserFacebook")=="true"){
			checkLogInFacebook();
		}else{
			mail=getCookie("juga-Play-User");
			pass=getCookie("juga-Play-Pass");
			json=JSON.stringify({ "user": { "email": mail, "password":pass } });
			mensajeAlServidorConContenidoLogInSaved(json);
		}
	}else{
		analizarSiyaEstaLogueado();
	}
// Logue con los datos guardados 
function mensajeAlServidorConContenidoLogInSaved(json){
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
			jsonStr=xmlhttp.responseText;
stopTimeToWait();
			//alert("Lo que devuelve el log in el servidor"+jsonStr);
			var json=JSON.stringify(jsonStr);
			var servidor=JSON.parse(json);
			var doble=JSON.parse(servidor);
			analizarRespuestaLogInSaved(doble);
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlay("ERROR DE CONEXI&Oacute;N","<p>Hubo un error de conexi&oacute; intente nuevamente</p>");
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("POST","http://app.jugaplay.com/api/v1/login",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send(json);}		
}
function analizarRespuestaLogInSaved(servidor){
	if (typeof(servidor.error) !== 'undefined'){
			// Borrar las cookies guardadas
			 delete_cookie("juga-Play-User");
			 delete_cookie("juga-Play-Pass");
			 delete_cookie("juga-Play-Data");
			 delete_cookie("jugaPlayUserRemember");
			 delete_cookie("jugaPlayUserFacebook");
			
	}else{// Salio todo bien
		servidor.last_check=new Date();
		servidor.last_update=new Date();
		cookieSave=JSON.stringify(servidor);
		setCookie("juga-Play-Data", cookieSave, 120);
		window.location="game.html";
	}
}
// Fin de log-in con datos guardados
// Analizo log in con Facebook
// Fin de analizo log in con Facebook
// Analiza si le quedo una sesion abierta
function analizarSiyaEstaLogueado(){
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
	 	 if ((xmlhttp.readyState==4 && xmlhttp.status==200) ||  (xmlhttp.readyState==4 && xmlhttp.status==422) ||  (xmlhttp.readyState==4 && xmlhttp.status==401))
	    {
			jsonStr=xmlhttp.responseText;
stopTimeToWait();
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
		xmlhttp.open("GET","http://app.jugaplay.com/api/v1/users/33",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true"; 
		xmlhttp.send();}		
}
function analizarRespuestaDatosUsuarioLogIn(servidor){
	if (typeof(servidor.error) !== 'undefined'){
	}else{// Ya estaba adentro del sitio
		servidor.last_check=new Date();
		servidor.last_update=new Date();
		cookieSave=JSON.stringify(servidor);
		setCookie("juga-Play-Data", cookieSave, 120);
		window.location="game.html";
	}
} 
// Fin de analizo si tiene una session abierta
function checkLogInFacebook(){
	if(document.body!=null){
	var iframe = document.createElement('iframe');
	iframe.src = 'http://app.jugaplay.com/api/v1/users/auth/facebook?invited_by=1';
	iframe.style.display="none";
	iframe.onload = function() {
		analizarSiyaEstaLogueado();
		};
	document.body.appendChild(iframe);
	}else{
		setTimeout(function(){checkLogInFacebook();}, 100);
	}
}
