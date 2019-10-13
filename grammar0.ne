expr -> definition | term | expr expr
expr -> definition | term | expr expr
definition ->  optionalWhiteSpace definitionLeftSide optionalWhiteSpace ":=" optionalWhiteSpace term optionalWhiteSpace ";" optionalWhiteSpace | optionalWhiteSpace definitionLeftSide optionalWhiteSpace ":=" optionalWhiteSpace "{" optionalWhiteSpace term optionalWhiteSpace "}" optionalWhiteSpace ";" optionalWhiteSpace | optionalWhiteSpace var optionalWhiteSpace ":=" optionalWhiteSpace "(" optionalWhiteSpace term optionalWhiteSpace ")" optionalWhiteSpace "{" optionalWhiteSpace term optionalWhiteSpace "}" optionalWhiteSpace ";" optionalWhiteSpace
definitionLeftSide -> var | var "(" term ")"
term -> var | number | term op term | "(" term ")" | string | definition | term ";" term
op -> "+" | "-" | "*" | "/" | "^" | "%"
var -> string | string number | string symbol |string var
stringLiteral -> "'" string "'"
optionalWhiteSpace -> null | whiteSpace optionalWhiteSpace
whiteSpace -> " "
string -> ascii | ascii string
ascii -> symbol | lowerCaseChar | upperCaseChar
symbol -> "!" | "@" | "#" | "$" | "%" | "^" | "&" | "?" | ">" | "<" | "_"
lowerCaseChar -> "a" | "b" | "c" | "d" |"e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z"
upperCaseChar -> "A" | "B" | "C" | "D" |"E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z"
number -> int | int "." int | "." int
int -> digit | digit int
digit -> "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
