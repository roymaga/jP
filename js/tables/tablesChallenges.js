// JavaScript Document
window.groupAllreadyCreated=null;
/*function createOrEnterAChallenge(){
	var useId='Btn-'+Math.floor((Math.random() * 1000000000) + 1);
	BootstrapDialog.show({
			 id: useId,
			 cssClass: 'filter-pop-up fade',
			 title: '<H4>Opciones</H4>',
            message: '<div class="list-style1"><a onClick="createANewChallenge(\''+useId+'\')">Crear nuevo desafío</a><a onClick="enterChallengeWithCode(\''+useId+'\')">Tengo un código</a></div>',
			buttons: [{
                label: 'Cancelar',
				id:useId,
                action: function(dialogItself){
                    dialogItself.close();
                }
            }]
		 });
}*/

function createANewChallenge(){
	//alert("Create New");
	if(checkConnection()){
	startLoadingAnimation();
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
			closeLoadingAnimation();
			stopTimeToWait();
			if(IsJsonString(jsonStr)){ // Me fijo si dio un error, en el caso de que de le sigo mandando
				var doble=JSON.parse(jsonStr);
				readCreateANewChallengeResponse(doble);
			}else{
				//alert("jsonError");
				createANewChallenge();
			}
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404 || xmlhttp.status==105){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlayConnectionError();
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("GET",getJPApiURL()+"groups/",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send();
	}
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
function enterChallengeWithCode(windowToClose){
	document.getElementById(windowToClose).click();
	BootstrapDialog.show({
			 cssClass: 'general-modal-msj',
			 title: "<H1>Usar códigos</H1>",
            message: '<p> Ingrese el código recibido: </p><p><input id="groupCodeInput" placeholder="INGRESE CÓDIGO" type="text" style=" width: 100%; text-align: center;" value="" ></p><p><small>Código valido por 48Hs</small></p>',
			buttons: [{
                label: ' Ingresar',
                action: function(dialogItself){
									addUserToGroup(dialogItself);
								}
				}
			]
		 });
		 return false;
}
/*
function addUserToGroup(dialogItself){
	startLoadingAnimation();
	var tkn=document.getElementById("groupCodeInput").value;
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
	 	 if ((xmlhttp.readyState==4 && xmlhttp.status==200) ||  (xmlhttp.readyState==4 && xmlhttp.status==422) ||  (xmlhttp.readyState==4 && xmlhttp.status==401) ||  (xmlhttp.readyState==4 && xmlhttp.status==400))
	    {
			var jsonStr=xmlhttp.responseText;
			closeLoadingAnimation();
			var json=JSON.parse(jsonStr);
			if (typeof(json.error) !== 'undefined' || typeof(json.errors) !== 'undefined'){
				avisoEmergenteJugaPlay("Código erróneo","<p>No se encontró ningún grupo o desafío con ese código, por favor verifique que el mismo se ingresara correctamente.</p>");
			}else{
				jpAnalyticsEvent("JOIN_GROUP", json.name, json.size);
				avisoEmergenteJugaPlay('Bien venido a "'+json.name+'" ','<p>Ya sos parte del grupo <b>"'+json.name+'"</b> y podrás jugar sus desafíos.</p>');
				dialogItself.close();
				showAvailableTablesToPlay();
			}
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404 || xmlhttp.status==105){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlayConnectionError();
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("POST",getJPApiURL()+"groups/join?token="+tkn,true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send();
}
*/

function addUserToGroup2(){
	$("#sendToken").html('<div class="ball-loader ball-loader-small"></div>');
	$("#sendToken").prop('disabled', true);
	var tkn = $("#groupCodeInput").val();
	var url = getJPApiURL() + "groups/join?token=" + tkn;

	$.ajaxSetup({
    crossDomain: true,
    xhrFields: {
        withCredentials: true
    }
	});

	$.post(url, {}, function(data) {
	  var json = data;

		if (typeof(json.error) !== 'undefined' || typeof(json.errors) !== 'undefined'){
			avisoEmergenteJugaPlay("Código erróneo","<p>No se encontró ningún grupo o desafío con ese código, por favor verifique que el mismo se ingresara correctamente.</p>");
		}else{
			avisoEmergenteJugaPlay('Bien venido a "'+json.name+'" ','<p>Ya sos parte del grupo <b>"'+json.name+'"</b> y podrás jugar sus desafíos.</p>');
			$("#groupCodeInput").val("");
			showAvailableTablesToPlay();
		}

	},"json")
  .fail(function() {
     avisoEmergenteJugaPlayConnectionError();
  })
  .always(function() {
    //$("#sendToken").removeClass("disabled");
		$("#sendToken").html('<i class="fa fa-thumbs-o-up"></i>');
		$("#sendToken").prop('disabled', false);
  });
}
