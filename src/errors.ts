export class LibraryError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = new.target.name;
  }
}

export class SlugValidationError extends LibraryError {}
