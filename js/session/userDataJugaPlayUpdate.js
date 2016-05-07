// JavaScript Document
// User data Control
function userDataJugaPlayInitial(data){
	window.userDataJugaPlay=data;
}
function userDataJugaPlayUpdate(data){
	//window.userDataJugaPlay was update
	//alert("data Update");
	data.last_check=new Date();
	data.last_update=new Date();
	cookieSave=JSON.stringify(data);
	setCookie("juga-Play-Data", cookieSave, 120);
	window.userDataJugaPlay=data;
	updateMenusValues();// Update menu / menus with data
}
// Hacer el Log out de la cuenta
function logOutFromJugaPlay(){
	delete_cookie("juga-Play-User");
	delete_cookie("juga-Play-Pass");
	delete_cookie("juga-Play-Data");
	delete_cookie("jugaPlayUserRemember");
	delete_cookie("jugaPlayUserFacebook");
	// Consulta para salir y que lleve a login
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
	 	 if ((xmlhttp.readyState==4))
	    {
			window.location="login.html";
			return true;
	    }
	 	 }
		xmlhttp.open("DELETE","http://app.jugaplay.com/api/v1/logout",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send();}
}
// Functions with coins
function userCanSpentXCoins(costOfTransaction){
	return !(window.userDataJugaPlay.coins<costOfTransaction);
}
function editXCoinsFromUsersWallet(coins){// it can be positive or negative
	window.userDataJugaPlay.coins+=coins;
	cookieSave=JSON.stringify(window.userDataJugaPlay);
	setCookie("juga-Play-Data", cookieSave, 120);
	updateMenusValues();
}
function editDataFromUser(first_name, last_name, email, nickname){
	window.userDataJugaPlay.first_name=first_name;
	window.userDataJugaPlay.last_name=last_name;
	window.userDataJugaPlay.email=email;
	window.userDataJugaPlay.nickname=nickname;
	cookieSave=JSON.stringify(window.userDataJugaPlay);
	setCookie("juga-Play-Data", cookieSave, 120);
	updateMenusValues();
}