import { Company } from '../entities/company.entity';
import { EmployeesCount } from '../../shared/enums';

export class CreateCompanyDto implements Partial<Company> {
  name: string;
  amountOfEmployees: EmployeesCount;
  user: string;
  targetUser: Array<string>;
}
