// JavaScript Document
// Animaciones creado por Ezequiel Wernicke de Swci -- ezequiel@swci.com.ar
// Le da Play a la animacion de cierta clase, fijandose que no se repita
function playAnimation(element, classAnimation){
	if(element.classList.contains(classAnimation)){ 
	//No deberia por que repetirse pero si llega a estar repetida la borra
	element.classList.remove(classAnimation);
	}else{
		element.classList.add(classAnimation);
	}
	// Le pongo un Listener para cada tipo de navegador
	element.addEventListener("webkitAnimationEnd", function(){element.classList.remove(classAnimation);}, false);
	element.addEventListener("animationend", function(){element.classList.remove(classAnimation);}, false);
	element.addEventListener("oanimationend", function(){element.classList.remove(classAnimation);}, false);
	element.addEventListener("MSAnimationEnd", function(){element.classList.remove(classAnimation);}, false);
}