// JavaScript Document
function hacerLogOutDeLaCuenta(){
	delete_cookie( "jugaPlayUserRemember" );
	delete_cookie( "juga-Play-User" );
	delete_cookie( "juga-Play-Pass" );	
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
	 	 if ((xmlhttp.readyState==4))
	    {
			//alert(xmlhttp.responseText);
			window.location="login.html";
			//analizarRespuestaRegistroBeta(doble);
			return true;
	    }
	 	 }
		xmlhttp.open("DELETE","http://api.jugaplay.com/api/v1/logout",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send();		
}
