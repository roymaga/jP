// JavaScript Document
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
		window.location.href = "pages/login.html"
	}else{// Ya estaba adentro del sitio
		window.location="pages/inicial.html";
	}
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
			jsonStr=xmlhttp.responseText;
			//alert("Lo que devuelve el log in el servidor"+jsonStr);
			var json=JSON.stringify(jsonStr);
			var servidor=JSON.parse(json);
			var doble=JSON.parse(servidor);
			analizarRespuestaDatosUsuarioLogIn(doble);
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