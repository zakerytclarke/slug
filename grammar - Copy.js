// Generated automatically by nearley, version 1.0.0
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "expr", "symbols": ["definition"]},
    {"name": "expr", "symbols": ["term"]},
    {"name": "expr", "symbols": ["expr", "expr"]},
    {"name": "definition$string$1", "symbols": [{"literal":":"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "definition", "symbols": ["optionalWhiteSpace", "definitionLeftSide", "optionalWhiteSpace", "definition$string$1", "optionalWhiteSpace", "expr", "optionalWhiteSpace", {"literal":";","pos":34}, "optionalWhiteSpace"]},
    {"name": "definition$string$2", "symbols": [{"literal":":"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "definition", "symbols": ["optionalWhiteSpace", "definitionLeftSide", "optionalWhiteSpace", "definition$string$2", "optionalWhiteSpace", {"literal":"{","pos":50}, "optionalWhiteSpace", "expr", "optionalWhiteSpace", {"literal":"}","pos":58}, "optionalWhiteSpace", {"literal":";","pos":62}, "optionalWhiteSpace"]},
    {"name": "definition$string$3", "symbols": [{"literal":":"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "definition", "symbols": ["optionalWhiteSpace", "var", "optionalWhiteSpace", "definition$string$3", "optionalWhiteSpace", {"literal":"(","pos":78}, "optionalWhiteSpace", "term", "optionalWhiteSpace", {"literal":")","pos":86}, "optionalWhiteSpace", {"literal":"{","pos":90}, "optionalWhiteSpace", "expr", "optionalWhiteSpace", {"literal":"}","pos":98}, "optionalWhiteSpace", {"literal":";","pos":102}, "optionalWhiteSpace"]},
    {"name": "definitionLeftSide", "symbols": ["var"]},
    {"name": "definitionLeftSide", "symbols": ["var", {"literal":"(","pos":116}, "term", {"literal":")","pos":120}]},
    {"name": "term", "symbols": ["var"]},
    {"name": "term", "symbols": ["number"]},
    {"name": "term", "symbols": ["optionalWhiteSpace", "term", "optionalWhiteSpace", "op", "optionalWhiteSpace", "term", "optionalWhiteSpace"]},
    {"name": "term", "symbols": [{"literal":"(","pos":150}, "term", {"literal":")","pos":154}]},
    {"name": "term", "symbols": ["string"]},
    {"name": "term", "symbols": ["definition"]},
    {"name": "term", "symbols": ["term", {"literal":";","pos":168}, "term"]},
    {"name": "op", "symbols": [{"literal":"+","pos":176}]},
    {"name": "op", "symbols": [{"literal":"-","pos":180}]},
    {"name": "op", "symbols": [{"literal":"*","pos":184}]},
    {"name": "op", "symbols": [{"literal":"/","pos":188}]},
    {"name": "op", "symbols": [{"literal":"^","pos":192}]},
    {"name": "op", "symbols": [{"literal":"%","pos":196}]},
    {"name": "var", "symbols": ["string"]},
    {"name": "var", "symbols": ["string", "number"]},
    {"name": "var", "symbols": ["string", "symbol"]},
    {"name": "var", "symbols": ["string", "var"]},
    {"name": "stringLiteral", "symbols": [{"literal":"'","pos":225}, "string", {"literal":"'","pos":229}]},
    {"name": "optionalWhiteSpace", "symbols": []},
    {"name": "optionalWhiteSpace", "symbols": ["whiteSpace", "optionalWhiteSpace"]},
    {"name": "whiteSpace", "symbols": [{"literal":" ","pos":247}]},
    {"name": "whiteSpace", "symbols": [{"literal":"\t","pos":251}]},
    {"name": "whiteSpace", "symbols": [{"literal":"\n","pos":255}]},
    {"name": "string", "symbols": ["ascii"]},
    {"name": "string", "symbols": ["ascii", "string"]},
    {"name": "ascii", "symbols": ["symbol"]},
    {"name": "ascii", "symbols": ["lowerCaseChar"]},
    {"name": "ascii", "symbols": ["upperCaseChar"]},
    {"name": "symbol", "symbols": [{"literal":"!","pos":287}]},
    {"name": "symbol", "symbols": [{"literal":"@","pos":291}]},
    {"name": "symbol", "symbols": [{"literal":"#","pos":295}]},
    {"name": "symbol", "symbols": [{"literal":"$","pos":299}]},
    {"name": "symbol", "symbols": [{"literal":"%","pos":303}]},
    {"name": "symbol", "symbols": [{"literal":"^","pos":307}]},
    {"name": "symbol", "symbols": [{"literal":"&","pos":311}]},
    {"name": "symbol", "symbols": [{"literal":"?","pos":315}]},
    {"name": "symbol", "symbols": [{"literal":">","pos":319}]},
    {"name": "symbol", "symbols": [{"literal":"<","pos":323}]},
    {"name": "symbol", "symbols": [{"literal":"_","pos":327}]},
    {"name": "lowerCaseChar", "symbols": [{"literal":"a","pos":333}]},
    {"name": "lowerCaseChar", "symbols": [{"literal":"b","pos":337}]},
    {"name": "lowerCaseChar", "symbols": [{"literal":"c","pos":341}]},
    {"name": "lowerCaseChar", "symbols": [{"literal":"d","pos":345}]},
    {"name": "lowerCaseChar", "symbols": [{"literal":"e","pos":348}]},
    {"name": "lowerCaseChar", "symbols": [{"literal":"f","pos":352}]},
    {"name": "lowerCaseChar", "symbols": [{"literal":"g","pos":356}]},
    {"name": "lowerCaseChar", "symbols": [{"literal":"h","pos":360}]},
    {"name": "lowerCaseChar", "symbols": [{"literal":"i","pos":364}]},
    {"name": "lowerCaseChar", "symbols": [{"literal":"j","pos":368}]},
    {"name": "lowerCaseChar", "symbols": [{"literal":"k","pos":372}]},
    {"name": "lowerCaseChar", "symbols": [{"literal":"l","pos":376}]},
    {"name": "lowerCaseChar", "symbols": [{"literal":"m","pos":380}]},
    {"name": "lowerCaseChar", "symbols": [{"literal":"n","pos":384}]},
    {"name": "lowerCaseChar", "symbols": [{"literal":"o","pos":388}]},
    {"name": "lowerCaseChar", "symbols": [{"literal":"p","pos":392}]},
    {"name": "lowerCaseChar", "symbols": [{"literal":"q","pos":396}]},
    {"name": "lowerCaseChar", "symbols": [{"literal":"r","pos":400}]},
    {"name": "lowerCaseChar", "symbols": [{"literal":"s","pos":404}]},
    {"name": "lowerCaseChar", "symbols": [{"literal":"t","pos":408}]},
    {"name": "lowerCaseChar", "symbols": [{"literal":"u","pos":412}]},
    {"name": "lowerCaseChar", "symbols": [{"literal":"v","pos":416}]},
    {"name": "lowerCaseChar", "symbols": [{"literal":"w","pos":420}]},
    {"name": "lowerCaseChar", "symbols": [{"literal":"x","pos":424}]},
    {"name": "lowerCaseChar", "symbols": [{"literal":"y","pos":428}]},
    {"name": "lowerCaseChar", "symbols": [{"literal":"z","pos":432}]},
    {"name": "upperCaseChar", "symbols": [{"literal":"A","pos":438}]},
    {"name": "upperCaseChar", "symbols": [{"literal":"B","pos":442}]},
    {"name": "upperCaseChar", "symbols": [{"literal":"C","pos":446}]},
    {"name": "upperCaseChar", "symbols": [{"literal":"D","pos":450}]},
    {"name": "upperCaseChar", "symbols": [{"literal":"E","pos":453}]},
    {"name": "upperCaseChar", "symbols": [{"literal":"F","pos":457}]},
    {"name": "upperCaseChar", "symbols": [{"literal":"G","pos":461}]},
    {"name": "upperCaseChar", "symbols": [{"literal":"H","pos":465}]},
    {"name": "upperCaseChar", "symbols": [{"literal":"I","pos":469}]},
    {"name": "upperCaseChar", "symbols": [{"literal":"J","pos":473}]},
    {"name": "upperCaseChar", "symbols": [{"literal":"K","pos":477}]},
    {"name": "upperCaseChar", "symbols": [{"literal":"L","pos":481}]},
    {"name": "upperCaseChar", "symbols": [{"literal":"M","pos":485}]},
    {"name": "upperCaseChar", "symbols": [{"literal":"N","pos":489}]},
    {"name": "upperCaseChar", "symbols": [{"literal":"O","pos":493}]},
    {"name": "upperCaseChar", "symbols": [{"literal":"P","pos":497}]},
    {"name": "upperCaseChar", "symbols": [{"literal":"Q","pos":501}]},
    {"name": "upperCaseChar", "symbols": [{"literal":"R","pos":505}]},
    {"name": "upperCaseChar", "symbols": [{"literal":"S","pos":509}]},
    {"name": "upperCaseChar", "symbols": [{"literal":"T","pos":513}]},
    {"name": "upperCaseChar", "symbols": [{"literal":"U","pos":517}]},
    {"name": "upperCaseChar", "symbols": [{"literal":"V","pos":521}]},
    {"name": "upperCaseChar", "symbols": [{"literal":"W","pos":525}]},
    {"name": "upperCaseChar", "symbols": [{"literal":"X","pos":529}]},
    {"name": "upperCaseChar", "symbols": [{"literal":"Y","pos":533}]},
    {"name": "upperCaseChar", "symbols": [{"literal":"Z","pos":537}]},
    {"name": "number", "symbols": ["int"]},
    {"name": "number", "symbols": ["int", {"literal":".","pos":549}, "int"]},
    {"name": "number", "symbols": [{"literal":".","pos":555}, "int"]},
    {"name": "number", "symbols": [{"literal":"-","pos":561}, "number"]},
    {"name": "int", "symbols": ["digit"]},
    {"name": "int", "symbols": ["digit", "int"]},
    {"name": "digit", "symbols": [{"literal":"0","pos":581}]},
    {"name": "digit", "symbols": [{"literal":"1","pos":585}]},
    {"name": "digit", "symbols": [{"literal":"2","pos":589}]},
    {"name": "digit", "symbols": [{"literal":"3","pos":593}]},
    {"name": "digit", "symbols": [{"literal":"4","pos":597}]},
    {"name": "digit", "symbols": [{"literal":"5","pos":601}]},
    {"name": "digit", "symbols": [{"literal":"6","pos":605}]},
    {"name": "digit", "symbols": [{"literal":"7","pos":609}]},
    {"name": "digit", "symbols": [{"literal":"8","pos":613}]},
    {"name": "digit", "symbols": [{"literal":"9","pos":617}]}
]
  , ParserStart: "expr"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
