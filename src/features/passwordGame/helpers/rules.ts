export interface Rule {
  id: number;
  text: string;
  met: boolean;
  revealed: boolean;
}

export const initialRules: Rule[] = [
  { id: 1, text: 'Your password must be at least 5 characters long.', met: false, revealed: false },
  { id: 2, text: 'Your password must include a number.', met: false, revealed: false },
  { id: 3, text: 'Your password must include an uppercase letter.', met: false, revealed: false },
  { id: 4, text: 'Your password must include a special character.', met: false, revealed: false },
  { id: 5, text: 'Your password must include a month of the year.', met: false, revealed: false },
  { id: 6, text: 'The digits in your password must add up to 25.', met: false, revealed: false },
  { id: 7, text: 'Your password must include the word "password".', met: false, revealed: false },
  { id: 8, text: 'Your password must include a sequence of 3 repeated characters.', met: false, revealed: false },
  { id: 9, text: 'Your password must include a day of the week.', met: false, revealed: false },
  { id: 10, text: 'Your password must include a Roman numeral.', met: false, revealed: false },
];

export const checkRules = (password: string, rules: Rule[]): Rule[] => {
  let updatedRules = [...rules];

  // Rule 1: Password must be at least 5 characters long
  updatedRules[0].met = password.length >= 5;
  // Rule 1 should remain revealed if it was revealed before, even if password is empty
  updatedRules[0].revealed = updatedRules[0].revealed || password.length > 0;

  // Sequential unlocking logic: Only reveal the next rule if the previous one is met
  if (updatedRules[0].revealed) {
    // Rule 2: Password must include a number
    updatedRules[1].met = /\d/.test(password);
    updatedRules[1].revealed = updatedRules[0].met || updatedRules[1].revealed; // Only set to true if Rule 1 is met
  } else {
    updatedRules[1].met = false; // Reset Rule 2 when Rule 1 is not met
  }

  if (updatedRules[1].revealed) {
    // Rule 3: Password must include an uppercase letter
    updatedRules[2].met = /[A-Z]/.test(password);
    updatedRules[2].revealed = updatedRules[1].met || updatedRules[2].revealed;
  }

  if (updatedRules[2].revealed) {
    // Rule 4: Password must include a special character
    updatedRules[3].met = /[\W_]/.test(password);
    updatedRules[3].revealed = updatedRules[2].met || updatedRules[3].revealed;
  }

  if (updatedRules[3].revealed) {
    // Rule 5: Password must include a month of the year
    const months = [
      'january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'
    ];
    updatedRules[4].met = months.some(month => password.toLowerCase().includes(month));
    updatedRules[4].revealed = updatedRules[3].met || updatedRules[4].revealed;
  }

  if (updatedRules[4].revealed) {
    // Rule 6: The digits in your password must add up to 25
    const digits = password.match(/\d/g);
    const sum = digits ? digits.reduce((acc, digit) => acc + parseInt(digit, 10), 0) : 0;
    updatedRules[5].met = sum === 25;
    updatedRules[5].revealed = updatedRules[4].met || updatedRules[5].revealed;
  }

  if (updatedRules[5].revealed) {
    // Rule 7: Password must include the word "password"
    updatedRules[6].met = /password/i.test(password);
    updatedRules[6].revealed = updatedRules[5].met || updatedRules[6].revealed;
  }

  if (updatedRules[6].revealed) {
    // Rule 8: Password must include a sequence of 3 repeated characters
    updatedRules[7].met = /(.)\1\1/.test(password);
    updatedRules[7].revealed = updatedRules[6].met || updatedRules[7].revealed;
  }

  if (updatedRules[7].revealed) {
    // Rule 9: Password must include a day of the week
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    updatedRules[8].met = days.some(day => password.toLowerCase().includes(day));
    updatedRules[8].revealed = updatedRules[7].met || updatedRules[8].revealed;
  }

  if (updatedRules[8].revealed) {
    // Rule 10: Password must include a Roman numeral
    updatedRules[9].met = /[IVXLCDM]/i.test(password); // Checks for Roman numerals I, V, X, L, C, D, M
    updatedRules[9].revealed = updatedRules[8].met || updatedRules[9].revealed;
  }

  return updatedRules;
};
