// JavaScript Document
// Este javascript esta encargado de manejar los mensajes con el servidor
// Llama a http://api.jugaplay.com/api/v1/tables/ que le devuelve las mesas disponibles para jugar
// Authorization header = { "authorization":"cod" , "X-CsrfToken":"val"}  -- xmlhttp.setRequestHeader
// var X-Csrf-Token = httpRequest.getResponseHeader ("X-Csrf-Token");


function postAlServidorSinContenido(urlToCall, type, json){
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
	 	 if (xmlhttp.readyState==4 && xmlhttp.status==200)
	    {
			//return xmlhttp.responseText;
			alert(xmlhttp.responseText);
			return;	
	    }else if(xmlhttp.status==503 || xmlhttp.status==404){// Esto es si el servidor no le llega a poder responder o esta caido
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("POST",urlToCall,true);// Que no se trabe por culpa de esto
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.send(json);
}
function ejemploMesasFacuBorrar(){
	return '[{"id":1,"title":"Superclasicos","number_of_players":5,"start_time":"2016-01-05T20:14:00.919Z","end_time":"2016-01-11T20:14:00.968Z","description":"-"},{"id":2,"title":"Todo River","number_of_players":7,"start_time":"2016-01-05T20:14:00.919Z","end_time":"2016-01-21T20:14:00.985Z","description":"-"}]';
}
function dateFormatView(d){
	//2016-01-05T20:14:00.919Z
	//01234567890123456789
	dia= d.substring(8, 10);// Dia del mes
	mes= d.substring(5, 7);// que mes
	hora= d.substring(11, 13);// hora
	minutos=d.substring(14, 16);// minutos
    return hora+':'+minutos+' <b>'+dia+'/'+mes+'</b>';
}
function pruebaLogIn(){
	alert("pruebo");
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
	 	 if (xmlhttp.readyState==4 && xmlhttp.status==200)
	    {
			//return xmlhttp.responseText;
			alert(xmlhttp.responseText);
			return;	
	    }else if(xmlhttp.status==503 || xmlhttp.status==404){// Esto es si el servidor no le llega a poder responder o esta caido
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("POST","http://api.jugaplay.com/api/v1/login",true);// Que no se trabe por culpa de esto
		xmlhttp.setRequestHeader("Content-type","application/json");
		xmlhttp.send('{"email":"facundo_spagnuolo@icloud.com", "password":"13282304"}');
}
// PhcUSGgRiLzdjrzsK5r-
// qFnDPhWsTZV3FwYgwist653pzlkwPPDWcvhdMZHn8rxiY4eX7VL09LqURUQ4uKoHDpx3EEk84csnmjMbJbJTSA==
