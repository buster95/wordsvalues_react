export class WordsEvaluatorService {
    letters: string[] = [
        'A', 'B', 'C', 'D', 'E',
        'F', 'G', 'H', 'I', 'J',
        'K', 'L', 'M', 'N', 'O',
        'P', 'Q', 'R', 'S', 'T',
        'U', 'V', 'W', 'X', 'Y', 'Z'
    ];
    lettersValues: Map<string, number> = new Map();

    constructor() {
        this.letters = this.letters.sort(() => Math.random() - 0.5);
        this.createLettersValues();
    }

    private createLettersValues() {
        for (let i = 0; i < this.letters.length; i++) {
            this.lettersValues.set(this.letters[i], i + 1);
        }
    }

    private getValue(letter: string): number {
        return this.lettersValues.get(letter) || 0;
    }

    public evaluateWord(word: string): number {
        let wordValue = 0;
        for (let i = 0; i < word.length; i++) {
            wordValue += this.getValue(word[i]);
        }
        return wordValue;
    }

    public maxWordValue(word: string): number {
        let wordLetters = word.split('');
        wordLetters = wordLetters.filter(function (ele, pos) {
            return wordLetters.indexOf(ele) === pos;
        });
        let lettersCount: Map<string, number> = new Map();
        wordLetters.forEach(letter => {
            let counter = 0;
            word.split('').forEach(letterToCount => {
                if (letterToCount === letter) counter++;
            });
            lettersCount.set(letter, counter);
        });

        lettersCount = new Map([...lettersCount.entries()].sort((a, b) => b[1] - a[1]));
        const maxLettersValues: Map<string, number> = new Map(lettersCount);
        const letters = [...maxLettersValues.keys()];
        letters.forEach((value, index) => {
            maxLettersValues.set(value, this.letters.length - index);
        });

        let maxValue = 0;
        for (let i = 0; i < word.length; i++) {
            maxValue += maxLettersValues.get(word[i]) || 0;
        }
        return maxValue;
    }
}