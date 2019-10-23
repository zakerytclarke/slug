String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

fs=require("fs");

var builtin=["+","*","-","/","print","printLn","readLn"];

var old="((λtrue ((λfalse (false a b)) (λx (λy y)))) (λx (λy x)))";
old="((λtrue ((λfalse (true (true a c) b)) (λx (λy y)))) (λx (λy x)))";

var str=fs.readFileSync("./index.slc","UTF-8");
str=str.replaceAll('(','["').replaceAll(')','"]').replaceAll(' ','","');
str=str.replaceAll('["[',"[[").replaceAll(',"[',',[').replaceAll(']",','],').replaceAll(']"]',"]]").replaceAll(']"]',"]]");
str=str.replaceAll("\\","λ");

code=JSON.parse(str);
console.log(JSON.stringify(code));
var result=eval(code);
console.log(result);
/*
var code=[["λfalse",["true",["true","a","c"],"b"]],["λx",["λy","y"]]];
code=substitute(code,"true",["λx",["λy","x"]]);

console.log(JSON.stringify(code));
*/
function eval(arr){
  var current=arr;
  console.log(current);
  if(current.constructor===Array&&arr[0][0][0]=="λ"){
    if(current.length==2){
      current=substitute(arr[0][1],arr[0][0].replaceAll("λ",""),arr[1]);
    }else{
      current[0]=substitute(clone(arr[0][1]),arr[0][0].replaceAll("λ",""),arr[1]);
      current.splice(1,1);//Remove Substituted Arg
    }
  }else{
    if(builtin.indexOf(current[0])!=-1){//Built-in functions to be evaluated when tree is complete
      for(var i=1;i<current.length;i++){
        if(current[i].constructor===Array){
          current[i]=eval(current[i]);
        }
      }
      return current;
    }
    return current;
  }
  current=eval(current);

  return current;
}


function substitute(arr,variable,value){
/*
  if(arr.constructor===Array){
    arr=clone(arr);
  }
  if(value.constructor===Array){
    value=clone(value);
  }
  */
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




function clone(arr){

    var i, copy;

    if( Array.isArray( arr ) ) {
        copy = arr.slice( 0 );
        for( i = 0; i < copy.length; i++ ) {
            copy[ i ] = clone( copy[ i ] );
        }
        return copy;
    } else if( typeof arr === 'object' ) {
        throw 'Cannot clone array containing an object!';
    } else {
        return arr;
    }

}
