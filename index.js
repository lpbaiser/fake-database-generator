const faker = require('faker');
const uuid = require('uuid/v4');
const readlineSync = require('readline-sync');
const {
    openSync,
    appendFileSync,
} = require('fs');

let nameFile = readlineSync.question('Input name to file? ');
let iterations = readlineSync.questionInt('How many data lines do you want? ');

const options = ['name', 'email', 'phone',];
const optionsSelected = [];
let index = -2;

while (index != -1) {
    const op = readlineSync.keyInSelect(options, 'Choose one?');
    op != -1 ? optionsSelected.push(options[op]) : null;
    index = op;
}

console.log('> chosen options:', optionsSelected);
let fileStream;
try {
    fileStream = openSync(`${nameFile}.csv`, 'w');
} catch (ex) {
    console.error('error on create file :( \n', ex);
}

try {
    appendFileSync(fileStream, `id,${optionsSelected.toString()}\n`, 'utf8')

    console.log('> starting data generator...');
    for (i = 0; i < iterations; i++) {
        const randomUuid = uuid();
        const randomName = optionsSelected.includes('name') ? faker.name.findName() : null;
        const randomEmail = optionsSelected.includes('email') ? faker.internet.email() : null;
        const randomPhone = optionsSelected.includes('phone') ? faker.phone.phoneNumber() : null;
        let dataLine = `${randomUuid}`;
        if (randomName) {
            dataLine += `,${randomName}`;
        }
        if (randomEmail) {
            dataLine += `,${randomEmail}`;
        }
        if (randomPhone) {
            dataLine += `,${randomPhone}`;
        }
        appendFileSync(fileStream, `${dataLine}\n`, 'utf8')
    }
    console.log('> finished data generator');
} catch (ex) {
    console.error('error on generate data :( \n', ex);
}
