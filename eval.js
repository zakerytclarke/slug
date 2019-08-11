
module.exports=function(code){
  var eventLoop=[];

  //Init
  eventLoop.push(
    {
      tree:code,
      addr:[0]
    });


    var upEval=["+","-","*","/","stdio.println"];



eval();


    for(var i=0;i<eventLoop.length;i++){
      eventLoop[i].tree.view();
    }



  function eval(){
    var task=eventLoop.shift();
    var current=task.tree;
    var addr=task.addr;

    if(current.value=="null"&&current.children.length>=1){//Grouping; Can be executed in parallel
        for(var i=0;i<current.children.length;i++){
          eventLoop.push(
            {
              tree:current.children[i],
              addr:addr.concat([i])
            });
        }
    }else{

    }


  }

}
