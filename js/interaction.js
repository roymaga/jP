// JavaScript Document
// Interaction includes: Loading + Date view + simple pop ups
// Dependency -- dialog-master

// Load functions animation depends of dialog-master
window.alertShown=false;
window.internetAlert=false;
window.internetAlertSlow=false;
window.timeToWait = null;
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
                label: "<span class='trn'>Aceptar</span>",
				id:'boton-panel-registro-aviso-error-pop-up',
                action: function(dialogItself){
                    dialogItself.close();
                }
            }],
						onshown: function(dialogItself) {
												checkLanguageItem(dialogItself);
											}
		 });
		 return false;
	}
	function avisoEmergenteJugaPlayConnectionError(){
		if ((typeof(document.getElementById('boton-panel-registro-aviso-error-conexion-pop-up')) == 'undefined' || document.getElementById('boton-panel-registro-aviso-error-conexion-pop-up') == null)&&window.alertShown==false){
			window.alertShown=true;// Por que como tarda en abrir sino se solapan
			setTimeout(function(){window.alertShown=false;}, 5000); // Por si lo cierra con la cruz
		BootstrapDialog.show({
				 cssClass: 'general-modal-msj',
				 title: "<H1 class='trn'>ERROR DE CONEXIÓN</H1>",
	            message: "<span class='trn'>Hubo un error de conexión intente nuevamente</span>",
				buttons: [{
	                label: "<span class='trn'>Aceptar</span>",
					id:'boton-panel-registro-aviso-error-conexion-pop-up',
	                action: function(dialogItself){
	                    dialogItself.close();
						window.alertShown=false;
	                }
	            }],
							onshown: function(dialogItself) {
	                        checkLanguageItem(dialogItself);
	                      }
			 });}
			 return true;
	}
// diffOfDaysBetweenDates(starts, ends)  daysFromDate(fechaHora)
function diffOfDaysBetweenDates(starts, ends){
	//14/01/2016 - 22:10
	var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
	var dia= starts.substring(0, 2);// Dia del mes
	var mes= starts.substring(3, 5);// que mes
	var ano= starts.substring(6, 10);// que ano
	var firstDate = new Date(ano,mes,dia);
	var dia2= ends.substring(0, 2);// Dia del mes
	var mes2= ends.substring(3, 5);// que mes
	var ano2= ends.substring(6, 10);// que ano
	var secondDate = new Date(ano2,mes2,dia2);
	return Math.round(Math.abs((secondDate.getTime() - firstDate.getTime())/(oneDay)));
}
function daysFromDate(fechaHora){
	var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
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
	d.setMinutes ( d.getMinutes() - diffMinutos );
	var firstDate = new Date();
	var diffDays = Math.round(Math.abs((d.getTime() - firstDate.getTime())/(oneDay)));
	return diffDays;
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
	d.setMinutes ( d.getMinutes() - diffMinutos );
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
	d.setMinutes ( d.getMinutes() - diffMinutos );
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
	d.setMinutes ( d.getMinutes() - diffMinutos );
    return parse0LessThan10(d.getHours())+':'+parse0LessThan10(d.getMinutes())+' Hs</br><b>'+parse0LessThan10(d.getDate())+'/'+lettersOfMonth(d.getMonth()+1)+'</b>';
}
function dateFormatViewLeague(fechaHora){
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
	d.setMinutes ( d.getMinutes() - diffMinutos );
    return parse0LessThan10(d.getDate())+'/'+lettersOfMonth(d.getMonth()+1);
}
function dateFormatViewTable(fechaHora){
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
	d.setMinutes ( d.getMinutes() - diffMinutos );
    return '</br><small>'+parse0LessThan10(d.getHours())+':'+parse0LessThan10(d.getMinutes())+' Hs <span style="font-size: 0.9em;"><b>'+parse0LessThan10(d.getDate())+'/'+lettersOfMonth(d.getMonth()+1)+'</b></span></small>';
}

function parse0LessThan10(int){
	var int=parseInt(int);
	if(int<10){return"0"+int;}else{return int;}
}
function lettersOfMonth(month){
	month=parseInt(month);
	var letters='';
	switch(month){
    case 1:
        letters = "<span class=\"trn\">ENE</span>";
        break;
    case 2:
        letters = "<span class=\"trn\">FEB</span>";
        break;
    case 3:
        letters = "<span class=\"trn\">MAR</span>";
        break;
    case 4:
        letters = "<span class=\"trn\">ABR</span>";
        break;
    case 5:
        letters = "<span class=\"trn\">MAY</span>";
        break;
    case 6:
        letters = "<span class=\"trn\">JUN</span>";
        break;
	case 7:
        letters = "<span class=\"trn\">JUL</span>";
        break;
    case 8:
        letters = "<span class=\"trn\">AGO</span>";
        break;
    case 9:
        letters = "<span class=\"trn\">SEP</span>";
        break;
    case 10:
        letters = "<span class=\"trn\">OCT</span>";
        break;
    case 11:
        letters = "<span class=\"trn\">NOV</span>";
        break;
    case 12:
        letters = "<span class=\"trn\">DIC</span>";
        break;
	}
	return letters;
}
function returnFullMonthName(month){
	var monthNames = ["<span class=\"trn\">Enero</span>", "<span class=\"trn\">Febrero</span>", "<span class=\"trn\">Marzo</span>", "<span class=\"trn\">Abril</span>", "<span class=\"trn\">Mayo</span>", "<span class=\"trn\">Junio</span>","<span class=\"trn\">Julio</span>", "<span class=\"trn\">Agosto</span>", "<span class=\"trn\">Septiembre</span>", "<span class=\"trn\">Ocutbre</span>", "<span class=\"trn\">Noviembre</span>", "<span class=\"trn\">Diciembre</span>"];
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
		loader.innerHTML='<div class="ball-loader ball-loader-small"></div>';
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
function traducirPosicionJugadorMesa(nombrePosicion){
	if(nombrePosicion=="goalkeeper"){return "<span class='trn'>Arquero</span>";}
	if(nombrePosicion=="defender"){return "<span class='trn'>Defensor</span>";}
	if(nombrePosicion=="midfielder"){return "<span class='trn'>Mediocampista</span>";}
	if(nombrePosicion=="forward"){return "<span class='trn'>Delantero</span>";}
	return "Otra";
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
			var prizeForWinner=(groupTable.group.users.length*groupTable.entry_cost_value);
		}else{
			var prizeForWinner=(groupTable.amount_of_users_playing*groupTable.entry_cost_value);
		}
		groupTable.prizes=[{"position": 1,"prize_value": prizeForWinner,"prize_type": groupTable.entry_cost_type}];
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
	t.setMinutes ( t.getMinutes() - diffMinutos ); // Llevo la hora que comparo a la hora de argentina
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
/* */
function addCoinsToWallet(amount){
	for(var i=0;i<parseInt(amount);i++){
		$("body").append('<img src="img/icons/coins/chip.svg" class="floating-coins chips" style="right:'+(50+(i/3))+'%;top:'+(50+(i/3))+'%;">');
	}
	animateAddCoins();
}
function addChipsToWallet(amount){
	for(var i=0;i<parseInt(amount);i++){
		$("body").append('<img src="img/icons/coins/chip.svg" class="floating-coins chips" style="right:'+(50+(i/3))+'%;top:'+(50+(i/3))+'%;">');
	}
	animateAddChips();
}
function animateAddCoins(){
	if($(".floating-coins").length>0){
		$(".floating-coins").last().animate({"right":"-50px","top":"-50px"}, 300, function() { $(this).remove();animateAddCoins();editXCoinsFromUsersWallet(1);})
	}
}
function animateAddChips(){
	if($(".floating-coins").length>0){
		$(".floating-coins").last().animate({"right":"-50px","top":"-50px"}, 300, function() { $(this).remove();animateAddChips();editXChipsFromUsersWallet(1);})
	}
}
/* */
function getTournamentNameById(id){
	switch(id){
		case 8:
			return "Torneo Argentino";
			break;
		case 9:
			return "Champions League";
			break;
		case 10:
			return "Torneo Chileno";
			break;
		case 11:
			return "Copa Libertadores";
			break;
		case 12:
			return "Liga Española";
			break;
		case 13:
			return "Premier League";
			break;
		case 3:
			return "Eliminatorias";
			break;
		case 15:
			return "Copa Sudamericana";
			break;
		default:
			return "Partidos";
	}
}
function oddOrEven(number){
	if(number%2==0){return "odd";}else{return "even";}
}
function parseImgUrlChipsOrCoins(which){
	if(which=="coins"){return "img/icons/coins/coins.png";}else{return "img/icons/coins/chip.svg";}
}

function parseTemplate(props, template)
{
	var result = template;
	for (var key in props) {
  	while(result.indexOf(key) >= 0) {
    	result = result.replace(key,String(props[key]));
    }
  }
  return result;
}
function clickOnLine(element){
	element.parentNode.getElementsByClassName("btn").item(0).click();
}
// Conexion
function checkConnection() {
	if(isProductionMode()){
		var state = navigator.connection.type;
		if (state.toUpperCase() == "NONE")
		{
			if(!window.internetAlert){
				window.internetAlert=true;
				avisoEmergenteJugaPlay("<span class='trn'>Sin conexión</span>","<p class='trn' >No se encontró una conexión a internet, por favor verifique la misma.</p>");
				closeLoadingAnimation();
			}
			return false;
		}
		else
		{
			if(window.timeToWait == null){
			window.timeToWait = setTimeout(function(){ toSlowInternet(); }, 30000);}
			window.internetAlert=false; // Ya anda el internet
			return true;
		}
	}else{
	return true;
}
}
function stopTimeToWait(){
	clearTimeout(window.timeToWait);
	window.timeToWait = null;
}
function toSlowInternet(){
	// Mensaje de aviso mas corta el loading
	closeLoadingAnimation();
	if(!window.internetAlertSlow){ // 1 Mensaje por pagina maximo
		window.internetAlertSlow=true;
		avisoEmergenteJugaPlay("<span class='trn'>Conexión muy lenta</span>","<p class='trn'>La conexión a internet está muy lenta. Es posible que no pueda disfrutar la experiencia Jugaplay debido a esta causa.</p>");
	}
}
function checkConnection2() {
	if(isProductionMode()){
		var state = navigator.connection.type;
		if (state.toUpperCase() == "NONE")
		{
			return false;
		}
		else
		{
			window.internetAlert=false;// Ya anda el internet
			return true;
		}
	}else{
	return true;
}
}
