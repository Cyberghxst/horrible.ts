export default class Obfuscator {
    /**
     * Mess a number.
     * @param {number} num - The number to mess.
     * @returns {string}
     */
    static messNumber(num: number): string;
    /**
     * Get the character code of an array string.
     * @param {string} text - The text to reformate.
     * @returns {string}
     */
    static stringToCharCodeArrayString(text: string): string;
    /**
     * The obfuscator horror factor.
     */
    static horrorFactor: number;
    /**
     * The available constructors based on the horror factor.
     */
    static constructors: string[];
    /**
     * The current constructor.
     */
    static construcTo: string;
    /**
     * The transformations between characters.
     */
    static dict: {
        a: string;
        b: string;
        c: string;
        d: string;
        e: string;
        f: string;
        i: string;
        j: string;
        l: string;
        N: string;
        n: string;
        O: string;
        o: string;
        r: string;
        s: string;
        t: string;
        u: string;
        ' ': string;
        '[': string;
        ']': string;
    };
    /**
     * Compiles the given JS code as string.
     * @param {string} code - The JS code to be compiled.
     * @param {string} shortVar - The short letiable to use in the obfuscation.
     * @returns {string}
     */
    static compileToString(code: string, shortVar?: string): string;
    /**
     * Compiles and obfuscates JS code.
     * @param {string} code - The JS code to be obfuscated.
     * @param {string} shortVar - The short letiable to use at compilation.
     * @returns {string}
     */
    static compile(code: string, shortVar?: string): string;
}
