var definitions={};

//var code="(define factorial (lambda n (if (>= n 1) (* n (factorial (- n 1))) 1))) (factorial 10)";

var code="(+ 1 2)"

code="("+code+")";
code=replaceAll(code,"(","[\"");
code=replaceAll(code,")","\"]");
code=replaceAll(code," ","\",\"");

code=replaceAll(code,"\"[","[");


code=replaceAll(code,"]\"]","]]");

code=replaceAll(code,"]\",","],");


code=JSON.parse(code);

//Get Definitions
for(var i=0;i<code.length;i++){
  if(code[i][0]=="define"){
    definitions[code[i][1]]=code[i][2];
  }
}

console.log(definitions);

//Evaluate all Expressions
for(var i=0;i<code.length;i++){
  var temp=evaluate(code[i]);
  if(temp!=null){
    console.log(temp);
  }
}
evaluate(code);


function replaceAll(str,oldStr,newStr){
  while(code.indexOf(oldStr)!=-1){
    code=code.replace(oldStr,newStr);
  }
  return code;
}




function evaluate(arr,args){
  console.log(arr);
  if(arr.constructor===Array){
    for(var i=0;i<arr.length;i++){
      arr[i]=evaluate(arr[i]);
    }
  }else{
    if(!isNaN(arr)){
      return parseInt(arr);
    }else{
      return arr;
    }
  }


  console.log(arr);

  switch(arr[0]){

    case "":
      return arr[1]+arr[2];
    break;

    //Math
    case "+":
      return arr[1]+arr[2];
    break;
    case "-":
      return arr[1]-arr[2];
    break;
    case "*":
      return arr[1]*arr[2];
    break;
    case "/":
      return arr[1]/arr[2];
    break;
    case "^":
      return Math.pow(arr[1],arr[2]);
    break;




    default:

  }


  return arr;

}
