// JavaScript Document
/* Algoritmo de muestra, si es conveniente o no mostrar despues de la jugada el X2 -- Es uno por dia aprox o 5 Mesas */
if(IsJsonString(getCookie("x2Alert-lastShown-Jp"+getUserJugaplayId())) && IsJsonString(getCookie("x2Alert-countDayShown-Jp"+getUserJugaplayId()))){
	window.lastx2AlertlastShown=JSON.parse(getCookie("x2Alert-lastShown-Jp"+getUserJugaplayId()));
	window.lastx2countDayShown=JSON.parse(getCookie("x2Alert-countDayShown-Jp"+getUserJugaplayId()));
}else{
	window.lastx2AlertlastShown=new Date(1401507903635);// 2014
	window.lastx2countDayShown=0;
}
function hasToShowX2orNot(table_id){// Veo si lo traigo de memoria o no
	var previousTablesLoad=getCookie("tablesToPlay-Jp");
	if(previousTablesLoad.length>4 && IsJsonString(previousTablesLoad)){
			var tablesInContainer=JSON.parse(previousTablesLoad);
			for(table in tablesInContainer){
				if(tablesInContainer[table]['id'] == table_id){
					var multiplier_chips_cost=tablesInContainer[table]['multiplier_chips_cost'];
					var private=tablesInContainer[table]['private'];
				}

			}
	}
	//  multiplier_chips_cost > 0
	if(multiplier_chips_cost>0 && !private){window.lastx2countDayShown++;}
	if((secondsFromNow(window.lastx2AlertlastShown)>43200 ||  window.lastx2countDayShown>5) && multiplier_chips_cost>0 && !private){// Si tiene mas de 12 Hs 43200 segundos
			resetValuesOfHasToShowX2orNot();
			messageForBuyX2(table_id, multiplier_chips_cost);
		return true;
	}else{
		return false;
	}
}
function resetValuesOfHasToShowX2orNot(){
	window.lastx2AlertlastShown= new Date();
	window.lastx2countDayShown=0;
	setCookie("x2Alert-lastShown-Jp"+getUserJugaplayId(), JSON.stringify(window.lastx2AlertlastShown), 120);
	setCookie("x2Alert-countDayShown-Jp"+getUserJugaplayId(), JSON.stringify(window.lastx2countDayShown), 120);
}
/* Multiplier Chips */
function playTurboOption(table_id, bet_multiplier , multiplier_chips_cost, has_been_played_by_user){
	// /v1/plays/:table_id/multiply/:multiplier
	if(bet_multiplier==null && has_been_played_by_user==true){
		 messageForBuyX2(table_id, multiplier_chips_cost);
	}else if(has_been_played_by_user==false){
		// Tenes que haber jugado el partido
		avisoEmergenteJugaPlay("Jugar el partido",'<p>Antes de usar el <img src="img/icons/coins/x2.png" width="50px;"> es necesario jugar el partido.</p>');
	}else{
		// Ya usaste el X2
		avisoEmergenteJugaPlay("X2 Activado",'<p>El <img src="img/icons/coins/x2.png" width="50px;"> ya está activado para este partido.</p>');
	}
}
function messageForBuyX2(table_id, multiplier_chips_cost){
		 BootstrapDialog.show({
			 cssClass: 'general-modal-msj x2',
			 title: '<H1 class="x2">DUPLICA con <img src="img/icons/coins/x2.png" width="50px;"></H1>',
            message: '<img src="img/icons/coins/x2_pop.svg">',
			buttons: [{
                label: 'CANJEA <img src="img/icons/coins/x2.png" width="50px;"> por <b style="font-size: 1.7em; margin-left: 5px;">'+multiplier_chips_cost+'</b> <img src="img/icons/coins/chip.svg" style="width: 30px; margin-top: -10px;margin-left: 5px;">',
				cssClass:'btn btn-lg btn-block btn-secundary btn-astp transition',
                action: function(dialogItself){
					buyX2WithChips(table_id, multiplier_chips_cost,dialogItself);
                }
            }]
		 });
		 return false;
}
function buyX2WithChips(table_id, multiplier_chips_cost,dialogItself){
	// userCanSpentXChips(costOfTransaction)
	// editXChipsFromUsersWallet(chips)
	if(userCanSpentXChips(multiplier_chips_cost)){
		activateX2ForPlay(table_id,multiplier_chips_cost);
		dialogItself.close();
	}else{
		var chipsNeeded=parseInt(multiplier_chips_cost)-parseInt(getUserJugaplayChips());
		jpAnalyticsEvent("LACK_CHIPS_POPUP", "X2", chipsNeeded);
		BootstrapDialog.show({
			 cssClass: 'general-modal-msj x2',
			 title: '<H1 class="x2">FICHAS <img src="img/icons/coins/chip.svg" style="width: 30px; margin-top: -10px;margin-left: 5px;"> insuficientes </H1>',
            message: '<p>Le faltan <b>'+chipsNeeded+'</b> <img src="img/icons/coins/chip.svg" style="width: 30px; margin-top: -10px;margin-left: 5px;"> para poder activar el <img src="img/icons/coins/x2.png" width="50px;"></p>',
			buttons: [{
                label: 'CONSEGUIR <img src="img/icons/coins/chip.svg" style="width: 30px; margin-top: -10px;margin-left: 5px;">',
				cssClass:'btn btn-lg btn-block btn-secundary btn-astp transition',
                action: function(dialogItself2){
					buyChips();
					dialogItself2.close();
                }
            }]
		 });
	}
	//dialogItself.close();
}
function activateX2ForPlay(table_id,multiplier_chips_cost){
	if(startLoadingAnimation()==true){
		callToCheckIfisNotPlayed(table_id,multiplier_chips_cost);
		jpAnalyticsEvent("TRY_TO_USE_X2", multiplier_chips_cost, table_id);
	}
	//alert(getJPApiURL()+"tables/"+table_id+"/multiply_play/2");
}
function callToCheckIfisNotPlayed(table_id,multiplier_chips_cost){
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
			//alert(jsonStr);
			if(IsJsonString(jsonStr)){ // Me fijo si dio un error, en el caso de que de le sigo mandando
			var doble=JSON.parse(jsonStr);
			setCookie("tablesToPlay-Jp", jsonStr, 120);
			resetTimeOfLastTableAskToServer();
			analizeShowAvailableTablesToPlay(doble);
			checkIfisNotPlayed (table_id,multiplier_chips_cost,doble);
			}else{
				showAvailableTablesToPlay();
			}
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404 || xmlhttp.status==105){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlayConnectionError();
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("GET",getJPApiURL()+"tables/",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send();
}
function checkIfisNotPlayed (table_id,multiplier_chips_cost,tablesInContainer){
	for(table in tablesInContainer){
				if(tablesInContainer[table]['id'] == table_id){
					if(tablesInContainer[table]['bet_multiplier']==null){
						callX2ForPlay(table_id,multiplier_chips_cost);
					}else{
						closeLoadingAnimation();
						editXChipsFromUsersWallet(-multiplier_chips_cost);
					 	changeOptionTox2(table_id);
					}
				}

			}
}
function callX2ForPlay(table_id,multiplier_chips_cost){
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
			var jsonStr=xmlhttp.responseText;
			var json=JSON.parse(jsonStr);
			closeLoadingAnimation();
				if (typeof(json.errors) !== 'undefined'){
						avisoEmergenteJugaPlay("Algo salió mal",'<p>Algo salió mal, por favor vuelva a intentar.</p>');
				}else{// Salio todo bien
					jpAnalyticsEvent("USE_X2", multiplier_chips_cost, table_id);
					 editXChipsFromUsersWallet(-multiplier_chips_cost);
					 changeOptionTox2(table_id);
				}
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404 || xmlhttp.status==105){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlayConnectionError();
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("POST",getJPApiURL()+"tables/"+table_id+"/multiply_play/2",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send("[{}]");
}

// Cada vez que termine la jugada mostrar el X2 pero con un algoritmo, una vez por dia maximo
