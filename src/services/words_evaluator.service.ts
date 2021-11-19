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

    public evaluateWord(word: string): number {
        let wordValue = 0;
        for (let i = 0; i < word.length; i++) {
            wordValue += this.lettersValues.get(word[i]) || 0;
        }
        return wordValue;
    }
}