// JavaScript Document
function selectCountryPayment(){
	var listadoPaisesDisponibles=["argentina","chile","mexico","peru"];
	var content='<div class="list-style1">'+returnPosibleCountries(listadoPaisesDisponibles)+'</div>';
	var title="Elegir pais";
	openFilterWindow(title,content);
}
// .count-flag-paym src
// .count-coin-paym -- Moneda<br><b>USS <i class="fa fa-caret-down" aria-hidden="true"></i></b>
// 
function returnPosibleCountries(listadoPaises){
	var aContent='';
	for (country in listadoPaises){
		if(listadoPaises[country]==window.countrySelected){
				aContent+='<a onClick="selectCountry(this,\''+listadoPaises[country]+'\');" class="selected"><img src="img/icons/flags/'+listadoPaises[country]+'.jpg" style="width:50px;"> '+capitalizeFirstLetter(listadoPaises[country])+'</a>';
			}
		else{aContent+='<a onClick="selectCountry(this,\''+listadoPaises[country]+'\');"><img src="img/icons/flags/'+listadoPaises[country]+'.jpg" style="width:50px;"> '+capitalizeFirstLetter(listadoPaises[country])+'</a>';}
	}
	// Agrego otro pais fuera del listado como algo general
	if('otro'==window.countrySelected){
				aContent+='<a onClick="selectCountry(this,\'otro\');" class="selected"><img src="img/icons/flags/all.jpg" style="width:50px;"> Otros paises</a>';
			}
	else{aContent+='<a onClick="selectCountry(this,\'otro\');"><img src="img/icons/flags/all.jpg" style="width:50px;"> Otros paises</a>';}
	// Termina de agregar el contenido de aContent
	return aContent;
}
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function selectCountry(element,country){
	if(element.className!="selected"){
		window.countrySelected=country;
		contenedor=element.parentNode.getElementsByClassName("selected");
		for(a in contenedor){
			contenedor[a].className="";
		}
		element.className="selected";
		changeContentOfPayment(country);
	}
}
function changeContentOfPayment(country){
	window.countrySelected=country;
	setCookie("jp-user-country", country, 180);
	switch(country) {
    case 'argentina':
	$(".count-flag-paym").attr("src","img/icons/flags/argentina.jpg");
	setCoinsType('ARS');
	$(".payment-methods .arg").show(); 
	
        break;
    case 'chile':
	$(".count-flag-paym").attr("src","img/icons/flags/chile.jpg");
	setCoinsType('CLP');
	
        
        break;
	case 'mexico':
	$(".count-flag-paym").attr("src","img/icons/flags/mexico.jpg");
	setCoinsType('MXN');
	
        
        break;
	case 'peru':
	$(".count-flag-paym").attr("src","img/icons/flags/peru.jpg");
	setCoinsType('PEN');
	
        
        break;
    default:
	$(".count-flag-paym").attr("src","img/icons/flags/all.jpg");
	setCoinsType('USD');
	
        
	}
}
function setCoinsType(type){
	switch(type) {
		// .count-coin-paym -- 
     case 'ARS': // Peso Argentino
	$(".count-coin-paym").html('Moneda<br><b>AR$</b>');
	window.typeOfSelectedCoin="ARS";
	$("#chips-price-pack1").html("Pack 100 <strong>$50</strong>");
	$("#chips-price-pack2").html("Pack 200 <strong>$100</strong>");
	$("#chips-price-pack3").html("Pack 500 <strong>$200</strong>");
        break;
    case 'CLP': // Peso Chileno
	$(".count-coin-paym").html('Moneda<br><b>$ CLP</b>');
	window.typeOfSelectedCoin="CLP";
	$("#chips-price-pack1").html("Pack 100 <strong>$2.000</strong>");
	$("#chips-price-pack2").html("Pack 200 <strong>$4.000</strong>");
	$("#chips-price-pack3").html("Pack 500 <strong>$8.000</strong>");
        
        break;
	case 'MXN': // Peso mexicano 100
	$(".count-coin-paym").html('Moneda<br><b>$ MXN</b>');
	window.typeOfSelectedCoin="MXN";
	$("#chips-price-pack1").html("Pack 100 <strong>$50</strong>");
	$("#chips-price-pack2").html("Pack 200 <strong>$100</strong>");
	$("#chips-price-pack3").html("Pack 500 <strong>$200</strong>");        
        break;
	case 'PEN': // Sol Peruano 20, 50
	$(".count-coin-paym").html('Moneda<br><b>$ PEN</b>');
	window.typeOfSelectedCoin="PEN";
	$("#chips-price-pack1").html("Pack 100 <strong>$10</strong>");
	$("#chips-price-pack2").html("Pack 200 <strong>$20</strong>");
	$("#chips-price-pack3").html("Pack 500 <strong>$40</strong>");
        
        break;
	case 'USD':
	$(".count-coin-paym").html('Moneda<br><b>U$D</b>');
	window.typeOfSelectedCoin="USD";
	$("#chips-price-pack1").html("Pack 100 <strong>$3</strong>");
	$("#chips-price-pack2").html("Pack 200 <strong>$6</strong>");
	$("#chips-price-pack3").html("Pack 500 <strong>$12</strong>");
     break;     
        
	}
}