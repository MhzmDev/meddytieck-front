import { HttpErrorResponse } from '@angular/common/http';

export function extractError(error: unknown, log = true) {
  if (log) {
    console.error(error);
  }
  let errMsg = '';
  let statusCode: number | null = null;
  if (typeof error === 'string') {
    errMsg = error;
  } else if (error instanceof Error) {
    // Standard JavaScript Error
    errMsg = error.message;
  } else if (error instanceof HttpErrorResponse) {
    statusCode = error.error?.statusCode || error.status;
    if (error.error?.message) {
      errMsg = error.error.message;
    }
    try {
      error?.error?.forEach((err: object) => {
        if ('errormsg' in err) {
          errMsg = errMsg.concat(err.errormsg as string);
        }
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      // do nothing
    }
    if (!errMsg) {
      errMsg = error?.error?.errormsg;
    }
    if (!errMsg) {
      try {
        errMsg = JSON.parse(error.error.errors)[0].errormsg;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        // do nothing
      }
    }
  }

  return {
    errorMessage: errMsg || 'TOASTR.AN_ERROR_OCCURRED_PLEASE_TRY_AGAIN',
    statusCode,
  };
}
