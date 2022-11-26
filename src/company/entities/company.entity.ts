import { Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({ timestamps: true, freezeTableName: true, tableName: 'companies' })
export class Company extends Model<Company> {
  @Column({
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  })
  id: string;

  @Column({ type: DataTypes.STRING })
  name: string;

  @Column({ type: DataTypes.DATE, allowNull: true })
  createdAt: Date;

  @Column({ type: DataTypes.DATE, allowNull: true })
  updatedAt: Date;
}
