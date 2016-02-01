// JavaScript Document
// Este javascript esta encargado de poner la mesas dentro del contenedor de mesas
// Llama a http://api.jugaplay.com/api/v1/tables/ que le devuelve las mesas disponibles para jugar
//window.onload=verMesasDisponiblesParaJugar();
//window.onload=verMesasDisponiblesParaJugar();
window.onload=verMesasDisponiblesParaJugar();
function verMesasDisponiblesParaJugar(){
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
			analizarRespuestaMesasDisponiblesParaJugar(doble);
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlay("ERROR DE CONEXI&Oacute;N","<p>Hubo un error de conexi&oacute; intente nuevamente</p>");
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("GET","http://api.jugaplay.com/api/v1/tables/",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send();	
}
function analizarRespuestaMesasDisponiblesParaJugar(obj){
	if (typeof(obj.error) !== 'undefined'){
	}else{
			for (var i = 0; i < obj.length; i++) {
				if(mesaDisponibleParaJugarHorario(obj[i]['start_time'])==true){
				cargarTablaDeMesasConContenidoInicial(obj[i]['id'],obj[i]['title'],obj[i]['number_of_players'],obj[i]['start_time'],obj[i]['end_time'],obj[i]['description'],obj[i]['has_been_played_by_user']);}
    		}
	}
}
function cargarTablaDeMesasConContenidoInicial(idMesa, tituloMesa, numeroDeJugadores, horaInicioMesa, horaFinMesa, descripcionMesa, yaJugada){
	//alert(idMesa+tituloMesa+numeroDeJugadores+horaInicioMesa+horaFinMesa+descripcionMesa);
	var mesaACrear = document.createElement('tr');
	mesaACrear.innerHTML='<td>'+tituloMesa+'</td><td class="center">'+numeroDeJugadores+'</td><td class="center">'+dateFormatViewNormal(horaInicioMesa)+'</td><td class="center"><button type="button" class="'+claseBotonMesaSiDisponible(yaJugada)+'" id="btn-mesa-visible-id'+idMesa+'" onClick="'+funcionBotonMesaSiDisponible(yaJugada)+'(\''+idMesa+'\');">'+textoBotonMesaSiDisponible(yaJugada)+'</button></td>';
	document.getElementById("mesas-disponibles-totales").appendChild(mesaACrear);
}
function claseBotonMesaSiDisponible(yaJugada){//abrirMesa
	if(yaJugada==true){
		return "btn btn-jugar-no-disponible btn-block";
	}else{
		return "btn btn-jugar-disponible btn-block";
	}
}
function textoBotonMesaSiDisponible(yaJugada){
	if(yaJugada==true){
		return "ANOTADO";
	}else{
		return "JUGAR";
	}
}
function funcionBotonMesaSiDisponible(yaJugada){
	if(yaJugada==true){
		return "mesaYaJugada";
	}else{
		return "abrirMesa";
	}
}
function mesaDisponibleParaJugarHorario(fechaHora){
	//14/01/2016 - 22:10
	//012345678901234567
	var dia= fechaHora.substring(0, 2);// Dia del mes
	var mes= fechaHora.substring(3, 5);// que mes
	var ano= fechaHora.substring(6, 10);// que ano
	var hora= fechaHora.substring(13, 15);// hora
	var minutos=fechaHora.substring(16);// minutos
	var t = new Date();
	var d = new Date();
	var diff=t.getTimezoneOffset();// Tiene que ser 180 minutos xq tomamos el GTM de argentina - 3
	var diffMinutos= diff-180;// Los minutos que difiere de argentina
	d.setFullYear(ano, (mes-1), dia);
	d.setHours(hora);
	d.setMinutes(minutos);
	t.setMinutes ( t.getMinutes() + diffMinutos ); // Llevo la hora que comparo a la hora de argentina
	if(t<d){
		return true;
	}else{
		//return false; Lo cancelo asi veo todo
		return true;
	}
}
function nombresDeEquiposBeta(titulo){
	return titulo.replace(" vs ", ", ");
}
function nombresDePremiosBeta(idMesa){
	if(idMesa==12){//Estudiantes gimnacia
	return "Pelota, Burger, +Sorpresas";
	}
	if(idMesa==10){//Racing independiente
	return "Camiseta, Freddo, Cine, +Sorpresas";
	}
	if(idMesa==9){//Boca Estudiantes
	return "Pelota, Freddo, Burger, +Sorpresas";
	}
	if(idMesa==11){//Boca River
	return "Camiseta, Freddo, Cine,Burger, +Sorpresas";
	}
}