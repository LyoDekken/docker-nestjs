import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    app = module.createNestApplication();
    prismaService = module.get<PrismaService>(PrismaService);

    await prismaService.enableShutdownHooks(app);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should connect to the database', async () => {
    expect(prismaService.$connect).toHaveBeenCalled();
  });

  it('should call onModuleInit', () => {
    expect(prismaService.onModuleInit).toHaveBeenCalled();
  });
});
