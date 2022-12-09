import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Company } from './entities/company.entity';
import { AppLogger } from '../shared/logger/logger.service';

@Module({
  imports: [SequelizeModule.forFeature([Company])],
  providers: [CompanyService, AppLogger],
  controllers: [CompanyController],
})
export class CompanyModule {}
