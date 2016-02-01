// JavaScript Document
window.mesaDialogArmada=false;
function abrirMesa(idMesa){
	startLoadingAnimation();
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
			closeLoadingAnimation();
			var json=JSON.stringify(jsonStr);
			var servidor=JSON.parse(json);
			var doble=JSON.parse(servidor);
			leerMesaAbierta(doble);
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlay("ERROR DE CONEXI&Oacute;N","<p>Hubo un error de conexi&oacute; intente nuevamente</p>");
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("GET","http://api.jugaplay.com/api/v1/tables/"+idMesa+"/",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send();	
}
function leerMesaAbierta(mesa){
		 window.arrPlayersSelected=[];
		 window.mesaDialogArmada=false;
		 tituloMesa=headerDeLaMesa(mesa.start_time,mesa.end_time,mesa.title);
		 contenidoMesa=contentInformacionDeLaMesa(mesa)+contentParticipantesDeLaMesa(mesa)+contentPremiosDeLaMesa(mesa);
		 BootstrapDialog.show({
			 cssClass: 'emergentes-mesa',
			 title: tituloMesa,
            message: "<div id='contenido-mesa-en-juego'>"+contenidoMesa+"</div>",
			buttons: [{
                label: 'Elegir Jugadores',
				id:'boton-mesa-en-juego',
                action: function(dialogItself) {
					//dialogItself.close();
                    jugarMesaBoton(dialogItself,mesa);
					window.mesaDialog=dialogItself;
                }
            }]
		 
		 });
	}
function jugarMesaBoton(dialog,mesa){
	if(window.mesaDialogArmada==true){
		terminarMesaBeta(dialog,mesa);
	}else{
		respuestaApreguntaArmadoMesaBeta(dialog,mesa);
	}
}
/* Se abre la pantalla de juego con la info */
function headerDeLaMesa(horaEmpieza,horaTermina,tituloDeLaMesa){
	horaTermina=horaTermina.substring(13);// Le pasa la fecha y solo quiero la hora
	horaEmpieza=horaEmpieza.substring(13);// Le pasa la fecha y solo quiero la hora
	tipoPremios="10.000 Pts";
	//tituloDeLaMesa="BOCA vs ESTUDIANTES";
	texto="<div class='col-xs-4'>"+tituloDeLaMesa+"</div><div class='col-xs-6' id='titulo-opciones-mesa-en-juego'><div class='col-xs-4 data-game active' onClick='contentMesaSelect(this,\"I\");' >INFORMACION</div><div class='col-xs-4 data-game' onClick='contentMesaSelect(this,\"PA\");' style='display:none;'>PARTICIPANTES</div><div class='col-xs-4 data-game' onClick='contentMesaSelect(this,\"PE\");' style='display:none;'>PREMIOS</div></div><div class='col-xs-2'><div class='bloques-informativo'  style='display:none;'><div class='bloque-informativo b1'><H3>"+horaEmpieza+"</H3><p>EMPIEZA</p></div><div class='bloque-informativo b2'><H3>"+horaTermina+"</H3><p>TERMINA</p></div><div class='bloque-informativo b3'><H4>"+tipoPremios+"</H4><p>PREMIOS</p></div></div></div>";
	return texto;
}
function contentInformacionDeLaMesa(mesa){
	cantidadDeJugadoresAElegir=mesa.number_of_players;
	p="<div class='row'><p>Elige "+cantidadDeJugadoresAElegir+" jugadores de los siguientes equipos: </p></div>";
	partidos="<div class='row partidosMesa'>"+contentDeLaMesaCuadroPartido(mesa)+"</div>";
	reglas="<div class='row' style='max-height:300px; overflow-y:auto;'> <table class='table table-hover jug-alg-tbl text-aligne-center' ><thead><tr><th>ACCION</th><th>PTS</th></tr></thead>            <tbody><tr><td>Disparo al arco</td><td>2</td></tr><tr><td>Disparo al palo</td><td>1.5</td></tr><tr><td>Disparo afuera</td><td>1</td></tr><tr><td>Goles</td><td>10</td></tr><tr><td>Goles (DEF)</td><td>15</td></tr><tr><td>Goles (ARQ)</td><td>17</td></tr><tr><td>Tarjeta amarilla</td><td>(-2)</td></tr><tr><td>Tarjeta roja</td><td>(-10)</td></tr><tr><td>Pases correctos</td><td>0.5</td></tr><tr><td>Pases incorrectos</td><td>(-0.5)</td></tr><tr><td>Faltas</td><td>(-0.5)</td></tr><tr><td>Recuperaciones</td><td>3</td></tr><tr><td>Asistencias</td><td>6</td></tr><tr><td>Fuera de juego</td><td>(-1)</td></tr><tr><td>Atajadas</td><td>2.5</td></tr><tr><td>Penal errado</td><td>(-5)</td></tr><tr><td>Penal atajado (ARQ)</td><td>+10</td></tr><tr><td>Gol al arquero(ARQ)</td><td>-2</td></tr><tr><td>Valla invicta (ARQ)</td><td>5</td></tr><tr><td>Valla invicta (DEF)</td><td>3</td></tr> <tr><td>Equipo ganador</td><td>2</td></tr> </tbody></table></div>";
	texto="<div id='contentInformacionDeLaMesa'>"+p+partidos+reglas+"</div>";
	return texto;
}
function contentParticipantesDeLaMesa(mesa){
	cantidadParticipantes=30;
	// Armo el contenido de la tabla
	participantes="<tr>";
	for(var i=0;i<cantidadParticipantes;i++){
		if(i!=0 && i%3==0){participantes+="</tr><tr>";}
		participantes+="<td width='33%'>"+(i+1)+"Nombre </td>";
	}
	for(var ii=i%3;i<3 && ii!=0;ii++){
		participantes+="<td width='33%'></td>";
	}
	participantes+="<tr>";
	tablas="<div class='row'> <table class='table table-hover jug-alg-tbl text-aligne-left' ><tbody>"+participantes+"</tbody></table></div>";
	// Cierro el contenido de la tabla
	texto="<div id='contentParticipantesDeLaMesa' style='display:none;'>"+tablas+"</div>";
	return texto;
}
function contentPremiosDeLaMesa(mesa){
	cantidadParticipantes=30;
	// Armo el contenido de la tabla
	participantes="<tr>";
	for(var i=0;i<cantidadParticipantes;i++){
		if(i!=0 && i%3==0){participantes+="</tr><tr>";}
		participantes+="<td width='33%'>"+(i+1)+" Premio </td>";
	}
	for(var ii=i%3;i<3 && ii!=0;ii++){
		participantes+="<td width='33%'></td>";
	}
	participantes+="<tr>";
	tablas="<div class='row'> <table class='table table-hover jug-alg-tbl text-aligne-left' ><tbody>"+participantes+"</tbody></table></div>";
	// Cierro el contenido de la tabla
	texto="<div id='contentPremiosDeLaMesa' style='display:none;'>"+tablas+"</div>";
	return texto;
}
function contentMesaSelect(element,cual){
	if(element.className.indexOf("active") > -1){// Si ya esta activo no hacer nada
		}else{
			element.parentNode.getElementsByClassName("active").item(0).classList.remove("active");
			element.className += ' active';
			contentMesaCambiarContenido(cual);
		}
}
function contentMesaCambiarContenido(cual){// En ppio Ponemos I-PA-PE
switch(cual) {
    case "PA":
        document.getElementById("contentParticipantesDeLaMesa").style.display="block";
		document.getElementById("contentPremiosDeLaMesa").style.display="none";
		document.getElementById("contentInformacionDeLaMesa").style.display="none";
        break;
    case "PE":
        document.getElementById("contentParticipantesDeLaMesa").style.display="none";
		document.getElementById("contentPremiosDeLaMesa").style.display="block";
		document.getElementById("contentInformacionDeLaMesa").style.display="none";
        break;
    default:
        document.getElementById("contentParticipantesDeLaMesa").style.display="none";
		document.getElementById("contentPremiosDeLaMesa").style.display="none";
		document.getElementById("contentInformacionDeLaMesa").style.display="block";
}
}
function contentDeLaMesaCuadroPartido(mesa){
	var textoPartidos="";
	matchesInTable=mesa.matches;
	for(a in matchesInTable){
	equipoLocal=matchesInTable[a].local_team.short_name;
	equipoVisitante=matchesInTable[a].visitor_team.short_name;
	fecha=mesaFechaReducida(matchesInTable[a].datetime);
	textoPartidos+="<div class='partidoMesa'><H2>"+equipoLocal+" <b>VS</b> "+equipoVisitante+"</H2><p>"+fecha+" Hs </p></div>";}
	return textoPartidos;
}	
/* Empieza el juego */
function juegoEmpezo(boton,tabalasSelect,mesa){
	window.mesaDialogArmada=true;
	jugadores=tabalasSelect;
	filtroPosiciones="<div class='styleSelect'><select onchange='filterPlayerPositionsShown(this);'><option value='all'>Todas las Posiciones</option><option value='goalkeeper'>Arquero</option><option value='defender'>Defensor</option><option value='midfielder'>Medio</option><option value='forward'>Delantero</option></select></div>";
	filtroEquipos="<div class='styleSelect'><select onchange='filterPlayerTeamShown(this);'><option value='all'>Todos los Equipos</option>"+armarFiltrosParaEquipos(mesa)+"</select></div>";
	tablaJugadoresPosibles=" <table class='table table-hover jug-alg-tbl tabla-select-players'><thead><tr> <th width='10%'></th><th width='30%'>NOMBRE</br>POSICION</th><th width='25%'>EQUIPO</br>NACIONALIDAD</th><th width='25%'>PARTIDO</br>HORARIO</th><th width='10%'></th></tr></thead><tbody id='playersToSelect'>"+jugadores+"</tbody></table>";
	tablaJugadoresElegidos=" <table class='table table-hover jug-alg-tbl tabla-select-players'><thead><tr> <th width='10%'></th><th width='30%'></th><th width='25%'>JUGADORES</br>ELEGIDOS</th><th width='25%'><img src='../img/app/view.png' onclick='mostrarOcultarSelected(this);' style='opacity:0.4;'></th><th width='10%'></th></tr></thead><tbody id='gameMesaSelectPlayersSelected' style='display:none;'></tbody></table>";
	filtros="<div class='row row-first'><div class='col-xs-2'>Filtrar por:</br></div><div class='col-xs-8'><div class='col-xs-8'>"+filtroPosiciones+"</div><div class='col-xs-8'>"+filtroEquipos+"</div></div></div>";
	jugadores="<div class='row'><div class='col-xs-12'>"+tablaJugadoresElegidos+"</div><div class='col-xs-12' style='max-height:300px; overflow-y:auto;'>"+tablaJugadoresPosibles+"</div></div>";
	document.getElementById("contenido-mesa-en-juego").innerHTML=filtros+jugadores;
	document.getElementById("titulo-opciones-mesa-en-juego").style.visibility="hidden";
	//document.getElementById("boton-mesa-en-juego").innerHTML="Terminar";
	//document.getElementById("boton-mesa-en-juego").onclick = function() {alert('Termina');}
}
function armarFiltrosParaEquipos(mesa){
	opcionesDeFiltro="";
	matchesInTable=mesa.matches;
	for(a in matchesInTable){
		opcionesDeFiltro+="<option value='"+matchesInTable[a].local_team.name+"'>"+matchesInTable[a].local_team.name+"</option><option value='"+matchesInTable[a].visitor_team.name+"'>"+matchesInTable[a].visitor_team.name+"</option>";
	}
	return opcionesDeFiltro;
}
/* A partir de lo otro */
function tablaSelectJugadores(mesa,boton){
	// Armo un arreglo con todos los jugadores que juegan player
	tabalasSelect="";
	matchesInTable=mesa.matches;
	for(a in matchesInTable){// Para cada partido de la mesa
		equipoLocalShort=matchesInTable[a].local_team.short_name;
		equipoVisitanteShort=matchesInTable[a].visitor_team.short_name;
		partido=equipoLocalShort+" <b>VS</b> "+equipoVisitante;
		fecha=mesaFechaReducida(matchesInTable[a].datetime);
		for (player in matchesInTable[a].local_team.players){
			tabalasSelect+=tablaSelectJugador(matchesInTable[a].local_team.players[player],matchesInTable[a].local_team.name,partido,fecha);
		}
		for (player in matchesInTable[a].visitor_team.players){
			tabalasSelect+=tablaSelectJugador(matchesInTable[a].visitor_team.players[player],matchesInTable[a].visitor_team.name,partido,fecha);
		}
	}
	
	juegoEmpezo(boton,tabalasSelect,mesa);
}
function tablaSelectJugador(player,team,partido,horario){
	//img="<img src='../img/players/"+player.id+".jpg'>";
	img="<img src='../img/players/sin.jpg'>";
	id=player.id;
	name=player.first_name+" "+player.last_name;
	posicion=traducirPosicionJugadorMesa(player.position);
	nacionalidad=player.nationality;
	horario="27/1 22:10";// Todos los partidos son 22 10
	linea="<tr data-team-type='"+team+"' data-position-type='"+player.position+"' onClick='gameMesaSelectPlayerForTeam(this,\""+id+"\");' id='mesaSelectJugadorNro"+id+"' class='filaMesaJugador'> <th width='10%'>"+img+"</th><th width='30%'><span class='player-name'>"+name+"</span></br>"+posicion+"</th><th width='25%'><b>"+team+"</b></br>"+nacionalidad+"</th><th width='25%'>"+partido+"</br>"+horario+"</th><th width='10%'><img src='../img/beta/mesa/tick.png'></th></tr>";
	return linea;
}
function gameMesaSelectPlayerForTeam(element,idJugador){
	if(window.arrPlayersSelected.length<window.maxPlayerPosibleJugadaSelect){
	if(element.className.indexOf("active") > -1){// Si ya esta activo no hacer nada
		}else{
			window.arrPlayersSelected.push(idJugador); 
			element.className += ' active';
			var jugadorElegido = document.createElement('tr');
			jugadorElegido.className="filaMesaJugador";
			jugadorElegido.innerHTML=element.innerHTML;
			jugadorElegido.getElementsByTagName("img").item(1).src="../img/beta/mesa/cross.png";
			jugadorElegido.onclick = function (){gameMesaDesSelectPlayerForTeam(jugadorElegido, element, idJugador);};
			document.getElementById("gameMesaSelectPlayersSelected").appendChild(jugadorElegido);
			actualizarBotonMesaBeta();
			ga('send', 'event', 'Select Player', 'Selected', idJugador);
			}
		}else{
			ga('send', 'event', 'Select Player', 'Selected', 'Over Flow');
			avisoEmergenteJugaPlay("Jugada Completa","<p>Esta jugada permite elegir hasta <b>"+window.maxPlayerPosibleJugadaSelect+"</b> jugadores y ya los has elegido </p>");
			//alert("No se pueden elejir mas de "+window.maxPlayerPosibleJugadaSelect+" jugadores");
		}
}
function gameMesaDesSelectPlayerForTeam(elemento, elementAnterior, idJugador){
	var index = window.arrPlayersSelected.indexOf(idJugador);
	if (index > -1) { window.arrPlayersSelected.splice(index, 1); }
	elemento.parentElement.removeChild(elemento);
	elementAnterior.classList.remove("active");
	actualizarBotonMesaBeta();
	ga('send', 'event', 'Select Player', 'Deselected', idJugador);
}
/* Actualizar el boton beta */
function actualizarBotonMesaBeta(){
	jugadoresRestantes=window.maxPlayerPosibleJugadaSelect-window.arrPlayersSelected.length;
	botonMesa=document.getElementById("boton-mesa-en-juego");
	if(jugadoresRestantes==0){
		botonMesa.innerHTML="Jugar";
	}else{
		botonMesa.innerHTML="&iexcl;Faltan agregar "+jugadoresRestantes+" Jugadores!";
	}
}
function traducirPosicionJugadorMesa(nombrePosicion){
	if(nombrePosicion=="goalkeeper"){return "Arquero";}
	if(nombrePosicion=="defender"){return "Defensor";}
	if(nombrePosicion=="midfielder"){return "Mediocampista";}
	if(nombrePosicion=="forward"){return "Delantero";}
}
/* Fin de actualizar el boton beta */
//window.onload=respuestaApreguntaArmadoMesaBeta();
function respuestaApreguntaArmadoMesaBeta(boton,mesa){ // Agregar Team
	window.arrPlayersSelected=[];
	window.maxPlayerPosibleJugadaSelect=mesa.number_of_players;
	tablaSelectJugadores(mesa,boton);
}
function filterPlayerPositionsShown(element){
	which=element.value;
	playersShownTr=document.getElementById("playersToSelect").rows;
	for(player in playersShownTr){
		if(typeof(playersShownTr[player].outerHTML) != "undefined"){
			playerPosition=playersShownTr[player].getAttribute('data-position-type');
			if(which=="all" || playerPosition==which){
				filterPlayerRemoveClassFilter(playersShownTr[player],"position-filter");
			}else{
				filterPlayerAddClassFilter(playersShownTr[player],"position-filter");
			}
		}
	}
}
function filterPlayerTeamShown(element){
	which=element.value;
	playersShownTr=document.getElementById("playersToSelect").rows;
	for(player in playersShownTr){
		if(typeof(playersShownTr[player].outerHTML) != "undefined"){
			playerPosition=playersShownTr[player].getAttribute('data-team-type');
			if(which=="all" || playerPosition==which){
				filterPlayerRemoveClassFilter(playersShownTr[player],"team-filter");
			}else{
				filterPlayerAddClassFilter(playersShownTr[player],"team-filter");
			}
		}
	}
}
function filterPlayerAddClassFilter(element,className){
	if((element.className).indexOf(className) == -1){
		element.classList.add(className);
	}
}
function filterPlayerRemoveClassFilter(element,className){
	if((element.className).indexOf(className) != -1){
		element.classList.remove(className);
	}
}
function mesaFechaReducida(fechaHora){
	//14/01/2016 - 22:10
	//012345678901234567
	var dia= fechaHora.substring(0, 2);// Dia del mes
	var mes= mesAtexto(fechaHora.substring(3, 5));// que mes
	var ano= fechaHora.substring(6, 10);// que ano
	var hora= fechaHora.substring(13, 15);// hora
	var minutos=fechaHora.substring(16);// minutos
	return dia+" "+mes+"-"+hora+":"+minutos;
}
function playerFechaReducida(fechaHora){
	//14/01/2016 - 22:10
	//012345678901234567
	var dia= fechaHora.substring(0, 2);// Dia del mes
	var mes= fechaHora.substring(3, 5);// que mes
	var ano= fechaHora.substring(6, 10);// que ano
	var hora= fechaHora.substring(13, 15);// hora
	var minutos=fechaHora.substring(16);// minutos
	return dia+" "+mes+"-"+hora+":"+minutos;
}
function mesAtexto(mes){
	switch(mes) {
    case "01":
        nombreMes="ENERO";
        break;
	case "02":
        nombreMes="FEBRERO";
        break;
	case "03":
        nombreMes="MARZO";
        break;
	case "04":
        nombreMes="ABRIL";
        break;
	case "05":
        nombreMes="MAYO";
        break;
	case "06":
        nombreMes="JUNIO";
        break;
	case "07":
        nombreMes="JULIO";
        break;
	case "08":
        nombreMes="AGOSTO";
        break;
	case "09":
        nombreMes="SEPTIEMBRE";
        break;
	case "10":
        nombreMes="OCTUBRE";
        break;
	case "11":
        nombreMes="NOVIEMBRE";
        break;
	case "12":
        nombreMes="DICIEMBRE";
        break;
    default:
        nombreMes="";
	}
	return nombreMes;
}
/* de la app */
function mostrarOcultarSelected(imagen){
	tablaJugadoresElegidos=document.getElementById("gameMesaSelectPlayersSelected");
	if(tablaJugadoresElegidos.style.display=="none"){
		tablaJugadoresElegidos.style.display="";
		imagen.style.opacity="1";
		imagen.style.webkitFilter="alpha(opacity=100)";
	}else{
		tablaJugadoresElegidos.style.display="none";
		imagen.style.opacity=".5";
		imagen.style.webkitFilter="alpha(opacity=50)";
	}
}