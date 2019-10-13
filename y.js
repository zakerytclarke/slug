// http://matt.might.net/articles/implementation-of-recursive-fixed-point-y-combinator-in-javascript-for-memoization/
var Y = function (F) {
 return (function (x) {
  return F(function (y) { return (x(x))(y);});
  })
        (function (x) {
  return F(function (y) { return (x(x))(y);});
  });
};

function Ymem(F, cache) {
 if (!cache)
  cache = {} ; // Create a new cache.
 return function(arg) {
  if (cache[arg])
   return cache[arg] ; // Answer in cache.
  var answer = (F(function(n){
   return (Ymem(F,cache))(n);
  }))(arg) ; // Compute the answer.
  cache[arg] = answer ; // Cache the answer.
  return answer ;
 };
};


var factGen=
function(factY){
  return function(n){
    if(n<=1){
      return 1;
    }else{
      return n*factY(n-1);
    }
  }
}


var factorial=Ymem(factGen);



console.log(factorial(10));
