function createMenu(menuTitle, windowMenuId = "") {
	var props = {
		'{MENU_ID}': windowMenuId,
		'{TITLE}': menuTitle,
		'{PROFILE_IMAGE}': menuGetImage(),
		'{PROFILE_NICK}': menuGetNickName(),
		'{PROFILE_COINS}': menuGetAmountOfCoins(),
		'{PROFILE_CHIPS}': menuGetAmountOfChips(),
		'{showBack}': windowMenuId == "" ? "display:none;" : ""
	}
	return parseTemplate(props,TEMPLATE_MAIN_MENU);
}
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

	$(".menu-jp-to-update .update-coins").html(menuGetAmountOfCoins());
	$(".menu-jp-to-update .update-chips").html(menuGetAmountOfChips());
	checkLanguageElement(".menu-jp-to-update");
	$(".menu-jp-to-update").on('show.bs.collapse', function(){
					var left = $('.menu-jp-to-update').width();
				  $(".menu-jp-to-update").css('left', left+"px")
					$(".menu-jp-to-update").animate({"left":"0px"}, "slow");
					$("#jp-notf-cont").collapse("hide");
	    });
	$(".menu-jp-to-update").on('hide.bs.collapse', function(){
		var left = $('.menu-jp-to-update').width();
	  $(".menu-jp-to-update").animate({"left":left+"px"}, "fast");
	});
}
/*
================================================================================
================================= START ========================================
================================================================================
*/
/*
open
$(".nav-polls").css({left:left}).after(function() {
	$(".nav-polls").animate({"left":"0px"}, "slow");
});
close
function closeInternalSurveyPanel(){
	  // Get the calculated left position
	  var left = $('.nav-polls').width();
	 $(".nav-polls").animate({"left":left+"px"}, "slow", function() {$(this).remove()});
	 jpAnalyticsEvent("CLOSE_POLL", 'Jugaplay', 0);
}
*/
$(document).ready(function(){
	$("body").prepend(createMenu(menuGetMenuTitle(),""));
	checkLanguageElement("body");
	$(".menu-jp-to-update").on('show.bs.collapse', function(){
					var left = $('.menu-jp-to-update').width();
				  $(".menu-jp-to-update").css('left', left+"px")
					$(".menu-jp-to-update").animate({"left":"0px"}, "slow");
					$("#jp-notf-cont").collapse("hide");
	    });
	$(".menu-jp-to-update").on('hide.bs.collapse', function(){
		var left = $('.menu-jp-to-update').width();
	  $(".menu-jp-to-update").animate({"left":left+"px"}, "fast");
	});
});


/*
================================================================================
======================= MENU TEMPLATE CREATION =================================
================================================================================
var props = {
	'{MENU_ID}': windowMenuId,
	'{TITLE}': siteMenuInsertLineTitle,
	'{PROFILE_IMAGE}': siteMenuProfileImage,
	'{PROFILE_NICK}': siteMenuInsertLineNick,
	'{PROFILE_COINS}': siteMenuInsertLineCoins,
	'{PROFILE_CHIPS}': menuGetAmountOfChips();,
	'{showBack}': false
}
*/
var TEMPLATE_MAIN_MENU = ''
	+'<nav class="navbar navbar-default navbar-fixed-top main-nav">'
	+'	<div class="container-fluid main-nav-container">'

	+'		<div class="navbar-header">'
	+'			<button type="button" class="navbar-btn navbar-toggle collapsed btn-sanwich-menu " data-toggle="collapse" data-target="#top-navbar-collapse{MENU_ID}" aria-expanded="false">'
	+'				<span class="sr-only">Toggle navigation</span>'
	+'				<i class="fa fa-bars" aria-hidden="true"></i>'
	+'			</button>'
	+'			<button type="button" class="navbar-btn navbar-toggle collapsed btn-sanwich-menu " id="inner-alerts-jp-menu" data-toggle="collapse" data-target="#jp-notf-cont" onClick="clickOpenNotifications();" aria-expanded="false">'
	+'				<span class="sr-only">Toggle notifications</span>'
	+'				<i class="fa fa-bullhorn" aria-hidden="true"></i>'
	+'			</button>'

	+'			<button type="button" class="btn btn-warning btn-matchinfo btn-fancy btn-navbar-back" style="{showBack}" onclick="closeOverLapseWindow(\'{MENU_ID}\')">'
	+'				<i class="glyphicon glyphicon-chevron-left"></i>'
	+'			</button>'
	+'			<h4 class="text-center trn">{TITLE}</h4>'
	+'		</div>'

	+'		<div class="collapse navbar-collapse menu-jp-to-update" id="top-navbar-collapse{MENU_ID}">'
	+'			<div class="top-nav-user">'
	+'				<li class="dropdown" style=" text-align: right; color: #FFF; width: 100%; margin-bottom: -18px; display: block;"> <span href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span class="trn" data-trn-key="Idiomas">Languages</span><span class="caret"></span></span>'
  +'  				<ul class="dropdown-menu bg-color1" style=" right: 0; left: 50%;">'
  +'      			<li><a onclick="changeLanguageJp(\'es\');">Español</a></li>'
  +'      			<li><a onclick="changeLanguageJp(\'en\');">English</a></li>'
  +'      			<li><a onclick="changeLanguageJp(\'pt\');">Portugues</a></li>'
  +'  				</ul>'
	+'				</li>'
	+'				<img src="{PROFILE_IMAGE}" /><p>{PROFILE_NICK}</p>'
	+'			</div>'

	+'			<div class="row top-nav-stats">'
	+'				<div class="col-xs-6 coins">'
	+'					<h2><span class="update-coins">{PROFILE_COINS}</span> <img src="img/icons/coins/coins.png" class="currency"></h2>'
	+'				</div>'
	+'				<div class="col-xs-6 chips" onClick="buyChips();">'
	+'					<h2><span class="update-chips">{PROFILE_CHIPS}</span> <img src="img/icons/coins/chip.svg" class="currency"><i class="fa fa-plus-square" aria-hidden="true" style="position: absolute;color: #FFF;bottom: 15px;right: 30px;opacity: 0.7;font-size: 0.5em;"></i></h2>'
	+'				</div>'
	+'			</div>'

	+'			<ul class="nav navbar-nav navbar-right">'
	+'				<li><a onclick="buyChips();"><img src="img/icons/coins/chip.svg" width="22px" style="margin-right: 12px;"><span class="trn">Conseguir fichas</span></a></li>'
	+'				<li><a href="game.html"><img src="img/icons/menu/botin.svg" width="30px" style="margin-right: 5px;"> <span class="trn">Juego</span></a></li>'
	+'				<li><a href="league.html"><i style="color: #f5c940;margin-right: 8px;" aria-hidden="true" class="fa fa-trophy fa-2x"></i> <span class="trn">Liga</span></a></li>'
	+'				<li><a href="history.html"><img src="img/icons/menu/ball.svg" width="25px" style="margin-right: 10px;"><span class="trn">Historial</span></a></li>'
	+'				<li><a href="store.html"><img src="img/icons/menu/store.svg" width="25px" style="margin-right: 10px;"><span class="trn">Tienda de Premios</span></a></li>'
	+'				<li><a href="referal.html"><img src="img/icons/menu/jugachip_glow.svg" width="30px" style="margin-right: 5px;"><span class="trn">Gana <img src="img/icons/coins/chip.svg" width="15px"> ¡invita amigos!</span></a></li>'
	+'				<li><a href="champions.html"><img src="img/icons/menu/chop.svg" width="25px" style="margin-right: 10px;"><span class="trn">Muro de Campeones</span></a></li>'
	+'				<li><a href="profile.html"><img src="img/icons/menu/user.svg" width="25px" style="margin-right: 10px;"><span class="trn">Mi Perfil</span></a></li>'
	+'				<li class="dropdown open"> <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true"><img src="img/icons/menu/info_talk.svg" width="25px" style="margin-right: 10px;" /><span class="trn">Ayuda</span><span class="caret"></span></a>'
	+'					<ul class="dropdown-menu">'
	+'						<li><a href="how-to-play.html" class="trn">Como jugar</span></a></li>'
	+'						<li><a href="tables-scores.html" class="trn">Reglamento</span></a></li>'
	+'						<li><a href="frecuent-questions.html" class="trn">Preguntas frecuentes</span></a></li>'
	+'						<li><a href="suport.html" class="trn">Soporte</span></a></li>'
	+'						<li><a href="privacity.html" class="trn">Privacidad</span></a></li>'
	+'						<li><a href="terms-conditions.html" class="trn">Terminos y Condiciones</span></a></li>'
	+'					</ul>'
	+'				</li>'
	+'				<li><a onclick="logOutFromJugaPlay();"><img src="img/icons/menu/exit.svg" width="25px" style="margin-right: 10px;"><span class="trn">Log Out</span></a></li>'
	+'			</ul>'
	+'		</div>'
	+'	</div>'
	+'	<div id="jp-notf-cont" class="container text-color1 collapse"></div>'
	+'</nav>'
