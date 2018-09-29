/**
 *   @author Marshall, Lee (marshalll@student.ncmich.edu)
 *   @version 0.0.1
 *   @summary Code demonstration: Selection logic  :: created: 09.24.2018
 *   @todo Nothing
 */

"use strict";
const PROMPT = require('readline-sync');


let custID, age, premium, numAtFault, rerun = 1, todayDate, bDate, bMonth, bYear, birthDate, mSecAge;
let firstName, lastName;

/**
 * @method
 * @desc The dispatch method for our program
 * @returns {null}
 */
function main() {
    if (rerun === 1){
        setCustID();
        setFirstName();
        setLastName();
        setBirthDay();
        setNumAtFault();
        setPremium();
        printPremium();
        setRerun();
        return main();
    } else {
        printEnd();
    }
}

main();

function setBirthDay() {
    const MIN_AGE = 16,
        MAX_AGE = 120;
    console.log(`\nWhat is ` + firstName + `'s birth date? [mm/dd/yyyy]`);
    bMonth = Number(PROMPT.question(`Month of birth: `));
    bDate = Number(PROMPT.question(`Day of birth: `));
    bYear = Number(PROMPT.question(`Year of birth: `));

    birthDate = new Date(bYear,bMonth,bDate);
    todayDate = new Date();
    mSecAge = todayDate-birthDate; // This is the difference in milliseconds
    age = Math.floor(mSecAge/31557600000); // Divide by 1000*60*60*24*365.25

    if (age < MIN_AGE || age > MAX_AGE) {
        console.log(`\nI'm sorry but `+ age + ` is not an insurable age for this company. Please enter a correct Date of Birth.`);
        return setBirthDay();
    }

}

/**
 * @method
 * @desc custID mutator
 * @returns {null}
 */
function setCustID() {
    custID = Math.floor((Math.random() * 99999) + 1);
}

/**
 * @method
 * @desc  mutator
 * @returns {null}
 */
function setNumAtFault() {
    numAtFault = Number(PROMPT.question(`\nHow many at fault accidents has ` + firstName + ` ` + lastName + ` had in the past 3 Years: `));
}

/**
 * @method
 * @desc  mutator
 * @returns {null}
 */
function setFirstName() {
    firstName = PROMPT.question(`\nPlease enter first name: `);
}

/**
 * @method
 * @desc  mutator
 * @returns {null}
 */
function setLastName() {
    lastName = PROMPT.question(`\nPlease enter ` + firstName + `'s last name: `);
}



/**
 * @method
 * @desc totalBill mutator
 * @returns {null}
 */

function setPremium() {
    premium = 0;
    const YOUNG_AGE = 20,
        MID_AGE = 10,
        SENIOR_AGE = 30,
        BASE = 100,
        PER_FAULT = 50;
    if (age > 15) {
         if (age < 30) {
            premium = BASE + YOUNG_AGE + (numAtFault * PER_FAULT);
        } else if (age < 45) {
            premium = BASE + MID_AGE + (numAtFault * PER_FAULT);
        } else if (age > 60) {
            premium = BASE + SENIOR_AGE + (numAtFault * PER_FAULT);
        } else {
             premium = BASE + (numAtFault * PER_FAULT);
         }


    }

}

function printPremium() {
    process.stdout.write('\x1Bc');
    console.log(`\nThe premium cost for ` + firstName + ` ` + lastName + ` who is ` + age + `, and has had ` + numAtFault + ` at fault accident(s) in the past three years, will be $` + premium + `.` + `\nYour policy number is `+ custID + ` and your first premium will be do on "ADD DATE HERE".`);
}

function setRerun() {
    rerun = 0;
    rerun = Number(PROMPT.question(`\nTo make another quote enter "1", any other value to quit:`));
}

function printEnd() {
    console.log(`\nThank you, good bye.`)
}