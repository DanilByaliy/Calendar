'use strict'

let number = '05';
let year = '2021';
let mons = [1, 4, 4, 0, 2, 5, 0, 3, 6, 1, 4, 6];
let days = ["субота", "неділя", "понеділок", "вівторок", "середа", "четвер", "п'ятниця"]

function getCodeMons(value) {
    let code = mons[Number(value) - 1];
    return code;
}

function getCodeYear(value) {
    let twoNum = (Number(value.slice(2)));
    let code = ((6 + twoNum + Math.floor(twoNum/4)) % 7);
    return code;
}

let codeMons = getCodeMons(number);
let CodeYear = getCodeYear(year);

function getDay(value) {
    let day = (value + codeMons + CodeYear) % 7;
    console.log(days[day]);
}

getDay(14);
