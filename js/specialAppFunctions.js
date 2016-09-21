// JavaScript Document
function checkConnection() {
	var state = navigator.connection.type;
	if (state.toUpperCase() == "NONE")
	{
		avisoEmergenteJugaPlay("Sin conexión","<p>No se encontró una conexión a internet.</p>");
		closeLoadingAnimation();
		return false;
	}
	else
	{
		window.timeToWait = setTimeout(function(){ toSlowInternet(); }, 20000);
		return true;
	}
}
function checkConnection2() {
	alert("Check connection 2");
	var state = navigator.connection.type;
	if (state.toUpperCase() == "NONE")
	{
		return false;
	}
	else
	{
		return true;
	}
}
function stopTimeToWait(){
	clearTimeout(window.timeToWait);
}
function toSlowInternet(){
	// Mensaje de aviso mas corta el loading
	closeLoadingAnimation();
	avisoEmergenteJugaPlay("Conexión muy lenta","<p>Su conexión a internet está muy lenta. Es posible que no pueda disfrutar la experiencia Jugaplay debido a esta causa.</p>");
}
document.addEventListener("deviceready", onDeviceReadyVisible, false);

function onDeviceReadyVisible() {
    // Now safe to use the PhoneGap API
	window.plugin.statusbarOverlay.isVisible( function (isVisible) {
    // console.log('status bar is visible') if isVisible;
	window.plugin.statusbarOverlay.hide();
});
}

/*
// Cuando esta offline
document.addEventListener("offline", onOffline, false);

function onOffline() {
    // Handle the offline event
}
// Cuando entra en online
document.addEventListener("online", onOnline, false);

function onOnline() {
    // Handle the online event
}

 */