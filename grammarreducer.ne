expr -> definition | term | expr expr
definition ->  optionalWhiteSpace definitionLeftSide optionalWhiteSpace ":=" optionalWhiteSpace expr optionalWhiteSpace ";" optionalWhiteSpace | optionalWhiteSpace definitionLeftSide optionalWhiteSpace ":=" optionalWhiteSpace "{" optionalWhiteSpace expr optionalWhiteSpace "}" optionalWhiteSpace ";" optionalWhiteSpace | optionalWhiteSpace var optionalWhiteSpace ":=" optionalWhiteSpace "(" optionalWhiteSpace term optionalWhiteSpace ")" optionalWhiteSpace "{" optionalWhiteSpace expr optionalWhiteSpace "}" optionalWhiteSpace ";" optionalWhiteSpace
definitionLeftSide -> var | var "(" term ")"
term -> var | number | optionalWhiteSpace term optionalWhiteSpace op optionalWhiteSpace term optionalWhiteSpace | "(" term ")" | string | definition | term ";" term | function
function -> var "(" args ")" | var "(" term "," term ")"
args -> term | term "," args
op -> "+" | "-" | "*" | "/" | "^" | "%"
var -> string | string number | string symbol | string var
stringLiteral -> "'" string "'"
optionalWhiteSpace -> null | whiteSpace optionalWhiteSpace
whiteSpace -> " " | "\t" | "\n"
string -> ascii | ascii string {%
    function(data) {
        return data.join("");
    }
%}
ascii -> symbol | lowerCaseChar | upperCaseChar
symbol -> "!" | "@" | "#" | "$" | "%" | "^" | "&" | "?" | ">" | "<" | "_"
lowerCaseChar -> "a" | "b" | "c" | "d" |"e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z"
upperCaseChar -> "A" | "B" | "C" | "D" |"E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z"
number -> int | int "." int | "." int | "-" number 
int -> digit | digit int
digit -> "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
