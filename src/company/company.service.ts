import { Injectable } from '@nestjs/common';
import { Company } from './entities/company.entity';
import { InjectModel } from '@nestjs/sequelize';
import { RpcException } from '@nestjs/microservices';
import { CreateCompanyDto } from './dto/create-company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company) private readonly companyRepository: typeof Company,
  ) {}

  createCompany(dto: CreateCompanyDto): Promise<Company> {
    try {
      return this.companyRepository.create(dto);
    } catch (err) {
      throw new RpcException(JSON.stringify(err));
    }
  }

  async removeCompany(id: string): Promise<string> {
    try {
      await this.companyRepository.destroy({ where: { id } });;
      return id;
    } catch (err) {
      throw new RpcException(JSON.stringify(err));
    }
  }
}
