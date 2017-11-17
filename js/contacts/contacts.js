// JavaScript Document
// previousTablesLoad=getCookie("tablesToPlay-Jp");
setTimeout(function(){startContactsJs()}, 500);
function startContactsJs(){
	if(window.IsLoggedInVar){
		if(IsJsonString(getCookie("usersToSync-lastCheck-Jp"+getUserJugaplayId()))){
			window.lastContactCheck=JSON.parse(getCookie("usersToSync-lastCheck-Jp"+getUserJugaplayId()));
		}else{
			window.lastContactCheck=new Date(1401507903635);// 2014
		}
		if(IsJsonString(getCookie("usersSyncGoogleApi-lastCheck-Jp"+getUserJugaplayId()))){
			window.usersSyncGoogleApi=JSON.parse(getCookie("usersSyncGoogleApi-lastCheck-Jp"+getUserJugaplayId()));
		}else{
			window.usersSyncGoogleApi=false;// 2014
		}
		showAllContactsInGameWindow();
	}else{
		setTimeout(function(){startContactsJs()},100);
	}
}
function showAllContactsInGameWindow(){
	var previousContactsLoad=getCookie("contactsToSync-Jp");
	if(previousContactsLoad.length>4 &&  IsJsonString(previousContactsLoad)){
			if(updateContactsFromServer()){
				askAvailableContactsToPlay();
			}else{
				analizeShowContactsToPlay(JSON.parse(previousContactsLoad));
			}
		}else{
			 askAvailableContactsToPlay();
		}
	showSynElemts();
}
/* Armo las bases de sincronizacion*/
function showSynElemts(){
	if(document.getElementById("sync-elements")!=null){
	document.getElementById("sync-elements").innerHTML='<span class="fa-stack fa-lg contact-list-icon"><i class="fa fa-circle fa-stack-2x" style="color: lightgray;"></i><i class="fa fa-facebook fa-stack-1x"></i> <i class="'+isSync(getUserSyncFacebook())+'" style=""></i></span><span class="fa-stack fa-lg contact-list-icon"> <i class="fa fa-envelope-o fa-stack-1x" aria-hidden="true" style="color: lightgray; font-size:1.3em"></i> <i class="'+isSync(getUserSyncEmail())+'" style=""></i></span><span class="fa-stack fa-lg contact-list-icon"> <i class="fa fa-mobile fa-2x" aria-hidden="true" style="color: lightgray;"></i><i class="'+isSync(getUserSyncTelephone())+'" style=""></i></span>';
	showOptionsToSync();
	}
	else{setTimeout(function(){showSynElemts();}, 500);}
}
function isSync(result){
	if(result==true){return 'fa fa-check fa-stack-1x synced';}
	else{return 'fa fa-close fa-stack-1x not-synced';}
}
function isSyncWithGoogle(){
	return window.usersSyncGoogleApi;
}
function showOptionsToSync(){
	var optionsToSync='';
	if(!getUserSyncFacebook()){optionsToSync+='<div class="row vertical-align item" onClick="lookFriendsInFacebook();" style="cursor: pointer;"><div class="col-xs-2"><i class="fa fa-facebook-square fa-2x" aria-hidden="true"></i></div><div class="col-xs-8"><p style="margin-bottom:0px;" class="trn">Buscar a mis amigos de facebook</p></div><div class="col-xs-2"><i class="fa fa-chevron-up" aria-hidden="true"></i></div></div>';}
	if(!getUserSyncEmail()){optionsToSync+='<div class="row vertical-align item" onClick="noneRegisterPlayerPlayed();" style="cursor: pointer;"><div class="col-xs-2"><i class="fa fa-envelope-o fa-2x" aria-hidden="true"></i></div><div class="col-xs-8"><p style="margin-bottom:0px;" class="trn">Agregar mail para ser encontrado</p></div><div class="col-xs-2"><i class="fa fa-chevron-right" aria-hidden="true"></i></div></div>';}
	//if(!isSyncWithGoogle()){
		optionsToSync+='<div class="row vertical-align item" onClick="handleAuthClick(event);" style="cursor: pointer;"><div class="col-xs-2"><i class="fa fa fa-google-plus-official fa-2x" aria-hidden="true"></i></div><div class="col-xs-8"><p style="margin-bottom:0px;" class="trn">Buscar amigos en gmail/ android / google</p></div><div class="col-xs-2"><i class="fa fa-chevron-right" aria-hidden="true"></i></div></div>';
		//}
	//if(!getUserSyncTelephone()){optionsToSync+='<div class="row vertical-align item" onClick="avisoProximamente();" style="cursor: pointer;"><div class="col-xs-2"><i class="fa fa-mobile fa-2x" aria-hidden="true"></i></div><div class="col-xs-8"><p style="margin-bottom:0px;">Buscar a mis amigos del celular</p></div><div class="col-xs-2"><i class="fa fa-chevron-right" aria-hidden="true"></i></div></div>';}
	if(optionsToSync==''){optionsToSync='<div class="row vertical-align item"><div class="col-xs-12"><p style="margin-bottom:0px;" class="trn">Todas las opciones sincronizadas.</p></div></div>';}
	else{optionsToSync='<div class="row vertical-align item"><div class="col-xs-12"><p style="margin-bottom:0px;" class="trn">Sincroniza las distintas opciones faltantes, encuentra que amigos tuyos tienen una cuenta de Jugaplay y desafialos.</p></div></div>'+optionsToSync;}
	if ($('#contact-list-menu').length > 0) {
			$('#contact-list-menu').html(optionsToSync);
			checkLanguageElement($('#contact-list-menu'));
	}else{
		setTimeout(function(){showOptionsToSync()},100);
	}
}
/* Armo las funciones para los usuarios */
function updateContactsFromServer(){// Veo si lo traigo de memoria o no
	if(secondsFromNow(window.lastContactCheck)>86400){// Si tiene mas de 1 dia 86 400 segundos
			resetTimeOfLastContactAskToServer();
		return true;
	}else{
		return false;
	}
}
function resetTimeOfLastContactAskToServer(){
	window.lastContactCheck= new Date();
	var jsonUpdt=JSON.stringify(window.lastContactCheck);
	setCookie("usersToSync-lastCheck-Jp"+getUserJugaplayId(), jsonUpdt, 120);
}
function showAvailableContactsToPlay(json){
	if(window.IsLoggedInVar && checkConnection2()){
		showAvailableContactsToPlay2(json);
	}else{
		setTimeout(function(){showAvailableContactsToPlay(json)},100);
	}
}
function showAvailableContactsToPlay2(json){
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
				if(checkConnectionLoggedIn(xmlhttp)){
					var jsonStr=xmlhttp.responseText;
					askAvailableContactsToPlay();
					return true;
				}else{
					setTimeout(function(){showAvailableContactsToPlay(json)},100);
				}
	    }else if(xmlhttp.status==503 || xmlhttp.status==404 || xmlhttp.status==105){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlayConnectionError();
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("POST",getJPApiURL()+"address_books/synch/",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send(json);
}
function askAvailableContactsToPlay(){
	if(window.IsLoggedInVar && checkConnection2() && $('#contact-list-friends').length > 0){
		askAvailableContactsToPlay2();
	}else{
		setTimeout(function(){askAvailableContactsToPlay()},100);
	}
}
function askAvailableContactsToPlay(){
	if($('#contact-list-friends').length > 0){
		addLoaderToCertainContainer(document.getElementById('contact-list-friends'));
	}
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
			if(checkConnectionLoggedIn(xmlhttp)){
				if($('#contact-list-friends').length > 0){removeLoaderFromCertainContainer(document.getElementById('contact-list-friends'));}
				resetTimeOfLastContactAskToServer();
				setCookie("contactsToSync-Jp", jsonStr, 120);
				analizeShowContactsToPlay(JSON.parse(jsonStr));
				return true;
			}else{
				setTimeout(function(){askAvailableContactsToPlay()},100);
			}
	    }else if(xmlhttp.status==503 || xmlhttp.status==404 || xmlhttp.status==105){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlayConnectionError();
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("GET",getJPApiURL()+"address_books/",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send();
}
function analizeShowContactsToPlay(obj){
	// Me aseguro que no quede ningun loader, por las dudas
	var flag=0;
	if (typeof(obj.contacts) == "undefined"){
		showAvailableContactsToPlay();
	}else{
			if(document.getElementById("contact-list-friends")!=null){ // Si no hay un elemento visible solo las guarda en memoria cookie tablesToPlay-Jp
				// obj.sort(compareUsersSort); // Sort users by nick
				//arregloDeMesasConComentarios=new Array();
				removeLoaderFromCertainContainer(document.getElementById("contact-list-friends"));
				for (var i = 0; i < obj.contacts.length; i++) {
					loadUserToVisibleDom(obj.contacts[i]);
				}
			}// Fin si hay un elemento visible
	setTimeout(showRecordAvailableTablesToPlay, 3000); // Vuelve a hacer el recorrido cada 3 segundos
	}
}
function loadUserToVisibleDom(user){
	// Reviso si es grupal o no
	var createUser = document.createElement('div');
	createUser.className="row-fluid vertical-align friend-item";
	createUser.setAttribute("data-user-nick", user.user.id);
	createUser.setAttribute("data-user-private-nick", user.nickname);
	createUser.setAttribute("data-user-id", user.user.nickname);
	//mesaACrear.style=premiumTable(coins, sms);
	createUser.innerHTML='<div class="col-xs-2"><span class="fa-stack fa-2x"><i class="fa fa-circle fa-stack-2x" style="color: lightgray;"></i><i class="fa fa-user fa-stack-1x fa-inverse"></i></span></div><div class="col-xs-5"><h3 class="friend-nick">'+user.nickname+'</h3><p class="friend-name">'+user.user.nickname+'</p></div><div class="col-xs-5 icons">'+parseSyncIcons(user)+'</div>';
	addUserToListoOfUsers(createUser);
}
function parseSyncIcons(user){
	// SyncOptions </i> <i class="fa fa-mobile fa-2x " aria-hidden="true"></i>					<i class="fa fa-envelope-o fa-2x" aria-hidden="true"></i><i class="fa fa-search" aria-hidden="true"></i>
		var text='';
		if(user.synched_by_facebook == true){text+='<i class="fa fa-facebook-square fa-2x " aria-hidden="true"></i>';}
		if(user.synched_by_email == true){text+='<i class="fa fa-envelope-o fa-2x " aria-hidden="true"></i>';}
		//if(user.synched_by_phone == true){text+='<i class="fa fa-mobile fa-2x " aria-hidden="true"></i>';}
		if(text==''){text+='<i class="fa fa-search fa-2x " aria-hidden="true"></i>';}
		return text;
}
function addUserToListoOfUsers(userToCreate){ // Add User to container if already exists it actualize it
	// Reviso si es grupal o no
	flag=0;
	usersInContainer=document.getElementById("contact-list-friends").getElementsByClassName("friend-item");
	userIdToAdd=userToCreate.getAttribute('data-user-id');
	for(user in usersInContainer){
		if(usersInContainer[user].innerHTML !== undefined){
			actualAttributeId=usersInContainer[user].getAttribute('data-user-id');
			if(actualAttributeId==userIdToAdd)
				{usersInContainer[user].innerHTML=userToCreate.innerHTML;
				flag=1;break;}
		}
	}
	if(flag==0){document.getElementById("contact-list-friends").appendChild(userToCreate);}
}
function lookFriendsInFacebook(){
	var windowB=window.open(getJPApiURL()+'users/auth/facebook');
	setTimeout(function (){checkIfWindowFacebookCloseSync(windowB);}, 500);
}
function checkIfWindowFacebookCloseSync(windowB){
	if (windowB.closed) {
			window.lastContactCheck=new Date(1401507903635);// 2014
			setTimeout(function(){showAllContactsInGameWindow();}, 3000);
    }else{
		setTimeout(function (){checkIfWindowFacebookCloseSync(windowB);}, 500);
	}
}
// Busqueda de contactos para agregar a la lista
function searchToAddContactsToList(){
	avisoEmergenteJugaPlay("PROXIMAMENTE","<p>Estamos trabajando para tener esta opción disponible lo antes posible.</p><p>Segura mente la semana que viene la tengamos habilitada.</p>");
}
