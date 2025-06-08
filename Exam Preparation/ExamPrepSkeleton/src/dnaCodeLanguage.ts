import { Language } from "./contracts/language";

type DNABase = 'A' | 'C' | 'G' | 'T';
type DNACharset = Set<DNABase>;

export class DNACodeLanguage implements Language {
    private readonly _charset: DNACharset = new Set(['A', 'C', 'G', 'T']);

    get charset(): DNACharset {
        return this._charset;
    }

    isCompatibleToCharset(message: string): boolean {
        const allChars = message.split('');
        return allChars.every(char => this._charset.has(char as DNABase));
    }
}