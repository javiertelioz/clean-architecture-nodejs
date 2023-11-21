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

  public static alreadyVerified(): UserError {
    return new UserError('USER_IS_ALREADY_VERIFIED');
  }

  public static unverifiedAccount(): UserError {
    return new UserError('UNVERIFIED_ACCOUNT');
  }

  public static invalidCodeResetPassword(): UserError {
    return new UserError('INVALID_CODE_TO_RESET_PASSWORD');
  }

  public static invalidCodeSmsCode(): UserError {
    return new UserError('INVALID_SMS_CODE');
  }

  public static invalidCodeConfirmAccount(): UserError {
    return new UserError('INVALID_CODE_TO_CONFIRM_ACCOUNT');
  }

  public static invalidToken(): UserError {
    return new UserError('ACCOUNT_INVALID_TOKEN');
  }
}
