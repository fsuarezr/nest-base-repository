import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'

import { User } from '@entities/entities'
import { CreateUserDTO, UpdateUserDTO } from '@entities/dto'
import { EntityServiceProvider } from '@entities/services'

const logger = new Logger(`User-Entity-Provider`)

/**
 * Service provider for managing User entities.
 *
 * This provider extends the generic ModelEntityProvider to handle User-specific operations,
 * utilizing the common CRUD methods provided by the base class.
 */
@Injectable()
export class UserEntityProvider extends EntityServiceProvider<User> {
  /**
   * Initializes the provider with the User repository and RoleEntityProvider.
   *
   * @param userRepository - The repository for User entities.
   */
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super(userRepository, `user`)
  }

  /**
   * Finds all User entities records.
   *
   * @returns A promise resolving to the list of all users or an error message.
   *
   * This method utilizes the findAllEntity method from the base ModelEntityProvider class.
   */
  async findAllUsers() {
    return this.findAllEntity(`findAllUsers`)
  }

  /**
   * Creates a new User entity.
   *
   * @param createUserDTO - The data transfer object containing the details of the user to create.
   * @returns A promise resolving to the result of the create operation.
   *
   * This method utilizes the createOneEntity method from the base ModelEntityProvider class.
   */
  async createUser(createUserDTO: CreateUserDTO) {
    logger.log(``)
    logger.log(`==== Method beginning: createUser ====`)

    createUserDTO.password = bcrypt.hashSync(createUserDTO.password, 10)

    return this.createOneEntity(createUserDTO, `createOneUser`)
  }

  /**
   * Finds a User entity by its email.
   *
   * @param email - The email of the user to find.
   * @returns A promise resolving to the found user entity or an error message.
   *
   * This method utilizes the findEntityByField method from the base ModelEntityProvider class.
   */
  async findOneByEmail(email: string, selectOptions) {
    return this.findEntityByField(
      `email`,
      email,
      `findOneUserByEmail`,
      selectOptions,
    )
  }

  /**
   * Finds a User entity by its ID.
   *
   * @param id - The ID of the user to find.
   * @returns A promise resolving to the found user entity or an error message.
   *
   * This method utilizes the findEntityByField method from the base ModelEntityProvider class.
   */
  async findOneById(id: string) {
    return this.findEntityByField(`id`, id, `findOneUserById`)
  }

  /**
   * Updates a User entity by its ID.
   *
   * @param id - The ID of the user to update.
   * @param updateUserDTO - The data transfer object containing the updated details of the user.
   * @returns A promise resolving to the result of the update operation.
   *
   * This method utilizes the updateOneEntity method from the base ModelEntityProvider class.
   */
  async updateUser(id: string, updateUserDTO: UpdateUserDTO) {
    if (updateUserDTO.password)
      updateUserDTO.password = bcrypt.hashSync(updateUserDTO.password, 10)

    return this.updateOneEntity(id, updateUserDTO, `updateOneUser`)
  }

  /**
   * Deactivate a User entity by its ID.
   *
   * @param id - The ID of the user to delete.
   * @returns A promise resolving to the result of the delete operation.
   *
   * This method utilizes the deleteOneEntity method from the base ModelEntityProvider class.
   */
  async deleteUser(id: string) {
    return this.deleteOneEntity(id, `deleteOneUser`)
  }

  /**
   * Deletes all User entities.
   *
   * @returns A promise resolving to the result of the delete operation.
   *
   * This method utilizes the deleteAllEntity method from the base ModelEntityProvider class.
   */
  async deleteAllUsers() {
    return this.deleteAllEntity(`deleteAllUsers`)
  }
}
