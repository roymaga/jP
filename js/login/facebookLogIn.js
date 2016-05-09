// JavaScript Document
function openFabookConectLogIn(){
		if(document.getElementById("checkKeepLogIn")!=null){
		if(document.getElementById("checkKeepLogIn").checked){
			setCookie("jugaPlayUserRemember", "true", 120);
			setCookie("jugaPlayUserFacebook", "true", 120);
		}}
		 var myWindow = window.open('http://app.jugaplay.com/api/v1/users/auth/facebook?invited_by=1');
		 setTimeout(function(){ checkOpenedFacebookWindow(myWindow); }, 7000);
}
function openFabookConectRegister(url){
		// var myWindow = window.open(url);
		 //setTimeout(function(){ checkOpenedFacebookWindow(myWindow); }, 27000);
		 facebookConnectPlugin.login(["public_profile"], fbLoginSuccess,
  			function loginError (error) {
    		alert(error)
  			}
			);
}
var fbLoginSuccess = function (userData) {
  alert("UserInfo: ", userData);
	}
function checkOpenedFacebookWindow(myWindow){
	myWindow.close(); //Cierra la ventana
	testFacebookLogInV1();
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