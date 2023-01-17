import { BelongsTo, Column, ForeignKey, HasOne, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { EmployeesCount } from '../../shared/enums';
import { Company } from '../../company/entities/company.entity';

@Table({ timestamps: true, freezeTableName: true, tableName: 'companyDetails' })
export class CompanyDetails extends Model<CompanyDetails> {
  @Column({
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  })
  id: string;

  @ForeignKey(() => Company)
  @Column({
    type: DataTypes.UUID,
    allowNull: false,
  })
  companyId: string;

  @BelongsTo(() => Company)
  company: Company;

  @Column({
    type: DataTypes.STRING,
    allowNull: true,
  })
  phone: string | null;

  @Column({
    type: DataTypes.STRING,
    allowNull: true,
  })
  email: string | null;

  @Column({
    type: DataTypes.STRING,
    allowNull: true,
  })
  address: string | null;

  @Column({
    type: DataTypes.STRING,
    allowNull: true,
  })
  description: string | null;

  @Column({ type: DataTypes.DATE, allowNull: true })
  createdAt: Date;

  @Column({ type: DataTypes.DATE, allowNull: true })
  updatedAt: Date;
}
