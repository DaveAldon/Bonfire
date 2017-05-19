//Init firebase
var db = firebase.database();

//User's workspace
var editorId = "worspace_davealdon";

//User's code
var editorValues = db.ref("editor_values");

//Get code object from firebase
editorValues.child(editorId).once("value", function (snapshot) {
    console.log(snapshot.val());
});

//Get content value
editorValues.child(editorId).child("content").once("value", function (snapshot) {
   console.log(snapshot.val());
});

//Set content to value
editorValues.child(editorId).update({
    content: "hello world"
});