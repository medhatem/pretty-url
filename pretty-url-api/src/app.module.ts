import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getOrmConfig } from './ormconfig';
import { ShortUrlModule } from './short-url/short-url.module';

@Module({
  imports: [TypeOrmModule.forRoot(getOrmConfig()), ShortUrlModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
