/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/api-gateway/src/app.controller.ts":
/*!************************************************!*\
  !*** ./apps/api-gateway/src/app.controller.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let AppController = class AppController {
};
exports.AppController = AppController;
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)('api')
], AppController);


/***/ }),

/***/ "./apps/api-gateway/src/app.module.ts":
/*!********************************************!*\
  !*** ./apps/api-gateway/src/app.module.ts ***!
  \********************************************/
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
exports.AppModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const app_controller_1 = __webpack_require__(/*! ./app.controller */ "./apps/api-gateway/src/app.controller.ts");
const user_module_1 = __webpack_require__(/*! ./modules/user/user.module */ "./apps/api-gateway/src/modules/user/user.module.ts");
const tenant_module_1 = __webpack_require__(/*! ./modules/tenant/tenant.module */ "./apps/api-gateway/src/modules/tenant/tenant.module.ts");
const tenant_entity_1 = __webpack_require__(/*! ./modules/tenant/tenant.entity */ "./apps/api-gateway/src/modules/tenant/tenant.entity.ts");
const user_tenant_map_entity_1 = __webpack_require__(/*! ./modules/user-tenant-map/user-tenant-map.entity */ "./apps/api-gateway/src/modules/user-tenant-map/user-tenant-map.entity.ts");
const path_1 = __webpack_require__(/*! path */ "path");
const throttler_1 = __webpack_require__(/*! @nestjs/throttler */ "@nestjs/throttler");
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const auth_module_1 = __webpack_require__(/*! ./modules/auth/auth.module */ "./apps/api-gateway/src/modules/auth/auth.module.ts");
const rbac_module_1 = __webpack_require__(/*! ./modules/rbac/rbac.module */ "./apps/api-gateway/src/modules/rbac/rbac.module.ts");
const utils_module_1 = __webpack_require__(/*! ./modules/utils/utils.module */ "./apps/api-gateway/src/modules/utils/utils.module.ts");
const ioredis_1 = __webpack_require__(/*! @nestjs-modules/ioredis */ "@nestjs-modules/ioredis");
const cognito_module_1 = __webpack_require__(/*! ./modules/cognito/cognito.module */ "./apps/api-gateway/src/modules/cognito/cognito.module.ts");
const user_tenant_map_module_1 = __webpack_require__(/*! ./modules/user-tenant-map/user-tenant-map.module */ "./apps/api-gateway/src/modules/user-tenant-map/user-tenant-map.module.ts");
const invitation_module_1 = __webpack_require__(/*! ./modules/invitation/invitation.module */ "./apps/api-gateway/src/modules/invitation/invitation.module.ts");
const invitation_entity_1 = __webpack_require__(/*! @libs/entity/invitation.entity */ "./libs/entity/invitation.entity.ts");
let AppModule = class AppModule {
    constructor() {
        console.log({
            PG_HOST: process.env.PG_HOST,
            PG_PORT: process.env.PG_PORT,
            PG_USER: process.env.PG_USER,
            PG_PASSWORD: process.env.PG_PASSWORD,
            PG_MANAGEMENT_DB: process.env.PG_MANAGEMENT_DB,
        });
    }
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
            throttler_1.ThrottlerModule.forRoot([
                {
                    ttl: 60000,
                    limit: 10,
                },
            ]),
            typeorm_1.TypeOrmModule.forRoot({
                name: 'central_db',
                type: 'postgres',
                host: process.env.PG_HOST || 'localhost',
                port: process.env.PG_PORT
                    ? parseInt(process.env.PG_PORT)
                    : parseInt(process.env.PG_PORT || '5433'),
                username: process.env.PG_USER || 'postgres',
                password: process.env.PG_PASSWORD || 'postgres',
                database: process.env.PG_MANAGEMENT_DB || 'sspm_central_db',
                entities: [tenant_entity_1.Tenant, user_tenant_map_entity_1.UserTenantMap, invitation_entity_1.Invitation],
                synchronize: true,
            }),
            ioredis_1.RedisModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    type: 'single',
                    url: `redis://${configService.get('REDIS_HOST', 'localhost')}:${configService.get('REDIS_PORT', 6379)}`,
                }),
            }),
            utils_module_1.UtilsModule,
            auth_module_1.AuthModule,
            rbac_module_1.RbacModule,
            user_module_1.UserModule,
            tenant_module_1.TenantModule,
            cognito_module_1.CognitoModule,
            user_tenant_map_module_1.UserTenantMapModule,
            invitation_module_1.InvitationModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
        ],
    }),
    __metadata("design:paramtypes", [])
], AppModule);


/***/ }),

/***/ "./apps/api-gateway/src/decorators/roles.decorator.ts":
/*!************************************************************!*\
  !*** ./apps/api-gateway/src/decorators/roles.decorator.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Roles = exports.ROLES_KEY = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
exports.ROLES_KEY = 'roles';
const Roles = (...roles) => (0, common_1.SetMetadata)(exports.ROLES_KEY, roles);
exports.Roles = Roles;


/***/ }),

/***/ "./apps/api-gateway/src/filters/global-exception.filter.ts":
/*!*****************************************************************!*\
  !*** ./apps/api-gateway/src/filters/global-exception.filter.ts ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var GlobalExceptionFilter_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GlobalExceptionFilter = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let GlobalExceptionFilter = GlobalExceptionFilter_1 = class GlobalExceptionFilter {
    constructor() {
        this.logger = new common_1.Logger(GlobalExceptionFilter_1.name);
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const error = exception.getError?.() || exception;
        const errorResponse = {
            status: 'error',
            message: 'Internal server error',
            timestamp: new Date().toISOString(),
            path: request.url,
        };
        if (error &&
            typeof error === 'object' &&
            'code' in error &&
            'message' in error) {
            if (error.code === 3) {
                const details = JSON.parse(error.details);
                return response.status(common_1.HttpStatus.BAD_REQUEST).json({
                    ...errorResponse,
                    ...details,
                    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
                });
            }
            const status = this.getHttpStatus(error.code);
            try {
                const details = JSON.parse(error.details);
                return response.status(status).json({
                    ...errorResponse,
                    ...details,
                    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
                });
            }
            catch {
                return response.status(status).json({
                    ...errorResponse,
                    message: error.details,
                    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
                });
            }
        }
        return response
            .status(error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR)
            .json({
            ...errorResponse,
            message: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
        });
    }
    getHttpStatus(code) {
        switch (code) {
            case 3:
                return common_1.HttpStatus.BAD_REQUEST;
            case 5:
                return common_1.HttpStatus.NOT_FOUND;
            case 7:
                return common_1.HttpStatus.FORBIDDEN;
            case 16:
                return common_1.HttpStatus.UNAUTHORIZED;
            default:
                return common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }
};
exports.GlobalExceptionFilter = GlobalExceptionFilter;
exports.GlobalExceptionFilter = GlobalExceptionFilter = GlobalExceptionFilter_1 = __decorate([
    (0, common_1.Catch)()
], GlobalExceptionFilter);


/***/ }),

/***/ "./apps/api-gateway/src/filters/throttler-exception.filter.ts":
/*!********************************************************************!*\
  !*** ./apps/api-gateway/src/filters/throttler-exception.filter.ts ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ThrottlerExceptionFilter = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const throttler_1 = __webpack_require__(/*! @nestjs/throttler */ "@nestjs/throttler");
let ThrottlerExceptionFilter = class ThrottlerExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = common_1.HttpStatus.TOO_MANY_REQUESTS;
        response.status(status).json({
            status: 'error',
            message: 'Rate limit exceeded. Please try again later.',
            timestamp: new Date().toISOString(),
        });
    }
};
exports.ThrottlerExceptionFilter = ThrottlerExceptionFilter;
exports.ThrottlerExceptionFilter = ThrottlerExceptionFilter = __decorate([
    (0, common_1.Catch)(throttler_1.ThrottlerException)
], ThrottlerExceptionFilter);


/***/ }),

/***/ "./apps/api-gateway/src/guards/jwt/jwt.guard.ts":
/*!******************************************************!*\
  !*** ./apps/api-gateway/src/guards/jwt/jwt.guard.ts ***!
  \******************************************************/
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
exports.JwtGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const jsonwebtoken_1 = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
const jwkToPem = __webpack_require__(/*! jwk-to-pem */ "jwk-to-pem");
const axios_1 = __webpack_require__(/*! axios */ "axios");
const token_revocation_service_1 = __webpack_require__(/*! ../../modules/utils/token.revocation.service */ "./apps/api-gateway/src/modules/utils/token.revocation.service.ts");
let JwtGuard = class JwtGuard {
    constructor(configService, tokenRevocationService) {
        this.configService = configService;
        this.tokenRevocationService = tokenRevocationService;
        const userPoolId = this.configService.get('AWS_COGNITO_USER_POOL_ID');
        const region = this.configService.get('AWS_REGION');
        this.cognitoIssuer = `https://cognito-idp.${region}.amazonaws.com/${userPoolId}`;
        this.loadJwks();
    }
    extractTokenFromHeader(request) {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
    async loadJwks() {
        try {
            const response = await axios_1.default.get(`${this.cognitoIssuer}/.well-known/jwks.json`);
            this.jwks = response.data.keys;
        }
        catch (error) {
            console.error('Failed to load JWKS:', error);
        }
    }
    getPublicKey(kid) {
        const key = this.jwks.find((k) => k.kid === kid);
        if (!key) {
            throw new common_1.UnauthorizedException('Invalid token');
        }
        return jwkToPem(key);
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new common_1.UnauthorizedException('No token provided');
        }
        const isRevoked = await this.tokenRevocationService.isTokenRevoked(token);
        if (isRevoked) {
            throw new common_1.UnauthorizedException('Session expired, Login again');
        }
        try {
            const header = JSON.parse(Buffer.from(token.split('.')[0], 'base64').toString());
            const publicKey = this.getPublicKey(header.kid);
            const payload = (0, jsonwebtoken_1.verify)(token, publicKey, {
                issuer: this.cognitoIssuer,
                algorithms: ['RS256'],
            });
            request['user'] = payload;
            return true;
        }
        catch (error) {
            console.log(error);
            throw new common_1.UnauthorizedException('Invalid token');
        }
    }
};
exports.JwtGuard = JwtGuard;
exports.JwtGuard = JwtGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, typeof (_b = typeof token_revocation_service_1.TokenRevocationService !== "undefined" && token_revocation_service_1.TokenRevocationService) === "function" ? _b : Object])
], JwtGuard);


/***/ }),

/***/ "./apps/api-gateway/src/guards/roles/roles.guard.ts":
/*!**********************************************************!*\
  !*** ./apps/api-gateway/src/guards/roles/roles.guard.ts ***!
  \**********************************************************/
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RolesGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
let RolesGuard = class RolesGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const handlerRoles = this.reflector.get('roles', context.getHandler()) || [];
        const classRoles = this.reflector.get('roles', context.getClass()) || [];
        const requiredRoles = [...new Set([...classRoles, ...handlerRoles])];
        if (requiredRoles.length === 0) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request['user'];
        if (!user) {
            return false;
        }
        const userRoles = user['cognito:groups'] || [];
        const hasRequiredRole = requiredRoles.some((role) => userRoles.includes(role));
        if (!hasRequiredRole) {
            throw new common_1.ForbiddenException('Insufficient permissions');
        }
        return true;
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object])
], RolesGuard);


/***/ }),

/***/ "./apps/api-gateway/src/modules/auth/auth.controller.ts":
/*!**************************************************************!*\
  !*** ./apps/api-gateway/src/modules/auth/auth.controller.ts ***!
  \**************************************************************/
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const auth_dto_1 = __webpack_require__(/*! ./dto/auth-dto */ "./apps/api-gateway/src/modules/auth/dto/auth-dto.ts");
const auth_service_1 = __webpack_require__(/*! ./auth.service */ "./apps/api-gateway/src/modules/auth/auth.service.ts");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async signUp(signUpDto) {
        return this.authService.signUp(signUpDto.email, signUpDto.password, signUpDto.name, signUpDto.tenantId, signUpDto.role);
    }
    async signIn(signInDto) {
        return this.authService.signIn(signInDto.email, signInDto.password);
    }
    async verifyMFASetup(verifyMFASetupDto) {
        return this.authService.verifyMFASetup(verifyMFASetupDto.session, verifyMFASetupDto.totpCode, verifyMFASetupDto.email);
    }
    async verifyMFA(verifyMFADto) {
        return this.authService.verifyMFA(verifyMFADto.session, verifyMFADto.totpCode, verifyMFADto.email);
    }
    async globalSignOut(globalSignOutDto) {
        return this.authService.globalSignOut(globalSignOutDto);
    }
    async refreshToken(refreshTokenDto) {
        return this.authService.refreshToken(refreshTokenDto.refreshToken);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof auth_dto_1.SignUpDto !== "undefined" && auth_dto_1.SignUpDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, common_1.Post)('signin'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof auth_dto_1.SignInDto !== "undefined" && auth_dto_1.SignInDto) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, common_1.Post)('verify-mfa-setup'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof auth_dto_1.VerifyMFASetupDto !== "undefined" && auth_dto_1.VerifyMFASetupDto) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyMFASetup", null);
__decorate([
    (0, common_1.Post)('verify-mfa'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof auth_dto_1.VerifyMFADto !== "undefined" && auth_dto_1.VerifyMFADto) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyMFA", null);
__decorate([
    (0, common_1.Post)('global-signout'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof auth_dto_1.GlobalSignOutDto !== "undefined" && auth_dto_1.GlobalSignOutDto) === "function" ? _f : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "globalSignOut", null);
__decorate([
    (0, common_1.Post)('refresh-token'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof auth_dto_1.RefreshTokenDto !== "undefined" && auth_dto_1.RefreshTokenDto) === "function" ? _g : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], AuthController);


/***/ }),

/***/ "./apps/api-gateway/src/modules/auth/auth.module.ts":
/*!**********************************************************!*\
  !*** ./apps/api-gateway/src/modules/auth/auth.module.ts ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const auth_controller_1 = __webpack_require__(/*! ./auth.controller */ "./apps/api-gateway/src/modules/auth/auth.controller.ts");
const auth_service_1 = __webpack_require__(/*! ./auth.service */ "./apps/api-gateway/src/modules/auth/auth.service.ts");
const cognito_service_1 = __webpack_require__(/*! ../cognito/cognito.service */ "./apps/api-gateway/src/modules/cognito/cognito.service.ts");
const rbac_module_1 = __webpack_require__(/*! ../rbac/rbac.module */ "./apps/api-gateway/src/modules/rbac/rbac.module.ts");
const user_tenant_map_module_1 = __webpack_require__(/*! ../user-tenant-map/user-tenant-map.module */ "./apps/api-gateway/src/modules/user-tenant-map/user-tenant-map.module.ts");
const user_module_1 = __webpack_require__(/*! ../user/user.module */ "./apps/api-gateway/src/modules/user/user.module.ts");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [rbac_module_1.RbacModule, user_tenant_map_module_1.UserTenantMapModule, user_module_1.UserModule],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, cognito_service_1.CognitoService],
    })
], AuthModule);


/***/ }),

/***/ "./apps/api-gateway/src/modules/auth/auth.service.ts":
/*!***********************************************************!*\
  !*** ./apps/api-gateway/src/modules/auth/auth.service.ts ***!
  \***********************************************************/
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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const cognito_service_1 = __webpack_require__(/*! ../cognito/cognito.service */ "./apps/api-gateway/src/modules/cognito/cognito.service.ts");
const rbac_service_1 = __webpack_require__(/*! ./../rbac/rbac.service */ "./apps/api-gateway/src/modules/rbac/rbac.service.ts");
const user_tenant_map_service_1 = __webpack_require__(/*! ../user-tenant-map/user-tenant-map.service */ "./apps/api-gateway/src/modules/user-tenant-map/user-tenant-map.service.ts");
const user_service_1 = __webpack_require__(/*! ../user/user.service */ "./apps/api-gateway/src/modules/user/user.service.ts");
let AuthService = class AuthService {
    constructor(cognitoService, rbacService, userTenantMapService, userService) {
        this.cognitoService = cognitoService;
        this.rbacService = rbacService;
        this.userTenantMapService = userTenantMapService;
        this.userService = userService;
    }
    async signUp(email, password, name, tenantId, role) {
        return this.cognitoService.signUp(email, password, name, tenantId);
    }
    async signIn(email, password) {
        return this.cognitoService.signIn(email, password);
    }
    async verifyMFASetup(session, totpCode, email) {
        const result = await this.cognitoService.verifyMFASetup(session, totpCode, email);
        const userId = result.userId;
        const tenantId = result.tenantId;
        const userName = result.userName;
        delete result.userId;
        delete result.tenantId;
        delete result.userName;
        if (userId && tenantId) {
            try {
                await this.userTenantMapService.createUserTenantMapping(tenantId, userId);
                console.log(`✅ User-tenant mapping created for userId: ${userId}, tenantId: ${tenantId}`);
            }
            catch (error) {
                console.error('❌ Failed to create user-tenant mapping:', error);
            }
        }
        try {
            await this.assignDefaultRole(email);
            console.log(`✅ Default role assigned to user: ${email}`);
        }
        catch (error) {
            console.error('❌ Failed to assign default role:', error);
        }
        if (userId && tenantId) {
            try {
                const userData = {
                    id: userId,
                    email: email,
                    name: userName || email.split('@')[0],
                };
                console.log(`🔍 About to call userService.create with data:`, userData, `tenantId:`, tenantId);
                const user = await this.userService.create(userData, tenantId);
                console.log(`✅ User created successfully:`, user);
            }
            catch (error) {
                console.error('❌ Failed to create user in user service:', error);
                console.error('❌ Error details:', {
                    message: error.message,
                    stack: error.stack,
                    code: error.code,
                    details: error.details,
                });
            }
        }
        return result;
    }
    async verifyMFA(session, totpCode, email) {
        return this.cognitoService.verifyMFA(session, totpCode, email);
    }
    async forgotPassword(email) {
        return this.cognitoService.forgotPassword(email);
    }
    async confirmForgotPassword(email, password, confirmationCode) {
        return this.cognitoService.confirmForgotPassword(email, password, confirmationCode);
    }
    async changePassword(changePasswordDto) {
        const { email, currentPassword, newPassword } = changePasswordDto;
        return this.cognitoService.changePassword(email, currentPassword, newPassword);
    }
    async assignDefaultRole(email) {
        await this.rbacService.assignRoleToUser(email, 'read-only');
    }
    async globalSignOut(globalSignOutDto) {
        const { accessToken } = globalSignOutDto;
        return this.cognitoService.globalSignOut(accessToken);
    }
    async forcedGlobalSignOut(email) {
        return this.cognitoService.forcedGlobalSignOut(email);
    }
    async refreshToken(refreshToken) {
        return this.cognitoService.refreshToken(refreshToken);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof cognito_service_1.CognitoService !== "undefined" && cognito_service_1.CognitoService) === "function" ? _a : Object, typeof (_b = typeof rbac_service_1.RbacService !== "undefined" && rbac_service_1.RbacService) === "function" ? _b : Object, typeof (_c = typeof user_tenant_map_service_1.UserTenantMapService !== "undefined" && user_tenant_map_service_1.UserTenantMapService) === "function" ? _c : Object, typeof (_d = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _d : Object])
], AuthService);


/***/ }),

/***/ "./apps/api-gateway/src/modules/auth/dto/auth-dto.ts":
/*!***********************************************************!*\
  !*** ./apps/api-gateway/src/modules/auth/dto/auth-dto.ts ***!
  \***********************************************************/
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
exports.ChangePasswordDto = exports.RefreshTokenDto = exports.GlobalSignOutDto = exports.VerifyMFASetupDto = exports.SetupMFADto = exports.VerifyMFADto = exports.SignInDto = exports.ConfirmSignUpDto = exports.SignUpDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class SignUpDto {
}
exports.SignUpDto = SignUpDto;
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Please provide a valid email address' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email is required' }),
    __metadata("design:type", String)
], SignUpDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Password must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Password is required' }),
    (0, class_validator_1.MinLength)(8, { message: 'Password must be at least 8 characters long' }),
    (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
        message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    }),
    __metadata("design:type", String)
], SignUpDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Name must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Name is required' }),
    (0, class_validator_1.MinLength)(2, { message: 'Name must be at least 2 characters long' }),
    (0, class_validator_1.MaxLength)(50, { message: 'Name must not exceed 50 characters' }),
    __metadata("design:type", String)
], SignUpDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'tenantId must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'tenantId is required' }),
    (0, class_validator_1.MinLength)(2, { message: 'tenantId must be at least 2 characters long' }),
    (0, class_validator_1.MaxLength)(50, { message: 'tenantId must not exceed 50 characters' }),
    __metadata("design:type", String)
], SignUpDto.prototype, "tenantId", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'role must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'role is required' }),
    (0, class_validator_1.MinLength)(2, { message: 'role must be at least 2 characters long' }),
    (0, class_validator_1.MaxLength)(50, { message: 'role must not exceed 50 characters' }),
    __metadata("design:type", String)
], SignUpDto.prototype, "role", void 0);
class ConfirmSignUpDto {
}
exports.ConfirmSignUpDto = ConfirmSignUpDto;
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Please provide a valid email address' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email is required' }),
    __metadata("design:type", String)
], ConfirmSignUpDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Confirmation code must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Confirmation code is required' }),
    (0, class_validator_1.Matches)(/^\d{6}$/, { message: 'Confirmation code must be exactly 6 digits' }),
    __metadata("design:type", String)
], ConfirmSignUpDto.prototype, "confirmationCode", void 0);
class SignInDto {
}
exports.SignInDto = SignInDto;
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Please provide a valid email address' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email is required' }),
    __metadata("design:type", String)
], SignInDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Password must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Password is required' }),
    __metadata("design:type", String)
], SignInDto.prototype, "password", void 0);
class VerifyMFADto {
}
exports.VerifyMFADto = VerifyMFADto;
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Please provide a valid email address' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email is required' }),
    __metadata("design:type", String)
], VerifyMFADto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Session must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Session is required' }),
    __metadata("design:type", String)
], VerifyMFADto.prototype, "session", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'TOTP code must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'TOTP code is required' }),
    (0, class_validator_1.Matches)(/^\d{6}$/, { message: 'TOTP code must be exactly 6 digits' }),
    __metadata("design:type", String)
], VerifyMFADto.prototype, "totpCode", void 0);
class SetupMFADto {
}
exports.SetupMFADto = SetupMFADto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'Session must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Session is required' }),
    __metadata("design:type", String)
], SetupMFADto.prototype, "session", void 0);
class VerifyMFASetupDto {
}
exports.VerifyMFASetupDto = VerifyMFASetupDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'Session must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Session is required' }),
    __metadata("design:type", String)
], VerifyMFASetupDto.prototype, "session", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'TOTP code must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'TOTP code is required' }),
    (0, class_validator_1.Matches)(/^\d{6}$/, { message: 'TOTP code must be exactly 6 digits' }),
    __metadata("design:type", String)
], VerifyMFASetupDto.prototype, "totpCode", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Please provide a valid email address' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email is required' }),
    __metadata("design:type", String)
], VerifyMFASetupDto.prototype, "email", void 0);
class GlobalSignOutDto {
}
exports.GlobalSignOutDto = GlobalSignOutDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'Access Token must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Access Token is required' }),
    __metadata("design:type", String)
], GlobalSignOutDto.prototype, "accessToken", void 0);
class RefreshTokenDto {
}
exports.RefreshTokenDto = RefreshTokenDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'Refresh Token must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Refresh Token is required' }),
    __metadata("design:type", String)
], RefreshTokenDto.prototype, "refreshToken", void 0);
class ChangePasswordDto {
}
exports.ChangePasswordDto = ChangePasswordDto;
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Please provide a valid email address' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email is required' }),
    __metadata("design:type", String)
], ChangePasswordDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Current Password must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Current Password is required' }),
    __metadata("design:type", String)
], ChangePasswordDto.prototype, "currentPassword", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'New Password must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'New Password is required' }),
    __metadata("design:type", String)
], ChangePasswordDto.prototype, "newPassword", void 0);


/***/ }),

/***/ "./apps/api-gateway/src/modules/auth/exceptions/cognito-exceptions.ts":
/*!****************************************************************************!*\
  !*** ./apps/api-gateway/src/modules/auth/exceptions/cognito-exceptions.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InvalidParameterException = exports.TooManyRequestsException = exports.LimitExceededException = exports.ExpiredCodeException = exports.CodeMismatchException = exports.UsernameExistsException = exports.NotAuthorizedException = exports.InvalidPasswordException = exports.UserNotConfirmedException = exports.UserNotFoundException = exports.CognitoException = void 0;
class CognitoException extends Error {
    constructor(message, statusCode, errorCode) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.name = 'CognitoException';
    }
}
exports.CognitoException = CognitoException;
class UserNotFoundException extends CognitoException {
    constructor() {
        super('User does not exist', 404, 'USER_NOT_FOUND');
    }
}
exports.UserNotFoundException = UserNotFoundException;
class UserNotConfirmedException extends CognitoException {
    constructor() {
        super('User is not confirmed', 400, 'USER_NOT_CONFIRMED');
    }
}
exports.UserNotConfirmedException = UserNotConfirmedException;
class InvalidPasswordException extends CognitoException {
    constructor() {
        super('Password does not conform to policy', 400, 'INVALID_PASSWORD');
    }
}
exports.InvalidPasswordException = InvalidPasswordException;
class NotAuthorizedException extends CognitoException {
    constructor(message = 'Incorrect username or password') {
        super(message, 401, 'NOT_AUTHORIZED');
    }
}
exports.NotAuthorizedException = NotAuthorizedException;
class UsernameExistsException extends CognitoException {
    constructor() {
        super('Username already exists', 409, 'USERNAME_EXISTS');
    }
}
exports.UsernameExistsException = UsernameExistsException;
class CodeMismatchException extends CognitoException {
    constructor() {
        super('Invalid verification code', 400, 'CODE_MISMATCH');
    }
}
exports.CodeMismatchException = CodeMismatchException;
class ExpiredCodeException extends CognitoException {
    constructor() {
        super('Verification code has expired', 400, 'EXPIRED_CODE');
    }
}
exports.ExpiredCodeException = ExpiredCodeException;
class LimitExceededException extends CognitoException {
    constructor() {
        super('Attempt limit exceeded, please try again later', 429, 'LIMIT_EXCEEDED');
    }
}
exports.LimitExceededException = LimitExceededException;
class TooManyRequestsException extends CognitoException {
    constructor() {
        super('Too many requests, please try again later', 429, 'TOO_MANY_REQUESTS');
    }
}
exports.TooManyRequestsException = TooManyRequestsException;
class InvalidParameterException extends CognitoException {
    constructor(message = 'Invalid parameter') {
        super(message, 400, 'INVALID_PARAMETER');
    }
}
exports.InvalidParameterException = InvalidParameterException;


/***/ }),

/***/ "./apps/api-gateway/src/modules/cognito/cognito-rbac.service.ts":
/*!**********************************************************************!*\
  !*** ./apps/api-gateway/src/modules/cognito/cognito-rbac.service.ts ***!
  \**********************************************************************/
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CognitoRbacService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const client_cognito_identity_provider_1 = __webpack_require__(/*! @aws-sdk/client-cognito-identity-provider */ "@aws-sdk/client-cognito-identity-provider");
let CognitoRbacService = class CognitoRbacService {
    constructor(configService) {
        this.configService = configService;
        this.userPoolId =
            this.configService.get('AWS_COGNITO_USER_POOL_ID') || '';
        this.cognitoClient = new client_cognito_identity_provider_1.CognitoIdentityProviderClient({
            region: this.configService.get('AWS_REGION'),
            credentials: {
                accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID') || '',
                secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY') || '',
            },
        });
    }
    async createRole(roleName, description) {
        const command = new client_cognito_identity_provider_1.CreateGroupCommand({
            GroupName: roleName,
            Description: description,
            UserPoolId: this.userPoolId,
        });
        return this.cognitoClient.send(command);
    }
    async listRoles(limit = 60, nextToken) {
        const command = new client_cognito_identity_provider_1.ListGroupsCommand({
            UserPoolId: this.userPoolId,
            Limit: limit,
            NextToken: nextToken,
        });
        return this.cognitoClient.send(command);
    }
    async assignRoleToUser(username, roleName) {
        const command = new client_cognito_identity_provider_1.AdminAddUserToGroupCommand({
            UserPoolId: this.userPoolId,
            Username: username,
            GroupName: roleName,
        });
        return this.cognitoClient.send(command);
    }
    async removeRoleFromUser(username, roleName) {
        const command = new client_cognito_identity_provider_1.AdminRemoveUserFromGroupCommand({
            UserPoolId: this.userPoolId,
            Username: username,
            GroupName: roleName,
        });
        return this.cognitoClient.send(command);
    }
    async getUserRoles(username, limit = 60, nextToken) {
        const command = new client_cognito_identity_provider_1.AdminListGroupsForUserCommand({
            UserPoolId: this.userPoolId,
            Username: username,
            Limit: limit,
            NextToken: nextToken,
        });
        return this.cognitoClient.send(command);
    }
};
exports.CognitoRbacService = CognitoRbacService;
exports.CognitoRbacService = CognitoRbacService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], CognitoRbacService);


/***/ }),

/***/ "./apps/api-gateway/src/modules/cognito/cognito-sso.controller.ts":
/*!************************************************************************!*\
  !*** ./apps/api-gateway/src/modules/cognito/cognito-sso.controller.ts ***!
  \************************************************************************/
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CognitoSsoController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const cognito_sso_service_1 = __webpack_require__(/*! ./cognito-sso.service */ "./apps/api-gateway/src/modules/cognito/cognito-sso.service.ts");
let CognitoSsoController = class CognitoSsoController {
    constructor(cognitoSsoService) {
        this.cognitoSsoService = cognitoSsoService;
    }
    async initiateSso(provider) {
        try {
            if (!['Google', 'Facebook', 'Apple'].includes(provider)) {
                throw new common_1.HttpException('Invalid provider', common_1.HttpStatus.BAD_REQUEST);
            }
            return await this.cognitoSsoService.initiateSsoAuth(provider);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async handleCallback(code, state, error, errorDescription, res) {
        console.log('📥 OAuth Callback Received');
        console.log('Code:', code ? `${code.substring(0, 20)}...` : 'MISSING');
        console.log('State:', state);
        console.log('Error:', error);
        if (error) {
            return {
                success: false,
                error: error,
                error_description: errorDescription,
                message: 'OAuth authentication failed',
            };
        }
        if (!code)
            throw new common_1.BadRequestException('Authorization code not received');
        try {
            const tokens = await this.cognitoSsoService.exchangeCodeForTokens(code, state);
            console.log('✅ Token exchange successful');
            console.log(tokens);
            return {
                success: true,
                message: 'SSO authentication successful!',
                tokens,
            };
        }
        catch (error) {
            console.error('❌ Token exchange failed:', error);
            throw error;
        }
    }
};
exports.CognitoSsoController = CognitoSsoController;
__decorate([
    (0, common_1.Get)('initiate'),
    __param(0, (0, common_1.Query)('provider')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CognitoSsoController.prototype, "initiateSso", null);
__decorate([
    (0, common_1.Get)('callback'),
    __param(0, (0, common_1.Query)('code')),
    __param(1, (0, common_1.Query)('state')),
    __param(2, (0, common_1.Query)('error')),
    __param(3, (0, common_1.Query)('error_description')),
    __param(4, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, typeof (_b = typeof Response !== "undefined" && Response) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], CognitoSsoController.prototype, "handleCallback", null);
exports.CognitoSsoController = CognitoSsoController = __decorate([
    (0, common_1.Controller)('auth/sso'),
    __metadata("design:paramtypes", [typeof (_a = typeof cognito_sso_service_1.CognitoSsoService !== "undefined" && cognito_sso_service_1.CognitoSsoService) === "function" ? _a : Object])
], CognitoSsoController);


/***/ }),

/***/ "./apps/api-gateway/src/modules/cognito/cognito-sso.service.ts":
/*!*********************************************************************!*\
  !*** ./apps/api-gateway/src/modules/cognito/cognito-sso.service.ts ***!
  \*********************************************************************/
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CognitoSsoService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const client_cognito_identity_provider_1 = __webpack_require__(/*! @aws-sdk/client-cognito-identity-provider */ "@aws-sdk/client-cognito-identity-provider");
const crypto = __webpack_require__(/*! crypto */ "crypto");
let CognitoSsoService = class CognitoSsoService {
    constructor(configService) {
        this.configService = configService;
        this.userPoolId =
            this.configService.get('AWS_COGNITO_USER_POOL_ID') || '';
        this.clientId =
            this.configService.get('AWS_COGNITO_CLIENT_ID') || '';
        this.clientSecret =
            this.configService.get('AWS_COGNITO_CLIENT_SECRET') || '';
        this.region = this.configService.get('AWS_REGION') || '';
        this.cognitoDomain =
            this.configService.get('AWS_COGNITO_DOMAIN') ||
                `${this.userPoolId}.auth.${this.region}.amazoncognito.com`;
        this.redirectUri =
            this.configService.get('SSO_REDIRECT_URI') ||
                'http://localhost:3000/auth/sso/callback';
        if (!this.clientSecret) {
            throw new Error('AWS_COGNITO_CLIENT_SECRET is not configured');
        }
        if (!this.cognitoDomain) {
            throw new Error('AWS_COGNITO_DOMAIN is not configured');
        }
        this.cognitoClient = new client_cognito_identity_provider_1.CognitoIdentityProviderClient({
            region: this.region,
        });
    }
    generateSecretHash(username) {
        return crypto
            .createHmac('SHA256', this.clientSecret)
            .update(username + this.clientId)
            .digest('base64');
    }
    async initiateSsoAuth(provider) {
        if (!['Google', 'Facebook', 'Apple'].includes(provider)) {
            throw new Error('Invalid provider');
        }
        const state = this.generateState();
        const params = new URLSearchParams({
            client_id: this.clientId,
            response_type: 'code',
            scope: 'email openid phone',
            redirect_uri: this.redirectUri,
            provider,
        });
        if (state) {
            params.append('state', state);
        }
        const authorizationUrl = `${this.cognitoDomain}/login?${params.toString()}`;
        console.log('🔗 Generated authorization URL:', authorizationUrl);
        return {
            authorizationUrl,
            state,
        };
    }
    async exchangeCodeForTokens(code, state) {
        if (!code) {
            throw new Error('Authorization code is required');
        }
        const tokenEndpoint = `${this.cognitoDomain}/oauth2/token`;
        const params = new URLSearchParams({
            grant_type: 'authorization_code',
            client_id: this.clientId,
            code: code,
            redirect_uri: this.redirectUri,
        });
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
        };
        if (this.clientSecret) {
            const authString = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64');
            headers['Authorization'] = `Basic ${authString}`;
        }
        console.log('🔑 Token Exchange Parameters:', {
            endpoint: tokenEndpoint,
            params: Object.fromEntries(params),
            headers: { ...headers, Authorization: '[REDACTED]' },
        });
        try {
            const response = await fetch(tokenEndpoint, {
                method: 'POST',
                headers,
                body: params,
            });
            if (!response.ok) {
                const errorData = await response.json();
                console.error('❌ Token exchange error:', errorData);
                throw new common_1.UnauthorizedException(errorData.error_description || 'Failed to exchange code for tokens');
            }
            const tokens = await response.json();
            console.log('✅ Token exchange successful');
            return {
                accessToken: tokens.access_token,
                refreshToken: tokens.refresh_token,
                idToken: tokens.id_token,
                expiresIn: tokens.expires_in,
                tokenType: tokens.token_type,
            };
        }
        catch (error) {
            console.error('❌ Error exchanging code for tokens:', error);
            throw new common_1.UnauthorizedException('Authentication failed');
        }
    }
    generateState() {
        return Math.random().toString(36).substring(2, 15);
    }
};
exports.CognitoSsoService = CognitoSsoService;
exports.CognitoSsoService = CognitoSsoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], CognitoSsoService);


/***/ }),

/***/ "./apps/api-gateway/src/modules/cognito/cognito.module.ts":
/*!****************************************************************!*\
  !*** ./apps/api-gateway/src/modules/cognito/cognito.module.ts ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CognitoModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const cognito_service_1 = __webpack_require__(/*! ./cognito.service */ "./apps/api-gateway/src/modules/cognito/cognito.service.ts");
const cognito_rbac_service_1 = __webpack_require__(/*! ./cognito-rbac.service */ "./apps/api-gateway/src/modules/cognito/cognito-rbac.service.ts");
const cognito_sso_service_1 = __webpack_require__(/*! ./cognito-sso.service */ "./apps/api-gateway/src/modules/cognito/cognito-sso.service.ts");
const cognito_sso_controller_1 = __webpack_require__(/*! ./cognito-sso.controller */ "./apps/api-gateway/src/modules/cognito/cognito-sso.controller.ts");
const token_revocation_service_1 = __webpack_require__(/*! ../utils/token.revocation.service */ "./apps/api-gateway/src/modules/utils/token.revocation.service.ts");
let CognitoModule = class CognitoModule {
};
exports.CognitoModule = CognitoModule;
exports.CognitoModule = CognitoModule = __decorate([
    (0, common_1.Module)({
        providers: [
            cognito_service_1.CognitoService,
            cognito_rbac_service_1.CognitoRbacService,
            cognito_sso_service_1.CognitoSsoService,
            token_revocation_service_1.TokenRevocationService,
        ],
        exports: [cognito_service_1.CognitoService, cognito_rbac_service_1.CognitoRbacService, cognito_sso_service_1.CognitoSsoService],
        controllers: [cognito_sso_controller_1.CognitoSsoController],
    })
], CognitoModule);


/***/ }),

/***/ "./apps/api-gateway/src/modules/cognito/cognito.service.ts":
/*!*****************************************************************!*\
  !*** ./apps/api-gateway/src/modules/cognito/cognito.service.ts ***!
  \*****************************************************************/
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
exports.CognitoService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const crypto = __webpack_require__(/*! crypto */ "crypto");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const client_cognito_identity_provider_1 = __webpack_require__(/*! @aws-sdk/client-cognito-identity-provider */ "@aws-sdk/client-cognito-identity-provider");
const cognito_exceptions_1 = __webpack_require__(/*! ../auth/exceptions/cognito-exceptions */ "./apps/api-gateway/src/modules/auth/exceptions/cognito-exceptions.ts");
const token_revocation_service_1 = __webpack_require__(/*! ../utils/token.revocation.service */ "./apps/api-gateway/src/modules/utils/token.revocation.service.ts");
let CognitoService = class CognitoService {
    constructor(configService, tokenRevocationService) {
        this.configService = configService;
        this.tokenRevocationService = tokenRevocationService;
        this.userPoolId =
            this.configService.get('AWS_COGNITO_USER_POOL_ID') || '';
        this.clientId =
            this.configService.get('AWS_COGNITO_CLIENT_ID') || '';
        this.clientSecret =
            this.configService.get('AWS_COGNITO_CLIENT_SECRET') || '';
        this.cognitoClient = new client_cognito_identity_provider_1.CognitoIdentityProviderClient({
            region: this.configService.get('AWS_REGION'),
        });
    }
    handleCognitoError(error) {
        if (error.name === 'UsernameExistsException') {
            throw new cognito_exceptions_1.UsernameExistsException();
        }
        else if (error.name === 'InvalidPasswordException') {
            throw new cognito_exceptions_1.InvalidPasswordException();
        }
        else if (error.name === 'InvalidParameterException') {
            throw new cognito_exceptions_1.InvalidParameterException(error.message);
        }
        else if (error.name === 'TooManyRequestsException') {
            throw new cognito_exceptions_1.TooManyRequestsException();
        }
        console.log('Re-throw the original error', error);
        throw error;
    }
    generateSecretHash(username) {
        return crypto
            .createHmac('SHA256', this.clientSecret)
            .update(username + this.clientId)
            .digest('base64');
    }
    async signUp(email, password, name, tenantId) {
        const params = {
            ClientId: this.clientId,
            Username: email,
            Password: password,
            SecretHash: this.generateSecretHash(email),
            UserAttributes: [
                {
                    Name: 'email',
                    Value: email,
                },
                {
                    Name: 'name',
                    Value: name,
                },
                {
                    Name: 'custom:tenantId',
                    Value: tenantId,
                },
            ],
        };
        try {
            const command = new client_cognito_identity_provider_1.SignUpCommand(params);
            const result = await this.cognitoClient.send(command);
            const confirmCommand = new client_cognito_identity_provider_1.AdminConfirmSignUpCommand({
                UserPoolId: this.userPoolId,
                Username: email,
            });
            await this.cognitoClient.send(confirmCommand);
            const signInResult = await this.signIn(email, password);
            if (signInResult.challengeName === client_cognito_identity_provider_1.ChallengeNameType.MFA_SETUP &&
                signInResult.session) {
                const mfaSetupResult = await this.initiateMfaSetup(signInResult.session);
                return {
                    userSub: result.UserSub,
                    ...signInResult,
                    ...mfaSetupResult,
                    message: 'User registered and confirmed successfully. Please set up MFA.',
                };
            }
            return {
                userSub: result.UserSub,
                ...signInResult,
                message: 'User registered and confirmed successfully.',
            };
        }
        catch (error) {
            this.handleCognitoError(error);
        }
    }
    async signIn(email, password) {
        const params = {
            ClientId: this.clientId,
            AuthFlow: client_cognito_identity_provider_1.AuthFlowType.USER_PASSWORD_AUTH,
            AuthParameters: {
                USERNAME: email,
                PASSWORD: password,
                SECRET_HASH: this.generateSecretHash(email),
            },
        };
        try {
            const command = new client_cognito_identity_provider_1.InitiateAuthCommand(params);
            const result = await this.cognitoClient.send(command);
            if (result.ChallengeName === client_cognito_identity_provider_1.ChallengeNameType.SOFTWARE_TOKEN_MFA) {
                return {
                    challengeName: result.ChallengeName,
                    session: result.Session,
                    message: 'MFA challenge required. Please provide TOTP code.',
                };
            }
            if (result.ChallengeName === client_cognito_identity_provider_1.ChallengeNameType.MFA_SETUP) {
                return {
                    challengeName: result.ChallengeName,
                    session: result.Session,
                    message: 'MFA setup required. Please set up TOTP first.',
                };
            }
            return {
                accessToken: result.AuthenticationResult?.AccessToken,
                refreshToken: result.AuthenticationResult?.RefreshToken,
                idToken: result.AuthenticationResult?.IdToken,
            };
        }
        catch (error) {
            this.handleCognitoError(error);
        }
    }
    async initiateMfaSetup(session) {
        const params = {
            Session: session,
        };
        try {
            const command = new client_cognito_identity_provider_1.AssociateSoftwareTokenCommand(params);
            const result = await this.cognitoClient.send(command);
            const secretCode = result.SecretCode;
            const qrCodeUrl = `otpauth://totp/YourApp:user?secret=${secretCode}&issuer=YourApp`;
            return {
                secretCode,
                qrCodeUrl,
                session: result.Session,
                message: 'Scan this QR code with your authenticator app',
            };
        }
        catch (error) {
            this.handleCognitoError(error);
        }
    }
    async verifyMFASetup(session, totpCode, email) {
        const params = {
            Session: session,
            UserCode: totpCode,
        };
        try {
            const command = new client_cognito_identity_provider_1.VerifySoftwareTokenCommand(params);
            const result = await this.cognitoClient.send(command);
            if (result.Status === 'SUCCESS' && result.Session) {
                return this.completeMfaSetup(result.Session, totpCode, email);
            }
            throw new common_1.BadRequestException('Invalid TOTP code');
        }
        catch (error) {
            this.handleCognitoError(error);
        }
    }
    async completeMfaSetup(session, totpCode, email) {
        const params = {
            ClientId: this.clientId,
            ChallengeName: client_cognito_identity_provider_1.ChallengeNameType.MFA_SETUP,
            Session: session,
            ChallengeResponses: {
                USERNAME: email,
                SOFTWARE_TOKEN_MFA_CODE: totpCode,
                SECRET_HASH: this.generateSecretHash(email),
            },
        };
        try {
            const command = new client_cognito_identity_provider_1.RespondToAuthChallengeCommand(params);
            const result = await this.cognitoClient.send(command);
            if (result.AuthenticationResult?.AccessToken) {
                try {
                    const mfaParams = {
                        AccessToken: result.AuthenticationResult.AccessToken,
                        SoftwareTokenMfaSettings: {
                            Enabled: true,
                            PreferredMfa: true,
                        },
                    };
                    const mfaCommand = new client_cognito_identity_provider_1.SetUserMFAPreferenceCommand(mfaParams);
                    await this.cognitoClient.send(mfaCommand);
                }
                catch (mfaError) {
                    console.error('Failed to set MFA preferences:', mfaError);
                }
            }
            const adminGetUserCommand = new client_cognito_identity_provider_1.AdminGetUserCommand({
                UserPoolId: this.userPoolId,
                Username: email,
            });
            const userResult = await this.cognitoClient.send(adminGetUserCommand);
            const userId = userResult.UserAttributes?.find((attr) => attr.Name === 'sub')?.Value;
            const tenantId = userResult.UserAttributes?.find((attr) => attr.Name === 'custom:tenantId')?.Value;
            const userName = userResult.UserAttributes?.find((attr) => attr.Name === 'name')?.Value;
            return {
                userId,
                tenantId,
                userName,
                accessToken: result.AuthenticationResult?.AccessToken,
                refreshToken: result.AuthenticationResult?.RefreshToken,
                idToken: result.AuthenticationResult?.IdToken,
            };
        }
        catch (error) {
            this.handleCognitoError(error);
        }
    }
    async verifyMFA(session, totpCode, email) {
        const params = {
            ClientId: this.clientId,
            ChallengeName: client_cognito_identity_provider_1.ChallengeNameType.SOFTWARE_TOKEN_MFA,
            Session: session,
            ChallengeResponses: {
                USERNAME: email,
                SOFTWARE_TOKEN_MFA_CODE: totpCode,
                SECRET_HASH: this.generateSecretHash(email),
            },
        };
        try {
            const command = new client_cognito_identity_provider_1.RespondToAuthChallengeCommand(params);
            const result = await this.cognitoClient.send(command);
            return {
                accessToken: result.AuthenticationResult?.AccessToken,
                refreshToken: result.AuthenticationResult?.RefreshToken,
                idToken: result.AuthenticationResult?.IdToken,
            };
        }
        catch (error) {
            this.handleCognitoError(error);
        }
    }
    async forgotPassword(email) {
        try {
            const secretHash = this.generateSecretHash(email);
            const command = new client_cognito_identity_provider_1.ForgotPasswordCommand({
                ClientId: this.clientId,
                Username: email,
                SecretHash: secretHash,
            });
            const response = await this.cognitoClient.send(command);
            return response;
        }
        catch (error) {
            this.handleCognitoError(error);
        }
    }
    async confirmForgotPassword(email, password, confirmationCode) {
        try {
            const secretHash = this.generateSecretHash(email);
            const command = new client_cognito_identity_provider_1.ConfirmForgotPasswordCommand({
                ClientId: this.clientId,
                Username: email,
                Password: password,
                ConfirmationCode: confirmationCode,
                SecretHash: secretHash,
            });
            const response = await this.cognitoClient.send(command);
            return response;
        }
        catch (error) {
            this.handleCognitoError(error);
        }
    }
    async changePassword(email, currentPassword, newPassword) {
        try {
            const authResponse = await this.signIn(email, currentPassword);
            if (!authResponse?.accessToken) {
                throw new Error('Authentication failed');
            }
            const { accessToken } = authResponse;
            const command = new client_cognito_identity_provider_1.ChangePasswordCommand({
                AccessToken: accessToken,
                PreviousPassword: currentPassword,
                ProposedPassword: newPassword,
            });
            const response = await this.cognitoClient.send(command);
            return response;
        }
        catch (error) {
            this.handleCognitoError(error);
        }
    }
    async globalSignOut(accessToken) {
        try {
            const command = new client_cognito_identity_provider_1.GlobalSignOutCommand({
                AccessToken: accessToken,
            });
            const response = await this.cognitoClient.send(command);
            await this.tokenRevocationService.revokeToken(accessToken);
            return response;
        }
        catch (error) {
            this.handleCognitoError(error);
        }
    }
    async forcedGlobalSignOut(email) {
        try {
            const command = new client_cognito_identity_provider_1.AdminUserGlobalSignOutCommand({
                UserPoolId: this.userPoolId,
                Username: email,
            });
            const response = await this.cognitoClient.send(command);
            return response;
        }
        catch (error) {
            this.handleCognitoError(error);
        }
    }
    async refreshToken(refreshToken) {
        try {
            const command = new client_cognito_identity_provider_1.InitiateAuthCommand({
                AuthFlow: 'REFRESH_TOKEN_AUTH',
                ClientId: this.clientId,
                AuthParameters: {
                    REFRESH_TOKEN: refreshToken,
                    SECRET_HASH: this.clientSecret,
                },
            });
            const response = await this.cognitoClient.send(command);
            return response;
        }
        catch (error) {
            this.handleCognitoError(error);
        }
    }
};
exports.CognitoService = CognitoService;
exports.CognitoService = CognitoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, typeof (_b = typeof token_revocation_service_1.TokenRevocationService !== "undefined" && token_revocation_service_1.TokenRevocationService) === "function" ? _b : Object])
], CognitoService);


/***/ }),

/***/ "./apps/api-gateway/src/modules/invitation/invitation.controller.ts":
/*!**************************************************************************!*\
  !*** ./apps/api-gateway/src/modules/invitation/invitation.controller.ts ***!
  \**************************************************************************/
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InvitationController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const invitation_service_1 = __webpack_require__(/*! ./invitation.service */ "./apps/api-gateway/src/modules/invitation/invitation.service.ts");
const create_invitation_dto_1 = __webpack_require__(/*! @libs/dto/invitation/create-invitation.dto */ "./libs/dto/invitation/create-invitation.dto.ts");
const jwt_guard_1 = __webpack_require__(/*! ../../guards/jwt/jwt.guard */ "./apps/api-gateway/src/guards/jwt/jwt.guard.ts");
const roles_guard_1 = __webpack_require__(/*! ../../guards/roles/roles.guard */ "./apps/api-gateway/src/guards/roles/roles.guard.ts");
const roles_decorator_1 = __webpack_require__(/*! ../../decorators/roles.decorator */ "./apps/api-gateway/src/decorators/roles.decorator.ts");
let InvitationController = class InvitationController {
    constructor(invitationService) {
        this.invitationService = invitationService;
    }
    async createInvitation(createInvitationDto) {
        return this.invitationService.createInvitation(createInvitationDto);
    }
    async createBulkInvitations(createBulkInvitationDto) {
        return this.invitationService.createBulkInvitations(createBulkInvitationDto);
    }
    async validateInvitation(token) {
        if (!token) {
            throw new common_1.BadRequestException('Token is required');
        }
        return this.invitationService.validateInvitation(token);
    }
};
exports.InvitationController = InvitationController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('super-admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new user invitation' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Invitation sent successfully' }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Invalid request or active invitation exists',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_invitation_dto_1.CreateInvitationDto !== "undefined" && create_invitation_dto_1.CreateInvitationDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], InvitationController.prototype, "createInvitation", null);
__decorate([
    (0, common_1.Post)('bulk'),
    (0, swagger_1.ApiOperation)({ summary: 'Create multiple user invitations (up to 5)' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Bulk invitations processed successfully',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Invalid request or too many invitations',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof create_invitation_dto_1.CreateBulkInvitationDto !== "undefined" && create_invitation_dto_1.CreateBulkInvitationDto) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], InvitationController.prototype, "createBulkInvitations", null);
__decorate([
    (0, common_1.Get)('validate'),
    (0, swagger_1.ApiOperation)({ summary: 'Validate an invitation token' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Invitation is valid' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid or expired invitation' }),
    __param(0, (0, common_1.Query)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InvitationController.prototype, "validateInvitation", null);
exports.InvitationController = InvitationController = __decorate([
    (0, swagger_1.ApiTags)('invitations'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, roles_decorator_1.Roles)('super_admin'),
    (0, common_1.Controller)('invitations'),
    __metadata("design:paramtypes", [typeof (_a = typeof invitation_service_1.InvitationService !== "undefined" && invitation_service_1.InvitationService) === "function" ? _a : Object])
], InvitationController);


/***/ }),

/***/ "./apps/api-gateway/src/modules/invitation/invitation.module.ts":
/*!**********************************************************************!*\
  !*** ./apps/api-gateway/src/modules/invitation/invitation.module.ts ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InvitationModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const path_1 = __webpack_require__(/*! path */ "path");
const invitation_controller_1 = __webpack_require__(/*! ./invitation.controller */ "./apps/api-gateway/src/modules/invitation/invitation.controller.ts");
const invitation_service_1 = __webpack_require__(/*! ./invitation.service */ "./apps/api-gateway/src/modules/invitation/invitation.service.ts");
const invitation_entity_1 = __webpack_require__(/*! @libs/entity/invitation.entity */ "./libs/entity/invitation.entity.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const rbac_module_1 = __webpack_require__(/*! ../rbac/rbac.module */ "./apps/api-gateway/src/modules/rbac/rbac.module.ts");
const cognito_module_1 = __webpack_require__(/*! ../cognito/cognito.module */ "./apps/api-gateway/src/modules/cognito/cognito.module.ts");
const utils_module_1 = __webpack_require__(/*! ../utils/utils.module */ "./apps/api-gateway/src/modules/utils/utils.module.ts");
let InvitationModule = class InvitationModule {
};
exports.InvitationModule = InvitationModule;
exports.InvitationModule = InvitationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            typeorm_1.TypeOrmModule.forFeature([invitation_entity_1.Invitation], 'central_db'),
            rbac_module_1.RbacModule,
            cognito_module_1.CognitoModule,
            utils_module_1.UtilsModule,
            microservices_1.ClientsModule.registerAsync([
                {
                    name: 'INVITATION_PACKAGE',
                    imports: [config_1.ConfigModule],
                    useFactory: (configService) => ({
                        transport: microservices_1.Transport.GRPC,
                        options: {
                            package: configService.get('INVITATION_SERVICE_PKG', 'invitation'),
                            protoPath: (0, path_1.join)(__dirname, './../../../libs/proto/invitation.proto'),
                            url: configService.get('INVITATION_SERVICE_URL', 'localhost:5002'),
                        },
                    }),
                    inject: [config_1.ConfigService],
                },
            ]),
        ],
        controllers: [invitation_controller_1.InvitationController],
        providers: [
            invitation_service_1.InvitationService,
        ],
        exports: [invitation_service_1.InvitationService],
    })
], InvitationModule);


/***/ }),

/***/ "./apps/api-gateway/src/modules/invitation/invitation.service.ts":
/*!***********************************************************************!*\
  !*** ./apps/api-gateway/src/modules/invitation/invitation.service.ts ***!
  \***********************************************************************/
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InvitationService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const uuid_1 = __webpack_require__(/*! uuid */ "uuid");
const date_fns_1 = __webpack_require__(/*! date-fns */ "date-fns");
const invitation_entity_1 = __webpack_require__(/*! @libs/entity/invitation.entity */ "./libs/entity/invitation.entity.ts");
const email_service_1 = __webpack_require__(/*! ../utils/email.service */ "./apps/api-gateway/src/modules/utils/email.service.ts");
let InvitationService = class InvitationService {
    constructor(invitationRepository, configService, emailService) {
        this.invitationRepository = invitationRepository;
        this.configService = configService;
        this.emailService = emailService;
    }
    async createInvitation(createInvitationDto) {
        const existingInvitation = await this.invitationRepository.findOne({
            where: {
                email: createInvitationDto.email,
                isUsed: false,
                expiresAt: (0, typeorm_2.MoreThan)(new Date()),
            },
        });
        if (existingInvitation) {
            throw new common_1.BadRequestException('An active invitation already exists for this email');
        }
        const token = (0, uuid_1.v4)();
        const expiresAt = (0, date_fns_1.addHours)(new Date(), 24);
        const invitation = this.invitationRepository.create({
            ...createInvitationDto,
            token,
            expiresAt,
        });
        await this.invitationRepository.save(invitation);
        const frontendUrl = this.configService.get('FRONTEND_URL');
        const invitationLink = `${frontendUrl}/signup?token=${token}`;
        await this.emailService.sendInvitationEmail({
            to: createInvitationDto.email,
            invitationLink,
            role: createInvitationDto.role,
        });
        return {
            message: 'Invitation sent successfully',
        };
    }
    async validateInvitation(token) {
        const invitation = await this.invitationRepository.findOne({
            where: {
                token,
                isUsed: false,
                expiresAt: (0, typeorm_2.MoreThan)(new Date()),
            },
        });
        if (!invitation) {
            throw new common_1.BadRequestException('Invalid or expired invitation link');
        }
        return invitation;
    }
    async markInvitationAsUsed(token) {
        await this.invitationRepository.update({ token }, { isUsed: true });
    }
    async createBulkInvitations(createBulkInvitationDto) {
        const results = [];
        for (const invitationDto of createBulkInvitationDto.invitations) {
            try {
                const existingInvitation = await this.invitationRepository.findOne({
                    where: {
                        email: invitationDto.email,
                        isUsed: false,
                        expiresAt: (0, typeorm_2.MoreThan)(new Date()),
                    },
                });
                if (existingInvitation) {
                    results.push({
                        email: invitationDto.email,
                        status: 'failed',
                        message: 'An active invitation already exists for this email',
                    });
                    continue;
                }
                const token = (0, uuid_1.v4)();
                const expiresAt = (0, date_fns_1.addHours)(new Date(), 24);
                const invitation = this.invitationRepository.create({
                    ...invitationDto,
                    token,
                    expiresAt,
                });
                await this.invitationRepository.save(invitation);
                const frontendUrl = this.configService.get('FRONTEND_URL');
                const invitationLink = `${frontendUrl}/signup?token=${token}`;
                await this.emailService.sendInvitationEmail({
                    to: invitationDto.email,
                    invitationLink,
                    role: invitationDto.role,
                });
                results.push({
                    email: invitationDto.email,
                    status: 'success',
                });
            }
            catch (error) {
                results.push({
                    email: invitationDto.email,
                    status: 'failed',
                    message: error.message,
                });
            }
        }
        return {
            message: 'Bulk invitation process completed',
            results,
        };
    }
};
exports.InvitationService = InvitationService;
exports.InvitationService = InvitationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(invitation_entity_1.Invitation, 'central_db')),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object, typeof (_c = typeof email_service_1.EmailService !== "undefined" && email_service_1.EmailService) === "function" ? _c : Object])
], InvitationService);


/***/ }),

/***/ "./apps/api-gateway/src/modules/rbac/rbac.controller.ts":
/*!**************************************************************!*\
  !*** ./apps/api-gateway/src/modules/rbac/rbac.controller.ts ***!
  \**************************************************************/
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RbacController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const rbac_service_1 = __webpack_require__(/*! ./rbac.service */ "./apps/api-gateway/src/modules/rbac/rbac.service.ts");
const jwt_guard_1 = __webpack_require__(/*! ../../guards/jwt/jwt.guard */ "./apps/api-gateway/src/guards/jwt/jwt.guard.ts");
const roles_guard_1 = __webpack_require__(/*! ../../guards/roles/roles.guard */ "./apps/api-gateway/src/guards/roles/roles.guard.ts");
const roles_decorator_1 = __webpack_require__(/*! ../../decorators/roles.decorator */ "./apps/api-gateway/src/decorators/roles.decorator.ts");
let RbacController = class RbacController {
    constructor(rbacService) {
        this.rbacService = rbacService;
    }
    async createRole(payload) {
        const { roleName, description } = payload;
        return this.rbacService.createRole(roleName, description);
    }
    async listRoles(limit, nextToken) {
        return this.rbacService.listRoles(limit, nextToken);
    }
    async assignRoleToUser(username, payload) {
        const { roleName } = payload;
        return this.rbacService.assignRoleToUser(username, roleName);
    }
    async removeRoleFromUser(username, payload) {
        const { roleName } = payload;
        return this.rbacService.removeRoleFromUser(username, roleName);
    }
    async getUserRoles(username, limit, nextToken) {
        return this.rbacService.getUserRoles(username, limit, nextToken);
    }
};
exports.RbacController = RbacController;
__decorate([
    (0, common_1.Post)('roles'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RbacController.prototype, "createRole", null);
__decorate([
    (0, common_1.Get)('roles'),
    __param(0, (0, common_1.Query)('limit')),
    __param(1, (0, common_1.Query)('nextToken')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], RbacController.prototype, "listRoles", null);
__decorate([
    (0, common_1.Post)('users/:username/roles'),
    __param(0, (0, common_1.Param)('username')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RbacController.prototype, "assignRoleToUser", null);
__decorate([
    (0, common_1.Post)('users/:username/roles/remove'),
    __param(0, (0, common_1.Param)('username')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RbacController.prototype, "removeRoleFromUser", null);
__decorate([
    (0, common_1.Get)('users/:username/roles'),
    __param(0, (0, common_1.Param)('username')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('nextToken')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, String]),
    __metadata("design:returntype", Promise)
], RbacController.prototype, "getUserRoles", null);
exports.RbacController = RbacController = __decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.Controller)('rbac'),
    __metadata("design:paramtypes", [typeof (_a = typeof rbac_service_1.RbacService !== "undefined" && rbac_service_1.RbacService) === "function" ? _a : Object])
], RbacController);


/***/ }),

/***/ "./apps/api-gateway/src/modules/rbac/rbac.module.ts":
/*!**********************************************************!*\
  !*** ./apps/api-gateway/src/modules/rbac/rbac.module.ts ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RbacModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const rbac_service_1 = __webpack_require__(/*! ./rbac.service */ "./apps/api-gateway/src/modules/rbac/rbac.service.ts");
const rbac_controller_1 = __webpack_require__(/*! ./rbac.controller */ "./apps/api-gateway/src/modules/rbac/rbac.controller.ts");
const cognito_rbac_service_1 = __webpack_require__(/*! ../cognito/cognito-rbac.service */ "./apps/api-gateway/src/modules/cognito/cognito-rbac.service.ts");
let RbacModule = class RbacModule {
};
exports.RbacModule = RbacModule;
exports.RbacModule = RbacModule = __decorate([
    (0, common_1.Module)({
        providers: [rbac_service_1.RbacService, cognito_rbac_service_1.CognitoRbacService],
        controllers: [rbac_controller_1.RbacController],
        exports: [rbac_service_1.RbacService],
    })
], RbacModule);


/***/ }),

/***/ "./apps/api-gateway/src/modules/rbac/rbac.service.ts":
/*!***********************************************************!*\
  !*** ./apps/api-gateway/src/modules/rbac/rbac.service.ts ***!
  \***********************************************************/
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RbacService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const cognito_rbac_service_1 = __webpack_require__(/*! ../cognito/cognito-rbac.service */ "./apps/api-gateway/src/modules/cognito/cognito-rbac.service.ts");
let RbacService = class RbacService {
    constructor(cognitoRbacService) {
        this.cognitoRbacService = cognitoRbacService;
    }
    async createRole(roleName, description) {
        return this.cognitoRbacService.createRole(roleName, description);
    }
    async listRoles(limit, nextToken) {
        return this.cognitoRbacService.listRoles(limit, nextToken);
    }
    async assignRoleToUser(username, roleName) {
        return this.cognitoRbacService.assignRoleToUser(username, roleName);
    }
    async removeRoleFromUser(username, roleName) {
        return this.cognitoRbacService.removeRoleFromUser(username, roleName);
    }
    async getUserRoles(username, limit, nextToken) {
        return this.cognitoRbacService.getUserRoles(username, limit, nextToken);
    }
};
exports.RbacService = RbacService;
exports.RbacService = RbacService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof cognito_rbac_service_1.CognitoRbacService !== "undefined" && cognito_rbac_service_1.CognitoRbacService) === "function" ? _a : Object])
], RbacService);


/***/ }),

/***/ "./apps/api-gateway/src/modules/tenant/tenant.controller.ts":
/*!******************************************************************!*\
  !*** ./apps/api-gateway/src/modules/tenant/tenant.controller.ts ***!
  \******************************************************************/
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TenantController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const tenant_service_1 = __webpack_require__(/*! ./tenant.service */ "./apps/api-gateway/src/modules/tenant/tenant.service.ts");
const tenant_dto_1 = __webpack_require__(/*! ./tenant.dto */ "./apps/api-gateway/src/modules/tenant/tenant.dto.ts");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const roles_decorator_1 = __webpack_require__(/*! ../../decorators/roles.decorator */ "./apps/api-gateway/src/decorators/roles.decorator.ts");
const roles_guard_1 = __webpack_require__(/*! ../../guards/roles/roles.guard */ "./apps/api-gateway/src/guards/roles/roles.guard.ts");
const jwt_guard_1 = __webpack_require__(/*! ../../guards/jwt/jwt.guard */ "./apps/api-gateway/src/guards/jwt/jwt.guard.ts");
let TenantController = class TenantController {
    constructor(tenantService) {
        this.tenantService = tenantService;
    }
    create(createTenantDto) {
        console.log('Request came to tenanat controller...');
        return this.tenantService.create(createTenantDto);
    }
    findAll() {
        return this.tenantService.findAll();
    }
    findOne(id) {
        return this.tenantService.findById(id);
    }
};
exports.TenantController = TenantController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new tenant' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Tenant successfully created.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request.' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof tenant_dto_1.CreateTenantDto !== "undefined" && tenant_dto_1.CreateTenantDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], TenantController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all tenants' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all tenants.' }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('super-admin'),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], TenantController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get a tenant by id' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return the tenant.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Tenant not found.' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], TenantController.prototype, "findOne", null);
exports.TenantController = TenantController = __decorate([
    (0, swagger_1.ApiTags)('tenants'),
    (0, common_1.Controller)('tenants'),
    __metadata("design:paramtypes", [typeof (_a = typeof tenant_service_1.TenantService !== "undefined" && tenant_service_1.TenantService) === "function" ? _a : Object])
], TenantController);


/***/ }),

/***/ "./apps/api-gateway/src/modules/tenant/tenant.dto.ts":
/*!***********************************************************!*\
  !*** ./apps/api-gateway/src/modules/tenant/tenant.dto.ts ***!
  \***********************************************************/
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
exports.UpdateTenantDto = exports.CreateTenantDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const mapped_types_1 = __webpack_require__(/*! @nestjs/mapped-types */ "@nestjs/mapped-types");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class CreateTenantDto {
}
exports.CreateTenantDto = CreateTenantDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The name of the tenant',
        example: 'Acme Corporation',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateTenantDto.prototype, "name", void 0);
class UpdateTenantDto extends (0, mapped_types_1.PartialType)(CreateTenantDto) {
}
exports.UpdateTenantDto = UpdateTenantDto;


/***/ }),

/***/ "./apps/api-gateway/src/modules/tenant/tenant.entity.ts":
/*!**************************************************************!*\
  !*** ./apps/api-gateway/src/modules/tenant/tenant.entity.ts ***!
  \**************************************************************/
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
exports.Tenant = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
let Tenant = class Tenant {
};
exports.Tenant = Tenant;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Tenant.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'name' }),
    __metadata("design:type", String)
], Tenant.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'db_host' }),
    __metadata("design:type", String)
], Tenant.prototype, "dbHost", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'db_port' }),
    __metadata("design:type", Number)
], Tenant.prototype, "dbPort", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'db_name', unique: true }),
    __metadata("design:type", String)
], Tenant.prototype, "dbName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'db_user', type: 'text' }),
    __metadata("design:type", String)
], Tenant.prototype, "dbUser", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'db_password', type: 'text' }),
    __metadata("design:type", String)
], Tenant.prototype, "dbPassword", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'active', default: true }),
    __metadata("design:type", Boolean)
], Tenant.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'created_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Tenant.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'updated_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Tenant.prototype, "updatedAt", void 0);
exports.Tenant = Tenant = __decorate([
    (0, typeorm_1.Entity)('tenants')
], Tenant);


/***/ }),

/***/ "./apps/api-gateway/src/modules/tenant/tenant.module.ts":
/*!**************************************************************!*\
  !*** ./apps/api-gateway/src/modules/tenant/tenant.module.ts ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TenantModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const tenant_controller_1 = __webpack_require__(/*! ./tenant.controller */ "./apps/api-gateway/src/modules/tenant/tenant.controller.ts");
const tenant_service_1 = __webpack_require__(/*! ./tenant.service */ "./apps/api-gateway/src/modules/tenant/tenant.service.ts");
const tenant_entity_1 = __webpack_require__(/*! ./tenant.entity */ "./apps/api-gateway/src/modules/tenant/tenant.entity.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
let TenantModule = class TenantModule {
};
exports.TenantModule = TenantModule;
exports.TenantModule = TenantModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            typeorm_1.TypeOrmModule.forFeature([tenant_entity_1.Tenant], 'central_db'),
        ],
        controllers: [tenant_controller_1.TenantController],
        providers: [
            tenant_service_1.TenantService,
        ],
        exports: [tenant_service_1.TenantService],
    })
], TenantModule);


/***/ }),

/***/ "./apps/api-gateway/src/modules/tenant/tenant.service.ts":
/*!***************************************************************!*\
  !*** ./apps/api-gateway/src/modules/tenant/tenant.service.ts ***!
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var TenantService_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TenantService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const uuid_1 = __webpack_require__(/*! uuid */ "uuid");
const tenant_entity_1 = __webpack_require__(/*! ./tenant.entity */ "./apps/api-gateway/src/modules/tenant/tenant.entity.ts");
let TenantService = TenantService_1 = class TenantService {
    constructor(tenantRepository, configService) {
        this.tenantRepository = tenantRepository;
        this.configService = configService;
        this.tenantConnections = new Map();
        this.logger = new common_1.Logger(TenantService_1.name);
    }
    async findAll() {
        return this.tenantRepository.find({
            select: ['id', 'name', 'dbName', 'createdAt', 'active'],
        });
    }
    async findById(id) {
        const data = await this.tenantRepository.findOne({
            where: { id },
        });
        return data;
    }
    async create(createTenantDto) {
        const dbName = `tenant_${createTenantDto.name
            .toLowerCase()
            .replace(/[^a-z0-9]/g, '_')}_${Date.now()}`;
        const tenant = new tenant_entity_1.Tenant();
        tenant.id = (0, uuid_1.v4)();
        tenant.name = createTenantDto.name;
        tenant.dbName = dbName;
        tenant.dbHost = this.configService.get('PG_HOST', 'localhost');
        tenant.dbPort = this.configService.get('PG_PORT', 5432);
        tenant.dbUser = this.configService.get('PG_USER', 'postgres');
        tenant.dbPassword = this.configService.get('PG_PASSWORD', '1234');
        console.log(tenant);
        await this.createTenantDatabase(tenant);
        const savedTenant = await this.tenantRepository.save(tenant);
        return savedTenant;
    }
    async createTenantDatabase(tenant) {
        const pgConnection = new typeorm_2.DataSource({
            type: 'postgres',
            host: tenant.dbHost,
            port: tenant.dbPort,
            username: tenant.dbUser,
            password: tenant.dbPassword,
            database: 'postgres',
        });
        console.log({
            type: 'postgres',
            host: tenant.dbHost,
            port: tenant.dbPort,
            username: tenant.dbUser,
            password: tenant.dbPassword,
            database: 'postgres',
        });
        await pgConnection.initialize();
        console.log('pgConnection initialized...');
        try {
            await pgConnection.query(`CREATE DATABASE ${tenant.dbName}`);
            this.logger.log(`Created database ${tenant.dbName}`);
        }
        catch (error) {
            this.logger.error(`Failed to create database ${tenant.dbName}`, error);
            throw error;
        }
        finally {
            await pgConnection.destroy();
        }
    }
    async update(id, tenant) {
        await this.tenantRepository.update(id, tenant);
        return this.findById(id);
    }
    async delete(id) {
        await this.tenantRepository.delete(id);
    }
};
exports.TenantService = TenantService;
exports.TenantService = TenantService = TenantService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tenant_entity_1.Tenant, 'central_db')),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object])
], TenantService);


/***/ }),

/***/ "./apps/api-gateway/src/modules/user-tenant-map/user-tenant-map.controller.ts":
/*!************************************************************************************!*\
  !*** ./apps/api-gateway/src/modules/user-tenant-map/user-tenant-map.controller.ts ***!
  \************************************************************************************/
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserTenantMapController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const user_tenant_map_service_1 = __webpack_require__(/*! ./user-tenant-map.service */ "./apps/api-gateway/src/modules/user-tenant-map/user-tenant-map.service.ts");
const user_tenant_map_dto_1 = __webpack_require__(/*! ./user-tenant-map.dto */ "./apps/api-gateway/src/modules/user-tenant-map/user-tenant-map.dto.ts");
let UserTenantMapController = class UserTenantMapController {
    constructor(userTenantMapService) {
        this.userTenantMapService = userTenantMapService;
    }
    async createMapping(mappingData) {
        return await this.userTenantMapService.createUserTenantMapping(mappingData.tenantId, mappingData.userId);
    }
    async getMapping(tenantId, userId) {
        return await this.userTenantMapService.getUserTenantMapping(tenantId, userId);
    }
    async getMappingsByTenant(tenantId) {
        return await this.userTenantMapService.getMappingsByTenantId(tenantId);
    }
    async getMappingsByUser(userId) {
        return await this.userTenantMapService.getMappingsByUserId(userId);
    }
    async deactivateMapping(tenantId, userId) {
        await this.userTenantMapService.deactivateUserTenantMapping(tenantId, userId);
        return { message: 'Mapping deactivated successfully' };
    }
};
exports.UserTenantMapController = UserTenantMapController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof user_tenant_map_dto_1.CreateUserTenantMappingDto !== "undefined" && user_tenant_map_dto_1.CreateUserTenantMappingDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], UserTenantMapController.prototype, "createMapping", null);
__decorate([
    (0, common_1.Get)(':tenantId/:userId'),
    __param(0, (0, common_1.Param)('tenantId')),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], UserTenantMapController.prototype, "getMapping", null);
__decorate([
    (0, common_1.Get)('tenant/:tenantId'),
    __param(0, (0, common_1.Param)('tenantId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], UserTenantMapController.prototype, "getMappingsByTenant", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], UserTenantMapController.prototype, "getMappingsByUser", null);
__decorate([
    (0, common_1.Delete)(':tenantId/:userId'),
    __param(0, (0, common_1.Param)('tenantId')),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], UserTenantMapController.prototype, "deactivateMapping", null);
exports.UserTenantMapController = UserTenantMapController = __decorate([
    (0, common_1.Controller)('user-tenant-mappings'),
    __metadata("design:paramtypes", [typeof (_a = typeof user_tenant_map_service_1.UserTenantMapService !== "undefined" && user_tenant_map_service_1.UserTenantMapService) === "function" ? _a : Object])
], UserTenantMapController);


/***/ }),

/***/ "./apps/api-gateway/src/modules/user-tenant-map/user-tenant-map.dto.ts":
/*!*****************************************************************************!*\
  !*** ./apps/api-gateway/src/modules/user-tenant-map/user-tenant-map.dto.ts ***!
  \*****************************************************************************/
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
exports.UserTenantMappingResponseDto = exports.CreateUserTenantMappingDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateUserTenantMappingDto {
}
exports.CreateUserTenantMappingDto = CreateUserTenantMappingDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateUserTenantMappingDto.prototype, "tenantId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateUserTenantMappingDto.prototype, "userId", void 0);
class UserTenantMappingResponseDto {
}
exports.UserTenantMappingResponseDto = UserTenantMappingResponseDto;


/***/ }),

/***/ "./apps/api-gateway/src/modules/user-tenant-map/user-tenant-map.entity.ts":
/*!********************************************************************************!*\
  !*** ./apps/api-gateway/src/modules/user-tenant-map/user-tenant-map.entity.ts ***!
  \********************************************************************************/
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
exports.UserTenantMap = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
let UserTenantMap = class UserTenantMap {
};
exports.UserTenantMap = UserTenantMap;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], UserTenantMap.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tenant_id' }),
    __metadata("design:type", String)
], UserTenantMap.prototype, "tenantId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id' }),
    __metadata("design:type", String)
], UserTenantMap.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'active', default: true }),
    __metadata("design:type", Boolean)
], UserTenantMap.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], UserTenantMap.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], UserTenantMap.prototype, "updatedAt", void 0);
exports.UserTenantMap = UserTenantMap = __decorate([
    (0, typeorm_1.Entity)('user_tenant_mappings')
], UserTenantMap);


/***/ }),

/***/ "./apps/api-gateway/src/modules/user-tenant-map/user-tenant-map.module.ts":
/*!********************************************************************************!*\
  !*** ./apps/api-gateway/src/modules/user-tenant-map/user-tenant-map.module.ts ***!
  \********************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserTenantMapModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const user_tenant_map_service_1 = __webpack_require__(/*! ./user-tenant-map.service */ "./apps/api-gateway/src/modules/user-tenant-map/user-tenant-map.service.ts");
const user_tenant_map_controller_1 = __webpack_require__(/*! ./user-tenant-map.controller */ "./apps/api-gateway/src/modules/user-tenant-map/user-tenant-map.controller.ts");
const user_tenant_map_entity_1 = __webpack_require__(/*! ./user-tenant-map.entity */ "./apps/api-gateway/src/modules/user-tenant-map/user-tenant-map.entity.ts");
let UserTenantMapModule = class UserTenantMapModule {
};
exports.UserTenantMapModule = UserTenantMapModule;
exports.UserTenantMapModule = UserTenantMapModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_tenant_map_entity_1.UserTenantMap], 'central_db')],
        controllers: [user_tenant_map_controller_1.UserTenantMapController],
        providers: [user_tenant_map_service_1.UserTenantMapService],
        exports: [user_tenant_map_service_1.UserTenantMapService],
    })
], UserTenantMapModule);


/***/ }),

/***/ "./apps/api-gateway/src/modules/user-tenant-map/user-tenant-map.service.ts":
/*!*********************************************************************************!*\
  !*** ./apps/api-gateway/src/modules/user-tenant-map/user-tenant-map.service.ts ***!
  \*********************************************************************************/
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserTenantMapService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const user_tenant_map_entity_1 = __webpack_require__(/*! ./user-tenant-map.entity */ "./apps/api-gateway/src/modules/user-tenant-map/user-tenant-map.entity.ts");
let UserTenantMapService = class UserTenantMapService {
    constructor(userTenantMapRepository) {
        this.userTenantMapRepository = userTenantMapRepository;
    }
    async createUserTenantMapping(tenantId, userId) {
        const existingMapping = await this.userTenantMapRepository.findOne({
            where: { tenantId, userId, active: true },
        });
        if (existingMapping) {
            return existingMapping;
        }
        const mapping = this.userTenantMapRepository.create({
            tenantId,
            userId,
            active: true,
        });
        return await this.userTenantMapRepository.save(mapping);
    }
    async getUserTenantMapping(tenantId, userId) {
        return await this.userTenantMapRepository.findOne({
            where: { tenantId, userId, active: true },
        });
    }
    async deactivateUserTenantMapping(tenantId, userId) {
        await this.userTenantMapRepository.update({ tenantId, userId }, { active: false });
    }
    async getMappingsByTenantId(tenantId) {
        return await this.userTenantMapRepository.find({
            where: { tenantId, active: true },
        });
    }
    async getMappingsByUserId(userId) {
        return await this.userTenantMapRepository.find({
            where: { userId, active: true },
        });
    }
};
exports.UserTenantMapService = UserTenantMapService;
exports.UserTenantMapService = UserTenantMapService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_tenant_map_entity_1.UserTenantMap, 'central_db')),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], UserTenantMapService);


/***/ }),

/***/ "./apps/api-gateway/src/modules/user/user.controller.ts":
/*!**************************************************************!*\
  !*** ./apps/api-gateway/src/modules/user/user.controller.ts ***!
  \**************************************************************/
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const user_service_1 = __webpack_require__(/*! ./user.service */ "./apps/api-gateway/src/modules/user/user.service.ts");
const user_dto_1 = __webpack_require__(/*! @libs/dto/user.dto */ "./libs/dto/user.dto.ts");
const user_dto_2 = __webpack_require__(/*! ./user.dto */ "./apps/api-gateway/src/modules/user/user.dto.ts");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async findNameCounts(tenantId) {
        return this.userService.findNameCounts(tenantId);
    }
    async create(createUserDto, tenantId) {
        return this.userService.create(createUserDto, tenantId);
    }
    async findAll(tenantId) {
        return this.userService.findAll(tenantId);
    }
    async findOne(id, tenantId) {
        return this.userService.findOne(id, tenantId);
    }
    async update(id, updateUserDto, tenantId) {
        return this.userService.update(id, updateUserDto, tenantId);
    }
    async remove(id, tenantId) {
        return this.userService.remove(id, tenantId);
    }
    async findUsersByEmail(email, tenantId) {
        return this.userService.findUsersByEmail(email, tenantId);
    }
    async getUserCount(tenantId) {
        const count = await this.userService.getUserCount(tenantId);
        return { count };
    }
};
exports.UserController = UserController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get users with name counts' }),
    (0, swagger_1.ApiHeader)({ name: 'x-tenant-id', required: true, description: 'Tenant ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return users with name counts.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Tenant not found.' }),
    (0, common_1.Get)('name-counts'),
    __param(0, (0, common_1.Headers)('x-tenant-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findNameCounts", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new user' }),
    (0, swagger_1.ApiHeader)({ name: 'x-tenant-id', required: true, description: 'Tenant ID' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'User successfully created.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Tenant not found.' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('x-tenant-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof user_dto_1.CreateUserDto !== "undefined" && user_dto_1.CreateUserDto) === "function" ? _b : Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all users' }),
    (0, swagger_1.ApiHeader)({ name: 'x-tenant-id', required: true, description: 'Tenant ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all users.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Tenant not found.' }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Headers)('x-tenant-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get a user by id' }),
    (0, swagger_1.ApiHeader)({ name: 'x-tenant-id', required: true, description: 'Tenant ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return the user.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User or tenant not found.' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)('x-tenant-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update a user' }),
    (0, swagger_1.ApiHeader)({ name: 'x-tenant-id', required: true, description: 'Tenant ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User successfully updated.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User or tenant not found.' }),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Headers)('x-tenant-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof user_dto_1.UpdateUserDto !== "undefined" && user_dto_1.UpdateUserDto) === "function" ? _c : Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete a user' }),
    (0, swagger_1.ApiHeader)({ name: 'x-tenant-id', required: true, description: 'Tenant ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User successfully deleted.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User or tenant not found.' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)('x-tenant-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "remove", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get users by email' }),
    (0, swagger_1.ApiHeader)({ name: 'x-tenant-id', required: true, description: 'Tenant ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return users with matching email.',
        type: user_dto_2.UserSearchResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Tenant not found.' }),
    (0, common_1.Get)('search/email/:email'),
    __param(0, (0, common_1.Param)('email')),
    __param(1, (0, common_1.Headers)('x-tenant-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findUsersByEmail", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get user count' }),
    (0, swagger_1.ApiHeader)({ name: 'x-tenant-id', required: true, description: 'Tenant ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return total user count.',
        type: user_dto_2.UserCountResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Tenant not found.' }),
    (0, common_1.Get)('count/total'),
    __param(0, (0, common_1.Headers)('x-tenant-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserCount", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)('users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [typeof (_a = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _a : Object])
], UserController);


/***/ }),

/***/ "./apps/api-gateway/src/modules/user/user.dto.ts":
/*!*******************************************************!*\
  !*** ./apps/api-gateway/src/modules/user/user.dto.ts ***!
  \*******************************************************/
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
exports.UserNameCountResponseDto = exports.UserSearchResponseDto = exports.UserCountResponseDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class UserCountResponseDto {
}
exports.UserCountResponseDto = UserCountResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total number of users' }),
    __metadata("design:type", Number)
], UserCountResponseDto.prototype, "count", void 0);
class UserSearchResponseDto {
}
exports.UserSearchResponseDto = UserSearchResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Array of users matching the search criteria' }),
    __metadata("design:type", Array)
], UserSearchResponseDto.prototype, "users", void 0);
class UserNameCountResponseDto {
}
exports.UserNameCountResponseDto = UserNameCountResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User name' }),
    __metadata("design:type", String)
], UserNameCountResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Count of users with this name' }),
    __metadata("design:type", Number)
], UserNameCountResponseDto.prototype, "count", void 0);


/***/ }),

/***/ "./apps/api-gateway/src/modules/user/user.module.ts":
/*!**********************************************************!*\
  !*** ./apps/api-gateway/src/modules/user/user.module.ts ***!
  \**********************************************************/
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
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const path_1 = __webpack_require__(/*! path */ "path");
const user_controller_1 = __webpack_require__(/*! ./user.controller */ "./apps/api-gateway/src/modules/user/user.controller.ts");
const user_service_1 = __webpack_require__(/*! ./user.service */ "./apps/api-gateway/src/modules/user/user.service.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const tenant_module_1 = __webpack_require__(/*! ../tenant/tenant.module */ "./apps/api-gateway/src/modules/tenant/tenant.module.ts");
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
                    useFactory: (configService) => ({
                        transport: microservices_1.Transport.GRPC,
                        options: {
                            package: configService.get('USER_SERVICE_PKG', 'user'),
                            protoPath: (0, path_1.join)(__dirname, './../../../libs/proto/user.proto'),
                            url: configService.get('USER_SERVICE_URL', 'localhost:5001'),
                        },
                    }),
                    inject: [config_1.ConfigService],
                },
            ]),
            tenant_module_1.TenantModule,
        ],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService],
        exports: [user_service_1.UserService],
    })
], UserModule);


/***/ }),

/***/ "./apps/api-gateway/src/modules/user/user.service.ts":
/*!***********************************************************!*\
  !*** ./apps/api-gateway/src/modules/user/user.service.ts ***!
  \***********************************************************/
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var UserService_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const grpc_js_1 = __webpack_require__(/*! @grpc/grpc-js */ "@grpc/grpc-js");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const createError = __webpack_require__(/*! http-errors */ "http-errors");
const tenant_service_1 = __webpack_require__(/*! ../tenant/tenant.service */ "./apps/api-gateway/src/modules/tenant/tenant.service.ts");
let UserService = UserService_1 = class UserService {
    constructor(client, tenantService) {
        this.client = client;
        this.tenantService = tenantService;
        this.logger = new common_1.Logger(UserService_1.name);
    }
    onModuleInit() {
        this.userService = this.client.getService('UserService');
        this.logger.log('UserService initialized with gRPC client');
        this.logger.log(`gRPC client service available: ${this.userService ? 'Yes' : 'No'}`);
    }
    async prepareMetadata(tenantId) {
        if (!tenantId) {
            throw createError(400, 'tenantId is required in header');
        }
        const tenant = await this.tenantService.findById(tenantId);
        if (!tenant) {
            throw createError(404, 'Tenant not found');
        }
        const metadata = new grpc_js_1.Metadata();
        metadata.add('tenant-id', tenantId);
        metadata.add('db-name', tenant.dbName);
        this.logger.log(`Prepared metadata - tenantId: ${tenantId}, dbName: ${tenant.dbName}`);
        return metadata;
    }
    async findNameCounts(tenantId) {
        const metadata = await this.prepareMetadata(tenantId);
        return (0, rxjs_1.firstValueFrom)(this.userService.listUsersWithNameCount({}, metadata));
    }
    async create(createUserDto, tenantId) {
        this.logger.log(`Creating user with data: ${JSON.stringify(createUserDto)} for tenant: ${tenantId}`);
        const metadata = await this.prepareMetadata(tenantId);
        this.logger.log('Sending gRPC request to user-service...');
        try {
            const result = await (0, rxjs_1.firstValueFrom)(this.userService.createUser(createUserDto, metadata));
            this.logger.log(`User created successfully via gRPC: ${JSON.stringify(result)}`);
            return result;
        }
        catch (error) {
            this.logger.error(`gRPC call failed: ${error.message}`, error.stack);
            throw error;
        }
    }
    async findAll(tenantId) {
        const metadata = await this.prepareMetadata(tenantId);
        return (0, rxjs_1.firstValueFrom)(this.userService.listUsers({}, metadata));
    }
    async findOne(id, tenantId) {
        const metadata = await this.prepareMetadata(tenantId);
        return (0, rxjs_1.firstValueFrom)(this.userService.getUser({ id }, metadata));
    }
    async update(id, updateUserDto, tenantId) {
        const metadata = await this.prepareMetadata(tenantId);
        return (0, rxjs_1.firstValueFrom)(this.userService.updateUser({
            id,
            ...updateUserDto,
        }, metadata));
    }
    async remove(id, tenantId) {
        const metadata = await this.prepareMetadata(tenantId);
        return (0, rxjs_1.firstValueFrom)(this.userService.deleteUser({ id }, metadata));
    }
    async findUsersByEmail(email, tenantId) {
        const metadata = await this.prepareMetadata(tenantId);
        const allUsers = await (0, rxjs_1.firstValueFrom)(this.userService.listUsers({}, metadata));
        return allUsers.items?.filter((user) => user.email === email) || [];
    }
    async findActiveUsers(tenantId) {
        const metadata = await this.prepareMetadata(tenantId);
        const allUsers = await (0, rxjs_1.firstValueFrom)(this.userService.listUsers({}, metadata));
        return allUsers.items || [];
    }
    async getUserCount(tenantId) {
        const metadata = await this.prepareMetadata(tenantId);
        const allUsers = await (0, rxjs_1.firstValueFrom)(this.userService.listUsers({}, metadata));
        return allUsers.items?.length || 0;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = UserService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('USER_PACKAGE')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientGrpc !== "undefined" && microservices_1.ClientGrpc) === "function" ? _a : Object, typeof (_b = typeof tenant_service_1.TenantService !== "undefined" && tenant_service_1.TenantService) === "function" ? _b : Object])
], UserService);


/***/ }),

/***/ "./apps/api-gateway/src/modules/utils/email.service.ts":
/*!*************************************************************!*\
  !*** ./apps/api-gateway/src/modules/utils/email.service.ts ***!
  \*************************************************************/
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EmailService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const nodemailer = __webpack_require__(/*! nodemailer */ "nodemailer");
let EmailService = class EmailService {
    constructor(configService) {
        this.configService = configService;
        const isProd = process.env.NODE_ENV === 'production';
        const transportOptions = {
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
            secure: isProd,
        };
        if (isProd) {
            transportOptions.auth = {
                user: this.configService.get('SMTP_USER'),
                pass: this.configService.get('SMTP_PASSWORD'),
            };
        }
        this.transporter = nodemailer.createTransport(transportOptions);
    }
    async sendInvitationEmail(data) {
        const { to, invitationLink, role } = data;
        const mailOptions = {
            from: 'noreply@example.com',
            to,
            subject: 'You have been invited to join our platform',
            html: `
        <h1>Welcome to our platform!</h1>
        <p>You have been invited to join as a ${role}.</p>
        <p>Click the link below to complete your registration:</p>
        <a href="${invitationLink}">Complete Registration</a>
        <p>This invitation link will expire in 24 hours.</p>
        <p>If you did not request this invitation, please ignore this email.</p>
      `,
        };
        await this.transporter.sendMail(mailOptions);
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], EmailService);


/***/ }),

/***/ "./apps/api-gateway/src/modules/utils/token.revocation.service.ts":
/*!************************************************************************!*\
  !*** ./apps/api-gateway/src/modules/utils/token.revocation.service.ts ***!
  \************************************************************************/
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TokenRevocationService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const ioredis_1 = __webpack_require__(/*! @nestjs-modules/ioredis */ "@nestjs-modules/ioredis");
const ioredis_2 = __webpack_require__(/*! ioredis */ "ioredis");
const jwt_decode_1 = __webpack_require__(/*! jwt-decode */ "jwt-decode");
let TokenRevocationService = class TokenRevocationService {
    constructor(redis) {
        this.redis = redis;
    }
    async revokeToken(token) {
        const decodedToken = (0, jwt_decode_1.jwtDecode)(token);
        const expiryTimeInSeconds = (decodedToken.exp || 0) - Math.floor(Date.now() / 1000);
        if (expiryTimeInSeconds > 0) {
            await this.redis.set(`revoked:${token}`, '1', 'EX', expiryTimeInSeconds);
        }
    }
    async isTokenRevoked(token) {
        const result = await this.redis.get(`revoked:${token}`);
        return result === '1';
    }
};
exports.TokenRevocationService = TokenRevocationService;
exports.TokenRevocationService = TokenRevocationService = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Injectable)(),
    __param(0, (0, ioredis_1.InjectRedis)()),
    __metadata("design:paramtypes", [typeof (_a = typeof ioredis_2.Redis !== "undefined" && ioredis_2.Redis) === "function" ? _a : Object])
], TokenRevocationService);


/***/ }),

/***/ "./apps/api-gateway/src/modules/utils/utils.module.ts":
/*!************************************************************!*\
  !*** ./apps/api-gateway/src/modules/utils/utils.module.ts ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UtilsModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const token_revocation_service_1 = __webpack_require__(/*! ./token.revocation.service */ "./apps/api-gateway/src/modules/utils/token.revocation.service.ts");
const email_service_1 = __webpack_require__(/*! ./email.service */ "./apps/api-gateway/src/modules/utils/email.service.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
let UtilsModule = class UtilsModule {
};
exports.UtilsModule = UtilsModule;
exports.UtilsModule = UtilsModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [config_1.ConfigModule],
        providers: [token_revocation_service_1.TokenRevocationService, email_service_1.EmailService],
        exports: [token_revocation_service_1.TokenRevocationService, email_service_1.EmailService],
    })
], UtilsModule);


/***/ }),

/***/ "./libs/dto/invitation/create-invitation.dto.ts":
/*!******************************************************!*\
  !*** ./libs/dto/invitation/create-invitation.dto.ts ***!
  \******************************************************/
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
exports.CreateBulkInvitationDto = exports.CreateInvitationDto = exports.UserRole = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["USER"] = "user";
})(UserRole || (exports.UserRole = UserRole = {}));
class CreateInvitationDto {
}
exports.CreateInvitationDto = CreateInvitationDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Email address of the user to invite',
        example: 'ronak@alchemytech.ca',
    }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateInvitationDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Role to assign to the user',
        enum: UserRole,
        example: UserRole.ADMIN,
    }),
    (0, class_validator_1.IsEnum)(UserRole),
    __metadata("design:type", String)
], CreateInvitationDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'UUID of the tenant',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateInvitationDto.prototype, "tenantId", void 0);
class CreateBulkInvitationDto {
}
exports.CreateBulkInvitationDto = CreateBulkInvitationDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Array of invitations to create',
        type: [CreateInvitationDto],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateInvitationDto),
    (0, class_validator_1.ArrayMaxSize)(5, { message: 'Maximum 5 invitations can be sent at once' }),
    __metadata("design:type", Array)
], CreateBulkInvitationDto.prototype, "invitations", void 0);


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

/***/ "./libs/entity/invitation.entity.ts":
/*!******************************************!*\
  !*** ./libs/entity/invitation.entity.ts ***!
  \******************************************/
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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Invitation = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const create_invitation_dto_1 = __webpack_require__(/*! ../dto/invitation/create-invitation.dto */ "./libs/dto/invitation/create-invitation.dto.ts");
let Invitation = class Invitation {
};
exports.Invitation = Invitation;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Invitation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'email' }),
    __metadata("design:type", String)
], Invitation.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'role',
        type: 'enum',
        enum: create_invitation_dto_1.UserRole,
        default: create_invitation_dto_1.UserRole.USER,
    }),
    __metadata("design:type", typeof (_a = typeof create_invitation_dto_1.UserRole !== "undefined" && create_invitation_dto_1.UserRole) === "function" ? _a : Object)
], Invitation.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tenant_id' }),
    __metadata("design:type", String)
], Invitation.prototype, "tenantId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'token' }),
    __metadata("design:type", String)
], Invitation.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_used', default: false }),
    __metadata("design:type", Boolean)
], Invitation.prototype, "isUsed", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'expires_at', type: 'timestamp' }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Invitation.prototype, "expiresAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], Invitation.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], Invitation.prototype, "updatedAt", void 0);
exports.Invitation = Invitation = __decorate([
    (0, typeorm_1.Entity)('invitations')
], Invitation);


/***/ }),

/***/ "./libs/interceptors/transform.interceptor.ts":
/*!****************************************************!*\
  !*** ./libs/interceptors/transform.interceptor.ts ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransformInterceptor = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const operators_1 = __webpack_require__(/*! rxjs/operators */ "rxjs/operators");
let TransformInterceptor = class TransformInterceptor {
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const page = parseInt(request.query.page) || 1;
        const limit = parseInt(request.query.limit) || 10;
        return next.handle().pipe((0, operators_1.map)((data) => {
            if ('total' in data) {
                return {
                    status: 'success',
                    metadata: {
                        page,
                        limit,
                        results: data?.items?.length || 0,
                        total: data.total,
                    },
                    data: data.items || [],
                };
            }
            return {
                status: 'success',
                data: data,
            };
        }));
    }
};
exports.TransformInterceptor = TransformInterceptor;
exports.TransformInterceptor = TransformInterceptor = __decorate([
    (0, common_1.Injectable)()
], TransformInterceptor);


/***/ }),

/***/ "@aws-sdk/client-cognito-identity-provider":
/*!************************************************************!*\
  !*** external "@aws-sdk/client-cognito-identity-provider" ***!
  \************************************************************/
/***/ ((module) => {

module.exports = require("@aws-sdk/client-cognito-identity-provider");

/***/ }),

/***/ "@grpc/grpc-js":
/*!********************************!*\
  !*** external "@grpc/grpc-js" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("@grpc/grpc-js");

/***/ }),

/***/ "@nestjs-modules/ioredis":
/*!******************************************!*\
  !*** external "@nestjs-modules/ioredis" ***!
  \******************************************/
/***/ ((module) => {

module.exports = require("@nestjs-modules/ioredis");

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

/***/ "@nestjs/mapped-types":
/*!***************************************!*\
  !*** external "@nestjs/mapped-types" ***!
  \***************************************/
/***/ ((module) => {

module.exports = require("@nestjs/mapped-types");

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

/***/ "@nestjs/throttler":
/*!************************************!*\
  !*** external "@nestjs/throttler" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("@nestjs/throttler");

/***/ }),

/***/ "@nestjs/typeorm":
/*!**********************************!*\
  !*** external "@nestjs/typeorm" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

module.exports = require("axios");

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

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "date-fns":
/*!***************************!*\
  !*** external "date-fns" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("date-fns");

/***/ }),

/***/ "http-errors":
/*!******************************!*\
  !*** external "http-errors" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("http-errors");

/***/ }),

/***/ "ioredis":
/*!**************************!*\
  !*** external "ioredis" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("ioredis");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "jwk-to-pem":
/*!*****************************!*\
  !*** external "jwk-to-pem" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("jwk-to-pem");

/***/ }),

/***/ "jwt-decode":
/*!*****************************!*\
  !*** external "jwt-decode" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("jwt-decode");

/***/ }),

/***/ "nodemailer":
/*!*****************************!*\
  !*** external "nodemailer" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("nodemailer");

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

/***/ "rxjs/operators":
/*!*********************************!*\
  !*** external "rxjs/operators" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("rxjs/operators");

/***/ }),

/***/ "typeorm":
/*!**************************!*\
  !*** external "typeorm" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("typeorm");

/***/ }),

/***/ "uuid":
/*!***********************!*\
  !*** external "uuid" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("uuid");

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
/*!**************************************!*\
  !*** ./apps/api-gateway/src/main.ts ***!
  \**************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const app_module_1 = __webpack_require__(/*! ./app.module */ "./apps/api-gateway/src/app.module.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const global_exception_filter_1 = __webpack_require__(/*! ./filters/global-exception.filter */ "./apps/api-gateway/src/filters/global-exception.filter.ts");
const throttler_exception_filter_1 = __webpack_require__(/*! ./filters/throttler-exception.filter */ "./apps/api-gateway/src/filters/throttler-exception.filter.ts");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const transform_interceptor_1 = __webpack_require__(/*! @libs/interceptors/transform.interceptor */ "./libs/interceptors/transform.interceptor.ts");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const port = configService.get('PORT', 3000);
    app.useGlobalFilters(new global_exception_filter_1.GlobalExceptionFilter(), new throttler_exception_filter_1.ThrottlerExceptionFilter());
    app.useGlobalInterceptors(new transform_interceptor_1.TransformInterceptor());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('API Gateway')
        .setDescription('The API Gateway for the microservices architecture')
        .setVersion('1.0')
        .addTag('users')
        .addTag('tenants')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(port);
    console.log(`API Gateway is running on: http://localhost:${port}`);
    console.log(`Swagger documentation is available at: http://localhost:${port}/api`);
}
bootstrap();

})();

/******/ })()
;