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
  if (user) {
    console.log("in");
		if(state) gotoEditor();
  } else {
		console.log("out");
		//gotoLogin();
		//window.location = "login.html";
  }
});

function createAccount() {
	usr = document.getElementById("newusr");
	pss = document.getElementById("newpss");
	firebase.auth().createUserWithEmailAndPassword(usr.value, pss.value).catch(function(error) {
	  var errorCode = error.code;
	  var errorMessage = error.message;
		alert(errorMessage);
	});
	gotoEditor();
}

function login() {
	usr = document.getElementById("logusr");
	pss = document.getElementById("logpss");
	firebase.auth().signInWithEmailAndPassword(usr.value, pss.value).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		alert(errorMessage);
	});
	state = true;
}

function logout() {
	//For logout use later
	firebase.auth().signOut().then(function() {
		state = false;
		  gotoLogin();
		}).catch(function(error) {
		  // An error happened.
	});
}

function logoutInit() {
	//For logout use later
	firebase.auth().signOut().then(function() {
		}).catch(function(error) {
		  // An error happened.
	});
}

function gotoEditor() {
	window.location = "bonfire.html";
}

function gotoLogin() {
	window.location = "index.html";
}
