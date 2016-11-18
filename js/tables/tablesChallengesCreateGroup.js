// JavaScript Document
/*
previousContactsLoad=getCookie("contactsToSync-Jp");
challenge-visible-dom
*/
window.lastSearchQContentLastPageShown=[];
window.selectedUsersToFromGroup=[];
function createNewGroupOfFriends(){
	window.groupAllreadyCreated=false;
	var previousContactsLoad=JSON.parse(getCookie("contactsToSync-Jp")).contacts;
	var userFriends='';
	for (friend in previousContactsLoad) {
		userFriends+=parseUserFriendAddToGroup(previousContactsLoad[friend]);
	}
	document.getElementById("challenge-visible-dom").innerHTML='<div class="container title-box bg-color3" id="action-bar"><div class="row vertical-align"><div class="col-xs-10"><div id="crear-grupo-title"> <h1>CREAR NUEVO GRUPO</h1> <p style="font-size:0.8em; color:#EEE;">Añadir Participantes</p></div><div id="crear-grupo-buscar" style="display:none;"> <input type="text" placeholder="Buscar..." id="searchNewGroup-input" class="form-control"/> </div></div><div class="col-xs-2 text-right"><i class="fa fa-search fa-2x" aria-hidden="true" id="searchNoFriendsContactsMagnGlass" style="color: #fff;"></i></div></div></div><div class="container" id="crear-grupo-added"><div class="row vertical-align"> <div class="col-xs-12 owl-carousel" id="owl-contacts"> </div></div></div><div class="container bg-color3"><div class="row vertical-align"><div class="col-xs-12 nopadding"><ul class="nav nav-tabs jp-tabs"><li class="active"><a data-toggle="tab" href="#amigos-tab-createGroup">Amigos</a></li><li><a data-toggle="tab" href="#amigos-jugaplay-tab-createGroup">Usuarios JugaPlay</a></li></ul></div></div></div><div class="tab-content players-list"><div class="tab-pane fade in active" id="amigos-tab-createGroup">'+userFriends+'</div><div class="tab-pane fade in" id="amigos-jugaplay-tab-createGroup"></div></div><div class="container bg-color2 btn-play-container"><button type="button" class="btn btn-play pending" onclick="finishSelectingUsersForGroup();">Agregue usuarios al grupo</button></div>';
	// add players to amigos-jugaplay-tab-createGroup
	startAllCreateNewGroupOfFriendsFunctions();
	searchOptionsForNoneFriendsUsers('',1);
}
function parseUserFriendAddToGroup(friend){
	return '<div class="row-fluid vertical-align friend-item" data-user-id="'+friend.user.id+'" data-user-name="'+friend.nickname.toUpperCase()+'" data-user-nick="'+friend.user.nickname.toUpperCase()+'" onclick="selectUserForAddingToGroup(\''+friend.user.id+'\',\''+friend.user.nickname+'\');"><div class="col-xs-3"><span class="fa-stack fa-2x friend-picture"><i class="fa fa-circle fa-stack-2x" style="color: lightgray;"></i></i><i class="fa fa-user fa-stack-1x fa-inverse"></i></span></div><div class="col-xs-6"><h3 class="friend-nick">'+friend.nickname+'</h3><p class="friend-name">'+friend.user.nickname+'</p></div><div class="col-xs-3 icons"></div></div>';
}
function startAllCreateNewGroupOfFriendsFunctions(){
		window.lastSearchQContentLastPageShown=[];
		window.selectedUsersToFromGroup=[];
		$("#owl-contacts").owlCarousel({
			items : 7, //10 items above 1000px browser width
    		itemsDesktop : [1000,7], //5 items between 1000px and 901px
      		itemsDesktopSmall : [900,7], // betweem 900px and 601px
      		itemsTablet: [700,7], //2 items between 700 and 600
      		itemsMobile : [600,4], // itemsMobile disabled - inherit from itemsTablet option
			pagination:false
		});
		
		//Mostrar Input de "Buscar"
		$('#searchNoFriendsContactsMagnGlass').on({
			click: function(){
				$('#crear-grupo-title').hide()
				$('#crear-grupo-buscar').show()
				$('#crear-grupo-buscar input').focus();
			}
		});
		//Ocultar Input de "Buscar"
		$('#searchNewGroup-input').on({
			blur: function(){
				if(document.getElementById("searchNewGroup-input").value.length<=0){
					$('#crear-grupo-title').show()
					$('#crear-grupo-buscar').hide();
					// Poner la ultima busqueda vacia
				}
				searchOptionsForNoneFriendsUsers(document.getElementById("searchNewGroup-input").value.trim(), 1);
			}
		});	
		$( "#searchNewGroup-input" ).keyup(function() {
		  		filterUsersForCreatingGroup(document.getElementById("searchNewGroup-input").value.trim().toUpperCase());
		});
}
// Filtrar buscqueda de amigos
function filterUsersForCreatingGroup (filter){
	var elements = document.getElementById("challenge-visible-dom").getElementsByClassName("friend-item");
	// show all
	for(element in elements){
		if(elements[element].innerHTML !== undefined){
			if(filter.length==0 || elements[element].getAttribute('data-user-name').indexOf(filter)!=-1 || elements[element].getAttribute('data-user-nick').indexOf(filter)!=-1){
				elements[element].style.display="flex";
			}else{
				// Podemos analizar que pasa si el mail es exacto lo que se busca o algo asi...
				elements[element].style.display="none";
			}
		}
	}
}
// -- Search None friends
// Add options to friends
// 1- Option search more Friends from/without no filter (Liga Argenitna)
// 2- Change with search Q !! 
// Wait a certain time before to do a search 5 seg -- 
function searchMoreOptionsForNoneFriendsUsers(element,searchQ, page){
	element.parentNode.removeChild(element);
	searchOptionsForNoneFriendsUsers(searchQ, page);
	
}
function searchOptionsForNoneFriendsUsers(searchQ, page){
	addLoaderToCertainContainer(document.getElementById("amigos-jugaplay-tab-createGroup"));
	document.getElementById("searchNoFriendsContactsMagnGlass").className="fa fa-spinner fa-pulse fa-2x fa-fw";
	// Poner el loader en la lupa tambien
	var json = JSON.stringify({ "search": { "q": searchQ, "order_by_ranking": true }})
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
			//alert(jsonStr);
			if(IsJsonString(jsonStr)){
				if(document.getElementById("amigos-jugaplay-tab-createGroup")!=null){
					removeLoaderFromCertainContainer(document.getElementById("amigos-jugaplay-tab-createGroup"));
				}
				document.getElementById("searchNoFriendsContactsMagnGlass").className="fa fa-search fa-2x";
				var doble=JSON.parse(jsonStr);
				readSearchOptionsForNoneFriendsUsers(doble,page,searchQ);
			}else{
				searchOptionsForNoneFriendsUsers(searchQ, page);
			}
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlay("ERROR DE CONEXIÓN","<p>Hubo un error de conexió intente nuevamente</p>");
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("POST","http://app.jugaplay.com/api/v1/users/search/?page="+page,true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send(json);}
}
// '<a class="btn btn-style3 full-width bg-color3" onclick="showMoreHistory(this,\''+next+'\');">VER +</a>'
function readSearchOptionsForNoneFriendsUsers(server,page,searchQ){
	// users
	// pagination -- current_page - total_pages
	//alert("readSearchOptionsForNoneFriendsUsers");
	var container=document.getElementById('amigos-jugaplay-tab-createGroup');
	var usersInContainer=container.getElementsByClassName("friend-item");
	var arrayOFActualIds=[];
	for(element in usersInContainer){
		if(usersInContainer[element].innerHTML !== undefined){
			arrayOFActualIds.push(parseInt(usersInContainer[element].getAttribute('data-user-id')));
		}
	}
	for (user in server.users){
		if(arrayOFActualIds.indexOf(server.users[user].id)==-1){
			container.innerHTML+=parseUserAddToContainer(server.users[user]);
		}
	}
	if(server.pagination.current_page<server.pagination.total_pages){showMoreOptionsForNoneFriendsUsers(searchQ, (parseInt(server.pagination.current_page)+1), container);}
}
function showMoreOptionsForNoneFriendsUsers(searchQ, next, container){
	// Este elimina solo si hay otro y si agrega un next de un vacio mas chico que el ultimo usuado
	//{"searchQ":searchQ,"next":next}
	var flag=0;
	for(searches in window.lastSearchQContentLastPageShown){
		if(searchQ==window.lastSearchQContentLastPageShown[searches].searchQ){
			if(next<parseInt(window.lastSearchQContentLastPageShown[searches].next)){
				searchOptionsForNoneFriendsUsers(searchQ, window.lastSearchQContentLastPageShown[searches].next);// Si habia una busqueda que llegaba a menos, me voy a la proxima
				return;
			}else{
				window.lastSearchQContentLastPageShown[searches].next=next;
			}
			flag=1;
			break;
		}
	}
	if(flag==0){window.lastSearchQContentLastPageShown.push({"searchQ":searchQ,"next":next});}
	// delet other button¨
	var loadersInContainer=container.getElementsByClassName("loader-search-more");
	for(element in loadersInContainer){
		if(loadersInContainer[element].innerHTML !== undefined){
			loadersInContainer[element].parentNode.removeChild(loadersInContainer[element]);
		}
	}
	container.innerHTML+='<a class="btn btn-style3 full-width bg-color3 loader-search-more" onclick="searchMoreOptionsForNoneFriendsUsers(this,\''+searchQ+'\',\''+next+'\');">VER +</a>';
	return;
}
function parseUserAddToContainer(user){
	//alert("Add");
	return '<div class="row-fluid vertical-align friend-item" data-user-id="'+user.id+'" data-user-nick="'+user.nickname.toUpperCase()+'" data-user-name="" onclick="selectUserForAddingToGroup(\''+user.id+'\',\''+user.nickname+'\');"><div class="col-xs-3"><span class="fa-stack fa-2x friend-picture"><i class="fa fa-circle fa-stack-2x" style="color: lightgray;"></i></i><i class="fa fa-user fa-stack-1x fa-inverse"></i></span></div><div class="col-xs-6"><h3 class="friend-nick mb30">'+user.nickname+'</h3></div><div class="col-xs-3 icons"></div></div>';
}
// window.selectedUsersToFromGroup=[];
// Add element to carruserl
// $("#owl-contacts").data('owlCarousel').addItem(copy.clone(true));
// added.push(current_element);

//$("#owl-contacts").data('owlCarousel').removeItem(current);
//added.splice(added.indexOf(who), 1);
/*
$(document).on("click",'.remove-contact',function(e){
			e.preventDefault();
			borrar($(this));
		});
*/
//owl.trigger('owl.next');
function deleatUserFromCarrousel(element){
	var current = $(element).closest(".owl-item").index();
	$("#owl-contacts").data('owlCarousel').removeItem(current);
	window.selectedUsersToFromGroup.splice(window.selectedUsersToFromGroup.indexOf(element.getAttribute('data-user-id')), 1);
	removeSelectedFeaturesToSelectedUsers(element.getAttribute('data-user-id'));
}
function selectUserForAddingToGroup(id,nick){
	addSelectedFeaturesToSelectedUsers(id);
	id=parseInt(id);
	if(window.selectedUsersToFromGroup.indexOf(id)==-1){
		window.selectedUsersToFromGroup.push(id);
		createNewCarrouseUser(id,nick);
	}
}
function addSelectedFeaturesToSelectedUsers(id){
	var usersInContainer=document.getElementById('challenge-visible-dom').getElementsByClassName("friend-item");
	for(element in usersInContainer){
		if(usersInContainer[element].innerHTML !== undefined){
			if(parseInt(usersInContainer[element].getAttribute('data-user-id'))==parseInt(id)){
				if(!usersInContainer[element].classList.contains("selected")){
					usersInContainer[element].classList.add("selected");
				}
			}
		}
	}
	// Change button
	var button= document.getElementById("challenge-visible-dom").getElementsByClassName("btn-play").item(0);
	if(button.classList.contains("pending")){
		button.classList.remove("pending");
		button.innerHTML="Crear Grupo y Continuar";
	}
}
function removeSelectedFeaturesToSelectedUsers(id){
	var usersInContainer=document.getElementById('challenge-visible-dom').getElementsByClassName("friend-item");
	for(element in usersInContainer){
		if(usersInContainer[element].innerHTML !== undefined){
			if(parseInt(usersInContainer[element].getAttribute('data-user-id'))==parseInt(id)){
				if(usersInContainer[element].classList.contains("selected")){
					usersInContainer[element].classList.remove("selected");
				}
			}
		}
	}
	// Change button
	var button= document.getElementById("challenge-visible-dom").getElementsByClassName("btn-play").item(0);
	if(!button.classList.contains("pending") && window.selectedUsersToFromGroup.length==0){
		button.classList.add("pending");
		button.innerHTML="Agregue usuarios al grupo";
	}

}
function createNewCarrouseUser(id,nick){
	if(nick.length>11){nick=nick.substr(0, 9)+"...";}
	var createCarrouseUser = document.createElement('div');
	createCarrouseUser.className="added-item pull-left";
	createCarrouseUser.id="contact-item";
	createCarrouseUser.setAttribute("data-user-id", id);
	createCarrouseUser.onclick=function(){deleatUserFromCarrousel(this);}
	//mesaACrear.style=premiumTable(coins, sms);
	createCarrouseUser.innerHTML='<span class="fa-stack fa-2x picture"> <i class="fa fa-circle fa-stack-2x" style="color: lightgray;"></i> <i class="fa fa-user fa-stack-1x fa-inverse"></i> <span class="fa fa-close fa-stack-1x remove-contact"></span> </span> <span class="clearfix text-center name">'+nick+'</span>';
	$("#owl-contacts").data('owlCarousel').addItem(createCarrouseUser);
	$("#owl-contacts").trigger('owl.next');
}
function finishSelectingUsersForGroup(){
	if(window.selectedUsersToFromGroup.length==0){
		avisoEmergenteJugaPlay("Seleccione usuarios","<p>No tiene usuarios seleccionados para armar el grupo.</p><p> Necesita seleccionar al menos 1.</p>");
	}else{
		//alert("Continue");
		createChallengeWithNoGroupClose();
	}
}