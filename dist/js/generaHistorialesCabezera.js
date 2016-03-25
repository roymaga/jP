// JavaScript Document
window.onload=armadoDelHistorialCabezera();
function armadoDelHistorialCabezera(){
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
			//alert("xmlhttp.readyState: "+xmlhttp.readyState+"xmlhttp.status: "+xmlhttp.status);
	 	 if ((xmlhttp.readyState==4 && xmlhttp.status==200) ||  (xmlhttp.readyState==4 && xmlhttp.status==422) ||  (xmlhttp.readyState==4 && xmlhttp.status==401))
	    {
			jsonStr=xmlhttp.responseText;
			var json=JSON.stringify(jsonStr);
			var servidor=JSON.parse(json);
			var doble=JSON.parse(servidor);
			armadoDelHistorialCabezeraMensaje(doble);
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlay("ERROR DE CONEXI&Oacute;N","<p>Hubo un error de conexi&oacute; intente nuevamente</p>");
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("GET","http://api.jugaplay.com/api/v1/plays/",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send();	
}

function armadoDelHistorialCabezeraMensaje(historialJugadas){
	contentAgregar='';
	jugadasMostradas=0;
	historialJugadas.sort(compareHistorialSort);
	for(historia in historialJugadas){// si historialJugadas[historia].table.payed_points != N/A solo mostrar 3
		if( historialJugadas[historia].table.payed_points != "N/A" && jugadasMostradas<3){
		contentAgregar+='<li><div class="hist-all-block"><p><strong>'+tituloHistorialJugadas(historialJugadas[historia].table.title)+'</strong></p><div class="hist-pts-block"><div class="circ-cont"><p>'+historialJugadas[historia].table.position+' °</p></div><p>POSICION</p></div><div class="hist-pts-block"><div class="circ-cont pts"><p>'+historialJugadas[historia].table.payed_points+'</p></div><p>PUNTOS</p></div><div class="hist-btn-block"><a href="historial.html"><button type="button" class="btn" href="historial.html">Ver Detalle</button></a></div></div></li>';
		jugadasMostradas++;}
	}
	contentAgregar+='<li><a class="text-center" href="historial.html"><strong>Ver Historia</strong><i class="fa fa-angle-right"></i></a></li>';
	document.getElementById("cabeceraMenuHistorial").innerHTML=contentAgregar;
}
function compareHistorialSort(a,b) {
  if (a.id > b.id)
    return -1;
  else if (a.id < b.id)
    return 1;
  else 
    return 0;
}
function tituloHistorialJugadas(titulo){
	if(titulo.length>30){
		return titulo.substr(0, 28)+"...";
	}else{
		return titulo;
	}
}



