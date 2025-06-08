import { PartialMessageEncoder } from "./contracts/implemented/partialMessageEncoder";
import { MessageEncoder } from "./contracts/messageEncoder";
import { Language } from "./contracts/language";
import { Cipher } from "./contracts/cipher";

type CipherType<T extends Language> = Cipher<T>;
type ProcessType = 'Encoded' | 'Decoded' | 'Both';
type MessageType = unknown;
type CounterType = number;

export class LanguageMessageEncoder<TLanguage extends Language, TCipher extends CipherType<TLanguage>> extends PartialMessageEncoder implements MessageEncoder {
    private encodedCharactersCount: CounterType = 0;
    private decodedCharactersCount: CounterType = 0;

    constructor(
        private readonly languageInstance: TLanguage,
        private readonly cipherInstance: TCipher
    ) {
        super(languageInstance, cipherInstance);
    }

    protected get language(): TLanguage {
        return this.languageInstance;
    }

    protected get cipher(): TCipher {
        return this.cipherInstance;
    }

    public encodeMessage(secretMessage: MessageType): string {
        if (typeof secretMessage !== 'string' || secretMessage.length === 0) {
            return "No message.";
        }

        const strippedMessage = this.stripForbiddenSymbols(secretMessage);

        if (!this.language.isCompatibleToCharset(strippedMessage)) {
            return "Message not compatible.";
        }

        const encodedMessage = this.cipher.encipher(strippedMessage);
        this.encodedCharactersCount += strippedMessage.length;
        
        return encodedMessage;
    }

    public decodeMessage(secretMessage: MessageType): string {
        if (typeof secretMessage !== 'string' || secretMessage.length === 0) {
            return "No message.";
        }

        if (!this.language.isCompatibleToCharset(secretMessage)) {
            return "Message not compatible.";
        }

        const decodedMessage = this.cipher.decipher(secretMessage);
        this.decodedCharactersCount += secretMessage.length;
        
        return decodedMessage;
    }

    public totalProcessedCharacters(type: ProcessType): string {
        let totalCount: CounterType;

        switch (type) {
            case 'Encoded':
                totalCount = this.encodedCharactersCount;
                break;
            case 'Decoded':
                totalCount = this.decodedCharactersCount;
                break;
            case 'Both':
                totalCount = this.encodedCharactersCount + this.decodedCharactersCount;
                break;
            default:
                totalCount = 0;
        }

        return `Total processed characters count: ${totalCount}`;
    }
}
