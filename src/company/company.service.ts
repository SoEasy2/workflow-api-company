import { Injectable } from '@nestjs/common';
import { Company } from './entities/company.entity';
import { InjectModel } from '@nestjs/sequelize';
import { RpcException } from '@nestjs/microservices';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company) private readonly companyRepository: typeof Company,
  ) {}

  async createCompany(dto: CreateCompanyDto): Promise<Company> {
    const companyDB = await this.companyRepository.findOne({
      where: { name: dto.name },
    });
    if (companyDB)
      throw new RpcException('Company with that name already exists ');
    const company = await this.companyRepository.create(dto);
    return company.toJSON();
  }

  async removeCompany(id: string): Promise<string> {
    await this.companyRepository.destroy({ where: { id } });
    return id;
  }

  async getCompanyById(id: string): Promise<Company> {
    const company = await this.companyRepository.findOne({ where: { id } });
    if (!company) throw new RpcException('Company not found');
    return company.toJSON();
  }

  async getCompanyByCode(code: string): Promise<Company> {
    const company = await this.companyRepository.findOne({ where: { code } });
    if (!company) throw new RpcException('Company not found');
    return company.toJSON();
  }

  async update(dto: UpdateCompanyDto): Promise<Company>{
    const { id, ...rest } = dto;
    const user = await this.companyRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new RpcException('Company not found');
    }
    await this.companyRepository.update(rest, {
      where: { id: dto.id },
    });
    const companyUpdate = await this.companyRepository.findOne({
      where: { id },
    });
    return companyUpdate.toJSON();
  }
}
