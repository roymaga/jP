// JavaScript Document
function openFabookConectLogIn(){
		if(document.getElementById("checkKeepLogIn")!=null){
		if(document.getElementById("checkKeepLogIn").checked){
			setCookie("jugaPlayUserRemember", "true", 120);
			setCookie("jugaPlayUserFacebook", "true", 120);
		}}
		 window.myWindow = window.open('http://app.jugaplay.com/api/v1/users/auth/facebook?invited_by=1');
		 setTimeout(function(){ checkOpenedFacebookWindow(); }, 7000);
}
function openFabookConectRegister(url){
		 window.myWindow = window.open(url);
		 setTimeout(function(){ checkOpenedFacebookWindow(); }, 12000);
}
function checkOpenedFacebookWindow(){
	window.myWindow.postMessage("Check-FB-Log-In", "http://jugaplay.com");
	setTimeout(function(){ checkOpenedFacebookWindow(); }, 5000);
	/*myWindow.close(); //Cierra la ventana
	testFacebookLogInV1();*/
}
window.addEventListener("message", receiveMessage, false);
function receiveMessage(event)
{
  // Do we trust the sender of this message?  (might be
  // different from what we originally opened, for example).
  alert("Recive message from Fb");
	if (~event.origin.indexOf('jugaplay.com')) {
		alert("Recive message from Fb");
		window.myWindow.close();
		testFacebookLogInV1();
	}
  // event.source is popup
  // event.data is "hi there yourself!  the secret response is: rheeeeet!"
}
function testFacebookLogInV1(){
	//alert("Pruebo log in Facebook");
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
			var json=JSON.stringify(jsonStr);
			var servidor=JSON.parse(json);
			var doble=JSON.parse(servidor);
			analizeOptionToLogedInFacebook(doble);
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
function analizeOptionToLogedInFacebook(servidor){
	if (typeof(servidor.error) !== 'undefined'){
			// Borrar las cookies guardadas
	}else{// Salio todo bien
		servidor.last_check=new Date();
		servidor.last_update=new Date();
		cookieSave=JSON.stringify(servidor);
		setCookie("juga-Play-Data", cookieSave, 120);
		window.location="game.html";
	}
} 