
window.onload=loadWalletBalance();

function updateWalletBalance(objWallet){
	var d = new Date();
	var monthName = returnFullMonthName(d.getMonth()+1);
	document.getElementById('wallet-show-userCoins').innerHTML=getUserJugaplayCoins();
	document.getElementById('wallet-withdraws-container').innerHTML=parseFullWalletType("idWallWc",objWallet.last_month_withdraws,monthName,objWallet.total_withdraws,objWallet.detail_withdraws);
	document.getElementById('wallet-entry_fees-container').innerHTML=parseFullWalletType("idWallEfC",objWallet.last_month_entry_fees,monthName,objWallet.total_entry_fees,objWallet.detail_entry_fees);
	document.getElementById('wallet-detail_prizes-container').innerHTML=parseFullWalletType("idWallPc",objWallet.last_month_prizes,monthName,objWallet.total_prizes,objWallet.detail_prizes);
	document.getElementById('wallet-invited_friends-container').innerHTML=parseFullWalletType("idWallFc",objWallet.last_month_promotions,monthName,objWallet.total_promotions,objWallet.detail_promotions);
	//setTimeout(hasBeenRead(5), 3000);// A los 3 segundos de mostrar la explicachion de como es el monedero!!  
}
function parseFullWalletType(idToCollapse,monthTotal, monthName, historyTotal,htmlDetailGenerator){
	var htmlDetail = parseDetailMovement(idToCollapse,htmlDetailGenerator);
	return'<div class="row players-list-item vertical-align color-player-list2 even"> <div class="col-xs-1"><!--i class="fa fa-question-circle-o" aria-hidden="true" style="font-size: 18px;"></i--></div><div class="col-xs-6 text-block-style1">Total '+monthName+'</div><div class="col-xs-5"> <p class="text-right nomarging"> <span class="text-block-style2">'+monthTotal+' <img src="img/icons/coins/coins.png" style="margin-right: 0px;margin-top: -5px;margin-bottom: -3px;margin-left: 5px;width: 20px;"></p></div></div><div class="row players-list-item vertical-align color-player-list2 odd"> <div class="col-xs-1"><!--i class="fa fa-question-circle-o" aria-hidden="true" style="font-size: 18px;"></i--></div><div class="col-xs-6 text-block-style1">Total Historico</div><div class="col-xs-5"> <p class="text-right nomarging"> <span class="text-block-style2">'+historyTotal+' <img src="img/icons/coins/coins.png" style="margin-right: 0px;margin-top: -5px;margin-bottom: -3px;margin-left: 5px;width: 20px;"></p></div></div><div class="row players-list-item vertical-align color-player-list2 even"> <div class="col-xs-1"></div><div class="col-xs-6 text-block-style1">Ver Detalle</div><div class="col-xs-3"></div><div class="col-xs-2 text-right"> <button type="button" onclick="changeArrow(this);" class="btn btn-live" data-toggle="collapse" data-target="#'+idToCollapse+'"><i class="fa fa-chevron-down" aria-hidden="true"></i></button> </div></div><div id="'+idToCollapse+'" class="collapse">'+htmlDetail+'</div>';
}
function parseDetailMovement(idToCollapse,htmlDetailGenerator){
	var html='';var oddOrEven;
	if(htmlDetailGenerator.length==0){html='Sin detalles'}else{
		for(i in htmlDetailGenerator){
			if(i%2==0){oddOrEven="odd";}else{oddOrEven="even";}
			html+='<div class="row players-list-item vertical-align color-player-list3 '+oddOrEven+'"> <div class="col-xs-6 player-name"><p>'+htmlDetailGenerator[i].detail+'</p></div><div class="col-xs-2 text-right nopadding"> '+dateFormatViewDay(htmlDetailGenerator[i].date)+' </div><div class="col-xs-4"> <p class="text-right nomarging"> <span class="text-block-style1">'+htmlDetailGenerator[i].coins+' <img src="img/icons/coins/coins.png" style="margin-right: 0px;margin-top: -5px;margin-bottom: -3px;margin-left: 5px;width: 15px;"></p></div></div>';
		}
	}
	if(htmlDetailGenerator.length>=5){html+='<a class="btn btn-style3 full-width bg-color3" onclick="showMoreWalletDetail(this,\''+idToCollapse+'\',5);">VER +</a>'}
	return html;
}
function loadWalletBalance(){
	var paginate="?from=0&to=5";
	if(checkConnection()){var xmlhttp;
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
			stopTimeToWait();
			if(IsJsonString(jsonStr)){ // Me fijo si dio un error, en el caso de que de le sigo mandando
				var doble=JSON.parse(jsonStr);
				updateWalletBalance(doble);
				return true;
			}else{
				loadWalletBalance();
			}			
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlay("ERROR DE CONEXI&Oacute;N","<p>Hubo un error de conexi&oacute; intente nuevamente</p>");
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("GET","http://app.jugaplay.com/api/v1/wallet_history"+paginate,true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send();	
	}
}
function parseAppendDetailMovement(idToCollapse,htmlDetailGenerator,from){
		var html='';var oddOrEven;
		for(i in htmlDetailGenerator){
			if((i+parseInt(from)-1)%2==0){oddOrEven="odd";}else{oddOrEven="even";}
			html+='<div class="row players-list-item vertical-align color-player-list3 '+oddOrEven+'"> <div class="col-xs-6 player-name"><p>'+htmlDetailGenerator[i].detail+'</p></div><div class="col-xs-2 text-right nopadding"> '+dateFormatViewDay(htmlDetailGenerator[i].date)+' </div><div class="col-xs-4"> <p class="text-right nomarging"> <span class="text-block-style1">'+htmlDetailGenerator[i].coins+' <img src="img/icons/coins/coins.png" style="margin-right: 0px;margin-top: -5px;margin-bottom: -3px;margin-left: 5px;width: 15px;"></p></div></div>';
		}
	if(htmlDetailGenerator.length>=5){html+='<a class="btn btn-style3 full-width bg-color3" onclick="showMoreWalletDetail(this,\''+idToCollapse+'\','+from+');">VER +</a>'}
	removeLoaderFromCertainContainer(document.getElementById(idToCollapse));document.getElementById(idToCollapse).innerHTML+=html;
}
function showMoreWalletDetail(element,idToCollapse,from){
	addLoaderToCertainContainer(element.parentNode);
	element.parentNode.removeChild(element);
	var paginate="?from="+from+"&to=5";
	if(idToCollapse=="idWallWc"){var dir="t_withdraws"+paginate;}
	if(idToCollapse=="idWallEfC"){var dir="t_entry_fees"+paginate;}
	if(idToCollapse=="idWallPc"){var dir="t_prizes"+paginate;}
	if(idToCollapse=="idWallFc"){var dir="t_promotions"+paginate;}
	if(idToCollapse=="idWallBcHC"){var dir="t_deposits"+paginate;;}
	if(checkConnection()){var xmlhttp;
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
			stopTimeToWait();
			jsonStr=xmlhttp.responseText;
			if(IsJsonString(jsonStr)){ // Me fijo si dio un error, en el caso de que de le sigo mandando
				var doble=JSON.parse(jsonStr);
				parseAppendDetailMovement(idToCollapse,doble,(parseInt(from)+5))
				return true;
			}else{
				showMoreWalletDetail(element,idToCollapse,from);
			}			
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlay("ERROR DE CONEXI&Oacute;N","<p>Hubo un error de conexi&oacute; intente nuevamente</p>");
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("GET","http://app.jugaplay.com/api/v1/"+dir,true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send();	
	}
}