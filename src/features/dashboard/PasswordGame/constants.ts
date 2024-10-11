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
    { id: 11, text: 'Your password must include a palindrome.', met: false, revealed: false },
    { id: 12, text: 'Your password must include a prime number.', met: false, revealed: false },
    { id: 13, text: 'Your password must include a hexadecimal number.', met: false, revealed: false },
    { id: 14, text: 'Your password must include a binary number.', met: false, revealed: false },
    { id: 15, text: 'Your password must include a punctuation mark.', met: false, revealed: false },
    { id: 16, text: 'Your password must include a color name.', met: false, revealed: false },
    { id: 17, text: 'Your password must include a fruit name.', met: false, revealed: false },
    { id: 18, text: 'Your password must include a country name.', met: false, revealed: false },
    { id: 19, text: 'Your password must include a famous landmark.', met: false, revealed: false },
    { id: 20, text: 'Your password must include a chemical element.', met: false, revealed: false },
    { id: 21, text: 'Your password must include a constellation name.', met: false, revealed: false },
    { id: 22, text: 'Your password must include a Greek letter.', met: false, revealed: false },
    { id: 23, text: 'Your password must include a mathematical symbol.', met: false, revealed: false },
    { id: 24, text: 'Your password must include a programming language name.', met: false, revealed: false },
    { id: 25, text: 'Your password must include a famous scientist\'s name.', met: false, revealed: false },
]

export const checkRules = (password: string, rules: Rule[]): Rule[] => {
    let updatedRules = [...rules]

    // Rule 1: Password must be at least 5 characters long
    updatedRules[0].met = password.length >= 5
    updatedRules[0].revealed = updatedRules[0].revealed || password.length > 0

    // Sequential unlocking logic: Only reveal the next rule if the previous one is met
    if (updatedRules[0].revealed) {
        // Rule 2: Password must include a number
        updatedRules[1].met = /\d/.test(password)
        updatedRules[1].revealed = updatedRules[0].met || updatedRules[1].revealed
    } else {
        updatedRules[1].met = false
    }

    if (updatedRules[1].revealed) {
        // Rule 3: Password must include an uppercase letter
        updatedRules[2].met = /[A-Z]/.test(password)
        updatedRules[2].revealed = updatedRules[1].met || updatedRules[2].revealed
    }

    if (updatedRules[2].revealed) {
        // Rule 4: Password must include a special character
        updatedRules[3].met = /[\W_]/.test(password)
        updatedRules[3].revealed = updatedRules[2].met || updatedRules[3].revealed
    }

    if (updatedRules[3].revealed) {
        // Rule 5: Password must include a month of the year
        const months = [
            'january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'
        ]
        updatedRules[4].met = months.some(month => password.toLowerCase().includes(month))
        updatedRules[4].revealed = updatedRules[3].met || updatedRules[4].revealed
    }

    if (updatedRules[4].revealed) {
        // Rule 6: The digits in your password must add up to 25
        const digits = password.match(/\d/g)
        const sum = digits ? digits.reduce((acc, digit) => acc + parseInt(digit, 10), 0) : 0
        updatedRules[5].met = sum === 25
        updatedRules[5].revealed = updatedRules[4].met || updatedRules[5].revealed
    }

    if (updatedRules[5].revealed) {
        // Rule 7: Password must include the word "password"
        updatedRules[6].met = /password/i.test(password)
        updatedRules[6].revealed = updatedRules[5].met || updatedRules[6].revealed
    }

    if (updatedRules[6].revealed) {
        // Rule 8: Password must include a sequence of 3 repeated characters
        updatedRules[7].met = /(.)\1\1/.test(password)
        updatedRules[7].revealed = updatedRules[6].met || updatedRules[7].revealed
    }

    if (updatedRules[7].revealed) {
        // Rule 9: Password must include a day of the week
        const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
        updatedRules[8].met = days.some(day => password.toLowerCase().includes(day))
        updatedRules[8].revealed = updatedRules[7].met || updatedRules[8].revealed
    }

    if (updatedRules[8].revealed) {
        // Rule 10: Password must include a Roman numeral
        updatedRules[9].met = /[IVXLCDM]/i.test(password)
        updatedRules[9].revealed = updatedRules[8].met || updatedRules[9].revealed
    }

    if (updatedRules[9].revealed) {
        // Rule 11: Password must include a palindrome
        const isPalindrome = (str: string) => str === str.split('').reverse().join('')
        updatedRules[10].met = isPalindrome(password)
        updatedRules[10].revealed = updatedRules[9].met || updatedRules[10].revealed
    }

    if (updatedRules[10].revealed) {
        // Rule 12: Password must include a prime number
        const isPrime = (num: number) => {
            for (let i = 2, sqrt = Math.sqrt(num); i <= sqrt; i++) if (num % i === 0) return false
            return num > 1
        }
        const numbers = password.match(/\d+/g)
        updatedRules[11].met = numbers ? numbers.some(num => isPrime(parseInt(num, 10))) : false
        updatedRules[11].revealed = updatedRules[10].met || updatedRules[11].revealed
    }

    if (updatedRules[11].revealed) {
        // Rule 13: Password must include a hexadecimal number
        updatedRules[12].met = /0x[0-9A-Fa-f]+/.test(password)
        updatedRules[12].revealed = updatedRules[11].met || updatedRules[12].revealed
    }

    if (updatedRules[12].revealed) {
        // Rule 14: Password must include a binary number
        updatedRules[13].met = /[01]+/.test(password)
        updatedRules[13].revealed = updatedRules[12].met || updatedRules[13].revealed
    }

    if (updatedRules[13].revealed) {
        // Rule 15: Password must include a punctuation mark
        updatedRules[14].met = /[.,\/#!$%\^&\*;:{}=\-_`~()]/.test(password)
        updatedRules[14].revealed = updatedRules[13].met || updatedRules[14].revealed
    }

    if (updatedRules[14].revealed) {
        // Rule 16: Password must include a color name
        const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'brown', 'black', 'white']
        updatedRules[15].met = colors.some(color => password.toLowerCase().includes(color))
        updatedRules[15].revealed = updatedRules[14].met || updatedRules[15].revealed
    }

    if (updatedRules[15].revealed) {
        // Rule 17: Password must include a fruit name
        const fruits = ['apple', 'banana', 'cherry', 'date', 'fig', 'grape', 'kiwi', 'lemon', 'mango', 'orange']
        updatedRules[16].met = fruits.some(fruit => password.toLowerCase().includes(fruit))
        updatedRules[16].revealed = updatedRules[15].met || updatedRules[16].revealed
    }

    if (updatedRules[16].revealed) {
        // Rule 18: Password must include a country name
        const countries = ['canada', 'brazil', 'china', 'france', 'germany', 'india', 'japan', 'mexico', 'russia', 'usa']
        updatedRules[17].met = countries.some(country => password.toLowerCase().includes(country))
        updatedRules[17].revealed = updatedRules[16].met || updatedRules[17].revealed
    }

    if (updatedRules[17].revealed) {
        // Rule 19: Password must include a famous landmark
        const landmarks = ['eiffel', 'colosseum', 'pyramids', 'statue', 'taj', 'great wall', 'machu', 'christ', 'petra', 'stonehenge']
        updatedRules[18].met = landmarks.some(landmark => password.toLowerCase().includes(landmark))
        updatedRules[18].revealed = updatedRules[17].met || updatedRules[18].revealed
    }

    if (updatedRules[18].revealed) {
        // Rule 20: Password must include a chemical element
        const elements = ['hydrogen', 'helium', 'lithium', 'beryllium', 'boron', 'carbon', 'nitrogen', 'oxygen', 'fluorine', 'neon']
        updatedRules[19].met = elements.some(element => password.toLowerCase().includes(element))
        updatedRules[19].revealed = updatedRules[18].met || updatedRules[19].revealed
    }

    if (updatedRules[19].revealed) {
        // Rule 21: Password must include a constellation name
        const constellations = ['orion', 'ursa', 'leo', 'scorpius', 'cassiopeia', 'andromeda', 'pegasus', 'lyra', 'cygnus', 'aquarius']
        updatedRules[20].met = constellations.some(constellation => password.toLowerCase().includes(constellation))
        updatedRules[20].revealed = updatedRules[19].met || updatedRules[20].revealed
    }

    if (updatedRules[20].revealed) {
        // Rule 22: Password must include a Greek letter
        const greekLetters = ['alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa']
        updatedRules[21].met = greekLetters.some(letter => password.toLowerCase().includes(letter))
        updatedRules[21].revealed = updatedRules[20].met || updatedRules[21].revealed
    }

    if (updatedRules[21].revealed) {
        // Rule 23: Password must include a mathematical symbol
        const mathSymbols = ['+', '-', '*', '/', '=', '<', '>', '√', 'π', '∞']
        updatedRules[22].met = mathSymbols.some(symbol => password.includes(symbol))
        updatedRules[22].revealed = updatedRules[21].met || updatedRules[22].revealed
    }

    if (updatedRules[22].revealed) {
        // Rule 24: Password must include a programming language name
        const languages = ['python', 'java', 'javascript', 'ruby', 'swift', 'kotlin', 'csharp', 'go', 'rust', 'typescript']
        updatedRules[23].met = languages.some(language => password.toLowerCase().includes(language))
        updatedRules[23].revealed = updatedRules[22].met || updatedRules[23].revealed
    }

    if (updatedRules[23].revealed) {
        // Rule 25: Password must include a famous scientist's name
        const scientists = ['einstein', 'newton', 'curie', 'tesla', 'darwin', 'hawking', 'galileo', 'bohr', 'feynman', 'turing']
        updatedRules[24].met = scientists.some(scientist => password.toLowerCase().includes(scientist))
        updatedRules[24].revealed = updatedRules[23].met || updatedRules[24].revealed
    }

    return updatedRules
}

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
]