export interface Rule {
  id: number;
  text: string;
  met: boolean;
  revealed: boolean;
}

export const initialRules: Rule[] = [
  { id: 1, text: 'Your password must be at least 5 characters.', met: false, revealed: false },
  { id: 2, text: 'Your password must include a number.', met: false, revealed: false },
  { id: 3, text: 'Your password must include an uppercase letter.', met: false, revealed: false },
  { id: 4, text: 'Your password must include a special character.', met: false, revealed: false },
  { id: 5, text: 'Your password must include a Roman numeral.', met: false, revealed: false },
  { id: 6, text: 'The digits in your password must add up to 25.', met: false, revealed: false },
  { id: 7, text: 'Your password must include a month of the year.', met: false, revealed: false },
  { id: 8, text: 'Your password must include a Roman numeral.', met: false, revealed: false },
  { id: 9, text: 'Your password must include the word "griffith".', met: false, revealed: false },
  { id: 10, text: 'Your password must include a sequence of 3 repeated characters.', met: false, revealed: false },
  { id: 11, text: 'Your password must include the first three letters of any day of the week.', met: false, revealed: false },
  { id: 12, text: 'Your password must not include any space characters.', met: false, revealed: false },
  { id: 13, text: 'Your password must include two consecutive uppercase letters.', met: false, revealed: false },
  { id: 14, text: 'Your password must include two consecutive numbers.', met: false, revealed: false },
  { id: 15, text: 'Your password must contain more than 3 different special characters.', met: false, revealed: false },
  { id: 16, text: 'Your password must start with an uppercase letter.', met: false, revealed: false },
  { id: 17, text: 'Your password must contain a palindrome (no spaces).', met: false, revealed: false },
  { id: 18, text: 'Your password must contain at least 3 vowels (a, e, i, o, u).', met: false, revealed: false },
  { id: 19, text: 'Your password must not include any of the following letters: q, z, y.', met: false, revealed: false },
  { id: 20, text: 'Your password must contain at least one even number (0, 2, 4, 6, 8).', met: false, revealed: false },
  { id: 21, text: 'Your password must contain at least one prime number (2, 3, 5, 7).', met: false, revealed: false },
  { id: 22, text: 'Your password must end with a number.', met: false, revealed: false },
  { id: 23, text: 'Your password must include a punctuation mark.', met: false, revealed: false },
  { id: 24, text: 'Your password must include both parentheses.', met: false, revealed: false },
  { id: 25, text: 'Your password must include one character that appears exactly 3 times.', met: false, revealed: false },
  { id: 26, text: 'Your password must have exactly 6 vowels.', met: false, revealed: false },
  { id: 27, text: 'Your password must contain a number greater than 50.', met: false, revealed: false },
  { id: 28, text: 'Your password must contain no consecutive lowercase letters.', met: false, revealed: false },
  { id: 29, text: 'Your password must include a two-letter symbol from the periodic table.', met: false, revealed: false },
  { id: 30, text: 'Your password must include the abbreviation of any Australian state or territory', met: false, revealed: false },
  { id: 31, text: 'Your password must include a leap year.', met: false, revealed: false },
  { id: 32, text: '🥚 ← This is my chicken Paul. Please put him in your password and keep him safe.', met: false, revealed: false },
  { id: 33, text: 'Oh no! Bombs have been placed around Paul! Delete all the bomb emojis to save Paul before they explode.', met: false, revealed: false },
  { id: 34, text: 'Your password must include the length of your password.', met: false, revealed: false },
  { id: 35, text: 'The length of your password must be a prime number.', met: false, revealed: false },
];

export const checkRules = (password: string, rules: Rule[]): Rule[] => {
  let updatedRules = [...rules];

  // Rule 1: Password must be at least 5 characters long
  updatedRules[0].met = password.length >= 5;
  updatedRules[0].revealed = updatedRules[0].revealed || password.length > 0;

  // Rule 2: Password must include a number
  if (updatedRules[0].revealed) {
    updatedRules[1].met = /\d/.test(password);
    updatedRules[1].revealed = updatedRules[0].met || updatedRules[1].revealed;
  }

  // Rule 3: Password must include an uppercase letter
  if (updatedRules[1].revealed) {
    updatedRules[2].met = /[A-Z]/.test(password);
    updatedRules[2].revealed = updatedRules[1].met || updatedRules[2].revealed;
  }

  // Rule 4: Password must include a special character
  if (updatedRules[2].revealed) {
    updatedRules[3].met = /[@#$%^&*]/.test(password);
    updatedRules[3].revealed = updatedRules[2].met || updatedRules[3].revealed;
  }

  // Rule 5: Password must include a Roman numeral
  if (updatedRules[3].revealed) {
    updatedRules[4].met = /[IVXLCDM]/.test(password);
    updatedRules[4].revealed = updatedRules[3].met || updatedRules[4].revealed;
  }

  // Rule 6: The digits in your password must add up to 25
  if (updatedRules[4].revealed) {
    const digits = password.match(/\d/g);
    const sum = digits ? digits.reduce((acc, digit) => acc + parseInt(digit, 10), 0) : 0;
    updatedRules[5].met = sum === 25;
    updatedRules[5].revealed = updatedRules[4].met || updatedRules[5].revealed;
  }

  // Rule 7: Password must include a month of the year
  if (updatedRules[5].revealed) {
    const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    updatedRules[6].met = months.some(month => password.toLowerCase().includes(month));
    updatedRules[6].revealed = updatedRules[5].met || updatedRules[6].revealed;
  }

  // Rule 8: Password must include a Roman numeral (again)
  if (updatedRules[6].revealed) {
    updatedRules[7].met = /[IVXLCDM]/.test(password);
    updatedRules[7].revealed = updatedRules[6].met || updatedRules[7].revealed;
  }

  // Rule 9: Password must include the word "griffith"
  if (updatedRules[7].revealed) {
    updatedRules[8].met = /griffith/i.test(password);
    updatedRules[8].revealed = updatedRules[7].met || updatedRules[8].revealed;
  }

  // Rule 10: Password must include a sequence of 3 repeated characters
  if (updatedRules[8].revealed) {
    updatedRules[9].met = /(.)\1\1/.test(password);
    updatedRules[9].revealed = updatedRules[8].met || updatedRules[9].revealed;
  }

  // Rule 11: Password must include the first three letters of any day of the week
  if (updatedRules[9].revealed) {
    const daysAbbreviations = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    updatedRules[10].met = daysAbbreviations.some(day => password.toLowerCase().includes(day));
    updatedRules[10].revealed = updatedRules[9].met || updatedRules[10].revealed;
  }

  // Rule 12: Password must not include any space characters
  if (updatedRules[10].revealed) {
    updatedRules[11].met = !/\s/.test(password);
    updatedRules[11].revealed = updatedRules[10].met || updatedRules[11].revealed;
  }

  // Rule 13: Password must include two consecutive uppercase letters
  if (updatedRules[11].revealed) {
    updatedRules[12].met = /[A-Z]{2}/.test(password);
    updatedRules[12].revealed = updatedRules[11].met || updatedRules[12].revealed;
  }

  // Rule 14: Password must include two consecutive numbers
  if (updatedRules[12].revealed) {
    updatedRules[13].met = /\d{2}/.test(password);
    updatedRules[13].revealed = updatedRules[12].met || updatedRules[13].revealed;
  }

  // Rule 15: Your password must contain more than 3 different special characters
  if (updatedRules[13].revealed) {
    const specialChars = password.match(/[@#$%^&*]/g);
    updatedRules[14].met = specialChars ? new Set(specialChars).size > 3 : false;
    updatedRules[14].revealed = updatedRules[13].met || updatedRules[14].revealed;
  }


  // Rule 16: Your password must start with an uppercase letter
  if (updatedRules[14].revealed) {
    updatedRules[15].met = /^[A-Z]/.test(password);
    updatedRules[15].revealed = updatedRules[14].met || updatedRules[15].revealed;
  }

  // Rule 17: Your password must contain a palindrome (no spaces)
  if (updatedRules[15].revealed) {
    const isPalindrome = (str: string) => str === str.split('').reverse().join('') && str.length > 1;
    let foundPalindrome = false;
    for (let i = 0; i < password.length; i++) {
      for (let j = i + 2; j <= password.length; j++) {
        const substring = password.slice(i, j);
        if (isPalindrome(substring)) {
          foundPalindrome = true;
          break;
        }
      }
      if (foundPalindrome) break;
    }
    updatedRules[16].met = foundPalindrome;
    updatedRules[16].revealed = updatedRules[15].met || updatedRules[16].revealed;
  }

  // Rule 18: Your password must contain at least 3 vowels
  if (updatedRules[16].revealed) {
    const vowels = password.match(/[aeiou]/gi);
    updatedRules[17].met = vowels ? vowels.length >= 3 : false;
    updatedRules[17].revealed = updatedRules[16].met || updatedRules[17].revealed;
  }


  // Rule 19: Your password must not include any of the following letters: q, z, y
  if (updatedRules[17].revealed) {
    updatedRules[18].met = !/[qzy]/i.test(password);
    updatedRules[18].revealed = updatedRules[17].met || updatedRules[18].revealed;
  }

  // Rule 20: Your password must contain at least one even number
  if (updatedRules[18].revealed) {
    updatedRules[19].met = /[02468]/.test(password);
    updatedRules[19].revealed = updatedRules[18].met || updatedRules[19].revealed;
  }

  // Rule 21: Your password must contain at least one prime number (2, 3, 5, 7)
  if (updatedRules[19].revealed) {
    updatedRules[20].met = /[2357]/.test(password);
    updatedRules[20].revealed = updatedRules[19].met || updatedRules[20].revealed;
  }

  // Rule 22: Your password must end with a number
  if (updatedRules[20].revealed) {
    updatedRules[21].met = /\d$/.test(password);
    updatedRules[21].revealed = updatedRules[20].met || updatedRules[21].revealed;
  }

  // Rule 23: Your password must include a punctuation mark
  if (updatedRules[21].revealed) {
    updatedRules[22].met = /[.,!?]/.test(password);
    updatedRules[22].revealed = updatedRules[21].met || updatedRules[22].revealed;
  }

  // Rule 24: Your password must include both parentheses
  if (updatedRules[22].revealed) {
    updatedRules[23].met = /\(.*\)/.test(password);
    updatedRules[23].revealed = updatedRules[22].met || updatedRules[23].revealed;
  }

  // Rule 25: Your password must include one character that appears exactly 3 times
  if (updatedRules[23].revealed) {
    const charOccurrences = password.split('').reduce((acc, char) => {
      acc[char] = (acc[char] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    updatedRules[24].met = Object.values(charOccurrences).includes(3);
    updatedRules[24].revealed = updatedRules[23].met || updatedRules[24].revealed;
  }

  // Rule 26: Your password must have exactly 6 vowels
  if (updatedRules[24].revealed) {
    const vowels = password.match(/[aeiou]/gi);
    updatedRules[25].met = vowels ? vowels.length === 6 : false;
    updatedRules[25].revealed = updatedRules[24].met || updatedRules[25].revealed;
  }


  // Rule 27: Your password must contain a number greater than 50
  if (updatedRules[25].revealed) {
    const numbers = password.match(/\d+/g); // Find sequences of digits
    updatedRules[26].met = numbers ? numbers.some(num => parseInt(num, 10) > 50) : false;
    updatedRules[26].revealed = updatedRules[25].met || updatedRules[26].revealed;
  }



  // Rule 28: Your password must contain no consecutive lowercase letters
  if (updatedRules[26].revealed) {
    updatedRules[27].met = !/[a-z]{2,}/.test(password);
    updatedRules[27].revealed = updatedRules[26].met || updatedRules[27].revealed;
  }

  // Rule 29: Your password must include a two-letter symbol from the periodic table
  if (updatedRules[27].revealed) {
    const periodicSymbols = ['He', 'Li', 'Be', 'Ne', 'Na', 'Mg', 'Al', 'Si', 'Cl', 'Ar']; // Add more if needed
    updatedRules[28].met = periodicSymbols.some(symbol => password.includes(symbol));
    updatedRules[28].revealed = updatedRules[27].met || updatedRules[28].revealed;
  }

  // Rule 30: Your password must include the abbreviation of any Australian state or territory (e.g., NSW, QLD, VIC)
  if (updatedRules[28].revealed) {
    const australianStates = ['NSW', 'QLD', 'VIC', 'TAS', 'SA', 'WA', 'ACT', 'NT']; // List of abbreviations
    updatedRules[29].met = australianStates.some(state => password.toLowerCase().includes(state.toLowerCase()));
    updatedRules[29].revealed = updatedRules[28].met || updatedRules[29].revealed;
  }


  // Rule 31: Your password must include a leap year
  if (updatedRules[29].revealed) {
    const leapYears = ['2000', '2004', '2008', '2012', '2016', '2020']; // Add more leap years as needed
    updatedRules[30].met = leapYears.some(year => password.includes(year));
    updatedRules[30].revealed = updatedRules[29].met || updatedRules[30].revealed;
  }

  // Rule 32: 🥚 ← This is my chicken Paul. He hasn’t hatched yet, please put him in your password and keep him safe
  if (updatedRules[30].revealed) {
    updatedRules[31].met = password.includes('🥚');
    updatedRules[31].revealed = updatedRules[30].met || updatedRules[31].revealed;
  }

  // Rule 33: Oh no! They are trying to bomb Paul. Delete all bombs to save him!
  if (updatedRules[31].revealed) {
    // The rule is not met if there are bombs in the password
    if (password.includes('💣')) {
      updatedRules[32].met = false;  // Rule is not met if bombs are present
    } else {
      updatedRules[32].met = !password.includes('💣');  // Rule is met if all bombs have been removed
    }
    updatedRules[32].revealed = updatedRules[31].met || updatedRules[32].revealed;
  }

  // Add the getActualLength function here
  const getActualLength = (password: string) => {
    return [...password].length; // Spread operator to correctly count emojis as 1 character
  };

// Rule 34: Your password must include the length of your password
if (updatedRules[32].revealed && updatedRules[32].met) { // Ensure Rule 32 is met
  const actualLength = getActualLength(password);
  updatedRules[33].met = password.includes(actualLength.toString());
  updatedRules[33].revealed = updatedRules[32].met || updatedRules[33].revealed;
}

// Rule 35: The length of your password must be a prime number
if (updatedRules[33].revealed && updatedRules[33].met) { // Ensure Rule 34 is met before revealing Rule 35
  const actualLength = getActualLength(password);
  const isPrime = (num: number) => {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  };
  updatedRules[34].met = isPrime(actualLength);
  updatedRules[34].revealed = updatedRules[33].met || updatedRules[34].revealed;
}

  return updatedRules;
};



export const timeUnits = [
  { unit: 'nanoseconds', value: 1e-9 },
  { unit: 'microseconds', value: 1e-6 },
  { unit: 'milliseconds', value: 1e-3 },
  { unit: 'seconds', value: 1 },
  { unit: 'minutes', value: 60 },
  { unit: 'hours', value: 60 * 60 },
  { unit: 'days', value: 60 * 60 * 24 },
  { unit: 'weeks', value: 60 * 60 * 24 * 7 },
  { unit: 'months', value: 60 * 60 * 24 * 30 },
  { unit: 'years', value: 60 * 60 * 24 * 365 },
  { unit: 'million years', value: 60 * 60 * 24 * 365 * 1e6 },
  { unit: 'billion years', value: 60 * 60 * 24 * 365 * 1e9 },
  { unit: 'trillion years', value: 60 * 60 * 24 * 365 * 1e12 },
  { unit: 'quadrillion years', value: 60 * 60 * 24 * 365 * 1e15 },
  { unit: 'quintillion years', value: 60 * 60 * 24 * 365 * 1e18 },
  { unit: 'sextillion years', value: 60 * 60 * 24 * 365 * 1e21 },
  { unit: 'septillion years', value: 60 * 60 * 24 * 365 * 1e24 },
];
