String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

fs=require("fs");

var str=fs.readFileSync("./index.slc","UTF-8");
console.log(str);

str=str.replaceAll('(','["').replaceAll(')','"]').replaceAll(' ','","');
str=str.replaceAll('["[',"[[").replaceAll(',"[',',[').replaceAll(']",','],').replaceAll(']"]',"]]").replaceAll(']"]',"]]");
str=str.replaceAll("\\","λ");

code=JSON.parse(str);
var result=eval(code);

console.log(result);

function eval(arr){
  var current=arr;
  console.log(current);
  if(current.constructor===Array&&arr[0][0][0]=="λ"){
    if(current.length==2){
      current=substitute(arr[0][1],arr[0][0].replaceAll("λ",""),arr[1]);
    }else{
      current[0]=substitute(arr[0][1],arr[0][0].replaceAll("λ",""),arr[1]);
      current.splice(1,1)
    }
  }else{
    return current;
  }
  current=eval(current);

  return current;
}


function substitute(arr,variable,value){
  if(arr.constructor===Array){
    if(arr[0]=="λ"+variable){//Contains Lambda with same variable
      return arr;
    }
    for(var i=0;i<arr.length;i++){
      if(arr[i].constructor===Array){
        arr[i]==substitute(arr[i],variable,value);
      }else{
        if(arr[i]==variable){//Substitute value
          arr[i]=value;
        }//Otherwise leave alone
      }
    }
  }else{//Single Value
    if(arr==variable){
      return value;
    }
  }

  return arr;
}
