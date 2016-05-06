// JavaScript Document
/*window.onload=startLoadingStore();
function startLoadingStore(){
preLoadStore1=[{"img":"http://jugaplay.com/img/premios/store/botines-tiempo-rio.jpg", "title":"Botines Nike", "price":"1200","country":"Argentina","detail":null,"duration":null },{"img":"http://jugaplay.com/img/premios/store/botines-tiempo-rio.jpg", "title":"Botines Nike", "price":"1200","country":"Argentina","detail":null,"duration":null },{"img":"http://jugaplay.com/img/premios/store/botines-tiempo-rio.jpg", "title":"Botines Nike", "price":"1200","country":"Argentina","detail":null,"duration":null },{"img":"http://jugaplay.com/img/premios/store/botines-tiempo-rio.jpg", "title":"Botines Nike", "price":"1200","country":"Argentina","detail":null,"duration":null },{"img":"http://jugaplay.com/img/premios/store/botines-tiempo-rio.jpg", "title":"Botines Nike", "price":"1200","country":"Argentina","detail":null,"duration":null },{"img":"http://jugaplay.com/img/premios/store/botines-tiempo-rio.jpg", "title":"Botines Nike", "price":"1200","country":"Argentina","detail":null,"duration":null },{"img":"http://jugaplay.com/img/premios/store/botines-tiempo-rio.jpg", "title":"Botines Nike", "price":"1200","country":"Argentina","detail":null,"duration":null },{"img":"http://jugaplay.com/img/premios/store/botines-tiempo-rio.jpg", "title":"Botines Nike", "price":"1200","country":"Argentina","detail":null,"duration":null },{"img":"http://jugaplay.com/img/premios/store/botines-tiempo-rio.jpg", "title":"Botines Nike", "price":"1200","country":"Argentina","detail":null,"duration":null },{"img":"http://jugaplay.com/img/premios/store/botines-tiempo-rio.jpg", "title":"Botines Nike", "price":"1200","country":"Argentina","detail":null,"duration":null },{"img":"http://jugaplay.com/img/premios/store/botines-tiempo-rio.jpg", "title":"Botines Nike", "price":"1200","country":"Argentina","detail":null,"duration":null },{"img":"http://jugaplay.com/img/premios/store/botines-tiempo-rio.jpg", "title":"Botines Nike", "price":"1200","country":"Argentina","detail":null,"duration":null }];
loadStore(preLoadStore1);
}*/
window.onload=showPrizesToChengeInStore();
function showPrizesToChengeInStore(){
	previousStoresLoad=getCookie("storesShow-Jp");
	if(previousStoresLoad.length>4){		
			var json=JSON.stringify(previousStoresLoad);
			var servidor=JSON.parse(json);
			var doble=JSON.parse(servidor);
			loadStore(doble);
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
			jsonStr=xmlhttp.responseText;
			setCookie("storesShow-Jp", jsonStr, 120);
			var json=JSON.stringify(jsonStr);
			var servidor=JSON.parse(json);
			var doble=JSON.parse(servidor);
			loadStore(doble);
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlay("ERROR DE CONEXIÓN","<p>Hubo un error de conexió intente nuevamente</p>");
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("GET","http://data.jugaplay.com/api/store/prizes.php",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		//xmlhttp.withCredentials = "true";
		xmlhttp.send();	
}
function loadStore(preLoadStore){
	textOfStore='<div class="row text-center rewards-container">';
	for(prize in preLoadStore){
		textOfStore+=returnPrizeToShow(preLoadStore[prize]);
		if(prize%2!=0){textOfStore+='</div><div class="row text-center rewards-container">'}
	}
	textOfStore+='</div>';
	document.getElementById("show-store-container").innerHTML=textOfStore;
}
function returnPrizeToShow(prize){
	return '<div class="col-xs-6 reward"><img src="'+prize.img+'" class="full-width"><h5>'+prize.title+'</h5> <h4>'+prize.country+'</h4><p class="text-color3">'+prize.price+' <img src="img/icons/coins/coins.gif" width="15px"> </p><button class="btn btn-primary btn-style3" onClick="askForPrize('+prize.price+',\''+prize.title+prize.country+'\');" type="submit">Canjear</button></div>'
}

// Change prize
function askForPrize(price,detail){
	if(userCanSpentXCoins(price)){// El precio de las monedas es mas alto de lo que tiene el jugador
		enviarMensajeDePremios(price,detail);	
		}else{
			avisoEmergenteJugaPlay("Monedas insuficientes","<p>No tiene las monedas suficientes para realizar este canje. Haga clic en el monedero para conocer las formas de conseguir monedas.</p>");	
	}
}
function enviarMensajeDePremios(price,detail){
	contenidoContacto="Precio: "+price+"  Detalle: "+detail+ "-- mail de contacto: "+window.userDataJugaPlay.email+ "-- USU id: "+window.userDataJugaPlay.id;
	//alert(contenidoContacto +nombreContacto+ mailContacto);
		json=JSON.stringify( { "comment": { "sender_name": window.userDataJugaPlay.email,"sender_mail": window.userDataJugaPlay.email,"content": contenidoContacto } } );
		mensajeAlServidorCanjearPremios(json);
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
			avisoEmergenteJugaPlay("Premio en proceso","<p>Su premio está siendo procesado. Se le notificara por mail a "+window.userDataJugaPlay.email+" cuando este procesado y se le descontaran las monedas equivalentes al premio de su Monedero.</p>");
			
	    }else if(xmlhttp.status==503 || xmlhttp.status==404){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlay("ERROR DE CONEXI&Oacute;N","<p>Hubo un error de conexi&oacute; intente nuevamente</p>");
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("POST","http://app.jugaplay.com/api/v1/comments",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send(json);		
}