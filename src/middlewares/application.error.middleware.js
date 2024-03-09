// This middleware Handles the Error at Application level

export default class ApplicationError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}
