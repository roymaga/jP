// JavaScript Document
// User data Control
function userDataJugaPlayInitial(data){
	window.userDataJugaPlay=parseUserData(data);
}
function parseUserData(data){
	data.coins=parseInt(data.coins);
	data.chips=parseInt(data.chips);
	return data;
}
function userDataJugaPlayUpdate(data){
	window.IsLoggedInVar=true;
	data.last_check=new Date(); // Aca chequeo la conexión
	data.last_update=new Date(); // Aca que actualice los datos desde el servidor
	setCookie("juga-Play-Data", JSON.stringify(data), 120);
	window.userDataJugaPlay=parseUserData(data);
	if(typeof(updateMenusValues)==="function"){
		setTimeout(function(){ updateMenusValues(); }, 500);
	}else{
		setTimeout(function(){ userDataJugaPlayUpdate(data); }, 200);
	} // Actualizo los valores del Menu
}
function updateLastCheck(){
	var data=JSON.parse(getCookie("juga-Play-Data"));
	data.last_check=new Date();
	setCookie("juga-Play-Data", JSON.stringify(data), 120);
}
// Hacer el Log out de la cuenta
function logOutFromJugaPlay(){
	delete_cookie("juga-Play-User");
	delete_cookie("juga-Play-Pass");
	delete_cookie("juga-Play-Data");
	delete_cookie("jugaPlayUserRemember");
	delete_cookie("jugaPlayUserFacebook");
	// Consulta para salir y que lleve a login
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
	 	 if ((xmlhttp.readyState==4))
	    {
			window.location="login.html";
			return true;
	    }
	 	 }
		xmlhttp.open("DELETE",getJPApiURL()+"logout",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send();
}
// Functions with coins
function userCanSpentXCoins(costOfTransaction){
	return !(window.userDataJugaPlay.coins<costOfTransaction);
}
function userCanSpentXChips(costOfTransaction){
	return !(window.userDataJugaPlay.chips<costOfTransaction);
}
function getUserJugaplayId(){
	return window.userDataJugaPlay.id;
}
function getUserJugaplayCoins(){
	return window.userDataJugaPlay.coins;
}
function getUserJugaplayChips(){
	return window.userDataJugaPlay.chips;
}
function getUserJugaplayEmail(){
	return window.userDataJugaPlay.email;
}
function getUserJugaplayNick(){
	return window.userDataJugaPlay.nickname;
}
function getUserSyncTelephone(){
	if(window.userDataJugaPlay.telephone!=null){return true;}
	else{return false;}
}
function getUserSyncFacebook(){
	if(window.userDataJugaPlay.has_facebook_login!=false){return true;}
	else{return false;}
}
function getUserSyncEmail(){
	if(window.userDataJugaPlay.email!=null){
		if(window.userDataJugaPlay.email.indexOf("guest.com") == -1){
			return true;
		}else{
			return false;
		}
	}
	else{return false;}
}
function editXCoinsFromUsersWallet(coins){// it can be positive or negative
	window.userDataJugaPlay.coins+=coins;
	var cookieSave=JSON.stringify(window.userDataJugaPlay);
	setCookie("juga-Play-Data", cookieSave, 120);
	setTimeout(function(){ if (typeof updateMenusValues !== "undefined") { updateMenusValues();} }, 500);
}
function editXChipsFromUsersWallet(chips){// it can be positive or negative
	window.userDataJugaPlay.chips+=chips;
	var cookieSave=JSON.stringify(window.userDataJugaPlay);
	setCookie("juga-Play-Data", cookieSave, 120);
	if (typeof updateMenusValues !== "undefined") { updateMenusValues();}
}
function editDataFromUser(first_name, last_name, email, nickname){
	window.userDataJugaPlay.first_name=first_name;
	window.userDataJugaPlay.last_name=last_name;
	window.userDataJugaPlay.email=email;
	window.userDataJugaPlay.nickname=nickname;
	var cookieSave=JSON.stringify(window.userDataJugaPlay);
	setCookie("juga-Play-Data", cookieSave, 120);
	setTimeout(function(){ if (typeof updateMenusValues !== "undefined") { updateMenusValues();} }, 500);
}
