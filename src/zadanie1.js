const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function ask_password(login, password, success, failure) {
    login = login.toLowerCase();
    password = password.toLowerCase();

    const vowels = ['a', 'e', 'i', 'o', 'u', 'y'];

    function countVowels(str) {
        let count = 0;
        for (let char of str) {
            if (vowels.includes(char)) {
                count++;
            }
        }
        return count;
    }

    function getConsonants(str) {
        let consonants = '';
        for (let char of str) {
            if (!vowels.includes(char)) {
                consonants += char;
            }
        }
        return consonants;
    }

    const passwordVowelCount = countVowels(password);
    if (passwordVowelCount !== 3) {
        failure(login, 'Wrong number of vowels');
        return;
    }

    const loginConsonants = getConsonants(login);
    const passwordConsonants = getConsonants(password);

    if (loginConsonants !== passwordConsonants) {
        failure(login, 'Wrong consonants');
        return;
    }

    success(login);
}

function main() {
    rl.question('Введите логин: ', (login) => {
        rl.question('Введите пароль: ', (password) => {
            function success(login) {
                console.log(`Привет, ${login}!`);
                rl.close(); // Закрываем интерфейс readline
            }

            function failure(login, errorMessage) {
                console.log(
                    `Кто-то пытался притвориться пользователем ${login}, но в пароле допустил ошибку: ${errorMessage.toUpperCase()}.`
                );
                rl.close(); // Закрываем интерфейс readline
            }

            ask_password(login, password, success, failure);
        });
    });
}

main();