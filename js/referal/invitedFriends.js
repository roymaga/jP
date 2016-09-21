// JavaScript Document
window.onload=setTimeout(function(){ loadAllUsersInvitatios(); }, 1000);
function loadAllUsersInvitatios(){
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
	 	 if ((xmlhttp.readyState==4 && xmlhttp.status==200) ||  (xmlhttp.readyState==4 && xmlhttp.status==422))
	    {
			stopTimeToWait();
			var jsonStr=xmlhttp.responseText;
			if(IsJsonString(jsonStr)){ // Me fijo si dio un error, en el caso de que de le sigo mandando
				loadAllUsersInvited(JSON.parse(jsonStr));
			}else{
				loadAllUsersInvitatios();
			}
			
	    }else if(xmlhttp.status==503 || xmlhttp.status==404){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlay("ERROR DE CONEXI&Oacute;N","<p>Hubo un error de conexi&oacute; intente nuevamente</p>");
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("GET","http://app.jugaplay.com/api/v1/users/"+getUserJugaplayId()+"/requests/",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send();	
	}
}
function loadAllUsersInvited(invitatios){
	var InvitedUsers=[];
	for(invitation in invitatios){
		for(invited in invitatios[invitation].invitations){
			if(invitatios[invitation].invitations[invited].status=="Registered"){
				InvitedUsers.push({"type":invitatios[invitation].request_type, "date":invitatios[invitation].invitations[invited].created_at, "nick":invitatios[invitation].invitations[invited].guest_user.nickname, "won_coins":invitatios[invitation].invitations[invited].won_coins });
			}
		}
	}
	showAllUserInvited(InvitedUsers);
}
function showAllUserInvited(InvitedUsers){
	var TotalInvited=InvitedUsers.length;
	var totalThisMonth=0;
	var html='';
	for (user in InvitedUsers){
		if(isThisMonth(InvitedUsers[user].date)){totalThisMonth++;}
		html+=parseInvitedUser(InvitedUsers[user], user);
	}
	if(InvitedUsers.length>0){
	document.getElementById("allInvitationsContainers").innerHTML=html;}
	document.getElementById("totalUserRegisterNumber").innerHTML=InvitedUsers.length+" ";
	document.getElementById("totalUserRegisterNumber2").innerHTML=InvitedUsers.length;
	document.getElementById("totalUserMonthNumber").innerHTML=totalThisMonth;
	var d=new Date();
	document.getElementById("totalUserMonthTxt").innerHTML="Registrados en "+returnFullMonthName(d.getMonth()+1);
	//isThisMonth(dateA)
}
function parseInvitedUser(user, count){
	if(count%2==0){var oddEven="odd";}else{var oddEven="even";}
	return'<div class="row players-list-item vertical-align color-player-list3 '+oddEven+'"> <div class="col-xs-2 text-right nopadding"> <img src="'+translateInvtitationToIcon(user.type)+'" style="width:25px"> </div><div class="col-xs-5 player-name"><p>'+user.nick+'</p></div><div class="col-xs-2 text-right nopadding"> '+dateFormatViewDay(user.date)+' </div><div class="col-xs-3"> <p class="text-right nomarging"> <span class="text-block-style1">+'+user.won_coins+'</p></div></div>';
}
function translateInvtitationToIcon(type){
	if(type=="Twitter"){return "img/icon-twitter-circle-original.png";}
	if(type=="Facebook"){return "img/icon-facebook-circle-original.png";}
	if(type=="Whatsapp"){return "img/icon-whatsapp-circle-original.png";}
	if(type=="Mail"){return "img/icon-email-circle-grey.png";}
	if(type=="Link"){return "img/icon-link-circle-original.png";}
}