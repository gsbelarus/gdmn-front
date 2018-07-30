import ExtendableError from 'es6-error';

class HttpStatusError extends ExtendableError {
  public response: Response;

  constructor(response: Response) {
    super(response.statusText);

    this.response = response;
  }
}

export { HttpStatusError };
