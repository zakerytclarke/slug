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

var code="stdio.println(1+2*3)";
var code=`
stdio.println(
  if(true){
    0+2;
  }else{
    1;
  });
`;

var parsedCode=parser(code);
parsedCode.view();

eval(parsedCode);



//var eval=eval(parsedCode);
