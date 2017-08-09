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
	function payButton(type){
		//alert("Boton "+type+" cantidad:"+window.buyAmountOfCoins);
		if(type=="transfer" || type=="card" || type=="cash"){
			var inputs = document.getElementsByName('sel-pay-chanel');
			for(input in inputs){
				if(inputs[input].checked==true){
					if(inputs[input].parentNode.parentNode.style.display!="none"){
						makePayment(inputs[input].value)
					}else{
						avisoEmergenteJugaPlay("Seleccione un método de pago","<p>Para continuar tiene que seleccionar un método de pago. </p>");	
					}
					return;
				}
			}
			avisoEmergenteJugaPlay("Seleccione un método de pago","<p>Para continuar tiene que seleccionar un método de pago. </p>");
		}else{
			switch(type){
				case 'paypal':
					payGlobalPaypal();
   				break;
				case 'mpar':
					payArgentinaMercadoPago();
   				break; 
				case 'mpch':
					payChileMercadoPago();
   				break;  
				case 'mpmx':
					payMexicoMercadoPago();
   				break;   
				case 'bitcoin':
					payMexicoMercadoPago();
   				break; 
				case 'paysafe':
					payGlobalPaysfecard();
   				break; 
			}
		}
		// bitcoin paypal mpar mpch mpmx paysafe    transfer   card   cash
	}
	function makePayment(wich){
		var spl=wich.split("-");
		switch(spl[0]){
				case 'paypal':
					payGlobalPaypal();
   				break;
				case 'MPAR':
					payArgentinaMercadoPago();
   				break; 
				case 'MPCH':
					payChileMercadoPago();
   				break;  
				case 'MPMX':
					payMexicoMercadoPago();
   				break;    
				case 'PAYSAFE':
					payGlobalPaysfecard();
   				break; 
			}
		
	}
// Cuando comienza busca esto
function initializeCountrySelected(){
	if(getCookie("jp-UserLocationData-"+getUserJugaplayId())!=""){ // Tiene que estar asociado a un usario
		if(IsJsonString(getCookie("jp-UserLocationData-"+getUserJugaplayId()))){
			var saved=JSON.parse(getCookie("jp-UserLocationData-"+getUserJugaplayId()));
			selectDataCountry(saved.location.country_code)
		}
	}else{
		window.countrySelected='argentina';// Default
		getUserLocationDataFromServer();
	}
}
// http://localhost/JugaPlay/surveys/get_location.php
function getUserLocationDataFromServer(){
	var json=JSON.stringify( { "user_id":getUserJugaplayId() } );
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
	 	 if ((xmlhttp.readyState==4 && xmlhttp.status==200) ||  (xmlhttp.readyState==4 && xmlhttp.status==422) ||  (xmlhttp.readyState==4 && xmlhttp.status==403))
	    {
			var jsonStr=xmlhttp.responseText;
			if(IsJsonString(jsonStr)){ // Me fijo si dio un error, en el caso de que de le sigo mandando
				processUserLocationDataFromServer(JSON.parse(jsonStr),"get");
			}
	    }else if(xmlhttp.status==503 || xmlhttp.status==404 || xmlhttp.status==105){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlayConnectionError();
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("POST",getJPDataURL()+"get_location.php",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		//xmlhttp.withCredentials = "true";
		xmlhttp.send(json);		
}
function setUserLocationDataFromServer(){
	var json=JSON.stringify( { "user_id":getUserJugaplayId() } );
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
	 	 if ((xmlhttp.readyState==4 && xmlhttp.status==200) ||  (xmlhttp.readyState==4 && xmlhttp.status==422) ||  (xmlhttp.readyState==4 && xmlhttp.status==403))
	    {
			var jsonStr=xmlhttp.responseText;
			if(IsJsonString(jsonStr)){ // Me fijo si dio un error, en el caso de que de le sigo mandando
				processUserLocationDataFromServer(JSON.parse(jsonStr),"set");
			}
	    }else if(xmlhttp.status==503 || xmlhttp.status==404 || xmlhttp.status==105){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlayConnectionError();
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("POST",getJPDataURL()+"set_location.php",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		//xmlhttp.withCredentials = "true";
		xmlhttp.send(json);		
}
function processUserLocationDataFromServer(data,type){
	if(data.hasOwnProperty('error')){
		if(type!="set"){
			setUserLocationDataFromServer();
		}else{
			notifyCountryIpError();
		}
	}else{
		setCookie("jp-UserLocationData-"+getUserJugaplayId(), data, 120);
		selectDataCountry(data.location.country_code);
	}
}
function selectDataCountry(actualCountry){
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
}

// Ends location
function openBuyChips(){
changeContentOfPayment(window.countrySelected);// Default
}

function payArgentinaMercadoPago(){
	notifyPaymentStarted("MP ARG");
	var content='<form name="pg_frm" method="post" id="myPaymentForm" action="http://data.jugaplay.com/mercado_pago/button.php" >  <input type="hidden" name="mp_user" value="'+getUserJugaplayId()+'">  <input type="hidden" name="mp_currency" value="'+window.typeOfSelectedCoin+'">  <input type="hidden" name="mp_chips" value="'+window.buyAmountOfCoins+'"><button type="submit" class="btn btn-primary no-margin no-padding btn-style1">Comprar Monedas</button> </form>';
	openNewWindowWithCheckControl(content);
}
function payChileMercadoPago(){
	notifyPaymentStarted("MP CH");
	var content='<form name="pg_frm" method="post" id="myPaymentForm" action="http://data.jugaplay.com/mercado_pago/buttonChile.php" >  <input type="hidden" name="mp_user" value="'+getUserJugaplayId()+'"><input type="hidden" name="mp_currency" value="'+window.typeOfSelectedCoin+'">  <input type="hidden" name="mp_chips" value="'+window.buyAmountOfCoins+'"> <button type="submit" class="btn btn-primary no-margin no-padding btn-style1">Comprar Monedas</button> </form>';
	openNewWindowWithCheckControl(content);
}
function payMexicoMercadoPago(){
	notifyPaymentStarted("MP MX");
	var content='<form name="pg_frm" method="post" id="myPaymentForm" action="http://data.jugaplay.com/mercado_pago/buttonMexico.php" >  <input type="hidden" name="mp_user" value="'+getUserJugaplayId()+'"> <input type="hidden" name="mp_currency" value="'+window.typeOfSelectedCoin+'">  <input type="hidden" name="mp_chips" value="'+window.buyAmountOfCoins+'"> <button type="submit" class="btn btn-primary no-margin no-padding btn-style1">Comprar Monedas</button> </form>';
	openNewWindowWithCheckControl(content);
}
function payGlobalPaysfecard(){
	//alert("payGlobalPaysfecard");
	
	var content='<form name="pg_frm" method="post" id="myPaymentForm" action="http://data.jugaplay.com/paysafe/button.php" >  <input type="hidden" name="mp_user" value="'+getUserJugaplayId()+'"> <input type="hidden" name="mp_currency" value="USD">  <input type="hidden" name="mp_chips" value="'+window.buyAmountOfCoins+'"> <button type="submit" class="btn btn-primary no-margin no-padding btn-style1">Comprar Monedas</button> </form>';
	openNewWindowWithCheckControl(content);
	notifyPaymentStarted("Paysafe");
	
}
function payGlobalPaypal(){
	notifyPaymentStarted("Paypal");
	if(window.buyAmountOfCoins==10){var uss=3;}if(window.buyAmountOfCoins==20){var uss=6;}if(window.buyAmountOfCoins==50){var uss=12;}
	var contentP='<form name="pg_frm" method="post" id="myPaymentForm" action="https://www.paypal.com/cgi-bin/webscr" > <input type="hidden" name="cmd" value="_xclick"> <input type="hidden" name="business" value="info@jugaplay.com"> <input type="hidden" name="item_name" value="JP-'+window.buyAmountOfCoins+'"> <input type="hidden" name="amount" value="'+uss+'"> <input type="hidden" name="custom" value="'+getUserJugaplayId()+'"> <input type="hidden" name="currency_code" value="USD"> <input type="hidden" name="notify_url" value="http://data.jugaplay.com/paypal/receive-ipn.php"> <input type="hidden" name="return" value="http://www.jugaplay.com/paymentOk.html"> <input type="hidden" name="cancel_return" value="http://www.jugaplay.com/paymentCancel.html"> <input type="image" name="submit" src="https://www.paypalobjects.com/en_US/i/btn/btn_buynow_LG.gif" alt="PayPal - The safer, easier way to pay online"> </form>';
	openNewWindowWithCheckControl(contentP);
}

function notifyPaymentStarted(method){
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
}

function openNewWindowWithCheckControl(content){
	window.childForPaymentWindow = window.open('');
	window.childForPaymentWindow.document.body.innerHTML=content;
	window.childForPaymentWindow.document.getElementById("myPaymentForm").submit();
	window.timerForPaymentWindow = setInterval(checkChildWindowOpened, 500);
}
function checkChildWindowOpened() {
	// Verificar no mas de un aviso!! 
    if (window.childForPaymentWindow.closed) {
		clearInterval(window.timerForPaymentWindow);
		var element =  document.getElementById('payCancelMsgPop');
		if (typeof(element) != 'undefined' && element != null){
			}else{
			closeAllOverLapseWindow();
			avisoEmergenteJugaPlay("Pago cancelado","<p id='payCancelMsgPop'>El pago no se pudo procesar</p>"); 
		}
    }
}
function paymentWentWrong() {
		clearInterval(window.timerForPaymentWindow);
		closeAllOverLapseWindow();
        avisoEmergenteJugaPlay("Problema temporal con la conexión","<p>No se ha podido finalizar el pago debido a un problema temporal con la conexión.</p><p>Para completar el pago vuelva a completar el proceso.</p><p>Si persiste este problema, póngase en contacto con el servicio de soporte técnico a info@jugaplay.com.</p>"); 
}
function paymentAccepted() {
		clearInterval(window.timerForPaymentWindow);
		closeAllOverLapseWindow();
		editXChipsFromUsersWallet(window.buyAmountOfCoins);
        avisoEmergenteJugaPlay("Pago aceptado","El pago se proceso correctamente, se agregaron <b>"+window.buyAmountOfCoins+"</b> <img src='img/icons/coins/chip.svg' width='20px'> a su cuenta"); 
}
function paymentWait() {
		clearInterval(window.timerForPaymentWindow);
		closeAllOverLapseWindow();
        avisoEmergenteJugaPlay("Pago en espera","El pago esta en espera, una vez procesado se acreditaran las monedas"); 
}
/* Nuevo para las fichas, cambio el function buyChips(){ */
function buyChips(){
	var useId='BS-FL-'+Math.floor((Math.random() * 1000000000) + 1);
	BootstrapDialog.show({
			 id: useId,
			 cssClass: 'filter-pop-up fade',
			 title: '<h1>Conseguir Fichas<img src="img/icons/coins/chip.svg" style="margin-right: 0px;margin-top: -10px;margin-bottom: -3px;margin-left: 5px;width: 20px;"></h1>',
            message: '<p><b style=" font-size: 2.5em; margin-right: 15%;">1-</b> <i class="fa fa-file-text-o fa-2x" aria-hidden="true"></i> <i class="fa fa-arrow-right fa-2x" aria-hidden="true"></i><img src="img/icons/coins/chip.svg" style="margin-right: 0px;margin-top: -10px;margin-bottom: -3px;margin-left: 5px;width: 30px;"></span></span><br>Por cada encuesta te regalamos una ficha <br><small>6 Preguntas (aprox)</small></p><p style="text-align: center;"><button class="btn btn-default poll" onClick="buyChipsforPolls(\''+useId+'\');" ><i class="fa fa-file-text-o" aria-hidden="true"></i> Encuestas </button></p><p><b style=" font-size: 2.5em; margin-right: 15%;">2-</b> <i class="fa fa-shopping-cart fa-3x" aria-hidden="true"></i><i class="fa fa-arrow-right fa-2x" aria-hidden="true"></i><img src="img/icons/coins/5chips.png" style="margin-right: 0px;margin-top: -10px;margin-bottom: -3px;margin-left: 5px;width: 20px;"><img src="img/icons/coins/5chips.png" style="margin-right: 0px;/* margin-top: -10px; */margin-bottom: -3px;margin-left: -5px;width: 20px;"><img src="img/icons/coins/5chips.png" style="margin-right: 0px;margin-top: -10px;margin-bottom: -3px;margin-left: -5px;width: 18px;"><br>Compra packs y juga sin parar<br><small>Pagos en efectivo, tarjeta, bitcoins y mucho más</small></p><p style="text-align: center;"><button class="btn btn-default poll" onClick="buyChipsforMoney(\''+useId+'\');" ><i class="fa fa-shopping-cart" aria-hidden="true"></i> Comprar</button><p>'	
		 });  
}
function createButtonForPoll(useId){ // .not-available
	if(isSurveyMoreThan12OrPosible()){
		return '';
	}else{
		return '<button class="btn btn-default poll not-available" onClick="buyChipsforPolls(\''+useId+'\');" ><i class="fa fa-file-text-o" aria-hidden="true"></i> Encuesta</button>';
	}
}

function buyChipsforPolls(windowToClose){
	 closeFilterWindow(windowToClose);
	 window.location='surveys.html';
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
function notifyCountryIpError(){
	var contenidoContacto= "Error en IP data-- USU id: "+window.userDataJugaPlay.id+ "-- Mail ingresado: "+getUserJugaplayEmail();
	var json=JSON.stringify( { "comment": { "sender_name": "IP DATA","sender_mail": getUserJugaplayEmail(),"content": contenidoContacto } } );
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
}