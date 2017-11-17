// JavaScript Document
// La ventanas para los filtros
function openFilterWindow(title,content){
	useId='BS-FL-'+Math.floor((Math.random() * 1000000000) + 1);
	BootstrapDialog.show({
			 id: useId,
			 cssClass: 'filter-pop-up fade',
			 title: title,
            message: content,
			buttons: [{
                label: '<span class="trn">Aceptar</span>',
                action: function(dialogItself){
                    dialogItself.close();
                }
            }],
						onshown: function(dialogItself) {
												checkLanguageItem(dialogItself);
											}
		 });
}
function closeFilterWindow(windowToClose){
	$.each(BootstrapDialog.dialogs, function(id, dialog){
							if(id==windowToClose){
                            dialog.close();}
                        });
}
function testFilter(useId){
	return '<div class="list-style1"><a onClick="openFilterWindow();" href="#">San Lorenzo</a><a href="#">Independiente</a><a href="#" class="selected">Delanteros</span></a><a href="#">Defensores</a></div>';
}
