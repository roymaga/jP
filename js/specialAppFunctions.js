// JavaScript Document
function checkConnection() {
var state = navigator.connection.type;
if (state == window.Connection.NONE)
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
function stopTimeToWait(){
	clearTimeout(window.timeToWait);
}
function toSlowInternet(){
	// Mensaje de aviso mas corta el loading
	closeLoadingAnimation();
	avisoEmergenteJugaPlay("Conexión muy lenta","<p>Su conexión a internet está muy lenta. Es posible que no pueda disfrutar la experiencia Jugaplay debido a esta causa.</p>");
}