// JavaScript Document
// Etapa 1 -- Reviso si tiene o no Cookie
function IsJsonString2(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
window.IsLoggedInVar=false;
var jugaPlayData=getCookie("juga-Play-Data");
if(jugaPlayData.length>4 && IsJsonString2(jugaPlayData)){
userDataJugaPlayInitial(JSON.parse(jugaPlayData));
checkIfUpdateIsNeeded();
}else{
	window.location="login.html";// No esta logeado a estar version
}
// Si tiene una cookie reviso si tiene qye ser actualizada
function checkIfUpdateIsNeeded(){
	// Si el ultimo update fue hace menos de 2 minutos no pido un update de los datos
	if((secondsFromNow(window.userDataJugaPlay.last_update)<120)){
		window.IsLoggedInVar=true;
		setTimeout(function(){checkIfUpdateIsNeeded();}, 5000);// Check every 5 seconds
	}else{
		updateDataFromUsers();
	}
}
function checkConnectionLoggedIn(xmlhttp){
  if (typeof closeLoadingAnimation === "function") {closeLoadingAnimation();}
	if(xmlhttp.status==401 && JSON.parse(xmlhttp.responseText).errors.indexOf("sign in")>-1){// Status 401 -- {"errors":["You need to sign in or sign up before continuing."]}
		// No esta logueado!!
		  if(window.IsLoggedInVar){// Asi no hago el proceso del Loggin mas de una vez
				ifLogInIsNeed();
			}
			window.IsLoggedInVar=false;
			return false;// para que la mantenga corriendo
	}else{
		updateLastCheck();
		window.IsLoggedInVar=true;
    if (typeof stopTimeToWait === "function") {stopTimeToWait();}
		return true;
	}
}
// Reviso si conviene pedir la data del servidor o si hacer un log in nuevo
function updateDataFromUsers(){
	// Check if new log is a better option or to ask data for users
	if((secondsFromNow(window.userDataJugaPlay.last_check)<1800)){// 30 minutes aca tiene que tener un last_check (Ultima conexion con el servidor)
		ifLogInIsNeed();}
	else{
		askServerToUpdateDataFromUser();
	}
}
// Le pido al servidor la data del usuario sin probar de hacer un log In
function askServerToUpdateDataFromUser(){
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
        if(IsJsonString2(jsonStr)){
  				analizeAskServerToUpdateDataFromUser(JSON.parse(jsonStr));
        }else{
          setTimeout(function(){askServerToUpdateDataFromUser();}, 500);
        }
				return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404 || xmlhttp.status==105){// Esto es si el servidor no le llega a poder responder o esta caido
			 return;
			}
	 	 }
		xmlhttp.open("GET",getJPApiURL()+"users/33",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send();
}
function analizeAskServerToUpdateDataFromUser(servidor){
	if (typeof(servidor.errors) !== 'undefined' || typeof(servidor.error) !== 'undefined'  ){
			// Borrar las cookies guardadas
			 ifLogInIsNeed();// If went wrong try with log in
	}else{// Salio todo bien
		jpAnalyticsUserId(servidor.id);
		userDataJugaPlayUpdate(servidor);
		setTimeout(function(){checkIfUpdateIsNeeded();}, 5000);// Check every 5 seconds
	}
}
// If Log in si needed
function ifLogInIsNeed(){
	if(getCookie("jugaPlayUserRemember")=="true"){// Si el usuario esta logeado
		if(getCookie("jugaPlayUserFacebook")=="true"){
			checkLogInFacebook();
		}else{
			mesajeToServerWithDataLogInSaved(JSON.stringify({ "user": { "email": getCookie("juga-Play-User"), "password":getCookie("juga-Play-Pass") } }));
		}
	}else{
		logOutFromJugaPlay();
	}
}
// Fin de revision de conexion
// Logue con los datos guardados
function mesajeToServerWithDataLogInSaved(json){
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
			var jsonStr=xmlhttp.responseText;
      if(IsJsonString2(jsonStr)){
  			var json=JSON.stringify(jsonStr);
  			var servidor=JSON.parse(json);
  			var doble=JSON.parse(servidor);
  			checkAnswerWithLogInSaved(doble);
  			return true;
      }else{
        setTimeout(function(){ifLogInIsNeed();}, 500);
      }
	    }else if(xmlhttp.status==503 || xmlhttp.status==404 || xmlhttp.status==105){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlayConnectionError();
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("POST",getJPApiURL()+"login",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send(json);
}
function checkAnswerWithLogInSaved(servidor){
	if (typeof(servidor.errors) !== 'undefined' || typeof(servidor.error) !== 'undefined'  ){
			// Le da la ultima posiblidad de quedarse Logeado
			 lastOptionToKeepUserLogedIn();
	}else{// Salio todo bien
			userDataJugaPlayUpdate(servidor);
			setTimeout(function(){checkIfUpdateIsNeeded();}, 5000);
	}
}
// Fin de log-in con datos guardados
// Analizo log in con Facebook
function checkLogInFacebook(){
	if(document.body!=null){
	var iframe = document.createElement('iframe');
	iframe.src = getJPApiURL()+'users/auth/facebook?invited_by=1';
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
			//alert("Lo que lee el servidor"+jsonStr);
      if(IsJsonString2(jsonStr)){
  			var json=JSON.stringify(jsonStr);
  			var servidor=JSON.parse(json);
  			var doble=JSON.parse(servidor);
  			analizeLastOptionToKeepUserLogedIn(doble);
  			return true;
      }else{
        lastOptionToKeepUserLogedIn();
      }
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404 || xmlhttp.status==105){// Esto es si el servidor no le llega a poder responder o esta caido
			 return;
			}
	 	 }
		xmlhttp.open("GET",getJPApiURL()+"users/33",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send();
}
function analizeLastOptionToKeepUserLogedIn(servidor){
	if (typeof(servidor.errors) !== 'undefined' || typeof(servidor.error) !== 'undefined'  ){
			// Borrar las cookies guardadas
			 logOutFromJugaPlay();// If went wrong try with log in
	}else{// Salio todo bien
		jpAnalyticsUserId(servidor.id);
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
// Chequeo el tema de si esta o no en un celular
// JavaScript Document{
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  var webDir=window.location.href;
  if(check==true){// Estoy en un celular o tablet
	//Si estoy en un celular estoy bien aca
  }else{// No estoy en un celular
  		// Si no estoy en un celular no deberia estar aca
	  window.location="http://www.jugaplay.com/game.html";
  }
