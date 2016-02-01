window.onload=armadoDelHistorialCuerpoHistoria();
function armadoDelHistorialCuerpoHistoria(){
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
			armadoDelHistorialCuerpoHistoriaMensaje(doble);
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
function armadoDelHistorialCuerpoHistoriaMensaje(historialJugadas){
	contentAgregar='';
	jugadasMostradas=0;
	for(historia in historialJugadas){// si historialJugadas[historia].table.payed_points != N/A solo mostrar 3
		if( historialJugadas[historia].table.payed_points != "N/A"){
			if(jugadasMostradas%2==0){inverted='class="timeline-inverted"';}else{inverted="";}
		contentAgregar+='<li '+inverted+'><div class="timeline-badge ">'+historialJugadas[historia].table.position+'°</div><div class="timeline-panel"><div class="timeline-heading"><h4 class="timeline-title">'+historialJugadas[historia].table.title+'</h4></div><div class="timeline-heading"><div class="hist-pts-block"><div class="circ-cont pts"><p>'+historialJugadas[historia].points+'</p></div><p>PUNTOS SUMADOS PARA EL RANKING</p></div></div><div class="timeline-body"><table class="table jug-alg-tbl tabla-select-players"><thead><tr> <th width="10%"></th><th width="30%">NOMBRE</th><th width="25%">EQUIPO</th><th width="25%">SUMO</th><th width="10%"></th></tr></thead><tbody id="playersToSelect">'+jugadoresParaElHistorial(historialJugadas[historia].players)+'</tbody></table></div></div></li>';
		jugadasMostradas++;}
	}
	document.getElementById("bodyHistoryShow").innerHTML=contentAgregar;
}
function jugadoresParaElHistorial(playersSel){
	contentAgregarPlayer='';
	for(a in playersSel){
	contentAgregarPlayer+='<tr class="filaMesaJugador"><th width="10%"><img src="../img/players/sin.jpg"></th><th width="30%"><span class="player-name">'+playersSel[a].first_name+' '+playersSel[a].last_name+'</span></th><th width="25%"><b>'+playersSel[a].team+'</b></th><th width="25%"><b>'+playersSel[a].points+' Pts</b></th><th width="10%"><!--img src="../img/beta/mesa/tick.png"--></th></tr>';
	}
	return contentAgregarPlayer;
}

