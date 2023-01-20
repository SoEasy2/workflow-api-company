import { Module } from '@nestjs/common';
import { CompanyDetailsService } from './company-details.service';
import { CompanyDetailsController } from './company-details.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CompanyDetails } from './entities/CompanyDetails.entity';
import { AppLogger } from '../shared/logger/logger.service';

@Module({
  imports: [SequelizeModule.forFeature([CompanyDetails])],
  providers: [CompanyDetailsService, AppLogger],
  controllers: [CompanyDetailsController],
  exports: [CompanyDetailsService],
})
export class CompanyDetailsModule {}
