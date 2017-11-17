// JavaScript Document
window.derreferArray=[];
window.lastScreenArray=[];
function openOverLapseWindow(titleForOpenWindow, contentForOpenWindow){
	var useId='BS-'+Math.floor((Math.random() * 1000000000) + 1);
	var element =  document.getElementById('boton-close-loading'); // Prueb que se cierre el Loading
	if (typeof(element) != 'undefined' && element != null)
	{
		document.getElementById('boton-close-loading').click();
		setTimeout(function(){
			var lastScreen={bodyShown:document.body.innerHTML, bodyYPosition:document.body.scrollTop}
			window.lastScreenArray.push(lastScreen);
			document.body.innerHTML=contentOfOverLapseWindow(useId, titleForOpenWindow, contentForOpenWindow);
			document.body.scrollTop="0px";
			setTimeout(function(){ updateMenusValues() }, 500); // Actualizo los valores del Menu
			checkLanguageElement($("body"));
			}, 500);
	}else{
			var lastScreen={bodyShown:document.body.innerHTML, bodyYPosition:document.body.scrollTop}
			window.lastScreenArray.push(lastScreen);
			document.body.innerHTML=contentOfOverLapseWindow(useId, titleForOpenWindow, contentForOpenWindow);
			document.body.scrollTop="0px";
			setTimeout(function(){ updateMenusValues() }, 500); // Actualizo los valores del Menu
			checkLanguageElement($("body"));
	}
}
function closeOverLapseWindow(windowToClose){
	var lastScreen=window.lastScreenArray.pop();
	document.body.innerHTML=lastScreen.bodyShown;
	document.body.scrollTop=lastScreen.bodyYPosition;
	// initializeGameVars()
	if (typeof initializeGameVars == 'function') {
 		 setTimeout(function(){ initializeGameVars(); }, 500);
	}
	setTimeout(function(){ updateMenusValues(); }, 500);
	checkLanguageElement($("body"));

}
function closeAllOverLapseWindow(){
	while(window.lastScreenArray.length>0){
		var lastScreen=window.lastScreenArray.pop();
		document.body.innerHTML=lastScreen.bodyShown;
		document.body.scrollTop=lastScreen.bodyYPosition;
	}
	if (typeof initializeGameVars == 'function') {
 		 setTimeout(function(){ initializeGameVars(); }, 500);
	}
	setTimeout(function(){ updateMenusValues() }, 500);
	checkLanguageElement($("body"));
}
function contentOfOverLapseWindow(windowToClose, titleForOpenWindow, contentForOpenWindow){
	var idOpen=windowToClose;
	var windowMenu=createMenu(titleForOpenWindow, windowToClose);
	return windowMenu+'<div class="spacer-top"></div>'+contentForOpenWindow;
}
