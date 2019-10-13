var fs=require("fs");
var txt=fs.readFileSync("./test.lambda","UTF-8");

console.log(txt);

txt=txt.split("");

for(var i=0;i<txt.length;i++){
  if(txt[i]=="("){
    if(txt[i+1]&&txt[i+1]!="("){
      txt[i]='["';
    }else{
      txt[i]='[';
    }

  }
  if(txt[i]==" "){
    if(txt[i+1]&&txt[i+1]!="("){
      txt[i]='","';
    }else{
      txt[i]='",';
    }
  }
  if(txt[i]==")"){
    if(txt[i+1]&&txt[i+1]!=")"){
      txt[i]=']';
    }else{
      txt[i]='"]';
    }

  }

}

txt=txt.reduce(function(acc,current){
  return acc.concat(current);
});

console.log(txt);

var code=[["\\true",["true","a","b"]],["\\x",["\\y","x"]]];
var code=[["\\true",[["\\false",["true","a","b"]],["\\x",["\\y","y"]]]],["\\x",["\\y","x"]]];

var out=evalStrict(code);
console.log(out);

function evalStrict(code){
  console.log("");
  var current=code[0];

  if(code[0]&&code[0][0]&&code[0][0][0]=="\\"){//Substitution
    var variable=code[0][0].substr(1);
    var value=code[1];

    var code=substitute(code,variable,value);
    console.log(JSON.stringify(code));// Reduce Tree
    code.splice(1,1);

    if(code.length<=1){
      return evalStrict(code[0][1]);
    }else{//More Variables to Substitute
      code[0]=code[0][1];
      return evalStrict(code);
    }
    console.log(JSON.stringify(code));// Reduce Tree

  }
  if(code[0]&&code[0][0]){
    return code;
  }
}

var temp=["a","b","c"];
temp=substitute(temp,"a","1");





function substitute(arr,variable,value){
  if(arr.constructor===Array){
    var out=[];
    for(var i=0;i<arr.length;i++){
      out.push(substitute(arr[i],variable,value));
    }
    return out;
  }
  //Individual String
  if(arr==variable){
    return value;
  }else{
    return arr;
  }

}
