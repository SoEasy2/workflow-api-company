import { CompanyDetails } from '../entities/CompanyDetails.entity';

export class CreateDetailsDto implements Partial<CompanyDetails> {
  phone?: string | null;
  companyId: string;
  email?: string | null;
  address?: string | null;
  description?: string | null;
}
