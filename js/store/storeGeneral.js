// JavaScript Document
setTimeout(function(){startStoreJs();}, 500);
function startStoreJs(){
	if(window.IsLoggedInVar && checkConnection() && $("#show-store-container").length>0){
		showPrizesToChengeInStore();
	}else{
		setTimeout(function(){startStoreJs()},100);
	}
}
function showPrizesToChengeInStore(){
		var previousStoresLoad=getCookie("storesShow-Jp");
		if(previousStoresLoad.length>4 && IsJsonString(previousStoresLoad)){
			loadStore(JSON.parse(previousStoresLoad));
			showAvailablePrizesForStore();
		}else{
			 showAvailablePrizesForStore();
		}
}
function showAvailablePrizesForStore(){
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
			var jsonStr=xmlhttp.responseText;
			setCookie("storesShow-Jp", jsonStr, 120);
			var json=JSON.stringify(jsonStr);
			var servidor=JSON.parse(json);
			var doble=JSON.parse(servidor);
			loadStore(doble);
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404 || xmlhttp.status==105){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlayConnectionError();
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("GET","http://data.jugaplay.com/api/store/prizes.php",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		//xmlhttp.withCredentials = "true";
		xmlhttp.send();
}
function loadStore(preLoadStore){
	var textOfStore='<div class="row text-center rewards-container">';
	for(prize in preLoadStore){
		textOfStore+=returnPrizeToShow(preLoadStore[prize]);
		if(prize%2!=0){textOfStore+='</div><div class="row text-center rewards-container">'}
	}
	textOfStore+='</div>';
	document.getElementById("show-store-container").innerHTML=textOfStore;
	checkLanguageElement(document.getElementById("show-store-container"));
}
function returnPrizeToShow(prize){
	return '<div class="col-xs-6 reward"><div class="pic"><img src="'+prize.img+'" class="full-width"></div><div class="text-center"><h5>'+prize.title+'</h5> <h4>'+prize.country+'</h4><p class="text-color3">'+prize.price+' <img src="img/icons/coins/coins.png" width="25px"> </p><button class="btn btn-primary btn-style3 trn" onClick="askForPrize('+prize.price+',\''+prize.title+prize.country+'\');" type="submit">Canjear</button></div></div>';
}
// Change prize
function askForPrize(price,detail){
	if(userCanSpentXCoins(price)){// El precio de las monedas es mas alto de lo que tiene el jugador
		enviarMensajeDePremios(price,detail);
		}else{
			avisoEmergenteJugaPlay("<span class='trn'>Monedas Insuficientes</span>","<p class='trn'>No tiene las monedas suficientes para realizar este canje, siga jugando para acumular las mismas.</p>");
	}
}
function enviarMensajeDePremios(price,detail){
	BootstrapDialog.show({
			 cssClass: 'general-modal-msj',
			 title: "<H1 class='trn'>Confirmación necesaria</H1>",
       message: '<p class="trn">Confirme los datos previo a realizar el canje:</p><p><b><span class="trn">Premio</span>:</b> '+detail+'</p><p><b><span class="trn">Precio</span>:</b> '+price+'</p><p><b><span class="trn">Correo electrónico</span>: </b>'+window.userDataJugaPlay.email+'</p>',
			buttons: [{
                label: '<span class="trn">Cancelar</span>',
								cssClass: 'btn-warning',
								id:'boton-panel-registro-aviso-error-pop-up',
                action: function(dialogItself){
									dialogItself.close();
								}
				},{
		        label: ' <span class="trn">Canjear</span>',
						cssClass: 'btn-primary',
		                action: function(dialogItself){
											var contenidoContacto="Precio: "+price+"  Detalle: "+detail+ "-- mail de contacto: "+window.userDataJugaPlay.email+ "-- USU id: "+window.userDataJugaPlay.id;
											var json=JSON.stringify( { "comment": { "sender_name": window.userDataJugaPlay.email,"sender_mail": window.userDataJugaPlay.email,"content": contenidoContacto } } );
											mensajeAlServidorCanjearPremios(json);
											dialogItself.close();
					}
				}
			],onshown: function(dialogItself) {
									checkLanguageItem(dialogItself);
								}
		 });
	//dialog.close;
}
function mensajeAlServidorCanjearPremios(json){
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
			avisoEmergenteJugaPlay("<span class='trn'>Premio en proceso</span>","<p><span class='trn'>Su premio está siendo procesado. Se le notificara por mail a</span> "+window.userDataJugaPlay.email+" <span class='trn'>cuando este procesado, se le descontaran las monedas equivalentes al premio de su monedero.</span></p>");

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
