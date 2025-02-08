export class Result<T = null> {
    readonly isSuccess: boolean;
    readonly code: number;
    readonly message: string;
    readonly value: T;

    private constructor(isSuccess: boolean, code: number, message: string, value: T) {
        this.isSuccess = isSuccess;
        this.code = code;
        this.message = message;
        this.value = value;
    }

    static success<T>(value?: T, code: number = 200, message?: string): Result<T> {
        return new Result<T>(true, code, message, value);
    }

    static fail<T>(code: number = 500, message?: string): Result<T> {
        return new Result<T>(false, code, message, null);
    }

    static badRequest<T>(message?: string): Result<T> {
        return Result.fail(400, message);
    }

    static unauthorized<T>(message?: string): Result<T> {
        return Result.fail(401, message);
    }

    static notFound<T>(message?: string): Result<T> {
        return Result.fail(404, message);
    }

    static internalServerError<T>(message?: string): Result<T> {
        return Result.fail(500, message);
    }

    static conflict<T>(message?: string): Result<T> {
        return Result.fail(409, message);
    }
}
