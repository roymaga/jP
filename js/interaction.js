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
		setTimeout(function(){if (typeof(element) != 'undefined' && element != null){ document.getElementById('boton-close-loading').click();}}, 2000);
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
function avisoEmergenteJugaPlayMalInternet(titulo,texto){
		if(window.internetCheckedSlow==0){
		 BootstrapDialog.show({
			 cssClass: 'general-modal-msj',
			 title: "<H1>"+titulo+"</H1>",
            message: texto,
			buttons: [{
                label: 'Aceptar',
				id:'boton-panel-registro-aviso-error-pop-up',
                action: function(dialogItself){
					closeBadInternetAdvertise(dialogItself);
                }
            }]		 
		 });
		 window.internetCheckedSlow=1;
		 return false;
		}
	}
function closeBadInternetAdvertise(dialogItself){
	window.internetCheckedSlow=0;
	dialogItself.close();
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
function clubGetLogoName(name){
		id=traducirNombreAEquipoId(name);
		return clubGetLogo(id);	
}
function imageExists(image_url){
    var http = new XMLHttpRequest();
    http.open('HEAD', image_url, false);
    http.send();
    return http.status != 404;
}
// Para borrar
function traducirNombreAEquipoId(name){
	var id=0;
	switch(name){
    case "Independiente":
        id = 1;
        break;
	case "Racing":
        id = 2;
        break;
	case "San Lorenzo":
        id = 3;
        break;
	case "Boca Juniors":
        id = 4;
        break;
	case "River Plate":
        id = 5;
        break;
	case "Huracan":
        id = 6;
        break;
	case "Estudiantes LP":
        id = 7;
        break;
	case "Gimnasia LP":
        id = 3;
        break;
	case "Aldosivi":
        id = 3;
        break;
	case "Arsenal":
        id = 3;
        break;
	case "Atlético Tucumán":
        id = 3;
        break;
	case "Atlético Rafaela":
        id = 3;
        break;
	case "Belgrano":
        id = 3;
        break;
	case "Colón":
        id = 3;
        break;
	case "Defensa y Justicia":
        id = 3;
        break;
	case "Godoy Cruz":
        id = 3;
        break;
	case "Lanús":
        id = 3;
        break;
	case "Newell's Old Boys":
        id = 3;
        break;
	case "Olimpo":
        id = 3;
        break;
	case "Patronato":
        id = 3;
        break;
	case "Quilmes":
        id = 3;
        break;
	case "Rosario Central":
        id = 3;
        break;
	case "San Martín (SJ)":
        id = 3;
        break;
	case "Sarmiento":
        id = 3;
        break;
	case "Temperley":
        id = 3;
        break;
	case "Tigre":
        id = 3;
        break;
	case "Unión":
        id = 3;
        break;
	case "Vélez":
        id = 3;
        break;
	case "Argentinos Juniors":
        id = 3;
        break;
	case "Atlético Nacional de Medellín":
        id = 3;
        break;
	case "Liga de Quito":
        id = 3;
        break;
	case "Bolívar":
        id = 3;
        break;
	case "Deportivo Cali":
        id = 3;
        break;
	case "Atlético Nacional":
        id = 3;
        break;
	case "Trujillanos":
        id = 3;
        break;
	case "Peñarol":
        id = 3;
        break;
	case "Toluca":
        id = 3;
        break;
	case "Sao Paulo":// Corte 39
        id = 3;
        break;
	case "Gremio":// Arranca 41
        id = 3;
        break;
	case "The Strongest":
        id = 3;
        break;
	case "River Plate (Ur)":
        id = 3;
        break;
	case "Colo Colo":
        id = 3;
        break;
	case "Palestino":
        id = 3;
        break;
	case "U de Chile":
        id = 3;
        break;
	case "U Catolica":
        id = 3;
        break;
	case "San Luis":
        id = 3;
        break;
	case "Unión Española":
        id = 3;
        break;
	case "Santiago Wanderers":
        id = 3;
        break;
	case "O Higgins":
        id = 3;
        break;
	case "Cobresal":
        id = 3;
        break;
	case "U. La Calera":
        id = 3;
        break;
	case "U. Concepción":
        id = 3;
        break;
	case "Atlético Mineiro":
        id = 3;
        break;
	case "Cerro Porteño":
        id = 3;
        break;
	case "Independiente del Valle":
        id = 3;
        break;
	case "Audax I":
        id = 3;
        break;
	case "Huachipato":
        id = 3;
        break;
	case "Atletico Madrid":
        id = 3;
        break;
	case "Real Madrid":
        id = 3;
        break;
	case "Manchester City":
        id = 3;
        break;
	case "Bayern Munich":
        id = 3;
        break;
	}
	return id;
}
