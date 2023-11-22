export class AuthError extends Error {
  public static notAuthorized(): AuthError {
    return new AuthError('NOT_AUTHORIZED');
  }

  public static unverifiedAccount(): AuthError {
    return new AuthError('UNVERIFIED_ACCOUNT');
  }

  public static alreadyVerified(): AuthError {
    return new AuthError('USER_IS_ALREADY_VERIFIED');
  }

  public static invalidCodeResetPassword(): AuthError {
    return new AuthError('INVALID_CODE_TO_RESET_PASSWORD');
  }

  public static invalidCodeSmsCode(): AuthError {
    return new AuthError('INVALID_SMS_CODE');
  }

  public static invalidCodeConfirmAccount(): AuthError {
    return new AuthError('INVALID_CODE_TO_CONFIRM_ACCOUNT');
  }

  public static invalidToken(): AuthError {
    return new AuthError('ACCOUNT_INVALID_TOKEN');
  }
}
