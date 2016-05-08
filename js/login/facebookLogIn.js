// JavaScript Document
function openFabookConect(url){
		 var myWindow = window.open(url);
		 setTimeout(function(){ checkOpenedFacebookWindow(myWindow); }, 5000);
}
function checkOpenedFacebookWindow(myWindow){
	myWindow.close(); //Cierra la ventana
	testFacebookLogInV1();
	/*dir=myWindow.document.URL;
	if(dir!=null){
		if(dir.indexOf('app.jugaplay.com/api/v1') == -1 && dir.indexOf('jugaplay.com') != -1){
			myWindow.close();
			alert("check log in");
		}else{
			setTimeout(function(){ checkOpenedFacebookWindow(myWindow); }, 3000);
		}
	}else{
		alert("se cerro la ventana");
	}*/
}
function testFacebookLogInV1(){
	alert("Pruebo log in Facebook");
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
			alert("Lo que lee el servidor"+jsonStr);
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