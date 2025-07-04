import { ValidateDocument } from '../../../src/domain/usecases/validate-document.usecase';

describe('ValidateDocument', () => {
  describe('CPF validation', () => {
    it('should return true for a valid CPF', () => {
      expect(ValidateDocument.exec('529.982.247-25')).toBe(true);
      expect(ValidateDocument.exec('52998224725')).toBe(true);
    });

    it('should return false for an invalid CPF', () => {
      expect(ValidateDocument.exec('529.982.247-26')).toBe(false);
      expect(ValidateDocument.exec('52998224726')).toBe(false);
    });

    it('should return false for CPF with all digits equal', () => {
      expect(ValidateDocument.exec('111.111.111-11')).toBe(false);
      expect(ValidateDocument.exec('00000000000')).toBe(false);
    });

    it('should return false for CPF with less than 11 digits', () => {
      expect(ValidateDocument.exec('123.456.789-0')).toBe(false);
      expect(ValidateDocument.exec('1234567890')).toBe(false);
    });

    it('should return false for CPF with more than 11 digits', () => {
      expect(ValidateDocument.exec('123.456.789-001')).toBe(false);
      expect(ValidateDocument.exec('123456789001')).toBe(false);
    });
  });

  describe('CNPJ validation', () => {
    it('should return true for a valid CNPJ', () => {
      expect(ValidateDocument.exec('04.252.011/0001-10')).toBe(true);
      expect(ValidateDocument.exec('04252011000110')).toBe(true);
    });

    it('should return false for an invalid CNPJ', () => {
      expect(ValidateDocument.exec('04.252.011/0001-11')).toBe(false);
      expect(ValidateDocument.exec('04252011000111')).toBe(false);
    });

    it('should return false for CNPJ with all digits equal', () => {
      expect(ValidateDocument.exec('11.111.111/1111-11')).toBe(false);
      expect(ValidateDocument.exec('00000000000000')).toBe(false);
    });

    it('should return false for CNPJ with less than 14 digits', () => {
      expect(ValidateDocument.exec('04.252.011/0001-1')).toBe(false);
      expect(ValidateDocument.exec('0425201100011')).toBe(false);
    });

    it('should return false for CNPJ with more than 14 digits', () => {
      expect(ValidateDocument.exec('04.252.011/0001-100')).toBe(false);
      expect(ValidateDocument.exec('042520110001100')).toBe(false);
    });
  });

  describe('General validation', () => {
    it('should return false for empty string', () => {
      expect(ValidateDocument.exec('')).toBe(false);
    });

    it('should return false for string with only non-numeric characters', () => {
      expect(ValidateDocument.exec('abc.def.ghi-jk')).toBe(false);
    });

    it('should return false for random string with invalid length', () => {
      expect(ValidateDocument.exec('123456789')).toBe(false);
      expect(ValidateDocument.exec('123456789012')).toBe(false);
      expect(ValidateDocument.exec('123456789012345')).toBe(false);
    });
  });
});
