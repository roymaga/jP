// JavaScript Document
// window.selectedUsersToFromGroup
function createChallengeWithFormedGroupOfFriends(groupId, groupName, amountOfUsers){
	window.amountOfUsersForChallange=amountOfUsers;
	var enetryPrize=5;
	var potPrize=amountOfUsers*enetryPrize;
	document.getElementById("challenge-visible-dom").innerHTML='<div class="container title-box bg-color3"><div class="row vertical-align"><div class="col-xs-9"><h1>'+amountOfUsers+' INTEGRANTES</h1></div><div class="col-xs-3 text-right"><i class="fa fa-users fa-2x" aria-hidden="true" style="color: #fff;"></i></div></div></div><div class="container nopadding"> <div class="row-fluid center-block"><form name="form-crear-desafio" id="form-crear-desafio"> <div class="col-xs-12"> <div class="form-group"> <label for="nombreDesafio">Nombre del grupo</label> <input type="text" class="form-control" id="challengeGroupName" name="challengeGroupName" value="'+groupName+'" readonly="readonly"/> </div><div class="form-group"> <label for="challengeMode">Modalidad de Juego</label> <select class="form-control" id="challengeMode" name="challengeMode"> <option value="0">Ganador se lleva el pozo</option> <option value="1">Sin pozo ni entrada</option> </select> </div></div><div class="col-xs-12 challenge-pot-manage bg-color6"> <div class="form-group"> <div class="col-xs-6"> <label>Entrada</label> </div><div class="col-xs-4 text-right"> <input class="form-control pull-left" name="priceOfChallenge" id="priceOfChallenge" type="number" value="'+enetryPrize+'"/> </div><div class="col-xs-2"> <img src="img/coin.png" class="pull-right img-responsive monedasDesafio"> </div></div></div><div class="col-xs-12 challenge-pot-manage bg-color7"> <div class="form-group"> <div class="col-xs-6"> <label>Pozo Estimado</label> </div><div class="col-xs-4 text-right"> <input type="number" name="potSize" class="form-control pull-left" style="background-color:#fff;" id="potSize" value="'+potPrize+'" readonly="readonly"/> </div><div class="col-xs-2"> <img src="img/icons/coins/coins.png" class="pull-right img-responsive monedasDesafio"> </div></div></div></form> </div></div><div class="container bg-color2 btn-play-container" onClick="continueToSelectMatch()"><button type="button" class="btn btn-play">ELEGIR PARTIDO</button></div>';
	createChallengeInitializeVariables(true);
}
function createChallengeWithNoGroupClose(){
	var amountOfUsers=(window.selectedUsersToFromGroup.length+1);
	window.amountOfUsersForChallange=amountOfUsers;
	var enetryPrize=5;
	var potPrize=amountOfUsers*enetryPrize;
	document.getElementById("challenge-visible-dom").innerHTML='<div class="container title-box bg-color3"><div class="row vertical-align"><div class="col-xs-9"><h1>'+amountOfUsers+' INTEGRANTES</h1></div><div class="col-xs-3 text-right"><i class="fa fa-users fa-2x" aria-hidden="true" style="color: #fff;"></i></div></div></div><div class="container nopadding"> <div class="row-fluid center-block"><form name="form-crear-desafio" id="form-crear-desafio"> <div class="col-xs-12"> <div class="form-group"> <label for="nombreDesafio">Nombre del grupo</label> <input type="text" class="form-control" id="challengeGroupName" name="challengeGroupName" placeholder="Ingresa el nombre del grupo"> </div><div class="form-group"> <label for="challengeMode">Modalidad de Juego</label> <select class="form-control" id="challengeMode" name="challengeMode"> <option value="0">Ganador se lleva el pozo</option> <option value="1">Sin pozo ni entrada</option> </select> </div></div><div class="col-xs-12 challenge-pot-manage bg-color6"> <div class="form-group"> <div class="col-xs-6"> <label>Entrada</label> </div><div class="col-xs-4 text-right"> <input class="form-control pull-left" name="priceOfChallenge" id="priceOfChallenge" type="number" value="'+enetryPrize+'"/> </div><div class="col-xs-2"> <img src="img/coin.png" class="pull-right img-responsive monedasDesafio"> </div></div></div><div class="col-xs-12 challenge-pot-manage bg-color7"> <div class="form-group"> <div class="col-xs-6"> <label>Pozo Estimado</label> </div><div class="col-xs-4 text-right"> <input type="number" name="potSize" class="form-control pull-left" style="background-color:#fff;" id="potSize" value="'+potPrize+'" readonly="readonly"/> </div><div class="col-xs-2"> <img src="img/icons/coins/coins.png" class="pull-right img-responsive monedasDesafio"> </div></div></div></form> </div></div><div class="container bg-color2 btn-play-container" onClick="continueToSelectMatch()"><button type="button" class="btn btn-play pending">COMPLETAR DATOS</button></div>';
	// challengeGroupName
	createChallengeInitializeVariables(false);	
}
function createChallengeInitializeVariables(formedGroup){
	setTimeout(function(){
		if(!formedGroup){$( "#challengeGroupName" ).keyup(function() {
				var button= document.getElementById("challenge-visible-dom").getElementsByClassName("btn-play").item(0);				
		  		if(document.getElementById("challengeGroupName").value.length>0){
					if(button.classList.contains("pending")){
						button.classList.remove("pending");
						button.innerHTML="ELEGIR PARTIDO";
					}
				}else{
					if(!button.classList.contains("pending")){
						button.classList.add("pending");
						button.innerHTML="COMPLETAR DATOS";
					}
				}
		});}
	$( "#priceOfChallenge" ).keyup(function() {
		  		estimatePotPrizeforChallege();
		});
	$( "#challengeMode" ).change(function() {
		var showPrize= document.getElementById("challenge-visible-dom").getElementsByClassName("challenge-pot-manage").item(0);
		if(document.getElementById("challengeMode").value==0){
			$( ".challenge-pot-manage" ).css('display','block');
		}else{
			$( ".challenge-pot-manage" ).css('display','none');
		}
				
		});
	}	,1500);
}
function estimatePotPrizeforChallege(){
	var coins=document.getElementById("priceOfChallenge").value;
	document.getElementById("potSize").value=window.amountOfUsersForChallange*coins;
}
function continueToSelectMatch(){
	if(document.getElementById("challengeMode").value==0){
		window.prizeForChallenge=document.getElementById("priceOfChallenge").value;
	}else{
		window.prizeForChallenge=0;
	}
	window.nameForGroup=document.getElementById("challengeGroupName").value;
	if(document.getElementById("challengeGroupName").value.length>0){
		selectMatchForChallenge();
	}
}
/*
challenge-pot-manage
var button= document.getElementById("challenge-visible-dom").getElementsByClassName("btn-play").item(0);
	if(!button.classList.contains("pending") && window.selectedUsersToFromGroup.length==0){
		button.classList.add("pending");
		button.innerHTML="Agregue usuarios al grupo";
	}
*/