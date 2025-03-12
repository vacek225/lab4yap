const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function f1(x, callback) {
    setTimeout(() => {
        const result = x * x; // f1(x) = x^2
        callback(result);
    }, Math.floor(Math.random() * 1000));
}

function f2(x, callback) {
    setTimeout(() => {
        const result = 2 * x;
        callback(result);
    }, Math.floor(Math.random() * 1000));
}

function f3(x, callback) {
    setTimeout(() => {
        const result = -2;
        callback(result);
    }, Math.floor(Math.random() * 1000));
}

function f4(x, callback) {
    setTimeout(() => {
        const result = x + 1;
        callback(result);
    }, Math.floor(Math.random() * 1000));
}

function f5(x, callback) {
    setTimeout(() => {
        const result = x / 2;
        callback(result);
    }, Math.floor(Math.random() * 1000));
}

function f6(x, callback) {
    setTimeout(() => {
        const result = x * 0;
        callback(result);
    }, Math.floor(Math.random() * 1000));
}

function calculateF(x, functions, finalCallback) {
    let intermediateResult = 0;
    let index = 0;

    function next() {
        if (index < functions.length) {
            const currentFunction = functions[index];
            currentFunction(x, (result) => {
                intermediateResult += result;
                console.log(`f${index + 1} даёт значение ${result}, промежуточный результат ${intermediateResult}`);
                index++;
                next();
            });
        } else {
            finalCallback(intermediateResult);
        }
    }

    next();
}

function main() {
    rl.question('Введите значение x: ', (x) => {
        rl.question('Введите количество функций n (от 1 до 6): ', (n) => {
            x = parseFloat(x);
            n = parseInt(n);

            if (n < 1 || n > 6) {
                console.log('Ошибка: n должно быть от 1 до 6.');
                rl.close();
                return;
            }

            const functions = [f1, f2, f3, f4, f5, f6].slice(0, n);

            calculateF(x, functions, (result) => {
                console.log(`Ответ для F(x): ${result}`);
                rl.close();
            });
        });
    });
}

main();