window.posiblePollfishSurvey=false;
window.posiblePollfishSurveyRevenue=0;
window.surveyPollster='POLLFISH';
window.pollfishSurveyLoaded=false;

function checkIfSurveyAveilableAndMustBeShownAMessage(){
	// Sale un mensaje si nunca hizo una o si hay una paga
	// Tiene que marcar cuanto le aparece o algo asi
	// El mensaje tiene que corroborar que ya haya pasado por el mensaje del juego, el vivo, etc. 
	if(hasBeenRead(4)){ // Ya le mostro el mensaje del vivio
		if(algorithmAsIfToShowNormalAlert() || algorithmAsIfToShowPromoAlert()==1){
			appendAlert("normal"); // promotion
		}else if(algorithmAsIfToShowPromoAlert()==2){
			appendAlert("promotion");
		}
	}
}
function algorithmAsIfToShowNormalAlert(){
	try{ // Arrreglo desprolijo, mejorar
		if(getCookie("jpPollFishLastSurvey")=="" && hasBeenXdaysFromCloseAlert(10) && hasBeenXminuteSFromLastShownAlert(30)){ // Nunca hizo y 10 desde que elimino un cartel
			return true;
		}
		// Pasaron mas de 10 dia y 15 desde que elimino un cartel y la ultima encuesta la contesto hace 3 dias
		else if(secondsFromNow(JSON.parse(getCookie("jpPollFishLastSurvey")))>2592000 && hasBeenXdaysFromCloseAlert(15) && hasBeenXminuteSFromLastShownAlert(30)){
			return true;
		}
		else{
			return false;
		}}
		catch(e){
		return false;
	}
}
function algorithmAsIfToShowPromoAlert(){ 
	try{
		if(secondsFromNow(JSON.parse(getCookie("jpPollFishLastSurvey")))<86400 && window.posiblePollfishSurveyRevenue>0 && window.posiblePollfishSurvey &&  hasBeenXdaysFromCloseAlert(5) && hasBeenXminuteSFromLastShownAlert(3)){// no paso un dia desde la ultima, va 24 Hs
			return 2;
		}else if(window.posiblePollfishSurveyRevenue>0 && window.posiblePollfishSurvey &&  hasBeenXdaysFromCloseAlert(5) && hasBeenXminuteSFromLastShownAlert(10)){
			return 1;
		}
	}catch(e){
		return -1;
	}
	return -1;
	// No tine que ir, devuelve -1
	// Tiene que haber contestado una hoy devuelve 2
	// No contesto una hoy, contesto una, pero hay una paga y no elimino un cartel hace menos de 5 dias
}
function hasBeenXdaysFromCloseAlert(days){
	if(getCookie("jpPollFishLastCloseAlertSurvey")=="" || !IsJsonString(getCookie("jpPollFishLastCloseAlertSurvey"))){
		return true;
	}else{
		return secondsFromNow(JSON.parse(getCookie("jpPollFishLastCloseAlertSurvey")))>(60*60*24*parseInt(days));
	}
}
function hasBeenXminuteSFromLastShownAlert(minutes){
	if(getCookie("jpPollFishLastShownAlertSurvey")=="" || !IsJsonString(getCookie("jpPollFishLastShownAlertSurvey"))){
		return true;
	}else{
		return secondsFromNow(JSON.parse(getCookie("jpPollFishLastShownAlertSurvey")))>(60*parseInt(minutes));
	}
}
function isSurveyMoreThan12OrPosible(){	
		if(IsJsonString(getCookie("jpPollFishLastSurvey")) && getCookie("jpPollFishLastSurvey")!=""){
			try{
				if(secondsFromNow(JSON.parse(getCookie("jpPollFishLastSurvey")))>43200 || (window.posiblePollfishSurvey && window.posiblePollfishSurveyRevenue>0)  || getCookie("jpPollFishLastSurvey")==""){
					return true;// Pasaron 12 Hs
				}else{
					return false;// No Pasaron 12 Hs
				}
			}catch(e){
				return true;// Hubo un error y no quiero trabar la pregunta del usuario
			}
		}
	else{
		// Nunca tuvo una encuesta
		return true;}// Se puede hacer la encuesta
}
function tryToDoPollfishSurveyOrSendToSurveys(){
	//
	if(window.posiblePollfishSurvey && window.posiblePollfishSurveyRevenue>0){
		jpAnalyticsEvent("OPEN_POLL", 'POLLFISH', parseFloat(window.posiblePollfishSurveyRevenue/100));
		Pollfish.showFullSurvey();
	}else if(!window.pollfishSurveyLoaded){
		window.location='surveys.html';
	}
}

// {}
var pollfishConfig = {
  api_key: "3c7ef332-27b6-4267-b731-9d5fd7a76936",
  ready: pollfishReady,
  //debug: true,
  uuid: "Jp-"+getUserJugaplayId(),
  closeCallback: customSurveyClosed,
  userNotEligibleCallback: customUserNotEligible,
  closeAndNoShowCallback: customCloseAndNoShow,
  surveyCompletedCallback: customSurveyFinished,
  surveyAvailable: customSurveyAvailable,
  surveyNotAvailable: customSurveyNotAvailable
};

function customSurveyClosed(){
  console.log("user closed the survey");
  jpAnalyticsEvent("CLOSE_POLL", 'POLLFISH', parseFloat(window.posiblePollfishSurveyRevenue/100));
  //notifyPolls("customSurveyClosed");
  // Guardar el usuario comenzo una encuesta per no la guardo, alerta de que cerro la encuesta y no se le acreditaran las fichas
}

function customUserNotEligible(){
  console.log("user is not eligible");
  notifyPolls("Sin encuesta!! no aparecen");
  Pollfish.hide();
  avisoEmergenteJugaPlay("Encuestas limitadas","<p>En este este momento nos encontramos sin encuestas.</p><p>Estamos trabajando en este problema, nos pondremos en contacto con usted  a: "+getUserJugaplayEmail()+" y le sumaremos la ficha a su cuenta.</p><p><small>Si este “"+getUserJugaplayEmail()+"” no es su mail por favor escriba nos a info@jugaplay.com</small></p>");
  // Guardar los datos de que el usuario no es elegido para encuestas
}

function customSurveyFinished(){
  console.log("user finished the survey");
  Pollfish.hide();
  addChipsToWallet(20);
  setCookie("jpPollFishLastSurvey", JSON.stringify(new Date()), 120);
  avisoEmergenteJugaPlay('Ganaste 1<img src="img/icons/coins/chip.svg" style="margin-right: 0px;margin-top: -10px;margin-bottom: -3px;margin-left: 5px;width: 30px;"> !!!','<p>Felicitaciones, ganaste una <img src="img/icons/coins/chip.svg" style="margin-right: 0px;margin-top: -10px;margin-bottom: -3px;margin-left: 5px;width: 15px;">.</p><p>Utiliza la misma para jugar partidos especiales o para activar el <img src="img/icons/coins/x2.png" width="50px;"> para los partidos que quieras y duplicar tus monedas!! </p>');
  jpAnalyticsEvent("COMPLETED_POLL", 'POLLFISH', parseFloat(window.posiblePollfishSurveyRevenue/100));
  if(window.posiblePollfishSurveyRevenue>0){
	  jpAnalyicsEventPurchase('POLLFISH', "COMPLETED_POLL",parseFloat(window.posiblePollfishSurveyRevenue/100), "USD");
	  }
  window.posiblePollfishSurvey=false;
  window.posiblePollfishSurveyRevenue=0;
  // Guardar en data, termino la encuesta, le pagan lo que habia anotado antes!! 
  // window.posiblePollfishSurveyRevenue=
  
}

function customCloseAndNoShow(){
  console.log("close and hide the indicator");
}

function customSurveyAvailable(data){
	window.posiblePollfishSurvey=true;
	window.posiblePollfishSurveyRevenue=data.revenue;
	if(data.revenue>0){
		jpAnalyticsEvent("SELECTED_FOR_POLL", 'POLLFISH', parseFloat(data.revenue/100));
		if (typeof changeInternalSurveyButton === "function") { 
			changeInternalSurveyButton('pollfish',20);
		}
	}
  //console.log("pollfish survey is available with revenue: " + data.revenue + " and survey format playful: " + data.playful);
  //console.log(JSON.stringify(data));
}

function customSurveyNotAvailable(){
  window.posiblePollfishSurvey=false;
  //notifyPolls("customSurveyNotAvailable");
  // Guardar los datos de que el usuario no es elegido para encuestas
  //console.log("survey not available");
}
function pollfishReady(){
  //Pollfish Webplugin is ready, so you can call it excplicitly using the Pollfish.showIndicator or Pollfish.showFullSurvey functions
  console.log("pollfishReady");
  checkIfSurveyAveilableAndMustBeShownAMessage();
  window.pollfishSurveyLoaded=true;
}
function waitTillSurveysAreLoaded (){
	startLoadingAnimation(); 
	checkIfSurveysAreLoaded ();
	closeLoadingAnimation();
}
function checkIfSurveysAreLoaded(){
	if(window.pollfishSurveyLoaded){
		closeLoadingAnimation();
		tryToDoPollfishSurveyOrSendToSurveys();
	}else{
		setTimeout(function(){checkIfSurveysAreLoaded();},300);
	}
}
function notifyPolls(method){
	var contenidoContacto= "Encuestas-- "+method+"-- USU id: "+window.userDataJugaPlay.id+ "-- Mail ingresado: "+getUserJugaplayEmail();
	var json=JSON.stringify( { "comment": { "sender_name": "Payment","sender_mail": getUserJugaplayEmail(),"content": contenidoContacto } } );
	var xmlhttp;
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
			
	    }else if(xmlhttp.status==503 || xmlhttp.status==404 || xmlhttp.status==105){// Esto es si el servidor no le llega a poder responder o esta caido
			 avisoEmergenteJugaPlayConnectionError();
			 return "ERROR";
			}
	 	 }
		xmlhttp.open("POST",getJPApiURL()+"comments",true);// El false hace que lo espere
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.withCredentials = "true";
		xmlhttp.send(json);		
}
function tryToDoSurveyFromAlert(type){
	// Registro que apreto el boton y desde donde	
	tryToDoPollfishSurveyOrSendToSurveys();
	$(".alert-survey").fadeOut(900, function(){ $(this).remove();
	jpAnalyticsEvent("SHOWN_POLL_ALERT", type.toUpperCase(), "OPEN");});
}
function closeSurveyAlert(type){
	// Registro que cierra el alrt en data
	setCookie("jpPollFishLastCloseAlertSurvey", JSON.stringify(new Date()), 120);
	jpAnalyticsEvent("SHOWN_POLL_ALERT", type.toUpperCase(), "CLOSE");
}
function appendAlert(type){
	// chequear que no exista ninguna antes de mandar
	// Guardar cuando cierra la cookie
	// Guardar en analytics tanto cuando muestra como cuando apreta
	if($(".alert-survey").length==0){
		setCookie("jpPollFishLastShownAlertSurvey", JSON.stringify(new Date()), 120);
		//alert($(".alert-survey").length);
		if(type=="normal"){
			$("body").append('<div class="alert alert-info alert-survey" style=" position: fixed; top: 60px; z-index: 9999; width: 100%; float: right;"><a onclick="closeSurveyAlert(\''+type+'\')" href="#" class="close" data-dismiss="alert" aria-label="close">×</a> <strong>Gana una Ficha <img src="img/icons/coins/chip.svg" style="margin-right: 0px;margin-top: -5px;width: 15px;">!!</strong></br> Contesta una encuesta y gana una ficha <img src="img/icons/coins/chip.svg" style="margin-right: 0px;margin-top: -5px;width: 15px;"> !!! </br><a class="alert-link" onclick="tryToDoSurveyFromAlert(\''+type+'\')" style=" cursor: pointer;">Haciendo CLICK AQUI</a>.</div>');
		}else if(type=="promotion"){
			$("body").append('<div class="alert alert-info alert-survey" style=" position: fixed; top: 60px; z-index: 9999; width: 100%; float: right;"><a href="#" onclick="closeSurveyAlert(\''+type+'\')" class="close" data-dismiss="alert" aria-label="close">×</a> <strong>Promo tiempo limitado <i class="fa fa-clock-o" aria-hidden="true"></i> !!</strong></br> Contesta una nueva encuesta ya y gana una ficha <img src="img/icons/coins/chip.svg" style="margin-right: 0px;margin-top: -5px;width: 15px;"> !!! </br><a class="alert-link" onclick="tryToDoSurveyFromAlert(\''+type+'\')" style=" cursor: pointer;">Haciendo CLICK ACA</a>.</div>');
		}
		setTimeout(function(){$(".alert-survey").fadeOut(900, function(){ $(this).remove();});jpAnalyticsEvent("SHOWN_POLL_ALERT", type.toUpperCase(), "FADE");},15000);// a los 15 segundos lo borra, te acompa;a y molesta
	}
	//
}