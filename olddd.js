Slug("+ 10 1");

function Slug(input){


  input="("+input+")";
  input=replaceAll(input,"(","[\"");
  input=replaceAll(input,")","\"]");
  input=replaceAll(input," ","\",\"");
  input=replaceAll(input,"\n","");


  input=replaceAll(input,"\"[","[");
  input=replaceAll(input,"]\"]","]]");
  input=replaceAll(input,"]\",","],");
  input=replaceAll(input,"][","],[");


  code=JSON.parse(input);
  evaluate(code,[]);

  console.log(code);




  function evaluate(arr,oldAddr){
    if(arr[0]=="define"){//Dont Evaluate Define
      return;
    }else
    if(arr[0].constructor===Array&&arr[0][0]=="lambda"){//Lambda Substitution
      return;
    }else{
      if(arr.constructor===Array){
        for(var i=0;i<arr.length;i++){
          evaluate(arr[i],oldAddr.concat([i]));
        }

        console.log(arr);
        arr=11;
        //evaluateCommand(arr);
        console.log(arr);

      }else{//Values
        return;
      }
    }
  }


function evaluateCommand(arr){
  switch(arr[0]){
    case "+":
      var arg1=arr[1];
      if(!isNaN(arg1)){
        arg1=parseInt(arg1);
      }
      var arg2=arr[2];
      if(!isNaN(arg1)){
        arg2=parseInt(arg2);
      }
      arr=arg1+arg2;
    break;

    default:
  }
}




  function getElem(addr){
    var current=code;
    for(var i=0;i<addr.length;i++){
      current=current[addr[i]];
    }
    return current;
  }

  function replaceAll(str,oldStr,newStr){
    while(str.indexOf(oldStr)!=-1){
      str=str.replace(oldStr,newStr);
    }
    return str;
  }

}
