// JavaScript Document abrirNotificacionReglasDeJuego abrirNotificacionReglasDePremios abrirNotificacionEnviarComentario
/* Notificacion de como se Juega */
function abrirNotificacionComoSeJuega(){
	ga('send', 'event', 'Notification Open', 'How to play', '');
		 tituloMesa=headerDeLaMesaPopUpComoSeJuega();
		 contenidoMesa=contenidoDeLaMesaPopUpComoSeJuega();
		 BootstrapDialog.show({
			 cssClass: 'emergentes-pop-up-gen',
			 title: tituloMesa,
            message: "<div class='contenido-interno'>"+contenidoMesa+"</div>"		 
		 });
	}
function headerDeLaMesaPopUpComoSeJuega(){
	texto="<div class='row'><H1>COMO SE JUEGA</H1></div>";
	return texto;
}
function contenidoDeLaMesaPopUpComoSeJuega(){
	linea1="<div class='row'><p><div class='item'><p>1</p></div>Elegí la “Jugada” en la que deseas participar.</p></div>";
	linea2="<div class='row'><p><div class='item'><p>2</p></div>Cada “Jugada” contabiliza la efectividad de los jugadores en distintas incidencias de juego y les proporciona un puntaje final de acuerdo a su desempeño individual.</p></div>";
	linea3="<div class='row'><p><div class='item'><p>3</p></div>El usuario selecciona los tres jugadores que considera mas aptos a destacarse en la incidencias contempladas  en cada “Jugada”.</p></div>";
	linea4="<div class='row'><p><div class='item'><p>4</p></div>El usuario cuyo equipo suma mayor cantidad de puntos gana la “Jugada”.</p></div>";
	linea5="<div class='row'><p><div class='item'><p>5</p></div>Además de premios, cada “Jugada” reparte puntos de ranking de acuerdo al puntaje y posición final de cada usuario.</p></div>";
	linea6="<div class='row'><p><div class='item'><p>6</p></div>El tiempo limite para entrar a la “Jugada” son 15 minutos previo al comienzo de la primer partido.</p></div>";
	linea7="<div class='row'><p><div class='item'><p>7</p></div>En cuanto mas “Jugadas” participás , mayores son tus chances de sumar puntos.</p></div>";
	texto=linea1+linea2+linea3+linea4+linea5+linea6+linea7;
	return texto;
}
/* Notificacion de Reglas se Juega */
/* Notificacion de como se Juega */
function abrirNotificacionReglasDeJuego(){
	ga('send', 'event', 'Notification Open', 'Rules of Game', '');
		 tituloMesa=headerDeLaMesaPopUpReglasDeJuego();
		 contenidoMesa=contenidoDeLaMesaPopUpReglasDeJuego();
		 BootstrapDialog.show({
			 cssClass: 'emergentes-pop-up-gen',
			 title: tituloMesa,
            message: "<div class='contenido-interno'>"+contenidoMesa+"</div>"		 
		 });
	}
function headerDeLaMesaPopUpReglasDeJuego(){
	texto="<div class='row'><H1>QUE ESTADISTICAS SE MIDEN</H1></div>";
	return texto;
}
function contenidoDeLaMesaPopUpReglasDeJuego(){
	linea1="<div class='row'><p>Un equipo de profesionales especializados en estadística deportiva nos brinda datos precisos sobre el desempeño de cada jugador titular durante los 90 minutos de cada partido. Una vez procesada esta información, la Jugada asigna puntos a cada acción de juego efectuada por cada jugador durante el partido. El usuario demuestra su habilidad al interpretar las incidencias mas premiadas por cada Jugada y al seleccionar los jugadores mas aptos a destacarse.</p><p>Las estadísticas se miden a nivel individual en donde cada jugador suma por su desempeño en el partido. Se asigna puntos bonus dependiendo de la posición del jugador. </p><p>Ejemplo: Un gol vale 10 puntos. Un gol de un defensor vale +5.</p></div>";
	
	linea2="<div class='row'><p><table class='table table-hover jug-alg-tbl text-aligne-center' ><thead><tr><th>ACCION</th><th>PTS</th></tr></thead>            <tbody><tr><td>Disparo al arco</td><td>2</td></tr><tr><td>Disparo al palo</td><td>1.5</td></tr><tr><td>Disparo afuera</td><td>1</td></tr><tr><td>Goles</td><td>10</td></tr><tr><td>Goles (DEF)</td><td>15</td></tr><tr><td>Goles (ARQ)</td><td>17</td></tr><tr><td>Tarjeta amarilla</td><td>(-2)</td></tr><tr><td>Tarjeta roja</td><td>(-10)</td></tr><tr><td>Pases correctos</td><td>0.5</td></tr><tr><td>Pases incorrectos</td><td>(-0.5)</td></tr><tr><td>Faltas</td><td>(-0.5)</td></tr><tr><td>Recuperaciones</td><td>3</td></tr><tr><td>Asistencias</td><td>6</td></tr><tr><td>Fuera de juego</td><td>(-1)</td></tr><tr><td>Atajadas</td><td>2.5</td></tr><tr><td>Penal errado</td><td>(-5)</td></tr><tr><td>Penal atajado (ARQ)</td><td>+10</td></tr><tr><td>Gol al arquero(ARQ)</td><td>-2</td></tr><tr><td>Valla invicta (ARQ)</td><td>5</td></tr><tr><td>Valla invicta (DEF)</td><td>3</td></tr> <tr><td>Equipo ganador</td><td>2</td></tr> </tbody></table></p></div>";
	linea3="<div class='row'><p>Las incidencias contempladas al igual que  asignación correspondiente de puntos varían por Jugada. Es responsabilidad exclusiva del usuario revisar las incidencias medidas en cada “Jugada” previo a seleccionar  sus jugadores.</p></div>";
	texto=linea1+linea2+linea3;
	return texto;
}
/* Notificacion de como son os premios */
function abrirNotificacionReglasDePremios(){
	ga('send', 'event', 'Notification Open', 'Awards', '');
		 tituloMesa=headerDeLaMesaPopUpReglasDePremios();
		 contenidoMesa=contenidoDeLaMesaReglasDePremios();
		 BootstrapDialog.show({
			 cssClass: 'emergentes-pop-up-gen',
			 title: tituloMesa,
            message: "<div class='contenido-interno'>"+contenidoMesa+"</div>"	 
		 });
	}
function headerDeLaMesaPopUpReglasDePremios(){
	texto="<div class='row'><H1>PREMIOS Y FILOSOFIA</H1></div>";
	return texto;
}
function contenidoDeLaMesaReglasDePremios(){
	linea1="<div class='row'><p>Es muy fácil… Elegí tus jugadores en Jugaplay.com, seguilos de cerca durante el partido, sumá puntos, y ganá premios al instante. </p></div>";
	linea2="<div class='row'><p>Al ingresar a Jugaplay, entendemos que ustedes nos han brindado una oportunidad. Por este motivo, queremos retribuirles la confianza depositada y proporcionar la mayor cantidad de premios instantáneos a la mayor cantidad de usuarios posibles.</p></div>";
	linea3="<div class='row'><p>Este verano, los mejores 20 usuarios del “Ranking del verano” recibirán premios.</p><p> En todas las “Jugadas”, aparte de sumar puntos para el “Ranking del verano” los usuarios podrán ganar premios instantáneos de Freddo, Romario, Burger King, Cinemark, Village, y muchos más.</p></div>";
	linea4="<div class='row'><p>Atentos a cada Jugada nueva! Queremos sorprenderlos todos los días.  No solo con premios, pero también con experiencias. Al abrir una “Jugada”, anunciaremos premios especiales para los tres mejores puntajes.</p></div>";
	texto=linea1+linea2+linea3+linea4;
	return texto;
}
/* Notificacion de como son os premios */
function abrirNotificacionRankingDePremios(){
	ga('send', 'event', 'Notification Open', 'Ranking', '');
		 tituloMesa=headerDeLaMesaPopUpReglasDeRanking();
		 contenidoMesa=contenidoDeLaMesaReglasDeRanking();
		 BootstrapDialog.show({
			 cssClass: 'emergentes-pop-up-gen',
			 title: tituloMesa,
            message: "<div class='contenido-interno'>"+contenidoMesa+"</div>"	 
		 });
	}
function headerDeLaMesaPopUpReglasDeRanking(){
	texto="<div class='row'><H1>RANKING DEL VERANO</H1></div>";
	return texto;
}
function contenidoDeLaMesaReglasDeRanking(){
	linea1="<div class='row'><p>Los puntos ganados de las Jugadas se contabilizan en el Ranking del Torneo Verano 2016. Los 20 usuarios con mayor puntaje en el ranking serán premiados con premios super especiales, a confirmarse en los próximos días.</p></div>";
	linea2=" <div class='row img-publ-container'><div class='img-publ-prem' style='background-image:url(../img/premios/r/1.jpg); background-position:0px 0px; background-size: cover;'><div class='pos-box'><p>Viajes</p></div></div><div class='img-publ-prem med' style='background-image:url(../img/premios/r/2.jpg);  background-position: center center;background-size: cover;'><div class='pos-box'><p>Ropa deportiva</p></div></div><div class='img-publ-prem' style='background-image:url(../img/premios/r/3.jpg);background-size: cover;'><div class='pos-box'><p>Muchos mas</p></div></div></div>'";
	linea3="<div class='row'><table class='table table-hover jug-alg-tbl text-aligne-center' >            <thead><tr><th>POSICIONES ACTUALES</th><th>PUNTAJE</th></tr></thead><tbody><tr><td>Primero</td><td>"+window.rankingVerano[1]+" Pts</td></tr><tr><td>Segundo</td><td>"+window.rankingVerano[2]+" Pts</td></tr><tr><td>Tercero</td><td>"+window.rankingVerano[3]+" Pts</td></tr><tr><th>Vos!!</th><th>"+window.rankingVerano[4]+" Pts</th></tr></tbody></table></div>";
	linea4="<div class='row'><p>Estos son las posiciones actuales del Ranking del verano. Los puntos sumados por el TOP 3, preservando la identidad de los usuarios. Proximamente te estaremos pidiendo un nic, para publicar en el sitio.</p></div>";
	texto=linea1+linea2+linea3+linea4;
	return texto;
}
/* Notificacion de como es el mensaje de contacto */
function abrirNotificacionEnviarComentario(){
	ga('send', 'event', 'Notification Open', 'Feedback', '');
		 tituloMesa=headerDeLaMesaEnviarComentario();
		 contenidoMesa=contenidoDeLaMesaEnviarComentario();
		 BootstrapDialog.show({
			 cssClass: 'emergentes-pop-up-gen',
			 title: tituloMesa,
            message: "<div class='contenido-interno'>"+contenidoMesa+"</div>"	,
			buttons: [{
                label: 'Enviar',
                action: function(dialogItself) {
                    enviarMensajeDeContacto(dialogItself);
                }
            }]	 
		 });
	}
function headerDeLaMesaEnviarComentario(){
	texto="<div class='row'><div class='cont-img'><img src='../img/beta/pop-ups/pop3.jpg'></div></div><div class='row'><H1>FEEDBACK</H1></div>";
	return texto;
}
function contenidoDeLaMesaEnviarComentario(){
	linea1="<div class='row'><p>Tu feedback es muy importante para nosotros. Estamos conociendo nuestros usuarios y nos interesa muchísimo que encuentren en Jugaplay un espacio común para competir con amigos manifestar su conocimiento futbolero.</p></div>";
	linea2="<div class='row'><p>Contános sobre tu experiencia en Jugaplay.</p></div>";
	linea3="<div class='row'><p></p></div>";
	linea4="<div class='formularioContacto'><div class='row'><p>Nombre: </p><input id='nombreContacto' type='text'> </div>";
	linea5="<div class='row'><p>Mail: </p><input id='mailContacto' type='text'> </div>";
	linea6="<div class='row'><p>Comentario: </p><textarea id='contenidoContactoTxt' rows='7' ></textarea> </div></div>";
	texto=linea1+linea2+linea3+linea4+linea5+linea6;
	return texto;
}
function enviarMensajeDeContacto(dialog){
	nombreContacto=document.getElementById("nombreContacto").value;
	mailContacto=document.getElementById("mailContacto").value;
	contenidoContacto=document.getElementById("contenidoContactoTxt").value;
	//alert(contenidoContacto +nombreContacto+ mailContacto);
	if(contenidoContacto.length<2000 && contenidoContacto.length>1){
		json=JSON.stringify( { "comment": { "sender_name": nombreContacto,"sender_mail": mailContacto,"content": contenidoContacto } } );
		mensajeAlServidorComentarioContacto(json);
	}else{
		if(contenidoContacto.length>2000){
			avisoEmergenteJugaPlay("Contenido Maximo exedido","<p>El contenido del mensaje no puede ser mayor a 2000 caracteres</p>");
		}else{
			avisoEmergenteJugaPlay("Sin Contenido","<p>El campo comentario es obligatorio</p>");
		}
	}
	//dialog.close;
}
function mensajeAlServidorComentarioContacto(json){
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
	 	 if ((xmlhttp.readyState==4 && xmlhttp.status==200) ||  (xmlhttp.readyState==4 && xmlhttp.status==422))
	    {
			ga('send', 'event', 'Notification Open', 'Feedback', 'Send');
			avisoEmergenteJugaPlay("Muchas Gracias","<p>Muchas gracias por su comentario</p><p>Su feedback es muy importante para nosotros</p>");
			document.getElementById("nombreContacto").value=null;
			document.getElementById("mailContacto").value=null;
			document.getElementById("contenidoContactoTxt").value=null;
			
	    }else if(xmlhttp.status==503 || xmlhttp.status==404){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlay("ERROR DE CONEXI&Oacute;N","<p>Hubo un error de conexi&oacute; intente nuevamente</p>");
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("POST","http://api.jugaplay.com/api/v1/comments",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send(json);		
}