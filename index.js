const Obfuscator = require('./dist/index.js').default

const main = () => {
    // The raw sample code as string.
    const sampleCode = 'console.log(\'test\')';

    // Using horror factor = 1.
    const factorOne = Obfuscator.compile(sampleCode);
    console.log('FACTOR = 1: ', factorOne);

    // Using horror factor = 2.
    Obfuscator.horrorFactor = 2;
    const factorTwo = Obfuscator.compile(sampleCode);
    console.log('FACTOR = 2: ', factorTwo);

    // Using horror factor = 3.
    Obfuscator.horrorFactor = 3;
    const factorThree = Obfuscator.compile(sampleCode);
    console.log('FACTOR = 3: ', factorThree);

    // Function to eval the obfuscated codes.
    const runCodes = (codes) => {
        codes.forEach(c => eval(c))
    }

    // Running the compiled codes.
    runCodes([factorOne, factorTwo, factorThree]);
}

main();