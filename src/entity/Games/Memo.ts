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
    @Column("uuid", { unique: true })
    userId: string;
  
    @Field()
    @Column("text", {nullable: true})
    score: string;
  
    @Field()
    @Column("text", {nullable: true})
    level: string;

    @Field()
    @Column("text", {nullable: true})
    mistakes: string;

    @Field()
    @Column("text", {nullable: true})
    streak: string;
  
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
  