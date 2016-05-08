// JavaScript Document
function openFabookConect(url){
	BootstrapDialog.show({
			 cssClass: 'log-in-pop-up',
			 title: "Fabook Log In",
            message: '<iframe src="'+url+'"></iframe>',
			buttons: [{
                label: 'Log In',
				id:'boton-panel-login',
                action: function(dialog) {
                    logInUsuarioEnElSitio();
                }
            }]
		 
		 });
}