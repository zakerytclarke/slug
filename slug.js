
var code=
`
stdio.println(test(5));

test(n)={
  stdio.println(n);
  if(n>=10){
    stdio.println("test"+"1");
    return(10);
  }else{
    stdio.println("test");
    return(10-n*add(5,1));
  }
};

add(b,c)={
  return(b+c);
};

`;


var code="1+2*3/(5-4)"
/*
var code=
`
stdio.println(generate(10)[ 1 ]);

generate(n)={
  if(n>1){
    return [n]++generate(n-1);
  }else{
    return [1];
  }
}
`;
*/
/*
var code=`
if(n>=10){
  return 10;
}else{
  return 10-n*5;
}
`;
*/
var separators=[" ","\n","\t","\r",";",",","else"];
var blocks=["(",")","[","]","{","}"];
var functions=["if"];
var inline=[":=","==",">=","<=",">","<","!=","=","++","^","*","/","+","-"];//Lower Index = Higher Prioriy
var symbols=separators.concat(blocks.concat(inline));

//Check for longest symbols first

symbols.sort(function(x,y){
  return y.length-x.length;
});


var lexical=[];

var i=0;
var p=0;


while(i<code.length){
  for(var j=0;j<symbols.length;j++){
    if(symbols[j]==code.substr(i,symbols[j].length)){
      lexical.push(code.substring(p,i));
      lexical.push(symbols[j]);
      p=i+symbols[j].length;
      i+=symbols[j].length;
      break;
    }
  }
  i++;
}

//Fix Paren Mismatch
var oldLexical=lexical;
var lexical=[];

for(var i=0;i<oldLexical.length;i++){
  if(blocks.indexOf(oldLexical[i][0])!=-1){
    lexical.push(oldLexical[i][0]);
    lexical.push(oldLexical[i].substring(1));
  }else{
    lexical.push(oldLexical[i]);
  }
}


lexical=lexical.filter(function(x){
  if(separators.indexOf(x)!=-1){
    return false;
  }else{
    return true;
  }
});

lexical=lexical.map(function(x){
  if(x[0]=="\n"){
    return x.substring(1);
  }else{
    return x.trim();
  }
})

lexical=lexical.filter(function(x){
  if(x==''||x==null){
    return false;
  }else{
    return true;
  }
});


//Create Parse Tree
var root=new Tree("root");
var current=root;

for(var i=0;i<lexical.length;i++){
  if(lexical[i]=="("||lexical[i]=="{"){
    current.addChild("null");
    current=current.children[current.children.length-1];
  }else
  if(lexical[i]==")"||lexical[i]=="}"){
    current=current.parent;
  }else{
    current.addChild(lexical[i]);
  }
}

console.log(lexical);


root.view();
var oldRoot=root;
root=pairFunctions(oldRoot);//Pair Functions with arguments
var oldRoot=root;
root=removeNulls(oldRoot);//Trim uncessary grouping
var oldRoot=root;
//root=convertStacktoTree(oldRoot);
assignParent(root);
console.log("***********************************");
root.view();


function Tree(value){
  this.value=value;
  this.parent=null;
  this.children=[];
  this.addChild=function(value){
    this.children.push(new Tree(value));
    this.children[this.children.length-1].parent=this;
    return this.children[this.children.length-1];
  }
  this.add=function(value){
    this.children.push(value);
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



function pairFunctions(current){
  var out=new Tree(current.value);

  while(current.children.length>0){
    var temp=current.children.shift();
    if(temp.value=="null"){
      if(out.children.length>0){
        if(out.children[out.children.length-1].value=="null"){
            out.add(temp);
        }else{
          out.children[out.children.length-1].add(temp)
        }
      }else{
        out.add(temp);
      }
    }else{
      out.add(temp);
    }
  }

  for(var i=0;i<out.children.length;i++){
    out.children[i]=pairFunctions(out.children[i]);
  }

  return out;
}


function removeNulls(current){
  var out=new Tree(current.value);
  if(current.children.length==1&&current.children[0].value=="null"){
    for(var i=0;i<current.children[0].children.length;i++){
      out.add(current.children[0].children[i]);
    }
  }else{
    for(var i=0;i<current.children.length;i++){
      out.add(current.children[i]);
    }
  }

  for(var i=0;i<out.children.length;i++){
    out.children[i]=removeNulls(out.children[i]);
  }

  return out;
}



function convertStacktoTree(current){
  var stack=[];
  var out=[];

  for(var i=0;i<current.children.length;i++){
    console.log(out);
    console.log("*******************");
    if(inline.indexOf(current.children[i].value)==-1){
      out.push(current.children[i]);
    }else
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
        out.push(stack.pop());
      }
    }
  }


    while(stack.length>0){
      out.push(stack.pop());
    }

  var outTree=new Tree(current.value);

  for(var i=0;i<out.length;i++){
    outTree.add(out[i]);
  }


  for(var i=0;i<outTree.children.length;i++){
    outTree.children[i]==convertStacktoTree(outTree.children[i]);
  }
  outTree.view();
  return outTree;
}




function assignParent(current){
  for(var i=0;i<current.children.length;i++){
    current.children[i].parent=current;
  }
  for(var i=0;i<current.children.length;i++){
    assignParent(current.children[i]);
  }
}



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
