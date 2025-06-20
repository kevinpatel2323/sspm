/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/user-service/src/app.controller.ts":
/*!*************************************************!*\
  !*** ./apps/user-service/src/app.controller.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TestController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let TestController = class TestController {
};
exports.TestController = TestController;
exports.TestController = TestController = __decorate([
    (0, common_1.Controller)('test')
], TestController);


/***/ }),

/***/ "./apps/user-service/src/app.module.ts":
/*!*********************************************!*\
  !*** ./apps/user-service/src/app.module.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const user_module_1 = __webpack_require__(/*! ./modules/user/user.module */ "./apps/user-service/src/modules/user/user.module.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const path_1 = __webpack_require__(/*! path */ "path");
const database_module_1 = __webpack_require__(/*! ./modules/database/database.module */ "./apps/user-service/src/modules/database/database.module.ts");
const app_controller_1 = __webpack_require__(/*! ./app.controller */ "./apps/user-service/src/app.controller.ts");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: (0, path_1.join)(__dirname, './../../../.env'),
                cache: true,
                expandVariables: true,
            }),
            user_module_1.UserModule,
            database_module_1.DatabaseModule,
        ],
        controllers: [app_controller_1.TestController],
    })
], AppModule);


/***/ }),

/***/ "./apps/user-service/src/modules/database/database.module.ts":
/*!*******************************************************************!*\
  !*** ./apps/user-service/src/modules/database/database.module.ts ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DatabaseModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const database_service_1 = __webpack_require__(/*! ./database.service */ "./apps/user-service/src/modules/database/database.service.ts");
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
        ],
        providers: [database_service_1.DatabaseService],
        exports: [database_service_1.DatabaseService],
    })
], DatabaseModule);


/***/ }),

/***/ "./apps/user-service/src/modules/database/database.service.ts":
/*!********************************************************************!*\
  !*** ./apps/user-service/src/modules/database/database.service.ts ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var DatabaseService_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DatabaseService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const user_entity_1 = __webpack_require__(/*! ../../../../../libs/entity/user.entity */ "./libs/entity/user.entity.ts");
let DatabaseService = DatabaseService_1 = class DatabaseService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(DatabaseService_1.name);
        this.tenantConnections = new Map();
    }
    async getTenantConnection(tenantId, tenantDbName) {
        if (this.tenantConnections.has(tenantId)) {
            const connection = this.tenantConnections.get(tenantId);
            if (connection?.isInitialized) {
                return connection;
            }
        }
        const connection = new typeorm_1.DataSource({
            type: 'postgres',
            name: `tenant_${tenantId}`,
            host: this.configService.get('PG_HOST', 'localhost'),
            port: this.configService.get('PG_PORT', 5432),
            username: this.configService.get('PG_USER', 'postgres'),
            password: this.configService.get('PG_PASSWORD', '1234'),
            database: tenantDbName,
            entities: [user_entity_1.User],
            synchronize: true,
        });
        try {
            await connection.initialize();
            this.tenantConnections.set(tenantId, connection);
            this.logger.log(`Created new database connection for tenant ${tenantId}`);
            return connection;
        }
        catch (error) {
            this.logger.error(`Failed to create database connection for tenant ${tenantId}`, error);
            throw error;
        }
    }
    async onModuleDestroy() {
        for (const [tenantId, connection] of this.tenantConnections.entries()) {
            if (connection.isInitialized) {
                await connection.destroy();
                this.logger.log(`Closed database connection for tenant ${tenantId}`);
            }
        }
        this.tenantConnections.clear();
    }
};
exports.DatabaseService = DatabaseService;
exports.DatabaseService = DatabaseService = DatabaseService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], DatabaseService);


/***/ }),

/***/ "./apps/user-service/src/modules/user/user.controller.ts":
/*!***************************************************************!*\
  !*** ./apps/user-service/src/modules/user/user.controller.ts ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var UserController_1;
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const user_service_1 = __webpack_require__(/*! ./user.service */ "./apps/user-service/src/modules/user/user.service.ts");
const user_dto_1 = __webpack_require__(/*! @libs/dto/user.dto */ "./libs/dto/user.dto.ts");
let UserController = UserController_1 = class UserController {
    constructor(userService) {
        this.userService = userService;
        this.logger = new common_1.Logger(UserController_1.name);
    }
    getTenantInfo(metadata) {
        const tenantId = metadata.internalRepr.get('tenant-id')?.[0];
        const dbName = metadata.internalRepr.get('db-name')?.[0];
        if (!tenantId || !dbName) {
            throw new microservices_1.RpcException('Tenant ID and database name are required');
        }
        return { tenantId, dbName };
    }
    async create(createUserDto, metadata) {
        this.logger.log(`Received CreateUser request with data: ${JSON.stringify(createUserDto)}`);
        const { tenantId, dbName } = this.getTenantInfo(metadata);
        this.logger.log(`Tenant info - tenantId: ${tenantId}, dbName: ${dbName}`);
        const result = await this.userService.create(createUserDto, {
            tenantId,
            dbName,
        });
        this.logger.log(`User created successfully: ${JSON.stringify(result)}`);
        return result;
    }
    async findOne(data, metadata) {
        const { tenantId, dbName } = this.getTenantInfo(metadata);
        return this.userService.findOne(data.id, { tenantId, dbName });
    }
    async update(data, metadata) {
        const { tenantId, dbName } = this.getTenantInfo(metadata);
        const { id, ...updateUserDto } = data;
        const user = await this.userService.update(id, updateUserDto, {
            tenantId,
            dbName,
        });
        return user || null;
    }
    async remove(data, metadata) {
        const { tenantId, dbName } = this.getTenantInfo(metadata);
        await this.userService.remove(data.id, { tenantId, dbName });
        return { success: true };
    }
    async findAll(data, metadata) {
        const { tenantId, dbName } = this.getTenantInfo(metadata);
        return this.userService.findAll(data, { tenantId, dbName });
    }
    async findAllWithNameCount(data, metadata) {
        return {
            items: [
                {
                    name: 'jay',
                    characters: 3,
                    symbols: 5,
                },
            ],
            total: 10,
        };
    }
};
exports.UserController = UserController;
__decorate([
    (0, microservices_1.GrpcMethod)('UserService', 'CreateUser'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof user_dto_1.CreateUserDto !== "undefined" && user_dto_1.CreateUserDto) === "function" ? _b : Object, typeof (_c = typeof Record !== "undefined" && Record) === "function" ? _c : Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], UserController.prototype, "create", null);
__decorate([
    (0, microservices_1.GrpcMethod)('UserService', 'GetUser'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_e = typeof Record !== "undefined" && Record) === "function" ? _e : Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], UserController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.GrpcMethod)('UserService', 'UpdateUser'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_g = typeof Record !== "undefined" && Record) === "function" ? _g : Object]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], UserController.prototype, "update", null);
__decorate([
    (0, microservices_1.GrpcMethod)('UserService', 'DeleteUser'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_j = typeof Record !== "undefined" && Record) === "function" ? _j : Object]),
    __metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], UserController.prototype, "remove", null);
__decorate([
    (0, microservices_1.GrpcMethod)('UserService', 'ListUsers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_l = typeof Record !== "undefined" && Record) === "function" ? _l : Object]),
    __metadata("design:returntype", typeof (_m = typeof Promise !== "undefined" && Promise) === "function" ? _m : Object)
], UserController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.GrpcMethod)('UserService', 'ListUsersWithNameCount'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_o = typeof Record !== "undefined" && Record) === "function" ? _o : Object]),
    __metadata("design:returntype", typeof (_p = typeof Promise !== "undefined" && Promise) === "function" ? _p : Object)
], UserController.prototype, "findAllWithNameCount", null);
exports.UserController = UserController = UserController_1 = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _a : Object])
], UserController);


/***/ }),

/***/ "./apps/user-service/src/modules/user/user.module.ts":
/*!***********************************************************!*\
  !*** ./apps/user-service/src/modules/user/user.module.ts ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const user_service_1 = __webpack_require__(/*! ./user.service */ "./apps/user-service/src/modules/user/user.service.ts");
const user_controller_1 = __webpack_require__(/*! ./user.controller */ "./apps/user-service/src/modules/user/user.controller.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const path_1 = __webpack_require__(/*! path */ "path");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            microservices_1.ClientsModule.registerAsync([
                {
                    name: 'USER_PACKAGE',
                    imports: [config_1.ConfigModule],
                    useFactory: (configService) => {
                        const isDocker = process.env.NODE_ENV === 'production';
                        const serviceUrl = isDocker ? 'user-service:5001' : 'localhost:5001';
                        return {
                            transport: microservices_1.Transport.GRPC,
                            options: {
                                package: configService.get('USER_SERVICE_PKG', 'user'),
                                protoPath: (0, path_1.join)(__dirname, '../../../libs/proto/user.proto'),
                                url: configService.get('USER_SERVICE_URL', serviceUrl),
                            },
                        };
                    },
                    inject: [config_1.ConfigService],
                },
            ]),
        ],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService],
        exports: [user_service_1.UserService],
    })
], UserModule);


/***/ }),

/***/ "./apps/user-service/src/modules/user/user.service.ts":
/*!************************************************************!*\
  !*** ./apps/user-service/src/modules/user/user.service.ts ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var UserService_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const user_entity_1 = __webpack_require__(/*! ../../../../../libs/entity/user.entity */ "./libs/entity/user.entity.ts");
const database_service_1 = __webpack_require__(/*! ../database/database.service */ "./apps/user-service/src/modules/database/database.service.ts");
const grpc_base_exception_1 = __webpack_require__(/*! ../../../../../libs/exceptions/grpc-base.exception */ "./libs/exceptions/grpc-base.exception.ts");
let UserService = UserService_1 = class UserService {
    constructor(databaseService) {
        this.databaseService = databaseService;
        this.logger = new common_1.Logger(UserService_1.name);
        this.MODULE_NAME = 'user';
    }
    async create(createUserDto, dbOptions) {
        try {
            this.logger.log(`Creating user with data: ${JSON.stringify(createUserDto)} for tenant: ${dbOptions.tenantId}`);
            const connection = await this.databaseService.getTenantConnection(dbOptions.tenantId, dbOptions.dbName);
            const userRepository = connection.getRepository(user_entity_1.User);
            const user = userRepository.create({
                ...createUserDto,
                ...(createUserDto.id ? { id: createUserDto.id } : {}),
            });
            const savedUser = await userRepository.save(user);
            this.logger.log(`User created successfully: ${JSON.stringify(savedUser)}`);
            return savedUser;
        }
        catch (error) {
            this.logger.error(`Failed to create user: ${error.message}`, error.stack);
            throw new grpc_base_exception_1.ResourceInternalException('Failed to create user', this.MODULE_NAME);
        }
    }
    async findAll(options, dbOptions) {
        try {
            const connection = await this.databaseService.getTenantConnection(dbOptions.tenantId, dbOptions.dbName);
            const userRepository = connection.getRepository(user_entity_1.User);
            const queryBuilder = userRepository.createQueryBuilder('user');
            if (options.search) {
                queryBuilder.where('user.name ILIKE :search OR user.email ILIKE :search', {
                    search: `%${options.search}%`,
                });
            }
            if (options.sort) {
                const order = options.order?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
                queryBuilder.orderBy(`user.${options.sort}`, order);
            }
            else {
                queryBuilder.orderBy('user.createdAt', 'DESC');
            }
            if (options.page && options.limit) {
                const skip = (options.page - 1) * options.limit;
                queryBuilder.skip(skip).take(options.limit);
            }
            const [items, total] = await queryBuilder.getManyAndCount();
            return {
                items,
                total,
                page: options.page || 1,
                limit: options.limit || total,
                results: items.length,
            };
        }
        catch (error) {
            if (error instanceof grpc_base_exception_1.ResourceNotFoundException) {
                throw error;
            }
            throw new grpc_base_exception_1.ResourceInternalException(`Failed to fetch users: ${error.message}`, this.MODULE_NAME);
        }
    }
    async findOne(id, dbOptions) {
        try {
            const connection = await this.databaseService.getTenantConnection(dbOptions.tenantId, dbOptions.dbName);
            const userRepository = connection.getRepository(user_entity_1.User);
            const user = await userRepository.findOne({ where: { id } });
            if (!user) {
                throw new grpc_base_exception_1.ResourceNotFoundException('User', id, this.MODULE_NAME);
            }
            return user;
        }
        catch (error) {
            if (error instanceof grpc_base_exception_1.ResourceNotFoundException) {
                throw error;
            }
            throw new grpc_base_exception_1.ResourceInternalException(`Failed to fetch user: ${error.message}`, this.MODULE_NAME);
        }
    }
    async update(id, updateUserDto, dbOptions) {
        try {
            const user = await this.findOne(id, dbOptions);
            if (!user) {
                throw new grpc_base_exception_1.ResourceNotFoundException('User', id, this.MODULE_NAME);
            }
            const updatedUser = {
                ...user,
                ...updateUserDto,
                updatedAt: new Date(),
            };
            const connection = await this.databaseService.getTenantConnection(dbOptions.tenantId, dbOptions.dbName);
            const userRepository = connection.getRepository(user_entity_1.User);
            await userRepository.save(updatedUser);
            return updatedUser;
        }
        catch (error) {
            if (error instanceof grpc_base_exception_1.ResourceNotFoundException) {
                throw error;
            }
            throw new grpc_base_exception_1.ResourceInternalException('Failed to update user', this.MODULE_NAME);
        }
    }
    async remove(id, dbOptions) {
        try {
            const user = await this.findOne(id, dbOptions);
            if (!user) {
                throw new grpc_base_exception_1.ResourceNotFoundException('User', id, this.MODULE_NAME);
            }
            const connection = await this.databaseService.getTenantConnection(dbOptions.tenantId, dbOptions.dbName);
            const userRepository = connection.getRepository(user_entity_1.User);
            await userRepository.remove(user);
        }
        catch (error) {
            if (error instanceof grpc_base_exception_1.ResourceNotFoundException) {
                throw error;
            }
            throw new grpc_base_exception_1.ResourceInternalException('Failed to delete user', this.MODULE_NAME);
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = UserService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof database_service_1.DatabaseService !== "undefined" && database_service_1.DatabaseService) === "function" ? _a : Object])
], UserService);


/***/ }),

/***/ "./libs/dto/user.dto.ts":
/*!******************************!*\
  !*** ./libs/dto/user.dto.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateUserDto = exports.CreateUserDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class CreateUserDto {
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The id of the user (optional, for external systems like Cognito)',
        example: 'cognito-abc123',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The email of the user',
        example: 'user@example.com',
    }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The name of the user',
        example: 'John Doe',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
class UpdateUserDto {
}
exports.UpdateUserDto = UpdateUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The email of the user',
        example: 'user@example.com',
        required: false,
    }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The name of the user',
        example: 'John Doe',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "name", void 0);


/***/ }),

/***/ "./libs/entity/user.entity.ts":
/*!************************************!*\
  !*** ./libs/entity/user.entity.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
let User = class User {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'email', unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'name' }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], User.prototype, "updatedAt", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('users')
], User);


/***/ }),

/***/ "./libs/exceptions/grpc-base.exception.ts":
/*!************************************************!*\
  !*** ./libs/exceptions/grpc-base.exception.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResourceInternalException = exports.ResourceUnauthenticatedException = exports.ResourcePermissionDeniedException = exports.ResourceAlreadyExistsException = exports.ResourceValidationException = exports.ResourceNotFoundException = exports.GrpcBaseException = exports.ErrorCode = void 0;
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["VALIDATION_ERROR"] = 3] = "VALIDATION_ERROR";
    ErrorCode[ErrorCode["NOT_FOUND"] = 5] = "NOT_FOUND";
    ErrorCode[ErrorCode["ALREADY_EXISTS"] = 6] = "ALREADY_EXISTS";
    ErrorCode[ErrorCode["PERMISSION_DENIED"] = 7] = "PERMISSION_DENIED";
    ErrorCode[ErrorCode["UNAUTHENTICATED"] = 16] = "UNAUTHENTICATED";
    ErrorCode[ErrorCode["INTERNAL_ERROR"] = 13] = "INTERNAL_ERROR";
})(ErrorCode || (exports.ErrorCode = ErrorCode = {}));
class GrpcBaseException extends microservices_1.RpcException {
    constructor(message, code = ErrorCode.INTERNAL_ERROR, module = 'unknown') {
        super({
            message,
            code,
            module,
        });
    }
}
exports.GrpcBaseException = GrpcBaseException;
class ResourceNotFoundException extends GrpcBaseException {
    constructor(resource, id, module) {
        super(`${resource} with ID ${id} not found`, ErrorCode.NOT_FOUND, module);
    }
}
exports.ResourceNotFoundException = ResourceNotFoundException;
class ResourceValidationException extends GrpcBaseException {
    constructor(message, module) {
        super(message, ErrorCode.VALIDATION_ERROR, module);
    }
}
exports.ResourceValidationException = ResourceValidationException;
class ResourceAlreadyExistsException extends GrpcBaseException {
    constructor(resource, identifier, module) {
        super(`${resource} with ${identifier} already exists`, ErrorCode.ALREADY_EXISTS, module);
    }
}
exports.ResourceAlreadyExistsException = ResourceAlreadyExistsException;
class ResourcePermissionDeniedException extends GrpcBaseException {
    constructor(message, module) {
        super(message, ErrorCode.PERMISSION_DENIED, module);
    }
}
exports.ResourcePermissionDeniedException = ResourcePermissionDeniedException;
class ResourceUnauthenticatedException extends GrpcBaseException {
    constructor(message = 'Unauthenticated', module) {
        super(message, ErrorCode.UNAUTHENTICATED, module);
    }
}
exports.ResourceUnauthenticatedException = ResourceUnauthenticatedException;
class ResourceInternalException extends GrpcBaseException {
    constructor(message, module) {
        super(message, ErrorCode.INTERNAL_ERROR, module);
    }
}
exports.ResourceInternalException = ResourceInternalException;


/***/ }),

/***/ "./libs/filters/grpc-exception.filter.ts":
/*!***********************************************!*\
  !*** ./libs/filters/grpc-exception.filter.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var GrpcExceptionFilter_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GrpcExceptionFilter = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const common_2 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let GrpcExceptionFilter = GrpcExceptionFilter_1 = class GrpcExceptionFilter {
    constructor(serviceName) {
        this.logger = new common_2.Logger(GrpcExceptionFilter_1.name);
        this.serviceName = serviceName || 'unknown-service';
    }
    catch(exception, host) {
        const error = exception.getError();
        const module = error.module || 'unknown';
        this.logger.debug(`[${module}] Exception: ${error.message}`);
        if (error.code === 3) {
            const validationErrors = JSON.parse(error.message);
            return (0, rxjs_1.throwError)(() => ({
                status: 'error',
                code: error.code,
                details: JSON.stringify({
                    message: 'Validation failed',
                    module: module,
                    service: this.serviceName,
                    errors: validationErrors,
                    timestamp: new Date().toISOString(),
                }),
            }));
        }
        return (0, rxjs_1.throwError)(() => ({
            status: 'error',
            code: error.code || 13,
            details: JSON.stringify({
                message: error.message,
                module: module,
                service: this.serviceName,
                timestamp: new Date().toISOString(),
            }),
        }));
    }
};
exports.GrpcExceptionFilter = GrpcExceptionFilter;
exports.GrpcExceptionFilter = GrpcExceptionFilter = GrpcExceptionFilter_1 = __decorate([
    (0, common_1.Catch)(microservices_1.RpcException),
    __metadata("design:paramtypes", [String])
], GrpcExceptionFilter);


/***/ }),

/***/ "./libs/pipes/validation.pipe.ts":
/*!***************************************!*\
  !*** ./libs/pipes/validation.pipe.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DtoValidationPipe = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const grpc_base_exception_1 = __webpack_require__(/*! ../exceptions/grpc-base.exception */ "./libs/exceptions/grpc-base.exception.ts");
let DtoValidationPipe = class DtoValidationPipe {
    async transform(value, { metatype }) {
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const object = (0, class_transformer_1.plainToClass)(metatype, value);
        const errors = await (0, class_validator_1.validate)(object);
        if (errors.length > 0) {
            const formattedErrors = errors.map((error) => ({
                property: error.property,
                constraints: error.constraints,
            }));
            throw new grpc_base_exception_1.ResourceValidationException(JSON.stringify(formattedErrors), 'user');
        }
        return object;
    }
    toValidate(metatype) {
        const types = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
};
exports.DtoValidationPipe = DtoValidationPipe;
exports.DtoValidationPipe = DtoValidationPipe = __decorate([
    (0, common_1.Injectable)()
], DtoValidationPipe);


/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/config":
/*!*********************************!*\
  !*** external "@nestjs/config" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/microservices":
/*!****************************************!*\
  !*** external "@nestjs/microservices" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),

/***/ "@nestjs/swagger":
/*!**********************************!*\
  !*** external "@nestjs/swagger" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),

/***/ "class-transformer":
/*!************************************!*\
  !*** external "class-transformer" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),

/***/ "class-validator":
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),

/***/ "dotenv/config":
/*!********************************!*\
  !*** external "dotenv/config" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("dotenv/config");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "rxjs":
/*!***********************!*\
  !*** external "rxjs" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("rxjs");

/***/ }),

/***/ "typeorm":
/*!**************************!*\
  !*** external "typeorm" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("typeorm");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!***************************************!*\
  !*** ./apps/user-service/src/main.ts ***!
  \***************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! dotenv/config */ "dotenv/config");
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const path_1 = __webpack_require__(/*! path */ "path");
const app_module_1 = __webpack_require__(/*! ./app.module */ "./apps/user-service/src/app.module.ts");
const grpc_exception_filter_1 = __webpack_require__(/*! ../../../libs/filters/grpc-exception.filter */ "./libs/filters/grpc-exception.filter.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const validation_pipe_1 = __webpack_require__(/*! ../../../libs/pipes/validation.pipe */ "./libs/pipes/validation.pipe.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
async function bootstrap() {
    const isDocker = process.env.NODE_ENV === 'production';
    const app = await core_1.NestFactory.createMicroservice(app_module_1.AppModule, {
        transport: microservices_1.Transport.GRPC,
        options: {
            package: process.env.USER_SERVICE_PKG || 'user',
            protoPath: (0, path_1.join)(__dirname, '../../../libs/proto/user.proto'),
            url: process.env.USER_SERVICE_URL || 'localhost:5001',
        },
    });
    const logger = new common_1.Logger('Bootstrap');
    const configService = app.get(config_1.ConfigService);
    const serviceUrl = configService.get('USER_SERVICE_URL', 'localhost:5001');
    const port = serviceUrl.split(':')[1] || '5001';
    const serviceName = configService.get('USER_SERVICE_PKG', 'user');
    app.useGlobalPipes(new validation_pipe_1.DtoValidationPipe());
    app.useGlobalFilters(new grpc_exception_filter_1.GrpcExceptionFilter(serviceName));
    await app.listen();
    logger.log(`User Service is running on ${serviceUrl}`);
}
bootstrap();

})();

/******/ })()
;