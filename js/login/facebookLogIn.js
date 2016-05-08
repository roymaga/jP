// JavaScript Document
function openFabookConect(url){
		 var myWindow = window.open(url);
		 setTimeout(function(){ checkOpenedFacebookWindow(myWindow); }, 3000);
}
function checkOpenedFacebookWindow(myWindow){
	// myWindow.close(); Cierra la ventana
	dir=myWindow.URL;
	if(dir!=null){
		if(dir.indexOf('app.jugaplay.com/api/v1') == -1 && dir.indexOf('jugaplay.com') != -1){
			myWindow.close();
			alert("check log in");
		}else{
			setTimeout(function(){ checkOpenedFacebookWindow(myWindow); }, 3000);
		}
	}else{
		alert("se cerro la ventana");
	}
}