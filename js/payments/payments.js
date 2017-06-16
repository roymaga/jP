// JavaScript Document
// window.countrySelected 'argentina' 'chile' 'otro'
// Tipos de pagos hago una opcion rapida
window.onload=setTimeout(function(){initializeCountrySelected();},1000);
function selectCoins(element,amount){
		window.buyAmountOfCoins=amount;
		$(".coins-pack").removeClass("selected");
		$(element).addClass("selected");
		$(".amout-of-chips").html(amount);
	}
	
function initializeCountrySelected(){
	if(getCookie("jp-user-country")!=""){
		window.countrySelected=getCookie("jp-user-country");
	}else{
	window.countrySelected='otro';// Default
	$.get("http://ipinfo.io", function(response) {
		var actualCountry=response.country;
		if(actualCountry=="CL"){// Entra desde chile
			var country="chile";
		}else if(actualCountry=="AR"){// Entra desde argentina
			var country="argentina";
		}else if(actualCountry=="PE"){// Entra desde Peru
			var country="peru";
		}else if(actualCountry=="MX"){// Entra desde Mexico
			var country="mexico";
		}else{// Entra desde un pais global
			var country="otro";
		}
		window.countrySelected=country;
		setCookie("jp-user-country", country, 180); 
	}, "jsonp");
	}
}
function openBuyChips(){
changeContentOfPayment(window.countrySelected);// Default
}
function notifyPaymentStarted(method){
	if(checkConnection2()){
	var contenidoContacto= "Quiere pagar con "+method+" pais:"+window.countrySelected+"--Moneda"+window.typeOfSelectedCoin+"--Canitdad "+window.buyAmountOfCoins+"-- mail de contacto: "+getUserJugaplayEmail()+ "-- USU id: "+window.userDataJugaPlay.id+ "-- Mail ingresado: "+getUserJugaplayEmail();
	var json=JSON.stringify( { "comment": { "sender_name": "Payment","sender_mail": getUserJugaplayEmail(),"content": contenidoContacto } } );
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
			
	    }else if(xmlhttp.status==503 || xmlhttp.status==404 || xmlhttp.status==105){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlayConnectionError();
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("POST",getJPApiURL()+"comments",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send(json);
	}else{
		setTimeout(function(){notifyPaymentStarted(method);}, 1000);
	}
}


function buyChips(){
	var useId='BS-FL-'+Math.floor((Math.random() * 1000000000) + 1);
	BootstrapDialog.show({
			 id: useId,
			 cssClass: 'filter-pop-up fade',
			 title: '<h1>Conseguir Fichas<img src="img/icons/coins/chip.svg" style="margin-right: 0px;margin-top: -10px;margin-bottom: -3px;margin-left: 5px;width: 20px;"></h1>',
            message: '<p><b style=" font-size: 2.5em; margin-right: 15%;">1-</b> <i class="fa fa-file-text-o fa-2x" aria-hidden="true"></i> <i class="fa fa-arrow-right fa-2x" aria-hidden="true"></i><img src="img/icons/coins/chip.svg" style="margin-right: 0px;margin-top: -10px;margin-bottom: -3px;margin-left: 5px;width: 30px;"></span></span><br>Por cada encuesta te regalamos una ficha <br><small>6 Preguntas (aprox)</small><small style="margin-left: 15px;"> Máximo 1 encuesta por día</small></p><p style="text-align: center;">'+createButtonForPoll(useId)+'</p><p><b style=" font-size: 2.5em; margin-right: 15%;">2-</b> <i class="fa fa-shopping-cart fa-3x" aria-hidden="true"></i><i class="fa fa-arrow-right fa-2x" aria-hidden="true"></i><img src="img/icons/coins/5chips.png" style="margin-right: 0px;margin-top: -10px;margin-bottom: -3px;margin-left: 5px;width: 20px;"><img src="img/icons/coins/5chips.png" style="margin-right: 0px;/* margin-top: -10px; */margin-bottom: -3px;margin-left: -5px;width: 20px;"><img src="img/icons/coins/5chips.png" style="margin-right: 0px;margin-top: -10px;margin-bottom: -3px;margin-left: -5px;width: 18px;"><br>Compra packs y juga sin parar<br><small>Pagos en efectivo, tarjeta, bitcoins y mucho más</small></p><p style="text-align: center;"><button class="btn btn-default poll" onClick="buyChipsforMoney(\''+useId+'\');" ><i class="fa fa-shopping-cart" aria-hidden="true"></i> Comprar</button><p>'	
		 });  
}
function createButtonForPoll(useId){ // .not-available
	if(isSurveyMoreThan12OrPosible()){
		return '<button class="btn btn-default poll" onClick="buyChipsforPolls(\''+useId+'\');" ><i class="fa fa-file-text-o" aria-hidden="true"></i> Encuesta <span style="    margin-left: 15px;">1 <img src="img/icons/coins/chip.svg" style="margin-right: 0px;margin-top: -10px;margin-bottom: -3px;width: 20px;"></span></button>';
	}else{
		return '<button class="btn btn-default poll not-available" onClick="buyChipsforPolls(\''+useId+'\');" ><i class="fa fa-file-text-o" aria-hidden="true"></i> Encuesta</button>';
	}
}

function buyChipsforPolls(windowToClose){
	//alert("Entran las polls");
	 closeFilterWindow(windowToClose);
	 tryToDoSurvey();
	// Ver si puede comprar o no
}
/* Fin Nuevo para las fichas */
function buyChipsforMoney(windowToClose){
	closeFilterWindow(windowToClose);
	window.buyAmountOfCoins=20;
	var content='<div class="vertical-align"> <div class="col-xs-6 text-left"> <div onclick="selectCountryPayment();"> <b>Pais:</b> <img class="count-flag-paym" src="img/icons/flags/chile.jpg" style="width: 40px;"> <i class="fa fa-caret-down" aria-hidden="true"></i> </div></div><div class="col-xs-6 text-right" style="padding-right:0;cursor:pointer;"> <div class="text-center count-coin-paym">Moneda <br><b>$ CLP</b></div></div></div><div class="container home-big-btns padding-tb-25"> <div class="row" style="margin-right: -15px; margin-left: -15px;"> <div class="col-xs-6 coins-pack" onClick="selectCoins(this,10)"> <div class="pic"><img src="img/icons/buy/pack10.jpg"></div><a id="chips-price-pack1">Pack 10 <strong>$30</strong></a> </div><div class="col-xs-6 coins-pack selected" onClick="selectCoins(this,20);"> <div class="pic"><img src="img/icons/buy/pack20.jpg"></div><a id="chips-price-pack2">Pack 20 <strong>$50</strong></a> </div><div class="col-xs-6 coins-pack" onClick="selectCoins(this,50);"> <div class="pic"><img src="img/icons/buy/pack50.jpg"></div><a id="chips-price-pack3">Pack 50 <strong>$100</strong></a> </div></div></div><a class="btn btn-lg btn-block btn-secundary btn-astp transition" onclick="payButtonApp();"> <span class="text-uppercase">Comprar <span class="amout-of-chips">20</span> Fichas</span> </a> <br><p class="small helpblock text-center"> <input type="checkbox" checked="" disabled=""> El pago confirma que está de acuerdo con nuestros <a target="_blank" href="terms-conditions.html">términos y condiciones</a>. </p>';
	paymentShowBuyOptions(content);
}
function paymentShowBuyOptions(content){
		 BootstrapDialog.show({
			 cssClass: 'general-modal-msj payment',
			 title: '<H1>Comprar Fichas <img src="img/icons/coins/chip.svg" style="margin-right: 0px;margin-top: -10px;margin-bottom: -3px;margin-left: 5px;width: 30px;"></H1>',
            message: content		 
		 });
		 setTimeout(function(){changeContentOfPayment(window.countrySelected);}, 1000);
		 return false;
	}
function payButtonApp(){
	notifyPaymentStarted("App");
	avisoEmergenteJugaPlay("Próximamente","La opción de comprar fichas no esta disponible por el momento. La misma estará disponible dentro de poco tiempo.");
}