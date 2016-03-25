// JavaScript Document
window.onload=comenzarSpinBanner(1);
function comenzarSpinBanner(cual){
	//alert(cual);
	document.getElementById("fondo-banner-jugaplay").style.backgroundImage="url(../img/slider/back-"+cual+".jpg)";
	playAnimationBanner(document.getElementById("datos-banner-"+cual), 'bounceInRight');	
	document.getElementById("datos-banner-"+cual).style.display="table-cell";
	setTimeout(function(){
		playAnimationBanner(document.getElementById("datos-banner-"+cual), 'bounceOutLeft');
		setTimeout(function(){document.getElementById("datos-banner-"+cual).style.display="none";}, 800);
		setTimeout(function(){if(cual!=3){comenzarSpinBanner(cual+1);}else{comenzarSpinBanner(1);}}, 1500);
		}, 9000);
	
}
function playAnimationBanner(element, classAnimation){
		element.classList.add(classAnimation);
		//element.classList.add('animated');
		setTimeout(function(){
			element.classList.remove(classAnimation);
			//element.classList.remove('animated');
		}, 1200);
	// Le pongo un Listener para cada tipo de navegador
	element.addEventListener("webkitAnimationEnd", function(){}, false);
	element.addEventListener("animationend", function(){}, false);
	element.addEventListener("oanimationend", function(){}, false);
	element.addEventListener("MSAnimationEnd", function(){}, false);
}