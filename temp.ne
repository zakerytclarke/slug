number -> int | int "." int | "." int | "-" number
{%
    function(data) {
		return data.join("");
    }
%}
int -> digit | digit int
{%
    function(data) {
		return data.join("");
    }
%}

digit -> "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
{%
    function(data) {
		return data.join("");
    }
%}
