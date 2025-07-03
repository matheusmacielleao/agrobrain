export class FarmerNotFound extends Error {
  constructor(documentNumber: string) {
    super(`Farmer with documentnumber ${documentNumber} not found.`);
  }
}
