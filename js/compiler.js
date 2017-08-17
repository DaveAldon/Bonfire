document.getElementById("compilerStatus").innerHTML = "Compiler is <span id='statusOn'>Online</span>";
document.getElementById("compilerStatus").innerHTML = "Compiler is <span id='statusOff'>Offline</span>";

var compiler = ace.edit("cb");
compiler.setTheme("ace/theme/monokai");
compiler.getSession().setMode("ace/mode/javascript");
compiler.resize();
compiler.getSession().setUseWrapMode(true);
compiler.session.setValue("")

compiler.setOptions({
    //maxLines: 1,
    readOnly: false,
    autoScrollEditorIntoView: true,
    highlightActiveLine: true,
    printMargin: false,
    showGutter: false,
    scrollPastEnd: true,
    autoScrollEditorIntoView: false,
    mode: "ace/mode/javascript",
    theme: "ace/theme/tomorrow_night_eighties"
});
