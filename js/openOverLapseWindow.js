// JavaScript Document
window.derreferArray=[];
window.lastScreenArray=[];
function openOverLapseWindow(titleForOpenWindow, contentForOpenWindow){
	useId='BS-'+Math.floor((Math.random() * 1000000000) + 1);
	var element =  document.getElementById('boton-close-loading'); // Prueb que se cierre el Loading
	if (typeof(element) != 'undefined' && element != null)
	{ 
		document.getElementById('boton-close-loading').click();
		setTimeout(function(){
			lastScreen={bodyShown:document.body.innerHTML, bodyYPosition:document.body.scrollTop}
			window.lastScreenArray.push(lastScreen);
			document.body.innerHTML=contentOfOverLapseWindow(useId, titleForOpenWindow, contentForOpenWindow);
			document.body.scrollTop="0px";
			setTimeout(function(){ updateMenusValues() }, 500); // Actualizo los valores del Menu
			}, 500);
	}else{
			lastScreen={bodyShown:document.body.innerHTML, bodyYPosition:document.body.scrollTop}
			window.lastScreenArray.push(lastScreen);
			document.body.innerHTML=contentOfOverLapseWindow(useId, titleForOpenWindow, contentForOpenWindow);
			document.body.scrollTop="0px";
			setTimeout(function(){ updateMenusValues() }, 500); // Actualizo los valores del Menu
	}
}
function closeOverLapseWindow(windowToClose){
	lastScreen=window.lastScreenArray.pop();
	document.body.innerHTML=lastScreen.bodyShown;
	document.body.scrollTop=lastScreen.bodyYPosition;
	if (typeof initializeGameVars == 'function') { 
 		 setTimeout(function(){ initializeGameVars(); }, 500);
	}
	setTimeout(function(){ updateMenusValues() }, 500);
	
}
function closeAllOverLapseWindow(){
	while(window.lastScreenArray.length>0){
		lastScreen=window.lastScreenArray.pop();
		document.body.innerHTML=lastScreen.bodyShown;
		document.body.scrollTop=lastScreen.bodyYPosition;		
	}
	if (typeof initializeGameVars == 'function') { 
 		 setTimeout(function(){ initializeGameVars(); }, 500);
	}
	setTimeout(function(){ updateMenusValues() }, 500);
}
function contentOfOverLapseWindow(windowToClose, titleForOpenWindow, contentForOpenWindow){
	idOpen=windowToClose;
	windowMenu=createMenu(titleForOpenWindow, windowToClose);
	return windowMenu+'<div class="spacer-top"></div>'+contentForOpenWindow;
}
/*$.each(BootstrapDialog.dialogs, function(id, dialog){
							window.derreferArray[id].resolve("true");
                            dialog.close();}
document.body.scrollTop;
                        );*/