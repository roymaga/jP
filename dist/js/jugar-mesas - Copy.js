// JavaScript Document
function abrirMesa(idMesa){
		 tituloMesa=headerDeLaMesa();
		 contenidoMesa=contentInformacionDeLaMesa()+contentParticipantesDeLaMesa()+contentPremiosDeLaMesa();
		 BootstrapDialog.show({
			 cssClass: 'emergentes-mesa',
			 title: tituloMesa,
            message: "<div id='contenido-mesa-en-juego'>"+contenidoMesa+"</div>",
			buttons: [{
                label: 'Elegir Jugadores',
				id:'boton-mesa-en-juego',
                action: function(dialog) {
                    juegoEmpezo(dialog);
                }
            }]
		 
		 });
	}
/* Se abre la pantalla de juego con la info */
function headerDeLaMesa(){
	horaEmpieza="22:10";
	horaTermina="23:50";
	tipoPremios="10.000 Pts";
	tituloDeLaMesa="ESTUDIANTES LP vs RACING";
	texto="<div class='col-xs-4'>"+tituloDeLaMesa+"</div><div class='col-xs-6' id='titulo-opciones-mesa-en-juego'><div class='col-xs-4 data-game active' onClick='contentMesaSelect(this,\"I\");' >INFORMACION</div><div class='col-xs-4 data-game' onClick='contentMesaSelect(this,\"PA\");' style='display:none;'>PARTICIPANTES</div><div class='col-xs-4 data-game' onClick='contentMesaSelect(this,\"PE\");'>PREMIOS</div></div><div class='col-xs-2'><div class='bloques-informativo'><div class='bloque-informativo b1'><H3>"+horaEmpieza+"</H3><p>EMPIEZA</p></div><div class='bloque-informativo b2'><H3>"+horaTermina+"</H3><p>TERMINA</p></div><div class='bloque-informativo b3'><H4>"+tipoPremios+"</H4><p>PREMIOS</p></div></div></div>";
	return texto;
}
function contentInformacionDeLaMesa(){
	cantidadDeJugadoresAElegir=3;
	p="<div class='row'><p>Elige "+cantidadDeJugadoresAElegir+" jugadores de los siguientes equipos: </p></div>";
	partidos="<div class='row partidosMesa'>"+contentDeLaMesaCuadroPartido()+"</div>";
	reglas="<div class='row'> <table class='table table-hover jug-alg-tbl text-aligne-center' ><thead><tr><th>INCIDENCIAS</th><th>PUNTAJES</th><th>ARQUERO</th><th>DEFENSOR</th><th>MEDIOCAMPISTA</th><th>DELANTERO</th></tr></thead>            <tbody>            <tr><td>Disparo al arco</td><td>2</td><th></td><td></td><td></td><td></td></tr>            <tr><td>Disparo al palo</td><td>1.5</td><th></td><td></td><td></td><td></td></tr>            <tr><td>Disparo afuera</td><td>1</td><td></td><td></td><td></td><td></td></tr>            <tr><td>Goles</td><td>10</td><th>+7</td><th>+5</td><td></td><td></td></tr>            <tr><td>Tarjeta amarilla</td><td>(-2)</td><th></td><td></td><td></td><td></td></tr>            <tr><td>Tarjeta roja</td><td>(-10)</td><th></td><td></td><td></td><td></td></tr>            <tr><td>Pases correctos</td><td>0.5</td><th></td><td></td><td></td><td></td></tr>            <tr><td>Pases incorrectos</td><td>(-0.5)</td><td></td><td></td><td></td><td></td></tr>            <tr><td>Faltas</td><td>(-0.5)</td><th></td><td></td><td></td><td></td></tr>            <tr><td>Recuperaciones</td><td>3</td><th></td><td></td><td></td><td></td></tr>            <tr><td>Asistencias</td><td>6</td><th></td><td></td><td></td><td></td></tr>            <tr><td>Fuera de juego</td><td>(-1)</td><th></td><td></td><td></td><td></td></tr>            <tr><td>Atajadas</td><td>2.5</td><th></td><td></td><td></td><td></td></tr>            <tr><td>Penal errado</td><td>(-5)</td><th></td><td></td><td></td><td></td></tr>            <tr><td>Penal atajado</td><td>+10</td><th></td><td></td><td></td><td></td></tr>            <tr><td>Gol al arquero</td><td></td><th>-2</th><td></td><td></td><td></td></tr>            <tr><td>Valla invicta</td><td></td><th>+5</th><th>+3</th><td></td><td></td></tr>            <tr><td></td><td></td><td></td></tr><tr><td>Equipo ganador</td><td>2</td><th></th><td></td><td></td><td></td></tr> </tbody></table></div>";
	texto="<div id='contentInformacionDeLaMesa'>"+p+partidos+reglas+"</div>";
	return texto;
}
function contentParticipantesDeLaMesa(){
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
function contentPremiosDeLaMesa(){
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
function contentDeLaMesaCuadroPartido(){
	equipoLocal="EST";
	equipoVisitante="RAC";
	fecha="14 ENERO";
	hora="22:10";
	texto="<div class='partidoMesa'><H2>"+equipoLocal+" <b>VS</b> "+equipoVisitante+"</H2><p>"+fecha+"-"+hora+" Hs </p></div>";
	return texto;
}	
/* Empieza el juego */
function juegoEmpezo(boton){
	jugadores=tablaSelectJugadores();
	filtroPosiciones="<div class='styleSelect'><select><option value='todos'>Todas las Posiciones</option><option value='arquero'>Arquero</option><option value='Defensor'>Defensor</option><option value='medio'>Medio</option><option value='delantero'>Delantero</option></select></div>";
	filtroEquipos="<div class='styleSelect'><select><option value='todos'>Todos los Equipos</option><option value='arquero'>River</option><option value='Defensor'>Boca</option><option value='medio'>Racing</option><option value='delantero'>Gimnasia</option></select></div>";
	tablaJugadoresPosibles=" <table class='table table-hover jug-alg-tbl tabla-select-players'><thead><tr> <th width='10%'></th><th width='30%'>NOMBRE</br>POSICION</th><th width='25%'>EQUIPO</br>NACIONALIDAD</th><th width='25%'>PARTIDO</br>HORARIO</th><th width='10%'></th></tr></thead><tbody>"+jugadores+"</tbody></table>";
	tablaJugadoresElegidos=" <table class='table table-hover jug-alg-tbl tabla-select-players'><thead><tr> <th width='10%'></th><th width='30%'></th><th width='25%'>JUGADORES</br>ELEGIDOS</th><th width='25%'></th><th width='10%'></th></tr></thead><tbody id='gameMesaSelectPlayersSelected'></tbody></table>";
	filtros="<div class='row row-first'><div class='col-xs-2'>Filtrar por: </div><div class='col-xs-8'><div class='col-xs-4'>"+filtroPosiciones+"</div><div class='col-xs-4'>"+filtroEquipos+"</div></div></div>";
	jugadores="<div class='row'><div class='col-xs-6'>"+tablaJugadoresPosibles+"</div><div class='col-xs-6'>"+tablaJugadoresElegidos+"</div></div>";
	document.getElementById("contenido-mesa-en-juego").innerHTML=filtros+jugadores;
	document.getElementById("titulo-opciones-mesa-en-juego").style.visibility="hidden";
	//document.getElementById("boton-mesa-en-juego").innerHTML="Terminar";
	//document.getElementById("boton-mesa-en-juego").onclick = function() {alert('Termina');}
}
function tablaSelectJugadores(){
	return tablaSelectJugador(1)+tablaSelectJugador(2)+tablaSelectJugador(3)+tablaSelectJugador(4)+tablaSelectJugador(5)+tablaSelectJugador(6);
}
function tablaSelectJugador(id){
	img="<img src='../img/players/boca/tevez-mini.jpg'>";
	name="Tevez";
	posicion="DELANTERO";
	team="Boca";
	nacionalidad="Argentino";
	partido="EST <b>VS</b> RAC";
	horario="12/1 19:30";
	linea="<tr onClick='gameMesaSelectPlayerForTeam(this,\""+id+"\");' id='mesaSelectJugadorNro"+id+"' class='filaMesaJugador'> <th width='10%'>"+img+"</th><th width='30%'><span class='player-name'>"+name+"</span></br>"+posicion+"</th><th width='25%'><b>"+team+"</b></br>"+nacionalidad+"</th><th width='25%'>"+partido+"</br>"+horario+"</th><th width='10%'><img src='../img/beta/mesa/tick.png'></th></tr>";
	return linea;
}
function gameMesaSelectPlayerForTeam(element,idJugador){
	if(element.className.indexOf("active") > -1){// Si ya esta activo no hacer nada
		}else{
			element.className += ' active';
			var jugadorElegido = document.createElement('tr');
			jugadorElegido.className="filaMesaJugador";
			jugadorElegido.innerHTML=element.innerHTML;
			jugadorElegido.getElementsByTagName("img").item(1).src="../img/beta/mesa/cross.png";
			jugadorElegido.onclick = function (){gameMesaDesSelectPlayerForTeam(jugadorElegido, element, idJugador);};
			document.getElementById("gameMesaSelectPlayersSelected").appendChild(jugadorElegido);
		}
}
function gameMesaDesSelectPlayerForTeam(elemento, elementAnterior, idJugador){
	elemento.parentElement.removeChild(elemento);
	elementAnterior.classList.remove("active");
}