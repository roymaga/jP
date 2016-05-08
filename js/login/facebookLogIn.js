// JavaScript Document
//facebookConnectPlugin.login(Array strings of permissions, logInWithFacebookOk, logInWithFacebookError)

// Sera esto lo de la conexion 
function makeLogInWithFacebook(){
	alert("Comienzo log in con Facebook");
 /*(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
  
 FB.init({
    appId      : '1790148521213303',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.2' // use version 2.2
  });*/
  facebookConnectPlugin.browserInit("1790148521213303");
  //facebookConnectPlugin.login(["user_status","user_friends"], logInWithFacebookOk, logInWithFacebookError);
  var fbLoginSuccess = function (userData) {
  alert("UserInfo: ", userData);
	}
 // ["user_status","user_friends"]
	facebookConnectPlugin.login(["public_profile"], fbLoginSuccess,
  function loginError (error) {
    alert(error)
  }
);
}