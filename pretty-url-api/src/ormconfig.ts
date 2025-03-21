import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ShortUrl } from './short-url/short-url.entity';

export function getOrmConfig(): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432', 10),
    username: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'postgres',
    database: process.env.DATABASE_NAME || 'urlshort',
    entities: [ShortUrl],
    synchronize: true, // For development only! In production, use migrations
  };
}
