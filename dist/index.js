"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* horrible.ts - a TS compiler that does horrible things.
 * Thomas NJ Shadwell
 * Licensed under the MIT license.
 * Usage: Obfuscator.compile(<string>, <string>)
 * Argument 1: The code to compile.
 * Argument 2: A (preferably very short) variable name you don't use.
 * Obfuscator.horrorFactor - Horrible factor:
 *  Factor 1: As normal
 *  Factor 2: Encode numbers as mess
 *  Factor 3: Encode numbers and charcodes
 * Obfuscator.construcTo:
 * Method to execute code from string.
 */
var Obfuscator = /** @class */ (function () {
    function Obfuscator() {
    }
    /**
     * Mess a number.
     * @param {number} num - The number to mess.
     * @returns {string}
     */
    Obfuscator.messNumber = function (num) {
        if (num === 0)
            return '(+[])';
        else if (num === 1)
            return '(+!+[])';
        else {
            var str = '';
            for (var d = 0; d < num; d++) {
                str += '!+[]+';
            }
            return '+' + str.slice(0, -1);
        }
    };
    /**
     * Get the character code of an array string.
     * @param {string} text - The text to reformate.
     * @returns {string}
     */
    Obfuscator.stringToCharCodeArrayString = function (text) {
        var cc = [];
        for (var i = 0; i < text.length; ++i) {
            cc[i] = text.charCodeAt(i);
        }
        if (Obfuscator.horrorFactor === 3) {
            cc = cc.map(Obfuscator.messNumber);
        }
        return cc.join(',');
    };
    /**
     * Compiles the given JS code as string.
     * @param {string} code - The JS code to be compiled.
     * @param {string} shortVar - The short letiable to use in the obfuscation.
     * @returns {string}
     */
    Obfuscator.compileToString = function (code, shortVar) {
        if (shortVar === void 0) { shortVar = '$'; }
        var out = '', extras = '';
        var c = ' ' + code;
        for (var i = 0, chr = ''; i < c.length; i++, chr = c[i]) {
            if (i != 0) {
                if (chr in Obfuscator.dict) {
                    out += Obfuscator.dict[chr] + '+';
                }
                else {
                    if (extras.indexOf(chr) == -1) {
                        extras += chr;
                    }
                    if (Obfuscator.horrorFactor == 1) {
                        out += shortVar + '[' + extras.indexOf(chr) + ']+';
                    }
                    else {
                        out += shortVar + '[' + Obfuscator.messNumber(extras.indexOf(chr)) + ']+';
                    }
                }
            }
        }
        return "".concat(shortVar, "=String.fromCharCode(").concat(Obfuscator.stringToCharCodeArrayString(extras), ");").concat(out.slice(0, -1));
    };
    /**
     * Compiles and obfuscates JS code.
     * @param {string} code - The JS code to be obfuscated.
     * @param {string} shortVar - The short letiable to use at compilation.
     * @returns {string}
     */
    Obfuscator.compile = function (code, shortVar) {
        if (shortVar === void 0) { shortVar = '$'; }
        var m = Obfuscator.compileToString(code, shortVar).split(';');
        return "".concat(m[0], ";").concat(Obfuscator.construcTo, "(").concat(m[1], ")();");
    };
    /**
     * The obfuscator horror factor.
     */
    Obfuscator.horrorFactor = 1;
    /**
     * The available constructors based on the horror factor.
     */
    Obfuscator.constructors = [
        '_=\"constructor\"_[_][_]',
        '_=([![]]+{})[+!+[]+[+[]]]+([]+[]+{})[+!+[]]+([]+[]+[][[]])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+(!![]+[])[!+[]+!+[]]+([![]]+{})[+!+[]+[+[]]]+(!![]+[])[+[]]+([]+[]+{})[+!+[]]+(!![]+[])[+!+[]];_[_][_]',
        '(![]+[])[+[]][([![]]+{})[+!+[]+[+[]]]+([]+[]+{})[+!+[]]+([]+[]+[][[]])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+(!![]+[])[!+[]+!+[]]+([![]]+{})[+!+[]+[+[]]]+(!![]+[])[+[]]+([]+[]+{})[+!+[]]+(!![]+[])[+!+[]]][([![]]+{})[+!+[]+[+[]]]+([]+[]+{})[+!+[]]+([]+[]+[][[]])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+(!![]+[])[!+[]+!+[]]+([![]]+{})[+!+[]+[+[]]]+(!![]+[])[+[]]+([]+[]+{})[+!+[]]+(!![]+[])[+!+[]]]',
    ];
    /**
     * The current constructor.
     */
    Obfuscator.construcTo = ';_=\"constructor\";_[_][_]';
    /**
     * The transformations between characters.
     */
    Obfuscator.dict = {
        'a': '(![]+[])[+!+[]]',
        'b': '([]+[]+{})[!+[]+!+[]]',
        'c': '([![]]+{})[+!+[]+[+[]]]',
        'd': '([]+[]+[][[]])[!+[]+!+[]]',
        'e': '(!![]+[])[!+[]+!+[]+!+[]]',
        'f': '(![]+[])[+[]]',
        'i': '([![]]+[][[]])[+!+[]+[+[]]]',
        'j': '([]+[]+{})[+!+[]+[+[]]]',
        'l': '(![]+[])[!+[]+!+[]]',
        'N': '(+{}+[]+[])[+[]]',
        'n': '([]+[]+[][[]])[+!+[]]',
        'O': '(![]+[]+[]+[]+{})[+!+[]+[]+[]+(!+[]+!+[]+!+[])]',
        'o': '([]+[]+{})[+!+[]]',
        'r': '(!![]+[])[+!+[]]',
        's': '(![]+[])[!+[]+!+[]+!+[]]',
        't': '(!![]+[])[+[]]',
        'u': '(!![]+[])[!+[]+!+[]]',
        ' ': '(+{}+[]+[]+[]+[]+{})[+!+[]+[+[]]]',
        '[': '([]+[]+{})[+[]]',
        ']': '([]+[]+{})[+!+[]+[]+[]+(!+[]+!+[]+!+[]+!+[])]'
    };
    return Obfuscator;
}());
exports.default = Obfuscator;
