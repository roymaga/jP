// JavaScript Document
// Este javascript esta encargado de manejar los avisos
function avisoEmergenteJugaPlay(titulo,texto){
		 BootstrapDialog.show({
			 cssClass: 'emergentes-mesa avisos',
			 title: titulo,
            message: "<div class='row'>"+texto+"</div>",
			buttons: [{
                label: 'Aceptar',
				id:'boton-panel-registro-aviso-error-pop-up',
                action: function(dialogItself){
                    dialogItself.close();
                }
            }]		 
		 });
		 return false;
	}