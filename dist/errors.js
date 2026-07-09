export class LibraryError extends Error {
    constructor(message, options) {
        super(message, options);
        this.name = new.target.name;
    }
}
export class SlugValidationError extends LibraryError {
}
