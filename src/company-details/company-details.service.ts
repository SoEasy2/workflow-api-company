import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CompanyDetails } from './entities/CompanyDetails.entity';
import { CreateDetailsDto } from './dto/create-details.dto';
import { RpcException } from '@nestjs/microservices';
import { UpdateDetailsDto } from './dto/update-details.dto';

@Injectable()
export class CompanyDetailsService {
  constructor(
    @InjectModel(CompanyDetails)
    private readonly companyDetailsRepository: typeof CompanyDetails,
  ) {}

  async createDetails(dto: CreateDetailsDto): Promise<CompanyDetails> {
    const { companyId } = dto;
    const detailsDB = await this.companyDetailsRepository.findOne({
      where: { companyId },
    });
    if (detailsDB) throw new RpcException('Company already have details');
    const details = await this.companyDetailsRepository.create(dto);
    return details.toJSON();
  }

  async findById(id: string): Promise<CompanyDetails> {
    const companyDetails = await this.companyDetailsRepository.findOne({
      where: { id },
    });
    return companyDetails.toJSON();
  }

  async updateDetails(dto: UpdateDetailsDto): Promise<CompanyDetails> {
    const { id, ...rest } = dto;
    const detailsDB = await this.findById(id);
    if (!detailsDB) throw new RpcException('Company details not found');
    await this.companyDetailsRepository.update(rest, {
      where: { id: dto.id },
    });
    return this.findById(id);
  }
}
