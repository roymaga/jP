// JavaScript Document
function acceptsLocalStorage(){
	if(typeof(Storage) !== "undefined") {
    return true;
	} else {
    // Sorry! No Web Storage support..
	return false;
	}
}
function setCookie(cname, cvalue, exdays) {
	cname="pr-"+cname;
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
	if(acceptsLocalStorage()){
		localStorage.setItem(cname, cvalue);
	}else{
    	document.cookie = cname + "=" + cvalue + "; " + expires;
	}
}
function getCookie(cname) {
	cname="pr-"+cname;
	if(acceptsLocalStorage()){
		if(localStorage.getItem(cname)!=null){
		return localStorage.getItem(cname);}else{ return "";}
	}else{
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i=0; i<ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1);
			if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
		}
		return "";
	}
}
function delete_cookie( cname ) {
	cname="pr-"+cname;
	if(acceptsLocalStorage()){
		localStorage.setItem(cname, " ");
	}else{
 		 document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	}
}
function checkCookie(){ // Check if cookies are enable
	if(navigator.cookieEnabled==true){
		document.cookie="testcookie";
		if(document.cookie.indexOf("testcookie")!=-1){
			return true;
		}else{
			return false;
		}
		
	}else{
		return false;
	}
}