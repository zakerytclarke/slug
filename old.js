var definitions={};

//var code="((define factorial (lambda n (if (>= n 1) (* n (factorial (- n 1))) 1))) (print (factorial 10)))";


//var code=`(define x (+ 9 1)) (print (+ (if true (+ x 1) 1) x))`;

//var code="print ((lambda (n m) (+ n m)) 10 11)"

var code="(define plusOne (lambda n (+ n 1))) (print (plusOne 10))";

code="("+code+")";
code=replaceAll(code,"(","[\"");
code=replaceAll(code,")","\"]");
code=replaceAll(code," ","\",\"");
code=replaceAll(code,"\n","");


code=replaceAll(code,"\"[","[");
code=replaceAll(code,"]\"]","]]");
code=replaceAll(code,"]\",","],");
code=replaceAll(code,"][","],[");


code=JSON.parse(code);

//Get Definitions
for(var i=0;i<code.length;i++){
  if(code[i][0]=="define"){
    definitions[code[i][1]]=code[i][2];
  }
}

var commands=["define","lambda","print","+","*","-","/","true","false","if",">","<","=",">=","<="];


//console.log(getElem([1,1,1]));
//Evaluate all Expressions
evaluate(code,[]);


function replaceAll(str,oldStr,newStr){
  while(code.indexOf(oldStr)!=-1){
    code=code.replace(oldStr,newStr);
  }
  return code;
}




function evaluate(arr,addr){

  console.log(arr);
  console.log(addr);
  console.log("*************");

  if(arr==null){
    return;
  }
  if(arr.constructor===Array){

      if(arr[0]=="define"){//Don't execute definitions
        //arr[2]=evaluate(arr[2],addr.concat([i]));
        return arr;
      }else{
        if(arr[0]=="lambda"){//Dont evaluate lambda at that level
          var temp=addr.slice(0);
          var args=[];
          //Get and remove args
          temp[temp.length-1]++;
          while(getElem(temp)!=null){
            args.push(getElem(temp));
            deleteElem(temp);
          }
          var names=arr[1];
          console.log(names);
          arr.splice(1,1);
          for(var i=0;i<args.length;i++){
            arr.splice(1,0,["define",names[i],args[i]])
          }
          console.log(JSON.stringify(code,null,2));
          while(1);
          arr[arr.length-1]=evaluate(arr[arr.length-1],addr.concat([arr.length-1]));
          arr[arr.length-1]=["slugStrip",arr[arr.length-1]];
          while(1);
          return arr[arr.length-1];
        }else
        /*if(arr[0].constructor===Array&&arr[0][0]=="lambda"){//Function Substitution
          console.log("L45ambda");
          console.log(arr);
          while(1);
        }else*/{
          for(var i=0;i<arr.length;i++){
            arr[i]=evaluate(arr[i],addr.concat([i]));
          }

          arr=arr.map(function(x){
            if(x!=null&&x.constructor===Array&&x[0].constructor===Array&&x[0][0]=="slugStrip"){
              return x[0][1];
            }
            return x;
          });
          console.log(arr);
          /*
          arr=arr.reduce(function(x){
            if(x==null){
              return false;
            }else{
              return true;
            }
          });*/
        }

      }
  }else{
    if(!isNaN(arr)){//Number
      return parseInt(arr);
    }else{
      if(arr[0]=="\""||arr[0]=="'"){//String
        return arr.substring(1,arr.length-1);
      }else{
        //Booleans
        if(arr=="true"){
          return true;
        }
        if(arr=="false"){
          return false;
        }

        if(arr==null){
          return null;
        }
        if(commands.indexOf(arr)!=-1){//Command
          return arr;
        }else{//Substitution
          var oldAddr=addr;
          arr=findElem(arr,addr);
          return evaluate(arr,addr);
        }
      }
    }
  }

  //Evaluate Command
  switch(arr[0]){

    //Boolean
    case "true":
      return true;
    break;
    case "false":
      return false;
    break;
    //Control
    case "if":
      if(arr[1]){
        return arr[2];
      }else{
        return arr[3];
      }
    break;


    //Lists
    case "list":
      arr.unshift();
      arr.unshift();
      while(1);
      return arr;
    break;
    case "head":
    console.log(arr);
    break;
    case "tail":
    console.log(arr);
    break;

    //I/O
    case "print":
      if(arr[1].constructor===Array&&arr[1][0]=="list"){
        arr[1].shift()
        console.log(arr[1]);
      }else{
        console.log(arr[1]);
      }
      return null;
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
    case ">":
      return arr[1]>arr[2];
    break;
    case "=":
      return arr[1]==arr[2];
    break;
    case "<":
      return arr[1]<arr[2];
    break;
    case ">=":
      return arr[1]>=arr[2];
    break;
    case "<=":
      return arr[1]<=arr[2];
    break;



    default:

  }


  return arr;

}





function findElem(id,oldAddr){
  var addr=oldAddr.slice(0);
  while(addr.length>0){
    if(addr[addr.length-1]>0){
      addr[addr.length-1]-=1;
    }else{
      addr.pop();
    }
    var temp=getElem(addr);
    if(temp==null){
    }
    if(temp.constructor===Array&&temp[0]=="define"&&temp[1]==id){
      return temp[2];
    }
  }
  return null;
}

function getElem(addr){
  var current=code;
  for(var i=0;i<addr.length;i++){
    current=current[addr[i]];
  }
  return current;
}


function deleteElem(addr){
  console.log(getElem(addr));
  var current=code;
  for(var i=0;i<addr.length-1;i++){
    current=current[addr[i]];
  }
  current.splice(addr[(addr.length-1)],1);

}
