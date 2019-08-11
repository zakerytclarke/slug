var parser=require("./parser.js");
var eval=require("./eval.js");

/*
var code=`
stdio.println(test(5));

test(n):={
  stdio.println(n);
  x=10*n;
  if(n>=10){
    stdio.println("test"+"1");
    return(10);
  }else{
    stdio.println("test");
    return(10-n*add(5,1));
  }
};

add(b,c):={
  return(b+c);
};

`;
*/

var code=`
a(10);


a(i):={
  i+1;

  d(l):={
    1;
  }
}

b(j):={
  j+2;
}
c(k):={
  k+3;
}

`;



var parsedCode=parser(code);
parsedCode.view();


//var eval=eval(parsedCode);
