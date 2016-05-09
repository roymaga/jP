// JavaScript Document
document.addEventListener("deviceready", showPrizesChengedInStore, false);
function showPrizesChengedInStore(){
	previousStoresLoad=getCookie("storesShow-Changed-Jp");
	if(previousStoresLoad.length>4){		
			var json=JSON.stringify(previousStoresLoad);
			var servidor=JSON.parse(json);
			var doble=JSON.parse(servidor);
			loadChangeStore(doble);
			showAvailablePrizesChangedStore();
	
		}else{
			 showAvailablePrizesChangedStore();
		}
}
function showAvailablePrizesChangedStore(){
	json=JSON.stringify({"user_id":window.userDataJugaPlay.id});
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
			setCookie("storesShow-Changed-Jp", jsonStr, 120);
			var json=JSON.stringify(jsonStr);
			var servidor=JSON.parse(json);
			var doble=JSON.parse(servidor);
			loadChangeStore(doble);
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlay("ERROR DE CONEXIÓN","<p>Hubo un error de conexió intente nuevamente</p>");
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("POST","http://data.jugaplay.com/api/store/change.php",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		//xmlhttp.withCredentials = "true";
		xmlhttp.send(json);}	
}
function loadChangeStore(preLoadStore){
	textOfStore='<div class="row text-center rewards-container">';
	for(prize in preLoadStore){
		textOfStore+=returnPrizeToShow(preLoadStore[prize]);
		if(prize%2!=0){textOfStore+='</div><div class="row text-center rewards-container">'}
	}
	textOfStore+='</div>';
	document.getElementById("show-store-container").innerHTML=textOfStore;
}
function returnPrizeToShow(prize){
	return '<div class="col-xs-6 reward"><img src="'+prize.img+'" class="full-width"><h5>'+prize.title+'</h5> <h4>'+prize.country+'</h4><p class="text-color3">'+prize.price+' <img src="img/icons/coins/coins.gif" width="15px"> </p>'+generateButtonForPrize(prize.changeLink)+'</div>'
}
function generateButtonForPrize(linkForPrize){
	if(linkForPrize!=null){return'<button class="btn btn-primary btn-style3" onClick="openPrizeInNewWindow(\''+linkForPrize+'\');" type="submit">Boucher</button>'}
	else{return'<button class="btn btn-primary btn-style2" onClick="prizeInProcess();" type="submit">Procesando</button>';}
}
function prizeInProcess(){
	avisoEmergenteJugaPlay("Procesando","<p>o	Su premio se está procesando, dentro de poco podrá descargar el Boucher desde este botón.</p>");
}
function openPrizeInNewWindow(linkForPrize){
	window.open(linkForPrize);
}