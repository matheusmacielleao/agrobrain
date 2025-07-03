export class DocumentAlreadyUsed extends Error {
  constructor(documentNumber: string) {
    super(`Document ${documentNumber} already used`);
  }
}
