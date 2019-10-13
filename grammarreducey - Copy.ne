
sum -> factor | sum "+" sum | sum "-" sum {%
    function(data) {
		for(var i=0;i<data.length;i++){
			data[i]=unwrap(data[i]);
		}

		return {
				func:data[1],
				args:[data[0],data[2]]
			    };
		function unwrap(arr){
			while(arr.constructor===Array&arr.length==1){
				arr=arr[0];
			}
			return arr;
		}
	}
%}

factor -> int | factor "*" factor | factor "/" factor
{%
    function(data) {
		for(var i=0;i<data.length;i++){
			data[i]=unwrap(data[i]);
		}

		return {
				func:data[1],
				args:[data[0],data[2]]
			    };
		function unwrap(arr){
			while(arr.constructor===Array&arr.length==1){
				arr=arr[0];
			}
			return arr;
		}
	}
%}
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
