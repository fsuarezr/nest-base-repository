import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm'
import { CommonEntity } from '@entities/entities/common.entity'

@Entity({ name: `user` })
export class User extends CommonEntity {
  @Column({
    type: `text`,
    unique: true,
    select: false,
  })
  email: string

  @Column({
    type: `text`,
  })
  password: string

  @Column({
    type: `text`,
  })
  fullName: string

  @Column({
    type: `text`,
    array: true,
    default: [`user`],
  })
  roles: string[]

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim()
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert()
  }
}
