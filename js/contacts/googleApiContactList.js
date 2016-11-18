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
		if(secondsFromNow(JSON.parse(getCookie("usersSyncGoogleApi-lastCheck-Jp-date"+getUserJugaplayId())))>864000){// Si tiene mas de 10 dias 864000
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
	//alert("users");
	if(window.countrySelectedPhones!=null){
		var users=[];
	 for (user in response.feed.entry){
				 for(phone in response.feed.entry[user].gd$phoneNumber){
					var parPhone=parsePhone(response.feed.entry[user].gd$phoneNumber[phone].$t);
					if(parPhone==null){
						if(window.countrySelectedPhones=="CL"){// Entra desde chile
							var parPhone=parsePhone("56"+response.feed.entry[user].gd$phoneNumber[phone].$t);
						}else if(window.countrySelectedPhones=="AR"){// Entra desde argentina
							var parPhone=parsePhone("54"+response.feed.entry[user].gd$phoneNumber[phone].$t);
						}
					}
					if(parPhone!=null){
						users.push({"name":response.feed.entry[user].title.$t,"phone":parPhone.countryCode+parPhone.areaCode+parPhone.number});
					}
				 }
				 for(mail in response.feed.entry[user].gd$email){
					 users.push({"name":response.feed.entry[user].title.$t,"email":response.feed.entry[user].gd$email[mail].address});
				 }
			 }
			 //alert("Star sync");
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
	//if(googleContacts.length==0){alert("Done");}
	var json=JSON.stringify({ "contacts":sendContact});	
	//setTimeout(function(){parsePhonesAndMailsForSending(response);}, 1000);
	//setTimeout(function(){parsePhonesAndMailsForSending(response);}, 1000);
	//document.getElementById("challenges-container-show").innerHTML+=json+"</br>";
	showAvailableContactsToPlay(json);
	resetTimeOfLastSyncWithGoogleAskToServer();
}
