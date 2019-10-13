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
  this.outputBytecode=function(){
    var out;
    if(this.children.length==0){
      out=this.value;
    }else{
      out="(";
      out+=this.value+" ";
      for(var i=0;i<this.children.length;i++){
        out+=this.children[i].outputBytecode()+" ";
      }
      out=out.trim();
      out+=")";
    }


    return out;
  }
}




module.exports=Tree;
