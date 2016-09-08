// JavaScript Document
// Interaction includes: Loading + Date view + simple pop ups
// Dependency -- dialog-master

// Load functions animation depends of dialog-master
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

// Show days in diferent ways 
function dateFormatView(d){
	//2016-01-05T20:14:00.919Z
	//01234567890123456789
	dia= d.substring(8, 10);// Dia del mes
	mes= d.substring(5, 7);// que mes
	hora= d.substring(11, 13);// hora
	minutos=d.substring(14, 16);// minutos
    return hora+':'+minutos+' Hs <b>'+dia+'/'+lettersOfMonth(mes)+'</b>';
}
function dateFormatViewDay(d){
	//2016-01-05T20:14:00.919Z
	//01234567890123456789
	dia= d.substring(8, 10);// Dia del mes
	mes= d.substring(5, 7);// que mes
	hora= d.substring(11, 13);// hora
	minutos=d.substring(14, 16);// minutos
    return dia+'/'+lettersOfMonth(mes);
}
function dateFormatViewNormal(d){
	//14/01/2016 - 22:10
	//012345678901234567
	dia= d.substring(0, 2);// Dia del mes
	mes= d.substring(3, 5);// que mes
	hora= d.substring(13, 15);// hora
	minutos=d.substring(16);// minutos
    return hora+':'+minutos+' Hs</br><b>'+dia+'/'+lettersOfMonth(mes)+'</b>';
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