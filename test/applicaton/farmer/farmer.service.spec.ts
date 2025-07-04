import { FarmerService } from '../../../src/application/farmer/farmer.service';
import { FarmerRepository } from '../../../src/application/farmer/farmer.repository';
import { FarmerModel } from '../../../src/infra/databases/models/farmer.model';
import { InvalidDocumentError } from '../../../src/application/farmer/errors/InvalidDocument';
import { DocumentAlreadyUsed } from '../../../src/application/farmer/errors/DocumentAlreadyUsed';
import { ValidateDocument } from '../../../src/domain/usecases/validate-document.usecase';

jest.mock('../../../src/domain/usecases/validate-document.usecase');

describe('FarmerService - createFarmer', () => {
  let farmerRepo: jest.Mocked<FarmerRepository>;
  let farmerService: FarmerService;

  beforeEach(() => {
    farmerRepo = {
      findOneByDocumentNumber: jest.fn(),
      create: jest.fn(),
      findAll: jest.fn(),
      deleteByDocumentNumber: jest.fn(),
      update: jest.fn(),
    } as any;
    farmerService = new FarmerService(farmerRepo);
    jest.clearAllMocks();
  });

  it('should return InvalidDocumentError if document is invalid', async () => {
    (ValidateDocument.exec as jest.Mock).mockReturnValue(false);

    const result = await farmerService.createFarmer('invalid-doc', 'John Doe');

    expect(result).toBeInstanceOf(InvalidDocumentError);
    expect(farmerRepo.findOneByDocumentNumber).not.toHaveBeenCalled();
    expect(farmerRepo.create).not.toHaveBeenCalled();
  });

  it('should return DocumentAlreadyUsed if document already exists', async () => {
    (ValidateDocument.exec as jest.Mock).mockReturnValue(true);
    farmerRepo.findOneByDocumentNumber.mockResolvedValue({} as FarmerModel);

    const result = await farmerService.createFarmer('123456789', 'Jane Doe');

    expect(result).toBeInstanceOf(DocumentAlreadyUsed);
    expect(farmerRepo.findOneByDocumentNumber).toHaveBeenCalledWith(
      '123456789',
    );
    expect(farmerRepo.create).not.toHaveBeenCalled();
  });

  it('should create and return new FarmerModel if document is valid and not used', async () => {
    (ValidateDocument.exec as jest.Mock).mockReturnValue(true);
    farmerRepo.findOneByDocumentNumber.mockResolvedValue(null);
    const newFarmer = {
      documentNumber: '123456789',
      name: 'Jane Doe',
    } as FarmerModel;
    farmerRepo.create.mockResolvedValue(newFarmer);

    const result = await farmerService.createFarmer('123456789', 'Jane Doe');

    expect(result).toBe(newFarmer);
    expect(farmerRepo.findOneByDocumentNumber).toHaveBeenCalledWith(
      '123456789',
    );
    expect(farmerRepo.create).toHaveBeenCalledWith('123456789', 'Jane Doe');
  });
});
