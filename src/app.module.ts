import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './shared/logger/logger.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CompanyModule } from './company/company.module';
import config from './common/configs/config';
import { Dialect } from 'sequelize';
import { Company } from './company/entities/company.entity';
import { CompanyDetailsModule } from './company-details/company-details.module';
import { CompanyDetails } from './company-details/entities/CompanyDetails.entity';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule, CompanyModule],
      useFactory: (configService: ConfigService) => ({
        dialect: configService.get<Dialect>('database.dialect'),
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.database'),
        models: [Company, CompanyDetails],

        // dialect: configService.get('database.dialect'),
        // host: configService.get('database.host'),
        // port: +configService.get('database.port'),
        // username: configService.get('database.username'),
        // password: configService.get('database.password'),
        // database: configService.get('database.database'),
        autoLoadModels: true,
        synchronize: true,
        logging: true,
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    LoggerModule,
    CompanyModule,
    CompanyDetailsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
