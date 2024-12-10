# horrible.ts
This is an obfuscator more than a compiler as the resulting code will always come out larger. It uses some of JavaScript's quirks to produce completely, utterly unreadable code.
> [Click here to visit the original source by Thomas NJ Shadwell](https://github.com/TShadwell/Horrible.js)

## Installing
Use your preferred package manager and install it from github.
```bash
npm i github:Cyberghxst/horrible.ts
```

## Usage
Package globals everything in one class called `Obfuscator`.
- `Obfuscator.compileToString`: which, as it says compiles code into a string that when evaluated will yeild the original code as a string. Good for obfuscating strings.
- `Obfuscator.compile`: which will compile the code and package in a particularly horrible form of exec to execute the code.
> In addition, the code object can be used to compile the code from the textarea via code.compileToString() and code.compile().

There is a 'Horror factor', which determines how much to mess up the resulting code. The factor can be changed with `Obfuscator.horrorFactor`.
- Factor 1: As normal.
- Factor 2: Indexes encoded with quirks.
- Factor 3: Indexes and char-codes encoded with quirks.

To execute the code, Horrible.js uses `_="constructor";_[_][_](CODE)`. This works because the constructor of string is `String` and the constructor of string is Function, so it effectively runs `(new Function (CODE))();`.

## Examples
### Factor 1
The input:
```js
Obfuscator.compile("console.log('test')","$")
```
will result in:
```js
"$=String.fromCharCode(46,103,40,39,41);_="constructor";_[_][_](([![]]+{})[+!+[]+[+[]]]+([]+[]+{})[+!+[]]+([]+[]+[][[]])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+([]+[]+{})[+!+[]]+(![]+[])[!+[]+!+[]]+(!![]+[])[!+[]+!+[]+!+[]]+$[0]+(![]+[])[!+[]+!+[]]+([]+[]+{})[+!+[]]+$[1]+$[2]+$[3]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+$[3]+$[4])();"
```