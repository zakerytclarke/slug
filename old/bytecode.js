var code=`
(null (if (== n 10) (null (stdio.println (* 10 20)) (stdio.println (+ 30 40))) (null (stdio.println (/ 10 20)) (stdio.println (- 30 40)))))
`;


//Convert Scheme Syntax into Parse Tree
code=replaceAll(code,"(","[");
code=replaceAll(code,")","]");
code=replaceAll(code,"\n"," ");
code=replaceAll(code,"\t"," ");
code=replaceAll(code," ",",");

var i=0;
while(i<code.length){
  if(code[i]=="\\"){
    code=code.substring(0,i+1)+'\\'+code.substring(i+1);
    i++;
  }
  i++;
}
var i=0;
while(i<code.length){
  if(code[i]=="["||code[i]=="]"||code[i]==","){
    if(code[i+1]!="["&&code[i+1]!="]"&&code[i+1]!=","){
      code=code.substring(0,i+1)+'"'+code.substring(i+1);
    }
  }else{
      if(code[i]!='"'&&code[i+1]!="["&&code[i+1]!="]"&&code[i+1]==","){
          code=code.substring(0,i+1)+'"'+code.substring(i+1);
      }
  }
  i++;
}
i=0;
while(i<code.length){
  if(code[i]=="]"){
    code=code.substring(0,i)+'"'+code.substring(i);
    i++;
  }
  i++;
}
i=0;
while(i<code.length){
  if(code[i]=="["&&code[i+1]!="["&&code[i+2]=="["){
    code=code.substring(0,i+1)+code.substring(i+2);
  }
  if(code[i]=="]"&&code[i+1]!="]"&&code[i+2]=="]"){
    code=code.substring(0,i+1)+code.substring(i+2);
  }
  i++;
}
while(code[code.length-1]!="]"){
  code=code.substring(0,code.length-1);
}
code=code.replace(',"]',"]");


code=code.substr(1);

var parsedcode=JSON.parse(code);

eval([0]);




var builtin={
  if:["\\x",["\\y","x"]]
}

//Evaluate Expression


function eval(addr){
  var symbol=getAddr(addr);
  if(symbol=="null"){

  }
}


function getAddr(addr){
  var current=parsedcode;
  for(var i=0;i<addr.length;i++){
    current=current[addr[i]];
  }
  return current;
}


/*
var builtin={
  if:"(\x (\y (\z (x y z))))"
}
*/







function replaceAll(str,oldstr,newstr){
  while(str.indexOf(oldstr)!=-1){
    str=str.replace(oldstr,newstr);
  }
  return str;
}
