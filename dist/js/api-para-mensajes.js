// JavaScript Document
// Este javascript esta encargado de manejar los mensajes con el servidor
// Llama a http://jugaplay-api-stg.herokuapp.com/api/v1/tables/ que le devuelve las mesas disponibles para jugar
function mensajeAlServidorConContenido(tipo,urlToCall,json){
	//alert(json);
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
	 	 if ((xmlhttp.readyState==4 && xmlhttp.status==200) ||  xmlhttp.status==422)
	    {
			//return xmlhttp.responseText;
			servidor=[String(xmlhttp.responseText)];
			alert(servidor);
			//avisoEmergenteJugaPlay("token",servidor)
			return servidor;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlay("ERROR DE CONEXI&Oacute;N","<p>Hubo un error de conexi&oacute; intente nuevamente</p>");
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("POST","http://api.jugaplay.com/api/v1/"+urlToCall,true);// El false hace que lo espere el true no
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.send(json);		
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
function dateFormatViewNormal(d){
	//14/01/2016 - 22:10
	//012345678901234567
	dia= d.substring(0, 2);// Dia del mes
	mes= d.substring(3, 5);// que mes
	hora= d.substring(13, 15);// hora
	minutos=d.substring(16);// minutos
    return hora+':'+minutos+' <b>'+dia+'/'+mes+'</b>';
}
//window.onload=setTimeout(function(){startLoadingAnimation();}, 1000);
//window.onload=setTimeout(function(){closeLoadingAnimation();}, 9000);
function startLoadingAnimation(){
		 BootstrapDialog.show({
			 cssClass: 'loading-pop-up',
			 title: "",
            message: "",
			buttons: [{
                label: ' ',
				id:'boton-close-loading',
                action: function(dialogItself){
                    dialogItself.close();
                }
            }]		 
		 });
		 return true;
}
function closeLoadingAnimation(){
	var element =  document.getElementById('boton-close-loading');
	if (typeof(element) != 'undefined' && element != null)
	{ document.getElementById('boton-close-loading').click();}else{
		setTimeout(function(){if (typeof(element) != 'undefined' && element != null){ document.getElementById('boton-close-loading').click();}}, 2000);
	}
}
