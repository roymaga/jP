// JavaScript Document
function abrirNoticiasForo(){
	ga('send', 'event', 'Foro Open', 'Noticias Viejas', '');
	//window.userCoinsToPlay
		tituloMesa=headerDeForo();
		 contenidoMesa=contenidoDeForo();
		 BootstrapDialog.show({
			 cssClass: 'emergentes-pop-up-gen',
			 title: tituloMesa,
            message: "<div class='contenido-interno'>"+contenidoMesa+"</div>" 
		 });
}
function headerDeForo(){
	texto="<div class='row'></div><div class='row'><H1>Noticias</H1></div>";
	return texto;
}
function contenidoDeForo(){
	linea1="<div class='row'><div class='noticias-viejas'><img src='../img/foro/muestra.jpg'><div class='preview'><p><b>River no aparece</b></p><p>Pese a que tuvo la iniciativa y exhibió un buen inicio, el Millonario sufrió un golazo inesperado.</p></div></div></div>";
	texto=linea1+linea1+linea1+linea1+linea1+linea1+linea1;
	return texto;
}