// JavaScript Document
// Documento de ejemplo de ventanas emergentes
	function jugar(){
		 BootstrapDialog.show({
			 cssClass: 'emergentes-mesa',
			 title: "<div class='col-xs-4'>MEJORES 7 CANALLAS</div><div class='col-xs-6' id='titulo-opciones-mesa-en-juego'><div class='col-xs-4 data-game'>INFORMACION</div><div class='col-xs-4 data-game'>PARTICIPANTES</div><div class='col-xs-4 data-game'>PREMIOS</div></div><div class='col-xs-2'><div class='bloques-informativo'><div class='bloque-informativo b1'><H3>17:30</H3><p>EMPIEZA</p></div><div class='bloque-informativo b2'><H3>20:30</H3><p>TERMINA</p></div><div class='bloque-informativo b3'><H4>1024 Pts</H4><p>PREMIOS</p></div></div></div>",
            message: "<div id='contenido-mesa-en-juego'>"+contenidoDeLaMesa()+"</div>",
			buttons: [{
                label: 'Jugar',
				id:'boton-mesa-en-juego',
                action: function(dialog) {
                    juegoEmpezo(dialog);
                }
            }]
		 
		 });
	}
	function reJugar(){
		 BootstrapDialog.show({
			 title: 'Juego nombre mesa',
            message: 'Hi Apple!',
			buttons: [{
                label: 'Title 1',
                action: function(dialog) {
                    dialog.setTitle('Title 1');
                }
            }, {
                label: 'Title 2',
                action: function(dialog) {
                    dialog.setTitle('Title 2');
                }
            }]
		 
		 });
	}