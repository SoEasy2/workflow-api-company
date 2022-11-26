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
  TOPIC_COMPANY_CREATE_REPLY,
} from '../common/constants';
import { IKafkaMessage } from '../common/interfaces/kafka-message.interface';
import { CreateCompanyDto } from './dto/create-company.dto';

@Controller('company')
export class CompanyController {
  constructor(
    private readonly appLogger: AppLogger,
    private readonly companyService: CompanyService,
  ) {
    this.appLogger.setContext(CompanyController.name);
  }

  @MessagePattern(TOPIC_COMPANY_CREATE)
  async createCompany(@Payload() message: IKafkaMessage<CreateCompanyDto>) {
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
}
