export function parseError(e: any) {
  const error = {
      success: false,
      response: {
          error: null,
          details: null
      }
  };

  if (!e.response) {
      error.response.details = e.message || e;
  } else {
      error.response.error =
          e.response.data.erro
              ? e.response.data.status
              : e.response.data;
      error.response.details =
          e.response.data.erro
            ? e.response.data.erro
            : null;
  }

  return error;
}