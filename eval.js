var Tree=require("./tree.js");


module.exports=function(code){
  var eventLoop=[];
  var upEval=["+","-","*","/","stdio.println"];//Children Must be Evaluated First

  var builtin={
    "+":function(tree){

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

    if(current.value=="null"){
      for(var i=0;i<current.children.length;i++){
        eval(current.children[i]);
      }
    }else{

      if(upEval.indexOf(current.value)!=-1){//Delayed Evaluation
        for(var i=0;i<current.children.length;i++){
          eval(current.children[i]);
        }
      }
      if(builtin[current.value]!=null){
        var temp=builtin[current.value](current);
        current.value=temp.value;
        current.children=[];
        for(var i=0;i<temp.children.length;i++){
          current.children[i]=temp.children[i];
        }
      }

    }

  }

}
