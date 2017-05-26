var config = {
	apiKey: "AIzaSyB284IXRfrPx3LpNaGGVr1a66JhD3NUxKI",
	authDomain: "bonfire-b6633.firebaseapp.com",
	databaseURL: "https://bonfire-b6633.firebaseio.com",
	projectId: "bonfire-b6633",
	storageBucket: "bonfire-b6633.appspot.com",
	messagingSenderId: "666805898095"
};
firebase.initializeApp(config);

var state = false;

firebase.auth().onAuthStateChanged(function(user) {
  //No else because we don't care if no one is logged out at the login page!
  //Also, checking user and state is a double precaution to stop infinite redirects.
	if (user) {
		if(state) gotoEditor();
	}
});

function createAccount() {
	usr = document.getElementById("newusr");
	pss = document.getElementById("newpss");
	firebase.auth().createUserWithEmailAndPassword(usr.value, pss.value).catch(function(error) {
		alert(error.message);
	});
	gotoEditor();
}

function login() {
	usr = document.getElementById("logusr");
	pss = document.getElementById("logpss");
	firebase.auth().signInWithEmailAndPassword(usr.value, pss.value).catch(function(error) {
		alert(error.message);
	});
	state = true;
}

//User initiated logout that includes redirection
function logout() {
	state = false;
	gotoLogin();
}

//On load of login page we logout whoever might be in. This is different than logout() because it doesn't change the state which determines
//where the redirect goes, and we don't want a redirect.
function logoutInit() {
	firebase.auth().signOut().then(function() {
		}).catch(function(error) {
			alert(error.message);
	});
}

function gotoEditor() {
	window.location = "bonfire.html";
}

function gotoLogin() {
	window.location = "index.html";
}
