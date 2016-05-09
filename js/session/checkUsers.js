// JavaScript Document
// Etapa 1 -- Reviso si tiene o no Cookie
document.addEventListener("deviceready", checkUsersNow, false);
function checkUsersNow(){
	jugaPlayData=getCookie("juga-Play-Data");
	if(jugaPlayData.length>4){
		userDataJugaPlayInitial(JSON.parse(jugaPlayData));
		checkIfUpdateIsNeeded();
	}else{
		window.location="login.html";// No esta logeado a estar version
	}
}
// Si tiene una cookie reviso si tiene qye ser actualizada
function checkIfUpdateIsNeeded(){
	// Si el ultimo update fue hace menos de 2 minutos no pido un update de los datos
	if((secondsFromNow(window.userDataJugaPlay.last_check)<240)){
		setTimeout(function(){checkIfUpdateIsNeeded();}, 30000);// Check every 30 seconds	
	}else{
		updateDataFromUsers();
	}
}
// Reviso si conviene pedir la data del servidor o si hacer un log in nuevo
function updateDataFromUsers(){
	// Check if new log is a better option or to ask data for users
	if((secondsFromNow(window.userDataJugaPlay.last_check)<1800)){// 30 minutes
		ifLogInIsNeed();}
	else{
		askServerToUpdateDataFromUser();
	}
}
// Le pido al servidor la data del usuario sin probar de hacer un log In
function askServerToUpdateDataFromUser(){
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
			analizeAskServerToUpdateDataFromUser(doble);
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404){// Esto es si el servidor no le llega a poder responder o esta caido
			 return;
			}
	 	 }
		xmlhttp.open("GET","http://app.jugaplay.com/api/v1/users/33",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true"; 
		if(checkConnection()){xmlhttp.send();}}		
}
function analizeAskServerToUpdateDataFromUser(servidor){
	if (typeof(servidor.error) !== 'undefined'){
			// Borrar las cookies guardadas
			 ifLogInIsNeed();// If went wrong try with log in	
	}else{// Salio todo bien
		userDataJugaPlayUpdate(servidor);
		setTimeout(function(){checkIfUpdateIsNeeded();}, 30000);// Check every 30 seconds
	}
} 
// If Log in si needed
function ifLogInIsNeed(){
	if(getCookie("jugaPlayUserRemember")=="true"){// Si el usuario esta logeado
		if(getCookie("jugaPlayUserFacebook")=="true"){
			checkLogInFacebook();
		}else{
			mail=getCookie("juga-Play-User");
			pass=getCookie("juga-Play-Pass");
			json=JSON.stringify({ "user": { "email": mail, "password":pass } });
			mesajeToServerWithDataLogInSaved(json);
		}
	}else{
		lastOptionToKeepUserLogedIn();
	}
}
// Fin de revision de conexion
// Logue con los datos guardados 
function mesajeToServerWithDataLogInSaved(json){
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
			checkAnswerWithLogInSaved(doble);
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
function checkAnswerWithLogInSaved(servidor){
	if (typeof(servidor.error) !== 'undefined'){
			// Le da la ultima posiblidad de quedarse Logeado
			 lastOptionToKeepUserLogedIn();			
	}else{// Salio todo bien
			userDataJugaPlayUpdate(servidor);
			setTimeout(function(){checkIfUpdateIsNeeded();}, 30000);
	}
}
// Fin de log-in con datos guardados
// Analizo log in con Facebook
function checkLogInFacebook(){
	if(document.body!=null){
	var iframe = document.createElement('iframe');
	iframe.src = 'http://app.jugaplay.com/api/v1/users/auth/facebook?invited_by=1';
	iframe.style.display="none";
	iframe.onload = function() {
		lastOptionToKeepUserLogedIn();
		};
	document.body.appendChild(iframe);
	}else{
		setTimeout(function(){checkLogInFacebook();}, 100);
	}
}
// Fin de analizo log in con Facebook
//Last option to keep log in
// Le pido al servidor la data del usuario sin probar de hacer un log In
function lastOptionToKeepUserLogedIn(){
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
			analizeLastOptionToKeepUserLogedIn(doble);
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
function analizeLastOptionToKeepUserLogedIn(servidor){
	if (typeof(servidor.error) !== 'undefined'){
			// Borrar las cookies guardadas
			 logOutFromJugaPlay();// If went wrong try with log in	
	}else{// Salio todo bien
		userDataJugaPlayUpdate(servidor);
		setTimeout(function(){checkIfUpdateIsNeeded();}, 30000);// Check every 30 seconds
	}
} 
// End Last option to keep log in
// Funcion de tiempo para las cookies
function secondsFromNow(dateCheked){
	var date1 = new Date(dateCheked);
    var date2 = new Date();
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var diffSecs = Math.ceil(timeDiff / (1000)); 
	//alert(diffSecs);
    return(diffSecs);
}
