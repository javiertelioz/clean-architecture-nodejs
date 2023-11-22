export class UserError extends Error {
  public static notFound(): UserError {
    return new UserError('USER_NOT_FOUND');
  }

  public static alreadyExists(): UserError {
    return new UserError('USER_ALREADY_EXISTS');
  }

  public static invalidEmailAndPassword(): UserError {
    return new UserError('INVALID_EMAIL_AND_PASSWORD');
  }

  public static notAuthorized(): UserError {
    return new UserError('NOT_AUTHORIZED');
  }

  public static updateError(): UserError {
    return new UserError('THERE_WAS_AN_ERROR');
  }
}
