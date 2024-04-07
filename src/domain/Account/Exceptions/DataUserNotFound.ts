export class DataUserNotFound extends Error {
    constructor () {
      super("It's impossible to find a User with the entered IBAN")
    }
  }
  