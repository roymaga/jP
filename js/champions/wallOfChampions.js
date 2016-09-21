// JavaScript Document

window.onload=setTimeout(function(){ showChampionsOfTheWorld(); }, 1000);
function showChampionsOfTheWorld(){
	previousChampionsLoad=getCookie("championsShow-Changed-Jp");
	if(previousChampionsLoad.length>4){		
			var json=JSON.stringify(previousChampionsLoad);
			var servidor=JSON.parse(json);
			var doble=JSON.parse(servidor);
			showChampions(doble);
			showAvailableChampions();
	
		}else{
			 showAvailableChampions();
		}
}
function showAvailableChampions(){
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
			setCookie("championsShow-Changed-Jp", jsonStr, 120);
			var json=JSON.stringify(jsonStr);
			var servidor=JSON.parse(json);
			var doble=JSON.parse(servidor);
			showChampions(doble);
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlay("ERROR DE CONEXIÓN","<p>Hubo un error de conexió intente nuevamente</p>");
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("GET","http://data.jugaplay.com/api/store/champions.php",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		//xmlhttp.withCredentials = "true";
		xmlhttp.send();	
	}
}
function showChampions(preLoadChampions){
	textOfWall='';
	for(champion in preLoadChampions){
		textOfWall+=returnChampionToShow(preLoadChampions[champion]);
	}
	document.getElementById("show-all-champions").innerHTML=textOfWall;
}
function returnChampionToShow(champion){
	return '<div class="box-champion"><div class="name clearfix"><p>@'+champion.nick+'</p></div><div class="picture"><img src="'+champion.img+'"></div></div>'
}