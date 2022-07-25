export function parseError(e: any) {
  const error = {
      success: false,
      response: {
          msg: '',
          errorId: 0
      }
  }
  if (!e.response) {
      error.response.msg = e.message || e;
  } else {
      error.response.msg =
          e.response.error
              ? e.response.error.descricao
              : e.response.error;
      error.response.errorId =
          e.response.error
            ? e.response.error.id
            : e.response.error;
  }
  return error;
}