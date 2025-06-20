import { Injectable, Logger, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import { Tenant } from './tenant.entity';
import { CreateTenantDto } from './tenant.dto';
// import { DatabaseService } from '../database/database.service';
// import { KmsService } from '../services/kms.service';

@Injectable()
export class TenantService {
  private tenantConnections = new Map<string, DataSource>();
  private readonly logger = new Logger(TenantService.name);

  constructor(
    @InjectRepository(Tenant, 'central_db')
    private tenantRepository: Repository<Tenant>,
    private configService: ConfigService,
    // private databaseService: DatabaseService,
    // private kmsService: KmsService
  ) {}

  async findAll(): Promise<Tenant[]> {
    return this.tenantRepository.find({
      select: ['id', 'name', 'dbName', 'createdAt', 'active'],
    });
  }

  async findById(id: string): Promise<Tenant | null> {
    // console.log( {id: `${id}`})

    const data = await this.tenantRepository.findOne({
      where: { id },
    });
    // console.log('data--->', data)
    return data;
  }

  async create(createTenantDto: CreateTenantDto): Promise<Tenant> {
    // Generate tenant database name
    const dbName = `tenant_${createTenantDto.name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '_')}_${Date.now()}`;

    // Create tenant record
    const tenant = new Tenant();
    tenant.id = uuidv4();
    tenant.name = createTenantDto.name;
    tenant.dbName = dbName;
    tenant.dbHost = this.configService.get<string>('PG_HOST', 'localhost');
    tenant.dbPort = this.configService.get<number>('PG_PORT', 5432);
    tenant.dbUser = this.configService.get<string>('PG_USER', 'postgres');
    tenant.dbPassword = this.configService.get<string>('PG_PASSWORD', '1234');

    console.log(tenant);

    // todo: Encrypt database credentials before saving
    // tenant.dbUser = await this.kmsService.encrypt(this.configService.get<string>('PG_USER', 'postgres'));
    // tenant.dbPassword = await this.kmsService.encrypt(this.configService.get<string>('PG_PASSWORD', 'postgres'));

    // Create the physical database
    await this.createTenantDatabase(tenant);

    //  // Initialize database schema
    //  await this.initializeTenantSchema(tenant);

    // Save tenant in central database
    const savedTenant = await this.tenantRepository.save(tenant);

    return savedTenant;
  }

  private async createTenantDatabase(tenant: Tenant): Promise<void> {
    // Connect to postgres database to create a new database
    const pgConnection = new DataSource({
      type: 'postgres',
      host: tenant.dbHost,
      port: tenant.dbPort,
      username: tenant.dbUser,
      password: tenant.dbPassword,
      database: 'postgres', // Default postgres database
    });

    console.log({
      type: 'postgres',
      host: tenant.dbHost,
      port: tenant.dbPort,
      username: tenant.dbUser,
      password: tenant.dbPassword,
      database: 'postgres', // Default postgres database
    });

    await pgConnection.initialize();

    console.log('pgConnection initialized...');

    try {
      // Create the tenant database
      await pgConnection.query(`CREATE DATABASE ${tenant.dbName}`);
      this.logger.log(`Created database ${tenant.dbName}`);
    } catch (error) {
      this.logger.error(`Failed to create database ${tenant.dbName}`, error);
      throw error;
    } finally {
      await pgConnection.destroy();
    }
  }

  // private async initializeTenantSchema(tenant: Tenant): Promise<void> {
  //   try {
  //     // Get connection to tenant database
  //     const connection = await this.databaseService.getConnectionForTenant(tenant.id);

  //     // Synchronize schema
  //     await connection.synchronize();

  //     this.logger.log(`Initialized schema for tenant ${tenant.name}`);
  //   } catch (error) {
  //     this.logger.error(`Failed to initialize schema for tenant ${tenant.name}`, error);
  //     throw error;
  //   }
  // }

  async update(id: string, tenant: Partial<Tenant>): Promise<Tenant | null> {
    // todo: If credentials are being updated, encrypt them
    // if (tenant.dbUser) {
    //   tenant.dbUser = await this.kmsService.encrypt(tenant.dbUser);
    // }
    // if (tenant.dbPassword) {
    //   tenant.dbPassword = await this.kmsService.encrypt(tenant.dbPassword);
    // }

    await this.tenantRepository.update(id, tenant);
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.tenantRepository.delete(id);
  }
}
