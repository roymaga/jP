// JavaScript Document
function openFabookConect(url){
	BootstrapDialog.show({
			 cssClass: 'log-in-pop-up',
			 title: "Fabook Log In",
            message: '<iframe src="http://app.jugaplay.com/api/v1/users/auth/facebook?invited_by=1"></iframe>',
			buttons: [{
                label: 'Log In',
				id:'boton-panel-login',
                action: function(dialog) {
                    logInUsuarioEnElSitio();
                }
            }]
		 
		 });
}