// JavaScript Document
function checkConnection() {
if (typeof(navigator.connection.type) !== 'undefined'){
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
}else{
		window.timeToWait = setTimeout(function(){ toSlowInternet(); }, 20000);
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