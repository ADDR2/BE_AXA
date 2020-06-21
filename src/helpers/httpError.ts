interface HttpErrorParams {
    message: string;
    code: number;
    httpCode: number;
}

class HttpError extends Error {
    code: number;
    httpCode: number;

    constructor({ message, code, httpCode }: HttpErrorParams) {
        super(message);

        this.code = code;
        this.httpCode = httpCode;
    }
}

export default HttpError;