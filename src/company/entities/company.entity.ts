import { Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { EmployeesCount } from '../../shared/enums';

@Table({ timestamps: true, freezeTableName: true, tableName: 'companies' })
export class Company extends Model<Company> {
  @Column({
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  })
  id: string;

  @Column({ type: DataTypes.STRING, allowNull: false, unique: true })
  name: string;

  @Column({ type: DataTypes.UUID, allowNull: false })
  user: string;

  @Column({ type: DataTypes.ARRAY(DataTypes.UUID), allowNull: false })
  targetUser: Array<string>;

  @Column({ type: DataTypes.INTEGER, allowNull: false })
  amountOfEmployees: EmployeesCount;

  @Column({ type: DataTypes.DATE, allowNull: true })
  createdAt: Date;

  @Column({ type: DataTypes.DATE, allowNull: true })
  updatedAt: Date;
}
