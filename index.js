'use strict'

let year = ''; //замінити лет на конст
let numberMons = '05';
let numberDay = '15';
let mons = [1, 4, 4, 0, 2, 5, 0, 3, 6, 1, 4, 6];
let days = ["субота", "неділя", "понеділок", "вівторок", "середа", "четвер", "п'ятниця"];

function getCodeMons(value) {
    let code = mons[Number(value) - 1];
    return code;
};

function getCodeYear(value) {
    let index = (3 - (value.slice(0, 2) % 4)) * 2;
    let twoNum = (Number(value.slice(2)));
    let code = ((index + twoNum + Math.floor(twoNum/4)) % 7);
    return code;
};

let codeMons = getCodeMons(numberMons);
let codeYear = getCodeYear(year);
let correction = correctionLeapYear(year);

function checkLeapYear(value) {
    if ((value % 4 === 0 && value % 100 !== 0) || (value % 4 === 0 && value % 400 === 0)) { //пернести ретурн, просто ретурн і вираз
        return true;
    } 
    return false;
};

function correctionLeapYear(year) {
    let correction = 0;
    if (checkLeapYear(year) && Number(numberMons) < 3) {
        correction = -1;
    };
    return correction;
};

function chekGlobal() {
    let daysInMonth = getDayOfMonth(numberMons);
    
    if (numberMons > 12) {
        console.log('No date in the calendar. Year have 12 months.');
        return false;
    };

    if (numberDay > daysInMonth) {
        console.log('No date in the calendar');
        return false;
    };
    return true;
    /*if (month < 8){
        if (month !== 2) {
            if (numberDay > 30 + (month % 2)) {
                console.log('No date in the calendar');// добавити кількість днів у місяці
                return false;
            }
        } else if (numberDay > (checkLeapYear(year) ? 29 : 28)) {
            console.log('No date in the calendar');
            return false;
        }
    } else if (numberDay > 31 - (month % 2)) {
        console.log('No date in the calendar');
        return false;
    }
    return true;*/
};

function getDay(value) {
    if (chekGlobal()) { //забрати звідси, бо зробив умову виконання всіх функцій
        let day = (correction + Number(value) + codeMons + codeYear) % 7;
        console.log(days[day]);
    };
};

function normalizationFormat(data){
    let formatter = new Intl.DateTimeFormat("uk", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      });

    return data = formatter.format(data)
                    .replace(',', '');
};

function getArrayDate() {
    let date = normalizationFormat(new Date());
    let array = date.slice(0, 10).split('.', 3);
    return array;
};

function getAge() {
    let array = getArrayDate();
    let age = array[2] - year - (array[1] >= numberMons ? 0 : 1);
    return age;
};

function getDayOfMonth(month) {
    let dayOfMonth;
    month = Number(month);
    if (month < 8){
        if (month !== 2) {
            dayOfMonth = 30 + (month % 2);             
        } else dayOfMonth = checkLeapYear(year) ? 29 : 28;
    } else dayOfMonth = 31 - (month % 2);
    return dayOfMonth;
};

function getCorrectionForFirstPartYear() {// від початку року до сьогодні + від дня народження до кінця попереднього року
    let array = getArrayDate();
    let correction = Number(array[0]) - Number(numberDay);

    let i = Number(array[1]) - 1;
    for (i; i > 0; i--) {
        //console.log('=' + correction);
        correction += getDayOfMonth(i);
    };

    let ii = Number(numberMons);
    for (ii; 12 >= ii; ii++) {
        //console.log('=' + correction);
        correction += getDayOfMonth(ii);
    };
    return correction;
};

function getCorrectionForLastPartYear() {// від дня народження до сьогоднішньої дати
    let array = getArrayDate();
    let correction = Number(array[0]) + getDayOfMonth(Number(numberMons)) - Number(numberDay);

    let i = Number(array[1]) - 1;
    let ii = Number(numberMons) + 1;
    for (i; i >= ii; i--) {
        //console.log('=' + correction);
        correction += getDayOfMonth(i);
    };
    return correction;
};

function getNumberOfDays() { //помилка при тому ж місяці
    let array = getArrayDate();
    let age = getAge();
    let correctioN = (numberMons > array[1] || (numberMons === array[1] && numberDay >= array[0])) ? getCorrectionForFirstPartYear() : getCorrectionForLastPartYear();

    correctioN += checkLeapYear(year) ? -1 : 0;

    for (let i = 0; i <= age; i++) {
        if (checkLeapYear(array[2])){
            correctioN++;
        };
        array[2]--;
    };

    //console.log(correctioN);

    let numberOfDays = age * 365 + correctioN;
    console.log('numberOfDays = ' + numberOfDays);
};

if (chekGlobal()) {
    getDay(numberDay);
    console.log('age = ' + getAge());
    getNumberOfDays();
};
