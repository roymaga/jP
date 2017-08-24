// JavaScript Document
setTimeout(function(){showActualLeague();}, 1000);
function showActualLeague(){
	askServerActualLeague();
}
function askServerActualLeague(){
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
	 	 if ((xmlhttp.readyState==4 && xmlhttp.status==200) ||  (xmlhttp.readyState==4 && xmlhttp.status==422))
	    {
			var jsonStr=xmlhttp.responseText;
			if(IsJsonString(jsonStr)){ // Me fijo si dio un error, en el caso de que de le sigo mandando
				$("#topLeague").html(parseLeagueTop(JSON.parse(jsonStr)));
				appendLeagueMatches(JSON.parse(jsonStr));
			}else{
				askServerActualLeague();
			}
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404 || xmlhttp.status==105){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlayConnectionError();
			 return "ERROR";
			}else if((xmlhttp.readyState==4 && xmlhttp.status==401)){
				ifLogInIsNeed();
				//setTimeout(function(){showAvailableTablesToPlay();}, 1000);
			}
	 	 }
		xmlhttp.open("GET",getJPApiURL()+"leagues/actual?page=1",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send();	
}


function parseLeagueTop(league){
	var TEMPLATE_TOP_LEAGUE_CONTENT = ''
	+'<div class="container title-box bg-color1 text-color2 contact-list-title" style="border-bottom: 3px solid #f5c940;">'
	+'	<div class="text-left">'
	+'		<h1><i style="color: #f5c940;margin-right: 8px;" aria-hidden="true" class="fa fa-trophy fa-2x"></i> LIGA JUGAPLAY</h1>'
	+'		<h4>Del <b>'+dateFormatViewLeague(league.league_data.starts)+'</b> al <b>'+dateFormatViewLeague(league.league_data.ends)+'</b></h4>'
	+'	</div>'
	+'	<div class="container vertical-align">'
	+''+parsePrizeForLeagueTop(league.league_data.prizes)+''
	+'	</div>'
	+'	<div class="row text-left">'
	+'		<div class="col-xs-6">'
	+'			<h4>'+parseAmountAndActualRound(league)+'</h4></div>'
	+'		<div class="col-xs-6 text-right">'
	+'			<h4>'+parseUserPosition(league.league_data)+' </h4></div>'
	+'	</div>'
	+'</div>'
	return TEMPLATE_TOP_LEAGUE_CONTENT;//parseTemplate(props, template);
}
// "starts": "21/08/2017 - 15:07",
// "ends": "23/08/2017 - 15:07",
function parseAmountAndActualRound(league){
	var amount_rounds=Math.ceil(diffOfDaysBetweenDates(league.league_data.starts, league.league_data.ends)/league.league_data.frequency);
	var actual_round=Math.ceil(daysFromDate(league.league_data.starts)/league.league_data.frequency);
	if(actual_round>amount_rounds){actual_round=amount_rounds;}
	return 'Fecha '+actual_round+' de '+amount_rounds; 
} 
function parseUserPosition(league_data){
	if(league_data.points_acumulative===undefined){
		return '';
	}else{
		return league_data.user_position+'° | '+league_data.points_acumulative+' Pts'; 
	}
	
}
function parsePrizeForLeagueTop(prizes){
	var txt=" ";
	var TEMPLATE_PRIZE_LEAGUE = ''
	+'		<button type="button" class="btn btn-success" style="margin: 5px;">'
	+'			<h1>  {PRIZE_VALUE} <img src="{PRIZE}" style="margin-right: 0px;margin-top: -10px;margin-bottom: -3px;margin-left: 5px;width: 20px;"></h1><small>{POSITION}° Puesto</small></button>';
	for(prize in prizes){
		if(prizes[prize].prize_type!=undefined){
			var props= {'{PRIZE}': parseImgUrlChipsOrCoins(prizes[prize].prize_type),'{POSITION}': prizes[prize].position,'{PRIZE_VALUE}': prizes[prize].prize_value}
			txt+=parseTemplate(props, TEMPLATE_PRIZE_LEAGUE);
		}
	}
	return txt;
}
function typeOfPrizeLeague(type){
	if(type=="coins"){
			return 'coins.png';
		}else		{
			return 'chip.svg';
		}
}
function changeEyeButton(button){
	if($(button).hasClass("active")){
		$(button).removeClass("active");
	}else{
		$(button).addClass("active");
	}
}
function appendLeagueMatches(league){
	for (ranking in league.league_rankings){
		if(league.league_rankings[ranking].position!=undefined){
			$("#resultsLeague").append(parseUserLeagueComplete(league.league_rankings[ranking]));
		}
	}
	if(league.pagination.current_page<league.pagination.total_pages){
	 window.nextPageToCheck=parseInt(league.pagination.current_page)+1;
	 setTimeout(function(){window.reachLast=false;checkIfVisible();}, 1000);
	}
}
// oddOrEven(number)
function parseUserLeagueComplete(ranking){
	innerDetail='';
	return '<div class="row players-list-item vertical-align league-match-row text-color2 '+oddOrEven(ranking.position)+'"><div class="col-xs-9"><div class="row" style="display: list-item;"><div class="col-xs-4"><b>'+ranking.position+'° </b> <small>'+parseRankingMovement(ranking.movement)+'</small></div><div class="col-xs-5 nopadding" style="overflow: hidden;white-space: nowrap; text-overflow: ellipsis;"> '+ranking.nickname+'</div><div class="col-xs-3 nopadding text-right"> <b>'+ranking.points_acumulative+' Pts</b></div></div></div><div class="col-xs-3"><button type="button" class="btn btn-success " data-toggle="collapse" data-target="#show-openDetail-League'+ranking.user_id+'" aria-expanded="false" onclick="changeEyeButton(this)"><i class="fa fa-eye fa-2x" aria-hidden="true"></i></button></div><div class="collapse" id="show-openDetail-League'+ranking.user_id+'"><div class="match-detail" style="padding: 10px;">'+innerDetailLeagueMatches(ranking.rounds)+'</div></div></div></div>';
}
function parseRankingMovement(movement){
	if(movement==0){
		return '';
	}
	if(movement>0){
		return '<span style=" color: #8cec90;"><i class="fa fa-caret-up" aria-hidden="true" style=" margin-right: 3px;"></i>'+movement+'</span>';
	}
	if(movement<0){
		return '<span style=" color: #ec8c8c;"><i class="fa fa-caret-down" aria-hidden="true" style=" margin-right: 3px;"></i>'+movement+'</span>';
	}
}
function innerDetailLeagueMatches(rounds){
	var txt='';
	for (round in rounds){
		if(rounds[round].user_position!=undefined){
			txt+='<div class="row" style="margin-bottom: 5px;margin-top: 15px;"><div class="col-xs-9"> <b>Fecha '+rounds[round].round+'</b> <small>'+parseRankingMovement(rounds[round].movement)+'</div><div class="col-xs-3 text-right"> '+rounds[round].points_of_round+' Pts</div></div>';
			for(table in rounds[round].tables){
				if(rounds[round].tables[table].points!=undefined){
					txt+='<div class="row"><div class="col-xs-9"> <small>'+rounds[round].tables[table].table_name+'</small></div><div class="col-xs-3 text-right"> <small>'+rounds[round].tables[table].points+' Pts</small></div></div>';
				}
			}
		}
	}
	return txt;
}
function checkIfVisible(){
	$(window).scroll(function() {
	   if(($(window).scrollTop() + $(window).height() > $(document).height()-50)&& !window.reachLast) {
		   window.reachLast=true;
		   checkNextPageOfLeague();
	   }
	});
}
function checkNextPageOfLeague(){
	addLoaderToCertainContainer(document.getElementById("resultsLeague"));
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
	 	 if ((xmlhttp.readyState==4 && xmlhttp.status==200) ||  (xmlhttp.readyState==4 && xmlhttp.status==422))
	    {
			var jsonStr=xmlhttp.responseText;
			if(IsJsonString(jsonStr)){ // Me fijo si dio un error, en el caso de que de le sigo mandando
				removeLoaderFromCertainContainer(document.getElementById("resultsLeague"));
				appendLeagueMatches(JSON.parse(jsonStr));
			}else{
				checkNextPageOfLeague();
			}
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404 || xmlhttp.status==105){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlayConnectionError();
			 return "ERROR";
			}else if((xmlhttp.readyState==4 && xmlhttp.status==401)){
				ifLogInIsNeed();
			}
	 	 }
		xmlhttp.open("GET",getJPApiURL()+"leagues/actual?page="+window.nextPageToCheck,true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send();
}