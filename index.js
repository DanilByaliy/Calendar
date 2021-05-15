'use strict'

let year = '2021';
let numberMons = '05';
let numberDay = '15'
let mons = [1, 4, 4, 0, 2, 5, 0, 3, 6, 1, 4, 6];
let days = ["субота", "неділя", "понеділок", "вівторок", "середа", "четвер", "п'ятниця"];

function getCodeMons(value) {
    let code = mons[Number(value) - 1];
    return code;
}

function getCodeYear(value) {
    let index = (3 - (value.slice(0, 2) % 4)) * 2;
    let twoNum = (Number(value.slice(2)));
    let code = ((index + twoNum + Math.floor(twoNum/4)) % 7);
    return code;
}

let codeMons = getCodeMons(numberMons);
let CodeYear = getCodeYear(year);
let correction = correctionLeapYear(year);

function checkLeapYear(value) {
    if ((value % 4 === 0 && value % 100 !== 0) || (value % 4 === 0 && value % 400 === 0)) {
        return true;
    } 
    return false;
}

function correctionLeapYear(year) {
    let correction = 0;
    if (checkLeapYear(year) && Number(numberMons) < 3) {
        correction = -1;
    }
    return correction;
}

function chekGlobal() {
    let month = Number(numberMons);
    if (month < 8){
        if (month !== 2) {
            if (numberDay > 30 + (month % 2)) {
                console.log('No date in the calendar');
                return false;
            }
        } else if (numberDay > checkLeapYear(year) ? 29 : 28) {
            console.log('No date in the calendar');
            return false;
        }
    } else if (numberDay > 31 - (month % 2)) {
        console.log('No date in the calendar');
        return false;
    }
    return true;
};

function getDay(value) {
    if (chekGlobal()) {
        let day = (correction + Number(value) + codeMons + CodeYear) % 7;
        console.log(days[day]);
    }
}

getDay(numberDay);
