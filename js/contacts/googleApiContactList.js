// Functions for game.html in syncro
// in contacts.js
function saveUsersSyncGoogleApi(state){
	window.usersSyncGoogleApi=state;
	setCookie("usersSyncGoogleApi-lastCheck-Jp"+getUserJugaplayId(), JSON.stringify(state), 120);
}
function resetTimeOfLastSyncWithGoogleAskToServer(){
	var date= new Date();
	var jsonUpdt=JSON.stringify(date);
	setCookie("usersSyncGoogleApi-lastCheck-Jp-date"+getUserJugaplayId(), jsonUpdt, 120);
}
function checkIf10daysGoneByLastSync(){
	if(IsJsonString(getCookie("usersSyncGoogleApi-lastCheck-Jp-date"+getUserJugaplayId()))){
		if(secondsFromNow(JSON.parse(getCookie("usersSyncGoogleApi-lastCheck-Jp-date"+getUserJugaplayId())))>529200){// Si tiene mas de 10 dias 864000
			return false;
		}else{
			return true;
		}
	}else{
		return false;
	}
}
// Your Client ID can be retrieved from your project in the Google
// Developer Console, https://console.developers.google.com
var CLIENT_ID = '928450441001-rlbon77cse8i08ae2plot2gvjgu451ee.apps.googleusercontent.com';

var SCOPES = ['https://www.google.com/m8/feeds'];
/**
 * Check if current user has authorized this application.
 */
function checkAuth() {
    gapi.auth.authorize(
        {
            'client_id': CLIENT_ID,
            'scope': SCOPES.join(' '),
            'immediate': true
        }, handleAuthResultforGmailApi);
}

/**
 * Handle response from authorization server.
 *
 * @param {Object} authResult Authorization result.
 */
function handleAuthResultforGmailApi(authResult) {
    if (authResult && !authResult.error) {
        // Hide auth UI, then load client library.
        //authorizeDiv.style.display = 'none';
		if(!checkIf10daysGoneByLastSync()){
        	loadMailsAndPhonesApi(authResult);
		}
		saveUsersSyncGoogleApi(true);
    } else {
        // Show auth UI, allowing the user to initiate authorization by
        // clicking authorize button.
		saveUsersSyncGoogleApi(false);
       // authorizeDiv.style.display = 'inline';
    }
}

/**
 * Initiate auth flow in response to user clicking authorize button.
 *
 * @param {Event} event Button click event.
 */
function handleAuthClick(event) {
    gapi.auth.authorize(
        {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
        handleAuthResultforGmailApi);
    return true;
}

/**
 * Load Google People client library. List names if available
 * of 10 connections.
 */
function loadMailsAndPhonesApi(authResult) {
	checkCountry();
	$.get('https://www.google.com/m8/feeds/contacts/default/full?alt=json&access_token=' +
			   authResult.access_token + '&max-results=1500&v=3.0',
		  function(response) { parsePhonesAndMailsForSending(response); });
}
function checkCountry(){
	window.countrySelectedPhones=null;
	$.get("http://ipinfo.io", function(response) {
		window.countrySelectedPhones=response.country;
	}, "jsonp");
}
function parsePhonesAndMailsForSending(response){
	var userName;var userPhones=[]; var userMails=[];
	if(window.countrySelectedPhones!=null){
		var users=[];
	var count=0;
	 for (user in response.feed.entry){
		 		userPhones=[];userMails=[];
				userName=parseUnCodeUserName(response.feed.entry[user]);
				 for(phone in response.feed.entry[user].gd$phoneNumber){
					var parPhone=parseComplexPhone(response.feed.entry[user].gd$phoneNumber[phone].$t);
					if(parPhone!=null){
						userPhones.push(parPhone.countryCode+parPhone.areaCode+parPhone.number);
					}
				 }
				 for(mail in response.feed.entry[user].gd$email){
					 userMails.push(response.feed.entry[user].gd$email[mail].address);
				 }
				 users=users.concat(parseJsonForUser(userName,userMails,userPhones));
			 }
			 sendDataFromGoogleToSyncContacts(users);
	}else{
		setTimeout(function(){parsePhonesAndMailsForSending(response);}, 1000);
	}
}
function sendDataFromGoogleToSyncContacts(googleContacts){
	var count=0;
	var sendContact=[];
	var contact;
	while(googleContacts.length>0 && count<20){
		count++;
		contact=googleContacts.pop();
		sendContact.push(contact)
		if(count>=20){
			setTimeout(function(){sendDataFromGoogleToSyncContacts(googleContacts);}, 1000);
		}
	}
	var json=JSON.stringify({ "contacts":sendContact});	
	showAvailableContactsToPlay(json);
	resetTimeOfLastSyncWithGoogleAskToServer();
}
function parseUnCodeUserName(user){
	if(user.title.$t.length>0){
			return user.title.$t;
	}else{
			if(typeof(user.gd$email) !== 'undefined'){// Existe al menos un mail
				return  user.gd$email[0].address.split("@")[0];// Nombre cortado a partir del mail
			}else{
				return "unknown";
			}
	}
}
function parseComplexPhone(phone){
	var parPhone=parsePhone(phone);
	if(parPhone==null){
		if(window.countrySelectedPhones=="CL"){// Entra desde chile
			var parPhone=parsePhone("56"+phone);
		}else if(window.countrySelectedPhones=="AR"){// Entra desde argentina
			var parPhone=parsePhone("54"+phone);
		}
	}
	return parPhone;
}
function parseJsonForUser(userName,userMails,userPhones){
	var returnArr=[];
	for(var i=0; Math.max(userMails.length, userPhones.length)>i;i++){
		if(userMails.length>i && userPhones.length>i){
			returnArr.push({"name":userName,"email":userMails[i],"phone":userPhones[i]});
		}else{
			if(userMails.length>i){
				returnArr.push({"name":userName,"email":userMails[i]});
			}else{
				returnArr.push({"name":userName,"phone":userPhones[i]});
			}
		}
	}
	return returnArr;
}