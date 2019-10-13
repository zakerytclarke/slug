const nearley = require("nearley");
const grammar = require("./grammar.js");

const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

//var code="fact(0):=1;";

var code="1+2*3";

parser.feed(code);

//print(removeUseless(unwrap(parser.results[0])));


function unwrap(arr){
  if(arr.constructor===Array){
      if(arr.length==1){
        arr=unwrap(arr[0]);
      }else{
        for(var i=0;i<arr.length;i++){
          arr[i]=unwrap(arr[i]);
        }
      }
  }
  return arr;
}

function removeUseless(arr){
  if(arr.constructor===Array){
    arr=arr.filter(function(x){
      if(x.length==0){
        return false;
      }else{
        return true;
      }
    });
    arr=arr.map(function(x){
      return removeUseless(x);
    });
  }
  return arr;
}




console.log(JSON.stringify(removeUseless(unwrap(parser.results[0])),null,1));

//print(parser.results);



function print(arr,h){
  if(h==null){
    var height=0;
  }else{
    var height=h;
  }
  for(var i=0;i<arr.length;i++){
    var out="";
    for(var j=0;j<height;j++){
      out+=" ";
    }
    if(arr[i].constructor===Array){
      console.log(out+"|_");
      print(arr[i],height+1);
    }else{
      console.log(out+"|_'"+arr[i]+"'");
    }
  }

}
