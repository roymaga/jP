// JavaScript Document
function openFacebookConectLogIn(url){
		 var myWindow = window.open(url);
		 setTimeout(function(){ checkOpenedFacebookWindow(myWindow); }, 10000);
}
function openFacebookConnectRegister(url){
		 var myWindow = window.open(url);
		 setTimeout(function(){ checkOpenedFacebookWindow(myWindow); }, 30000);
}
function checkOpenedFacebookWindow(myWindow){
	myWindow.close(); //Cierra la ventana
	analizarSiyaEstaLogueado();
}
