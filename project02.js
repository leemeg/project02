/**
 *   @author Marshall, Lee (marshalll@student.ncmich.edu)
 *   @version 1.1.1
 *   @summary created: 09.24.2018
 *   @todo Nothing
 */

"use strict";
const PROMPT = require('readline-sync');

let rerun = 1; // presets rerun to allow first run
let custID, age, premium, numAtFault, todayDate, bDate, bMonth, bYear, birthDate, mSecAge, mSecDue, dueDate, dMonth, dDay, dYear;
let firstName, lastName;

function main() {
    if (rerun === 1){ // runs main functions if rerun equals 1
        setCustID();
        setFirstName();
        setLastName();
        setBirthDay();
        setNumAtFault();
        setPremium();
        printPremium();
        setRerun();
        return main(); // returns to start of main
    } else { // if rerun does not equal 1 ends prg
        printEnd();
    }
}

main();

function setBirthDay() { // creates age and due date
    const MIN_AGE = 16,
        MAX_AGE = 120,
        MILLI_YEAR = 31557600000, // 1000*60*60*24*365.25 = 1 Year in milliseconds
        FUT_DATE = (864000000); //1000*60*60*24*10 = 10 days in milliseconds
    console.log(`\nWhat is ` + firstName + `'s birth date? [mm/dd/yyyy]`);
    bMonth = Number(PROMPT.question(`Month of birth: `));
    bDate = Number(PROMPT.question(`Day of birth: `));
    bYear = Number(PROMPT.question(`Year of birth: `));
    birthDate = new Date(bYear,bMonth,bDate); // DOB in milliseconds
    todayDate = Number(new Date()); //Todays date in milliseconds
    mSecAge = todayDate-birthDate; // Age in milliseconds
    age = Math.floor(mSecAge/MILLI_YEAR); // converts millisecond age to years
    mSecDue = (todayDate+FUT_DATE); // Due date in milliseconds
    dueDate = new Date(mSecDue); // due date in string
    dMonth = dueDate.getMonth(); // extract month
    dDay = dueDate.getDate(); // extract day (1-31)
    dYear = dueDate.getFullYear(); //extract year
    if (age < MIN_AGE || age > MAX_AGE) {
        console.log(`\nI'm sorry but `+ age + ` is not an insurable age for this company. Please enter a correct Date of Birth.`);
        return setBirthDay();
    }

}

function setCustID() {
    custID = Math.floor((Math.random() * 999999) + 100000); // randomly creates six digit policy number
}

function setNumAtFault() {
    numAtFault = Number(PROMPT.question(`\nHow many at fault accidents has ` + firstName + ` ` + lastName + ` had in the past 3 Years: `));
}

function setFirstName() {
    firstName = PROMPT.question(`\nPlease enter first name: `);
}

function setLastName() {
    lastName = PROMPT.question(`\nPlease enter ` + firstName + `'s last name: `);
}

function setPremium() {
    const YOUNG_AGE = 20,
        MID_AGE = 10,
        SENIOR_AGE = 30,
        BASE = 100,
        PER_FAULT = 50;
    if (age < 30) {
         premium = BASE + YOUNG_AGE + (numAtFault * PER_FAULT);
    } else if (age < 45) {
        premium = BASE + MID_AGE + (numAtFault * PER_FAULT);
    } else if (age >= 60) {
        premium = BASE + SENIOR_AGE + (numAtFault * PER_FAULT);
    } else {
        premium = BASE + (numAtFault * PER_FAULT);
    }
}

function printPremium() {
    process.stdout.write('\x1Bc'); // clears screen
    console.log(`\nThe insurance premium for ` + firstName + ` ` + lastName + ` who is ` + age + `, and has had ` + numAtFault + ` at fault accident(s) in the past three years, will be $` + premium + `.`);
    console.log(`Your policy number is `+ custID + ` and your first premium will be do in ten days on ` + dMonth + `/` + dDay + `/` + dYear + `.`);
}

function setRerun() {
    rerun = 0; // defaults prg to end, could be anything but 1
    rerun = Number(PROMPT.question(`\nTo make another quote enter "1", any other value to quit:`)); //any value except 1 will end prg
}

function printEnd() {
    process.stdout.write('\x1Bc');
    console.log(`\nThank you, good bye.`)
}