class HttpError extends Error {
    constructor({ message, code, httpCode }) {
        super(message);

        this.code = code;
        this.httpCode = httpCode;
    }
}

module.exports = HttpError;