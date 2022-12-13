import { Controller } from '@nestjs/common';
import { AppLogger } from '../shared/logger/logger.service';
import { CompanyService } from './company.service';
import {
  EventPattern,
  MessagePattern,
  Payload,
  RpcException,
} from '@nestjs/microservices';
import {
  TOPIC_COMPANY_CREATE,
  TOPIC_COMPANY_CREATE_REPLY, TOPIC_COMPANY_GET_BY_ID, TOPIC_COMPANY_GET_BY_ID_REPLY,
} from '../common/constants';
import { IKafkaMessage } from '../common/interfaces/kafka-message.interface';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Company } from './entities/company.entity';

@Controller('company')
export class CompanyController {
  constructor(
    private readonly appLogger: AppLogger,
    private readonly companyService: CompanyService,
  ) {
    this.appLogger.setContext(CompanyController.name);
  }

  @MessagePattern(TOPIC_COMPANY_CREATE)
  async createCompany(@Payload() message: IKafkaMessage<CreateCompanyDto>): Promise<Company> {
    try {
      this.appLogger.log(
        `[CompanyController][${TOPIC_COMPANY_CREATE}] -> [createCompany]`,
      );
      return await this.companyService.createCompany(message.value);
    } catch (err) {
      this.appLogger.error(
        err,
        err.stack,
        `[CompanyController][${TOPIC_COMPANY_CREATE}] -> [createCompany]`,
      );
      throw new RpcException(JSON.stringify(err));
    }
  }
  @EventPattern(TOPIC_COMPANY_CREATE_REPLY)
  logCreateCompany(): void {
    this.appLogger.log(
      `[CompanyController][${TOPIC_COMPANY_CREATE}][SEND] -> [createCompany]`,
    );
  }

  @MessagePattern(TOPIC_COMPANY_GET_BY_ID)
  async getCompanyById(@Payload() message: IKafkaMessage<string>):Promise<Company> {
    try {
      this.appLogger.log(
          `[CompanyController][${TOPIC_COMPANY_GET_BY_ID}] -> [getCompanyById]`,
      );
      return await this.companyService.getCompanyById(message.value);
    } catch (err) {
      this.appLogger.error(
          err,
          err.stack,
          `[CompanyController][${TOPIC_COMPANY_GET_BY_ID}] -> [getCompanyById]`,
      );
      throw new RpcException(JSON.stringify(err));
    }
  }
  @EventPattern(TOPIC_COMPANY_GET_BY_ID_REPLY)
  logGetCompanyById(): void {
    this.appLogger.log(
        `[CompanyController][${TOPIC_COMPANY_GET_BY_ID}][SEND] -> [getCompanyById]`,
    );
  }
}
