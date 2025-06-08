type BaseResponse = { code: number; text: string; };
type ExtendedResponse = BaseResponse & { printChars?: number };

export function handleHttpResponse(response: ExtendedResponse): void {
    if ('printChars' in response && response.printChars !== undefined) {
        console.log(response.text.substring(0, response.printChars));
    } else {
        console.log(response.text);
    }
}