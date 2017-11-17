// JavaScript Document
setTimeout(function(){showChampionsOfTheWorld();}, 500);
function showChampionsOfTheWorld(){
	var previousChampionsLoad=getCookie("championsShow-Changed-Jp");
	if(previousChampionsLoad.length>4 && IsJsonString(previousChampionsLoad)){		;
			showChampions(JSON.parse(previousChampionsLoad));
			showAvailableChampions();

		}else{
			 showAvailableChampions();
		}
}
function showAvailableChampions(){
	if(window.IsLoggedInVar && checkConnection()){
		showAvailableChampions2();
	}else{
		setTimeout(function(){showAvailableChampions()},100);
	}
}
function showAvailableChampions2(){
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
			setCookie("championsShow-Changed-Jp", jsonStr, 120);
			showChampions(JSON.parse(jsonStr));
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404 || xmlhttp.status==105){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlayConnectionError();
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("GET","http://data.jugaplay.com/api/store/champions.php",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		//xmlhttp.withCredentials = "true";
		xmlhttp.send();
}
function showChampions(preLoadChampions){
	var textOfWall='';
	for(champion in preLoadChampions){
		textOfWall+=returnChampionToShow(preLoadChampions[champion]);
	}
	if ($('#show-all-champions').length > 0) {
			$('#show-all-champions').html(textOfWall);
	}else{
		setTimeout(function(){showChampions(preLoadChampions)},100);
	}
}
function returnChampionToShow(champion){
	return '<div class="box-champion"><div class="name clearfix"><p>@'+champion.nick+'</p></div><div class="picture"><img src="'+champion.img+'"></div></div>'
}
