// Init Firebase
var config = {
    apiKey: "AIzaSyB284IXRfrPx3LpNaGGVr1a66JhD3NUxKI",
    authDomain: "bonfire-b6633.firebaseapp.com",
    databaseURL: "https://bonfire-b6633.firebaseio.com",
    projectId: "bonfire-b6633",
    storageBucket: "bonfire-b6633.appspot.com",
    messagingSenderId: "666805898095"
};
firebase.initializeApp(config);

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
//////////////////////////////////////////////////
var editor;
editor = ace.edit("editor");
editor.setTheme("ace/theme/cobalt")
var LS_THEME_KEY = "editor-theme";
// Get the reference to the editor id
var currentEditorValue = editorValues.child(editorId);

// Get the `queue` child (which looks like an array where we push update events)
var queueRef = currentEditorValue.child("queue");

// This boolean is going to be true only when the value is being set programmatically
// We don't want to end with an infinite cycle since ACE editor triggers the
// `change` event on programmatic changes (which, in fact, is a good thing)
var applyingDeltas = false;

// Listen for the `change` event
editor.on("change", function(e) {

    // In case the change is emitted by us, don't do anything
    // (see below, this boolean becomes `true` when we receive data from Firebase)
    if (applyingDeltas) {
        return;
    }

    // Set the content in the editor object
    // This is being used for new users, not for already-joined users.
    currentEditorValue.update({
        content: editor.getValue()
    });

    // Generate an id for the event in this format:
    //  <timestamp>:<random>
    // We use a random thingy just in case somebody is saving something EXACTLY
    // in the same moment
    queueRef.child(Date.now().toString() + ":" + Math.random().toString().slice(2)).set({
        // Store the data we get from ACE editor
        event: e,
        // Store the pseudo-user id
        by: uid
    }).catch(function(e) {
        // In case of errors, we want to see them in the console
        console.error(e)
    });
});

// Listen for updates in the queue
queueRef.on("child_added", function (ref) {

    // Get the timestamp
    var timestamp = ref.key.split(":")[0];

    // Do not apply changes from the past
    if (openPageTimestamp > timestamp) {
        return;
    }

    // Get the snapshot value
    var value = ref.val();
    
    // In case it's me who changed the value, I am
    // not interested to see twice what I'm writing.
    // So, if the update is made by me, it doesn't
    // make sense to apply the update
    if (value.by === uid) { return; }

    // We're going to apply the changes by somebody else in our editor
    //  1. We turn applyingDeltas on
    applyingDeltas = true;
    //  2. Update the editor value with the event data
    doc.applyDeltas([value.event]);
    //  3. Turn off the applyingDeltas
    applyingDeltas = false;
});

// Select the desired programming language you want to code in 
var $selectLang = $("#select-lang").change(function () {
    // Set the language in the Firebase object
    // This is a preference per editor
    currentEditorValue.update({
        lang: this.value
    });
    // Set the editor language
    editor.getSession().setMode("ace/mode/" + this.value);
});

// Somebody changed the lang. Hey, we have to update it in our editor too!
currentEditorValue.child("lang").on("value", function (r) {
    var value = r.val();
    // Set the language
    var cLang = $selectLang.val();
    if (cLang !== value) {
        $selectLang.val(value).change();
    }
});

// This function will return the user theme or the Monokai theme (which
// is the default)
function getTheme() {
    return localStorage.getItem(LS_THEME_KEY) || "ace/theme/monokai";
}

// Select the desired theme of the editor
$("#select-theme").change(function () {
    // Set the theme in the editor
    editor.setTheme(this.value);
    
    // Update the theme in the localStorage
    // We wrap this operation in a try-catch because some browsers don't
    // support localStorage (e.g. Safari in private mode)
    try {
        localStorage.setItem(LS_THEME_KEY, this.value);
    } catch (e) {}
}).val(getTheme());