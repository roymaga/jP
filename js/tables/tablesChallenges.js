// JavaScript Document
window.groupAllreadyCreated=null;
function createANewChallenge(){
	//alert("Create New");
	startLoadingAnimation();
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
			closeLoadingAnimation();
			if(IsJsonString(jsonStr)){ // Me fijo si dio un error, en el caso de que de le sigo mandando
				var doble=JSON.parse(jsonStr);
				readCreateANewChallengeResponse(doble);
			}else{
				//alert("jsonError");
				createANewChallenge();
			}
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlay("ERROR DE CONEXIÓN","<p>Hubo un error de conexió intente nuevamente</p>");
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("GET","http://app.jugaplay.com/api/v1/groups/",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send();}
}
function readCreateANewChallengeResponse(users){
	var contentForWindow=createContentForANewChallengeWindow(users.groups);
	openOverLapseWindow("NUEVO DESAFIO", contentForWindow);
}
function createContentForANewChallengeWindow(groups){
	var GruposDeAmigos='';
	for (grupo in groups){
		GruposDeAmigos+=parseGroupOfFriends(groups[grupo]);
	}
	return '<div id="challenge-visible-dom"><div class="container title-box bg-color3" id="action-bar"><div class="row vertical-align"><div class="col-xs-12"><div id="crear-grupo-title"> <h1>ELEGIR GRUPO</h1> <p style="font-size:0.8em; color:#EEE;">Elegi un grupo o crea uno nuevo </p></div></div></div></div><div class="container"><div class="row-fluid vertical-align friend-item" onClick="createNewGroupOfFriends();"><div class="col-xs-3"><span class="fa-stack fa-2x friend-picture"><i class="fa fa-circle fa-stack-2x" style="color: #35b44a;"></i><i class="fa fa-user-plus fa-stack-1x fa-inverse"></i></span></div><div class="col-xs-9"><h3 class="friend-nick">Nuevo Grupo +</h3><p class="friend-name">Crear un nuevo grupo</p></div></div></div><div class="container bg-color3"><div class="row vertical-align"><div class="col-xs-12 nopadding"><ul class="nav nav-tabs jp-tabs"><li class="active"><a data-toggle="tab" href="#amigos-tab">Grupos</a></li></ul></div></div></div><div class="tab-content"> <div class="tab-pane active" id="amigos-tab">'+GruposDeAmigos+'</div></div></div>';
}
function parseGroupOfFriends(group){
	return '<div class="row-fluid vertical-align friend-item" onClick="selectCertainGroupOfFriendsToChallenge(\''+group.id+'\', \''+group.name+'\','+group.users.length+' );"><div class="col-xs-3"><span class="fa-stack fa-2x friend-picture"><i class="fa fa-circle fa-stack-2x" style="color: #ff9900;"></i><i class="fa fa-users fa-stack-1x fa-inverse"></i></span></div><div class="col-xs-6"><h3 class="friend-nick">'+group.name+'</h3><p class="friend-name">'+group.users.length+' Participantes</p></div><div class="col-xs-4 icons"></div></div>';
}
//
function selectCertainGroupOfFriendsToChallenge(groupId, groupName, amountOfUsers){
	window.groupAllreadyCreated=groupId;
	createChallengeWithFormedGroupOfFriends(groupId, groupName, amountOfUsers);
}