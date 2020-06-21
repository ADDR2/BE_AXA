export default class ColoredString extends String {
    constructor(value: string) {
        super(value);
    }

    blue(): string {
        return `\x1b[34m${this}\x1b[0m`;
    }

    red(): string {
        return `\x1b[31m${this}\x1b[0m`;
    }

    green(): string {
        return `\x1b[32m${this}\x1b[0m`;
    }

    cyan(): string {
        return `\x1b[36m${this}\x1b[0m`;
    }

    yellow(): string {
        return `\x1b[33m${this}\x1b[0m`;
    }
}