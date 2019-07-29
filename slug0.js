/*
var code=
`
factorial(n)={
  if(n>=1){
  return n*factorial(n-1);
  }else{
    return n;
  }
}
`;
*/
/*
var code=
`
test(n)={
  if(n>=10){
  return 10*n;
  }else{
    return 10-n*5;
  }
}
`;
*/
var code=
`
test(n)={
  return 10*n-5
}
`;


var symbols=[" ","(",")","{","}","[","]","+","*","-","/","\"","'","=","==","!=",">","<",">=","<="];
var inline=["=","==",">=","<=",">","<","!=","^","*","/","+","-"];//Lower Index = Higher Prioriy


//Check for longest symbols first

symbols.sort(function(x,y){
  return y.length-x.length;
});



var tokens=[];
var prev=0;
var i=0;

var quoteMode=false;

while(i<code.length){
  for(var j=0;j<symbols.length;j++){
    if(code.substr(i,symbols[j].length)==symbols[j]){
      tokens.push(code.substring(prev,i));
      //Push Symbol
      tokens.push(symbols[j]);
      i+=symbols[j].length;
      prev=i;
      break;
    }
  }

  i++;
}


tokens=tokens.filter(function(x){
  if(x==""||x==" "||x=="\n"||x=="\t"){
    return false;
  }else{
    return true;
  }
});

//Remove New lines
tokens=tokens.map(function(x){
  return x.replace(/^\s+|\s+$/g, '');;
});

//Parsed Tokens
console.log(tokens);


//Parse into Tree
var root=new Tree("root");
var current=root;
for(var i=0;i<tokens.length;i++){
  if(tokens[i]=="("||tokens[i]=="{"){
    if(current.children.length==0){
      current=current.addChild("null");
    }else{
      current=current.children[current.children.length-1];
    }
  }else
  if(tokens[i]==")"||tokens[i]=="}"){
    current=current.parent;
  }else{
    current.addChild(tokens[i]);
  }
}

root.view();


/*
//Test tree
root=new Tree("root");
root.addChild("1");
root.addChild("+");
root.addChild("5");
root.addChild("*");
root.addChild("10");
*/
//Parse Inline tokens
var oldRoot=root;


//Make new Tree
root=new Tree("root");



root=fixInlineTree(oldRoot);

root.view();

var current=root;





















function fixInlineTree(current){
  var stack=[];
  var outStack=[];
  for(var i=0;i<current.children.length;i++){


    //console.log(inline.indexOf(current.children[i]));
    if(inline.indexOf(current.children[i].value)!=-1){//Operator
      if(
        stack.length==0||
        inline.indexOf(current.children[i].value)<inline.indexOf(stack[stack.length-1].value)
      ){
        stack.push(current.children[i]);
      }else{
        while(
          stack.length>0&&
          inline.indexOf(current.children[i].value)>=inline.indexOf(stack[stack.length-1].value)
        ){
          outStack.push(stack.pop());
        }
      }
    }else{//Operand
      outStack.push(current.children[i]);
    }
  }

  while(stack.length>0){
    outStack.push(stack.pop());
  }



  var out=new Tree(current.value);
  var working=out;

  //outStack.reverse();

/*
  //Create Function Tree Instead of Stack
  for(var i=0;i<outStack.length;i++){
//    console.log(working);
    if(inline.indexOf(outStack[i])!=-1){
      working.children.push(outStack[i]);
      working.children[working.children.length-1].parent=working;
      working=working.children[working.children.length-1];
    }else{
      working.children.push(outStack[i]);
      working.children[working.children.length-1].parent=working;
      if(working.children.length>=2&&working.parent!=null){
        working=working.parent;
      }
    }
  }
*/

  for(var i=0;i<outStack.length;i++){
    out.children.push(outStack[i]);
  }


  //out.children.reverse();
  //console.log(out.children);
  for(var i=0;i<out.children.length;i++){
    out.children[i]=fixInlineTree(out.children[i]);
  }

  return out;
}


function Tree(value){
  this.value=value;
  this.parent=null;
  this.children=[];
  this.addChild=function(value){
    this.children.push(new Tree(value));
    this.children[this.children.length-1].parent=this;
    return this.children[this.children.length-1];
  }
  this.view=function(height){
    if(height==null){
      height=0;
    }
    var out="";

    for(var i=0;i<height;i++){
      out+=" ";
    }
    out+="|_";
    console.log(out+this.value);
    for(var i=0;i<this.children.length;i++){
      this.children[i].view(height+1);
    }
  }
}
