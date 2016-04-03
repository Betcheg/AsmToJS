$(document).ready(function(){
    initstack();   
});

function initstack() {
    $("#stack").html("<center><u>Stack</u></center> <br><br>");
    for(var i=0; i<=9;i++){ 
        var row = "<tr><td>$t"+i+"</td><td id='t"+i+"'></td></tr>";
        $("#stack").append(row);
    }
}

$("#make").click(function() {
    parse();
});

// The stack
var stack = [];

var instructions = [];
var val = [];

var line = 0;
var car = 0;

// Instruction skeleton
var instruction = {
    name: "",
    val1 : null,
    val2 : null,
    val3 : null
}

var token = 0;
var code = "";
function parse() {
    code = $("#code").val();
    while (token < code.length){
        parseInst();
        line++;
        car = token;
}
    
    for (var i=0; i<instructions.length; i++){
        evalInst(i);
    }
    token = 0;
    line= 0;
}  

function parseInst() {

var currentInst = {
    name: "",
    reg : null,
    val2 : null,
    val3 : null
   }

    currentInst.name = parseName();
    currentInst.reg = parseReg();

    if(code[token] == "\n") {
        instructions.push(currentInst);

       parseToken("\n");
        return;
    }
    if (token >= code.length){
       instructions.push(currentInst);
        return;
    }
    parseToken(",");
    currentInst.val2 = parseVal();

    if(code[token] == "\n") {
         instructions.push(currentInst);
        parseToken("\n");
        return;
    }
    if (token >= code.length) {
        instructions.push(currentInst);
        return ;
    }
    parseToken(",");
    currentInst.val3 = parseVal();
    parseToken("\n");

    instructions.push(currentInst);
}

function parseName() {
    var name = "";
    while(code[token] != " "){
        name += code[token];
        token++;
    }

    while(code[token] == " ") {
        token++;
    }
    console.log(name);
    return name;
}

function parseReg() {
    // Ca peut etre une etiquette aussi
    parseToken("$");
    parseToken("t");
    var num = code[token];
    token++;

        while(code[token] == " ") {
            token++;
        }


    return "t"+num;
}

function parseVal() {

    var value=0;

    if( code[token] == "$"){
        parseToken("$");
        parseToken("t");
        if($("#t"+code[token]).text() != "") {
            value = $("#t"+code[token]).text();
        }
        token++;

        while(code[token] == " ") {
            token++;
        }

        return value;
    }
    else {
        value=code[token];
        token++;
        //console.log("current += 10*current");

        while(code[token] == " ") {
            token++;
        }

        return value;
    }


}

function parseToken(c){
    if(code[token] != c){
        $("#jscode").append("apprends a coder, token attendu \""+c+"\" mais recu \""+code[token]+"\" au token "+token+" ligne "+line+" au caractere numero "+(token-car)+"<br>");
    }
    token++;
}

function evalInst(i){
    if(instructions[i].name.toUpperCase()=="ADD") {
        $("#"+instructions[i].reg).text(parseInt(instructions[i].val2) + parseInt(instructions[i].val3));            
    }
}
