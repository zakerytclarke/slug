// Generated automatically by nearley, version undefined
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "term", "symbols": ["sum"]},
    {"name": "term", "symbols": [{"literal":"(","pos":8}, "sum", {"literal":")","pos":12}]},
    {"name": "sum", "symbols": ["factor"]},
    {"name": "sum", "symbols": ["term", {"literal":"+","pos":24}, "term"]},
    {"name": "sum", "symbols": ["term", {"literal":"-","pos":32}, "term"]},
    {"name": "factor", "symbols": ["powTerm"]},
    {"name": "factor", "symbols": ["term", {"literal":"*","pos":46}, "term"]},
    {"name": "factor", "symbols": ["term", {"literal":"/","pos":54}, "term"]},
    {"name": "powTerm", "symbols": ["int"]},
    {"name": "powTerm", "symbols": ["term", {"literal":"^","pos":68}, "term"]},
    {"name": "number", "symbols": ["int"]},
    {"name": "number", "symbols": ["int", {"literal":".","pos":82}, "int"]},
    {"name": "number", "symbols": [{"literal":".","pos":88}, "int"]},
    {"name": "number", "symbols": [{"literal":"-","pos":94}, "number"]},
    {"name": "int", "symbols": ["digit"]},
    {"name": "int", "symbols": ["digit", "int"]},
    {"name": "digit", "symbols": [{"literal":"0","pos":114}]},
    {"name": "digit", "symbols": [{"literal":"1","pos":118}]},
    {"name": "digit", "symbols": [{"literal":"2","pos":122}]},
    {"name": "digit", "symbols": [{"literal":"3","pos":126}]},
    {"name": "digit", "symbols": [{"literal":"4","pos":130}]},
    {"name": "digit", "symbols": [{"literal":"5","pos":134}]},
    {"name": "digit", "symbols": [{"literal":"6","pos":138}]},
    {"name": "digit", "symbols": [{"literal":"7","pos":142}]},
    {"name": "digit", "symbols": [{"literal":"8","pos":146}]},
    {"name": "digit", "symbols": [{"literal":"9","pos":150}]}
]
  , ParserStart: "term"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
