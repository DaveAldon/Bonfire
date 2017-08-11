document.getElementById("compilerStatus").innerHTML = "Compiler is <span id='statusOn'>Online</span>";
document.getElementById("compilerStatus").innerHTML = "Compiler is <span id='statusOff'>Offline</span>";

var compiler = ace.edit("cb");
    compiler.setTheme("ace/theme/monokai");
    compiler.getSession().setMode("ace/mode/javascript");
compiler.resize();
