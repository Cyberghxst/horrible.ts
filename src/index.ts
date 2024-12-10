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
export default class Obfuscator {
	/**
	 * Mess a number.
	 * @param {number} num - The number to mess.
	 * @returns {string}
	 */
	static messNumber(num: number) {
		if (num === 0) return '(+[])'
		else if (num === 1) return '(+!+[])'
		else {
			let str = ''
			for (let d = 0; d < num; d++) {
				str += '!+[]+'
			}
			return '+' + str.slice(0, -1)
		}
	}

	/**
	 * Get the character code of an array string.
	 * @param {string} text - The text to reformate.
	 * @returns {string}
	 */
	static stringToCharCodeArrayString(text: string) {
		let cc: (number | string)[] = []
		
		for (let i = 0; i < text.length; ++i) {
			cc[i] = text.charCodeAt(i)
		}
		
		if (Obfuscator.horrorFactor === 3) {
			cc = cc.map(Obfuscator.messNumber as any)
		}
		
		return cc.join(',')
	}

	/**
	 * The obfuscator horror factor.
	 */
	static horrorFactor = 1

	/**
	 * The available constructors based on the horror factor.
	 */
	static constructors = [
		'_=\"constructor\"_[_][_]',
		'_=([![]]+{})[+!+[]+[+[]]]+([]+[]+{})[+!+[]]+([]+[]+[][[]])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+(!![]+[])[!+[]+!+[]]+([![]]+{})[+!+[]+[+[]]]+(!![]+[])[+[]]+([]+[]+{})[+!+[]]+(!![]+[])[+!+[]];_[_][_]',
		'(![]+[])[+[]][([![]]+{})[+!+[]+[+[]]]+([]+[]+{})[+!+[]]+([]+[]+[][[]])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+(!![]+[])[!+[]+!+[]]+([![]]+{})[+!+[]+[+[]]]+(!![]+[])[+[]]+([]+[]+{})[+!+[]]+(!![]+[])[+!+[]]][([![]]+{})[+!+[]+[+[]]]+([]+[]+{})[+!+[]]+([]+[]+[][[]])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+(!![]+[])[!+[]+!+[]]+([![]]+{})[+!+[]+[+[]]]+(!![]+[])[+[]]+([]+[]+{})[+!+[]]+(!![]+[])[+!+[]]]',
	]

	/**
	 * The current constructor.
	 */
	static construcTo = ';_=\"constructor\";_[_][_]'

	/**
	 * The transformations between characters.
	 */
	static dict = {
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
	}

	/**
	 * Compiles the given JS code as string.
	 * @param {string} code - The JS code to be compiled.
	 * @param {string} shortVar - The short letiable to use in the obfuscation.
	 * @returns {string}
	 */
	static compileToString(code: string, shortVar = '$') {
		let out = '', extras = ''
		let c = ' ' + code

		for (let i = 0, chr = ''; i < c.length; i++, chr = c[i]) {
			if (i != 0) {
				if (chr in Obfuscator.dict) {
					out += Obfuscator.dict[chr as keyof typeof Obfuscator['dict']] + '+'
				} else {
					if (extras.indexOf(chr) == -1) {
						extras += chr
					}
					
					if (Obfuscator.horrorFactor == 1) {
						out += shortVar + '[' + extras.indexOf(chr) + ']+'
					} else {
						out += shortVar + '[' + Obfuscator.messNumber(extras.indexOf(chr)) + ']+'
					}
				}
			}
		}
		
		return `${shortVar}=String.fromCharCode(${Obfuscator.stringToCharCodeArrayString(extras)});${out.slice(0, -1)}`
	}

	/**
	 * Compiles and obfuscates JS code.
	 * @param {string} code - The JS code to be obfuscated.
	 * @param {string} shortVar - The short letiable to use at compilation.
	 * @returns {string}
	 */
	static compile(code: string, shortVar = '$') {
		const m = Obfuscator.compileToString(code, shortVar).split(';')
		return `${m[0]};${Obfuscator.construcTo}(${m[1]})();`
	}
}