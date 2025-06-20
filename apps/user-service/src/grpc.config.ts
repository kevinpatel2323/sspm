import { join } from 'path';

export const grpcConfig = {
  transport: 'grpc',
  options: {
    package: 'user',
    protoPath: join(__dirname, '../../../libs/proto/user.proto'),
    url: 'localhost:5001',
  },
};
