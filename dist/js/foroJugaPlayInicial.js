// JavaScript Document
function openForoJugaPlay(idTable,tableTitle){
	// El id del usuario va en 0 asi trae todos los comentarios
	openForoJugaPlayInicial(0,idTable,tableTitle);
}
function openForoJugaPlayInicial(usuId,idTable,tableTitle){
	startLoadingAnimation();
	json=JSON.stringify({"user_id":usuId,"table_id":idTable,"last_update":0});
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
			//alert("xmlhttp.readyState: "+xmlhttp.readyState+"xmlhttp.status: "+xmlhttp.status);
	 	 if ((xmlhttp.readyState==4 && xmlhttp.status==200))
	    {
			jsonStr=xmlhttp.responseText;
			closeLoadingAnimation();
			//alert('Respuesta foro'+jsonStr);
			var doble=JSON.parse(jsonStr);
			abrirPopUpForo(doble,tableTitle, idTable);
			return true;
	    }else if(xmlhttp.readyState==4){// Esto es si el servidor no le llega a poder responder o esta caido
			closeLoadingAnimation();
			 //alert("ERROR"+xmlhttp.status)
			}
	 	 }
		xmlhttp.open("POST","http://chatv1.jugaplay.com/foroJugaPlay/manbase/readComments.php",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send(json);
}
function abrirPopUpForo(comentarios,tableTitle, idTable){
	ga('send', 'event', 'Foro Open', tableTitle, '');
		 contenidoMesa=contenidoDelForo(comentarios, idTable);
		 BootstrapDialog.show({
			 cssClass: 'emergentes-pop-up-gen',
			 title: "<div class='row'><H1 style='font-size: 16px;'>"+tableTitle+"</H1></div>",
            message: "<div class='contenido-interno chat-campeones' style='padding: 0px;'>"+contenidoMesa+"</div>"	 
		 });
}
function contenidoDelForo(comentarios, idTable){
	jugaPlayUsu=window.JugPlaUser;
	usuId=jugaPlayUsu.id;
	linea0="<div class='jugaplay-foro'>";
	linea1="<div class='comentarios' id='open-comments-"+idTable+"'>";
	lineaC="";
	//window.lastUpdateForoOpen=0;
	for(comentario in comentarios){
		lineaC+="<div class='comentario'><div class='nic'>@"+comentarios[comentario].msj_usu_nic+"</div><div class='fecha'>"+comentarios[comentario].msj_created+"</div><div class='comment'>"+comentarios[comentario].msj_txt+"</div></div>";
	}
	if(comentarios.length>0){lastUpdateForoOpen=comentarios[0].msj_update;}else{lastUpdateForoOpen=0;}
	setTimeout(function(){actualizarForoOpen(usuId,idTable,lastUpdateForoOpen);}, 10000);
	linea2="</div>";
	linea3="<div class='row'><textarea id='comment-foro-jugaplay-v1' rows='3' ></textarea></div><div class='row'><button type='button' class='btn' onclick='submitCommentForoJugaplay(\""+idTable+"\");'>Comentar</button></div>";
	linea4="</div>";
	texto=linea0+linea1+lineaC+linea2+linea3+linea4;
	return texto;
}
// Agregar comentarios al Foro
function agregarComentarioAlForo(msjTbId,usuNick,comment,fecha){
	if(document.getElementById('open-comments-'+msjTbId) !== null){
		var e = document.createElement('div');
		e.className="comentario fadeInDownBig animated";
		e.innerHTML = "<div class='nic'>@"+usuNick+"</div><div class='fecha'>"+fecha+"</div><div class='comment'>"+comment+"</div>";
		el=document.getElementById('open-comments-'+msjTbId);
		el.insertBefore(e, el.firstChild);	}
}
// funciones de comentar en el foro
function submitCommentForoJugaplay(msjTbId){
	commentToSubmit=document.getElementById('comment-foro-jugaplay-v1').value;
	jugaPlayUsu=window.JugPlaUser;
	usuId=jugaPlayUsu.id;
	usuMail=jugaPlayUsu.email;
	msjRespuesta=0;
	usuNick=jugaPlayUsu.nickname;
	if(commentToSubmit.length>0){// El mensaje tiene que ser mas largo que 1
		var d = new Date();
		fecha=d.getHours()+':'+d.getMinutes()+' '+d.getDate()+'-'+(d.getMonth()+1)+'-'+String(d.getFullYear()).substring(2, 4);
		enviarCommentToServer(usuId,usuMail,usuNick,msjRespuesta,msjTbId,commentToSubmit);
		document.getElementById('comment-foro-jugaplay-v1').value=' ';
		agregarComentarioAlForo(msjTbId,usuNick,commentToSubmit,fecha);
	}
}
// user_id table_id msj_txt msj_response acordarse de poner un time last read cuando se lea
function enviarCommentToServer(usuId,usuMail,usuNick,msjRespuesta,msjTbId,commentToSubmit){
	json=JSON.stringify({"user_id":usuId,"user_mail":usuMail,"user_nick":usuNick,"table_id":msjTbId,"msj_txt":commentToSubmit,"msj_response":msjRespuesta});
	//alert("Comentarios"+json);
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
	 	 if ((xmlhttp.readyState==4 && xmlhttp.status==200))
	    {
			jsonStr=xmlhttp.responseText;
			//alert("respuesta"+jsonStr);
			return true;
	    }else if(xmlhttp.readyState==4){// Esto es si el servidor no le llega a poder responder o esta caido
			 //avisoEmergenteJugaPlay("ERROR DE CONEXI&Oacute;N","<p>Hubo un error de conexi&oacute; intente nuevamente</p>");
			 //return "ERROR";
			 //alert("ERROR"+xmlhttp.status)
			 setTimeout(function(){enviarCommentToServer(usuId,usuMail,usuNick,msjRespuesta,msjTbId,commentToSubmit);}, 15000);
			}
				 	 }
		xmlhttp.open("POST","http://chatv1.jugaplay.com/foroJugaPlay/manbase/addComment.php",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.send(json);
}
// funciones de leer los mensajes del foro manteniendolo actualizado
function actualizarForoOpen(usuId,idTable,lastUpdateForoOpen){
	json=JSON.stringify({"user_id":usuId,"table_id":idTable,"last_update":lastUpdateForoOpen});
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
	 	 if ((xmlhttp.readyState==4 && xmlhttp.status==200))
	    {
			jsonStr=xmlhttp.responseText;
			//alert('Respuesta foro'+jsonStr);
			var doble=JSON.parse(jsonStr);
			updatePopUpForo(doble,lastUpdateForoOpen, idTable,usuId);
			return true;
	    }else if(xmlhttp.readyState==4){// Esto es si el servidor no le llega a poder responder o esta caido
			// alert("ERROR"+xmlhttp.status)
			setTimeout(function(){actualizarForoOpen(usuId,idTable,lastUpdateForoOpen);}, 15000);
			
			}
	 	 }
		xmlhttp.open("POST","http://chatv1.jugaplay.com/foroJugaPlay/manbase/readComments.php",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send(json);
}
function updatePopUpForo(comentarios,lastUpdateForoOpen, idTable,usuId){
	for(comentario in comentarios){
		agregarComentarioAlForo(idTable,comentarios[comentario].msj_usu_nic,comentarios[comentario].msj_txt, comentarios[comentario].msj_created);
	}
	if(comentarios.length>0){lastUpdateForoOpen=comentarios[0].msj_update;}else{lastUpdateForoOpen=lastUpdateForoOpen;}
	setTimeout(function(){actualizarForoOpen(usuId,idTable,lastUpdateForoOpen);}, 10000);
}
// Tablas que tienen que tener el contador de comentarios actualizados, cada 30 Seg
function updateAmoutnOfForoInteractions(arregloDeMesasConComentarios){//"comment-tbl-'+idMesa+'"
	json=JSON.stringify({"seen_tables":arregloDeMesasConComentarios});
	//alert("Envio: "+json);
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
	 	 if ((xmlhttp.readyState==4 && xmlhttp.status==200))
	    {
			jsonStr=xmlhttp.responseText;
			//alert('Respuesta foro'+jsonStr);
			var doble=JSON.parse(jsonStr);
			updateForoCounter(doble);
			setTimeout(function(){updateAmoutnOfForoInteractions(arregloDeMesasConComentarios);}, 30000);// Actualiza los comentarios cada 30 Segundos
			return true;
	    }else if(xmlhttp.readyState==4){// Esto es si el servidor no le llega a poder responder o esta caido
			 setTimeout(function(){updateAmoutnOfForoInteractions(arregloDeMesasConComentarios);}, 30000);
			}
	 	 }
		xmlhttp.open("POST","http://chatv1.jugaplay.com/foroJugaPlay/manbase/amountComments.php",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send(json);
}
function updateForoCounter(comentarios){
	for(comentario in comentarios){
		actualizarComentariosMesa(comentarios[comentario].msj_tb_id,comentarios[comentario].count_msj);
	}
}
function actualizarComentariosMesa(mesaId,cantidad){
	if(document.getElementById('comment-tbl-'+mesaId) !== null){
		comentarios=document.getElementById('comment-tbl-'+mesaId);
		cantidadActuales=parseInt(comentarios.innerHTML);
		if(cantidadActuales!=cantidad){
			comentarios.innerHTML=cantidad;
			playAnimation(comentarios, 'animated');
		}
	}
}