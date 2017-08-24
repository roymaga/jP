var menuInsertLineTitle=menuGetMenuTitle();
var menuInsertLineCoins=menuGetAmountOfCoins();
var menuInsertLineNick=menuGetNickName();
var menuProfileImage=menuGetImage();
var menuInsertLineChips=menuGetAmountOfChips();
var menuInsertLine='<nav class="navbar navbar-default navbar-fixed-top main-nav" ><div class="container-fluid main-nav-container"><div class="navbar-header"><button type="button" class="navbar-toggle collapsed btn-sanwich-menu fa-2x" data-toggle="collapse" data-target="#top-navbar-collapse" aria-expanded="false"><span class="sr-only">Toggle navigation</span><i class="fa fa-bars" aria-hidden="true"></i></button><button type="button" class="navbar-toggle btn-alerts-menu" id="inner-alerts-jp-menu" data-toggle="collapse" data-target="#jp-notf-cont" onClick=" clickOpenNotifications();"><i class="fa fa-bullhorn fa-2x" aria-hidden="true"></i></button><button type="button" class="navbar-toggle navbar-right btn-navbar-back"></button><h4 class="text-center">'+menuInsertLineTitle+'</h4></div><div class="collapse navbar-collapse menu-jp-to-update" id="top-navbar-collapse"><div class="top-nav-user"><img src="'+menuProfileImage+'"><p>'+menuInsertLineNick+'</p></div><div class="row top-nav-stats"><div class="col-xs-7 coins"><h2>'+menuInsertLineCoins+' <img src="img/icons/coins/coins.png" style="margin-right: 0px;margin-top: -10px;margin-bottom: -3px;margin-left: 5px;width: 30px;"></h2></div><div class="col-xs-5 chips" onClick="buyChips();"><h2>'+menuInsertLineChips+' <img src="img/icons/coins/chip.svg" style="margin-right: 0px;margin-top: -10px;margin-bottom: -3px;margin-left: 5px;width: 30px;"></h2></div></div><ul class="nav navbar-nav navbar-right"><li><a href="game.html"><img src="img/icons/menu/botin.svg" width="30px" style="margin-right: 5px;"> Juego</a></li><li><a href="league.html"><i style="color: #f5c940;margin-right: 8px;" aria-hidden="true" class="fa fa-trophy fa-2x"></i> Liga</a></li><li><a href="profile.html"><img src="img/icons/menu/user.svg" width="25px" style="margin-right: 10px;">Perfil</a></li><li><a href="wallet.html"><img src="img/icons/menu/jugacoin.svg" width="25px" style="margin-right: 10px;">Monedero</a></li><li><a href="referal.html"><img src="img/icons/menu/jugachip_glow.svg" width="30px" style="margin-right: 5px;">Gana <img src="img/icons/coins/chip.svg" width="15px"> ¡invita amigos!</a></li><li class="dropdown"> <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><img src="img/icons/menu/store.svg" width="25px" style="margin-right: 10px;">Tienda<span class="caret"></span></a> <ul class="dropdown-menu"> <li><a href="store.html">Premios</a></li><li><a href="exchanged.html">Canjeados</a></li></ul> </li><li><a href="history.html"><img src="img/icons/menu/ball.svg" width="25px" style="margin-right: 10px;">Historial</a></li><li><a href="champions.html"><img src="img/icons/menu/chop.svg" width="25px" style="margin-right: 10px;"> Muro de campeones</a></li><li class="dropdown open"> <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true"><img src="img/icons/menu/info_talk.svg" width="25px" style="margin-right: 10px;">Ayuda<span class="caret"></span></a> <ul class="dropdown-menu"> <li><a href="how-to-play.html">Como jugar</a></li><li><a href="tables-scores.html">Reglamento</a></li><li><a href="frecuent-questions.html">Preguntas frecuentes</a></li><li><a href="suport.html">Soporte</a></li><li><a href="privacity.html">Privacidad</a></li><li><a href="terms-conditions.html">Terminos y condiciones</a></li></ul> </li><li><a onclick="logOutFromJugaPlay();"><img src="img/icons/menu/exit.svg" width="25px" style="margin-right: 10px;">Log Out</a></li></ul></div></div><div id="jp-notf-cont" class="container text-color1 collapse"></div></nav>';
document.write(menuInsertLine);							
function menuGetAmountOfCoins(){
	if(window.userDataJugaPlay!=null){
		return window.userDataJugaPlay.coins+' ';// Add space to be treated as text
	}else{
		return '...';// Add space to be treated as text
	}
	
}
function menuGetAmountOfChips(){
	if(window.userDataJugaPlay!=null){
		return window.userDataJugaPlay.chips+' ';// Add space to be treated as text
	}else{
		return '...';// Add space to be treated as text
	}
	
}
function menuGetNickName(){
	if(window.userDataJugaPlay!=null){
		return window.userDataJugaPlay.nickname;
	}else{
		return '...';// Add space to be treated as text
	}
	
}
function menuGetImage(){
	if(window.userDataJugaPlay!=null){
		if(window.userDataJugaPlay.image!=null && imageMenuExists(window.userDataJugaPlay.image)){
			return window.userDataJugaPlay.image;
		}else{
			return 'img/icons/user-profile-no-img.jpg';
		}
	}else{
		return 'img/icons/user-profile-no-img.jpg';
	}
	
}
function imageMenuExists(image_url){
   /* var http = new XMLHttpRequest();
    http.open('HEAD', image_url, false);
    http.send();
    return http.status != 404; */
	return true;
}
function menuGetMenuTitle(){
	return window.menuTitleOfWindow;
}
function updateMenusValues(){
	var menus = document.getElementsByClassName("menu-jp-to-update");
	for(var i=0;typeof(menus[i]) !== 'undefined';i++){
		menus[i].innerHTML=generateMenuUpdate();
	}
}
function generateMenuUpdate(){
	var siteMenuInsertLineCoins=menuGetAmountOfCoins();
	var siteMenuInsertLineChips=menuGetAmountOfChips();
	var siteMenuInsertLineNick=menuGetNickName();
	var siteMenuProfileImage=menuGetImage();
	var siteMenu='<div class="top-nav-user"><img src="'+siteMenuProfileImage+'"><p>'+siteMenuInsertLineNick+'</p></div><div class="row top-nav-stats"><div class="col-xs-7 coins"><h2>'+siteMenuInsertLineCoins+' <img src="img/icons/coins/coins.png" style="margin-right: 0px;margin-top: -10px;margin-bottom: -3px;margin-left: 5px;width: 30px;"></h2></div><div class="col-xs-5 chips" onClick="buyChips();"><h2>'+siteMenuInsertLineChips+' <img src="img/icons/coins/chip.svg" style="margin-right: 0px;margin-top: -10px;margin-bottom: -3px;margin-left: 5px;width: 30px;"></h2></div></div><ul class="nav navbar-nav navbar-right"><li><a href="game.html"><img src="img/icons/menu/botin.svg" width="30px" style="margin-right: 5px;"> Juego</a></li><li><a href="league.html"><i style="color: #f5c940;margin-right: 8px;" aria-hidden="true" class="fa fa-trophy fa-2x"></i> Liga</a></li><li><a href="profile.html"><img src="img/icons/menu/user.svg" width="25px" style="margin-right: 10px;">Perfil</a></li><li><a href="wallet.html"><img src="img/icons/menu/jugacoin.svg" width="25px" style="margin-right: 10px;">Monedero</a></li><li><a href="referal.html"><img src="img/icons/menu/jugachip_glow.svg" width="30px" style="margin-right: 5px;">Gana <img src="img/icons/coins/chip.svg" width="15px"> ¡invita amigos!</a></li><li class="dropdown"> <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><img src="img/icons/menu/store.svg" width="25px" style="margin-right: 10px;">Tienda<span class="caret"></span></a> <ul class="dropdown-menu"> <li><a href="store.html">Premios</a></li><li><a href="exchanged.html">Canjeados</a></li></ul> </li><li><a href="history.html"><img src="img/icons/menu/ball.svg" width="25px" style="margin-right: 10px;">Historial</a></li><li><a href="champions.html"><img src="img/icons/menu/chop.svg" width="25px" style="margin-right: 10px;"> Muro de campeones</a></li><li class="dropdown open"> <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true"><img src="img/icons/menu/info_talk.svg" width="25px" style="margin-right: 10px;">Ayuda<span class="caret"></span></a> <ul class="dropdown-menu"> <li><a href="how-to-play.html">Como jugar</a></li><li><a href="tables-scores.html">Reglamento</a></li><li><a href="frecuent-questions.html">Preguntas frecuentes</a></li><li><a href="suport.html">Soporte</a></li><li><a href="privacity.html">Privacidad</a></li><li><a href="terms-conditions.html">Terminos y condiciones</a></li></ul> </li><li><a onclick="logOutFromJugaPlay();"><img src="img/icons/menu/exit.svg" width="25px" style="margin-right: 10px;">Log Out</a></li></ul></div>';
	return siteMenu;
}