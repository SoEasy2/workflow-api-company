import { Controller } from '@nestjs/common';
import { AppLogger } from '../shared/logger/logger.service';
import { CompanyDetailsService } from './company-details.service';
import {
  TOPIC_DETAILS_COMPANY_CREATE,
  TOPIC_DETAILS_COMPANY_CREATE_REPLY,
  TOPIC_DETAILS_COMPANY_UPDATE,
  TOPIC_DETAILS_COMPANY_UPDATE_REPLY,
} from '../common/constants';
import {
  EventPattern,
  MessagePattern,
  Payload,
  RpcException,
} from '@nestjs/microservices';
import { IKafkaMessage } from '../common/interfaces/kafka-message.interface';
import { CreateDetailsDto } from './dto/create-details.dto';
import { UpdateDetailsDto } from './dto/update-details.dto';
import { CompanyDetails } from './entities/CompanyDetails.entity';

@Controller('company-details')
export class CompanyDetailsController {
  constructor(
    private readonly appLogger: AppLogger,
    private readonly companyDetailsService: CompanyDetailsService,
  ) {
    this.appLogger.setContext(CompanyDetailsController.name);
  }

  @MessagePattern(TOPIC_DETAILS_COMPANY_CREATE)
  async createDetails(
    @Payload() message: IKafkaMessage<CreateDetailsDto>,
  ): Promise<CompanyDetails> {
    try {
      this.appLogger.log(
        `[CompanyDetailsController][${TOPIC_DETAILS_COMPANY_CREATE}] -> [createDetails]`,
      );
      return await this.companyDetailsService.createDetails(message.value);
    } catch (err) {
      this.appLogger.error(
        err,
        err.stack,
        `[CompanyDetailsController][${TOPIC_DETAILS_COMPANY_CREATE}] -> [createDetails]`,
      );
      throw new RpcException(JSON.stringify(err));
    }
  }
  @EventPattern(TOPIC_DETAILS_COMPANY_CREATE_REPLY)
  logCreateDetails(): void {
    this.appLogger.log(
      `[CompanyDetailsController][${TOPIC_DETAILS_COMPANY_CREATE}][SEND] -> [createDetails]`,
    );
  }

  @MessagePattern(TOPIC_DETAILS_COMPANY_UPDATE)
  async updateDetails(@Payload() message: IKafkaMessage<UpdateDetailsDto>) {
    try {
      this.appLogger.log(
        `[CompanyDetailsController][${TOPIC_DETAILS_COMPANY_UPDATE}] -> [updateDetails]`,
      );
      return await this.companyDetailsService.updateDetails(message.value);
    } catch (err) {
      this.appLogger.error(
        err,
        err.stack,
        `[CompanyDetailsController][${TOPIC_DETAILS_COMPANY_UPDATE}] -> [updateDetails]`,
      );
      throw new RpcException(JSON.stringify(err));
    }
  }
  @EventPattern(TOPIC_DETAILS_COMPANY_UPDATE_REPLY)
  logUpdateDetails(): void {
    this.appLogger.log(
      `[CompanyDetailsController][${TOPIC_DETAILS_COMPANY_UPDATE}][SEND] -> [updateDetails]`,
    );
  }
}
