// JavaScript Document
function openChallengeToPlayOverLapseWindow(tableId){
	window.showTableInformatioType='challenge';
	startLoadingAnimation();
	if(checkConnection()){
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
			var json=JSON.stringify(jsonStr);
			var servidor=JSON.parse(json);
			var doble=JSON.parse(servidor);
			readOpenChallenge(doble);
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404 || xmlhttp.status==105){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlayConnectionError();
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("GET",getJPApiURL()+"tables/"+tableId+"/",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send();	
	}
}
function readOpenChallenge(openTable){
		
		var openTable=parseTableForGroupPlayingOption (openTable); // Aca lo filtra para el grupo
		 window.actualOpenTable=openTable;
		var titleSelectedForTable='<span class="fa-stack fa-1x friend-picture"><i class="fa fa-circle fa-stack-2x" style="color: #ff9900;"></i><i class="fa fa-users fa-stack-1x fa-inverse"></i></span>'+openTable.group.name;
		 var contenidoMesa=contentForOpenChallengeWindow(openTable);
		 openOverLapseWindow(titleSelectedForTable, contenidoMesa);
	}
function contentForOpenChallengeWindow(shownTable){
	var first= '<div class="container container-full "> <div class="container container-title bg-color2 text-color2" onClick="openTableDfInformation(\''+shownTable.id+'\',\'challenge\');" ><div class="row"><div class="col-xs-2 chpadding"><h3><i class="fa fa-info-circle" aria-hidden="true"></i></h3></div><div class="col-xs-7 details chpadding"><h3>'+parseTableChallengeMatchName(shownTable.title)+'</br>'+dateFormatViewNormal(shownTable.start_time)+' </h3></div><div class="col-xs-3 nopadding text-center"><h3>'+shownTable.amount_of_users_playing+' <i class="fa fa fa-users" aria-hidden="true"></i></h3><p style="margin-top: -10px;">Anotados</p></div></div></div><div class="container match-data"><div class="row vertical-align"><div class="col-xs-3 text-center match-cup"><img src="img/tournament/flags/flag-'+shownTable.tournament_id+'.jpg"></div><div class="col-xs-3 text-center match-type"><a onClick="openTableInformation(\''+shownTable.id+'\',\'challenge\');">'+costOfTable(shownTable)+'</a></div><div class="col-xs-2 text-center prize-type"><a onClick="openTablePrizeInformation(\''+shownTable.id+'\',\'challenge\' );">'+earnsOfTable(shownTable)+'</a></div><div class="col-xs-4 text-right match-button">'+buttonOfChallengeTable(shownTable.id,shownTable.playing)+'</div></div></div><div class="container container-title bg-color11 text-color2"> <div class="col-xs-9 chpadding"> <p style=" margin: 0px;">Grupo</p><h3 style=" margin-top: 0px; font-size: 1.7em;">'+shownTable.group.name+'</h3></div><div class="col-xs-3 chpadding text-right"> <p style=" margin: 0px;">Integrantes</p><h3 style=" margin-top: 0px;">'+shownTable.group.users.length+' <i class="fa fa-reply-all" aria-hidden="true"></i></h3></div></div><div class="container list-style2 text-color1 bg-color5"> <div class="row vertical-align"> <div class="col-xs-8 text-left match-cup chpadding"> <h4 style=" margin: 7px;" onClick="explanationChallenge(\'pozo_estimado\');">Pozo estimado <i class="fa fa-question-circle" aria-hidden="true"></i></h4></div><div class="col-xs-4 text-center prize-type"> <span style=" font-size: 18px;">'+earnsOfTable(shownTable)+'</span></div></div><div class="row vertical-align"> <div class="col-xs-8 text-left match-cup chpadding" onClick="explanationChallenge(\'pozo_actual\');"> <h4 style=" margin: 7px;">Pozo actual <i class="fa fa-question-circle" aria-hidden="true"></i></h4></div><div class="col-xs-4 text-center prize-type"> <span style=" font-size: 18px;">'+earnsOfTableNow(shownTable)+'</span></div></div><div class="row vertical-align"> <div class="col-xs-8 text-left match-cup chpadding" onClick="explanationChallenge(\'anotados\');"> <h4 style=" margin: 7px;">Anotados <i class="fa fa-question-circle" aria-hidden="true"></i></h4></div><div class="col-xs-4 text-center prize-type"> <p style=" font-size: 18px;">'+shownTable.amount_of_users_playing+'</p><i class="fa fa fa-users fa-2x" aria-hidden="true" style=" margin-left: 5px; margin-right: -18px;"></i></div></div><div class="row vertical-align"> <div class="col-xs-8 text-left match-cup chpadding" onClick="explanationChallenge(\'invitados\');"> <h4 style=" margin: 7px;">Invitados <i class="fa fa-question-circle" aria-hidden="true"></i></h4></div><div class="col-xs-4 text-center prize-type"> <p style=" font-size: 18px;">'+shownTable.group.users.length+'</p><i class="fa fa-reply-all fa-2x" aria-hidden="true" style=" margin-left: 5px; margin-right: -18px;"></i></div></div></div><div class="container title-box bg-color3" id="action-bar"> <div class="row vertical-align"> <div class="col-xs-12"> <div id=""> <h1>Participantes</h1> <p style="font-size:0.8em; color:#EEE;">Estos son los participantes del grupo "'+shownTable.group.name+'"</p></div></div></div></div><div class="row-fluid vertical-align friend-item" onclick="addUsersToChallengeGroupByLink(\''+shownTable.group.invitation_token+'\');" style=" background: rgba(0, 128, 0, 0.11);"> <div class="col-xs-3"><span class="fa-stack fa-2x friend-picture"><i class="fa fa-circle fa-stack-2x" style="color: #35b44a;"></i><i class="fa fa-user-plus fa-stack-1x fa-inverse"></i></span></div><div class="col-xs-9"> <h3 class="friend-nick" style=" color: #35b44a;">Añadir participantes +</h3> <p class="friend-name">Agrega gente al grupo</p></div></div>';
	var users=addUsersToChallengeGroup (shownTable);
	var last='<div class="row-fluid vertical-align friend-item" onclick="exitActualGroup(\''+shownTable.group.id+'\');" style=" background: rgba(244, 67, 54, 0.11);"> <div class="col-xs-3"><span class="fa-stack fa-2x friend-picture"><i class="fa fa-circle fa-stack-2x" style="color: #F44336;"></i><i class="fa fa-user-times fa-stack-1x fa-inverse"></i></span></div><div class="col-xs-9"> <h3 class="friend-nick" style=" color: #f44336;">Salir del grupo -</h3> <p class="friend-name">No quiero pertenecer mas a este grupo</p></div></div></div>' ;
	return first+users+last;
}
function openTableOfMatch(){
	readOpenTable(window.actualOpenTable);
}
function explanationChallenge(which){
	switch(which) {
    case 'pozo_estimado':
		avisoEmergenteJugaPlay("Pozo estimado","<p>Es el pozo que se generaría si juegan todos los usuarios invitados al desafío..</p>");
        break;
    case 'pozo_actual':
        avisoEmergenteJugaPlay("Pozo actual","<p>Es el pozo que se acumuló gracias a los usuarios que ya hicieron su jugada, los anotados. Este va a ir creciendo a medida que los usuarios jueguen el desafío.</p>");
        break;
	case 'anotados':
        avisoEmergenteJugaPlay("Anotados","<p>Son los usuarios que ya realizaron su jugada. Y pusieron sus monedas en el pozo.</p>");
        break;
    case 'invitados':
        avisoEmergenteJugaPlay("Invitados","<p>Son los usuarios que componen el grupo. Que están invitados a jugar el desafío.</p>");
        break;
	case 'copiar_codigo':
        avisoEmergenteJugaPlay("Usar códigos","<p>1. Copiar el código y enviar a amigos que quieras invitar al desafío.</p><p>2. Tus amigos tienen que ingresar el código en el sector desafíos.</p><p>3. ¡Listo! Podrás desafiar a tus amigos.</p>");
        break;
    default:
        ;
	}

	
}
function addUsersToChallengeGroup (shownTable){
	var friendsIds=[];
	var hadPlayIds=[];
	var previousContactsLoad=JSON.parse(getCookie("contactsToSync-Jp")).contacts;
	var html='';
	for (friend in previousContactsLoad){
		friendsIds.push(previousContactsLoad[friend].user.id);
	}
	for(played in shownTable.playing){
		hadPlayIds.push( shownTable.playing[played].user_id);
	}
	for (user in shownTable.group.users){
		if(shownTable.group.users[user].id!=getUserJugaplayId()){
			html+=parseUserForChallenge(shownTable.group.users[user],friendsIds.indexOf(shownTable.group.users[user].id),hadPlayIds.indexOf(shownTable.group.users[user].id));
		}
	}
	return html;
	// friend.user.id
	// friend.nickname
	// friend.user.nickname
}
function parseUserForChallenge(user,isFriend,hadPlayed){
	if(isFriend>-1){return parseUserForChallengeFriend(user,hadPlayed);}
	else{return parseUserForChallengeNotFriend(user,hadPlayed);}
}
function parseUserForChallengeFriend(user,hadPlayed){
	var previousContactsLoad=JSON.parse(getCookie("contactsToSync-Jp")).contacts;
	for (friend in previousContactsLoad){
		if(previousContactsLoad[friend].user.id==user.id){
			return '<div class="row-fluid vertical-align friend-item"> <div class="col-xs-3">'+parseUserForChallengeFriendImage(user.image)+'</div><div class="col-xs-6"> <h3 class="friend-nick">'+previousContactsLoad[friend].nickname+'</h3> <p class="friend-name">'+user.nickname+'</p></div><div class="col-xs-3 nopadding"> '+parseButtonPlayedForChallenge(hadPlayed)+' </div></div>';
		}
	}
	return parseUserForChallengeNotFriend(user,hadPlayed);// No deberia llegar pero por las dudas lo agrego
}
function parseUserForChallengeFriendImage(img){
	if(img!=null){return'<img src="'+img+'" style=" border: 1px solid rgba(255, 255, 255, 0.25); border-radius: 50%; display: inline-block; margin-right: 10px; width: 80%;">';}
	else{return'<span class="fa-stack fa-2x friend-picture"><i class="fa fa-circle fa-stack-2x" style="color: lightgray;"></i><i class="fa fa-user fa-stack-1x fa-inverse"></i></span>';}
}
function parseUserForChallengeNotFriend(user,hadPlayed){
	return '<div class="row-fluid vertical-align friend-item" onclick="selectUserForAddingToGroupOfFriends(this,\''+user.nickname+'\',\''+user.email+'\');"> <div class="col-xs-3">'+parseUserForChallengeNotFriendImage(user.image)+'</div><div class="col-xs-6"> <h3 class="friend-nick">'+user.nickname+'</h3> <p class="friend-name">Agregar a amigos +</p></div><div class="col-xs-3 nopadding"> '+parseButtonPlayedForChallenge(hadPlayed)+' </div></div>';
}
function parseUserForChallengeNotFriendImage(img){
	if(img!=null){return'<img src="'+img+'" style=" border: 1px solid rgba(255, 255, 255, 0.25); border-radius: 50%; display: inline-block; margin-right: 10px; width: 80%;"><i class="fa fa-plus-circle fa-2x addFriendImgPlus" aria-hidden="true"></i>';}
	else{return'<span class="fa-stack fa-2x friend-picture"><i class="fa fa-square fa-stack-2x" style="color: rgba(53, 180, 74, 0.49);"></i><i class="fa fa-address-book-o fa-stack-2x fa-inverse" style=" position: absolute; font-size: 1.4em; bottom: 0.2em;"></i><i class="fa fa-plus fa-stack-1x fa-inverse" style=" font-size: 1em; color: #348842; position: absolute; top: 0.5em; left: 0.4em;"></i></span>';}
}
function parseButtonPlayedForChallenge(hadPlayed){
	if(hadPlayed>-1){return '<button type="button" class="btn btn-default btn-style2" style=" background: rgba(139, 195, 74, 0.11); color: #4CAF50; border: 1px solid #4CAF50; padding: 5px 5px;">¡Anotado!</button>';}
	else{ return '<button type="button" class="btn btn-default btn-style2" style=" background: rgba(110, 111, 113, 0.06); color: black; padding: 5px 5px;">Pendiente</button>';}
}
function selectUserForAddingToGroupOfFriends(element,nickname,email){
	//alert("Agregar usuario: "+email+" con el nick "+nickname);
	BootstrapDialog.show({
			 cssClass: 'general-modal-msj',
			 title: "<H1>Agregar como amigo</H1>",
            message: '<p>Agregar a NICK como amigo eligiendo un Nombre o Apodo con el que reconocer a este usuario de ahora en adelante. </p><p><fieldset class="form-group"> Nombre/Apodo:<input type="text" class="form-control" id="formChallengeUserNick" placeholder="Nombre/Apodo:"></fieldset></p>',
			buttons: [{
                label: 'Guardar',
				id:'boton-panel-registro-aviso-error-pop-up',
                action: function(dialogItself){
					// formChallengeUserNick
					var nick=document.getElementById("formChallengeUserNick").value;
					if(nick.length>1){
						var json=JSON.stringify({ "contacts":[{"name":nick,"email":email}]});	
						showAvailableContactsToPlay(json);
						changeStatusOfUserFromChallenge(element,nickname,email,nick);
						dialogItself.close();
					}else{avisoEmergenteJugaPlay("Elegir Nombre/Apodo","<p>Ingrese un Nombre o Apodo con el que reconocer a este usuario en un futuro.</p>");};
                }
            }]		 
		 });
		 setTimeout(function(){alwaysShowInputValues();}, 1500);
		 return false;
}
function changeStatusOfUserFromChallenge(element,nickname,email,nick){
	element.onclick=function(){return false;};
	if(element.getElementsByClassName("addFriendImgPlus").length>0){
		var elem = element.getElementsByClassName("addFriendImgPlus").item(0);
   		elem.parentNode.removeChild(elem);
	}else{
		element.getElementsByClassName("friend-picture").item(0).innerHTML='<i class="fa fa-circle fa-stack-2x" style="color: lightgray;"></i><i class="fa fa-user fa-stack-1x fa-inverse"></i>';
	}
	element.getElementsByClassName("friend-nick").item(0).innerHTML=nick;
	element.getElementsByClassName("friend-name").item(0).innerHTML=nickname;
	
	
}
function exitActualGroup(groupId){
	BootstrapDialog.show({
			 cssClass: 'general-modal-msj',
			 title: "<H1>Confirmación necesaria</H1>",
            message: '<p>¿Desea salir del grupo?</p><p>Al salir no podrá ver más detalles del grupo y perderá el privilegio de ver el detalle de los partidos que jugo dentro del mismo.</p>',
			buttons: [{
                label: 'Cancelar',
				id:'boton-panel-registro-aviso-error-pop-up',
                action: function(dialogItself){
						dialogItself.close();
					}
				},{
                label: ' Salir',
				cssClass: 'btn-warning',
				icon: 'glyphicon glyphicon-ban-circle',
                action: function(dialogItself){
						closeAllOverLapseWindow();
						leaveGroupAndTable(groupId,name);
					}
				}
			]		 
		 });
		 return false;
}
function leaveGroupAndTable(groupId){
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
			closeLoadingAnimation();
			closeAllOverLapseWindow();
			setCookie("tablesToPlay-Jp", '', 120);
			deletAllGroupsFromVisibleDomWhenPosible();
			showAvailableTablesToPlay();
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404 || xmlhttp.status==105){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlayConnectionError();
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("POST",getJPApiURL()+"groups/"+groupId+"/exit",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send();	
}
function deletAllGroupsFromVisibleDomWhenPosible(){
	if(document.getElementById("challenges-container-show")!=null){
		document.getElementById("challenges-container-show").innerHTML="";
		addLoaderToCertainContainer(document.getElementById("challenges-container-show"));
	}else{
		setTimeout(deletAllGroupsFromVisibleDomWhenPosible, 100);
	}
}
function usersForChallenge(shownTable){
	var usersPlaying=[];
	var users="";
	for(user in shownTable.playing){
		usersPlaying.push(shownTable.playing[user].user_id);
	}
}
function addUsersToChallengeGroupByLink(shareLink){
	avisoEmergenteJugaPlay("Copiar código",'<p onclick="explanationChallenge(\'copiar_codigo\');"> Invita a usuarios al desafío con este código: <i class="fa fa-question-circle" aria-hidden="true"></i></p><p><input onclick="this.select();" type="text" style=" width: 100%; text-align: center;" value="'+shareLink+'"></p><p><small>Código valido por 48Hs</small></p>');
}
