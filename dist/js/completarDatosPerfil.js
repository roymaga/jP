// JavaScript Document
window.onload=completarPerfilUsuario();
function completarPerfilUsuario(){
	if(window.datosUsuario!=null){
		rellenarCamposPerfil(window.datosUsuario);
	}else{
		setTimeout(function(){completarPerfilUsuario();}, 500);
	}
}
function rellenarCamposPerfil(usuario){
	//{"id":1,"first_name":"Admin","last_name":"Admin","nickname":"admin","email":"admin@jugaplay.com","member_since":"08/01/2016","image":null}
	//alert("Datos a completar-->"+usuario.email+usuario.first_name+usuario.last_name+usuario.nickname);
	document.getElementById("nameBigShow").innerHTML=usuario.first_name;
	document.getElementById("nicBigShow").innerHTML=usuario.nickname;
	document.getElementById("nicNameInputChange").value=usuario.nickname;
	document.getElementById("firstNameInputChange").value=usuario.first_name;
	document.getElementById("lastNameInputChange").value=usuario.last_name;
	document.getElementById("emailInputChange").value=usuario.email;
	document.getElementById("recomendationLink").value="www.jugaplay.com/pages/login.html?invitedby="+usuario.nickname+"&cnl="+hideUserHash(usuario.id);
}
window.onload=setTimeout(function(){rellenarRankingYPuntos();}, 500);
function rellenarRankingYPuntos(){
	if(window.rankingPrimeraA[4]!=undefined && window.rankingLibertadores[4]!=undefined){
		if(window.rankingPrimeraA[4]!="undefined"){
		document.getElementById("posTorneoPrimeraAPerfil").innerHTML=window.rankingPrimeraA[5];// Ya lo traigo con el °
		document.getElementById("pointsTorneoPrimeraAPerfil").innerHTML=window.rankingPrimeraA[4]+" Pts";}
		if(window.rankingLibertadores[4]!="undefined"){
		document.getElementById("posTorneoLibertadoresPerfil").innerHTML=window.rankingLibertadores[5];
		document.getElementById("pointsTorneoLibertadoresPerfil").innerHTML=window.rankingLibertadores[4]+" Pts";}
	}else{
		setTimeout(function(){rellenarRankingYPuntos();}, 100);
	}
}
function hideUserHash(hide){
	//parseInt("9ix", 36) un hide
	return (parseInt(hide)+500).toString(36);
}