export const handleError = (status, message) => {
  const err = new Error();

  err.message = message;
  err.status = status;
  return err;
};
