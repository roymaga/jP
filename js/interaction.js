// JavaScript Document
// Interaction includes: Loading + Date view + simple pop ups
// Dependency -- dialog-master

// Load functions animation depends of dialog-master
window.alertShown=false;
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
		setTimeout(function(){closeLoadingAnimation();}, 500);
	}
}

// Show simple pop ups

function avisoEmergenteJugaPlay(titulo,texto){
		 BootstrapDialog.show({
			 cssClass: 'general-modal-msj',
			 title: "<H1>"+titulo+"</H1>",
            message: texto,
			buttons: [{
                label: 'Aceptar',
				id:'boton-panel-registro-aviso-error-pop-up',
                action: function(dialogItself){
                    dialogItself.close();
                }
            }]		 
		 });
		 return false;
	}
function avisoEmergenteJugaPlayConnectionError(){
	if ((typeof(document.getElementById('boton-panel-registro-aviso-error-conexion-pop-up')) == 'undefined' || document.getElementById('boton-panel-registro-aviso-error-conexion-pop-up') == null)&&window.alertShown==false){
		window.alertShown=true;// Por que como tarda en abrir sino se solapan
		setTimeout(function(){window.alertShown=false;}, 5000); // Por si lo cierra con la cruz
	BootstrapDialog.show({
			 cssClass: 'general-modal-msj',
			 title: "<H1>ERROR DE CONEXIÓN</H1>",
            message: "Hubo un error de conexión intente nuevamente",
			buttons: [{
                label: 'Aceptar',
				id:'boton-panel-registro-aviso-error-conexion-pop-up',
                action: function(dialogItself){
                    dialogItself.close();
					window.alertShown=false;
                }
            }]		 
		 });}
		 return true;
}
// Show days in diferent ways 
function dateFormatView(fechaHora){
	// Ajustado el horario por la zona donde el usuario este, se toma como base BS AS (-3)
	//2016-01-05T20:14:00.919Z
	var d = new Date();
	var dia= fechaHora.substring(8, 10);// Dia del mes
	var mes= fechaHora.substring(5, 7);// que mes
	var ano= fechaHora.substring(0, 4);// que ano
	var hora= fechaHora.substring(11, 13);// hora
	var minutos=fechaHora.substring(14, 16);// minutos
	var diff=d.getTimezoneOffset();
	var diffMinutos= diff-180;
	d.setFullYear(ano, (mes-1), dia);
	d.setHours(hora);
	d.setMinutes(minutos);
	d.setMinutes ( d.getMinutes() + diffMinutos ); 
    return parse0LessThan10(d.getHours())+':'+parse0LessThan10(d.getMinutes())+' Hs <b>'+parse0LessThan10(d.getDate())+'/'+lettersOfMonth(d.getMonth()+1)+'</b>';
}
function dateFormatViewDay(fechaHora){
	// Ajustado el horario por la zona donde el usuario este, se toma como base BS AS (-3)
	//2016-01-05T20:14:00.919Z
	var d = new Date();
	var dia= fechaHora.substring(8, 10);// Dia del mes
	var mes= fechaHora.substring(5, 7);// que mes
	var ano= fechaHora.substring(0, 4);// que ano
	var hora= fechaHora.substring(11, 13);// hora
	var minutos=fechaHora.substring(14, 16);// minutos
	var diff=d.getTimezoneOffset();
	var diffMinutos= diff-180;
	d.setFullYear(ano, (mes-1), dia);
	d.setHours(hora);
	d.setMinutes(minutos);
	d.setMinutes ( d.getMinutes() + diffMinutos ); 
    return parse0LessThan10(d.getDate())+'/'+lettersOfMonth(d.getMonth()+1);
}
function dateFormatViewNormal(fechaHora){
	// Ajustado el horario por la zona donde el usuario este, se toma como base BS AS (-3)
	//14/01/2016 - 22:10
	var d = new Date();
	var dia= fechaHora.substring(0, 2);// Dia del mes
	var mes= fechaHora.substring(3, 5);// que mes
	var ano= fechaHora.substring(6, 10);// que ano
	var hora= fechaHora.substring(13, 15);// hora
	var minutos=fechaHora.substring(16);// minutos
	var diff=d.getTimezoneOffset();
	var diffMinutos= diff-180;
	d.setFullYear(ano, (mes-1), dia);
	d.setHours(hora);
	d.setMinutes(minutos);
	d.setMinutes ( d.getMinutes() + diffMinutos ); 
    return parse0LessThan10(d.getHours())+':'+parse0LessThan10(d.getMinutes())+' Hs</br><b>'+parse0LessThan10(d.getDate())+'/'+lettersOfMonth(d.getMonth()+1)+'</b>';
}
function parse0LessThan10(int){
	int=parseInt(int);
	if(int<10){return"0"+int;}else{return int;}
}
function lettersOfMonth(month){
	month=parseInt(month);
	var letters='';
	switch(month){
    case 1:
        letters = "ENE";
        break;
    case 2:
        letters = "FEB";
        break;
    case 3:
        letters = "MAR";
        break;
    case 4:
        letters = "ABR";
        break;
    case 5:
        letters = "MAY";
        break;
    case 6:
        letters = "JUN";
        break;
	case 7:
        letters = "JUL";
        break;
    case 8:
        letters = "AGO";
        break;
    case 9:
        letters = "SEP";
        break;
    case 10:
        letters = "OCT";
        break;
    case 11:
        letters = "NOV";
        break;
    case 12:
        letters = "DIC";
        break;
	}
	return letters;
}
function returnFullMonthName(month){
	var monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Ocutbre", "Noviembre", "Diciembre"
];
	return monthNames[parseInt(month)-1];
}
function compareTablesSort(a,b) {
  if (compareSqlDateIfAOlderThanB(a.start_time,b.start_time))// Si el primero es mas antiguo y tiene que ir antes
    return 1;
  else if (compareSqlDateIfAOlderThanB(b.start_time,a.start_time))// Si el segundo es mas antiguo
    return -1;
  else // Si son iguales
    return 0;
}
function compareSqlDateIfAOlderThanB(dateA,dateB){
	var diaA= dateA.substring(0, 2);// Dia del mes
	var mesA= dateA.substring(3, 5);// que mes
	var anoA= dateA.substring(6, 10);// que ano
	var horaA= dateA.substring(13, 15);// hora
	var minutosA=dateA.substring(16);// minutos
	var dA = new Date();
	dA.setFullYear(anoA, (mesA-1), diaA);
	dA.setHours(horaA);
	dA.setMinutes(minutosA);
	dA.setSeconds(0);
	var diaB= dateB.substring(0, 2);// Dia del mes
	var mesB= dateB.substring(3, 5);// que mes
	var anoB= dateB.substring(6, 10);// que ano
	var horaB= dateB.substring(13, 15);// hora
	var minutosB=dateB.substring(16);// minutos
	var dB = new Date();
	dB.setFullYear(anoB, (mesB-1), diaB);
	dB.setHours(horaB);
	dB.setMinutes(minutosB);
	dB.setSeconds(0);
	if(dA>dB){return true;}else{return false;}
}
function isThisMonth(dateA){
	var mesA= dateA.substring(5, 7);// que mes de este formato 2016-08-07T21:35:09.128Z
	var d = new Date();
    if(d.getMonth()==(parseInt(mesA)-1)){return true;}else{return false;}
}
function hideUserHashNot(hide){
	//parseInt("9ix", 36) un hide
	return (parseInt(hide)+500).toString(36);
}
// Get image for players or club logo
function playerGetImage(id){
		/*url="img/icons/player-img/"+id+".jpg";
		if(imageMenuExists(url)){
			return url;
		}else{
			return 'img/icons/player-img/no-img.jpg';
		}*/
		return 'img/icons/player-img/no-img.jpg';
	
}
function clubGetLogo(id){
		url="img/icons/team-logo/"+id+".gif";
		if(imageMenuExists(url)){
			return url;
		}else{
			return 'img/icons/team-logo/no-logo.gif';
		}	
}
function imageExists(image_url){
    var http = new XMLHttpRequest();
    http.open('HEAD', image_url, false);
    http.send();
    return http.status != 404;
}
// Test generales
function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
function changeArrow(element){
	setTimeout(function(){ 
		if(element.innerHTML=='<i class="fa fa-chevron-up" aria-hidden="true"></i>'){element.innerHTML='<i class="fa fa-chevron-down" aria-hidden="true"></i>';}
		else{element.innerHTML='<i class="fa fa-chevron-up" aria-hidden="true"></i>';}
	}, 200);
}
// Loaders 
function addLoaderToCertainContainer(container){
	if(container.getElementsByClassName("loader").length==0){
		var loader = document.createElement('div');
		loader.className="loader";
		loader.innerHTML='<i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>';
		container.appendChild(loader);
	}
}
function removeLoaderFromCertainContainer(container){
	if(container.getElementsByClassName("loader").length>0){
		var loaders= container.getElementsByClassName("loader");
		for(var num in loaders){
			if (loaders.hasOwnProperty(num) && num!="length") {// Validacion necesaria para recorrer elementos del DOM
				loaders[num].parentNode.removeChild(loaders[num]);
			}
		}
	}
	return true;
}
function parseTableChallengeMatchName(title){
	var index= title.indexOf("-unchn");
	if(index!=-1){
		return title.substring(0, index);
	}else{
		return title;
	}
}
/* Group */
function parseTableForGroupPlayingOption (groupTable){
	if(groupTable.private){
		if(mesaDisponibleParaJugarHorario(groupTable.start_time)){
			var coinsForWinner=(groupTable.group.users.length*groupTable.entry_coins_cost);
		}else{
			var coinsForWinner=(groupTable.amount_of_users_playing*groupTable.entry_coins_cost);
		}
		groupTable.coins_for_winners=[{"position": 1,"coins":coinsForWinner }];
		groupTable.title=parseTableChallengeMatchName(groupTable.title);
	}
	return groupTable;
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
	if(t<d){return true;}else{
		return false;
	}
}
// Hacer el log in y mantenerlo
function changeAndKeepLogIn(mail,pass){
	var json=JSON.stringify({ "user": { "email": mail, "password":pass } });
	if(getCookie("jugaPlayUserRemember")=="true"){
		setCookie("jugaPlayUserFacebook", "false", 120);
		setCookie("juga-Play-User", mail, 120);
		setCookie("juga-Play-Pass", pass, 120);
	}
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
	 	 if ((xmlhttp.readyState==4 && xmlhttp.status==200) ||  (xmlhttp.readyState==4))
	    {
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404 || xmlhttp.status==105){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlayConnectionError();
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("POST",getJPApiURL()+"login",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send(json);		
}