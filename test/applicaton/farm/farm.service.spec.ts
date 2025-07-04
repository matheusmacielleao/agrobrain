import { FarmService } from '../../../src/application/farm/farm.service';
import { FarmerRepository } from '../../../src/application/farmer/farmer.repository';
import { FarmRepository } from '../../../src/application/farm/farm.repository';
import { FarmerNotFound } from '../../../src/application/farmer/errors/FarmerNotFound';
import { AreaValuesInvalidError } from '../../../src/application/farm/errors/AreaValuesInvalidError';
import { FarmModel } from '../../../src/infra/databases/models/farm.model';

describe('FarmService - create', () => {
  let farmService: FarmService;
  let farmerRepository: jest.Mocked<FarmerRepository>;
  let farmRepository: jest.Mocked<FarmRepository>;

  const mockFarmer = { id: 'farmer1', document: '12345678900' } as any;
  const mockFarm: FarmModel = {
    id: 'farm1',
    name: 'Test Farm',
    totalAreaHectares: 100,
    utilAreaHectares: 60,
    vegetationAreaHectares: 30,
    farmerId: 'farmer1',
    city: 'Test City',
    state: 'Test State',
    farmer: mockFarmer,
    harvests: [],
  } as FarmModel;

  const validCreateFarmDto = {
    name: 'Test Farm',
    city: 'Test City',
    state: 'Test State',
    totalAreaHectares: 100,
    utilAreaHectares: 60,
    vegetationAreaHectares: 30,
  };

  beforeEach(() => {
    farmerRepository = {
      findOneByDocumentNumber: jest.fn(),
    } as any;

    farmRepository = {
      create: jest.fn(),
      findAllByFarmerDocument: jest.fn(),
      findOneById: jest.fn(),
    } as any;

    farmService = new FarmService(farmerRepository, farmRepository);
  });

  it('should return FarmerNotFound if farmer does not exist', async () => {
    farmerRepository.findOneByDocumentNumber.mockResolvedValue(null);

    const result = await farmService.create('12345678900', validCreateFarmDto);

    expect(result).toBeInstanceOf(FarmerNotFound);
    expect(farmerRepository.findOneByDocumentNumber).toHaveBeenCalledWith(
      '12345678900',
    );
  });

  it('should return AreaValuesInvalidError if area values are invalid', async () => {
    farmerRepository.findOneByDocumentNumber.mockResolvedValue(mockFarmer);

    const invalidDto = {
      ...validCreateFarmDto,
      utilAreaHectares: 60,
      vegetationAreaHectares: 50,
    };

    const result = await farmService.create('12345678900', invalidDto);

    expect(result).toBeInstanceOf(AreaValuesInvalidError);
    expect(farmRepository.create).not.toHaveBeenCalled();
  });

  it('should create and return a new farm if data is valid', async () => {
    farmerRepository.findOneByDocumentNumber.mockResolvedValue(mockFarmer);
    farmRepository.create.mockResolvedValue(mockFarm);

    const result = await farmService.create('12345678900', validCreateFarmDto);

    expect(farmerRepository.findOneByDocumentNumber).toHaveBeenCalledWith(
      '12345678900',
    );
    expect(farmRepository.create).toHaveBeenCalledWith(
      mockFarmer,
      validCreateFarmDto,
    );
    expect(result).toBe(mockFarm);
  });
});
