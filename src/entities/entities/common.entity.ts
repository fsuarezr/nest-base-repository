import { PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'

export abstract class CommonEntity {
  @PrimaryGeneratedColumn(`uuid`, {
    comment: `A globally-unique identifier.`,
  })
  id: string

  @Column({
    comment: `Indicates if the entity is currently active or inactive`,
    type: `boolean`,
    default: true,
  })
  is_active: boolean

  @CreateDateColumn({
    comment: `Stores the date and time of creation`,
  })
  created_at: Date

  @CreateDateColumn({
    comment: `Stores the date and time of the last update`,
  })
  updated_at: Date
}
