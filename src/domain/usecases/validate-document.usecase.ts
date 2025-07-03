export class ValidateDocument {
  static exec(document: string): boolean {
    const cleaned = this.removeNonNumericCharacters(document);

    if (cleaned.length === 11) {
      return this.validateCPF(cleaned);
    } else if (cleaned.length === 14) {
      return this.validateCNPJ(cleaned);
    }

    return false;
  }

  private static removeNonNumericCharacters(value: string): string {
    return value.replace(/\D/g, '');
  }

  private static validateCPF(cpf: string): boolean {
    if (this.allDigitsAreEqual(cpf)) return false;

    const firstDigit = this.calculateCPFCheckDigit(cpf, 9, 10);
    const secondDigit = this.calculateCPFCheckDigit(cpf, 10, 11);

    return (
      firstDigit === parseInt(cpf.charAt(9)) &&
      secondDigit === parseInt(cpf.charAt(10))
    );
  }

  private static allDigitsAreEqual(value: string): boolean {
    return /^(\d)\1+$/.test(value);
  }

  private static calculateCPFCheckDigit(
    cpf: string,
    length: number,
    initialWeight: number,
  ): number {
    let sum = 0;
    for (let i = 0; i < length; i++) {
      sum += parseInt(cpf.charAt(i)) * (initialWeight - i);
    }

    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  }

  private static validateCNPJ(cnpj: string): boolean {
    if (this.allDigitsAreEqual(cnpj)) return false;

    const firstDigit = this.calculateCNPJCheckDigit(cnpj, 12);
    const secondDigit = this.calculateCNPJCheckDigit(cnpj, 13);

    return (
      firstDigit === parseInt(cnpj.charAt(12)) &&
      secondDigit === parseInt(cnpj.charAt(13))
    );
  }

  private static calculateCNPJCheckDigit(cnpj: string, length: number): number {
    const weights =
      length === 12
        ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
        : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    let sum = 0;
    for (let i = 0; i < length; i++) {
      sum += parseInt(cnpj.charAt(i)) * weights[i];
    }

    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  }
}
