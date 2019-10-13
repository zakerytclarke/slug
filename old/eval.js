var Tree=require("./tree.js");


module.exports=function(code){
  var eventLoop=[];
  var upEval=["+","-","*","/","stdio.println"];//Children Must be Evaluated First

  var builtin={
    "+":function(tree){
      tree.view();
      while(1);
      var sum="";
      var sum=tree.children.reduce(
        function(acc,current){
          var arg1=acc;
          var arg2=current.value;

          if(!isNaN(arg1)){//Is a Number
            arg1=parseInt(arg1);
          }
          if(!isNaN(arg2)){//Is a Number
            arg2=parseInt(arg2);
          }

          return arg2+arg1;
      },0);
      return new Tree(sum);
    },
    "*":function(tree){
      var total="";
      var total=tree.children.reduce(
        function(acc,current){
          var arg1=acc;
          var arg2=current.value;

          if(!isNaN(arg1)){//Is a Number
            arg1=parseInt(arg1);
          }
          if(!isNaN(arg2)){//Is a Number
            arg2=parseInt(arg2);
          }

          return arg2*arg1;
      },1);
      return new Tree(total);
    },
    "if":function(tree){

      var bool=tree.children[0].value;
      if(bool=="true"){
        return tree.children[1];
      }else if(bool=="false"){
        return tree.children[2];
      }else{//Further Evaluation Needed
        eval(bool);
      }
    },
    "stdio.println":function(tree){
      var out="";
      for(var i=0;i<tree.children.length;i++){
        out+=tree.children[i].value;
      }
      console.log(out);
      return new Tree('null');
    }

  }


  eval(code);
  code.view();


  function eval(current){

    if(current.value=="null"){//Evaluate Grouping TODO Make Parallel
      for(var i=0;i<current.children.length;i++){
        eval(current.children[i]);
      }
    }else{

      if(upEval.indexOf(current.value)!=-1){//Delayed Evaluation
        for(var i=0;i<current.children.length;i++){
          eval(current.children[i]);
        }
      }

      if(builtin[current.value]!=null){//Built in Functions
        var temp=builtin[current.value](current);
        temp.view();
        current.value=temp.value;
        current.children=[];
        for(var i=0;i<temp.children.length;i++){
          current.children[i]=temp.children[i];
        }
      }else{//Function

      }

    }

  }


  function findObj(current,value){
    var temp=current.parent;
    var out=[];

    while(temp.parent!=null){//Find all possible matches
      for(var i=0;i<temp.children.length;i++){
        if(temp.children[i].value==":="){//Definition
          out.push({
            score:similarity(temp.children[i].children[0]),
            definition:temp.children[i].children[1]
          });
        }
      }

      temp=temp.parent;

    }

    for(var i=0;i<temp.children.length;i++){
      if(temp.children[i].value==":="){//Definition
        out.push({
          score:similarity(temp.children[i].children[0]),
          definition:temp.children[i].children[1]
        });
      }
    }

    out.sort(function(x,y){
      return y.score-x.score;
    });

    return out[0];

  }



  function similarity(obj1,obj2){
    var numSimilar=0;
    if(obj1.value==obj2.value){
      numSimilar++;
    }

    if(obj1.children.length>obj2.children.length){
      for(var i=0;i<obj1.children.length;i++){
        if(obj2[i]!=null){
          numSimilar+=similarity(obj1.children[i],obj2.children[i]);
        }
      }
    }else{
      for(var i=0;i<obj1.children.length;i++){
        if(obj2[i]!=null){
          numSimilar+=similarity(obj1.children[i],obj2.children[i]);
        }
      }
    }

  }


}
