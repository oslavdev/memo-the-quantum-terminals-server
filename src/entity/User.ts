import {
  Entity,
  PrimaryColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert
} from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { v4 } from "uuid";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @PrimaryColumn("uuid")
  id: string;

  @Field()
  @Column("text", { unique: true })
  username: string;

  @Field()
  @Column("text", {nullable: true})
  firstName: string;

  @Field()
  @Column("text", {nullable: true})
  lastName: string;

  @Field()
  @Column("text", {nullable: true})
  country: string;

  @Field()
  @Column("text", {nullable: true})
  city: string;

  @Field()
  @Column("text", {nullable: true})
  postalCode: string;

  @Field()
  @Column("text", {nullable: true})
  address: string;

  @Field()
  @Column("text", { unique: true })
  email: string;

  @Column()
  password: string;

  @Column("bool", { default: false })
  confirmed: boolean;

  @Column("bool", { default: false })
  admin: boolean;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  updateDates() {
    this.updatedAt = new Date();
  }
  @BeforeInsert()
  addId() {
    this.id = v4();
  }
}
