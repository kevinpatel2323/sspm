import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tenants')
export class Tenant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'db_host' })
  dbHost: string;
  
  @Column({ name: 'db_port' })
  dbPort: number;

  @Column({ name: 'db_name', unique: true })
  dbName: string;

  @Column({ name: 'db_user', type: 'text' })
  dbUser: string;

  @Column({ name: 'db_password', type: 'text' })
  dbPassword: string;

  @Column({ name: 'active', default: true })
  active: boolean;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
