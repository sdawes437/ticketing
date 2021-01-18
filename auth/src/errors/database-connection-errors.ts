import { CustomError } from './custom-errors';

export class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  reason = 'Error connecting to the database';
  constructor() {
    super();

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
