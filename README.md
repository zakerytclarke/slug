# slug
Slug Programming Language (Work in Progress)

## Features
- Lazy Evaluation
- Pattern Matching
- Higher Order Functions
- C-like syntax

## Running Compiled Lambda Calculus
```
node lambda test.slc
```


## Completed
- Working Lambda Calculus Interpreter
- Integration with IO/JS Funcs

## To Do
- Finish grammar
- Compiler Optimizations
- Formalize Syntax
- Tutorial Wiki


## Syntax
Syntax is similar to C, but allows for higher order functionality

### Examples

```
factorial(1):=1;

factorial(n):={
  return n*factorial(n-1);
}
```
