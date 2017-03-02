// JavaScript Document
// 2-Argentino 4-Libertadores 5-Chileno
// Filtro para las tablas principales
window.tablesFilterArray=new Array();
function openTablesFilterWindow(){
	tableTitle='<H4>Filtrar Campeonatos</H4>';
	content=createShowTablesFilter();
	openFilterWindow(tableTitle,content);
}
function createShowTablesFilter(){
	simulateTablesFilter=[{"filterName":"dataTournament-type","dataFilter":"8","showName":"Torneo Argentino","openFunction":null},{"filterName":"dataTournament-type","dataFilter":"10","showName":"Torneo Chileno","openFunction":null},{"filterName":"dataTournament-type","dataFilter":"9","showName":"Champions League","openFunction":null},{"filterName":"dataTournament-type","dataFilter":"11","showName":"Liga Española","openFunction":null},{"filterName":"dataTournament-type","dataFilter":"12","showName":"Premier League","openFunction":null},{"filterName":"dataTournament-type","dataFilter":"3","showName":"Partidos Especiales","openFunction":null}];
	content='<div class="list-style1">';
	for(individual in simulateTablesFilter){
		if(window.tablesFilterArray.indexOf(simulateTablesFilter[individual].dataFilter)!=-1){// Esta contenido en el Arreglo
				content+='<a data-tournament-type="'+simulateTablesFilter[individual].dataFilter+'" onClick="filterTableOption(this)" class="selected">'+simulateTablesFilter[individual].showName+'</a>';
			}else{// No esta contenido en el Arreglo
			content+='<a data-tournament-type="'+simulateTablesFilter[individual].dataFilter+'" onClick="filterTableOption(this)">'+simulateTablesFilter[individual].showName+'</a>';
			}
	}
	content+='</div>';
	return content;
}
function filterTableOption(element){
	if(element.className=="selected"){
		element.className="";
		index=window.tablesFilterArray.indexOf(element.getAttribute('data-tournament-type'));
		if(index>-1)
		window.tablesFilterArray.splice(index, 1);
			}else{//.getAttribute('data-position-type')
		element.className="selected";
		window.tablesFilterArray.push(element.getAttribute('data-tournament-type'));
		}
	applyTableFilter();
}
function applyTableFilter(){
	tablesInContainer=document.getElementById("tables-container-show").getElementsByClassName("match-list-item");
	for(table in tablesInContainer){
		if(tablesInContainer[table].innerHTML !== undefined){
			//alert(table+'--'+JSON.stringify(tablesInContainer[table])+'innerHtml:'+tablesInContainer[table].innerHTML);
			//alert(tablesInContainer[table].getAttribute('data-tournament-type'));
			actualAttribute=tablesInContainer[table].getAttribute('data-tournament-type');
			index=window.tablesFilterArray.indexOf(actualAttribute);
			if(index>-1 || window.tablesFilterArray.length==0)
				{tablesInContainer[table].style.display="block";}
			else
				{tablesInContainer[table].style.display="none";}
			
		}
	}
}
// Fin Filtro para las tablas principales
// Filtro para la tabla Individual
function initializeFiltersForTable(){
window.tableOpenedFilterArrayTeams=[];
window.tableOpenedFilterArrayPositions=[];
}
function createShowIndividualTableFilter(openTable){
	tableTitle='<H4>Filtrar Jugadores</H4>';
	content=createShowIndividualTableFilterContent(openTable);
	openFilterWindow(tableTitle,content);
}
function createShowIndividualTableFilterContent(){
	openTable= window.actualOpenTable;
	// Armado filtro para los equipos
	simulateTablesFilterTeams=[];
	matchesInTable=openTable.matches;
	content='<div class="list-style1">';
	for(a in matchesInTable){// Para cada partido de la mesa
		teamLocal={"filterName":"data-player-team","dataFilter":matchesInTable[a].local_team.name,"showName":"<img class='team-logo' src='"+clubGetLogo(matchesInTable[a].local_team.id)+"'> "+matchesInTable[a].local_team.name,"openFunction":null};
		simulateTablesFilterTeams.push(teamLocal);
		teamVisitor={"filterName":"data-player-team","dataFilter":matchesInTable[a].visitor_team.name,"showName":"<img class='team-logo' src='"+clubGetLogo(matchesInTable[a].visitor_team.id)+"'> "+matchesInTable[a].visitor_team.name,"openFunction":null};
		simulateTablesFilterTeams.push(teamVisitor);
	}
	for(individual in simulateTablesFilterTeams){
		if(window.tableOpenedFilterArrayTeams.indexOf(simulateTablesFilterTeams[individual].dataFilter)!=-1){// Esta contenido en el Arreglo
				content+='<a data-filter-type="'+simulateTablesFilterTeams[individual].dataFilter+'" onClick="filterIndividualTableOption(this,1)" class="selected">'+simulateTablesFilterTeams[individual].showName+'</a>';
			}else{// No esta contenido en el Arreglo
			content+='<a data-filter-type="'+simulateTablesFilterTeams[individual].dataFilter+'" onClick="filterIndividualTableOption(this,1)">'+simulateTablesFilterTeams[individual].showName+'</a>';
			}
	}
	// Armado filtro para las posicione
	simulateTablesFilterPositions=[];
	shownName=traducirPosicionJugadorMesa("goalkeeper");
	goalkeeperFilter={"filterName":"data-player-position","dataFilter":"goalkeeper","showName":shownName,"openFunction":null};
	simulateTablesFilterPositions.push(goalkeeperFilter);
	shownName=traducirPosicionJugadorMesa("defender");
	defenderFilter={"filterName":"data-player-position","dataFilter":"defender","showName":shownName,"openFunction":null};
	simulateTablesFilterPositions.push(defenderFilter);
	shownName=traducirPosicionJugadorMesa("midfielder");
	midfielderFilter={"filterName":"data-player-position","dataFilter":"midfielder","showName":shownName,"openFunction":null};
	simulateTablesFilterPositions.push(midfielderFilter);
	shownName=traducirPosicionJugadorMesa("forward");
	forwardFilter={"filterName":"data-player-position","dataFilter":"forward","showName":shownName,"openFunction":null};
	simulateTablesFilterPositions.push(forwardFilter);
	for(individual in simulateTablesFilterPositions){
		if(window.tableOpenedFilterArrayPositions.indexOf(simulateTablesFilterPositions[individual].dataFilter)!=-1){// Esta contenido en el Arreglo
				content+='<a data-filter-type="'+simulateTablesFilterPositions[individual].dataFilter+'" onClick="filterIndividualTableOption(this,2)" class="selected">'+simulateTablesFilterPositions[individual].showName+'</a>';
			}else{// No esta contenido en el Arreglo
				content+='<a data-filter-type="'+simulateTablesFilterPositions[individual].dataFilter+'" onClick="filterIndividualTableOption(this,2)">'+simulateTablesFilterPositions[individual].showName+'</a>';
			}
	}
	content+='</div>';
	return content;
}
function filterIndividualTableOption(element, which){
	if(which==1){windowArray=window.tableOpenedFilterArrayTeams;}else{windowArray=window.tableOpenedFilterArrayPositions;}
	if(element.className=="selected"){
		element.className="";
		index=windowArray.indexOf(element.getAttribute('data-filter-type'));
		if(index>-1)
		windowArray.splice(index, 1);
			}else{//.getAttribute('data-position-type')
		element.className="selected";
		windowArray.push(element.getAttribute('data-filter-type'));
		}
	if(which==1){window.tableOpenedFilterArrayTeams=windowArray;}else{window.tableOpenedFilterArrayPositions=windowArray;}	
	applyIndividualTableFilter();
}
function applyIndividualTableFilter(){
	playersInContainer=document.getElementById("container-listed-players-table").getElementsByClassName("players-list-item");
	for(player in playersInContainer){
		if(playersInContainer[player].innerHTML !== undefined){
			actualAttributePosition=playersInContainer[player].getAttribute('data-player-position');
			actualAttributeTeam=playersInContainer[player].getAttribute('data-player-team');
			index1=window.tableOpenedFilterArrayTeams.indexOf(actualAttributeTeam);
			index2=window.tableOpenedFilterArrayPositions.indexOf(actualAttributePosition);
			if((index1>-1 || window.tableOpenedFilterArrayTeams.length==0)&&(index2>-1 || window.tableOpenedFilterArrayPositions.length==0))
				{playersInContainer[player].style.display="block";}
			else
				{playersInContainer[player].style.display="none";}
			
		}
	}
	addFilterToFilterBoxShowOnTable();
}
function addFilterToFilterBoxShowOnTable(){
	filtersShown='';
	for(filter in window.tableOpenedFilterArrayTeams){
		filtersShown+='<div class="filter-item"><p>'+window.tableOpenedFilterArrayTeams[filter]+' <a onClick="deletFromIndividualFilter(1,'+filter+');"> x</a></p></div>';
	}
	for(filter in window.tableOpenedFilterArrayPositions){
		filtersShown+='<div class="filter-item"><p>'+traducirPosicionJugadorMesa(window.tableOpenedFilterArrayPositions[filter])+' <a onClick="deletFromIndividualFilter(2,'+filter+');"> x</a></p></div>';
	}
	document.getElementById("filter-list-shown-in-table").innerHTML=filtersShown;
	updatePositionOfPlayersForWindow();
}
function deletFromIndividualFilter(which,index){
	if(which==1){window.tableOpenedFilterArrayTeams.splice(index, 1);}else{window.tableOpenedFilterArrayPositions.splice(index, 1);}
	applyIndividualTableFilter();
}
