window.onload=setTimeout(function(){showActualLeague();}, 1000);
function showActualLeague(){
	askServerActualLeague();
}

$(document).ready(function(){
	// Initialize tabs.
	$('.jp-tabs li a').click(function (e) {
		e.preventDefault();
		$(this).tab('show');
		//var section = $(this).attr("data-section");
		//var title = $(this).attr("data-title");
	});

	// Swipe for principal Game features
	$("#league-main-tabs .tab-pane").swipe( {
		swipeLeft:function(event, direction, distance, duration, fingerCount) {
			event.preventDefault();
			var $tab = $('.jp-tabs .active').next();
						if ($tab.length > 0)
				$tab.find('a').click();
		},
		swipeRight: function(event, direction, distance, duration, fingerCount) {
			event.preventDefault();
			var $tab = $('.jp-tabs .active').prev();
						if ($tab.length > 0)
								$tab.find('a').click();
		},
		//Default is 75px -- sensiblidad con la que se mueve
		threshold:75
	});

	getLeaguesArchive();

	$(window).resize(function(){
		resizeLeagueRankingContent();
	});

	$("#leagueModalPlayers").parent().scroll(function() {
		var scrollLoadLimit = $("#leagueModalPlayers").height()-200;
		var currentScroll = $(this).scrollTop() + $(this).parent().height();
		var isLastPage = $("#leagueRankingModal").attr("league-page") == $("#leagueRankingModal").attr("total-pages");
		var isLoadingPage = $("#leagueRankingModal").attr("loading-page") != "-1";
	   if(currentScroll > scrollLoadLimit && !isLastPage && !isLoadingPage) {

			 loadArchivedLeaguePlayers(
				 	parseInt($("#leagueRankingModal").attr("league-id")),
					parseInt($("#leagueRankingModal").attr("league-page"))+1
			 );
	   }
	});
});
// JavaScript Document

// =============================================================================
// ------------------------------- LEAGUE LOADER -------------------------------
function askServerActualLeague(){
	var url = getJPApiURL()+"leagues/actual?page=1";

	$.ajaxSetup({
    crossDomain: true,
    xhrFields: {withCredentials: true}
	});

	$.get(url, {}, function(data) {
		$("#topLeague").html(parseLeagueTop(data));
		appendLeagueMatches(data);
	},"json")
  .fail(function(xhr) {
		if(xhr.readyState == 4 && xhr.status == 401) {
			ifLogInIsNeed();
		}else{
			avisoEmergenteJugaPlayConnectionError();
		}
  })
  .always(function() {

  });
}

function getLeaguesArchive(){
	var url = getJPApiURL()+"leagues/?page=1";

	$.ajaxSetup({
    crossDomain: true,
    xhrFields: {withCredentials: true}
	});

	$.get(url, {}, function(data) {
		//$("#topLeague").html(parseLeagueTop(data));
		//appendLeagueMatches(data);
		appendArchive(data.leagues);
	},"json")
  .fail(function(xhr) {
		if(xhr.readyState == 4 && xhr.status == 401) {
			ifLogInIsNeed();
		}else{
			avisoEmergenteJugaPlayConnectionError();
		}
  });
}

// =============================================================================
// ------------------------------- LEAGUE HEADER -------------------------------

function parseLeagueTop(league){
	var props = {
		'{NAME}' : 'LIGA JUGAPLAY #'+league.league_data.id,
		'{PLAYER_POSITION}': parseUserPosition(league.league_data.user_league),
		'{FROM_DATE}': dateFormatViewLeague(league.league_data.starts),
		'{TO_DATE}': dateFormatViewLeague(league.league_data.ends),
		'{STATUS}': parseAmountAndActualRound(league.league_data),
		'{TOTAL_PLAYERS}': league.league_data.users_playing,
		'{MATCHES_PER_ROUND}': league.league_data.amount_of_matches,
		'{PRIZES}': parsePrizeForLeagueTop(league.league_data.prizes)
	}
	return parseTemplate(props,TEMPLATE_LEAGUE_HEADER);
}

function appendArchive(leagues) {
	$("#archive-tab").html("");
	for(league in leagues){

		if(leagues[league].status > 1) {
			var props = {
				'{LEAGUE_ID}':leagues[league].id,
				'{NAME}' : 'LIGA JUGAPLAY #'+leagues[league].id,
				'{PLAYER_POSITION}': parseUserPosition(leagues[league].user_league),
				'{FROM_DATE}': dateFormatViewLeague(leagues[league].starts),
				'{TO_DATE}': dateFormatViewLeague(leagues[league].ends),
				'{STATUS}': parseAmountAndActualRound(leagues[league]),
				'{TOTAL_PLAYERS}': leagues[league].users_playing,
				'{MATCHES_PER_ROUND}': leagues[league].amount_of_matches,
				'{PRIZES}': parsePrizeForLeagueTop(leagues[league].prizes)
			}
			var txt = parseTemplate(props,TEMPLATE_LEAGUE_ARCHIVE_ITEM);
			$("#archive-tab").append(txt);
		}
	}
}

function parseAmountAndActualRound(league) {
	// "starts": "21/08/2017 - 15:07",
	// "ends": "23/08/2017 - 15:07",
	var amount_rounds=Math.ceil(diffOfDaysBetweenDates(league.starts, league.ends)/league.frequency);
	var actual_round=Math.ceil(daysFromDate(league.starts)/league.frequency);
	if(actual_round>amount_rounds){actual_round=amount_rounds;}
	return 'Fecha '+actual_round+' de '+amount_rounds;
}

function parseUserPosition(user_league) {
	if(user_league.points_acumulative===undefined || user_league.points_acumulative=="N/A"){
		return '';
	}else{
		return user_league.user_position+'° | '+user_league.points_acumulative+' Pts';
	}
}

function parsePrizeForLeagueTop(prizes) {
	var tmp=" ";

	for(prize in prizes){
		if(prizes[prize].prize_type!=undefined) {

			var props = {
				'{POSITION_NAME}' : '',
				'{PRIZE_VALUE}': prizes[prize].prize_value,
				'{PRIZE_TYPE}': parseImgUrlChipsOrCoins(prizes[prize].prize_type)
			}

			switch (prizes[prize].position) {
				case 1:
					props['{POSITION_NAME}'] = 'PRIMER PUESTO';
					break;
				case 2:
					props['{POSITION_NAME}'] = 'SEGUNDO PUESTO';
					break;
				case 3:
					props['{POSITION_NAME}'] = 'TERCER PUESTO';
					break;
				default:
					props['{POSITION_NAME}'] = 'PREMIO';
					break;
			}

			tmp += parseTemplate(props, TEMPLATE_LEAGUE_HEADER_PRIZE);
		}
	}
	return tmp;
}

function typeOfPrizeLeague(type) {
	if(type=="coins"){
			return 'coins.png';
		}else		{
			return 'chip.svg';
		}
}

// =============================================================================
// -------------------------   LEAGUE RANKING   --------------------------------

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
function parseUserLeagueComplete(ranking,isArchive = false) {
	var name = (ranking.nickname.length > 12) ? ranking.nickname.substring(0,9)+"..." : ranking.nickname;
	var props = {
		'{ZEBRA}': oddOrEven(ranking.position),
		'{POSITION}': ranking.position,
		'{MOVEMENT}': parseRankingMovement(ranking.movement),
		'{NAME}': name,
		'{SCORE}': ranking.points_acumulative,
		'{USER_ID}': ranking.user_id,
		'{IS_ARCHIVE}': (isArchive) ? "a_" : "",
		'{MATCHES_DETAIL}': innerDetailLeagueMatches(ranking.rounds)
	}

	return parseTemplate(props,TEMPLATE_LEAGUE_RANKING_USER);
}
function parseRankingMovement(movement){
	if(movement==0){
		return '';
	}
	if(movement<0){
		return '<span style=" color: #8cec90;"><i class="fa fa-caret-up" aria-hidden="true" style=" margin-right: 3px;"></i>'+parseInt(movement*-1)+'</span>';
	}
	if(movement>0){
		return '<span style=" color: #ec8c8c;"><i class="fa fa-caret-down" aria-hidden="true" style=" margin-right: 3px;"></i>'+parseInt(movement)+'</span>';
	}
}
function innerDetailLeagueMatches(rounds){
	var tmp='';
	for (round in rounds){
		if(rounds[round].user_position!=undefined){

			var matches = '';
			for(table in rounds[round].tables){
				if(rounds[round].tables[table].points!=undefined){

					var props2 = {
						'{TABLE_NAME}':rounds[round].tables[table].table_name,
						'{TABLE_SCORE}':rounds[round].tables[table].points,
					}
					matches += parseTemplate(props2,TEMPLATE_LEAGUE_RANKING_ROUND_MATCH)
				}
			}

			var props = {
				'{ROUND}': rounds[round].round,
				'{VARIATION}': parseRankingMovement(rounds[round].movement),
				'{SCORE}': rounds[round].points_of_round,
				'{MATCHES}':matches
			}
			tmp += parseTemplate(props,TEMPLATE_LEAGUE_RANKING_ROUND);
		}
	}
	return tmp;
}
function checkIfVisible(){
	$(window).scroll(function() {
	   if(($(window).scrollTop() + $(window).height() > $(document).height()-200)&& !window.reachLast) {
		   window.reachLast=true;
		   checkNextPageOfLeague();
	   }
	});
}

function checkNextPageOfLeague(){
	addLoaderToCertainContainer(document.getElementById("resultsLeague"));
	var url = getJPApiURL()+"leagues/actual?page="+window.nextPageToCheck;

	$.ajaxSetup({
    crossDomain: true,
    xhrFields: {withCredentials: true}
	});

	$.get(url, {}, function(data) {
		removeLoaderFromCertainContainer(document.getElementById("resultsLeague"));
		appendLeagueMatches(data);
	},"json")
  .fail(function(xhr) {
		if(xhr.readyState == 4 && xhr.status == 401) {
			ifLogInIsNeed();
		}else{
			avisoEmergenteJugaPlayConnectionError();
		}
  })
  .always(function() {

  });
}

// =============================================================================
// ---------------------   LEAGUE RANKING MODAL   ------------------------------

function openLeagueRanking(leagueId) {
	$("#leagueRankingModal").attr("league-id",leagueId);
	$("#leagueRankingModal").attr("league-page",1);
	$("#leagueModalPlayers").html('<div class="loader"><div class="ball-loader"></div></div>');
	$("#leagueRankingModal").modal();
	resizeLeagueRankingContent();
	loadArchivedLeaguePlayers(leagueId);
}

function resizeLeagueRankingContent() {
	var modalContentHeight = $(window).height() * 0.75 - $("#leagueRankingModal .modal-header").outerHeight();
	$("#leagueRankingModal .modal-scrolled-body").css("height",modalContentHeight+"px");
}

function loadArchivedLeaguePlayers(leagueId,page = 1) {
	console.log("League:"+leagueId+" -> page:"+page);
	$("#leagueRankingModal").attr("loading-page",page);
	if(page > 1) {
		addLoaderToCertainContainer(document.getElementById("leagueModalPlayers"));
	}
	var url = getJPApiURL()+"leagues/"+leagueId+"?page="+page;

	$.ajaxSetup({
    crossDomain: true,
    xhrFields: {withCredentials: true}
	});

	$.get(url, {}, function(data) {
		removeLoaderFromCertainContainer(document.getElementById("leagueModalPlayers"));
		$("#leagueRankingModal").attr("total-pages",data.pagination.total_pages);
		$("#leagueRankingModal").attr("league-page",data.pagination.current_page);
		for(index in data.league_rankings) {
			$("#leagueModalPlayers").append(parseUserLeagueComplete(data.league_rankings[index],true));
		}
	},"json")
  .fail(function(xhr) {
		if(xhr.readyState == 4 && xhr.status == 401) {
			ifLogInIsNeed();
		}else{
			avisoEmergenteJugaPlayConnectionError();
		}
  })
	.always(function(){
		$("#leagueRankingModal").attr("loading-page",-1);
		console.log("End loading");
	});
}

/*
===============================================================================
========================   LEAGUE TEMPALTES   =================================
===============================================================================
*/

/*
var props = {
	'{NAME}' : 'LIGA JUGAPLAY #'+league.league_data.id,
	'{PLAYER_POSITION}': parseUserPosition(league.league_data),
	'{FROM_DATE}': dateFormatViewLeague(league.league_data.starts),
	'{TO_DATE}': dateFormatViewLeague(league.league_data.ends),
	'{STATUS}': parseAmountAndActualRound(league),
	'{TOTAL_PLAYERS}': league.league_data.users_playing,
	'{MATCHES_PER_ROUND}': league.league_data.amount_of_matches,
	'{PRIZES}': parsePrizeForLeagueTop(league.league_data.prizes)
}
*/
var TEMPLATE_LEAGUE_HEADER = ''
		+'<div class="col-xs-12 nopadding">'
		+'	<div class="container-fluid nopadding">'
		+'		<div class="row-fluid nopadding">'
		+'			<div class="col-xs-12 league-header">'
		+'				<p class="league-name"><b>{NAME}</b></p>'
		+'				<p class="player-position"><b>{PLAYER_POSITION}</b></p>'
		+'			</div>'
		+'		</div>'
		+'		<div class="row-fluid nopadding">'
		+'			<div class="col-xs-12 nopadding league-details">'
		+'				<div class="container-fluid nopadding">'
		+'					<div class="row-fluid nopadding">'
		+'						<div class="col-xs-6 league-stats">'
		+'							<p><i class="fa fa-calendar"></i>Del <b>{FROM_DATE}</b> al <b>{TO_DATE}</b></p>'
		+'							<p><i class="fa fa-calendar-o"></i>{STATUS}</p>'
		+'							<p><i class="fa fa-users"></i>{TOTAL_PLAYERS} participantes</b></p>'
		+'							<p><i class="fa fa-futbol-o"></i><b>{MATCHES_PER_ROUND} partidos</b> por fecha</p>'
		+'						</div>'
		+'						<div class="col-xs-6 league-prizes">'
		+'							{PRIZES}'
		+'						</div>'
		+'					</div>'
		+'				</div>'
		+'			</div>'
		+'		</div>'
		+'	</div>'
		+'</div>';

	/*
	var props = {
		'{POSITION_NAME}' : ,
		'{PRIZE_VALUE}': ,
		'{PRIZE_TYPE}':
	}
	*/
var TEMPLATE_LEAGUE_HEADER_PRIZE = ''
		+'<div class="league-prizes-row">'
		+'	<p class="league-prizes-row-position"><b>{POSITION_NAME}</b></p>'
		+'	<p class="league-prizes-row-amount"><b>{PRIZE_VALUE}</b> <img src="{PRIZE_TYPE}"></p>'
		+'</div>';

/*
	var props = {
		'{ZEBRA}': oddOrEven(ranking.position),
		'{POSITION}': ranking.position,
		'{MOVEMENT}': parseRankingMovement(ranking.movement),
		'{NAME}': ranking.nickname,
		'{SCORE}': ranking.points_acumulative,
		'{USER_ID}': ranking.user_id,
		'{MATCHES_DETAIL}': innerDetailLeagueMatches(ranking.rounds)
	}
*/
var TEMPLATE_LEAGUE_RANKING_USER = ''
		+'<div class="row league-ranking-player-container">'
		+'	<div class="col-xs-12 nopadding league-ranking-player">'
		//+'		<div class="ranking-user-position">'
		+'			<p class="ranking-position"><b>{POSITION}° </b></p>'
		+'			<p class="ranking-variation">{MOVEMENT}</p>'
		//+'		</div>'
		+'		<p class="ranking-username">{NAME}</p>'
		+'		<p><button type="button" class="btn btn-success btn-fancy-small" data-toggle="collapse" data-target="#show-openDetail-League{IS_ARCHIVE}{USER_ID}" aria-expanded="false" onclick="changeEyeButton(this)"><i class="fa fa-eye" aria-hidden="true"></i></button></p>'
		+'		<p class="ranking-score">{SCORE} Pts</p>'
		+'	</div>'
		//+'</div>'
		//+'<div class="row">'
		+'	<div class="col-xs-12 nopadding collapse" id="show-openDetail-League{IS_ARCHIVE}{USER_ID}">'
		+'		<div class="container ranking-details-container">'
		+'			{MATCHES_DETAIL}'
		+'		</div>'
		+'	</div>'
		+'</div>';

/*
	var props = {
		'{ROUND}': rounds[round].round,
		'{VARIATION}': parseRankingMovement(rounds[round].movement),
		'{SCORE}': rounds[round].points_of_round,
		'{MATCHES}'
	}
*/
var TEMPLATE_LEAGUE_RANKING_ROUND = ''

		+'	<div class="row ranking-round">'
		+'		<div class="col-xs-12 ranking-round-title">'
		+'			<p class="inline"><b>FECHA {ROUND}</b>&nbsp;{VARIATION}</p>'
		+'			<p class="inline right nomarginbot"><b>{SCORE} Pts</b></p>'
		+'		</div>'
		+'		{MATCHES}'
		+'	</div>'


/*
	var props = {
		'{TABLE_NAME}':rounds[round].tables[table].table_name,
		'{TABLE_SCORE}':rounds[round].tables[table].points,
	}
*/
var TEMPLATE_LEAGUE_RANKING_ROUND_MATCH = ''
		+'<div class="col-xs-12 ranking-match">'
		+'	<p class="inline">{TABLE_NAME}</p>'
		+'	<p class="inline right nomarginbot">{TABLE_SCORE} Pts</p>'
		+'</div>';



/*
	var props = {
		'{LEAGUE_ID}' :,
		'{NAME}' :,
		'{PLAYER_POSITION}' :,
		'{FROM_DATE}':,
		'{TO_DATE}':,
		'{STATUS}':,
		'{TOTAL_PLAYERS}':,
		'{MATCHES_PER_ROUND}':,
		'{PRIZES}':
	}
*/
var TEMPLATE_LEAGUE_ARCHIVE_ITEM = ''
		+'<div class="col-xs-12 league-archive-item nopadding">'
		+'	<div class="container item-header">'
		+'		<div class="row">'
		+'			<div class="col-xs-7">'
		+'				<p class="name">{NAME}</p>'
		+'				<p class="score"><b>{PLAYER_POSITION}</b></p>'
		+'			</div>'
		+'			<div class="col-xs-5 buttons">'
		+'				<button class="btn btn-warning btn-fancy-small" onclick="openLeagueRanking({LEAGUE_ID});"><i class="fa fa-trophy"></i></button>'
		+'				<button class="btn btn-success btn-fancy-small" data-toggle="collapse" data-target="#show-archive-detail{LEAGUE_ID}" aria-expanded="false" onclick="changeEyeButton(this)">'
		+'					<i class="fa fa-eye"></i>'
		+'				</button>'
		+'			</div>'
		+'		</div>'
		+'	</div>'
		+'	<div id="show-archive-detail{LEAGUE_ID}" class="container collapse" aria-expanded="false">'
		+'		<div class="row nopadding">'
		+'			<div class="col-xs-12 league-details nopadding">'
		+'				<div class="container">'
		+'					<div class="row nopadding">'
		+'						<div class="col-xs-6 league-stats">'
		+'							<p><i class="fa fa-calendar"></i>Del <b>{FROM_DATE}</b> al <b>{TO_DATE}</b></p>'
		+'							<p><i class="fa fa-calendar-o"></i>{STATUS}</p>'
		+'							<p><i class="fa fa-users"></i>{TOTAL_PLAYERS} participantes</p>'
		+'							<p><i class="fa fa-futbol-o"></i><b>{MATCHES_PER_ROUND} partidos</b> por fecha</p>'
		+'						</div>'
		+'						<div class="col-xs-6 league-prizes">'
		+'							{PRIZES}'
		+'						</div>'
		+'					</div>'
		+'				</div>'
		+'			</div>'
		+'		</div>'
		+'	</div>'
		+'</div>'
