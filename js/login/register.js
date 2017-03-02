// JavaScript Document
// Este javascript esta encargado de manejar el registro del sitio
window.invitationTknId=0;
function abrirRegistro(){
  		if (checkCookie()!=true) { 
    		avisoEmergenteJugaPlay("Habilitar las cookies","<p>Para poder disfrutar la experiencia Jugaplay es necesario que tenga las cookies de su navegador habilitadas</p>");
	  }else{
	BootstrapDialog.show({
			 cssClass: 'log-in-pop-up register',
			 title: "Registrate Gratis",
            message: "<div class='row'><div onclick='processFacebook(\"register\");' class='botton-general-size facebook'>Registro con Facebook</div></div><div class='row'>-O-</div><div class='row'><input placeholder='Nickname' id='nickname-pop' class='botton-general-size' type='text' value=''></div><div class='row'><input placeholder='E-Mail' id='email-pop' class='botton-general-size' type='text' value=''></div><div class='row'><input placeholder='Password' id='password-pop' class='botton-general-size' type='password' value=''></div><div class='row' style='padding-left: 15px;    padding-right: 15px;'>Creando una cuenta está aceptando los <a style=' margin-right: 20px; cursor: pointer;' onclick='openTermsAndConditions();'>términos y condiciones</a></br><input type='checkbox' id='checkKeepLogIn' checked>  Recordar</div>",
			buttons: [{
                label: 'Registrarse',
				id:'boton-panel-registro',
                action: function(dialog) {
                    registrarUsuarioEnElSitio();
                }
            }]
		 
		 });
		 setTimeout(function(){alwaysShowInputValues();}, 1500);
		 }
}
function registrarUsuarioEnElSitio(){
	var mail=document.getElementById("email-pop").value;
	var pass=document.getElementById("password-pop").value;
	var nickname=document.getElementById("nickname-pop").value;
	if(mail.length < 1 || pass.length < 1 || nickname.length < 1 ){
		if(mail.length < 1 && pass.length < 1 ){
			avisoEmergenteJugaPlay("Campos vacios","<p>Los Campos <b>Email, Contraseña y Nickname</b> son obligatorios</p>");
			}
		else{
			if(mail.length < 1){
				avisoEmergenteJugaPlay("Campo vacio","<p>El Campo <b>email</b> es obligatorio</p>");
			}else if (pass.length < 1){
				avisoEmergenteJugaPlay("Campo vacio","<p>El Campo <b>contraseña</b> es obligatorio</p>");
			}else{
				avisoEmergenteJugaPlay("Campo vacio","<p>El Campo <b>nickname</b> es obligatorio</p>");
			}
		}	// Termina el tipo de mensaje
	return false ;
	}else if( pass.length < 8){
		avisoEmergenteJugaPlay("Contraseña muy corta","<p>La <b>contraseña</b> debe tener al menos <p>8 caracteres</p>");
		return false ;
	};// Si paso es que los campos estan bien
	//https://www.jugaplay.com/?invitedby=RiverCampeon2&cnl=fy
	if(window.invitationTknId>0){
		var json=JSON.stringify({ "user": { "first_name": "NONE","last_name": "NONE", "email": mail, "password":pass,"nickname":nickname } ,"invitation_token":window.invitationTknId });
	}else{
		var json=JSON.stringify({ "user": { "first_name": "NONE","last_name": "NONE", "email": mail, "password":pass,"nickname":nickname } });
	}
	if(startLoadingAnimation()==true){
	mensajeAlServidorConContenidoRegistro(json, mail, pass);}
}
function mensajeAlServidorConContenidoRegistro(json, mail, pass){
	if(checkConnection()){var xmlhttp;
		if (window.XMLHttpRequest)
	 	 {// code for IE7+, Firefox, Chrome, Opera, Safari
	  		xmlhttp=new XMLHttpRequest();
	  		}
		else
	  	{// code for IE6, IE5
	 	 xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	 	 }
		xmlhttp.onreadystatechange=function()
	  	{
	 	 if ((xmlhttp.readyState==4 && xmlhttp.status==200) ||  (xmlhttp.readyState==4 && xmlhttp.status==422))
	    {
			jsonStr=xmlhttp.responseText;
			stopTimeToWait();
			//alert(jsonStr);
			var json=JSON.stringify(jsonStr);
			var servidor=JSON.parse(json);
			var doble=JSON.parse(servidor);
			analizarRespuestaRegistro(doble, mail, pass);
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlay("ERROR DE CONEXIÓN","<p>Hubo un error de conexió intente nuevamente</p>");
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("POST","http://app.jugaplay.com/api/v1/users",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send(json);		
	}
}
function analizarRespuestaRegistro(servidor, mail, pass){
	if (typeof(servidor.errors) !== 'undefined' || typeof(servidor.error) !== 'undefined'  ){
		closeLoadingAnimation();
		if (typeof(servidor.errors.email) !== 'undefined'){
			avisoEmergenteJugaPlay("Mail en uso","<p>El mail <b>"+document.getElementById("email-pop").value+"</b> ya esta registrado en JugaPlay</p>");
			return false;
		}else{
			avisoEmergenteJugaPlay("Error inesperado","<p>Algo salio mal, vuelva a intentar</p>");
			return false;
		}
	}else{// Salio todo bien
		fbq('track', 'CompleteRegistration');
		window.registerInSite=true;
		logInUsuarioEnElSitioPostRegistro(mail, pass);
	}
}
function hacerLogOutPreventivo(){
	if(checkConnection()){var xmlhttp;
		if (window.XMLHttpRequest)
	 	 {// code for IE7+, Firefox, Chrome, Opera, Safari
	  		xmlhttp=new XMLHttpRequest();
	  		}
		else
	  	{// code for IE6, IE5
	 	 xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	 	 }
		xmlhttp.onreadystatechange=function()
	  	{
	 	 if ((xmlhttp.readyState==4))
	    {
			stopTimeToWait();
			//alert(xmlhttp.responseText);
			//analizarRespuestaRegistroBeta(doble);
			return true;
	    }
	 	 }
		xmlhttp.open("DELETE","http://app.jugaplay.com/api/v1/logout",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send();	
	}
}
function probarSinRegistro(){
	var rand = Math.floor((Math.random() * 100000000000000) + 1);
	var rand2 = Math.floor((Math.random() * 100000000000000) + 1);
	var mail=rand+"@guest.com";
	var pass="testpassw"+rand2;
	var nickname="Invitado"+rand;
	setCookie("jugaPlayUserRemember", "true", 120);
	setCookie("jugaPlayUserFacebook", "false", 120);
	setCookie("juga-Play-User", mail, 120);
	setCookie("juga-Play-Pass", pass, 120);
	var mailInput = document.createElement("input");
	mailInput.type="hidden";
	mailInput.value=mail;
	mailInput.id="email-pop";
	document.body.appendChild(mailInput);
	var passInput = document.createElement("input");
	passInput.type="hidden";
	passInput.value=pass;
	passInput.id="password-pop";
	document.body.appendChild(passInput);
	var json=JSON.stringify({ "user": { "first_name": "Invitado","last_name": "Invitado", "email": mail, "password":pass,"nickname":nickname } });
	if(startLoadingAnimation()==true){
	mensajeAlServidorConContenidoRegistro(json, mail, pass);}
	
}
function askForInvitationIdFromRequest(requestTkn){
	var json=JSON.stringify({"token": requestTkn });
	if(checkConnection()){var xmlhttp;
		if (window.XMLHttpRequest)
	 	 {// code for IE7+, Firefox, Chrome, Opera, Safari
	  		xmlhttp=new XMLHttpRequest();
	  		}
		else
	  	{// code for IE6, IE5
	 	 xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	 	 }
		xmlhttp.onreadystatechange=function()
	  	{
	 	 if ((xmlhttp.readyState==4 && xmlhttp.status==200) ||  (xmlhttp.readyState==4 && xmlhttp.status==422))
	    {
			stopTimeToWait();
			var jsonStr=xmlhttp.responseText;
			if(IsJsonString(jsonStr)){ // Me fijo si dio un error, en el caso de que de le sigo mandando
				window.invitationId=(JSON.parse(jsonStr)).id;
			}else{
				askForInvitationIdFromRequest(requestId);
			}
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlay("ERROR DE CONEXIÓN","<p>Hubo un error de conexió intente nuevamente</p>");
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("POST","http://app.jugaplay.com/api/v1/requests/"+requestId+"/invitations",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send(json);	
	}
}
function logInUsuarioEnElSitioPostRegistro(mail, pass){
	var json=JSON.stringify({ "user": { "email": mail, "password":pass } });
	if(checkConnection()){var xmlhttp;
		if (window.XMLHttpRequest)
	 	 {// code for IE7+, Firefox, Chrome, Opera, Safari
	  		xmlhttp=new XMLHttpRequest();
	  		}
		else
	  	{// code for IE6, IE5
	 	 xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	 	 }
		xmlhttp.onreadystatechange=function()
	  	{
	 	 if ((xmlhttp.readyState==4 && xmlhttp.status==200) ||  (xmlhttp.readyState==4))
	    {
			// closeLoadingAnimation();
			stopTimeToWait();
			jsonStr=xmlhttp.responseText;
			//alert("Lo que devuelve el log in el servidor"+jsonStr);
			var json=JSON.stringify(jsonStr);
			var servidor=JSON.parse(json);
			var doble=JSON.parse(servidor);
			analizarRespuestaLogInPostRegistro(doble);
			return true;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlay("ERROR DE CONEXI&Oacute;N","<p>Hubo un error de conexi&oacute; intente nuevamente</p>");
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("POST","http://app.jugaplay.com/api/v1/login",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send(json);	
	}
}
function analizarRespuestaLogInPostRegistro(servidor){
	if (typeof(servidor.errors) !== 'undefined' || typeof(servidor.error) !== 'undefined'  ){
			closeLoadingAnimation();
			avisoEmergenteJugaPlay("Error en el registro","<p>Por favor vuelva a intentar</p>");
			return false;
	}else{// Salio todo bien
		servidor.last_check=new Date();
		servidor.last_update=new Date();
		var cookieSave=JSON.stringify(servidor);
		setCookie("juga-Play-Data", cookieSave, 120);
		window.location="game.html";
	}
}
function getQueryVariableTranslated(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  } 
  return -1;
}
function openTermsAndConditions(){var tyc="<p>AVISO IMPORTANTE: ESTE CONTRATO ESTÁ SUJETO AL ARBITRAJE OBLIGATORIO Y UNA RENUNCIA A LOS DERECHOS DE ACCIÓN (DEMANDAS COLECTIVAS). Usted declara que está  de acuerdo con estos Términos de Uso solo por acceder o utilizar el Servicio, el registro de los servicios ofrecidos en el Sitio, o aceptando, subir, la presentación o la descarga de cualquier información o contenido desde o hacia el Sitio. SI USTED NO ACEPTA SOMETERSE A TODAS ESTAS CONDICIONES DE USO, NO USE EL SITIO.</br> Estas Condiciones de Uso constituyen un acuerdo legal entre usted y JUGAPLAY, y se aplicarán a su utilización del Sitio y los Servicios, incluso después de la terminación del mismo.</br>Aceptación de los términos La página web Jugaplay.com (\"Sitio\") y aplicación (colectivamente, el \"Servicio\") - que incluye todo texto, imágenes, audio, código y otros materiales que contienen o se proporcionan (colectivamente, el \"Contenido\") y todas las funciones, concursos y otros servicios que se ofrecen - los cuales son propiedad y operados por JUGAPLAY. Por favor, lea estas condiciones de uso antes de utilizar el Servicio. Al utilizar o acceder de otro modo los Servicios, o haciendo clic en aceptar o estar de acuerdo con estas condiciones de uso (las \"Condiciones\" o \"Términos\") cuando la opción esté disponible, usted (1) acepta y está de acuerdo con estas Condiciones y nuestras reglas adicionales y el sistema de puntuación y (2) otorga su consentimiento a la recopilación, divulgación y otros usos de su información tal como se describe en nuestra Política de Privacidad. Si usted no está de acuerdo con todos los términos de uso, entonces usted no puede acceder o utilizar el Contenido o los Servicios de JUGAPLAY. JUGAPLAY podrá añadir términos adicionales, otras normas y condiciones de participación en los concursos que ofrece. Usted acepta estar sujeto a estas si usted participa en este tipo de concursos.</br></br><b>Modificación de las Condiciones/Términos de Uso</b></br>JUGAPLAY se reserva el derecho, a su sola discreción, de modificar o cambiar las condiciones de uso en cualquier momento. La versión más actualizada de las mismas será publicada en nuestro sitio. Usted será responsable de revisar y familiarizarse con dichas modificaciones. El uso de los Servicios por usted después de cualquier modificación de las condiciones constituye su aceptación de las nuevas condiciones de uso.</br>Usted puede establecer, mantener, utilizar y controlar sólo una cuenta en el Servicio. En caso que JUGAPLAY determine que usted ha abierto, mantenido, utilizado o controlado más de una cuenta, además de cualquier otro derecho que JUGAPLAY pueda tener, JUGAPLAY se reserva el derecho de suspender o cancelar cualquiera o todas sus cuentas y dar por terminado, suspender o revocar la concesión de los premios.</br>Los empleados de JUGAPLAY pueden utilizar el Servicio para el propósito de aprender y mejorar la experiencia del usuario y la calidad del servicio, pero no están autorizados a jugar dinero u obtener premios en JUGAPLAY ni en cualquier otra plataforma de juegos similares. Los consultores de JUGAPLAY o los promotores del Servicio podrán jugar en los concursos sin esa limitación, pero sólo si (i) su acuerdo con JUGAPLAY no les permite tener acceso a los datos de servicios confidenciales o a cualquier otra información que no esté disponible para todos los jugadores en el Servicio y (ii) que no reciban cualquier otra ventaja para jugar en el servicio.Los atletas profesionales, gerentes, entrenadores y cualquier otro personal de apoyo del equipo (por ejemplo, sin limitación, los médicos del equipo) y los propietarios de equipos profesionales no podrán participar en ningún concurso de JUGAPLAY en los que ellos o cualquier parte de su equipo están disponibles para la selección. Dueños de equipos, árbitros, empleados de la liga, dirigentes y otras personas que a través de una participación en la propiedad o el empleo relacionado con el juego pueden influir en el resultado de juego son también inelegibles para participar en JUGAPLAY.</br></br><b>Condiciones de participación</b></br></br><b>Registro</b></br>Con el fin de participar en un concurso en JUGAPLAY, usted debe registrarse y abrir una cuenta. Al registrarse como usuario del Servicio, usted se compromete a proporcionar información precisa, actualizada y completa sobre usted cuando se le solicite y actualizar los datos de registro para mantener los mismos exactos, actualizados y completos. Si usted proporciona alguna información que sea inexacta, desactualizada o incompleta, o JUGAPLAY tiene cualquier motivo razonable para sospechar que dicha información es inexacta, desactualizada o incompleta, JUGAPLAY puede negarle el acceso a las áreas que requieren de registro, o cancelar su cuenta, a su entera discreción.</br></br><b>Cuenta Contraseña y Seguridad</b> </br>En el momento de la inscripción para el acceso de cuenta en línea, usted debe proporcionar una dirección de correo electrónico válida y suministrar un nombre de nik-usuario y contraseña que se utilizarán en conjunción con su cuenta. Usted no puede utilizar un nombre de usuario que promueve una empresa comercial o un nombre de usuario que JUGAPLAY a su sola discreción considere ofensivo. Usted es responsable de mantener la confidencialidad de su nombre de usuario y contraseña, y es completamente responsable de todos los usos de su nombre de usuario y contraseña, ya sea por usted o por otros. Usted declara y acepta (a) no utilizar la misma contraseña para el servicio que se utiliza o ha utilizado alguna vez fuera del servicio; (b) mantener su nombre de usuario y contraseña confidencial y no compartirlos con nadie más; (c) notificar inmediatamente a JUGAPLAY de cualquier uso no autorizado de su nombre de usuario y contraseña o cuenta o cualquier otra violación de seguridad; y (d) utilizar sólo su propio nombre de usuario y contraseña para acceder a áreas restringidas del Servicio. JUGAPLAY no será responsable por cualquier pérdida o daño causado por su incumplimiento de esta Sección. Usted entiende y acepta que ninguna red es 100% segura y que JUGAPLAY no es responsable por cualquier violación de datos, o cualquier acceso no autorizado. Usted reconoce y acepta que JUGAPLAY está autorizada para actuar en las instrucciones recibidas a través del uso de su nombre de usuario y contraseña, y que JUGAPLAY puede, pero no está obligado a, negar el acceso o bloquear cualquier transacción realizada a través del uso de su nombre de usuario y contraseña sin previo aviso si se cree que su nombre de usuario y contraseña están siendo utilizados por alguien que no sea usted, o por cualquier otra razón. </br></br><b>Comunicaciones y Prácticas de Información</b></br>Como resultado de su registro en el Servicio, usted puede recibir ciertas comunicaciones comerciales de JUGAPLAY. Usted entiende y acepta que estas comunicaciones son parte de su registro, y que, en la medida requerida por la ley aplicable, puede optar por no recibir estas comunicaciones en cualquier momento, ya sea usando la funcionalidad de darse de baja o enviando un correo electrónico a info@jugaplay.com, solicitando no recibirlas. A raíz de un opt-out tal, todavía podremos comunicarnos con usted por correo electrónico en la medida permitida por la ley aplicable. </br></br><b>Descalificación y Cancelación</b> </br>JUGAPLAY también se reserva el derecho de cancelar los concursos, a nuestra entera discreción, sin ningún tipo de restricciones. JUGAPLAY, a su sola discreción, puede inhabilitarlo a usted para un concurso o todo el Servicio, negarse a otorgar puntos o premios y exigir la devolución de cualquier premio, o suspender o cancelar su cuenta si se involucra en una conducta que JUGAPLAY considere, a su sola discreción, ser inadecuada, injusta o de otra manera adversa a la operación del servicio o de alguna manera perjudicial para otros usuarios. A los efectos del presente, “Conducta Inapropiada” es, pero no se limita a: la falsificación de la información personal necesaria para utilizar el Servicio o reclamar un premio; violación de cualquiera de estas reglas, la acumulación de puntos o premios a través de métodos no autorizados, tales como scripts automatizados u otros medios automatizados; la manipulación de la administración del Servicio o tratando de cualquier manera con interferir con los programas de ordenador asociados con el servicio; la obtención de información de otros operadores y hacer spam a otros participantes; y/o abusar del Servicio de cualquier manera; o la violación de estos Términos de Uso. Usted acepta que el decomiso y / o la devolución de cualquier premio no impedirán de manera alguna que JUGAPLAY entable los procesos penales o civiles aplicables con relación a dicha conducta.  Si por cualquier motivo el servicio no está funcionando como estaba previsto originalmente (por ejemplo, si el sitio se corrompe o no permite el uso adecuado y/o el procesamiento de las inscripciones de acuerdo con las normas, o si ocurre una infección por algún virus informático, errores, manipulación no autorizada de intervención, por acciones de los participantes, por fraude, fallas técnicas o cualquier otra causa de cualquier tipo, en la opinión exclusiva de JUGAPLAY o que afecte la administración, seguridad, imparcialidad, integridad o conducta apropiada del Servicio), JUGAPLAY se reserva el derecho, a su sola discreción, de descalificar a cualquier individuo implicado en o en relación con la causa y/o a cancelar, terminar, ampliar, modificar o suspender el servicio, y seleccionar el ganador (s) entre todas las participaciones elegibles recibidas. Si se produce dicha cancelación, terminación, modificación o suspensión, la notificación podrá ser publicado en el Sitio.  En el caso que JUGAPLAY no pudiere cumplir con cualquier disposición en las Condiciones debido a un hecho fortuito o Fuerza Mayor como por ejemplo desastres naturales, guerra, incendio, disturbio, terrorismo, actos de enemigos públicos, acciones de autoridades gubernamentales fuera del control de JUGAPLAY (exceptuando el cumplimiento de códigos y reglamentos aplicables) u otra causa de fuerza mayor no será considerada una violación de estos Términos. Ninguna liga deportiva profesional ni equipo asociado con cualquier liga deportiva profesional es un patrocinador o tiene cualquier tipo de vinculación con JUGAPLAY. </br></br><b>Publicidad</b></br>Al participar en un concurso, en la medida permitida por la ley aplicable, usted autoriza a JUGAPLAY, a sus proveedores de servicios y/o socios de negocios, al uso de su nombre, voz, imagen y fotografía en relación con el desarrollo, producción, distribución y/o explotación (incluyendo la comercialización y promoción) del concurso y/u otros concursos que JUGAPLAY haya seleccionado, a menos que esté prohibido por la ley aplicable. Los ganadores del concurso, a partir de la fecha de notificación de su condición de ganador potencial, y continuando hasta el momento en el que notifica que ya no tienen que hacerlo, van a estar disponibles para JUGAPLAY Inc. para un máximo de 50 horas (o una cantidad más alta, donde se especifica en la normativa de concursos particulares) de publicidad y actividades de promoción relacionadas con el concurso o otros productos de JUGAPLAY, servicios o eventos, sin compensación adicional. JUGAPLAY y sus socios de negocios se reservan el derecho de hacer declaraciones públicas sobre los participantes y ganadores en el aire, en Internet, o de otra manera, antes, durante, o después del concurso. Los participantes aceptan que JUGAPLAY puede anunciar el nombre de un ganador en el aire o en cualquiera de sus sitios web o cualquier otro lugar en cualquier momento en relación con la comercialización y promoción de JUGAPLAY u otros concursos o juegos operado por JUGAPLAY. El usuario acepta que la participación y (en su caso) el ganador de un premio en el marco de un concurso constituye una compensación completa para sus obligaciones en virtud de este párrafo, y usted está de acuerdo en tratar de cobrar una cuota o imponer otras condiciones en el cumplimiento de estas obligaciones. Las normas específicas para determinados concursos pueden contener obligaciones de publicidad adicionales o pueden requerir una firma manuscrita en una renuncia publicidad independiente. </br></br><b>Reglas del juego</b> </br>Juegos de Habilidad</br>JUGAPLAY es un juego de habilidad, no sujeto al azar. Los concursos de JUGAPLAY son, para todos los participantes, juegos de habilidad y los usuarios deben utilizar su habilidad y conocimiento de los deportes profesionales para ganar un concurso, así como para acumular puntos y conocer las reglas de deportes de fantasía. Los puntos se acumulan a través de la actuación de los atletas del mundo real a través de partidos múltiples deportes. Cada entrada en un concurso de JUGAPLAY se compone de jugadores seleccionados a partir de un mínimo de uno mas eventos deportivos de la vida real. </br>JUGAPLAY prohíbe terminantemente cualquier competencia basada únicamente en la sola actuación de un atleta individual. Los ganadores son determinados por los criterios que figuren en las reglas de cada concurso. Para cada concurso, los ganadores son determinados por las personas que utilizan su habilidad y conocimiento de jugadores profesionales, noticias de información deportiva y eventos deportivos relevantes para acumular la mayor cantidad de puntos. Los puntos se acumulan a través del rendimiento de los atletas individuales a través de múltiples eventos deportivos.</br></br><b>Conteo de Puntos del Usuario</b></br>Una vez que los ganadores son anunciados por JUGAPLAY, los resultados de puntuación no se podrán modificar en función de las adaptaciones oficiales realizadas por las ligas profesionales, aunque nos reservamos el derecho de hacer ajustes basados en errores o irregularidades en la transmisión de información a JUGAPLAY de nuestros datos, o del proveedor de estadística o en nuestro cálculo de los resultados.</br></br><b>¿Que sucede con los partidos postergados o suspendidos?</b></br>Se entiende por partido postergado aquel que no se jugó o se jugaron menos de 20 minutos. JUGAPLAY decidirá, a su solo criterio, y comunicará en cada caso si el/los partido/s suspendido/s y/o postergado/s son validos para el computo de los puntos de los futbolistas del Juego.</br></br><b>Plazo de Concurso</b> </br>JUGAPLAY ofrece concursos para múltiples eventos de futbol profesionales en general, que tienen lugar en un solo día o una semana (JUGADA). </br></br><b>Los premios</b> </br>Después que termina cada concurso, los ganadores tentativos se anuncian (generalmente al día siguiente), pero siguen estando sujetos a la verificación final. Los jugadores en cada competencia que acumulen el mayor número de puntos de fantasía y cumplan con los requisitos de elegibilidad y las normas aplicables a ganar premios como se establece en los detalles del concurso publicadas, sumaran puntos canjeables por premios de nuestra tienda online.</br> JUGAPLAY ofrece un número de diferentes tipos de concursos. Para cada concurso, anunciamos los derechos de inscripción y los premios por adelantado en la página del concurso. Los puntos logrados por el usuario se basan en que la puntuación final de cada jugador sea tabulada por JUGAPLAY. Una vez que los ganadores son anunciados por JUGAPLAY, los resultados de puntuación no se podrán modificar en función de las adaptaciones oficiales realizadas por las ligas profesionales, aunque nos reservamos el derecho de hacer ajustes basados en errores o irregularidades en la transmisión de información a JUGAPLAY de nuestros datos, o del proveedor de estadística o en nuestro cálculo de los resultados. Jugaplay subcontrata los servicios de provision de estadistica deportiva a Data Factory y no se responsabiliza de la veracidad de dicha estadistica. </br>También podemos hacer los ajustes en caso de incumplimiento de las condiciones. JUGAPLAY no tiene la obligación de retrasar la concesión de un premio a la espera de cualquier ajuste, y nos reservamos el derecho de revertir los pagos en caso de cualquier ajuste. </br>Usted se compromete a cooperar con nuestros esfuerzos en caso de revertir los pagos. JUGAPLAY declara que queda terminantemente prohibida la determinación de los ganadores en base a la puntuación, diferencia de puntos, o el rendimiento de cualquier equipo del mundo real o a la combinación de equipos. No se permite la sustitución o transferencia de un premio. Todos los impuestos asociados a la recepción o uso de cualquier premio son responsabilidad exclusiva del ganador. JUGAPLAY no esta obligado a pagar o retener impuestos en ninguna jurisdicción, siendo esta responsabilidad del usuario. En el caso de que la adjudicación de los premios a los ganadores del Concurso sea cuestionada por cualquier autoridad legal, JUGAPLAY se reserva el derecho, a su sola discreción para determinar si es o no procedente adjudicar o ajustar dichos premios. En todas las disputas que surjan de la determinación de los ganadores de los concursos de JUGAPLAY, JUGAPLAY es la única parte y sus acciones son definitivas y vinculantes. </br></br><b>Notificaciones</b></br>Los ganadores son generalmente publicados en el sitio después de la conclusión de cada concurso a más tardar a las 10 AM (EST) del día siguiente. Los ganadores pueden ser requeridos para emitir por correo electrónico o correo ordinario una declaración jurada de elegibilidad, un acuerdo de publicidad y los formularios de impuestos correspondientes (si fuere el caso) en un plazo determinado. El incumplimiento de este requisito pudiera resultar en la descalificación. Cualquier notificación de premio devuelto como no pagable pudiera resultar en la descalificación y la selección de un ganador alternativo. </br></br> <b>Contenido de usuario </b></br>Usted entiende que todo el Contenido disponible en el servicio por un usuario (\"Contenido de Usuario\"), incluyendo pero no limitado al perfil de la información y las comunicaciones con otros usuarios, ya sea transmitido privadamente o puesto a disposición del público, es responsabilidad exclusiva de la persona de la que dicho Contenido de Usuario originó. Esto significa que usted, no JUGAPLAY, es enteramente responsable por todo el Contenido de Usuario que usted cargue, publique, comparta, correo electrónico, transmita o de cualquier forma ponga a disposición a través del Servicio. En ningún caso JUGAPLAY será responsable en cualquier forma por cualquier Contenido de Usuario.  Usted reconoce que JUGAPLAY puede o no preseleccionar el Contenido de Usuario, por ello JUGAPLAY y sus agentes tienen el derecho (pero no la obligación) a su sola discreción de preseleccionar, rechazar, eliminar permanentemente, recuperar, modificar y/o movimiento cualquier Contenido de Usuario a disposición a través del Servicio. Sin perjuicio de lo anterior, JUGAPLAY y sus agentes tendrán el derecho de remover cualquier Contenido de Usuario que viole los presentes Términos o a la sola discreción de JUGAPLAY. Usted entiende que al utilizar el Servicio, usted puede estar expuesto a Contenido de Usuario que usted puede pudiera ser ofensivo u objetable. Usted acepta que debe evaluar y asumir todos los riesgos asociados con el uso o divulgación de cualquier Contenido de Usuario. Además, usted reconoce y acepta que asume el único riesgo de cualquier contenido disponible a través del Servicio.  Con respecto al Contenido de Usuario que usted envíe o ponga a disposición del Servicio, usted otorga a JUGAPLAY una licencia perpetua e irrevocable y totalmente sublicenciable, libre de regalías, no exclusiva para poder usar, distribuir, reproducir, modificar , adaptar, publicar, traducir, ejecutar públicamente y mostrar públicamente dicho Contenido de Usuario (en su totalidad o en parte), e incorporar dicho Contenido de Usuario en otros trabajos, en cualquier formato o medio conocido o a ser desarrollado posteriormente.  Usted es el único responsable de sus interacciones con otros usuarios del Servicio. JUGAPLAY reserva el derecho, pero no tiene ninguna obligación, de monitorear cualquier controversia entre usted y otros usuarios.</br></br><b>Indemnización</b></br>Usted se compromete a liberar, indemnizar, defender y mantener inmune a JUGAPLAY y sus accionistas, subsidiarias, afiliadas y agencias, así como los funcionarios, directores, empleados, accionistas y representantes de cualquiera de las entidades anteriores, de y contra cualquier y toda pérdidas, pasivos, gastos, daños y perjuicios, costos (incluyendo honorarios de abogados y costas judiciales) reclamaciones o acciones de cualquier tipo que surjan o resulten de su uso del Servicio, su violación de estos Términos de Uso, su recibo, propiedad, uso o mal uso de cualquier premio, y cualquiera de sus actos u omisiones que implican los derechos de publicidad, difamación o invasión de la privacidad. JUGAPLAY se reserva el derecho, a su propio costo, de asumir la defensa exclusiva y control de cualquier asunto sujeto a indemnización por usted y, en tal caso, usted se compromete a cooperar con JUGAPLAY en la defensa de dicha materia. </br></br><b>Limitaciones de Garantía</b> </br> Usted entiende y acepta expresamente que el uso del servicio es bajo su propio riesgo. El Servicio (incluyendo el Servicio y el contenido) se proporciona \"TAL CUAL\" y \"según su disponibilidad\", sin garantías de ningún tipo, ya sea expresa o implícita, incluyendo, sin limitación, las garantías implícitas de comerciabilidad, adecuación para un particular, propósito o no. Usted reconoce que JUGAPLAY no tiene control sobre, y no hay obligación de tomar cualquier acción en relación con: el que los usuarios obtienen acceso o uso del Servicio; qué efectos el Contenido pueda tener en usted; cómo pueda interpretar o utilizar el contenido; o qué acciones puede tomar como resultado de haber sido expuesto al contenido. Usted libera JUGAPLAY de toda responsabilidad que usted haya adquirido o no a través del Servicio. El Servicio puede contener, o dirigir a otros sitios web que contienen información que algunas personas pueden encontrar ofensivos o inadecuados. JUGAPLAY no hace ninguna declaración con respecto a cualquier Contenido incluido en o accesible a través del Servicio, y JUGAPLAY no será responsable por la exactitud, el cumplimiento de copyright, legalidad o decencia del material contenido en o accedido a través del Servicio.</br> Limitación de la Responsabilidad USTED RECONOCE Y ACEPTA QUE USTED ASUME TODA LA RESPONSABILIDAD POR EL USO DEL SITIO Y DE SERVICIO. USTED RECONOCE Y ACEPTA QUE CUALQUIER INFORMACIÓN enviada o recibida DURANTE SU USO DEL SITIO Y EL SERVICIO NO PUEDE SER TOTALMENTE SEGURO Y ESTOS pueden ser interceptadas o posteriormente adquiridos por personas no autorizadas. USTED RECONOCE Y ACEPTA QUE EL USO DEL SITIO Y EL SERVICIO ES BAJO SU PROPIO RIESGO Y RESPONSABILIDAD. RECONOCIENDO TALES, USTED ENTIENDE Y ACEPTA QUE, EN LA MEDIDA MÁXIMA PERMITIDA POR LA LEY APLICABLE, NI JUGAPLAY NI SUS PROVEEDORES O LICENCIANTES SERÁN RESPONSABLES ANTE USTED O TERCEROS POR CUALQUIER DAÑO DIRECTO, INCIDENTAL, CONSECUENTE, PUNITIVO, EJEMPLAR U OTROS DAÑOS INDIRECTOS DE CUALQUIER TIPO, INCLUYENDO SIN LIMITACIÓN LOS DAÑOS POR PÉRDIDA DE BENEFICIOS, BUENA VOLUNTAD, USO, DATA U OTRAS PÉRDIDAS TANGIBLES O INTANGIBLES O CUALQUIER OTRO DAÑO BASADO EN UN CONTRATO, AGRAVIO, RESPONSABILIDAD CIVIL, O CUALQUIER OTRA TEORÍA (INCLUSO SI JUGAPLAY HUBIERE SIDO ADVERTIDO DE LA POSIBILIDAD DE TALES DAÑOS), COMO RESULTADO DE ESTE SITIO O SERVICIO; EL USO O LA IMPOSIBILIDAD DE USO DEL SITIO O SERVICIO; ACCESO NO AUTORIZADO O ALTERACIÓN DE SUS TRANSMISIONES O DATOS; DECLARACIONES O CONDUCTA DE CUALQUIER TERCERO EN EL SITIO O SERVICIO; CUALQUIERA acciones que tomen o no COMO RESULTADO DE COMUNICACIONES que usted nos envía; CUALQUIER INCORRECCION, ilegible, mal dirigidas, ROBO, INFORMACIÓN ENTRADA NO VÁLIDA O FALSA; ERRORES HUMANOS; Fallas técnicas; FALLAS, INCLUYENDO SERVICIOS PÚBLICOS o cortes de teléfono o servicio de internet; Omisiones, interrupciones, supresiones o defectos de cualquier dispositivo o red, proveedores, O SOFTWARE (incluyendo, pero no limitados a, los que no permiten UN PARTICIPANTE DE PARTICIPAR EN EL SERVICIO); Cualquier lesión o daño a los equipos informáticos; INCAPACIDAD PARA ACCEDER COMPLETAMENTE EL SITIO O SERVICIO O CUALQUIER OTRO SITIO WEB; ROBO, alteración, destrucción o acceso no autorizado o alteración de inscripciones, imagen u otros contenidos de cualquier tipo; DATOS que se procesen TARDE O INCORRECTAMENTE POR CUALQUIER RAZON; Errores tipográficos, de impresión u otros errores, o cualquier combinación de éstos; O CUALQUIER OTRO ASUNTO RELACIONADO CON EL SITIO O SERVICIO. SIN PERJUICIO DE LO CONTENIDO EN EL PRESENTE, LA RESPONSABILIDAD DE JUGAPLAY PARA USTED POR CUALQUIER CAUSA E INDEPENDIENTEMENTE DE LA FORMA DE LA ACCIÓN, ESTARÁ EN TODO MOMENTO LIMITADA A LA CANTIDAD PAGADA, EN SU CASO, POR USTED A JUGAPLAY PARA USO GENERAL DEL SITIO O SERVICIO DURANTE EL PLAZO DE SU INSCRIPCIÓN PARA EL SITIO, NO INCLUIDOS LOS DERECHOS DE INSCRIPCIÓN PARA CONCURSOS deben completarse antes de la CIRCUNSTANCIAS QUE DAN LUGAR A LA RECLAMACIÓN. Algunas jurisdicción no permitiere la exclusión de ciertas garantías o la limitación o exclusión de responsabilidad por daños incidentales o consecuentes. En consecuencia, algunas de las limitaciones anteriores pueden no aplicarse en su caso. </br></br><b>Nuestros derechos de propiedad</b> </br>Todos los títulos, de propiedad y derechos de propiedad intelectual en y para el Servicio son propiedad de JUGAPLAY o sus licenciantes. Usted reconoce y acepta que el Servicio contiene información propietaria y confidencial que está protegida por la propiedad intelectual y otras leyes. A excepción de lo expresamente autorizado por JUGAPLAY, Usted acepta no copiar, modificar, alquilar, arrendar, prestar, vender, distribuir, ejecutar, exhibir o crear productos derivados basados en el Servicio, en su totalidad o en parte.</br> </br><b>Enlaces</b></br>El servicio ofrece, o ciertos terceros pudieran proporcionar, enlaces a otros sitios o recursos en la world wide web. Debido a que JUGAPLAY no tiene control sobre tales sitios y paginas, usted reconoce y acepta que JUGAPLAY no es responsable por la disponibilidad de dichos sitios o recursos externos, y no los recomienda ni es responsable de ningún contenido, publicidad, productos u otros materiales en o disponibles en dichos sitios o paginas. Además, usted reconoce y acepta que JUGAPLAY no será responsable o tendrá obligación alguna, directa o indirecta, por cualquier daño o pérdida causada o supuestamente causada por o en relación con el uso o la credibilidad en cualquier Contenido, bienes o servicios disponibles en o a través de ningún sitio o recurso. </br></br><b>Terminación y suspensión</b> </br>JUGAPLAY puede terminar o suspender la totalidad o parte del Servicio y su cuenta en JUGAPLAY inmediatamente, sin previo aviso o responsabilidad, en caso de incumplimiento de cualquiera de los términos o condiciones de los Términos. Al momento de terminación de su cuenta, su derecho a utilizar el servicio cesará inmediatamente. Si desea cancelar su cuenta de JUGAPLAY, puede comunicarse con nosotros a través del formulario de contacto con una nota para decir que desea cancelar su cuenta.  Las siguientes disposiciones de los Términos sobreviven a cualquier terminación de estas Condiciones: CONDICIONES DE PARTICIPACIÓN (a excepción de Registro y Cuenta Contraseña y Seguridad); REGLAS DEL JUEGO (sólo Bonos y Promociones); CONDUCTA (sólo Contenido del usuario); INDEMNIZACIÓN; RENUNCIAS DE GARANTÍA; LIMITACIÓN DE RESPONSABILIDAD EN; NUESTROS DERECHOS DE PROPIEDAD; ENLACES; FINALIZACIÓN; NO BENEFICIARIOS DE TERCEROS; ARBITRAJE OBLIGATORIO Y RENUNCIA DE DEMANDA COLECTIVA; INFORMACION GENERAL.  Si su cuenta está sujeta a una suspensión, debe respetar las restricciones y limitaciones impuestas a su cuenta como parte de la suspensión, y usted debe comunicarse directamente con JUGAPLAY respecto a la restauración de su cuenta sólo a través support@jugaplay.com.  No hay terceros beneficiarios  Usted acepta que, salvo disposición expresa en contrario en las presentes Condiciones, no habrá terceros beneficiarios de los Términos. Notificación y procedimiento para las reclamaciones de infracción de derechos de autor  JUGAPLAY puede, a su discreción, desactivar y/o cancelar las cuentas de usuarios que infrinjan la propiedad intelectual de otros. Si usted cree que sus derechos de autor o de los derechos de autor de una persona en cuyo nombre usted está autorizado para actuar se ha infringido, por favor, nos proporcionan una notificación por email a JUGAPLAY , info@jugaplay.com que contenga la siguiente información: una firma electrónica o física de la persona autorizada a actuar en nombre del propietario de los derechos de autor u otro derecho de propiedad intelectual; una descripción de la obra con derechos de autor u otra propiedad intelectual que usted afirma han sido violadas; una descripción del lugar donde el material que considera que infringe se encuentra en el Servicio; su dirección, número de teléfono y dirección de correo electrónico; una declaración suya de que usted cree de buena fe que el uso disputado no está autorizado por el propietario del copyright, su agente o la ley; una declaración suya, hecha bajo juramento, que la información mencionada en su notificación es exacta y que usted es el derecho de autor o propiedad intelectual o está autorizado para actuar sobre los derechos de autor o nombre del dueño de la propiedad intelectual.</br>Para ser válida, la notificación debe ser por escrito y debe seguir la instrucciones anteriores.  Renuncia al arbitraje y acción de clase POR FAVOR LEA ESTA SECCIÓN CUIDADOSAMENTE - PUEDE AFECTAR SIGNIFICATIVAMENTE SUS DERECHOS LEGALES, INCLUYENDO SU DERECHO A PRESENTAR UNA DEMANDA EN EL TRIBUNAL.</br></br><b>Resolución de Disputas</b> </br>Nuestro departamento de atención al cliente (info@jugaplay.com) está disponible a través de la web para abordar cualquier preocupación que pueda tener con respecto al Servicio. Nuestro departamento de atención al cliente es capaz de resolver la mayoría de problemas de forma rápida a la satisfacción de nuestros jugadores. Las partes harán todo lo posible a través de este proceso de atención al cliente para resolver cualquier negociación de disputa, reclamo, pregunta o desacuerdo que serán condición necesaria para que cualquiera de las partes pueda iniciar una demanda o arbitraje.</br></br><b>Arbitraje vinculante</b> </br>Si las partes no llegan a un acuerdo sobre la solución en un plazo de 30 días desde el momento de resolución de disputas informal bajo el procedimiento de Resolución de Disputas previo, a continuación, cualquiera de las partes podrá iniciar el arbitraje obligatorio como el único medio para resolver las reclamaciones, con sujeción a los términos previstos a continuación. En concreto, todas las reclamaciones derivadas de o relacionadas con estas Condiciones (incluyendo su formación, el cumplimiento y la violación), la relación de las partes entre sí y/o su uso del Servicio se resolverá definitivamente mediante arbitraje vinculante administrado por la Asociación Americana de Arbitraje de conformidad con lo dispuesto en su Reglamento de Arbitraje Comercial y los procedimientos complementarios para disputas relacionadas de la Asociación Americana de Arbitraje (la \"AAA\"), con exclusión de las normas o procedimientos que rigen o permitan acciones de clase.  El árbitro, y no un tribunal estatal o local o agencia federal, tendrán competencia exclusiva para resolver todas las disputas que surjan del uso o sean relativas a la interpretación, aplicación, ejecución o la formación de estas Condiciones, incluyendo, pero no limitado a, cualquier reclamación que, en totalidad o en parte, y según estos Términos son nula o anulable, o si una reclamación está sujeta a arbitraje. El árbitro tendrá la facultad de conceder cualquier medida que esta disponible en un tribunal en virtud del derecho o la equidad. El laudo arbitral deberá ser por escrito, y vinculante para las partes y podrá ser introducido como sentencia en cualquier tribunal de jurisdicción competente.  Las reglas de arbitraje también permiten a recuperar los honorarios del abogado en ciertos casos. Las Partes entienden que, en ausencia de esta disposición obligatoria, tendrían el derecho de demandar en los tribunales y tener un juicio con jurado. Entienden además que, en algunos casos, las costas del arbitraje podrían superan los costos del litigio y el derecho de discovery puede ser más limitado en el arbitraje que en los tribunales.</br></br><b>Renuncia de Acción de Clase o Mancomunada</b> </br>Las partes acuerdan que cualquier arbitraje se realizará a título personal y no como una acción de clase u otra acción de grupo o de intereses difusos, y las partes renuncian expresamente a su derecho de presentar una demanda colectiva. USTED Y JUGAPLAY ACEPTAN QUE CADA UNO PUEDE PRESENTAR RECLAMACIONES CONTRA EL OTRO SOLO EN SU CAPACIDAD INDIVIDUAL, Y NO COMO DEMANDANTE O MIEMBRO DE CUALQUIER CLASE. Si un tribunal o árbitro determina que la renuncia colectiva establecida en este párrafo es nula o inaplicable por cualquier razón, o que un arbitraje puede proceder sobre una base de clase, entonces la disposición de arbitraje establecido anteriormente, se considerará nula y sin efecto en su totalidad y las partes se considerará que no se han puesto de acuerdo para resolver disputas por medio del arbitraje.</br>Licencia sujeto al cumplimiento de las presentes Condiciones, JUGAPLAY le concede una licencia no exclusiva limitada, no transferible, para descargar e instalar una copia de la aplicación en un solo dispositivo que permite controlar en exclusiva y para ejecutar dicha copia de la aplicación únicamente para su uso personal. JUGAPLAY se reserva todos los derechos sobre la aplicación no expresamente concedidos a usted bajo estos Términos. Usted no podrá ejecutar cualquier versión de la aplicación en un dispositivo con jailbreak.  Si ha descargado nuestra aplicación, usted se compromete a descargar oportunamente e instalar cualquier nueva versión que ponemos a su disposición a través de la iTunes App Store o Google Play Store, según corresponda. Algunas nuevas versiones pueden contener Condiciones actualizadas. Algunas nuevas versiones pueden contener correcciones de seguridad y mejoras en el servicio, sea que no revelamos lo que hacen; en consecuencia, la falta de actualización de inmediato su versión de la App en algunos casos puede quedar expuesto a mayores riesgos de seguridad o mal funcionamiento del Servicio.</br></br><b>Acuerdo completo</b></br>Estos Términos (y cualquier término adicional, normas y condiciones de participación en los concursos de particulares que JUGAPLAY puede publicar en el Servicio) constituyen el todo el acuerdo completo entre usted y JUGAPLAY con respecto al Servicio y reemplaza cualquier acuerdo anterior, oral o escrita, entre usted y JUGAPLAY. En caso de conflicto entre estos Términos y los términos adicionales, normas y condiciones de participación en los concursos de particulares, prevalecerán estas últimas sobre las condiciones en la medida del conflicto.</br></br><b>Renuncia y separación de términos</b> </br>La falta de JUGAPLAY en ejercer o hacer valer cualquier derecho o disposición de estas Condiciones no constituirá una renuncia a tal derecho o disposición. Si alguna cláusula de las Condiciones es considerada por un árbitro o tribunal de jurisdicción competente como no válida, las partes acuerdan que el árbitro o tribunal debe procurar interpretar las intenciones de las partes tal y como se reflejan en la disposición, y las demás disposiciones de las Condiciones permanecerán en pleno vigor y efecto. </br></br><b>Estatuto de limitaciones – Prescripción</b> </br>Y Usted acepta que independientemente de cualquier estatuto o ley por el contrario, cualquier reclamación o causa de acción que surja de o relacionados con el uso del Servicio o los Términos debe presentarse dentro de un (1) año posterior a que dicho reclamo o causa de acción haya ocurrido.</br></br><b>Comunicaciones</b> </br>Los usuarios que tengan preguntas, quejas o reclamaciones en relación con el Servicio, podrán ponerse en contacto con JUGAPLAY mediante la información de contacto correspondiente establecida jugaplay.com.</br><b>Premios</b></br>El usuario entiende que JUGAPLAY regala premios a los ganadores de los respectivos partidos y que, en algunos casos con previo aviso al usuario, la empresa se guarda el derecho de modificar premios logrados en dichos partidos por puntos de Ranking.</br></br><b>Politica de Devolucion</b></br>Una vez canjeado el premio en el store, el usuario entiende que la empresa tiene “poltica de devolucion cero”, es decir no acepta devoluciones de los premios previamente enviados a sus usuarios. Al no ser comprados con dinero fisico por parte del usuario, los premios son considerados regalos. </br></br>Algunos premios del store (helados, combos de fast-food, etc) son proporcionados a los usuarios via email con vouchers canjeables en locales adheridos. Cabe destacar que la empresa tampoco se responsabiliza por problemas de procesamiento de dichos vouchers. </br></br><b>Usuarios de Zonas no cubiertas</b></br>En caso que un usuario ganador resida en una region geografica donde los vouchers y premios no sean canjeables, la empresa tampoco se responsabilza de indemnificar/resarcir o cambiar el premio para el usuario. </br></br><b>Muro de Campeones</b></br>El usuario da por entendido que en caso de no enviar sus selfies para el sector “Muro de Campeones”, la empresa se guarda el derecho de no enviar el premio al usuario.</br></p>";
	avisoEmergenteJugaPlay("TERMINOS Y CONDICIONES",tyc);
}